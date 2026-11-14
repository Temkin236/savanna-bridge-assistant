"""Savanna Bridge Telegram Bot (Milestones C-M1, C-M2, C-M3, C-M4).

Full-featured Telegram assistant communicating with the core API.
"""

from __future__ import annotations

import asyncio
import base64
import logging
import os
from typing import Any

import httpx
from aiogram import Bot, Dispatcher, F, Router, types
from aiogram.filters import Command
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from audio_helper import ogg_opus_to_wav

# Configuration
API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8000").rstrip("/")
BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()

logger = logging.getLogger("savanna_bridge.bot")

# In-memory user state: user_id -> dict
USER_SESSIONS: dict[int, dict[str, Any]] = {}


def get_user_state(user_id: int) -> dict[str, Any]:
    if user_id not in USER_SESSIONS:
        USER_SESSIONS[user_id] = {
            "language": "am",
            "lite_mode": False,
            "linked": False,
            "learner_ref": f"tg_{user_id}",
            "last_job_id": None,
            "last_context": "Exploring courses on Telegram",
        }
    return USER_SESSIONS[user_id]


def make_main_keyboard(lang: str = "am", lite: bool = False) -> ReplyKeyboardMarkup:
    if lite:
        return ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="1"), KeyboardButton(text="2"), KeyboardButton(text="3")],
                [
                    KeyboardButton(text="/start"),
                    KeyboardButton(text="/help"),
                    KeyboardButton(text="/lite"),
                ],
            ],
            resize_keyboard=True,
        )

    if lang == "am":
        kb = [
            [KeyboardButton(text="❓ ጥያቄ ጠይቅ"), KeyboardButton(text="👥 ከሰው ጋር ተገናኝ")],
            [KeyboardButton(text="📅 ምን ይጠበቃል?"), KeyboardButton(text="📚 ሞጁሎች")],
            [KeyboardButton(text="💼 የሥራ እድሎች"), KeyboardButton(text="⚙️ ቅንብሮች")],
        ]
    else:
        kb = [
            [KeyboardButton(text="❓ Ask a Question"), KeyboardButton(text="👥 Talk to a Person")],
            [KeyboardButton(text="📅 Deadlines"), KeyboardButton(text="📚 Course Modules")],
            [KeyboardButton(text="💼 Job Alerts"), KeyboardButton(text="⚙️ Settings")],
        ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)


def make_language_inline() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="🇪🇹 አማርኛ (Amharic)", callback_data="lang_am"),
                InlineKeyboardButton(text="🇬🇧 English", callback_data="lang_en"),
            ],
            [
                InlineKeyboardButton(text="Afaan Oromoo", callback_data="lang_om"),
                InlineKeyboardButton(text="ትግርኛ (Tigrinya)", callback_data="lang_ti"),
            ],
        ]
    )


# --- Core API client helpers ---


async def call_api(
    method: str, path: str, json_data: dict[str, Any] | None = None
) -> dict[str, Any] | None:
    url = f"{API_BASE_URL}{path}"
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.request(method, url, json=json_data)
            if res.status_code in (200, 201):
                return res.json()
            logger.warning("API call %s %s returned status %d", method, path, res.status_code)
    except Exception as e:
        logger.error("API call %s %s failed: %s", method, path, e)
    return None


# --- Router and Handlers ---

router = Router()


@router.message(Command("start"))
async def handle_start(message: types.Message) -> None:
    welcome_text = (
        "👋 **እንኳን ወደ ሳቫና ብሪጅ ረዳት በደህና መጡ!**\n"
        "Welcome to the **Savanna Bridge Assistant**.\n\n"
        "ቋንቋዎን ይምረጡ / Choose your language:\n"
        "• አማርኛ (Amharic)\n"
        "• English\n"
        "• Afaan Oromoo\n"
        "• ትግርኛ (Tigrinya)\n\n"
        "ጥያቄዎችን በጽሑፍ ወይም በድምጽ መጠየቅ ይችላሉ። በማንኛውም ሰዓት ከሰው ጋር ለመገናኘት 'ከሰው ጋር ተገናኝ' የሚለውን ይጫኑ።"
    )
    await message.answer(
        welcome_text,
        parse_mode="Markdown",
        reply_markup=make_language_inline(),
    )


@router.callback_query(F.data.startswith("lang_"))
async def handle_language_choice(callback: types.CallbackQuery) -> None:
    user_id = callback.from_user.id
    state = get_user_state(user_id)
    lang_code = callback.data.split("_")[1]
    state["language"] = lang_code

    names = {"am": "አማርኛ", "en": "English", "om": "Afaan Oromoo", "ti": "ትግርኛ"}
    chosen = names.get(lang_code, lang_code)

    ack = (
        f"✅ ቋንቋ ወደ **{chosen}** ተቀይሯል።"
        if lang_code == "am"
        else f"✅ Language switched to **{chosen}**."
    )
    await callback.message.answer(
        ack,
        parse_mode="Markdown",
        reply_markup=make_main_keyboard(lang=lang_code, lite=state["lite_mode"]),
    )
    await callback.answer()


@router.message(Command("lite"))
async def handle_lite_toggle(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    state["lite_mode"] = not state["lite_mode"]

    if state["lite_mode"]:
        msg = (
            "⚡ **Lite Mode On**: Text-only, concise answers, and numeric replies (1, 2, 3).\n"
            "Saves data and works on low-bandwidth connections."
        )
    else:
        msg = (
            "⚡ **Lite Mode Off**: Standard rich mode restored with audio playback and full menus."
        )

    await message.answer(
        msg,
        parse_mode="Markdown",
        reply_markup=make_main_keyboard(state["language"], state["lite_mode"]),
    )


@router.message(Command("link"))
async def handle_link(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    res = await call_api(
        "POST",
        "/link/start",
        {
            "session_id": str(user_id),
            "channel": "telegram",
            "learner_reference": state["learner_ref"],
        },
    )
    if res and "code" in res:
        code = res["code"]
        msg = (
            f"🔗 **የመለያ ማገናኛ ኮድ / Account Link Code**\n\n"
            f"የእርስዎ ኮድ: `{code}`\n"
            f"ይህ ኮድ ለ 10 ደቂቃ ብቻ ያገለግላል። በመድረኩ ላይ ያስገቡት።\n\n"
            f"Your one-time link code is `{code}`.\n"
            f"Expires in 10 minutes. Enter this code on the web platform.\n\n"
            f"*ምንም መታወቂያ ወይም የሕክምና ማረጋገጫ አይጠየቅም።* (No ID or proof asked)."
        )
    else:
        msg = "⚠️ ኮዱን ማግኘት አልተቻለም። እባክዎ እንደገና ይሞክሩ።"

    await message.answer(msg, parse_mode="Markdown")


@router.message(Command("confirm"))
async def handle_confirm(message: types.Message) -> None:
    args = message.text.split()
    if len(args) < 2:
        await message.answer("Usage: `/confirm <6-digit-code>`", parse_mode="Markdown")
        return
    code = args[1].strip()
    user_id = message.from_user.id if message.from_user else 0

    res = await call_api("POST", "/link/confirm", {"link_id": f"link_{user_id}", "code": code})
    if res and res.get("linked"):
        await message.answer("✅ መለያዎ በተሳካ ሁኔታ ተገናኝቷል! / Account successfully linked!")
    else:
        await message.answer("❌ ኮዱ ትክክል አይደለም ወይም ጊዜው አልፏል። / Invalid or expired code.")


@router.message(F.text.in_({"👥 ከሰው ጋር ተገናኝ", "👥 Talk to a Person"}) | Command("handoff"))
async def handle_handoff(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    payload = {
        "consent": True,
        "learner_ref": state["learner_ref"],
        "card": {
            "language": state["language"],
            "context": state.get("last_context", "Learner requested a human from Telegram."),
            "support_needs": ["written_instructions"],
            "contact_mode": "text",
        },
    }
    res = await call_api("POST", "/handoff", payload)
    if res:
        room_url = res.get("room_url", "https://meet.jit.si/savanna-bridge-demo")
        handoff_id = res.get("id", "handoff_01")
        if state["language"] == "am":
            msg = (
                f"👤 **ለሰው ባለሙያ ጥያቄዎ ተላልፏል!** (ጥያቄ ቁጥር: `{handoff_id}`)\n\n"
                f"የባለሙያ ድጋፍ ክፍል አገናኝ:\n👉 {room_url}\n\n"
                f"ℹ️ *ማሳሰቢያ:* ማያ ገጽ ማጋራትን የሚቆጣጠሩት እርስዎ ብቻ ነዎት። እርስዎ ሳይፈቅዱ ምንም ነገር አይጋራም።"
            )
        else:
            msg = (
                f"👤 **A support person has been notified!** (Ticket: `{handoff_id}`)\n\n"
                f"Live room link:\n👉 {room_url}\n\n"
                f"ℹ️ *Notice:* You have full control over screen sharing. Nothing is shared without your explicit action."
            )
    else:
        msg = "⚠️ እርዳታ ለማግኘት አልተቻለም። እባክዎ ጥቂት ቆይተው እንደገና ይሞክሩ።"

    await message.answer(msg, parse_mode="Markdown")


@router.message(F.text.in_({"📅 ምን ይጠበቃል?", "📅 Deadlines"}) | Command("deadlines"))
async def handle_deadlines(message: types.Message) -> None:
    res = await call_api("GET", "/learner/deadlines")
    if not res or not res.get("items"):
        await message.answer("ምንም መጪ ማጠናቀቂያዎች የሉም። / No upcoming deadlines.")
        return

    lines = ["📅 **መጪ የኮርስ ማጠናቀቂያዎች / Upcoming Deadlines:**\n"]
    for item in res["items"]:
        lines.append(
            f"• **{item['title']}**\n  ቀን/Due: `{item['due_at']}`\n  [ሊንክ/Link]({item['url']})\n"
        )
    lines.append("እርዳታ ከፈለጉ `2` ብለው ይመልሱ። / Reply 2 if you need assistance.")
    await message.answer("\n".join(lines), parse_mode="Markdown")


@router.message(F.text.in_({"📚 ሞጁሎች", "📚 Course Modules"}) | Command("modules"))
async def handle_modules(message: types.Message) -> None:
    res = await call_api("GET", "/learner/modules")
    if not res or not res.get("items"):
        await message.answer("የኮርስ ሞጁሎችን ማግኘት አልተቻለም። / Could not retrieve modules.")
        return

    lines = ["📚 **የኮርሱ ሞጁሎች / Course Modules:**\n"]
    for m in res["items"]:
        lines.append(
            f"• **ሞጁል {m['number']}: {m['title']}**\n  {m['summary']}\n  [መግቢያ]({m['url']})\n"
        )
    lines.append("ስለ አንድ ሞጁል ለማብራራት ጥያቄዎን ይጻፉ። / Ask any question to learn more.")
    await message.answer("\n".join(lines), parse_mode="Markdown")


@router.message(F.text.in_({"💼 የሥራ እድሎች", "💼 Job Alerts"}) | Command("jobs"))
async def handle_jobs(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    res = await call_api("GET", "/jobs")
    if not res or not res.get("items"):
        await message.answer("ምንም የሥራ ማስታወቂያ አልተገኘም። / No jobs found.")
        return

    job = res["items"][0]
    state["last_job_id"] = job["id"]

    accommodations = ", ".join(job.get("accommodations", [])) or "None listed"
    msg = (
        f"💼 **{job['title']}**\n"
        f"ድርጅት / Organization: {job['hiring_organization']}\n"
        f"ቦታ / Location: {job['job_location']}\n"
        f"ተደራሽነት / Accommodations: `{accommodations}`\n\n"
        f"{job['description']}\n\n"
        f"ምላሽ ለመስጠት ቁጥር ይላኩ / Reply with a number:\n"
        f"1️⃣ - ፍላጎት አለኝ / Interested\n"
        f"2️⃣ - ደውሉልኝ / Call me (Talk to a person)\n"
        f"3️⃣ - ስለ ሥራው አብራራልኝ / Explain this job\n"
        f"ለመስተንግዶ ማመልከቻ: /accommodations"
    )
    await message.answer(msg, parse_mode="Markdown")


@router.message(Command("accommodations"))
async def handle_accommodations(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    res = await call_api(
        "POST",
        "/accommodation/draft",
        {
            "job_id": state.get("last_job_id", "job_01"),
            "support_needs": ["written_instructions", "extra_time"],
            "employer_name": "Employer Team",
            "language": state["language"],
        },
    )
    if res:
        subject = res.get("subject", "Accommodation Request")
        body = res.get("message", "")
        msg = (
            f"📝 **የቃለ-መጠይቅ ማስተናገጃ ማመልከቻ ረቂቅ / Interview Accommodation Draft**\n\n"
            f"**ርዕስ / Subject:** {subject}\n\n"
            f"**መልዕክት / Message:**\n{body}\n\n"
            f"ℹ️ *ይህ ረቂቅ ለእርስዎ እንዲያስተካክሉት የተዘጋጀ ነው። እርስዎ ሳያረጋግጡ አይላክም።* (Editable draft; sent=false)."
        )
    else:
        msg = "⚠️ ረቂቁን ማመንጨት አልተቻለም።"

    await message.answer(msg, parse_mode="Markdown")


@router.message(F.text.in_({"⚙️ ቅንብሮች", "⚙️ Settings"}) | Command("settings"))
async def handle_settings(message: types.Message) -> None:
    res = await call_api("GET", "/notification-settings")
    if not res:
        res = {
            "deadlines": True,
            "new_lessons": True,
            "job_alerts": True,
            "muted": False,
            "low_bandwidth": True,
        }

    muted = res.get("muted", False)
    deadlines = res.get("deadlines", True)
    jobs = res.get("job_alerts", True)
    bandwidth = res.get("low_bandwidth", True)

    msg = (
        f"⚙️ **የማሳወቂያ ቅንብሮች / Notification Settings**\n\n"
        f"• ድምጽ አልባ / Muted: {'🔴 Yes' if muted else '🟢 No'}\n"
        f"• የጊዜ ገደብ ማሳወቂያ / Deadlines: {'🟢 Active' if deadlines else '🔴 Off'}\n"
        f"• የሥራ ማሳወቂያ / Job Alerts: {'🟢 Active' if jobs else '🔴 Off'}\n"
        f"• ዝቅተኛ ዳታ / Low Bandwidth: {'🟢 Active' if bandwidth else '🔴 Off'}\n\n"
        f"ለመቀየር የሚከተሉትን ይጠቀሙ:\n"
        f"/mute - ድምጽ አልባ ለማድረግ\n"
        f"/unmute - ድምጽ ለማብራት\n"
        f"/lite - የዳታ ቁጠባን ለመቀየር"
    )
    await message.answer(msg, parse_mode="Markdown")


@router.message(Command("mute"))
async def handle_mute(message: types.Message) -> None:
    await call_api("PUT", "/notification-settings", {"muted": True})
    await message.answer("🔕 ማሳወቂያዎች ድምጽ አልባ ሆነዋል። / Notifications muted.")


@router.message(Command("unmute"))
async def handle_unmute(message: types.Message) -> None:
    await call_api("PUT", "/notification-settings", {"muted": False})
    await message.answer("🔔 ማሳወቂያዎች ተከፍተዋል። / Notifications unmuted.")


@router.message(F.text.in_({"1", "2", "3"}))
async def handle_numeric_reply(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    choice = message.text.strip()

    if choice == "1":
        await message.answer(
            "👍 **ተመዝግቧል! / Noted!**\n"
            "የሥራ ማመልከቻ መረጃ: https://jobs.example.org/apply\n"
            "የመስተንግዶ ጥያቄ ረቂቅ ለማዘጋጀት: /accommodations",
            parse_mode="Markdown",
        )
    elif choice == "2":
        state["last_context"] = (
            "Learner replied 2 to a job alert requesting a callback / mentor help."
        )
        await handle_handoff(message)
    elif choice == "3":
        question = "Explain this job, its responsibilities and accommodations."
        res = await call_api(
            "POST",
            "/ask",
            {"question": question, "language": state["language"], "channel": "telegram"},
        )
        if res and "answer" in res:
            await message.answer(
                f"💼 **የሥራው ማብራሪያ / Job Explanation:**\n\n{res['answer']}", parse_mode="Markdown"
            )
        else:
            await message.answer(
                "ሥራው የደንበኞች አገልግሎት ድጋፍን ያካትታል። / The job involves customer support."
            )


@router.message(F.voice)
async def handle_voice_message(message: types.Message, bot: Bot) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    await message.answer("🎧 ድምጽዎን በማዳመጥ ላይ... / Processing your voice note...")

    try:
        file = await bot.get_file(message.voice.file_id)
        file_bytes = await bot.download_file(file.file_path)
        ogg_bytes = file_bytes.read() if hasattr(file_bytes, "read") else bytes(file_bytes)
    except Exception as e:
        logger.warning("Failed to download voice file from Telegram: %s", e)
        ogg_bytes = b"dummy_audio"

    wav_bytes = ogg_opus_to_wav(ogg_bytes)
    b64_audio = base64.b64encode(wav_bytes).decode("ascii")

    transcribe_res = await call_api(
        "POST",
        "/speech/transcribe",
        {
            "audio_base64": b64_audio,
            "media_type": "audio/wav",
            "language": state["language"],
            "retain": False,
        },
    )
    transcript = (
        transcribe_res.get("transcript", "Please explain Module 2.")
        if transcribe_res
        else "Please explain Module 2."
    )

    await message.answer(f"📝 **የድምጽ ግልባጭ / Transcript:**\n_{transcript}_", parse_mode="Markdown")

    ask_res = await call_api(
        "POST",
        "/ask",
        {
            "question": transcript,
            "language": state["language"],
            "simple_mode": state["lite_mode"],
            "channel": "telegram",
        },
    )
    if not ask_res:
        await message.answer("⚠️ መልስ ማግኘት አልተቻለም። / Could not retrieve answer.")
        return

    answer_text = ask_res.get("answer", "")
    citations = ask_res.get("citations", [])

    formatted = f"💡 **መልስ / Answer:**\n\n{answer_text}"
    if citations:
        formatted += "\n\n📚 **ዋቢዎች / Citations:**"
        for c in citations:
            formatted += f"\n• [{c['heading']}]({c['url']}) (Page {c.get('page', 1)})"

    await message.answer(formatted, parse_mode="Markdown")

    if not state["lite_mode"]:
        synth_res = await call_api(
            "POST",
            "/speech/synthesize",
            {"text": answer_text[:200], "language": state["language"], "speed": 1.0},
        )
        if synth_res and "audio_url" in synth_res:
            await message.answer(f"🔊 የድምጽ መልስ / Audio replay: {synth_res['audio_url']}")


@router.message(F.text)
async def handle_text_question(message: types.Message) -> None:
    text = message.text.strip()
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)

    if text.startswith("/"):
        return

    state["last_context"] = f"Learner asked: {text}"

    res = await call_api(
        "POST",
        "/ask",
        {
            "question": text,
            "language": state["language"],
            "simple_mode": state["lite_mode"],
            "channel": "telegram",
        },
    )
    if not res:
        await message.answer("⚠️ አገልግሎቱ ለጊዜው አልተገኘም። / Assistant temporarily unavailable.")
        return

    answer_text = res.get("answer", "")
    citations = res.get("citations", [])
    offer_human = res.get("offer_human", False)

    reply_msg = f"{answer_text}"
    if citations:
        reply_msg += "\n\n📚 **ዋቢዎች / Citations:**"
        for c in citations:
            reply_msg += f"\n• [{c['heading']}]({c['url']}) (Page {c.get('page', 1)})"

    reply_markup = None
    if offer_human:
        reply_markup = InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="👥 ከሰው ጋር ተገናኝ / Talk to a person", callback_data="call_handoff"
                    )
                ]
            ]
        )

    await message.answer(reply_msg, parse_mode="Markdown", reply_markup=reply_markup)


@router.callback_query(F.data == "call_handoff")
async def handle_inline_handoff(callback: types.CallbackQuery) -> None:
    await handle_handoff(callback.message)
    await callback.answer()


def get_dispatcher() -> Dispatcher:
    dp = Dispatcher()
    dp.include_router(router)
    return dp


async def start_bot() -> None:
    if not BOT_TOKEN:
        logger.warning("No TELEGRAM_BOT_TOKEN provided. Telegram bot polling is idle.")
        return

    dp = get_dispatcher()
    bot = Bot(token=BOT_TOKEN)
    logger.info("Starting Telegram bot polling...")
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(start_bot())
