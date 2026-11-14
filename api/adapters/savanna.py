"""Content adapters for Savanna static course HTML and generic HTML pages."""

from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from adapters.base import ContentChunk, ContentSource


class SimpleHtmlChunker(HTMLParser):
    """Parses HTML into sections based on headings (h1, h2, h3)."""

    def __init__(self, base_url: str, default_title: str = "Course Document") -> None:
        super().__init__()
        self.base_url = base_url
        self.title = default_title
        self.current_heading = "General Overview"
        self.current_text: list[str] = []
        self.chunks: list[dict[str, Any]] = []
        self._in_title = False
        self._in_heading = False
        self._heading_buffer: list[str] = []
        self._page_counter = 1

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "title":
            self._in_title = True
        elif tag.lower() in ("h1", "h2", "h3"):
            # Save accumulated text for prior heading
            self._flush_chunk()
            self._in_heading = True
            self._heading_buffer = []

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self._in_title = False
        elif tag.lower() in ("h1", "h2", "h3"):
            self._in_heading = False
            heading_str = " ".join(self._heading_buffer).strip()
            if heading_str:
                self.current_heading = heading_str
                if tag.lower() == "h1" and self.title == "Course Document":
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
            self.chunks.append(
                {
                    "heading": self.current_heading,
                    "text": text,
                    "page": self._page_counter,
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

    def _load_default_course_chunks(self) -> list[ContentChunk]:
        """Built-in course content for 'Customer Service Foundations' in English and Amharic."""
        return [
            # English chunks
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
                url="https://learning.example.org/courses/course_demo/module-1",
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
                url="https://learning.example.org/courses/course_demo/module-2",
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
                url="https://learning.example.org/courses/course_demo/module-3",
                page=3,
                language="en",
            ),
            # Amharic chunks
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
                url="https://learning.example.org/courses/course_demo/module-1",
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
                url="https://learning.example.org/courses/course_demo/module-2",
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
                url="https://learning.example.org/courses/course_demo/module-3",
                page=3,
                language="am",
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

        parser = SimpleHtmlChunker(
            base_url=f"https://learning.example.org/courses/{course_id}",
            default_title=file_path.stem.replace("-", " ").title(),
        )
        parser.feed(content)
        parsed = parser.close_and_get_chunks()

        chunks: list[ContentChunk] = []
        for idx, item in enumerate(parsed):
            # Detect language
            is_amharic = bool(re.search(r"[\u1200-\u137F]", item["text"] + item["heading"]))
            chunks.append(
                ContentChunk(
                    chunk_id=f"{file_path.stem}_{idx + 1}",
                    course_id=course_id,
                    title=parser.title,
                    heading=item["heading"],
                    text=item["text"],
                    url=f"https://learning.example.org/courses/{course_id}/{file_path.stem}",
                    page=item.get("page", 1),
                    language="am" if is_amharic else "en",
                )
            )
        return chunks

    def get_chunks(self, course_id: str | None = None) -> list[ContentChunk]:
        chunks = list(self._default_chunks)
        # If static_dir exists, scan for .html files and merge
        if self.static_dir and self.static_dir.is_dir():
            for html_file in self.static_dir.glob("*.html"):
                chunks.extend(self.parse_html_file(html_file, course_id=course_id or "course_demo"))

        if course_id:
            filtered = [c for c in chunks if c.course_id == course_id]
            if filtered:
                return filtered
        return chunks


class GenericHtmlSource(ContentSource):
    """Generic crawler / parser adapter for arbitrary external web pages."""

    def __init__(self, html_content: str | None = None, url: str = "https://example.org") -> None:
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
