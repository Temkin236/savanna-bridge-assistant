"""Tests for Telegram bot handlers and workflow logic (Milestones C-M1, C-M2, C-M3)."""

import importlib.util
from pathlib import Path

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
