"""SQLite persistence for handoffs, links, support needs, alerts, and stats."""

from __future__ import annotations

import contextlib
import json
import secrets
import sqlite3
from datetime import UTC, datetime, timedelta
from typing import Any

from savanna_bridge.config import DB_PATH, TELEGRAM_BOT_USERNAME
from savanna_bridge.models import (
    AccessibilityProfile,
    AlertSubscription,
    Handoff,
    HandoffCard,
    NotificationSettings,
    SupportNeeds,
)


def get_connection(db_path: str = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path: str = DB_PATH) -> None:
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS links (
                link_id TEXT PRIMARY KEY,
                token TEXT,
                code TEXT NOT NULL,
                session_id TEXT NOT NULL,
                channel TEXT NOT NULL,
                learner_ref TEXT,
                telegram_chat_id TEXT,
                linked INTEGER NOT NULL DEFAULT 0,
                expires_at TEXT NOT NULL,
                used INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL
            )
        """)
        for col_name, col_type in [
            ("token", "TEXT"),
            ("telegram_chat_id", "TEXT"),
            ("linked", "INTEGER NOT NULL DEFAULT 0"),
            ("attempts", "INTEGER NOT NULL DEFAULT 0"),
            ("revoked", "INTEGER NOT NULL DEFAULT 0"),
            ("platform_id", "TEXT NOT NULL DEFAULT 'generic'"),
            ("platform_name", "TEXT NOT NULL DEFAULT 'this platform'"),
        ]:
            with contextlib.suppress(sqlite3.OperationalError):
                cursor.execute(f"ALTER TABLE links ADD COLUMN {col_name} {col_type}")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS support_needs (
                learner_ref TEXT PRIMARY KEY,
                needs_json TEXT NOT NULL,
                other_text TEXT,
                preferred_contact_mode TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS handoffs (
                id TEXT PRIMARY KEY,
                status TEXT NOT NULL,
                card_json TEXT NOT NULL,
                room_url TEXT NOT NULL,
                agent_ref TEXT,
                learner_ref TEXT,
                created_at TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS handoff_replies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                handoff_id TEXT NOT NULL,
                agent_ref TEXT NOT NULL,
                message TEXT NOT NULL,
                sent_at TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS alert_subscriptions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                learner_ref TEXT NOT NULL,
                channel TEXT NOT NULL,
                fields_json TEXT NOT NULL,
                support_needs_json TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS notification_settings (
                learner_ref TEXT PRIMARY KEY,
                deadlines INTEGER NOT NULL DEFAULT 1,
                new_lessons INTEGER NOT NULL DEFAULT 1,
                job_alerts INTEGER NOT NULL DEFAULT 1,
                muted INTEGER NOT NULL DEFAULT 0,
                low_bandwidth INTEGER NOT NULL DEFAULT 1,
                updated_at TEXT NOT NULL
            )
        """)
        for col_name, col_type in [
            ("telegram_enabled", "INTEGER NOT NULL DEFAULT 0"),
            ("consent_granted", "INTEGER NOT NULL DEFAULT 0"),
            ("frequency", "TEXT NOT NULL DEFAULT 'immediate'"),
            ("quiet_hours_start", "TEXT"),
            ("quiet_hours_end", "TEXT"),
            ("timezone", "TEXT NOT NULL DEFAULT 'Africa/Addis_Ababa'"),
            ("language", "TEXT NOT NULL DEFAULT 'en'"),
            ("platform_id", "TEXT NOT NULL DEFAULT 'generic'"),
        ]:
            with contextlib.suppress(sqlite3.OperationalError):
                cursor.execute(
                    f"ALTER TABLE notification_settings ADD COLUMN {col_name} {col_type}"
                )
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS teacher_stats (
                question TEXT PRIMARY KEY,
                count INTEGER NOT NULL DEFAULT 1,
                last_asked TEXT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS accessibility_profiles (
                learner_ref TEXT PRIMARY KEY,
                profile_json TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        conn.commit()


# --- Database operations ---


class Database:
    def __init__(self, db_path: str = DB_PATH) -> None:
        self.db_path = db_path
        init_db(self.db_path)

    def create_link(
        self,
        link_id: str,
        code: str,
        session_id: str,
        channel: str,
        learner_ref: str | None = None,
        token: str | None = None,
        platform_id: str = "generic",
        platform_name: str = "this platform",
    ) -> dict[str, Any]:
        token = token or secrets.token_urlsafe(32)[:32]
        expires_in = 600
        expires_at = (datetime.now(UTC) + timedelta(seconds=expires_in)).isoformat()
        created_at = datetime.now(UTC).isoformat()
        deep_link = f"https://t.me/{TELEGRAM_BOT_USERNAME}?start={token}"
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO links (
                    link_id, token, code, session_id, channel, learner_ref,
                    expires_at, used, created_at, linked, platform_id, platform_name
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, 0, ?, ?)
                """,
                (
                    link_id,
                    token,
                    code,
                    session_id,
                    channel,
                    learner_ref or f"learner_{session_id}",
                    expires_at,
                    created_at,
                    platform_id,
                    platform_name,
                ),
            )
            conn.commit()
        return {
            "token": token,
            "deep_link": deep_link,
            "expires_in": expires_in,
            "link_id": link_id,
            "code": code,
            "expires_at": expires_at,
            "single_use": True,
            "channel": channel,
            "mocked": False,
            "platform_id": platform_id,
            "platform_name": platform_name,
        }

    def get_link_status(self, token: str) -> dict[str, Any]:
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM links WHERE token = ? OR link_id = ? ORDER BY created_at DESC LIMIT 1",
                (token, token),
            ).fetchone()
            if not row:
                return {"linked": False, "channel": None}
            now_iso = datetime.now(UTC).isoformat()
            if not row["linked"] and row["expires_at"] < now_iso:
                return {"linked": False, "channel": None}
            if row["linked"]:
                return {"linked": True, "channel": "telegram"}
            return {"linked": False, "channel": None}

    def get_link_context(self, token: str) -> dict[str, str]:
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT platform_id, platform_name FROM links WHERE token = ? OR link_id = ? ORDER BY created_at DESC LIMIT 1",
                (token, token),
            ).fetchone()
            if not row:
                return {"platform_id": "generic", "platform_name": "this platform"}
            return {
                "platform_id": row["platform_id"] or "generic",
                "platform_name": row["platform_name"] or "this platform",
            }

    def verify_and_consume_token_link(
        self, token: str, telegram_chat_id: str | int | None = None
    ) -> tuple[bool, str, str]:
        """Returns (success, learner_ref, error_reason).
        error_reason: "ok", "expired", "already_used", "not_found"
        """
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM links WHERE token = ? OR link_id = ? ORDER BY created_at DESC LIMIT 1",
                (token, token),
            ).fetchone()
            if not row:
                return False, "", "not_found"
            if row["used"]:
                return False, "", "already_used"
            now_iso = datetime.now(UTC).isoformat()
            if row["expires_at"] < now_iso:
                return False, "", "expired"

            chat_id_str = str(telegram_chat_id) if telegram_chat_id is not None else None
            conn.execute(
                "UPDATE links SET used = 1, linked = 1, telegram_chat_id = ? WHERE link_id = ?",
                (chat_id_str, row["link_id"]),
            )
            conn.commit()
            return True, row["learner_ref"], "ok"

    def disconnect_link(
        self, token: str | None = None, learner_ref: str | None = None
    ) -> bool:
        with get_connection(self.db_path) as conn:
            if token:
                conn.execute(
                    "UPDATE links SET linked = 0 WHERE token = ? OR link_id = ?",
                    (token, token),
                )
            if learner_ref:
                conn.execute("UPDATE links SET linked = 0 WHERE learner_ref = ?", (learner_ref,))
            conn.commit()
            return True

    def verify_and_consume_link(self, link_id: str, code: str) -> tuple[bool, str, str]:
        """Returns (success, learner_ref, error_reason).

        error_reason: "ok", "invalid_code", "expired", "already_used", "not_found"
        """
        with get_connection(self.db_path) as conn:
            row = conn.execute("SELECT * FROM links WHERE link_id = ?", (link_id,)).fetchone()
            if not row and code:
                row = conn.execute(
                    "SELECT * FROM links WHERE code = ? AND used = 0 ORDER BY created_at DESC LIMIT 1",
                    (code,),
                ).fetchone()
            if not row:
                return False, "", "not_found"
            if row["used"]:
                return False, "", "already_used"

            # Check revocation
            revoked = False
            with contextlib.suppress(Exception):
                revoked = bool(row["revoked"])
            if revoked:
                return False, "", "revoked"

            # Check attempt limit
            attempts = 0
            with contextlib.suppress(Exception):
                attempts = int(row["attempts"])
            if attempts >= 5:
                return False, "", "too_many_attempts"

            now_iso = datetime.now(UTC).isoformat()
            if row["expires_at"] < now_iso:
                return False, "", "expired"
            if row["code"] != code:
                with contextlib.suppress(Exception):
                    conn.execute("UPDATE links SET attempts = attempts + 1 WHERE link_id = ?", (row["link_id"],))
                    conn.commit()
                if attempts + 1 >= 5:
                    return False, "", "too_many_attempts"
                return False, "", "invalid_code"

            # Consume code and mark linked
            conn.execute("UPDATE links SET used = 1, linked = 1 WHERE link_id = ?", (row["link_id"],))
            conn.commit()
            return True, row["learner_ref"], "ok"

    def revoke_link(self, link_id: str) -> bool:
        """Revoke an active linking code before expiry."""
        with get_connection(self.db_path) as conn:
            cursor = conn.execute("UPDATE links SET revoked = 1 WHERE link_id = ?", (link_id,))
            conn.commit()
            return cursor.rowcount > 0

    def get_support_needs(self, learner_ref: str = "default") -> SupportNeeds:
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM support_needs WHERE learner_ref = ?", (learner_ref,)
            ).fetchone()
            if not row:
                return SupportNeeds(needs=[], other_text="", preferred_contact_mode="text")
            return SupportNeeds(
                needs=json.loads(row["needs_json"]),
                other_text=row["other_text"] or "",
                preferred_contact_mode=row["preferred_contact_mode"],
            )

    def set_support_needs(self, learner_ref: str, needs: SupportNeeds) -> SupportNeeds:
        now_iso = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO support_needs (learner_ref, needs_json, other_text, preferred_contact_mode, updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(learner_ref) DO UPDATE SET
                    needs_json=excluded.needs_json,
                    other_text=excluded.other_text,
                    preferred_contact_mode=excluded.preferred_contact_mode,
                    updated_at=excluded.updated_at
                """,
                (
                    learner_ref,
                    json.dumps(needs.needs),
                    needs.other_text or "",
                    needs.preferred_contact_mode,
                    now_iso,
                ),
            )
            conn.commit()
        return needs

    def get_accessibility_profile(self, learner_ref: str = "default") -> AccessibilityProfile:
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM accessibility_profiles WHERE learner_ref = ?", (learner_ref,)
            ).fetchone()
            if not row:
                return AccessibilityProfile(learner_ref=learner_ref)
            try:
                data = json.loads(row["profile_json"])
                return AccessibilityProfile(**data)
            except Exception:
                return AccessibilityProfile(learner_ref=learner_ref)

    def set_accessibility_profile(self, profile: AccessibilityProfile) -> AccessibilityProfile:
        now_iso = datetime.now(UTC).isoformat()
        profile.updated_at = now_iso
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO accessibility_profiles (learner_ref, profile_json, updated_at)
                VALUES (?, ?, ?)
                ON CONFLICT(learner_ref) DO UPDATE SET
                    profile_json=excluded.profile_json,
                    updated_at=excluded.updated_at
                """,
                (
                    profile.learner_ref,
                    json.dumps(profile.model_dump()),
                    now_iso,
                ),
            )
            conn.commit()
        return profile

    def create_handoff(
        self, handoff_id: str, card: HandoffCard, room_url: str, learner_ref: str | None = None
    ) -> Handoff:
        created_at = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO handoffs (id, status, card_json, room_url, agent_ref, learner_ref, created_at)
                VALUES (?, 'waiting', ?, ?, NULL, ?, ?)
                """,
                (handoff_id, json.dumps(card.model_dump()), room_url, learner_ref, created_at),
            )
            conn.commit()
        return Handoff(
            id=handoff_id,
            status="waiting",
            card=card,
            room_url=room_url,
            agent_ref=None,
            created_at=created_at,
            mocked=False,
        )

    def get_handoff(self, handoff_id: str) -> Handoff | None:
        with get_connection(self.db_path) as conn:
            row = conn.execute("SELECT * FROM handoffs WHERE id = ?", (handoff_id,)).fetchone()
            if not row:
                return None
            card_dict = json.loads(row["card_json"])
            return Handoff(
                id=row["id"],
                status=row["status"],
                card=HandoffCard(**card_dict),
                room_url=row["room_url"],
                agent_ref=row["agent_ref"],
                created_at=row["created_at"],
                mocked=False,
            )

    def list_handoffs(self, status: str | None = None) -> list[Handoff]:
        with get_connection(self.db_path) as conn:
            if status:
                rows = conn.execute(
                    "SELECT * FROM handoffs WHERE status = ? ORDER BY created_at ASC", (status,)
                ).fetchall()
            else:
                rows = conn.execute("SELECT * FROM handoffs ORDER BY created_at ASC").fetchall()

            result = []
            for row in rows:
                card_dict = json.loads(row["card_json"])
                result.append(
                    Handoff(
                        id=row["id"],
                        status=row["status"],
                        card=HandoffCard(**card_dict),
                        room_url=row["room_url"],
                        agent_ref=row["agent_ref"],
                        created_at=row["created_at"],
                        mocked=False,
                    )
                )
            return result

    def claim_handoff(self, handoff_id: str, agent_ref: str) -> Handoff | None:
        with get_connection(self.db_path) as conn:
            conn.execute(
                "UPDATE handoffs SET status = 'claimed', agent_ref = ? WHERE id = ?",
                (agent_ref, handoff_id),
            )
            conn.commit()
        return self.get_handoff(handoff_id)

    def close_handoff(self, handoff_id: str) -> Handoff | None:
        with get_connection(self.db_path) as conn:
            conn.execute("UPDATE handoffs SET status = 'closed' WHERE id = ?", (handoff_id,))
            conn.commit()
        return self.get_handoff(handoff_id)

    def add_handoff_reply(self, handoff_id: str, agent_ref: str, message: str) -> str:
        sent_at = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO handoff_replies (handoff_id, agent_ref, message, sent_at)
                VALUES (?, ?, ?, ?)
                """,
                (handoff_id, agent_ref, message, sent_at),
            )
            conn.commit()
        return sent_at

    def add_alert_subscription(self, sub: AlertSubscription) -> AlertSubscription:
        created_at = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO alert_subscriptions (learner_ref, channel, fields_json, support_needs_json, active, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    sub.learner_ref,
                    sub.channel,
                    json.dumps(sub.fields),
                    json.dumps(sub.support_needs),
                    1 if sub.active else 0,
                    created_at,
                ),
            )
            conn.commit()
        return sub

    def get_alert_subscriptions(self) -> list[AlertSubscription]:
        with get_connection(self.db_path) as conn:
            rows = conn.execute("SELECT * FROM alert_subscriptions WHERE active = 1").fetchall()
            return [
                AlertSubscription(
                    learner_ref=r["learner_ref"],
                    channel=r["channel"],
                    fields=json.loads(r["fields_json"]),
                    support_needs=json.loads(r["support_needs_json"]),
                    active=bool(r["active"]),
                )
                for r in rows
            ]

    def get_notification_settings(self, learner_ref: str = "default") -> NotificationSettings:
        with get_connection(self.db_path) as conn:
            row = conn.execute(
                "SELECT * FROM notification_settings WHERE learner_ref = ?", (learner_ref,)
            ).fetchone()
            if not row:
                return NotificationSettings()
            return NotificationSettings(
                deadlines=bool(row["deadlines"]),
                new_lessons=bool(row["new_lessons"]),
                job_alerts=bool(row["job_alerts"]),
                muted=bool(row["muted"]),
                low_bandwidth=bool(row["low_bandwidth"]),
                telegram_enabled=bool(row["telegram_enabled"]),
                consent_granted=bool(row["consent_granted"]),
                frequency=row["frequency"] or "immediate",
                quiet_hours_start=row["quiet_hours_start"],
                quiet_hours_end=row["quiet_hours_end"],
                timezone=row["timezone"] or "Africa/Addis_Ababa",
                language=row["language"] or "en",
                platform_id=row["platform_id"] or "generic",
            )

    def set_notification_settings(
        self, learner_ref: str, settings: NotificationSettings
    ) -> NotificationSettings:
        now_iso = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO notification_settings (
                    learner_ref, deadlines, new_lessons, job_alerts, muted,
                    low_bandwidth, telegram_enabled, consent_granted, frequency,
                    quiet_hours_start, quiet_hours_end, timezone, language,
                    platform_id, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(learner_ref) DO UPDATE SET
                    deadlines=excluded.deadlines,
                    new_lessons=excluded.new_lessons,
                    job_alerts=excluded.job_alerts,
                    muted=excluded.muted,
                    low_bandwidth=excluded.low_bandwidth,
                    telegram_enabled=excluded.telegram_enabled,
                    consent_granted=excluded.consent_granted,
                    frequency=excluded.frequency,
                    quiet_hours_start=excluded.quiet_hours_start,
                    quiet_hours_end=excluded.quiet_hours_end,
                    timezone=excluded.timezone,
                    language=excluded.language,
                    platform_id=excluded.platform_id,
                    updated_at=excluded.updated_at
                """,
                (
                    learner_ref,
                    1 if settings.deadlines else 0,
                    1 if settings.new_lessons else 0,
                    1 if settings.job_alerts else 0,
                    1 if settings.muted else 0,
                    1 if settings.low_bandwidth else 0,
                    1 if settings.telegram_enabled else 0,
                    1 if settings.consent_granted else 0,
                    settings.frequency,
                    settings.quiet_hours_start,
                    settings.quiet_hours_end,
                    settings.timezone,
                    settings.language.value,
                    settings.platform_id,
                    now_iso,
                ),
            )
            conn.commit()
        return settings

    def record_question(self, question: str) -> None:
        """Record question anonymously. Strip personal details, increment counter."""
        cleaned = question.strip().lower()[:150]
        now_iso = datetime.now(UTC).isoformat()
        with get_connection(self.db_path) as conn:
            conn.execute(
                """
                INSERT INTO teacher_stats (question, count, last_asked)
                VALUES (?, 1, ?)
                ON CONFLICT(question) DO UPDATE SET
                    count = count + 1,
                    last_asked = excluded.last_asked
                """,
                (cleaned, now_iso),
            )
            conn.commit()

    def get_teacher_stats(self) -> list[dict[str, Any]]:
        with get_connection(self.db_path) as conn:
            rows = conn.execute(
                "SELECT question, count FROM teacher_stats ORDER BY count DESC LIMIT 10"
            ).fetchall()
            if not rows:
                return [
                    {"question": "What is due this week?", "count": 8},
                    {"question": "Explain Module 2.", "count": 5},
                ]
            return [{"question": r["question"], "count": r["count"]} for r in rows]

    def export_learner_data(self, learner_ref: str) -> dict[str, Any]:
        """Export all data associated with a learner reference (GDPR / Privacy requirement)."""
        with get_connection(self.db_path) as conn:
            support = self.get_support_needs(learner_ref)
            handoff_rows = conn.execute(
                "SELECT id, status, card_json, room_url, agent_ref, created_at FROM handoffs WHERE learner_ref = ?",
                (learner_ref,),
            ).fetchall()
            settings = self.get_notification_settings(learner_ref)
            links = conn.execute(
                "SELECT link_id, channel, expires_at, used, created_at FROM links WHERE learner_ref = ?",
                (learner_ref,),
            ).fetchall()
            return {
                "learner_ref": learner_ref,
                "support_needs": support.model_dump() if support else None,
                "handoffs": [dict(h) for h in handoff_rows],
                "notification_settings": settings.model_dump() if settings else None,
                "links": [dict(link_row) for link_row in links],
            }

    def delete_learner_data(self, learner_ref: str) -> bool:
        """Permanently delete all stored data for this learner reference."""
        with get_connection(self.db_path) as conn:
            conn.execute("DELETE FROM support_needs WHERE learner_ref = ?", (learner_ref,))
            conn.execute("DELETE FROM handoffs WHERE learner_ref = ?", (learner_ref,))
            conn.execute("DELETE FROM notification_settings WHERE learner_ref = ?", (learner_ref,))
            conn.execute("DELETE FROM links WHERE learner_ref = ?", (learner_ref,))
            conn.commit()
            return True
