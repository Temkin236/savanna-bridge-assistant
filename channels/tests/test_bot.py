"""Tests for Telegram bot handlers and workflow logic (Milestones C-M1, C-M2, C-M3)."""

import asyncio
import importlib.util
from pathlib import Path
from unittest.mock import AsyncMock, patch

BOT_FILE = Path(__file__).resolve().parents[1] / "bot" / "bot.py"
spec = importlib.util.spec_from_file_location("telegram_bot", BOT_FILE)
telegram_bot = importlib.util.module_from_spec(spec)
spec.loader.exec_module(telegram_bot)

get_user_state = telegram_bot.get_user_state
make_main_keyboard = telegram_bot.make_main_keyboard
make_language_inline = telegram_bot.make_language_inline
make_notification_inline = telegram_bot.make_notification_inline


def test_user_session_defaults() -> None:
    state = get_user_state(99901)
    assert state["language"] == "am"
    assert state["lite_mode"] is False
    assert state["learner_ref"] == "tg_99901"


def test_make_main_keyboard_amharic_and_english() -> None:
    kb_am = make_main_keyboard(lang="am", lite=False)
    button_texts_am = [btn.text for row in kb_am.keyboard for btn in row]
    assert "❓ ጥያቄ ጠይቅ" in button_texts_am
    assert "👥 ከሰው ጋር ተገናኝ" in button_texts_am
    assert "📅 ምን ይጠበቃል?" in button_texts_am

    kb_en = make_main_keyboard(lang="en", lite=False)
    button_texts_en = [btn.text for row in kb_en.keyboard for btn in row]
    assert "❓ Ask a Question" in button_texts_en
    assert "👥 Talk to a Person" in button_texts_en
    assert "📅 Deadlines" in button_texts_en


def test_make_main_keyboard_lite_mode_numeric() -> None:
    kb_lite = make_main_keyboard(lite=True)
    button_texts = [btn.text for row in kb_lite.keyboard for btn in row]
    assert "1" in button_texts
    assert "2" in button_texts
    assert "3" in button_texts
    assert "/lite" in button_texts


def test_language_inline_keyboard_options() -> None:
    inline = make_language_inline()
    data_list = [btn.callback_data for row in inline.inline_keyboard for btn in row]
    assert "lang_am" in data_list
    assert "lang_en" in data_list
    assert "lang_om" in data_list
    assert "lang_ti" in data_list


def test_handle_start_valid_token() -> None:
    async def _test() -> None:
        telegram_bot.BOT_API_SECRET = "test-secret"
        message = AsyncMock()
        message.text = "/start valid_token_123"
        message.from_user.id = 99902
        message.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api_raw", new=AsyncMock()) as mock_call:
            mock_call.return_value = (200, {"linked": True, "learner_ref": "learner_abc"})
            await telegram_bot.handle_start(message)

            mock_call.assert_called_once()
            args, kwargs = mock_call.call_args
            assert args[0] == "POST"
            assert args[1] == "/api/v1/link/confirm"
            assert args[2]["token"] == "valid_token_123"
            assert args[2]["telegram_chat_id"] == "99902"
            headers = kwargs.get("headers", {})
            assert "X-Bot-Secret" in headers

            assert message.answer.call_count == 2
            answer_text = message.answer.call_args_list[0].args[0]
            consent_text = message.answer.call_args_list[1].args[0]
            assert "this platform" in consent_text.lower()
            consent_markup = message.answer.call_args_list[1].kwargs["reply_markup"]
            callbacks = [
                button.callback_data
                for row in consent_markup.inline_keyboard
                for button in row
            ]
            assert callbacks == ["notify_consent_yes", "notify_consent_no"]
            assert "ተገናኝቷል" in answer_text or "Connected" in answer_text

    asyncio.run(_test())


def test_handle_start_expired_token() -> None:
    async def _test() -> None:
        message = AsyncMock()
        message.text = "/start expired_token_456"
        message.from_user.id = 99903
        message.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api_raw", new=AsyncMock()) as mock_call:
            mock_call.return_value = (410, {"detail": "Token has expired. Please generate a new link."})
            await telegram_bot.handle_start(message)

            assert message.answer.called
            answer_text = message.answer.call_args[0][0]
            assert "ጊዜው አልፏል" in answer_text or "expired" in answer_text

    asyncio.run(_test())


def test_handle_start_reused_token() -> None:
    async def _test() -> None:
        message = AsyncMock()
        message.text = "/start reused_token_789"
        message.from_user.id = 99904
        message.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api_raw", new=AsyncMock()) as mock_call:
            mock_call.return_value = (410, {"detail": "Token has already been used."})
            await telegram_bot.handle_start(message)

            assert message.answer.called
            answer_text = message.answer.call_args[0][0]
            assert "ጊዜው አልፏል" in answer_text or "expired" in answer_text

    asyncio.run(_test())


def test_handle_plain_text_question_no_emoji() -> None:
    async def _test() -> None:
        message = AsyncMock()
        message.text = "What is customer service?"
        message.from_user.id = 99905
        message.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api", new=AsyncMock()) as mock_call:
            mock_call.return_value = {
                "answer": "Customer service is the support provided to customers.",
                "citations": [{"heading": "Customer Service Basics", "url": "https://example.com/cs", "page": 1}],
                "offer_human": True,
            }
            await telegram_bot.handle_text_question(message)

            assert message.answer.called
            answer_text = message.answer.call_args[0][0]
            assert "Customer service is the support" in answer_text
            assert "Customer Service Basics" in answer_text
            # Assert no emojis present in the text response
            assert "📚" not in answer_text
            assert "💡" not in answer_text
            assert "❓" not in answer_text

    asyncio.run(_test())


def test_make_notification_inline_structure() -> None:
    prefs = {"deadlines": True, "job_alerts": False, "new_lessons": True}
    kb_en = make_notification_inline(prefs, lang="en")
    buttons_en = [btn for row in kb_en.inline_keyboard for btn in row]
    callbacks = [btn.callback_data for btn in buttons_en]
    assert "notif_toggle_deadlines" in callbacks
    assert "notif_toggle_jobs" in callbacks
    assert "notif_toggle_lessons" in callbacks
    assert "notif_enable_all" in callbacks
    assert "notif_done" in callbacks

    deadlines_btn = next(btn for btn in buttons_en if btn.callback_data == "notif_toggle_deadlines")
    jobs_btn = next(btn for btn in buttons_en if btn.callback_data == "notif_toggle_jobs")
    assert "🟢" in deadlines_btn.text
    assert "🔴" in jobs_btn.text

    kb_am = make_notification_inline(prefs, lang="am")
    buttons_am = [btn.text for row in kb_am.inline_keyboard for btn in row]
    assert any("የጊዜ ገደቦች" in t for t in buttons_am)
    assert any("የሥራ ማሳወቂያዎች" in t for t in buttons_am)


def test_handle_start_platform_aware_notifications() -> None:
    async def _test() -> None:
        message = AsyncMock()
        message.text = "/start token_portal_xyz"
        message.from_user.id = 99910
        message.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api_raw", new=AsyncMock()) as mock_call:
            mock_call.return_value = (
                200,
                {
                    "linked": True,
                    "learner_ref": "learner_portal_user",
                    "platform_title": "Ethiopian Tech Jobs",
                    "platform_type": "jobs",
                    "course_id": "job_board",
                },
            )
            await telegram_bot.handle_start(message)

            assert message.answer.called
            answer_text = message.answer.call_args[0][0]
            assert "Ethiopian Tech Jobs" in answer_text
            assert "ተገናኝቷል" in answer_text or "Connected" in answer_text
            assert "የማሳወቂያ ምርጫዎች" in answer_text or "Notification Preferences" in answer_text

            markup = message.answer.call_args[1].get("reply_markup")
            assert markup is not None
            callbacks = [btn.callback_data for row in markup.inline_keyboard for btn in row]
            assert "notif_toggle_jobs" in callbacks
            assert "notif_done" in callbacks

            state = get_user_state(99910)
            assert state["platform_title"] == "Ethiopian Tech Jobs"
            assert state["platform_type"] == "jobs"

    asyncio.run(_test())


def test_handle_notif_toggle_and_done() -> None:
    async def _test() -> None:
        user_id = 99911
        state = get_user_state(user_id)
        state["language"] = "en"
        state["notification_prefs"] = {"deadlines": True, "job_alerts": True, "new_lessons": True}

        callback = AsyncMock()
        callback.from_user.id = user_id
        callback.data = "notif_toggle_jobs"
        callback.message = AsyncMock()
        callback.message.edit_reply_markup = AsyncMock()
        callback.answer = AsyncMock()

        with patch.object(telegram_bot, "call_api", new=AsyncMock()) as mock_api:
            # 1. Toggle jobs off
            await telegram_bot.handle_notif_toggle(callback)
            assert state["notification_prefs"]["job_alerts"] is False
            mock_api.assert_called_with("PUT", f"/notification-settings?learner_ref=tg_{user_id}", state["notification_prefs"])
            assert callback.message.edit_reply_markup.called

            # 2. Enable all
            callback.data = "notif_enable_all"
            await telegram_bot.handle_notif_enable_all(callback)
            assert state["notification_prefs"]["job_alerts"] is True
            assert state["notification_prefs"]["deadlines"] is True
            assert state["notification_prefs"]["new_lessons"] is True

            # 3. Done
            callback.data = "notif_done"
            await telegram_bot.handle_notif_done(callback)
            assert callback.message.answer.called
            done_text = callback.message.answer.call_args[0][0]
            assert "preferences" in done_text.lower() or "ምርጫዎች" in done_text

    asyncio.run(_test())


def test_handle_settings_with_notification_inline() -> None:
    async def _test() -> None:
        message = AsyncMock()
        message.text = "/settings"
        message.from_user.id = 99912
        message.answer = AsyncMock()

        state = get_user_state(99912)
        state["platform_title"] = "Addis Career Portal"

        with patch.object(telegram_bot, "call_api", new=AsyncMock()) as mock_api:
            mock_api.return_value = {
                "deadlines": True,
                "job_alerts": False,
                "new_lessons": True,
                "muted": False,
                "low_bandwidth": True,
            }
            await telegram_bot.handle_settings(message)

            assert message.answer.called
            text = message.answer.call_args[0][0]
            assert "Addis Career Portal" in text
            markup = message.answer.call_args[1].get("reply_markup")
            assert markup is not None
            callbacks = [btn.callback_data for row in markup.inline_keyboard for btn in row]
            assert "notif_toggle_jobs" in callbacks

    asyncio.run(_test())

