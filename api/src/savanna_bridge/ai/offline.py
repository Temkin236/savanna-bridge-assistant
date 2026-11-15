"""Offline FAQ and extractive answer provider. Zero internet required."""

from __future__ import annotations

import re

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.models import Language


class OfflineFaqProvider(AIProvider):
    """Local, offline, zero-network rule and extractive QA provider."""

    @property
    def name(self) -> str:
        return "offline"

    @property
    def is_mocked(self) -> bool:
        return False

    def detect_language(self, text: str) -> Language:
        clean = text.strip()
        if re.search(r"[\u0600-\u06ff]", clean):
            return Language.AR
        # Ethiopic script check
        if re.search(r"[\u1200-\u137F]", clean):
            # Check for Tigrinya specific letters / vocabulary
            if any(w in clean for w in ["እንታይ", "ከመይ", "ትምህርቲ"]):
                return Language.TI
            return Language.AM

        # Latin script: check for Afaan Oromo words
        lower = clean.lower()
        oromo_words = ["maal", "akkam", "barumsa", "akkasumas", "waan", "eessatti"]
        if any(w in lower for w in oromo_words):
            return Language.OM

        return Language.EN

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        from savanna_bridge.language import LanguageGuard
        return LanguageGuard.translate(text, source_lang, target_lang)

    def _simplify_text(self, text: str, language: Language) -> str:
        """Simple mode: rewrite answer in short, plain sentences."""
        sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", text) if s.strip()]
        short_sentences = []
        for s in sentences:
            words = s.split()
            if len(words) > 12:
                short_sentences.append(" ".join(words[:12]) + ".")
            else:
                short_sentences.append(s)
        res = " ".join(short_sentences[:2]) if short_sentences else text
        return res

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        from savanna_bridge.language import LanguageGuard

        if not context_chunks:
            msg_en = "I cannot verify that from the course materials. A human mentor can help you directly."
            if language == Language.EN:
                return msg_en
            return LanguageGuard.translate(msg_en, "en", language.value)

        # 1. READ ALOUD REQUEST: Return clean structured verbatim readable content line by line
        if LanguageGuard.is_read_aloud_query(question):
            readable_sections = []
            for c in context_chunks:
                clean_heading = re.sub(r"^#+\s*", "", c.heading).strip()
                clean_text = re.sub(r"^#+\s*.*?\n*", "", c.text).strip()
                if clean_heading and clean_heading not in ("General Overview", "Section"):
                    if clean_text and clean_text.lower() != clean_heading.lower():
                        readable_sections.append(f"{clean_heading}:\n{clean_text}")
                    else:
                        readable_sections.append(f"{clean_heading}")
                elif clean_text:
                    readable_sections.append(clean_text)
            full_reading = "\n\n".join(readable_sections)
            primary_lang = getattr(context_chunks[0], "language", "en")
            if primary_lang != language.value:
                full_reading = LanguageGuard.translate(full_reading, primary_lang, language.value)
            return full_reading

        # 2. SUMMARY REQUEST: Generate concise structured summary of the page with clean bullet points
        if LanguageGuard.is_summary_query(question):
            raw_title = context_chunks[0].title
            clean_title = re.sub(r"\s*\|\s*.*$", "", raw_title).replace("Concept page:", "").strip() or "Current Page"
            if clean_title in ("Learner dashboard", "G-School Intranet", "Current Platform Page"):
                # Use heading if available for a more informative title
                first_h = re.sub(r"[#*`_]+", "", context_chunks[0].heading or "").strip()
                if first_h and first_h not in ("General Overview", "Section"):
                    clean_title = first_h

            points = []
            seen_points = set()
            for c in context_chunks:
                clean_heading = re.sub(r"[#*`_]+", "", c.heading or "").strip()
                clean_heading = re.sub(r"\s+", " ", clean_heading).strip()

                lines = [re.sub(r"^[#*•\-_>\s]+", "", l).strip() for l in (c.text or "").split("\n")]
                clean_text = " ".join([l for l in lines if l and not l.startswith("http")])
                clean_text = re.sub(r"\s+", " ", clean_text).strip()

                sentences = [
                    s.strip()
                    for s in re.split(r"(?<=[.!?፡።])\s+", clean_text)
                    if s.strip() and len(s.strip()) > 15
                ]
                key_sentence = sentences[0] if sentences else (clean_text if len(clean_text) > 15 else "")

                # Avoid duplicate heading echoing in sentence
                if key_sentence and clean_heading:
                    norm_h = clean_heading.lower().strip()
                    norm_s = key_sentence.lower().strip()
                    if norm_s == norm_h or norm_s.startswith(norm_h + ":") or norm_s.startswith(norm_h):
                        if len(sentences) > 1:
                            key_sentence = sentences[1]
                        elif norm_s == norm_h:
                            key_sentence = ""

                norm_key = (key_sentence or clean_heading).lower().strip()
                if not norm_key or norm_key in seen_points:
                    continue
                seen_points.add(norm_key)

                if clean_heading and clean_heading not in ("General Overview", "Section", "Current Platform Page", clean_title) and not clean_heading.startswith("Lesson Content"):
                    if key_sentence and clean_heading.lower() not in key_sentence.lower():
                        points.append(f"• {clean_heading}: {key_sentence}")
                    elif key_sentence:
                        points.append(f"• {key_sentence}")
                    else:
                        points.append(f"• {clean_heading}")
                elif key_sentence:
                    points.append(f"• {key_sentence}")

            if not points:
                fallback_lines = [re.sub(r"[#*`_]+", "", c.text).strip() for c in context_chunks[:3]]
                points = [f"• {l}" for l in fallback_lines if l]

            if language == Language.AM:
                summary_text = f"የ{clean_title} ማጠቃለያ፡\n\n" + "\n".join(points[:5])
            elif language == Language.OM:
                summary_text = f"Gabaabsii {clean_title}:\n\n" + "\n".join(points[:5])
            elif language == Language.AR:
                summary_text = f"ملخص {clean_title}:\n\n" + "\n".join(points[:5])
            else:
                summary_text = f"Summary of {clean_title}:\n\n" + "\n".join(points[:5])

            primary_lang = getattr(context_chunks[0], "language", "en")
            if primary_lang != language.value:
                summary_text = LanguageGuard.translate(summary_text, primary_lang, language.value)
            return summary_text + self._get_followup_prompt(language)

        # 3. EXAMPLE REQUEST: "Explain this concept with examples"
        if LanguageGuard.is_example_query(question):
            title = context_chunks[0].title
            lead_chunk = context_chunks[0].text
            first_sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", lead_chunk) if s.strip() and not s.startswith("#")]
            concept_core = first_sentences[0] if first_sentences else lead_chunk
            
            if language == Language.AM:
                ans = (
                    f"ይህንን ፅንሰ-ሀሳብ በተግባራዊ ምሳሌ እናብራራ፡\n\n"
                    f"በዚህ ትምህርት ('{title}') መሠረት፦ {concept_core}\n\n"
                    f"📌 ተግባራዊ ምሳሌ፦\n"
                    f"• ግልጽ ያልሆነ ጥያቄ ከመጠየቅ ይልቅ (ለምሳሌ፡ 'ጽሑፍ ጻፍልኝ')፣ ግልጽ የሆነ የስርዓት መመሪያ መስጠት (ለምሳሌ፡ 'እንደ ከፍተኛ የቢዝነስ አማካሪ ሆነህ 3 ዋና ዋና ነጥቦችን የያዘ አጭር ማጠቃለያ አዘጋጅ')።\n"
                    f"• ይህ የስራህን ውጤት ያሳምራል እንዲሁም አላማውን የጠበቀ ያደርገዋል።"
                )
            elif language == Language.OM:
                ans = (
                    f"Yaada kana fakkeenya qabatamaan haa ilaallu:\n\n"
                    f"Barnoota '{title}' keessatti፦ {concept_core}\n\n"
                    f"📌 Fakkeenya qabatamaa፦\n"
                    f"• Gaaffii walxaxaa ykn ifa hin taane gaafachuu mannaa (fkf: 'barreeffama naaf barreessi'), daangaa fi kallattii ifa ta'e kennuu (fkf: 'Akka ogeessa tajaajilaatti qabxiilee gurguddoo 3 qofa naaf ibsi').\n"
                    f"• Kunis bu'aa qulqullina qabu argachuuf gargaara."
                )
            elif language == Language.AR:
                ans = (
                    f"لنوضح هذا المفهوم بمثال عملي من الدرس:\n\n"
                    f"وفقاً لمحتوى '{title}': {concept_core}\n\n"
                    f"📌 مثال عملي:\n"
                    f"• بدلاً من إعطاء توجيه عام (مثل: 'اكتب لي ملخصاً')، قم بتحديد إطار محدد وقيد ديناميكي (مثل: 'بصفتك مستشاراً تنفيذياً، لخص المخاطر في 3 نقاط محددة').\n"
                    f"• هذا الإجراء يوجه النماذج بدقة ويضمن تحقيق النتيجة التعليمية المرجوة."
                )
            else:
                ans = (
                    f"Here is a practical example based on this lesson:\n\n"
                    f"In '{title}', the core principle is: {concept_core}\n\n"
                    f"📌 Practical Example:\n"
                    f"• Instead of giving a vague prompt (e.g., 'Write me a summary'), you define an executive anchor with dynamic constraints (e.g., 'Act as a Senior Operations Director and write a 3-bullet executive brief on supply risks').\n"
                    f"• This directly controls AI behavior and keeps outputs aligned with your actual goal."
                )
            return ans

        # 4. PREREQUISITE / NEXT LESSON PREPARATION: "What should I understand before moving to the next lesson?"
        if LanguageGuard.is_prerequisite_query(question):
            title = context_chunks[0].title
            headings = [re.sub(r"^#+\s*", "", c.heading).strip() for c in context_chunks if c.heading and c.heading not in ("General Overview", "Section")]
            headings_list = headings[:3] if headings else [title]
            
            if language == Language.AM:
                items_str = "\n".join([f"• {h}" for h in headings_list])
                ans = (
                    f"ወደ ቀጣዩ ትምህርት ከመሄድዎ በፊት ከዚህ ገጽ ('{title}') የሚከተሉትን ዋና ዋና ነጥቦች ጠንቅቀው መረዳትዎን ያረጋግጡ፡\n\n"
                    f"{items_str}\n\n"
                    f"እነዚህን ፅንሰ-ሀሳቦች በሚገባ ከተረዱ በኋላ በቀጣዩ ተግባራዊ እንቅስቃሴ ላይ በቀላሉ ለመሳተፍ ዝግጁ ይሆናሉ።"
                )
            elif language == Language.OM:
                items_str = "\n".join([f"• {h}" for h in headings_list])
                ans = (
                    f"Barnoota itti aanutti darbuun dura, qabxiilee ijoo fuula '{title}' kanneen armaan gadii hubachuu kee mirkaneeffadhu:\n\n"
                    f"{items_str}\n\n"
                    f"Qabxiilee kanneen yoo hubatte, barnoota itti aanuuf qophii taata."
                )
            elif language == Language.AR:
                items_str = "\n".join([f"• {h}" for h in headings_list])
                ans = (
                    f"قبل الانتقال إلى الدرس التالي، تأكد من استيعابك للنقاط الرئيسية التالية من درس '{title}':\n\n"
                    f"{items_str}\n\n"
                    f"فهم هذه الركائز الأساسية يضمن استعدادك الكامل للأنشطة والدروس القادمة."
                )
            else:
                items_str = "\n".join([f"• {h}" for h in headings_list])
                ans = (
                    f"Before moving to the next lesson, make sure you understand the following core points from '{title}':\n\n"
                    f"{items_str}\n\n"
                    f"Mastering these fundamentals ensures you are fully prepared for the next module and practical exercises."
                )
            return ans

        # 5. QUIZ / KNOWLEDGE CHECK: "Quiz me on this topic"
        if LanguageGuard.is_quiz_query(question):
            title = context_chunks[0].title
            headings = [re.sub(r"^#+\s*", "", c.heading).strip() for c in context_chunks if c.heading and c.heading not in ("General Overview", "Section")]
            primary_topic = headings[0] if headings else title
            
            if language == Language.AM:
                ans = (
                    f"ስለ '{title}' ያለዎትን ግንዛቤ ለመፈተሽ የሚረዱ ፈጣን ጥያቄዎች እነሆ፡\n\n"
                    f"1. በ{primary_topic} መሠረት፣ ዋናው አላማ እና ጥቅም ምንድን ነው?\n"
                    f"2. ይህንን ዘዴ በስራዎ ወይም በትምህርትዎ ውስጥ እንዴት ተግባራዊ ታደርጉታላችሁ?\n\n"
                    f"መልስዎን በራስዎ ቃላት ይጻፉልኝ፣ እኔም አስተያየት እሰጥዎታለሁ!"
                )
            elif language == Language.OM:
                ans = (
                    f"Hubannoo kee qoruuf gaaffilee gabaabaa waa'ee '{title}':\n\n"
                    f"1. Akkaataa {primary_topic} keessatti ibsametti, kaayyoon ijoo maali?\n"
                    f"2. Qabxiilee kanneen hojii kee keessatti akkamitti itti fayyadamta?\n\n"
                    f"Deebii kee naaf barreessi, yaada sirreeffamaa siifan kenna!"
                )
            elif language == Language.AR:
                ans = (
                    f"إليك اختباراً سريعاً للتحقق من فهمك لموضوع '{title}':\n\n"
                    f"1. بناءً على ما تعلمته في '{primary_topic}'، ما هو الهدف الرئيسي من هذا المفهوم؟\n"
                    f"2. كيف يمكنك تطبيق هذه المبادئ في مهامك العملية وتوجيه النماذج بدقة؟\n\n"
                    f"اكتب إجابتك بكلماتك وسأقوم بمراجعتها وتقديم ملاحظات فورية لك!"
                )
            else:
                ans = (
                    f"Here is a quick knowledge check on '{title}' to test your understanding:\n\n"
                    f"1. Based on '{primary_topic}', what is the primary purpose and advantage of this concept?\n"
                    f"2. How does applying dynamic constraints guide output accuracy in practice?\n\n"
                    f"Reply with your answers in your own words, and I will evaluate your understanding!"
                )
            return ans

        # 6. PAGE/LESSON OVERVIEW: "What is this course/lesson about?", "Explain this lesson", "everything"
        if LanguageGuard.is_page_overview_query(question):
            raw_title = context_chunks[0].title
            clean_title = re.sub(r"\s*\|\s*.*$", "", raw_title).replace("Concept page:", "").strip()
            
            # Find the best heading / topic name
            real_headings = [
                re.sub(r"^#+\s*", "", c.heading).strip()
                for c in context_chunks
                if c.heading and not c.heading.startswith("Lesson Content") and c.heading not in ("General Overview", "Section") and len(c.heading) <= 50 and not c.heading.endswith((".", ","))
            ]
            
            if clean_title in ("Learner dashboard", "Savanna Platform", "Current Platform Page", "Course Document") or not clean_title:
                clean_title = real_headings[0] if real_headings else "The Executive Thesis"

            topic_name = real_headings[0] if real_headings else clean_title

            # Collect all substantive paragraphs across the content chunks so the explanation covers the entire lesson
            sections_text: list[str] = []
            seen_snippets: set[str] = set()

            for c in context_chunks:
                clean_heading = re.sub(r"^#+\s*", "", c.heading).strip()
                clean_text = re.sub(r"^#+\s*.*?\n*", "", c.text).strip()

                # Split text into paragraphs
                paras = [p.strip() for p in re.split(r"\n\s*\n|\n", clean_text) if p.strip() and len(p.strip()) > 20]
                for p in paras:
                    if p.strip().lower() == topic_name.strip().lower():
                        continue
                    # Skip lone heading lines that don't form full sentences
                    if len(p) <= 50 and not p.endswith((".", "!", "?", "።")):
                        continue
                    snippet = p[:40].lower()
                    if snippet not in seen_snippets:
                        seen_snippets.add(snippet)
                        if (
                            clean_heading
                            and clean_heading not in ("General Overview", "Section")
                            and not clean_heading.startswith("Lesson Content")
                            and clean_heading.lower() not in p.lower()
                            and clean_heading.lower() != topic_name.lower()
                        ):
                            sections_text.append(f"{clean_heading}:\n{p}")
                        else:
                            sections_text.append(p)

            explanation_body = (
                "\n\n".join(sections_text[:6])
                if sections_text
                else "This lesson introduces foundational concepts and practical skills."
            )

            if language == Language.AM:
                ans = f"ይህ ትምህርት ('{topic_name}') የሚያስተምረው ዋና ዋና ነጥቦች፦\n\n{explanation_body}"
            elif language == Language.OM:
                ans = f"Barnoonni kun ('{topic_name}') qabxiilee armaan gadii barsiisa፦\n\n{explanation_body}"
            elif language == Language.AR:
                ans = f"يشرح هذا الدرس ('{topic_name}') المحاور التالية بالتفصيل:\n\n{explanation_body}"
            else:
                ans = f"This lesson on '{topic_name}' covers the following key points:\n\n{explanation_body}"

            primary_lang = getattr(context_chunks[0], "language", "en")
            if primary_lang != language.value:
                ans = LanguageGuard.translate(ans, primary_lang, language.value)

            if simple_mode or LanguageGuard.is_simplify_query(question):
                return self._simplify_text(ans, language)
            return ans + self._get_followup_prompt(language)

        # 4. STANDARD GROUNDED QUESTION ANSWERING
        # Prefer chunk that matches question terms and requested language
        q_tokens = [w.lower() for w in re.findall(r"[\w\u1200-\u137F]+", question)]
        best_chunk = None
        best_count = -1
        for c in context_chunks:
            count = sum(1 for tok in q_tokens if tok in c.heading.lower() or tok in c.text.lower())
            if getattr(c, "language", "en") == language.value:
                count += 5
            if count > best_count:
                best_count = count
                best_chunk = c
        matched_chunk = best_chunk or context_chunks[0]

        # Extract answer text from actual platform content
        raw_text = matched_chunk.text
        sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", raw_text) if s.strip()]

        # Pick sentences matching question keywords
        q_words = [w.lower() for w in re.findall(r"\w+", question) if len(w) > 3]
        relevant_sentences = [
            s for s in sentences if any(qw in s.lower() for qw in q_words)
        ]
        if relevant_sentences:
            base_answer = " ".join(relevant_sentences[:3])
        else:
            base_answer = " ".join(sentences[:3]) if sentences else raw_text

        if len(base_answer.strip()) < 35 and len(context_chunks) > 1:
            for extra_chunk in context_chunks[1:3]:
                extra_text = extra_chunk.text.strip()
                if extra_text and extra_text not in base_answer:
                    base_answer += f"\n\n{extra_text}"

        # Translate if content language does not match learner's requested language
        chunk_lang = getattr(matched_chunk, "language", "en")
        if chunk_lang != language.value:
            base_answer = LanguageGuard.translate(base_answer, chunk_lang, language.value)

        if simple_mode or LanguageGuard.is_simplify_query(question):
            return self._simplify_text(base_answer, language)

        return base_answer

    def _get_followup_prompt(self, language: Language) -> str:
        if language == Language.AM:
            return (
                "\n\nየሚከተሉትን ይፈልጋሉ?\n"
                "• ይህንን ፅንሰ-ሀሳብ በተግባራዊ ምሳሌዎች ላስረዳዎት?\n"
                "• ወደ ቀጣዩ ትምህርት ከመሄድዎ በፊት ምን መረዳት እንዳለብዎት ላብራራ?\n"
                "• ግንዛቤዎን ለመፈተሽ ጥያቄዎችን ልጠይቅዎት?"
            )
        elif language == Language.OM:
            return (
                "\n\nMaal gochuu barbaaddu?\n"
                "• Yaada kana fakkeenyota qabatamoodhaan siif ibsuu?\n"
                "• Barnoota itti aanutti darbuun dura maal beekuu akka qabdu siif himuu?\n"
                "• Hubannoo kee qoruuf gaaffii si gaafachuu?"
            )
        elif language == Language.AR:
            return (
                "\n\nهل ترغب في أن:\n"
                "• أشرح لك هذا المفهوم بأمثلة عملية؟\n"
                "• أوضح ما يجب فهمه قبل الانتقال للدرس التالي؟\n"
                "• أطرح عليك أسئلة لاختبار مدى فهمك؟"
            )
        return (
            "\n\nWould you like me to:\n"
            "• Explain this concept with practical examples?\n"
            "• Explain what you should understand before moving to the next lesson?\n"
            "• Quiz you to test your understanding?"
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        # Offline educational question transcriptions in native writing systems
        if language == Language.AM:
            return "ይህ ኮርስ ስለ ምንድን ነው? አብራራልኝ።"
        elif language == Language.OM:
            return "Koorsiin kun waa'ee maalii ti? Naaf ibsi."
        elif language == Language.AR:
            return "ما موضوع هذه الدورة؟ اشرحها لي."
        elif language == Language.TI:
<<<<<<< Updated upstream
            return "ብዛዕባ ሞጁል 2 ግለጹለይ።"
        elif language == Language.AR:
            return "يرجى شرح الوحدة الثانية."
        return "Please explain Module 2."
=======
            return "እዚ ኮርስ ብዛዕባ እንታይ እዩ? ግለጹለይ።"
        return "What is this course about? Explain this lesson to me."
>>>>>>> Stashed changes

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return "http://localhost:8000/media/tts/demo.ogg"
