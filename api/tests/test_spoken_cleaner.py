"""Snapshot tests for make_spoken rule-based speech cleaner (Step 3).

Verifies answers containing:
1. Emoji and pictographs (Unicode ranges, variation selectors, ZWJ)
2. Markdown symbols (#, *, _, backticks)
3. URLs (raw and markdown links)
4. [n] citation markers and 'Source:' lines
5. Lists (bulleted and numbered -> spoken ordinals)
6. Tables (pipes transformed to spoken clauses)
7. Numbers spelled out into words
8. Long passages (>3 sentences -> kept first 3 + read more offer)
Both in English and Amharic.
"""

from __future__ import annotations

from savanna_bridge.models import Language
from savanna_bridge.speech import make_spoken, number_to_words


def test_make_spoken_elements_english() -> None:
    raw_text = (
        "# Module 2: Customer Satisfaction 🚀🎉\n\n"
        "Here are 3 core principles for customer satisfaction [1] [citation needed]!\n"
        "Source: Customer Relations Handbook 2026\n\n"
        "For details visit https://learning.example.org or [Course Syllabus](https://learning.example.org/syllabus)."
    )
    spoken = make_spoken(raw_text, Language.EN)

    # 1. No emoji
    assert "🚀" not in spoken
    assert "🎉" not in spoken
    # 2. No markdown headers, backticks, bold
    assert "#" not in spoken
    assert "`" not in spoken
    # 3. No raw URLs
    assert "https://" not in spoken
    assert "Course Syllabus" in spoken  # Link text preserved
    # 4. No citations or Source lines
    assert "[1]" not in spoken
    assert "Source:" not in spoken
    assert "Customer Relations Handbook" not in spoken
    # 5. Numbers spelled out
    assert "three" in spoken
    assert "two" in spoken


def test_make_spoken_elements_amharic() -> None:
    raw_text = (
        "# ሞጁል 2: የደንበኞች አገልግሎት መርሆዎች 😊✨\n\n"
        "ደንበኞች ከጊዜ ወደ ጊዜ የሚፈልጓቸው 3 ዋና ነገሮች አሉ [1] [citation needed]።\n"
        "ምንጭ፡ የሳቫና የትምህርት ማዕቀፍ\n\n"
        "ዝርዝሩን በ https://savanna.edu ወይም [በትምህርት መመሪያው](https://savanna.edu/guide) ያንብቡ።"
    )
    spoken = make_spoken(raw_text, Language.AM)

    # 1. No emoji
    assert "😊" not in spoken
    assert "✨" not in spoken
    # 2. No markdown headers
    assert "#" not in spoken
    # 3. No raw URLs
    assert "https://" not in spoken
    assert "በትምህርት መመሪያው" in spoken
    # 4. No citations or Source lines
    assert "[1]" not in spoken
    assert "ምንጭ" not in spoken
    # 5. Numbers spelled out
    assert "ሦስት" in spoken
    assert "ሁለት" in spoken
    # 6. Ethiopic punctuation normalized
    assert "።" in spoken


def test_make_spoken_list_to_ordinals_english() -> None:
    raw = (
        "Follow these recommendations:\n"
        "- Acknowledge the learner concern\n"
        "- Clarify any ambiguities\n"
        "- Provide a step-by-step solution"
    )
    spoken = make_spoken(raw, Language.EN)
    assert "First, Acknowledge the learner concern" in spoken
    assert "Second, Clarify any ambiguities" in spoken
    assert "Finally, Provide a step-by-step solution" in spoken
    assert not spoken.startswith("-")
    assert "- Acknowledge" not in spoken


def test_make_spoken_list_to_ordinals_amharic() -> None:
    raw = (
        "ዋና ምክሮች፦\n"
        "• ደንበኛውን በአክብሮት መቀበል\n"
        "• ጥያቄዎችን በጥሞና ማዳመጥ\n"
        "• ፈጣን መፍትሔ ማቅረብ"
    )
    spoken = make_spoken(raw, Language.AM)
    assert "በመጀመሪያ፣ ደንበኛውን በአክብሮት መቀበል" in spoken
    assert "በሁለተኛ ደረጃ፣ ጥያቄዎችን በጥሞና ማዳመጥ" in spoken
    assert "በመጨረሻ፣ ፈጣን መፍትሔ ማቅረብ" in spoken
    assert "•" not in spoken


def test_make_spoken_table_transformation_english_and_amharic() -> None:
    raw_en = (
        "| Step | Action |\n"
        "| --- | --- |\n"
        "| 1 | Register online |\n"
        "| 2 | Complete onboarding |"
    )
    spoken_en = make_spoken(raw_en, Language.EN)
    assert "|" not in spoken_en
    assert "Step, Action" in spoken_en
    assert "one, Register online" in spoken_en
    assert "two, Complete onboarding" in spoken_en

    raw_am = (
        "| ደረጃ | ተግባር |\n"
        "| --- | --- |\n"
        "| 1 | ፍላጎትን ማዳመጥ |\n"
        "| 2 | ግልጽ ምላሽ መስጠት |"
    )
    spoken_am = make_spoken(raw_am, Language.AM)
    assert "|" not in spoken_am
    assert "ደረጃ፣ ተግባር" in spoken_am
    assert "አንድ፣ ፍላጎትን ማዳመጥ" in spoken_am
    assert "ሁለት፣ ግልጽ ምላሽ መስጠት" in spoken_am


def test_make_spoken_long_passage_truncated_english() -> None:
    passage = (
        "Module 2 explains customer communication. "
        "It teaches you to listen with empathy. "
        "You clarify needs before answering. "
        "You also verify whether the customer is satisfied. "
        "Finally, you log the resolution in the CRM system."
    )
    spoken = make_spoken(passage, Language.EN)
    assert spoken.endswith("Would you like me to read the full answer?")
    assert "CRM system" not in spoken
    assert "Module two explains customer communication" in spoken


def test_make_spoken_long_passage_truncated_amharic() -> None:
    passage = (
        "ሞጁል ሁለት የደንበኞች አገልግሎት ግንኙነትን ያስተምራል። "
        "ፍላጎታቸውን በጥሞና እንድታዳምጡ ይረዳዎታል። "
        "ከመመለስዎ በፊት ግልጽ ጥያቄዎችን ይጠይቃሉ። "
        "በመጨረሻም ደንበኛው መርካቱን ያረጋግጣሉ። "
        "ሁሉንም መረጃ በመዝገብ ላይ ያሰፍራሉ።"
    )
    spoken = make_spoken(passage, Language.AM)
    assert spoken.endswith("ሙሉውን መልስ እንዳነብልዎ ይፈልጋሉ?")
    assert "ሁሉንም መረጃ በመዝገብ ላይ ያሰፍራሉ።" not in spoken
    assert "ሞጁል ሁለት" in spoken


def test_make_spoken_short_text_no_read_more() -> None:
    short_en = "Module 2 covers customer communication. It helps you listen clearly."
    spoken_en = make_spoken(short_en, Language.EN)
    assert "Would you like me to read the full answer?" not in spoken_en
    assert spoken_en == "Module two covers customer communication. It helps you listen clearly."

    short_am = "ሞጁል ሁለት የደንበኞች ግንኙነትን ያስተምራል። ጥያቄዎችን ለመመለስ ይረዳዎታል።"
    spoken_am = make_spoken(short_am, Language.AM)
    assert "ሙሉውን መልስ እንዳነብልዎ ይፈልጋሉ?" not in spoken_am
    assert "ሞጁል ሁለት" in spoken_am


def test_number_to_words_multilingual() -> None:
    assert number_to_words(0, "en") == "zero"
    assert number_to_words(5, "en") == "five"
    assert number_to_words(15, "en") == "fifteen"
    assert number_to_words(42, "en") == "forty-two"
    assert number_to_words(100, "en") == "one hundred"

    assert number_to_words(1, "am") == "አንድ"
    assert number_to_words(12, "am") == "አስራ ሁለት"
    assert number_to_words(50, "am") == "ኃምሳ"
    assert number_to_words(100, "am") == "መቶ"
