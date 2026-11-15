"""BM25 retrieval engine with multilingual tokenization and confidence scoring."""

from __future__ import annotations

import math
import re
from typing import Any

try:
    from rank_bm25 import BM25Plus

    HAS_RANK_BM25 = True
except ImportError:
    HAS_RANK_BM25 = False

from adapters.base import ContentChunk, ContentSource
from adapters.savanna import SavannaStaticSource
from savanna_bridge.config import CONFIDENCE_THRESHOLD
from savanna_bridge.models import Citation, Language

STOP_WORDS = {
    "the",
    "is",
    "a",
    "an",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "and",
    "or",
    "who",
    "what",
    "where",
    "when",
    "why",
    "how",
    "with",
    "by",
    "from",
    "it",
    "this",
    "that",
    "there",
    "be",
    "are",
    "was",
    "were",
    "do",
    "does",
    "did",
}


def tokenize(text: str) -> list[str]:
    """Tokenize English, Amharic (Ethiopic script), and multilingual text."""
    if not text:
        return []
    # Replace Ge'ez punctuation with whitespace
    normalized = re.sub(r"[\u1361-\u1368]", " ", text)
    # Extract alphanumeric words and Ethiopic character sequences
    tokens = re.findall(r"[\w\u1200-\u137F]+", normalized.lower())
    return [t for t in tokens if len(t) >= 1]


class SimpleBM25Plus:
    """Pure-Python BM25+ fallback."""

    def __init__(
        self, corpus: list[list[str]], k1: float = 1.5, b: float = 0.75, delta: float = 1.0
    ) -> None:
        self.k1 = k1
        self.b = b
        self.delta = delta
        self.corpus_size = len(corpus)
        self.doc_lens = [len(doc) for doc in corpus]
        self.avg_doc_len = sum(self.doc_lens) / (self.corpus_size or 1)
        self.doc_freqs: list[dict[str, int]] = []
        self.idf: dict[str, float] = {}
        for doc in corpus:
            freqs: dict[str, int] = {}
            for word in doc:
                freqs[word] = freqs.get(word, 0) + 1
            self.doc_freqs.append(freqs)
            for word in freqs:
                self.idf[word] = self.idf.get(word, 0) + 1

        for word, freq in self.idf.items():
            self.idf[word] = math.log((self.corpus_size - freq + 0.5) / (freq + 0.5) + 1.0)

    def get_scores(self, query_tokens: list[str]) -> list[float]:
        scores = [0.0] * self.corpus_size
        for word in query_tokens:
            if word not in self.idf:
                continue
            idf = self.idf[word]
            for i, freqs in enumerate(self.doc_freqs):
                if word not in freqs:
                    continue
                tf = freqs[word]
                doc_len = self.doc_lens[i]
                num = tf * (self.k1 + 1.0)
                den = tf + self.k1 * (1.0 - self.b + self.b * (doc_len / (self.avg_doc_len or 1)))
                scores[i] += idf * ((num / (den or 1.0)) + self.delta)
        return scores


class RetrievalEngine:
    """BM25 indexer and searcher over ContentChunks."""

    def __init__(self, source: ContentSource | None = None) -> None:
        self.source = source or SavannaStaticSource()
        self.chunks: list[ContentChunk] = []
        self.tokenized_corpus: list[list[str]] = []
        self.bm25: Any = None
        self.vocabulary: set[str] = set()
        self.reindex()

    def reindex(self, course_id: str | None = None) -> None:
        self.chunks = self.source.get_chunks(course_id=course_id)
        self.tokenized_corpus = [tokenize(f"{c.title} {c.heading} {c.text}") for c in self.chunks]
        self.vocabulary = {w for doc in self.tokenized_corpus for w in doc}

        if not self.tokenized_corpus:
            self.bm25 = None
            return

        if HAS_RANK_BM25:
            self.bm25 = BM25Plus(self.tokenized_corpus)
        else:
            self.bm25 = SimpleBM25Plus(self.tokenized_corpus)

    def add_chunks(self, new_chunks: list[ContentChunk]) -> int:
        """Add dynamic content chunks from the host and update the BM25 index."""
        self.chunks.extend(new_chunks)
        self.tokenized_corpus = [tokenize(f"{c.title} {c.heading} {c.text}") for c in self.chunks]
        self.vocabulary = {w for doc in self.tokenized_corpus for w in doc}
        if HAS_RANK_BM25:
            self.bm25 = BM25Plus(self.tokenized_corpus)
        else:
            self.bm25 = SimpleBM25Plus(self.tokenized_corpus)
        return len(self.chunks)

    def search(
        self,
        query: str,
        language: Language = Language.EN,
        top_k: int = 2,
        threshold: float | None = None,
    ) -> tuple[list[tuple[ContentChunk, float]], float]:
        """Search chunks and compute confidence score in [0.0, 1.0].

        Returns: (top_matches_with_score, max_confidence)
        """
        th = threshold if threshold is not None else CONFIDENCE_THRESHOLD
        if not self.bm25 or not self.chunks:
            return [], 0.0

        all_tokens = tokenize(query)
        # Filter stop words for query
        content_tokens = [t for t in all_tokens if t not in STOP_WORDS]
        if not content_tokens:
            content_tokens = all_tokens

        matched_terms = [t for t in content_tokens if t in self.vocabulary]
        if not matched_terms:
            return [], 0.0

        raw_scores = self.bm25.get_scores(matched_terms)
        scored: list[tuple[ContentChunk, float, float]] = []

        for idx, score in enumerate(raw_scores):
            if score <= 0.0:
                continue
            # Normalization into [0.0, 1.0] confidence
            confidence = float(min(1.0, score / (score + 2.0)))
            chunk = self.chunks[idx]
            scored.append((chunk, score, confidence))

        if not scored:
            return [], 0.0

        scored.sort(key=lambda x: x[1], reverse=True)
        best_confidence = scored[0][2]

        if best_confidence < th:
            return [], best_confidence

        top_results = [(item[0], item[2]) for item in scored[:top_k]]
        return top_results, best_confidence

    def format_citations(self, matches: list[tuple[ContentChunk, float]]) -> list[Citation]:
        citations: list[Citation] = []
        seen = set()
        for chunk, _ in matches:
            key = (chunk.heading, chunk.url)
            if key in seen:
                continue
            seen.add(key)
            citations.append(
                Citation(
                    title=chunk.title,
                    heading=chunk.heading,
                    page=chunk.page or 1,
                    url=chunk.url,
                )
            )
        return citations
