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

            assert message.answer.called
            answer_text = message.answer.call_args[0][0]
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

