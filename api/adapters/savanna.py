"""Content adapters for Savanna static course HTML and generic HTML pages."""

from __future__ import annotations

import os
import re
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from adapters.base import ContentChunk, ContentSource

SAVANNA_HOST = os.getenv("SAVANNA_BASE_URL", "http://localhost:4173").rstrip("/")


class SimpleHtmlChunker(HTMLParser):
    """Parses HTML into sections based on headings (h1, h2, h3)."""

    def __init__(self, base_url: str, default_title: str = "Course Document") -> None:
        super().__init__()
        self.base_url = base_url
        self.title = default_title
        self.current_heading = "General Overview"
        self.current_anchor = ""
        self.current_text: list[str] = []
        self.chunks: list[dict[str, Any]] = []
        self._in_title = False
        self._in_heading = False
        self._heading_buffer: list[str] = []
        self._page_counter = 1

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_dict = dict(attrs)
        tag_id = attr_dict.get("id")
        if (
            tag_id
            and tag.lower() in ("a", "h1", "h2", "h3", "h4", "h5", "section", "div", "span")
            and tag_id not in ("content", "layout-bars", "sidebar", "student-switch-curriculum")
        ):
            self.current_anchor = tag_id

        if tag.lower() == "title":
            self._in_title = True
        elif tag.lower() in ("h1", "h2", "h3", "h4", "h5"):
            # Save accumulated text for prior heading
            self._flush_chunk()
            self._in_heading = True
            self._heading_buffer = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self._in_title = False
        elif tag.lower() in ("h1", "h2", "h3", "h4", "h5"):
            self._in_heading = False
            heading_str = " ".join(self._heading_buffer).strip()
            if heading_str:
                self.current_heading = heading_str
                if tag.lower() in ("h1", "h2") and self.title in ("Course Document", "Current Platform Page"):
                    self.title = heading_str
            self._page_counter += 1

    def handle_data(self, data: str) -> None:
        clean = data.strip()
        if not clean:
            return
        if self._in_title:
            self.title = clean
        elif self._in_heading:
            self._heading_buffer.append(clean)
        else:
            self.current_text.append(clean)

    def _flush_chunk(self) -> None:
        text = " ".join(self.current_text).strip()
        if text:
            chunk_url = self.base_url
            if self.current_anchor:
                base_clean = self.base_url.split("#")[0]
                chunk_url = f"{base_clean}#{self.current_anchor}"
            self.chunks.append(
                {
                    "heading": self.current_heading,
                    "text": text,
                    "page": self._page_counter,
                    "url": chunk_url,
                    "anchor": self.current_anchor,
                }
            )
            self.current_text = []

    def close_and_get_chunks(self) -> list[dict[str, Any]]:
        self._flush_chunk()
        return self.chunks


class SavannaStaticSource(ContentSource):
    """Adapter for Savanna course pages."""

    def __init__(self, static_dir: Path | str | None = None) -> None:
        self.static_dir = Path(static_dir) if static_dir else None
        self._default_chunks: list[ContentChunk] = self._load_default_course_chunks()
        self._dynamic_chunks: list[ContentChunk] = []

    def _load_default_course_chunks(self) -> list[ContentChunk]:
        """Built-in course content for 'Customer Service Foundations' and 'Virtual Assistant' in English, Amharic, Afaan Oromo, and Arabic."""
        return [
            # English chunks - Customer Service Foundations
            ContentChunk(
                chunk_id="csf_en_01",
                course_id="course_demo",
                title="Customer Service Foundations",
                heading="Module 1 - Welcome and Core Principles",
                text=(
                    "Customer Service Foundations introduces professional assistance principles. "
                    "Rule 1 is respect: treat every learner and client with dignity and empathy. "
                    "Rule 2 is active listening: hear what the customer is asking before answering. "
                    "Course assessments consist of knowledge checks at the end of each module."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-1",
                page=1,
                language="en",
            ),
            ContentChunk(
                chunk_id="csf_en_02",
                course_id="course_demo",
                title="Customer Service Foundations",
                heading="Module 2 - Communicating with customers",
                text=(
                    "Module 2 explains how to listen, clarify a customer's need, and respond clearly. "
                    "Listen carefully without interrupting. Rephrase the client's request to confirm "
                    "understanding. Provide concise, step-by-step instructions. Never use jargon. "
                    "For accessibility, always offer written instructions if audio is unclear."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-2",
                page=2,
                language="en",
            ),
            ContentChunk(
                chunk_id="csf_en_03",
                course_id="course_demo",
                title="Customer Service Foundations",
                heading="Module 3 - Handling Inquiries and Escalations",
                text=(
                    "Module 3 covers handling complex inquiries and knowing when to escalate. "
                    "When a customer issue cannot be solved within five minutes, connect them to a supervisor. "
                    "Always summarize the customer's issue so they do not have to repeat themselves. "
                    "Maintain a calm, supportive tone and follow up until the ticket is resolved."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-3",
                page=3,
                language="en",
            ),
            # English chunks - Virtual Assistant & Future of VA Industry
            ContentChunk(
                chunk_id="va_en_01",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="The Future of the VA Industry - Overview & Distinction",
                text=(
                    "The Virtual Assistant profession is not shrinking. It is evolving. As businesses become "
                    "more digital, more global, and more comfortable with remote collaboration, the need for skilled "
                    "support professionals continues to grow. At the same time, new technologies like Artificial "
                    "Intelligence are changing how support work gets done and what clients will value most in the years ahead. "
                    "An Important Distinction: Virtual Assistant can mean two different things. In some reports, a "
                    "'virtual assistant' refers to AI software assistants such as chatbots, voice assistants, and digital agents. "
                    "In other contexts, it refers to human remote professionals who provide business support online. "
                    "The future of the industry includes both, and increasingly, they will work together."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=1,
                language="en",
            ),
            ContentChunk(
                chunk_id="va_en_02",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="What is Shaping the Future of VA Work?",
                text=(
                    "What is shaping the future of virtual assistance and VA work? "
                    "1. More remote-first businesses: Companies are now more comfortable building distributed teams, "
                    "hiring remotely, and working across locations and time zones. That makes remote support roles more normal and scalable. "
                    "2. Growing demand for flexibility: Many businesses do not want to hire full-time, in-office staff for every task. "
                    "They increasingly value support that is flexible, efficient, and easy to scale up or down. "
                    "3. Rise of AI and Digital Productivity Tools: Virtual assistants use AI tools to draft communications, "
                    "organize schedules, analyze information, and deliver high-value strategic assistance."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=2,
                language="en",
            ),
            ContentChunk(
                chunk_id="va_en_03",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="Artificial Intelligence and the Future of VA Work",
                text=(
                    "Artificial Intelligence is an accelerator for virtual assistants, not a replacement for human judgment. "
                    "Practical ways virtual assistants use AI include drafting customer emails, organizing complex calendars, "
                    "summarizing meeting transcripts, and automating routine administrative workflows. "
                    "AI handles speed and repetition, while the human assistant provides context, relationship management, and critical oversight."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#artificial-intelligence-and-the-future-of-va-work",
                page=3,
                language="en",
            ),
            ContentChunk(
                chunk_id="va_en_04",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="What Clients Are Likely to Value More and More",
                text=(
                    "As the profession evolves, the most valuable virtual assistants will combine tool fluency with human strength. "
                    "What clients are likely to value more and more in virtual assistants: "
                    "1. AI fluency: Clients will increasingly value VAs who can use AI tools responsibly to save time, improve output quality, and streamline repetitive work. "
                    "2. Specialized expertise: The future will likely reward VAs who go beyond general support and develop deeper skills in one or two service areas. "
                    "3. Excellent human service: Responsiveness, dependability, emotional intelligence, professionalism, and clear communication will remain major differentiators."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-clients-are-likely-to-value-more-and-more",
                page=4,
                language="en",
            ),
            ContentChunk(
                chunk_id="va_en_05",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="What This Means for Aspiring Virtual Assistants",
                text=(
                    "What this means for aspiring virtual assistants: Success requires adaptability, continuous learning, and a focus on high-value human skills. "
                    "Don't fear AI—master the tools. Build specialized capabilities, maintain high standards of reliability and ethics, and communicate proactively with clients."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-this-means-for-aspiring-virtual-assistants",
                page=5,
                language="en",
            ),
            ContentChunk(
                chunk_id="va_en_06",
                course_id="course_demo",
                title="The Future of the VA Industry",
                heading="So, Is the Future of VA Promising?",
                text=(
                    "So, is the future of virtual assistance promising? Yes, the future of the VA industry is highly promising. "
                    "Remote-first business models and global digital commerce are expanding the overall market. "
                    "Virtual assistants who embrace digital tools and provide empathetic, dependable service will find growing opportunities."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#so-is-the-future-of-va-promising",
                page=6,
                language="en",
            ),
            # Amharic chunks - Customer Service Foundations
            ContentChunk(
                chunk_id="csf_am_01",
                course_id="course_demo",
                title="የደንበኞች አገልግሎት መሠረታዊ መርሆዎች",
                heading="ሞጁል 1 - መግቢያ እና መሠረታዊ መመሪያዎች",
                text=(
                    "የደንበኞች አገልግሎት መሠረታዊ መርሆዎች ሙያዊ አገልግሎት አሰጣጥን ያስተምራል። "
                    "ዋነኛው መመሪያ አክብሮት ነው፡ እያንዳንዱን ተማሪና ደንበኛ በአክብሮትና በርህራሄ ማስተናገድ። "
                    "ሁለተኛው መመሪያ በትኩረት ማዳመጥ ነው፡ መልስ ከመስጠትዎ በፊት የደንበኛውን ጥያቄ በጥሞና ያዳምጡ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-1",
                page=1,
                language="am",
            ),
            ContentChunk(
                chunk_id="csf_am_02",
                course_id="course_demo",
                title="የደንበኞች አገልግሎት መሠረታዊ መርሆዎች",
                heading="ሞጁል 2 - ከደንበኞች ጋር መገናኘት",
                text=(
                    "ሞጁል 2 ደንበኛን ማዳመጥ፣ ፍላጎቱን ማብራራት እና ግልጽ ምላሽ መስጠትን ያስረዳል። "
                    "ደንበኛውን ሳያቋርጡ በጥሞና ያዳምጡ። የደንበኛውን ጥያቄ በትክክል መረዳትዎን ለማረጋገጥ ደግመው ይግለጹ። "
                    "አጭርና ግልጽ የሆኑ ደረጃ በደረጃ መመሪያዎችን ይስጡ። ውስብስብ ቃላትን አይጠቀሙ። "
                    "ተደራሽነትን ለማረጋገጥ የድምጽ መልዕክቱ ግልጽ ካልሆነ ሁልጊዜ የጽሑፍ መመሪያ ያቅርቡ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-2",
                page=2,
                language="am",
            ),
            ContentChunk(
                chunk_id="csf_am_03",
                course_id="course_demo",
                title="የደንበኞች አገልግሎት መሠረታዊ መርሆዎች",
                heading="ሞጁል 3 - አስቸጋሪ ሁኔታዎችን መቆጣጠር እና ማስተላለፍ",
                text=(
                    "ሞጁል 3 ውስብስብ ጥያቄዎችን እንዴት ማስተናገድ እንደሚቻል እና መቼ ለሌላ ባለሙያ ማስተላለፍ እንዳለበት ያብራራል። "
                    "አንድ ችግር በአምስት ደቂቃ ውስጥ መፍታት ካልተቻለ ለተቆጣጣሪ ያስተላልፉ። "
                    "ደንበኛው ችግሩን ደጋግሞ እንዳይናገር ሁልጊዜ የችግሩን ማጠቃለያ ለሚቀጥለው ባለሙያ ያስረክቡ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-3",
                page=3,
                language="am",
            ),
            # Amharic chunks - Virtual Assistant
            ContentChunk(
                chunk_id="va_am_01",
                course_id="course_demo",
                title="የቨርቹዋል ረዳት (VA) ኢንዱስትሪ የወደፊት እጣ ፈንታ",
                heading="የቨርቹዋል ረዳት ሙያ አጠቃላይ እይታ እና ልዩነት",
                text=(
                    "የቨርቹዋል ረዳት ሙያ እየቀነሰ ሳይሆን እየተሻሻለና እያደገ ነው። ንግዶች ዲጂታል እና የርቀት ስራን ሲመርጡ "
                    "የሰለጠኑ የድጋፍ ባለሙያዎች ፍላጎት በከፍተኛ ሁኔታ እየጨመረ ነው። በተመሳሳይ ጊዜ አርቴፊሻል ኢንተለጀንስ (AI) "
                    "የድጋፍ ስራዎች እንዴት እንደሚከናወኑ እየቀየረ ነው። "
                    "አስፈላጊ ልዩነት፡ ቨርቹዋል ረዳት ሁለት ነገሮችን ሊያመለክት ይችላል። አንደኛው የ AI ሶፍትዌር ረዳቶች (ቻትቦቶች፣ ዲጂታል ወኪሎች) ሲሆኑ፣ "
                    "ሁለተኛው ደግሞ በበይነመረብ በኩል የንግድ ድጋፍ የሚሰጡ የሰው ባለሙያዎች ናቸው። የወደፊቱ ኢንዱስትሪ ሁለቱንም ያካተተ ሲሆን ተቀናጅተው ይሰራሉ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=1,
                language="am",
            ),
            ContentChunk(
                chunk_id="va_am_02",
                course_id="course_demo",
                title="የቨርቹዋል ረዳት (VA) ኢንዱስትሪ የወደፊት እጣ ፈንታ",
                heading="የቨርቹዋል ረዳት ስራን የወደፊት ሁኔታ የሚቀርጹ ጉዳዮች",
                text=(
                    "የቨርቹዋል ረዳት ስራን የወደፊት እጣ ፈንታ የሚቀርጹ 3 ዋና ዋና ጉዳዮች አሉ፡ "
                    "1. የርቀት ስራን የሚያስቀድሙ ንግዶች መጨመር፡ ድርጅቶች በዓለም ዙሪያ የርቀት ቡድኖችን መገንባት ለምደዋል። "
                    "2. ለተለዋዋጭነት ያለው ፍላጎት ማደግ፡ ድርጅቶች ቋሚ የቢሮ ሰራተኛ ከመቅጠር ይልቅ ተለዋዋጭና ቀልጣፋ ድጋፍን ይመርጣሉ። "
                    "3. የ AI እና ዲጂታል መሳሪያዎች መስፋፋት፡ ቨርቹዋል ረዳቶች AIን በመጠቀም መደበኛ ስራዎችን በማከናወን ጥራት ያለው ስራ ይሰራሉ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=2,
                language="am",
            ),
            ContentChunk(
                chunk_id="va_am_03",
                course_id="course_demo",
                title="የቨርቹዋል ረዳት (VA) ኢንዱስትሪ የወደፊት እጣ ፈንታ",
                heading="ደንበኞች ከጊዜ ወደ ጊዜ የበለጠ ዋጋ የሚሰጡባቸው ነገሮች (What Clients Value More and More)",
                text=(
                    "የቨርቹዋል ረዳት ሙያ እያደገ ሲሄድ ደንበኞች ከጊዜ ወደ ጊዜ የበለጠ ዋጋ የሚሰጡባቸው 3 ዋና ዋና ነገሮች አሉ፡ "
                    "1. የ AI ቅልጥፍና እና እውቀት (AI fluency)፡ ጊዜን ለመቆጠብ፣ የስራ ጥራትን ለማሻሻል እና ተደጋጋሚ ስራዎችን ለማቀላጠፍ የ AI መሳሪያዎችን በኃላፊነት መጠቀም የሚችሉ ረዳቶች በደንበኞች ዘንድ ከፍተኛ ዋጋ ይሰጣቸዋል። "
                    "2. ልዩ ሙያዊ ብቃት (Specialized expertise)፡ ከአጠቃላይ ድጋፍ ባለፈ በአንድ ወይም በሁለት የስራ መስኮች ጥልቅ ክህሎት ማዳበር የወደፊቱ የስራ ገበያ ሽልማት ነው። "
                    "3. የላቀ የሰው አገልግሎት (Excellent human service)፡ ፈጣን ምላሽ፣ ታማኝነት፣ ስሜታዊ ብልህነት፣ ሙያዊ ብቃት እና ግልጽ ግንኙነት ዋና መለያ ሆነው ይቀጥላሉ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-clients-are-likely-to-value-more-and-more",
                page=3,
                language="am",
            ),
            ContentChunk(
                chunk_id="va_am_04",
                course_id="course_demo",
                title="የቨርቹዋል ረዳት (VA) ኢንዱስትሪ የወደፊት እጣ ፈንታ",
                heading="ይህ ለአዳዲስ ቨርቹዋል ረዳቶች ምን ማለት ነው? እና የወደፊቱ ተስፋ",
                text=(
                    "የቨርቹዋል ረዳት ስራ የወደፊት እጣ ፈንታ እጅግ ተስፋ ሰጪ ነው። አዳዲስ ረዳቶች የ AI መሳሪያዎችን መፍራት ሳይሆን በብቃት መልመድ አለባቸው። "
                    "አስተማማኝነትን፣ ስነ-ምግባርን እና ግልጽ ተግባቦትን በማጣመር በገበያው ውስጥ ተፈላጊ መሆን ይችላሉ።"
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-this-means-for-aspiring-virtual-assistants",
                page=4,
                language="am",
            ),
            # Afaan Oromo chunks - Customer Service & Virtual Assistant
            ContentChunk(
                chunk_id="csf_om_01",
                course_id="course_demo",
                title="Bu'uuraalee Tajaajila Maamiltootaa",
                heading="Kutaa 1 - Baga Nagaan Dhuftan fi Qajeeltoowwan Bu'uuraa",
                text=(
                    "Bu'uuraaleen Tajaajila Maamiltootaa qajeeltoowwan gargaarsa ogummaa barsiisa. "
                    "Qajeeltoon 1ffaa kabaja: barataa fi maamila hundumaa kabajaa fi jaalalaan keessummeessuu. "
                    "Qajeeltoon 2ffaa sirriitti dhaggeeffachuu: deebii kennuu keessan dura maamilri maal akka gaafatu hubachuu. "
                    "Madaalliin barnootaa qormaata hubannoo xumura kutaa irratti kennamu of keessaa qaba."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-1",
                page=1,
                language="om",
            ),
            ContentChunk(
                chunk_id="csf_om_02",
                course_id="course_demo",
                title="Bu'uuraalee Tajaajila Maamiltootaa",
                heading="Kutaa 2 - Maamiltoota Waliin Qunnamtii Taasisuu",
                text=(
                    "Kutaan 2 akkamitti akka dhaggeeffatan, fedhii maamilaa ifa gochuu fi deebii ifaa kennuu ibsa. "
                    "Utuu hin katin maamila sirriitti dhaggeeffadhaa. Gaaffii maamilaa irra deebi'aa mirkaneeffadhaa. "
                    "Qajeelfama gabaabaa fi sadarkaa sadarkaan kennamu dhiyeessaa. Jechoota teeknikaa rakkisoo hin fayyadaminaa. "
                    "Qajeelfama barruudhaan dhiheessaa yoo sagaleen ifa hin taane."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-2",
                page=2,
                language="om",
            ),
            ContentChunk(
                chunk_id="csf_om_03",
                course_id="course_demo",
                title="Bu'uuraalee Tajaajila Maamiltootaa",
                heading="Kutaa 3 - Rakkoolee Maamiltootaa Furuu",
                text=(
                    "Kutaan 3 gaaffiiwwan walxaxoo akkamitti akka keessummeessaniifi yoom akka nama biraatti dabarsan ibsa. "
                    "Rakkina tokko daqiiqaa shan keessatti furuu yoo hin dandeenye, to'ataaf dabarsaa. "
                    "Maamilichi rakkina isaa irra deebiee akka hin dubbanneef gabaabaa rakkichaa dabarsaa."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-3",
                page=3,
                language="om",
            ),
            ContentChunk(
                chunk_id="va_om_01",
                course_id="course_demo",
                title="Gara Fuulduraa Indastirii Gargaaraa Wiirtuu (VA)",
                heading="Ibsa Waliigalaa fi Garaagarummaa Indastirii VA",
                text=(
                    "Ogummaan Gargaaraa Wiirtuu (Virtual Assistant) hin xiqqaatu; guddachaa fi jijjiiramaa jira. "
                    "Dhaabbileen hedduun gara hojii fageenyaatti jijjiiramaa waan jiraniif, ogeeyyii deeggarsaa dandeettii qaban barbaadu. "
                    "Garaagarummaa barbaachisaa: Gargaaraan wiirtuu wantoota lama agarsiisuu danda'a. "
                    "Tokkoffaa, gargaartota software AI (chatbots, voice assistants). Lammaffaa, ogeeyyii namaa fageenyarraa tajaajila kennan. "
                    "Gara fuulduraatti lameen isaaniiyyuu walta'anii hojjetu."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=1,
                language="om",
            ),
            ContentChunk(
                chunk_id="va_om_02",
                course_id="course_demo",
                title="Gara Fuulduraa Indastirii Gargaaraa Wiirtuu (VA)",
                heading="Waan Gara Fuulduraa Hojii VA Qajeelchu",
                text=(
                    "Hojii gargaaraa wiirtuu (VA) gara fuulduraatti kan qajeelchan qabxiilee gurguddoo 3 dha: "
                    "1. Dhaabbilee hojii fageenyaa dursan dabaluu: Dhaabbileen garee bakka adda addaatii ijaaruu danda'u. "
                    "2. Fedhii socho'iinsa fi mijatoo ta'uu dabaluu: Hojjettoota waajjiraa dhaabbataa qacaruu mannaa gargaarsa mijataa barbaadu. "
                    "3. Babal'ina meeshaalee AI fi dijitaalaa: Ogeeyyiin VA meeshaalee AI fayyadamuun hojii qulqullina olaanaa qabu hojjetu."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=2,
                language="om",
            ),
            ContentChunk(
                chunk_id="va_om_03",
                course_id="course_demo",
                title="Gara Fuulduraa Indastirii Gargaaraa Wiirtuu (VA)",
                heading="Wanta Maamiltoonni Yeroo Gara Yerootti Caalaatti Bakka Guddaa Kennaniif",
                text=(
                    "Ogummaan gargaaraa wiirtuu (VA) yeroo babal'atu, maamiltoonni wantoota 3 gurguddoo kanaaf caalaatti bakka guddaa kennu: "
                    "1. Dandeettii fi Ogummaa AI (AI fluency): Meeshaalee AI sirnaan fayyadamuun yeroo qusachuu fi qulqullina hojii dabaluu. "
                    "2. Ogummaa Addaa (Specialized expertise): Deeggarsa waliigalaa irra darbee damee tajaajilaa tokko ykn lama irratti dandeettii gad-fagoo qabaachuu. "
                    "3. Tajaajila Namaa Ol'aanaa (Excellent human service): Deebii ariifachiisaa, amanamummaa, hubannoo miiraa fi qunnamtii ifaa qabaachuu."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-clients-are-likely-to-value-more-and-more",
                page=3,
                language="om",
            ),
            # Arabic chunks - Customer Service & Virtual Assistant
            ContentChunk(
                chunk_id="csf_ar_01",
                course_id="course_demo",
                title="أساسيات خدمة العملاء",
                heading="الوحدة 1 - الترحيب والمبادئ الأساسية",
                text=(
                    "تقدم دورة أساسيات خدمة العملاء مبادئ المساعدة المهنية. "
                    "القاعدة الأولى هي الاحترام: تعامل مع كل متعلم وعميل بتقدير وتعاطف. "
                    "القاعدة الثانية هي الاستماع الفعّال: استمع جيداً لما يطلبه العميل قبل الإجابة. "
                    "تتضمن تقييمات الدورة اختبارات تحقق من المعرفة في نهاية كل وحدة تعليمية."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-1",
                page=1,
                language="ar",
            ),
            ContentChunk(
                chunk_id="csf_ar_02",
                course_id="course_demo",
                title="أساسيات خدمة العملاء",
                heading="الوحدة 2 - التواصل الفعال مع العملاء",
                text=(
                    "توضح الوحدة الثانية كيفية الاستماع بعناية وتوضيح احتياجات العميل والاستجابة بوضوح ودقة. "
                    "استمع بعناية دون مقاطعة العميل. أعد صياغة نقطة العميل للتأكد من الفهم الكامل. "
                    "قدم تعليمات موجزة خطوة بخطوة وتجنب المصطلحات المعقدة. "
                    "لأغراض سهولة الوصول، قدم دائماً تعليمات مكتوبة إذا كان الصوت غير واضح."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-2",
                page=2,
                language="ar",
            ),
            ContentChunk(
                chunk_id="csf_ar_03",
                course_id="course_demo",
                title="أساسيات خدمة العملاء",
                heading="الوحدة 3 - إدارة المشكلات المعقدة والتصعيد",
                text=(
                    "تشرح الوحدة الثالثة كيفية التعامل مع المشكلات المعقدة ومتى يجب تصعيدها إلى مشرف الدعم. "
                    "إذا تعذر حل مشكلة ما في غضون خمس دقائق، فقم بتصعيدها إلى المشرف المسؤول. "
                    "لخص مشكلة العميل بدقة حتى لا يضطر العميل إلى تكرار شرحها مرة أخرى."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#module-3",
                page=3,
                language="ar",
            ),
            ContentChunk(
                chunk_id="va_ar_01",
                course_id="course_demo",
                title="مستقبل قطاع المساعد الافتراضي (VA)",
                heading="نظرة عامة على مهنة المساعد الافتراضي والتمييز المهم",
                text=(
                    "مهنة المساعد الافتراضي (Virtual Assistant) في تطور وتوسع مستمر وليست في تراجع. "
                    "مع تحول الشركات نحو الرقمنة والعمل عن بُعد، يتزايد الطلب على محترفي الدعم المهرة. "
                    "في الوقت نفسه، تغير تقنيات الذكاء الاصطناعي طريقة إنجاز أعمال الدعم والخدمات. "
                    "تمييز مهم: يمكن للمساعد الافتراضي أن يعني برمجيات الذكاء الاصطناعي كالمساعدات الرقمية الآلية، "
                    "أو المحترفين البشريين الذين يقدمون الدعم الإداري والتقني عن بُعد. المستقبل يجمع بينهما بتكامل فعال."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=1,
                language="ar",
            ),
            ContentChunk(
                chunk_id="va_ar_02",
                course_id="course_demo",
                title="مستقبل قطاع المساعد الافتراضي (VA)",
                heading="ما الذي يشكل مستقبل عمل المساعد الافتراضي؟",
                text=(
                    "تشكل 3 عوامل رئيسية مستقبل عمل المساعد الافتراضي: "
                    "1. زيادة الشركات المعتمدة على العمل عن بُعد: بناء فرق عمل موزعة عبر مناطق زمنية متعددة. "
                    "2. الطلب المتزايد على المرونة: تفضيل الدعم السريع القابل للتوسع بدلاً من التوظيف المكتبي التقليدي. "
                    "3. تطور أدوات الذكاء الاصطناعي والإنتاجية الرقمية: استثمار أدوات الذكاء الاصطناعي لرفع كفاءة المهام اليومية وتقديم قيمة استراتيجية للعملاء."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-is-shaping-the-future-of-va-work",
                page=2,
                language="ar",
            ),
            ContentChunk(
                chunk_id="va_ar_03",
                course_id="course_demo",
                title="مستقبل قطاع المساعد الافتراضي (VA)",
                heading="ما يقدره العملاء أكثر فأكثر مع تطور المهنة",
                text=(
                    "مع تطور مهنة المساعد الافتراضي، يقدر العملاء أكثر فأكثر المساعدين الذين يجمعون بين إتقان الأدوات التقنية والقيم الإنسانية: "
                    "1. إتقان الذكاء الاصطناعي (AI fluency): يقدر العملاء بشكل متزايد المساعدين القادرين على استخدام أدوات الذكاء الاصطناعي بمسؤولية لتوفير الوقت وتحسين جودة المخرجات. "
                    "2. الخبرة المتخصصة (Specialized expertise): يكافئ المستقبل المساعدين الذين يتجاوزون الدعم العام ويطورون مهارات متقدمة في مجال أو مجالين من مجالات الخدمة. "
                    "3. الخدمة الإنسانية المتميزة (Excellent human service): تظل سرعة الاستجابة، والموثوقية، والذكاء العاطفي، والاحترافية، والتواصل الواضح من أهم نقاط التمايز."
                ),
                url=f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html#what-clients-are-likely-to-value-more-and-more",
                page=3,
                language="ar",
            ),
        ]

    def parse_html_file(
        self, file_path: Path, course_id: str = "course_demo"
    ) -> list[ContentChunk]:
        """Parse an HTML file into ContentChunks using heading boundaries."""
        try:
            content = file_path.read_text(encoding="utf-8")
        except Exception:
            return []

        url_path = f"{SAVANNA_HOST}/savanna/pages/{file_path.name}"
        parser = SimpleHtmlChunker(
            base_url=url_path,
            default_title=file_path.stem.replace("-", " ").title(),
        )
        parser.feed(content)
        parsed = parser.close_and_get_chunks()

        chunks: list[ContentChunk] = []
        for idx, item in enumerate(parsed):
            # Detect language
            is_amharic = bool(re.search(r"[\u1200-\u137F]", item["text"] + item["heading"]))
            chunk_title = parser.title
            if "concept-with-navigation" in file_path.stem and "Module 2" not in chunk_title:
                chunk_title = f"Module 2: {chunk_title}"
            chunks.append(
                ContentChunk(
                    chunk_id=f"{file_path.stem}_{idx + 1}",
                    course_id=course_id,
                    title=chunk_title,
                    heading=item["heading"],
                    text=item["text"],
                    url=item.get("url") or url_path,
                    page=item.get("page", 1),
                    language="am" if is_amharic else "en",
                )
            )
        return chunks

    def add_dynamic_content(
        self, title: str, url: str, content: str, course_id: str = "course_demo"
    ) -> list[ContentChunk]:
        """Ingest live platform HTML or text content from active browser page."""
        if not content or not content.strip():
            return []
        from savanna_bridge.language import LanguageGuard

        parser = SimpleHtmlChunker(base_url=url, default_title=title or "Current Platform Page")
        parser.feed(content)
        parsed = parser.close_and_get_chunks()
        new_chunks: list[ContentChunk] = []

        # If parser didn't find HTML headings (e.g. plain text or single block)
        if not parsed or (len(parsed) == 1 and parsed[0]["heading"] == "General Overview"):
            # Split plain text content into logical paragraphs/sections
            paragraphs = [p.strip() for p in re.split(r"\n\s*\n|(?<=[.!?፡።])\s{2,}", content) if p.strip()]
            if len(paragraphs) > 1:
                parsed = []
                for idx, p in enumerate(paragraphs):
                    first_line = re.sub(r"^#+\s*", "", p.split("\n")[0]).strip()
                    lines = [line.strip() for line in p.split("\n") if line.strip()]
                    # A real heading is concise and does not end with sentence period or comma
                    is_real_heading = len(first_line) <= 60 and not first_line.endswith((".", ","))
                    h = first_line.rstrip(":") if is_real_heading else f"Lesson Content {idx + 1}"
                    body_lines = [line for line in (lines[1:] if is_real_heading else lines) if not line.startswith("#")]
                    clean_text = "\n".join(body_lines) if body_lines else re.sub(r"^#+\s*", "", p).strip()
                    parsed.append({"heading": h, "text": clean_text or first_line, "page": 1})

        for idx, item in enumerate(parsed):
            clean_heading = re.sub(r"^#+\s*", "", item["heading"]).strip()
            clean_text = re.sub(r"^#+\s*", "", item["text"]).strip()
            chunk_title = title or parser.title
            if "concept-with-navigation" in url and "Module 2" not in chunk_title:
                chunk_title = f"Module 2: {chunk_title}"
            detected_lang = LanguageGuard.detect_language(clean_text + " " + clean_heading)
            c = ContentChunk(
                chunk_id=f"live_{idx + 1}_{abs(hash(url)) % 10000}",
                course_id=course_id,
                title=chunk_title,
                heading=clean_heading or "Section",
                text=clean_text or clean_heading,
                url=url,
                page=item.get("page", 1),
                language=detected_lang,
            )
            new_chunks.append(c)
        # Keep recent dynamic chunks prioritized
        self._dynamic_chunks = new_chunks + [c for c in self._dynamic_chunks if c.url != url][:200]
        return new_chunks

    def get_chunks(self, course_id: str | None = None) -> list[ContentChunk]:
        chunks = list(self._dynamic_chunks) + list(self._default_chunks)
        candidate_dirs: list[Path] = []
        if self.static_dir and self.static_dir.is_dir():
            candidate_dirs.append(self.static_dir)
        for cand in [Path("Savanna-static-pages"), Path("demo-host"), Path("../Savanna-static-pages"), Path("../demo-host")]:
            if cand.is_dir() and cand not in candidate_dirs:
                candidate_dirs.append(cand)

        for d in candidate_dirs:
            try:
                for html_file in d.rglob("*.html"):
                    if any(ignored in str(html_file) for ignored in ["widget", "node_modules", ".git", "dist"]):
                        continue
                    chunks.extend(self.parse_html_file(html_file, course_id=course_id or "course_demo"))
            except Exception:
                continue

        if course_id:
            filtered = [c for c in chunks if c.course_id == course_id]
            if filtered:
                return filtered
        return chunks


class GenericHtmlSource(ContentSource):
    """Generic crawler / parser adapter for arbitrary external web pages."""

    def __init__(self, html_content: str | None = None, url: str = f"{SAVANNA_HOST}/savanna/pages/concept-with-navigation.html") -> None:
        self.html_content = html_content or ""
        self.url = url

    def get_chunks(self, course_id: str | None = None) -> list[ContentChunk]:
        if not self.html_content:
            return []
        parser = SimpleHtmlChunker(base_url=self.url, default_title="Web Document")
        parser.feed(self.html_content)
        parsed = parser.close_and_get_chunks()
        chunks: list[ContentChunk] = []
        for idx, item in enumerate(parsed):
            is_amharic = bool(re.search(r"[\u1200-\u137F]", item["text"] + item["heading"]))
            chunks.append(
                ContentChunk(
                    chunk_id=f"doc_{idx + 1}",
                    course_id=course_id or "generic",
                    title=parser.title,
                    heading=item["heading"],
                    text=item["text"],
                    url=self.url,
                    page=item.get("page", 1),
                    language="am" if is_amharic else "en",
                )
            )
        return chunks
