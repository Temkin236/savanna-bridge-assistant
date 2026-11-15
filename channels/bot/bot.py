"""Savanna Bridge Telegram Bot.

Full-featured multilingual Telegram assistant communicating with the core API.
Supported Languages:
- am: Amharic (አማርኛ)
- en: English
- om: Afaan Oromoo
- ti: Tigrinya (ትግርኛ)
- ar: Arabic (العربية)
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
    BotCommand,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from audio_helper import ogg_opus_to_wav

try:
    from dotenv import load_dotenv

    # Load .env from repository root
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
    load_dotenv(env_path)
except ImportError:
    pass

# Configuration
API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8000").rstrip("/")
if os.path.exists("/.dockerenv") and "localhost" in API_BASE_URL:
    API_BASE_URL = "http://api:8000"

BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
TELEGRAM_BOT_USERNAME: str = os.getenv("TELEGRAM_BOT_USERNAME", "savannah_assistant3_bot").strip()
BOT_API_SECRET: str = os.getenv("BOT_API_SECRET", "change-me-bot-secret").strip()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("savanna_bridge.bot")


async def send_safe_message(
    message: types.Message,
    text: str,
    parse_mode: str | None = "Markdown",
    reply_markup: Any = None,
) -> Any:
    """Send message safely, gracefully falling back if Telegram Markdown parsing fails."""
    try:
        return await message.answer(text, parse_mode=parse_mode, reply_markup=reply_markup)
    except Exception as e:
        logger.warning(
            "Failed sending message with parse_mode=%s: %s. Falling back to plain text.",
            parse_mode,
            e,
        )
        clean = text.replace("**", "").replace("*", "").replace("`", "")
        return await message.answer(clean, reply_markup=reply_markup)


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
            "platform_id": "generic",
            "platform_name": "this platform",
            "notification_setup": {},
        }
    return USER_SESSIONS[user_id]


def make_main_keyboard(lang: str = "am", lite: bool = False) -> ReplyKeyboardMarkup:
    if lite:
        return ReplyKeyboardMarkup(
            keyboard=[
                [KeyboardButton(text="1"), KeyboardButton(text="2"), KeyboardButton(text="3")],
                [
                    KeyboardButton(text="/start"),
                    KeyboardButton(text="/link"),
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
            [KeyboardButton(text="🔗 መለያ አገናኝ"), KeyboardButton(text="❓ እርዳታ")],
        ]
    elif lang == "om":
        kb = [
            [KeyboardButton(text="❓ Gaaffii Gaafadhu"), KeyboardButton(text="👥 Nama Waliin Dubbadhu")],
            [KeyboardButton(text="📅 Yeroo Xumuraa"), KeyboardButton(text="📚 Kutaa Barnootaa")],
            [KeyboardButton(text="💼 Carraa Hojii"), KeyboardButton(text="⚙️ Qindaa'inoota")],
            [KeyboardButton(text="🔗 Herrega Walqabsiisi"), KeyboardButton(text="❓ Gargaarsa")],
        ]
    elif lang == "ti":
        kb = [
            [KeyboardButton(text="❓ ሕቶ ሕተት"), KeyboardButton(text="👥 ምስ ሰብ ተራኸብ")],
            [KeyboardButton(text="📅 ናይ ምዝዛም ዕለት"), KeyboardButton(text="📚 ሞጁላት")],
            [KeyboardButton(text="💼 ናይ ስራሕ ዕድላት"), KeyboardButton(text="⚙️ ቅጥዕታት")],
            [KeyboardButton(text="🔗 ኣካውንት ኣላግብ"), KeyboardButton(text="❓ ሓገዝ")],
        ]
    elif lang == "ar":
        kb = [
            [KeyboardButton(text="❓ طرح سؤال"), KeyboardButton(text="👥 التحدث مع شخص")],
            [KeyboardButton(text="📅 المواعيد النهائية"), KeyboardButton(text="📚 وحدات الدورة")],
            [KeyboardButton(text="💼 فرص العمل"), KeyboardButton(text="⚙️ الإعدادات")],
            [KeyboardButton(text="🔗 ربط الحساب"), KeyboardButton(text="❓ المساعدة")],
        ]
    else:
        kb = [
            [KeyboardButton(text="❓ Ask a Question"), KeyboardButton(text="👥 Talk to a Person")],
            [KeyboardButton(text="📅 Deadlines"), KeyboardButton(text="📚 Course Modules")],
            [KeyboardButton(text="💼 Job Alerts"), KeyboardButton(text="⚙️ Settings")],
            [KeyboardButton(text="🔗 Link Account"), KeyboardButton(text="❓ Help")],
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
            [
                InlineKeyboardButton(text="🇸🇦 العربية (Arabic)", callback_data="lang_ar"),
            ],
        ]
    )


# --- Core API client helpers ---


async def call_api_raw(
    method: str,
    path: str,
    json_data: dict[str, Any] | None = None,
    headers: dict[str, str] | None = None,
) -> tuple[int, dict[str, Any]]:
    url = f"{API_BASE_URL}{path}"
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.request(method, url, json=json_data, headers=headers)
            try:
                body = res.json()
            except Exception:
                body = {"detail": res.text}
            return res.status_code, body
    except Exception as e:
        logger.error("API call %s %s failed: %s", method, path, e)
        return 500, {"detail": str(e)}


async def call_api(
    method: str,
    path: str,
    json_data: dict[str, Any] | None = None,
    headers: dict[str, str] | None = None,
) -> dict[str, Any] | None:
    status, body = await call_api_raw(method, path, json_data=json_data, headers=headers)
    if 200 <= status < 300:
        return body
    return None


# --- Router and Handlers ---

router = Router()


@router.message(Command("start"))
async def handle_start(message: types.Message) -> None:
    args = message.text.split() if message.text else []
    if len(args) > 1 and args[1].strip():
        token = args[1].strip()
        user_id = message.from_user.id if message.from_user else 0
        state = get_user_state(user_id)
        lang = state.get("language", "en")

        headers = {"X-Bot-Secret": BOT_API_SECRET}
        status_code, res = await call_api_raw(
            "POST",
            "/api/v1/link/confirm",
            {"token": token, "telegram_chat_id": str(user_id)},
            headers=headers,
        )

        if status_code == 200 and res.get("linked"):
            state["linked"] = True
            if res.get("learner_ref"):
                state["learner_ref"] = res["learner_ref"]
            state["platform_id"] = res.get("platform_id", "generic")
            state["platform_name"] = res.get("platform_name", "this platform")
            success_msgs = {
                "am": "የኮርስ ክፍለ-ጊዜዎ ተገናኝቷል። ማንኛውንም ጥያቄ በጽሑፍ ይጠይቁ ወይም 'ከሰው ጋር ተገናኝ' የሚለውን ይጫኑ።",
                "om": "Kutaan barnootaa keessan walqabateera. Gaaffii keessan barreeffamaan gaafadhaa ykn 'Nama Waliin Dubbadhu' kan jedhu tuqaa.",
                "ti": "ናይ ኮርስ ክፍለ-ግዜኹም ተላጊቡ ኣሎ። ዝኾነ ሕቶ ብጽሑፍ ሕተቱ ወይ 'ምስ ሰብ ተራኸብ' ዝብል ጠውቑ።",
                "ar": "تم ربط جلستك بنجاح. اطرح سؤالك بنص عادي أو اضغط 'التحدث مع شخص'.",
                "en": "Connected to your course session. Ask any question in plain text or tap Talk to a person.",
            }
            await send_safe_message(
                message,
                success_msgs.get(lang, success_msgs["en"]),
                reply_markup=make_main_keyboard(lang, state["lite_mode"]),
            )
            notification_prompt = {
                "am": f"{state['platform_name']} ላይ ስለ ማጠናቀቂያ ቀኖች፣ አዲስ ትምህርቶች እና የሥራ እድሎች በቴሌግራም ማሳወቂያ ይፈልጋሉ?",
                "om": f"Waa'ee yeroo xumuraa, barnoota haaraa fi carraa hojii {state['platform_name']} irraa beeksisa Telegram barbaadduu?",
                "ti": f"ካብ {state['platform_name']} ናይ ዕለት፣ ሓድሽ ትምህርቲን ስራሕን መተሓሳሰቢ ብቴሌግራም ትደልዩ ዶ?",
                "ar": f"هل تريد إشعارات تيليجرام بالمواعيد والدروس الجديدة وفرص العمل من {state['platform_name']}؟",
                "en": f"Would you like Telegram notifications about deadlines, new lessons, and job alerts from {state['platform_name']}?",
            }
            yes_no = InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(text="Yes / አዎ", callback_data="notify_consent_yes"),
                        InlineKeyboardButton(text="No / አይ", callback_data="notify_consent_no"),
                    ]
                ]
            )
            await send_safe_message(
                message,
                notification_prompt.get(lang, notification_prompt["en"]),
                reply_markup=yes_no,
            )
            return
        else:
            fail_msgs = {
                "am": "ይህ ሊንክ ጊዜው አልፏል ወይም አስቀድሞ ስራ ላይ ውሏል። እባክዎ በድረ-ገጹ ረዳት ውስጥ 'በቴሌግራም ቀጥል' የሚለውን ተጭነው አዲስ ሊንክ ያግኙ።",
                "om": "Liankiin kun yeroon isaa darbeera ykn duraan hojiirra ooleera. Mee gargaaraa weebsaayitii irraa 'Continue on Telegram' tuquun liankii haaraa argadhaa.",
                "ti": "እዚ ሊንክ ግዜኡ ሓሊፉ ወይ ድሮ ተጠቒምኩምሉ ኣለኹም። በጃኹም ኣብ መርበብ ሓበሬታ 'በቴሌግራም ቀጥል' ጠዊቕኩም ሓዲሽ ሊንክ ውሰዱ።",
                "ar": "هذا الرابط منتهي الصلاحية أو تم استخدامه مسبقاً. يرجى فتح المساعد على الموقع والضغط على 'المتابعة عبر تيليجرام' للحصول على رابط جديد.",
                "en": "This link has expired or was already used. Please open the assistant on the website and tap Continue on Telegram to get a new link.",
            }
            await send_safe_message(message, fail_msgs.get(lang, fail_msgs["en"]))
            return

    welcome_text = (
        "👋 **እንኳን ወደ ሳቫና ብሪጅ ረዳት በደህና መጡ!**\n"
        "Welcome to the **Savanna Bridge Assistant**.\n"
        "مرحباً بك في مساعد **سافانا بريدج**.\n\n"
        "ቋንቋዎን ይምረጡ / Choose your language / اختر لغتك:\n"
        "• አማርኛ (Amharic)\n"
        "• English\n"
        "• Afaan Oromoo\n"
        "• ትግርኛ (Tigrinya)\n"
        "• العربية (Arabic)\n\n"
        "ጥያቄዎችን በጽሑፍ ወይም በድምጽ መጠየቅ ይችላሉ። በማንኛውም ሰዓት ከሰው ጋር ለመገናኘት 'ከሰው ጋር ተገናኝ' የሚለውን ይጫኑ።"
    )
    await message.answer(
        welcome_text,
        parse_mode="Markdown",
        reply_markup=make_language_inline(),
    )


@router.callback_query(F.data == "notify_consent_no")
async def decline_notifications(callback: types.CallbackQuery) -> None:
    state = get_user_state(callback.from_user.id)
    await call_api(
        "PUT",
        f"/api/v1/notification-settings?learner_ref={state['learner_ref']}",
        {
            "telegram_enabled": False,
            "consent_granted": False,
            "platform_id": state["platform_id"],
            "language": state["language"],
        },
    )
    await callback.answer("Notifications remain off")
    await send_safe_message(
        callback.message,
        "Notifications are off. You can enable them later with /settings.",
    )


@router.callback_query(F.data == "notify_consent_yes")
async def choose_notification_categories(callback: types.CallbackQuery) -> None:
    state = get_user_state(callback.from_user.id)
    state["notification_setup"] = {"consent_granted": True, "telegram_enabled": True}
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="All updates", callback_data="notify_categories_all")],
            [
                InlineKeyboardButton(text="Jobs only", callback_data="notify_categories_jobs"),
                InlineKeyboardButton(text="Deadlines only", callback_data="notify_categories_deadlines"),
            ],
        ]
    )
    await callback.answer()
    await send_safe_message(
        callback.message,
        "Which updates should I send? You can change this later in /settings.",
        reply_markup=keyboard,
    )


@router.callback_query(F.data.startswith("notify_categories_"))
async def choose_notification_frequency(callback: types.CallbackQuery) -> None:
    state = get_user_state(callback.from_user.id)
    choice = callback.data.removeprefix("notify_categories_")
    setup = state.setdefault("notification_setup", {})
    setup.update(
        {
            "deadlines": choice in {"all", "deadlines"},
            "new_lessons": choice == "all",
            "job_alerts": choice in {"all", "jobs"},
        }
    )
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Immediately", callback_data="notify_frequency_immediate"),
                InlineKeyboardButton(text="Daily summary", callback_data="notify_frequency_daily"),
            ]
        ]
    )
    await callback.answer()
    await send_safe_message(callback.message, "When should I send them?", reply_markup=keyboard)


@router.callback_query(F.data.startswith("notify_frequency_"))
async def choose_notification_quiet_hours(callback: types.CallbackQuery) -> None:
    state = get_user_state(callback.from_user.id)
    frequency = callback.data.removeprefix("notify_frequency_")
    state.setdefault("notification_setup", {})["frequency"] = frequency
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Quiet 22:00–07:00", callback_data="notify_quiet_yes"),
                InlineKeyboardButton(text="No quiet hours", callback_data="notify_quiet_no"),
            ]
        ]
    )
    await callback.answer()
    await send_safe_message(
        callback.message,
        "Should I avoid notifications overnight in the platform time zone?",
        reply_markup=keyboard,
    )


@router.callback_query(F.data.startswith("notify_quiet_"))
async def finish_notification_setup(callback: types.CallbackQuery) -> None:
    state = get_user_state(callback.from_user.id)
    use_quiet_hours = callback.data.endswith("yes")
    setup = state.setdefault("notification_setup", {})
    setup.update(
        {
            "quiet_hours_start": "22:00" if use_quiet_hours else None,
            "quiet_hours_end": "07:00" if use_quiet_hours else None,
            "timezone": "Africa/Addis_Ababa",
            "language": state["language"],
            "platform_id": state["platform_id"],
            "muted": False,
            "low_bandwidth": state["lite_mode"],
        }
    )
    saved = await call_api(
        "PUT",
        f"/api/v1/notification-settings?learner_ref={state['learner_ref']}",
        setup,
    )
    await callback.answer()
    if saved:
        await send_safe_message(
            callback.message,
            "Notification preferences saved. Use /settings to review or /mute at any time.",
        )
    else:
        await send_safe_message(
            callback.message,
            "I could not save notification preferences. Notifications remain off; try /settings later.",
        )


@router.callback_query(F.data.startswith("lang_"))
async def handle_language_choice(callback: types.CallbackQuery) -> None:
    user_id = callback.from_user.id
    state = get_user_state(user_id)
    lang_code = callback.data.split("_")[1]
    state["language"] = lang_code

    names = {
        "am": "አማርኛ",
        "en": "English",
        "om": "Afaan Oromoo",
        "ti": "ትግርኛ",
        "ar": "العربية",
    }
    chosen = names.get(lang_code, lang_code)

    if lang_code == "am":
        ack = f"✅ ቋንቋ ወደ **{chosen}** ተቀይሯል።"
    elif lang_code == "om":
        ack = f"✅ Afaan gara **{chosen}**tti jijjiirameera."
    elif lang_code == "ti":
        ack = f"✅ ቋንቋ ናብ **{chosen}** ተቐይሩ ኣሎ።"
    elif lang_code == "ar":
        ack = f"✅ تم تغيير اللغة إلى **{chosen}**."
    else:
        ack = f"✅ Language switched to **{chosen}**."

    await callback.message.answer(
        ack,
        parse_mode="Markdown",
        reply_markup=make_main_keyboard(lang=lang_code, lite=state["lite_mode"]),
    )
    await callback.answer()


@router.message(Command("help"))
@router.message(F.text.in_({"❓ እርዳታ", "❓ Help", "❓ Gargaarsa", "❓ ሓገዝ", "❓ المساعدة"}))
async def handle_help(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    help_texts = {
        "am": (
            "📖 **የሳቫና ብሪጅ ረዳት መመሪያ**\n\n"
            "ትዕዛዞች:\n"
            "/start - ቋንቋ ለመምረጥና እንደገና ለመጀመር\n"
            "/deadlines - መጪ የማጠናቀቂያ ቀኖችን ለማየት\n"
            "/modules - የኮርስ ሞጁሎችን ለማየት\n"
            "/handoff - ከሰው አማካሪ ጋር ለመገናኘት\n"
            "/jobs - ተደራሽ የሥራ እድሎችን ለማየት\n"
            "/accommodations - የመስተንግዶ ጥያቄ ረቂቅ ለማዘጋጀት\n"
            "/link - የመለያ ማገናኛ ኮድ ለማግኘት\n"
            "/lite - የዳታ ቁጠባን ለማብራት/ለማጥፋት\n"
            "/settings - የማሳወቂያ ቅንብሮችን ለማስተካከል\n\n"
            "💬 ወይም በቀጥታ ጥያቄዎን በጽሑፍ ወይም በድምጽ ይላኩ።"
        ),
        "om": (
            "📖 **Qajeelfama Gargaaraa Savanna Bridge**\n\n"
            "Ajajoota:\n"
            "/start - Afaan filachuu fi deebisanii eegaluuf\n"
            "/deadlines - Yeroo xumuraa barnootaa arguuf\n"
            "/modules - Kutaalee barnootaa arguuf\n"
            "/handoff - Gargaaraa namaa waliin dubbachuuf\n"
            "/jobs - Carraawwan hojii mijatoo arguuf\n"
            "/accommodations - Wixinee mijaawina qopheessuuf\n"
            "/link - Koodii herrega walqunnamsiisuuf\n"
            "/lite - Quusannaa daataa banuu/cufuuf\n"
            "/settings - Qindaa'inoota beeksisaa to'achuuf\n\n"
            "💬 Ykn kallattiin gaaffii keessan barreessaa ykn sagaleedhaan ergaa."
        ),
        "ti": (
            "📖 **መምርሒ ሓጋዚ ሳቫና ብሪጅ**\n\n"
            "ትእዛዛት:\n"
            "/start - ቋንቋ ንምምራጽን እንደገና ንምጅማርን\n"
            "/deadlines - ናይ ምዝዛም ዕለታት ንምርኣይ\n"
            "/modules - ሞጁላት ኮርስ ንምርኣይ\n"
            "/handoff - ምስ ሰብ ሓጋዚ ንምርኻብ\n"
            "/jobs - ናይ ስራሕ ዕድላት ንምርኣይ\n"
            "/accommodations - ናይ ምምችቻው ጠለብ ንምድላው\n"
            "/link - ናይ ምትእስሳር ኮድ ንምርካብ\n"
            "/lite - ቍጠባ ዳታ ንምኽፋት/ንምዕጻው\n"
            "/settings - ቅጥዕታት መተሓሳሰቢ ንምስትኻኻል\n\n"
            "💬 ወይ ድማ ብቐጥታ ሕቶኹም ብጽሑፍ ወይ ብድምጺ ስደዱ።"
        ),
        "ar": (
            "📖 **دليل مساعد سافانا بريدج**\n\n"
            "الأوامر المتاحة:\n"
            "/start - لاختيار اللغة وإعادة تشغيل المساعد\n"
            "/deadlines - لعرض المواعيد النهائية للمقررات\n"
            "/modules - لاستعراض وحدات الدورة التدريبية\n"
            "/handoff - للتحدث مع مرشد بشري مباشرة\n"
            "/jobs - لاستعراض فرص العمل الشاملة وتسهيلاتها\n"
            "/accommodations - لصياغة طلب تسهيلات المقابلة\n"
            "/link - للحصول على رمز ربط الحساب بدون هوية\n"
            "/lite - لتشغيل أو إيقاف وضع توفير البيانات\n"
            "/settings - لإدارة إعدادات التنبيهات والإشعارات\n\n"
            "💬 أو يمكنك ببساطة كتابة سؤالك أو إرسال رسالة صوتية."
        ),
        "en": (
            "📖 **Savanna Bridge Assistant Help**\n\n"
            "Commands:\n"
            "/start - Choose language and restart\n"
            "/deadlines - View upcoming course deadlines\n"
            "/modules - View course modules and syllabus\n"
            "/handoff - Connect to a human mentor\n"
            "/jobs - Browse accessible job opportunities\n"
            "/accommodations - Draft interview accommodations request\n"
            "/link - Get one-time barrier-free account linking code\n"
            "/lite - Toggle low-bandwidth data saving mode\n"
            "/settings - Manage notification preferences\n\n"
            "💬 Or simply type your question or send a voice message."
        ),
    }
    await send_safe_message(message, help_texts.get(lang, help_texts["en"]))


@router.message(Command("lite"))
async def handle_lite_toggle(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    state["lite_mode"] = not state["lite_mode"]
    lang = state.get("language", "en")

    if state["lite_mode"]:
        msgs = {
            "am": "⚡ **የዳታ ቁጠባ በርቷል**: አጫጭር የጽሑፍ መልሶች እና የቁጥር ምላሾች (1, 2, 3)።",
            "om": "⚡ **Quusannaa Daataa Banameera**: Deebiiwwan gabaaboo fi lakkoofsa (1, 2, 3).",
            "ti": "⚡ **ቍጠባ ዳታ ተኸፊቱ**: ሓጸርቲ ጽሑፋዊ መልስታትን ቁጽርታትን (1, 2, 3)።",
            "ar": "⚡ **وضع توفير البيانات مفعل**: إجابات نصية موجزة وردود رقمية (1, 2, 3).",
            "en": "⚡ **Lite Mode On**: Text-only, concise answers, and numeric replies (1, 2, 3).",
        }
    else:
        msgs = {
            "am": "⚡ **መደበኛ ሁኔታ ተመልሷል**: ሙሉ ሜኑ እና የድምጽ መልሶች ተከፍተዋል።",
            "om": "⚡ **Haalli Idilee Deebi'eera**: Menyuu guutuu fi deebiiwwan sagalee banamaniiru.",
            "ti": "⚡ **ስሩዕ ኩነታት ተመሊሱ**: ምሉእ ሜኑን ናይ ድምጺ መልስታትን ተኸፊቱ ኣሎ።",
            "ar": "⚡ **تم استعادة الوضع القياسي**: القوائم الكاملة والتشغيل الصوتي مفعلة.",
            "en": "⚡ **Lite Mode Off**: Standard rich mode restored with audio playback and full menus.",
        }

    await send_safe_message(
        message,
        msgs.get(lang, msgs["en"]),
        reply_markup=make_main_keyboard(lang, state["lite_mode"]),
    )


@router.message(Command("link"))
@router.message(F.text.in_({"🔗 መለያ አገናኝ", "🔗 Link Account", "🔗 Herrega Walqabsiisi", "🔗 ኣካውንት ኣላግብ", "🔗 ربط الحساب"}))
async def handle_link(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

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
        link_msgs = {
            "am": (
                f"🔗 **የመለያ ማገናኛ ኮድ**\n\n"
                f"የእርስዎ ኮድ: `{code}`\n"
                f"ይህ ኮድ ለ 10 ደቂቃ ብቻ ያገለግላል። በድር ገጹ ላይ ባለው የረዳት መስኮት ያስገቡት።\n\n"
                f"ወይም ከድር ገጹ ኮድ ካገኙ እዚህ በሚከተለው መልኩ ይላኩ:\n"
                f"`/confirm <የ6-አሃዝ-ኮድ>` (ምሳሌ: `/confirm {code}`)\n\n"
                f"*ምንም መታወቂያ ወይም የሕክምና ማረጋገጫ አይጠየቅም።*"
            ),
            "om": (
                f"🔗 **Koodii Herrega Walqunnamsiisuu**\n\n"
                f"Koodii keessan: `{code}`\n"
                f"Koodiin kun daqiiqaa 10 qofaaf hojjeta. Fuula weebsaayitii irratti galchaa.\n\n"
                f"Ykn koodii weebsaayitii irraa argattan asitti ergaa:\n"
                f"`/confirm <koodii>` (Fkn: `/confirm {code}`)\n\n"
                f"*Waraqaan eenyummaa ykn ragaan yaalaa hin gaafatamu.*"
            ),
            "ti": (
                f"🔗 **ናይ ኣካውንት መላገቢ ኮድ**\n\n"
                f"ኮድኩም: `{code}`\n"
                f"እዚ ኮድ ን10 ደቒቕ ጥራይ የገልግል። ኣብ መርበብ ሓበሬታ የእትውዎ።\n\n"
                f"ወይ ድማ ካብ መርበብ ሓበሬታ ዝረኸብክምዎ ኮድ ኣብዚ ስደዱ:\n"
                f"`/confirm <ኮድ>` (ኣብነት: `/confirm {code}`)\n\n"
                f"*ዋላ ሓደ መታወቒ ወይ ናይ ሕክምና መርትዖ ኣይሕተትን እዩ።*"
            ),
            "ar": (
                f"🔗 **رمز ربط الحساب**\n\n"
                f"الرمز الخاص بك: `{code}`\n"
                f"صالح لمدة 10 دقائق فقط. أدخل هذا الرمز في نافذة المساعد على موقع الويب.\n\n"
                f"أو إذا حصلت على رمز من الموقع، أرسله هنا:\n"
                f"`/confirm <الرمز>` (مثال: `/confirm {code}`)\n\n"
                f"*لا يُطلب أي إثبات هوية أو وثائق طبية على الإطلاق.*"
            ),
            "en": (
                f"🔗 **Account Link Code**\n\n"
                f"Your one-time code: `{code}`\n"
                f"Expires in 10 minutes. Enter this code on the web assistant widget.\n\n"
                f"Or if you already generated a code on the web widget, reply here with:\n"
                f"`/confirm <code>` (e.g. `/confirm {code}`)\n\n"
                f"*Zero ID or medical proof requested.*"
            ),
        }
        await send_safe_message(message, link_msgs.get(lang, link_msgs["en"]))
    else:
        err_msgs = {
            "am": "⚠️ ኮዱን ማግኘት አልተቻለም። እባክዎ እንደገና ይሞክሩ።",
            "om": "⚠️ Koodii argachuun hin danda'amne. Mee irra deebi'aa yaalaa.",
            "ti": "⚠️ ኮድ ምርካብ ኣይተኻእለን። በጃኹም ደጊምኩም ፈትኑ።",
            "ar": "⚠️ تعذر إنشاء رمز الربط. يرجى المحاولة مرة أخرى.",
            "en": "⚠️ Could not generate link code. Please try again.",
        }
        await send_safe_message(message, err_msgs.get(lang, err_msgs["en"]))


@router.message(Command("confirm"))
async def handle_confirm(message: types.Message) -> None:
    args = message.text.split()
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    if len(args) < 2:
        await send_safe_message(message, "Usage: `/confirm <6-digit-code>` (e.g. `/confirm 123456`)")
        return
    code = args[1].strip()

    res = await call_api("POST", "/link/confirm", {"link_id": f"link_{user_id}", "code": code})
    if res and res.get("linked"):
        state["linked"] = True
        if res.get("learner_ref"):
            state["learner_ref"] = res["learner_ref"]
        ok_msgs = {
            "am": "✅ መለያዎ በተሳካ ሁኔታ ተገናኝቷል! ምርጫዎችዎ አሁን ተመሳስለዋል።",
            "om": "✅ Herregni keessan milkaa'inaan walqabateera! Filannoowwan keessan wal-simataniiru.",
            "ti": "✅ ኣካውንትኩም ብዓወት ተላጊቡ ኣሎ! ምርጫታትኩም ሐዚ ተመሳሲሎም ኣለዉ።",
            "ar": "✅ تم ربط حسابك بنجاح! تفضيلاتك متزامنة الآن.",
            "en": "✅ Account successfully linked! Your preferences are now synchronized across web and Telegram.",
        }
        await send_safe_message(message, ok_msgs.get(lang, ok_msgs["en"]))
    else:
        fail_msgs = {
            "am": "❌ ኮዱ ትክክል አይደለም ወይም ጊዜው አልፏል። እባክዎ እንደገና ይሞክሩ።",
            "om": "❌ Koodiin dogoggora ykn yeroon isaa darbeera. Mee irra deebi'aa yaalaa.",
            "ti": "❌ ኮድ ጌጋ እዩ ወይ ግዜኡ ሓሊፉ። በጃኹም ደጊምኩም ፈትኑ።",
            "ar": "❌ الرمز غير صحيح أو انتهت صلاحيته. يرجى المحاولة مرة أخرى.",
            "en": "❌ Invalid or expired code. Please request a fresh code and try again.",
        }
        await send_safe_message(message, fail_msgs.get(lang, fail_msgs["en"]))


@router.message(Command("unlink"))
async def handle_unlink(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")
    state["linked"] = False
    await call_api("POST", "/link/revoke", {"link_id": f"link_{user_id}"})
    await call_api("POST", "/link/disconnect", {"learner_ref": state["learner_ref"]})
    unlink_msgs = {
        "am": "🔓 መለያዎ በተሳካ ሁኔታ ተለያይቷል። የግል ምርጫዎችዎ ከእንግዲህ አይመሳሰሉም።",
        "om": "🔓 Herregni keessan wal-gadhiiseera. Filannoowwan keessan gara fuulduraatti wal hin simatan.",
        "ti": "🔓 ኣካውንትኩም ተፈላልዩ ኣሎ። ምርጫታትኩም ድሕሪ ሕጂ ኣይመሳሰሉን እዮም።",
        "ar": "🔓 تم إلغاء ربط حسابك بنجاح. لن تتم مزامنة تفضيلاتك بعد الآن.",
        "en": "🔓 Account unlinked successfully. Your preferences will no longer sync with the web assistant.",
    }
    await send_safe_message(message, unlink_msgs.get(lang, unlink_msgs["en"]))



@router.message(Command("handoff"))
@router.message(
    F.text.in_({"👥 ከሰው ጋር ተገናኝ", "👥 Talk to a Person", "👥 Nama Waliin Dubbadhu", "👥 ምስ ሰብ ተራኸብ", "👥 التحدث مع شخص"})
)
async def handle_handoff(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    payload = {
        "consent": True,
        "learner_ref": state["learner_ref"],
        "card": {
            "language": lang,
            "context": state.get("last_context", "Learner requested a human from Telegram."),
            "support_needs": ["written_instructions"],
            "contact_mode": "text",
        },
    }
    res = await call_api("POST", "/handoff", payload)
    if res:
        room_url = res.get("room_url", "https://meet.jit.si/savanna-bridge-demo")
        handoff_id = res.get("id", "handoff_01")

        handoff_msgs = {
            "am": (
                f"👤 **ለሰው ባለሙያ ጥያቄዎ ተላልፏል!** (ጥያቄ ቁጥር: `{handoff_id}`)\n\n"
                f"የባለሙያ ድጋፍ ክፍል አገናኝ:\n👉 {room_url}\n\n"
                f"ℹ️ *ማሳሰቢያ:* ማያ ገጽ ማጋራትን የሚቆጣጠሩት እርስዎ ብቻ ነዎት። እርስዎ ሳይፈቅዱ ምንም ነገር አይጋራም።"
            ),
            "om": (
                f"👤 **Gargaaraa namaaf dhiyaateera!** (Tikkeetii: `{handoff_id}`)\n\n"
                f"Liinkii kutaa kallattii:\n👉 {room_url}\n\n"
                f"ℹ️ *Hubachiisa:* Iskiriinii qooduu guutummaatti to'achuu kan dandeessan isin qofa. Hayyama keessan malee homtuu hin qoodamu."
            ),
            "ti": (
                f"👤 **ናብ ሰብ ሓጋዚ ሕቶኹም ተመሓላሊፉ ኣሎ!** (ቑጽሪ ትኬት: `{handoff_id}`)\n\n"
                f"ናይ ቀጥታ መራኸቢ ሊንክ:\n👉 {room_url}\n\n"
                f"ℹ️ *መተሓሳሰቢ:* ስክሪን ምክፋል ንስኻ ጥራይ ኢኻ ትቆጻጸሮ። ብዘይ ፍቓድካ ዋላ ሓደ ነገር ኣይክፈልን እዩ።"
            ),
            "ar": (
                f"👤 **تم إخطار فريق الدعم البشري!** (رقم التذكرة: `{handoff_id}`)\n\n"
                f"رابط الغرفة المباشرة:\n👉 {room_url}\n\n"
                f"ℹ️ *ملاحظة:* أنت وحدك من يتحكم في مشاركة الشاشة. لن تتم مشاركة أي شيء بدون موافقتك الصريحة."
            ),
            "en": (
                f"👤 **A support person has been notified!** (Ticket: `{handoff_id}`)\n\n"
                f"Live room link:\n👉 {room_url}\n\n"
                f"ℹ️ *Notice:* You have full control over screen sharing. Nothing is shared without your explicit action."
            ),
        }
        await send_safe_message(message, handoff_msgs.get(lang, handoff_msgs["en"]))
    else:
        err_msgs = {
            "am": "⚠️ እርዳታ ለማግኘት አልተቻለም። እባክዎ ጥቂት ቆይተው እንደገና ይሞክሩ።",
            "om": "⚠️ Gargaarsa argachuun hin danda'amne. Mee xiqqoo booda yaalaa.",
            "ti": "⚠️ ሓገዝ ምርካብ ኣይተኻእለን። በጃኹም ጸኒሕኩም ደጊምኩም ፈትኑ።",
            "ar": "⚠️ تعذر الاتصال بفريق الدعم حالياً. يرجى المحاولة بعد قليل.",
            "en": "⚠️ Could not connect to support. Please try again shortly.",
        }
        await send_safe_message(message, err_msgs.get(lang, err_msgs["en"]))


@router.message(
    F.text.in_({"❓ ጥያቄ ጠይቅ", "❓ Ask a Question", "❓ Gaaffii Gaafadhu", "❓ ሕቶ ሕተት", "❓ طرح سؤال"})
)
async def handle_ask_prompt(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    prompts = {
        "am": (
            "❓ **ጥያቄዎን ይጻፉ ወይም የድምጽ መልዕክት ይላኩ**\n\n"
            "ስለ ኮርሱ፣ ስለ ምዝገባ፣ ስለ ማጠናቀቂያ ቀኖች ወይም ስለ ሞጁሎች የሚፈልጉትን ይጠይቁ።"
        ),
        "om": (
            "❓ **Gaaffii keessan barreessaa ykn sagaleedhaan ergaa**\n\n"
            "Waa'ee barnootaa, galmee, ykn qabiyyee kamiyyuu gaafachuu dandeessu."
        ),
        "ti": (
            "❓ **ሕቶኹም ብጽሑፍ ወይ ብድምጺ ስደዱ**\n\n"
            "ብዛዕባ ትሕዝቶ ኮርስ፣ ምዝገባ፣ ወይ ካልእ ዝኾነ ሕቶ ክትሓቱ ትኽእሉ ኢኹም።"
        ),
        "ar": (
            "❓ **يرجى كتابة سؤالك أو إرسال رسالة صوتية.**\n\n"
            "يمكنك السؤال عن وحدات الدورة، المواعيد النهائية، أو التنقل في المنصة."
        ),
        "en": (
            "❓ **Please type your question or send a voice message.**\n\n"
            "You can ask about course modules, deadlines, assignments, or platform navigation."
        ),
    }
    await send_safe_message(message, prompts.get(lang, prompts["en"]))


@router.message(Command("deadlines"))
@router.message(
    F.text.in_({"📅 ምን ይጠበቃል?", "📅 Deadlines", "📅 Yeroo Xumuraa", "📅 ናይ ምዝዛም ዕለት", "📅 المواعيد النهائية"})
)
async def handle_deadlines(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    res = await call_api("GET", "/learner/deadlines")
    if not res or not res.get("items"):
        no_deadlines = {
            "am": "ምንም መጪ ማጠናቀቂያዎች የሉም።",
            "om": "Yeroon xumuraa dhiyaate hin jiru.",
            "ti": "ምንም መጪ ናይ ምዝዛም ዕለታት የለን።",
            "ar": "لا توجد مواعيد نهائية قادمة.",
            "en": "No upcoming deadlines.",
        }
        await send_safe_message(message, no_deadlines.get(lang, no_deadlines["en"]))
        return

    titles = {
        "am": ("📅 **መጪ የኮርስ ማጠናቀቂያዎች:**\n", "ቀን", "ሊንክ", "እርዳታ ከፈለጉ `2` ብለው ይመልሱ።"),
        "om": ("📅 **Yeroo Xumuraa Barnootaa Mirkanaa'e:**\n", "Yeroo", "Liinkii", "Gargaarsa yoo barbaaddan `2` jedhaa deebisaa."),
        "ti": ("📅 **መጪ ናይ ኮርስ ምዝዛም ዕለታት:**\n", "ዕለት", "ሊንክ", "ሓገዝ እንተደሊኹም `2` ኢልኩም መልሱ።"),
        "ar": ("📅 **المواعيد النهائية القادمة للدورة:**\n", "تاريخ الاستحقاق", "الرابط", "إذا كنت بحاجة للمساعدة، أرسل `2`."),
        "en": ("📅 **Upcoming Course Deadlines:**\n", "Due", "Link", "Reply `2` if you need assistance."),
    }
    header, due_lbl, link_lbl, helper = titles.get(lang, titles["en"])
    lines = [header]
    for item in res["items"]:
        lines.append(
            f"• **{item['title']}**\n  {due_lbl}: `{item['due_at']}`\n  [{link_lbl}]({item['url']})\n"
        )
    lines.append(helper)
    await send_safe_message(message, "\n".join(lines))


@router.message(Command("modules"))
@router.message(
    F.text.in_({"📚 ሞጁሎች", "📚 Course Modules", "📚 Kutaa Barnootaa", "📚 ሞጁላት", "📚 وحدات الدورة"})
)
async def handle_modules(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    res = await call_api("GET", "/learner/modules")
    if not res or not res.get("items"):
        no_mods = {
            "am": "የኮርስ ሞጁሎችን ማግኘት አልተቻለም።",
            "om": "Kutaalee barnootaa argachuun hin danda'amne.",
            "ti": "ሞጁላት ኮርስ ምርካብ ኣይተኻእለን።",
            "ar": "تعذر استرداد وحدات الدورة التدريبية.",
            "en": "Could not retrieve course modules.",
        }
        await send_safe_message(message, no_mods.get(lang, no_mods["en"]))
        return

    titles = {
        "am": ("📚 **የኮርሱ ሞጁሎች:**\n", "ሞጁል", "መግቢያ", "ስለ አንድ ሞጁል ለማብራራት ጥያቄዎን ይጻፉ።"),
        "om": ("📚 **Kutaalee Barnootaa:**\n", "Kutaa", "Seensa", "Waa'ee kutaa tokkoo caalaatti baruuf gaaffii keessan barreessaa."),
        "ti": ("📚 **ሞጁላት ኮርስ:**\n", "ሞጁል", "መእተዊ", "ብዛዕባ ሓደ ሞጁል መብርሂ ንምርካብ ሕቶኹም ጸሓፉ።"),
        "ar": ("📚 **وحدات الدورة التدريبية:**\n", "الوحدة", "الرابط", "اطرح أي سؤال لمعرفة المزيد عن أي وحدة."),
        "en": ("📚 **Course Modules:**\n", "Module", "Open", "Ask any question to learn more about a module."),
    }
    header, mod_lbl, open_lbl, helper = titles.get(lang, titles["en"])
    lines = [header]
    for m in res["items"]:
        lines.append(
            f"• **{mod_lbl} {m['number']}: {m['title']}**\n  {m['summary']}\n  [{open_lbl}]({m['url']})\n"
        )
    lines.append(helper)
    await send_safe_message(message, "\n".join(lines))


@router.message(Command("jobs"))
@router.message(
    F.text.in_({"💼 የሥራ እድሎች", "💼 Job Alerts", "💼 Carraa Hojii", "💼 ናይ ስራሕ ዕድላት", "💼 فرص العمل"})
)
async def handle_jobs(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    res = await call_api("GET", "/jobs")
    if not res or not res.get("items"):
        no_jobs = {
            "am": "ምንም የሥራ ማስታወቂያ አልተገኘም።",
            "om": "Beeksisi hojii homaayyuu hin argamne.",
            "ti": "ምንም ናይ ስራሕ ምልክታ ኣይተረኽበን።",
            "ar": "لم يتم العثور على أي وظائف حالياً.",
            "en": "No job opportunities found.",
        }
        await send_safe_message(message, no_jobs.get(lang, no_jobs["en"]))
        return

    job = res["items"][0]
    state["last_job_id"] = job["id"]
    accommodations = ", ".join(job.get("accommodations", [])) or "None listed"

    job_labels = {
        "am": (
            f"💼 **{job['title']}**\n"
            f"ድርጅት: {job['hiring_organization']}\n"
            f"ቦታ: {job['job_location']}\n"
            f"ተደራሽነት: `{accommodations}`\n\n"
            f"{job['description']}\n\n"
            f"ምላሽ ለመስጠት ቁጥር ይላኩ:\n"
            f"1️⃣ - ፍላጎት አለኝ\n"
            f"2️⃣ - ደውሉልኝ (ከሰው ጋር ተገናኝ)\n"
            f"3️⃣ - ስለ ሥራው አብራራልኝ\n"
            f"ለመስተንግዶ ማመልከቻ: /accommodations"
        ),
        "om": (
            f"💼 **{job['title']}**\n"
            f"Dhaabbata: {job['hiring_organization']}\n"
            f"Bakka: {job['job_location']}\n"
            f"Mijaawina: `{accommodations}`\n\n"
            f"{job['description']}\n\n"
            f"Deebii kennuuf lakkoofsa ergaa:\n"
            f"1️⃣ - Fedhii qaba\n"
            f"2️⃣ - Naaf bilbilaa (Nama waliin dubbadhu)\n"
            f"3️⃣ - Waa'ee hojichaa naaf ibsaa\n"
            f"Iyyannoo mijaawinaaf: /accommodations"
        ),
        "ti": (
            f"💼 **{job['title']}**\n"
            f"ትካል: {job['hiring_organization']}\n"
            f"ቦታ: {job['job_location']}\n"
            f"መስተንግዶታት: `{accommodations}`\n\n"
            f"{job['description']}\n\n"
            f"መልሲ ንምሃብ ቑጽሪ ስደዱ:\n"
            f"1️⃣ - ድሌት ኣለኒ\n"
            f"2️⃣ - ደውሉለይ (ምስ ሰብ ተራኸብ)\n"
            f"3️⃣ - ብዛዕባ ስራሕ ኣብርሃለይ\n"
            f"ናይ ምምችቻው ጠለብ: /accommodations"
        ),
        "ar": (
            f"💼 **{job['title']}**\n"
            f"المنظمة: {job['hiring_organization']}\n"
            f"الموقع: {job['job_location']}\n"
            f"تسهيلات الوصول: `{accommodations}`\n\n"
            f"{job['description']}\n\n"
            f"للرد، أرسل رقماً:\n"
            f"1️⃣ - مهتم بالتقديم\n"
            f"2️⃣ - اتصل بي (التحدث مع شخص)\n"
            f"3️⃣ - اشرح تفاصيل هذه الوظيفة\n"
            f"لطلب تسهيلات المقابلة: /accommodations"
        ),
        "en": (
            f"💼 **{job['title']}**\n"
            f"Organization: {job['hiring_organization']}\n"
            f"Location: {job['job_location']}\n"
            f"Accommodations: `{accommodations}`\n\n"
            f"{job['description']}\n\n"
            f"Reply with a number:\n"
            f"1️⃣ - Interested in applying\n"
            f"2️⃣ - Call me (Talk to a person)\n"
            f"3️⃣ - Explain this job in detail\n"
            f"Request interview accommodations: /accommodations"
        ),
    }
    await send_safe_message(message, job_labels.get(lang, job_labels["en"]))


@router.message(Command("accommodations"))
async def handle_accommodations(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    res = await call_api(
        "POST",
        "/accommodation/draft",
        {
            "job_id": state.get("last_job_id", "job_01"),
            "support_needs": ["written_instructions", "extra_time"],
            "employer_name": "Employer Team",
            "language": lang,
        },
    )
    if res:
        subject = res.get("subject", "Accommodation Request")
        body = res.get("message", "")

        draft_headers = {
            "am": ("📝 **የቃለ-መጠይቅ ማስተናገጃ ማመልከቻ ረቂቅ**", "ርዕስ", "መልዕክት", "*ይህ ረቂቅ ለእርስዎ እንዲያስተካክሉት የተዘጋጀ ነው። እርስዎ ሳያረጋግጡ አይላክም።*"),
            "om": ("📝 **Wixinee Iyyannoo Mijaawina Gaaffii fi Deebii**", "Mata Duree", "Ergaa", "*Wixineen kun akka sirreessitaniif qophaa'e. Hayyama keessan malee hin ergamu.*"),
            "ti": ("📝 **ንድፊ ጠለብ ምምችቻው ቃለ-መሕተት**", "ኣርእስቲ", "መልእኽቲ", "*እዚ ንድፊ ንስኹም ክትእርምዎ ዝተዳለወ እዩ። ብዘይ ፍቓድኩም ኣይስደድን።*"),
            "ar": ("📝 **مسودة طلب تسهيلات المقابلة الشخصية**", "الموضوع", "الرسالة", "*هذه مسودة قابلة للتعديل. لن يتم إرسال أي شيء دون تأكيد منك.*"),
            "en": ("📝 **Interview Accommodation Request Draft**", "Subject", "Message", "*Editable draft; sent=false until you review and confirm.*"),
        }
        title_lbl, subj_lbl, msg_lbl, notice_lbl = draft_headers.get(lang, draft_headers["en"])
        msg = f"{title_lbl}\n\n**{subj_lbl}:** {subject}\n\n**{msg_lbl}:**\n{body}\n\nℹ️ {notice_lbl}"
        await send_safe_message(message, msg)
    else:
        err_msg = {
            "am": "⚠️ ረቂቁን ማመንጨት አልተቻለም።",
            "om": "⚠️ Wixinee qopheessuun hin danda'amne.",
            "ti": "⚠️ ንድፊ ምድላው ኣይተኻእለን።",
            "ar": "⚠️ تعذر إنشاء المسودة حالياً.",
            "en": "⚠️ Could not generate accommodation draft.",
        }
        await send_safe_message(message, err_msg.get(lang, err_msg["en"]))


@router.message(Command("settings"))
@router.message(
    F.text.in_({"⚙️ ቅንብሮች", "⚙️ Settings", "⚙️ Qindaa'inoota", "⚙️ ቅጥዕታት", "⚙️ الإعدادات"})
)
async def handle_settings(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    res = await call_api(
        "GET",
        f"/api/v1/notification-settings?learner_ref={state['learner_ref']}",
    )
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

    settings_msgs = {
        "am": (
            f"⚙️ **የማሳወቂያ ቅንብሮች**\n\n"
            f"• ድምጽ አልባ: {'🔴 አዎ' if muted else '🟢 አይደለም'}\n"
            f"• የጊዜ ገደብ ማሳወቂያ: {'🟢 በርቷል' if deadlines else '🔴 ጠፍቷል'}\n"
            f"• የሥራ ማሳወቂያ: {'🟢 በርቷል' if jobs else '🔴 ጠፍቷል'}\n"
            f"• ዝቅተኛ ዳታ: {'🟢 በርቷል' if bandwidth else '🔴 ጠፍቷል'}\n\n"
            f"ለመቀየር ይጠቀሙ:\n/mute - ድምጽ አልባ ለማድረግ\n/unmute - ድምጽ ለማብራት\n/lite - የዳታ ቁጠባን ለመቀየር"
        ),
        "om": (
            f"⚙️ **Qindaa'inoota Beeksisaa**\n\n"
            f"• Sagalee Cufuu: {'🔴 Eeyyee' if muted else '🟢 Lakki'}\n"
            f"• Beeksisa Yeroo Xumuraa: {'🟢 Hojjechaa Jira' if deadlines else '🔴 Dhaamameera'}\n"
            f"• Beeksisa Hojii: {'🟢 Hojjechaa Jira' if jobs else '🔴 Dhaamameera'}\n"
            f"• Quusannaa Daataa: {'🟢 Hojjechaa Jira' if bandwidth else '🔴 Dhaamameera'}\n\n"
            f"Jijjiiruuf kanneen fayyadamaa:\n/mute - Sagalee cufuuf\n/unmute - Sagalee banuuf\n/lite - Quusannaa daataa jijjiiruuf"
        ),
        "ti": (
            f"⚙️ **ቅጥዕታት መተሓሳሰቢ**\n\n"
            f"• ድምጺ ምዕጻው: {'🔴 እወ' if muted else '🟢 ኣይኮነን'}\n"
            f"• ናይ ዕለት መተሓሳሰቢ: {'🟢 ይሰርሕ ኣሎ' if deadlines else '🔴 ጠፊኡ'}\n"
            f"• ናይ ስራሕ መተሓሳሰቢ: {'🟢 ይሰርሕ ኣሎ' if jobs else '🔴 ጠፊኡ'}\n"
            f"• ውሑድ ዳታ: {'🟢 ይሰርሕ ኣሎ' if bandwidth else '🔴 ጠፊኡ'}\n\n"
            f"ንምቕያር ተጠቐሙ:\n/mute - ድምጺ ንምዕጻው\n/unmute - ድምጺ ንምኽፋት\n/lite - ቍጠባ ዳታ ንምቕያር"
        ),
        "ar": (
            f"⚙️ **إعدادات الإشعارات**\n\n"
            f"• كتم الصوت: {'🔴 نعم' if muted else '🟢 لا'}\n"
            f"• إشعارات المواعيد النهائية: {'🟢 مفعلة' if deadlines else '🔴 معطلة'}\n"
            f"• إشعارات الوظائف: {'🟢 مفعلة' if jobs else '🔴 معطلة'}\n"
            f"• وضع توفير البيانات: {'🟢 مفعل' if bandwidth else '🔴 معطل'}\n\n"
            f"للتحكم بالإعدادات:\n/mute - لكتم الإشعارات\n/unmute - لإلغاء كتم الإشعارات\n/lite - لتبديل وضع توفير البيانات"
        ),
        "en": (
            f"⚙️ **Notification Settings**\n\n"
            f"• Muted: {'🔴 Yes' if muted else '🟢 No'}\n"
            f"• Deadlines Alert: {'🟢 Active' if deadlines else '🔴 Off'}\n"
            f"• Job Alerts: {'🟢 Active' if jobs else '🔴 Off'}\n"
            f"• Low Bandwidth: {'🟢 Active' if bandwidth else '🔴 Off'}\n\n"
            f"Commands to toggle:\n/mute - Mute alerts\n/unmute - Unmute alerts\n/lite - Toggle low bandwidth"
        ),
    }
    await send_safe_message(message, settings_msgs.get(lang, settings_msgs["en"]))


@router.message(Command("mute"))
async def handle_mute(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    await call_api(
        "PUT",
        f"/api/v1/notification-settings?learner_ref={state['learner_ref']}",
        {"muted": True},
    )
    mute_msgs = {
        "am": "🔕 ማሳወቂያዎች ድምጽ አልባ ሆነዋል።",
        "om": "🔕 Beeksisawwan sagalee dhabaniiru.",
        "ti": "🔕 መተሓሳሰቢታት ድምጺ ተዓጽዩ ኣሎ።",
        "ar": "🔕 تم كتم صوت الإشعارات.",
        "en": "🔕 Notifications muted.",
    }
    await send_safe_message(message, mute_msgs.get(lang, mute_msgs["en"]))


@router.message(Command("unmute"))
async def handle_unmute(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    await call_api(
        "PUT",
        f"/api/v1/notification-settings?learner_ref={state['learner_ref']}",
        {"muted": False},
    )
    unmute_msgs = {
        "am": "🔔 ማሳወቂያዎች ተከፍተዋል።",
        "om": "🔔 Beeksisawwan banamaniiru.",
        "ti": "🔔 መተሓሳሰቢታት ተኸፊቱ ኣሎ።",
        "ar": "🔔 تم تفعيل صوت الإشعارات.",
        "en": "🔔 Notifications unmuted.",
    }
    await send_safe_message(message, unmute_msgs.get(lang, unmute_msgs["en"]))


@router.message(F.text.in_({"1", "2", "3"}))
async def handle_numeric_reply(message: types.Message) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")
    choice = message.text.strip()

    if choice == "1":
        noted_msgs = {
            "am": (
                "👍 **ተመዝግቧል!**\n"
                "የሥራ ማመልከቻ መረጃ: https://jobs.example.org/apply\n"
                "የመስተንግዶ ጥያቄ ረቂቅ ለማዘጋጀት: /accommodations"
            ),
            "om": (
                "👍 **Galmaa'eera!**\n"
                "Odeeffannoo iyyannoo: https://jobs.example.org/apply\n"
                "Wixinee mijaawinaaf: /accommodations"
            ),
            "ti": (
                "👍 **ተመዝጊቡ ኣሎ!**\n"
                "ሓበሬታ ምምልካት ስራሕ: https://jobs.example.org/apply\n"
                "ንድፊ ጠለብ መስተንግዶ ንምድላው: /accommodations"
            ),
            "ar": (
                "👍 **تم تسجيل اهتمامك بنجاح!**\n"
                "رابط التقديم: https://jobs.example.org/apply\n"
                "لصياغة طلب تسهيلات المقابلة: /accommodations"
            ),
            "en": (
                "👍 **Noted!**\n"
                "Application link: https://jobs.example.org/apply\n"
                "Draft interview accommodation: /accommodations"
            ),
        }
        await send_safe_message(message, noted_msgs.get(lang, noted_msgs["en"]))
    elif choice == "2":
        state["last_context"] = "Learner requested a human callback from job alert option 2."
        await handle_handoff(message)
    elif choice == "3":
        question = "Explain this job, its responsibilities, and accommodations."
        res = await call_api(
            "POST",
            "/ask",
            {"question": question, "language": lang, "channel": "telegram"},
        )
        if res and "answer" in res:
            exp_header = {
                "am": "💼 **የሥራው ማብራሪያ:**\n\n",
                "om": "💼 **Ibsa Hojichaa:**\n\n",
                "ti": "💼 **መብርሂ ስራሕ:**\n\n",
                "ar": "💼 **شرح الوظيفة:**\n\n",
                "en": "💼 **Job Explanation:**\n\n",
            }
            await send_safe_message(
                message,
                f"{exp_header.get(lang, exp_header['en'])}{res['answer']}",
            )
        else:
            fallback = {
                "am": "ሥራው የደንበኞች አገልግሎት ድጋፍን ያካትታል።",
                "om": "Hojiin kun tajaajila deeggarsa maamiltootaa of keessatti qabata.",
                "ti": "እዚ ስራሕ ናይ ዓማዊል ደገፍ ዝሓቆፈ እዩ።",
                "ar": "تتضمن هذه الوظيفة دعم وخدمة العملاء.",
                "en": "The job involves customer support and care.",
            }
            await send_safe_message(message, fallback.get(lang, fallback["en"]))


@router.message(F.voice)
async def handle_voice_message(message: types.Message, bot: Bot) -> None:
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    wait_voice = {
        "am": "🎧 ድምጽዎን በማዳመጥ ላይ...",
        "om": "🎧 Sagalee keessan dhaggeeffachaa jira...",
        "ti": "🎧 ድምጽኹም እናተሰምዐ እዩ...",
        "ar": "🎧 جاري الاستماع إلى رسالتك الصوتية ومعالجتها...",
        "en": "🎧 Processing your voice note...",
    }
    await send_safe_message(message, wait_voice.get(lang, wait_voice["en"]))

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
            "language": lang,
            "retain": False,
        },
    )
    transcript = (
        transcribe_res.get("transcript", "Please explain Module 2.")
        if transcribe_res
        else "Please explain Module 2."
    )
    if transcribe_res and transcribe_res.get("language_confidence", 0) >= 0.82:
        lang = transcribe_res.get("detected_language", lang)
        state["language"] = lang

    trans_labels = {
        "am": f"📝 **የድምጽ ግልባጭ:**\n_{transcript}_",
        "om": f"📝 **Barreeffama Sagalee:**\n_{transcript}_",
        "ti": f"📝 **ቅዳሕ ድምጺ:**\n_{transcript}_",
        "ar": f"📝 **النص المفرغ من الصوت:**\n_{transcript}_",
        "en": f"📝 **Voice Transcript:**\n_{transcript}_",
    }
    await send_safe_message(message, trans_labels.get(lang, trans_labels["en"]))

    ask_res = await call_api(
        "POST",
        "/ask",
        {
            "question": transcript,
            "language": lang,
            "simple_mode": state["lite_mode"],
            "channel": "telegram",
        },
    )
    if not ask_res:
        no_ans = {
            "am": "⚠️ መልስ ማግኘት አልተቻለም።",
            "om": "⚠️ Deebii argachuun hin danda'amne.",
            "ti": "⚠️ መልሲ ምርካብ ኣይተኻእለን።",
            "ar": "⚠️ تعذر الحصول على إجابة حالياً.",
            "en": "⚠️ Could not retrieve answer.",
        }
        await send_safe_message(message, no_ans.get(lang, no_ans["en"]))
        return

    if ask_res.get("language_changed") and ask_res.get("language"):
        lang = ask_res["language"]
        state["language"] = lang

    answer_text = ask_res.get("answer", "")
    citations = ask_res.get("citations", [])

    ans_header = {
        "am": ("💡 **መልስ:**\n\n", "📚 **ዋቢዎች:**", "ገጽ"),
        "om": ("💡 **Deebii:**\n\n", "📚 **Wabiiwwan:**", "Fuula"),
        "ti": ("💡 **መልሲ:**\n\n", "📚 **መወከሲታት:**", "ገጽ"),
        "ar": ("💡 **الإجابة:**\n\n", "📚 **المراجع والمصادر:**", "صفحة"),
        "en": ("💡 **Answer:**\n\n", "📚 **Citations:**", "Page"),
    }
    ans_lbl, cit_lbl, page_lbl = ans_header.get(lang, ans_header["en"])
    formatted = f"{ans_lbl}{answer_text}"
    if citations:
        formatted += f"\n\n{cit_lbl}"
        for c in citations:
            formatted += f"\n• [{c['heading']}]({c['url']}) ({page_lbl} {c.get('page', 1)})"

    await send_safe_message(message, formatted)

    if not state["lite_mode"]:
        synth_res = await call_api(
            "POST",
            "/speech/synthesize",
            {"text": answer_text[:200], "language": lang, "speed": 1.0},
        )
        if synth_res and "audio_url" in synth_res:
            audio_lbl = {
                "am": "🔊 የድምጽ መልስ:",
                "om": "🔊 Deebii sagalee:",
                "ti": "🔊 ናይ ድምጺ መልሲ:",
                "ar": "🔊 إعادة التشغيل الصوتي:",
                "en": "🔊 Audio replay:",
            }
            await send_safe_message(
                message,
                f"{audio_lbl.get(lang, audio_lbl['en'])} {synth_res['audio_url']}",
            )


@router.message(F.text)
async def handle_text_question(message: types.Message) -> None:
    text = message.text.strip()
    user_id = message.from_user.id if message.from_user else 0
    state = get_user_state(user_id)
    lang = state.get("language", "en")

    if text.startswith("/"):
        return

    state["last_context"] = f"Learner asked: {text}"

    res = await call_api(
        "POST",
        "/api/v1/ask",
        {
            "question": text,
            "language": lang,
            "simple_mode": state["lite_mode"],
            "channel": "telegram",
        },
    )
    if not res:
        res = await call_api(
            "POST",
            "/ask",
            {
                "question": text,
                "language": lang,
                "simple_mode": state["lite_mode"],
                "channel": "telegram",
            },
        )
    if not res:
        err_msg = {
            "am": "አገልግሎቱ ለጊዜው አልተገኘም። እባክዎ ትንሽ ቆይተው እንደገና ይሞክሩ።",
            "om": "Tajaajilli yeroof hin jiru. Mee xiqqoo booda irra deebi'aa yaalaa.",
            "ti": "ኣገልግሎት ንግዚኡ ኣይርከብን። በጃኹም ድሓር ደጊምኩም ፈትኑ።",
            "ar": "الخدمة غير متوفرة مؤقتاً. يرجى المحاولة لاحقاً.",
            "en": "Assistant is temporarily unavailable. Please try again later.",
        }
        await send_safe_message(message, err_msg.get(lang, err_msg["en"]))
        return

    if res.get("language_changed") and res.get("language"):
        lang = res["language"]
        state["language"] = lang

    answer_text = res.get("answer", "")
    citations = res.get("citations", [])
    offer_human = res.get("offer_human", False)

    reply_msg = f"{answer_text}"
    if citations:
        cit_labels = {
            "am": ("\n\n**ዋቢዎች:**", "ገጽ"),
            "om": ("\n\n**Wabiiwwan:**", "Fuula"),
            "ti": ("\n\n**መወከሲታት:**", "ገጽ"),
            "ar": ("\n\n**المراجع:**", "صفحة"),
            "en": ("\n\n**Citations:**", "Page"),
        }
        cit_hdr, page_str = cit_labels.get(lang, cit_labels["en"])
        reply_msg += cit_hdr
        for c in citations:
            reply_msg += f"\n• [{c['heading']}]({c['url']}) ({page_str} {c.get('page', 1)})"

    reply_markup = None
    if offer_human:
        btn_labels = {
            "am": "ከሰው ጋር ተገናኝ",
            "om": "Nama Waliin Dubbadhu",
            "ti": "ምስ ሰብ ተራኸብ",
            "ar": "التحدث مع شخص",
            "en": "Talk to a person",
        }
        reply_markup = InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text=btn_labels.get(lang, btn_labels["en"]), callback_data="call_handoff"
                    )
                ]
            ]
        )

    await send_safe_message(message, reply_msg, reply_markup=reply_markup)


@router.callback_query(F.data == "call_handoff")
async def handle_inline_handoff(callback: types.CallbackQuery) -> None:
    await handle_handoff(callback.message)
    await callback.answer()


_dp: Dispatcher | None = None

def get_dispatcher() -> Dispatcher:
    global _dp
    if _dp is None:
        _dp = Dispatcher()
        _dp.include_router(router)
    return _dp


async def setup_bot_commands(bot: Bot) -> None:
    commands = [
        BotCommand(command="start", description="Start assistant & choose language"),
        BotCommand(command="help", description="View all available commands and help"),
        BotCommand(command="handoff", description="Talk to a human mentor / get live help"),
        BotCommand(command="deadlines", description="View upcoming course deadlines"),
        BotCommand(command="modules", description="Browse syllabus and course modules"),
        BotCommand(command="jobs", description="Explore inclusive job opportunities"),
        BotCommand(command="accommodations", description="Draft interview accommodation request"),
        BotCommand(command="lite", description="Toggle low-bandwidth Lite Mode"),
        BotCommand(command="settings", description="Manage notifications & preferences"),
    ]
    try:
        await bot.set_my_commands(commands)
        logger.info("Bot commands successfully registered with Telegram.")
    except Exception as e:
        logger.warning("Could not set bot commands: %s", e)


async def start_bot() -> None:
    if not BOT_TOKEN:
        logger.warning("No TELEGRAM_BOT_TOKEN provided. Telegram bot polling is idle.")
        return

    dp = get_dispatcher()
    bot = Bot(token=BOT_TOKEN)
    logger.info("Starting Telegram bot polling...")
    try:
        await setup_bot_commands(bot)
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(start_bot())
