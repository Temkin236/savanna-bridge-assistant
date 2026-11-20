/**
 * Savanna Bridge Assistant (<bridge-assistant> & <db-assistant>)
 * Multilingual, accessible learning and live voice assistant web component.
 *
 * Implements:
 * 1. Multilingual Voice Assistant:
 *    - Voice activation: saying "Help" (or "እርዳታ", "gargaarsa", "مساعدة") opens & listens.
 *    - Existing launcher button remains fully visible and functional with clear hint.
 *    - Voice-to-Text: captures speech, auto-detects language, transcribes in native script
 *      (Ethiopic for Amharic, Latin for Oromo & English, Arabic script with RTL for Arabic).
 *    - Transcription preview in chat input: learner reviews/edits before pressing Send.
 *    - Text-to-Speech: automatically reads grounded answers aloud in natural matching voice,
 *      filtering citations and metadata. Stop, replay, and auto-read toggle controls.
 *    - Visual status: clear indicators for Listening (pulse dot), Processing (spinner),
 *      and Speaking (sound wave animation).
 *    - Accessibility: Web Audio earcons (rising/falling chimes), aria-live announcements,
 *      keyboard shortcuts (Alt+Shift+V / Alt+Shift+A).
 * 2. Universal Integration:
 *    - Custom elements: <bridge-assistant> and <db-assistant>.
 *    - Accepts both plain attributes (lang, api, content) and data-* attributes.
 *    - Works on any site (blank page, LMS, or external portal).
 * 3. Complete Existing Features:
 *    - Telegram linking with deep link & polling.
 *    - Human handoff escalation room.
 *    - Settings dialog: text size, high contrast, simple mode, private accommodations.
 *    - Offline queue with auto-sync.
 */

export type SupportedLanguage = "am" | "en" | "om" | "ti" | "ar";

export interface Citation {
  title: string;
  heading: string;
  page?: number;
  url: string;
}

export interface ChatMessage {
  id: string;
  sender: "learner" | "assistant";
  text: string;
  spoken?: string;
  heading?: string;
  citations?: Citation[];
  offerHuman?: boolean;
  isRefusal?: boolean;
  isHandoff?: boolean;
  roomUrl?: string;
  originalQuestion?: string;
  audioUrl?: string;
  isAudioPlaying?: boolean;
  isAudioPaused?: boolean;
  isReadingPage?: boolean;
}

export interface SupportNeedsData {
  needs: string[];
  other_text: string;
  preferred_contact_mode: "text" | "voice" | "video" | "telegram";
}

export interface AccessibilityPreferences {
  language: SupportedLanguage;
  voice_enabled: boolean;
  auto_welcome: boolean;
  auto_tts: boolean;
  speech_rate: number;
  voice_input_enabled: boolean;
  screen_reader_mode: boolean;
  keyboard_navigation: boolean;
  high_contrast: boolean;
  large_text: "smaller" | "normal" | "larger";
  simple_mode: boolean;
  sync_enabled: boolean;
  onboarded: boolean;
}

interface PageControlDescriptor {
  id: string;
  label: string;
  role: string;
}

interface PageActionPlan {
  action: "read_page" | "read_section" | "list_controls" | "focus_control" |
    "activate_control" | "fill_control" | "submit" | "stop_reading" | "repeat" | "none";
  target?: string | null;
  value?: string | null;
  spoken_confirmation: string;
  requires_confirmation: boolean;
  confidence: number;
  language: SupportedLanguage;
}

export const ICONS = {
  launcher: `<svg class="icon-inline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="7.2" r="1.5" fill="currentColor"></circle><path d="M5.5 10.5h13"></path><path d="M12 10.5v4"></path><path d="M12 14.5l-2.8 5"></path><path d="M12 14.5l2.8 5"></path></svg>`,
  accessibility: `<svg class="icon-inline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="7.2" r="1.5" fill="currentColor"></circle><path d="M5.5 10.5h13"></path><path d="M12 10.5v4"></path><path d="M12 14.5l-2.8 5"></path><path d="M12 14.5l2.8 5"></path></svg>`,
  chat: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  settings: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  close: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  mic: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  send: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
  user: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  users: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  video: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
  copy: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  check: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  trash: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  key: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-3 3L8 9 5 12l3 3 4.5-4.5"></path><circle cx="7.5" cy="16.5" r="4.5"></circle></svg>`,
  listen: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  pause: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
  stop: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>`,
  replay: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`,
  volume: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  lightbulb: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>`,
  book: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  arrowRight: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  spinner: `<svg class="icon-inline spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`,
  celebrate: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  telegram: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
  sliders: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>`,
  heart: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  link: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
  headphones: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
  type: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
  contrast: `<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg>`,
  sound: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  volumeMute: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,
  play: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  lock: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  speed: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  sync: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>`,
  sparkles: `<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
};

const I18N: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: "Savanna Bridge Assistant",
    appSubtitle: "Ask questions, adjust support, or connect with a mentor",
    closeLabel: "Close dialog",
    launcherLabel: "Accessibility & Assistant",
    wakeHint: "Tap or press Alt+Shift+A to open",
    settingsLabel: "Settings",
    settingsTitle: "Assistant Settings",
    closeSettings: "Done",
    textSizeLabel: "Text Size",
    textSmaller: "Smaller",
    textNormal: "Normal",
    textLarger: "Larger",
    highContrastLabel: "High Contrast",
    simpleModeLabel: "Simple mode",
    simpleModeDesc: "Explain answers in shorter, simpler sentences",
    autoReadSpeechLabel: "Read responses aloud automatically",
    autoReadSpeechDesc: "Assistant will speak answers when they arrive",
    supportNeedsTitle: "Support Preferences",
    supportZeroProof: "No medical documentation or proof required. All preferences are private.",
    needExtraTime: "Extra response time for tests and questions",
    needScreenReader: "Screen reader friendly materials and alt text",
    needWritten: "Written questions and instructions",
    needOther: "Other support needs",
    otherPlaceholder: "Describe any other accommodations...",
    contactModeLabel: "Preferred contact mode for live help:",
    modeText: "Text chat",
    modeVoice: "Voice call",
    modeVideo: "Video call",
    modeTelegram: "Telegram message",
    saveSupportBtn: "Save Preferences",
    supportSavedNotice: "Preferences saved privately.",
    emptyWelcome: "Welcome! Ask any question about your course.",
    suggestedTitle: "Suggested questions:",
    suggestedQ1: "What does Module 2 teach?",
    suggestedQ2: "Explain customer service foundations",
    suggestedQ3: "How do I communicate with customers?",
    inputPlaceholder: "Ask a question about this course...",
    sendButton: "Send",
    micLabel: "Microphone (voice input)",
    recordingState: "Listening... speak now",
    transcribingState: "Processing speech...",
    voicePreviewNotice: "Voice transcribed. You can edit the text before sending.",
    micError: "Microphone unavailable. Please check microphone permissions or type your question.",
    lookingInCourse: "Looking in the course...",
    answerHeading: "Answer",
    listenButton: "Listen",
    readFullAnswer: "Read the full answer",
    pauseButton: "Pause",
    stopButton: "Stop",
    replayButton: "Replay",
    makeSimplerButton: "Make simpler",
    sourcesTitle: "Course sources:",
    talkToPersonButton: "Talk to a person",
    continueOnTelegram: "Continue on Telegram",
    continueOnTelegramAria: "Continue on Telegram (opens Telegram)",
    telegramPrivacyNotice: "The bot will ask before enabling deadline, lesson, or job notifications.",
    telegramConnected: "Telegram connected",
    connectedToTelegram: "Connected to Telegram",
    disconnectTelegram: "Disconnect",
    tryAnotherQuestion: "Try another question",
    notVerifiedNotice: "I cannot verify this from the course materials. A human mentor can help you directly.",
    offlineBanner: "You are offline.",
    savedOnPhoneNotice: "Saved on this phone. It will send when you are online.",
    serverErrorNotice: "Could not connect to the assistant. Please check your connection and try again.",
    handoffReadyTitle: "Your Live Help Room is Ready",
    joinRoomButton: "Join Live Help Room ↗",
    leaveRoomButton: "Close Help Session",
    androidFallbackNote: "Android note: Browser screen sharing (getDisplayMedia) is not supported in Chrome on Android. Your mentor automatically sees your active lesson URL, section, and focused element.",
    voiceListening: "Listening... Speak now",
    voiceProcessing: "Processing speech...",
    voiceSpeaking: "Reading response aloud...",
    stopAudio: "Stop",
    chatTab: "Chat",
    generalTab: "Display & Audio",
    supportTab: "Support Needs",
    linkTab: "Link Account",
    handoffTab: "Live Help",
    clearChatBtn: "Clear conversation",
    generateCodeBtn: "Generate 6-digit code",
    yourCodeIs: "Your 6-digit code:",
    enterCodeLabel: "Enter 6-digit code from Telegram:",
    submitCodeBtn: "Link with Code",
    codePlaceholder: "e.g. 123456",
    codeLinkSuccess: "Account successfully linked!",
    codeLinkError: "Invalid or expired code. Please try again.",
    haveCodePrompt: "Have a Telegram link code?",
    hideCodePrompt: "Hide code entry",
    codeInstructions: "Send this 6-digit code to the Telegram bot with: /confirm <code>",
    handoffConsentCheck: "I consent to connect with a human mentor",
    handoffReasonLabel: "What do you need help with? (optional)",
    handoffReasonPlaceholder: "e.g., I need help with Module 2 exercise...",
    requestMentorBtn: "Request Human Mentor",
    copyRoomBtn: "Copy Link",
    linkCodeCopied: "Link copied to clipboard!",
    voiceAccessibilityLabel: "Voice Accessibility",
    voiceAccessibilityDesc: "Spoken welcome, read-aloud responses, and voice navigation",
    autoWelcomeLabel: "Spoken Welcome Announcement",
    autoWelcomeDesc: "Announce assistant status when the page opens",
    autoTtsLabel: "Read AI Responses Aloud",
    autoTtsDesc: "Automatically speak responses as they arrive",
    speechRateLabel: "Speech Rate",
    voiceInputLabel: "Voice Input (Microphone)",
    screenReaderModeLabel: "Screen-Reader Optimized",
    screenReaderModeDesc: "Enhanced ARIA labels and live region announcements",
    keyboardNavLabel: "Enhanced Keyboard Focus",
    keyboardNavDesc: "High-visibility focus outlines and navigation hints",
    syncPrefsLabel: "Sync Across Integrated Sites",
    syncPrefsDesc: "Securely restore these preferences when you visit other learning portals",
    readPageBtn: "Read Page Aloud",
    readSectionBtn: "Read Active Section",
    pauseReading: "Pause Reading",
    resumeReading: "Resume Reading",
    stopReading: "Stop Reading",
    readingPageAnnouncement: "Reading page content aloud...",
    readingSectionAnnouncement: "Reading active section aloud...",
    testVoiceBtn: "Test Voice",
    testingVoiceMsg: "Hello! Voice accessibility is active and configured in English.",
    voiceNotAvailable: "Voice speech synthesis for this language is not installed in your browser. Text and screen-reader assistance remain fully active.",
    oneTapVoiceActivation: "Voice assistance is available. Tap to listen to spoken welcome.",
    voiceWelcomeAnnouncement: "Welcome to Savanna Bridge Assistant. Voice accessibility is enabled. You can ask questions or ask to read the page.",
    onboardingTitle: "Welcome to Savanna Bridge",
    onboardingSubtitle: "Configure your accessibility and voice preferences once, use everywhere.",
    onboardingLangPrompt: "Choose your preferred language:",
    onboardingVoiceQuestion: "Would you like spoken audio and voice assistance?",
    onboardingVoiceEnable: "Enable Voice Accessibility",
    onboardingVoiceDesc: "Spoken welcome, read-aloud responses, and voice navigation",
    onboardingMicExplain: "Privacy notice: The microphone is only active when you tap the mic button. We never capture background audio.",
    onboardingSave: "Save & Start",
    onboardingSkip: "Skip for now",
    onboardingReplay: "Setup Tour / Onboarding",
    spokenSetup: "Start spoken setup",
    voiceTab: "Voice & Audio",
    pageContextBadge: "Current Lesson:",
    explainLessonBtn: "Explain this lesson",
    summarizePageBtn: "Summarize this page",
    readingAloudHeading: "Reading page aloud",
    speakingIndicator: "Speaking...",
    listeningIndicator: "Listening...",
    wakeWordSetting: "Voice activation (Wake word 'Help')",
    wakeWordDesc: "Say 'Help' to automatically open assistant and start speaking",
    navigatedToNotice: "Navigated to new lesson:",
    followupTitle: "Follow-up questions:",
    followupQ1: "Explain with examples",
    followupQ2: "What to know before next lesson?",
    followupQ3: "Quiz me on this topic",
  },
  am: {
    appTitle: "የሳቫና ብሪጅ ረዳት",
    appSubtitle: "ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",
    closeLabel: "መስኮቱን ዝጋ",
    launcherLabel: "ተደራሽነት እና ረዳት",
    wakeHint: "ይንኩ ወይም Alt+Shift+A ን ይጫኑ",
    settingsLabel: "ቅንብሮች",
    settingsTitle: "የረዳት ቅንብሮች",
    closeSettings: "ጨርስ",
    textSizeLabel: "የጽሑፍ መጠን",
    textSmaller: "አነስተኛ",
    textNormal: "መደበኛ",
    textLarger: "ትልቅ",
    highContrastLabel: "ከፍተኛ ንፅፅር",
    simpleModeLabel: "ቀላል ማብራሪያ",
    simpleModeDesc: "መልሶችን በአጫጭርና በቀላል ዓረፍተ ነገሮች አስረዳኝ",
    autoReadSpeechLabel: "መልሶችን በድምጽ በራስ-ሰር አንብብ",
    autoReadSpeechDesc: "መልሶች እንደደረሱ ረዳቱ በድምጽ ያነበዋል",
    supportNeedsTitle: "የግል የድጋፍ ፍላጎቶች",
    supportZeroProof: "ምንም ዓይነት የህክምና ማስረጃ ወይም ማረጋገጫ አያስፈልግም።",
    needExtraTime: "ለፈተናዎች እና ጥያቄዎች ተጨማሪ ጊዜ",
    needScreenReader: "ለስክሪን አንባቢ ምቹ የሆነ አቀራረብ",
    needWritten: "የጽሑፍ ጥያቄዎች እና መመሪያዎች",
    needOther: "ሌሎች የድጋፍ ፍላጎቶች",
    otherPlaceholder: "የሚፈልጉትን ተጨማሪ ድጋፍ ይግለጹ...",
    contactModeLabel: "የቀጥታ ድጋፍ የሚፈልጉበት መንገድ፡",
    modeText: "የጽሑፍ መልእክት",
    modeVoice: "የድምጽ ጥሪ",
    modeVideo: "የቪዲዮ ጥሪ",
    modeTelegram: "የቴሌግራም መልእክት",
    saveSupportBtn: "ምርጫዎችን መዝግብ",
    supportSavedNotice: "ምርጫዎችዎ በሚስጥር ተቀምጠዋል።",
    emptyWelcome: "እንኳን ደህና መጡ! ስለ ኮርሱ ማንኛውንም ጥያቄ ይጠይቁ።",
    suggestedTitle: "የተጠቆሙ ጥያቄዎች፡",
    suggestedQ1: "ሞጁል 2 ምን ያስተምራል?",
    suggestedQ2: "የደንበኞች አገልግሎት መሰረቶችን አስረዳኝ",
    suggestedQ3: "ከደንበኞች ጋር እንዴት መገናኘት እችላለሁ?",
    inputPlaceholder: "ስለዚህ ኮርስ ጥያቄ ይጠይቁ...",
    sendButton: "ላክ",
    micLabel: "ማይክሮፎን (የድምጽ ግብዓት)",
    recordingState: "እያዳመጥኩ ነው... አሁን ይናገሩ",
    transcribingState: "ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",
    voicePreviewNotice: "ድምጽዎ ወደ ጽሑፍ ተቀይሯል። ከመላክዎ በፊት ማስተካከል ይችላሉ።",
    micError: "ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",
    lookingInCourse: "በኮርሱ ውስጥ በመፈለግ ላይ...",
    answerHeading: "መልስ",
    listenButton: "አዳምጥ",
    readFullAnswer: "ሙሉውን መልስ አዳምጥ",
    pauseButton: "አቁም",
    stopButton: "አቁም",
    replayButton: "ደግመህ አጫውት",
    makeSimplerButton: "ቀለል አድርግ",
    sourcesTitle: "የኮርስ ምንጮች፡",
    talkToPersonButton: "ከሰው ጋር ተነጋገር",
    continueOnTelegram: "በቴሌግራም ቀጥል",
    continueOnTelegramAria: "በቴሌግራም ቀጥል (ቴሌግራምን ይከፍታል)",
    telegramPrivacyNotice: "ቦቱ የጊዜ ገደብ፣ የትምህርት ወይም የሥራ ማሳወቂያዎችን ከማብራቱ በፊት ፈቃድ ይጠይቃል።",
    telegramConnected: "ቴሌግራም ተገናኝቷል",
    connectedToTelegram: "ከቴሌግራም ጋር ተገናኝቷል",
    disconnectTelegram: "ግንኙነት አቋርጥ",
    tryAnotherQuestion: "ሌላ ጥያቄ ሞክር",
    notVerifiedNotice: "ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። የሰው አማካሪ በቀጥታ ሊረዳዎት ይችላል።",
    offlineBanner: "ከመስመር ውጭ ነዎት።",
    savedOnPhoneNotice: "በዚህ ስልክ ላይ ተቀምጧል። መስመር ላይ ሲሆኑ ይላካል።",
    serverErrorNotice: "ከአገልጋዩ ጋር መገናኘት አልተቻለም። እባክዎ ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",
    handoffReadyTitle: "የቀጥታ ድጋፍ ክፍልዎ ዝግጁ ነው",
    joinRoomButton: "ወደ ስብሰባው ክፍል ግባ ↗",
    leaveRoomButton: "ክፍለ-ጊዜውን ዝጋ",
    androidFallbackNote: "የአንድሮይድ ማሳሰቢያ፡ በአንድሮይድ ክሮም ላይ የስክሪን ማጋራት አይደገፍም። አማካሪዎ እርስዎ ያሉበትን የትምህርት ገጽ እና ርዕስ በቀጥታ ይመለከታል።",
    voiceListening: "እያዳመጥኩ ነው... አሁን ይናገሩ",
    voiceProcessing: "ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",
    voiceSpeaking: "ረዳቱ መልሱን እያነበበ ነው...",
    stopAudio: "አቁም",
    chatTab: "ውይይት",
    generalTab: "እይታ እና ድምጽ",
    supportTab: "የድጋፍ ፍላጎቶች",
    linkTab: "መለያ አገናኝ",
    handoffTab: "የቀጥታ ድጋፍ",
    clearChatBtn: "ውይይቱን አጽዳ",
    generateCodeBtn: "ባለ 6 አሃዝ ኮድ ፍጠር",
    yourCodeIs: "የእርስዎ ባለ 6 አሃዝ ኮድ፡",
    enterCodeLabel: "ከቴሌግራም የተገኘውን ባለ 6 አሃዝ ኮድ ያስገቡ፡",
    submitCodeBtn: "በኮድ አገናኝ",
    codePlaceholder: "ምሳሌ፡ 123456",
    codeLinkSuccess: "መለያዎ በተሳካ ሁኔታ ተገናኝቷል!",
    codeLinkError: "የተሳሳተ ወይም ጊዜው ያለፈበት ኮድ። እባክዎ እንደገና ይሞክሩ።",
    haveCodePrompt: "የቴሌግራም ማገናኛ ኮድ አለዎት?",
    hideCodePrompt: "የኮድ መግቢያውን ደብቅ",
    codeInstructions: "ይህንን ባለ 6 አሃዝ ኮድ ወደ ቴሌግራም ቦት ይላኩ፡ /confirm <ኮድ>",
    handoffConsentCheck: "ከሰው አማካሪ ጋር ለመገናኘት እስማማለሁ",
    handoffReasonLabel: "በምን ላይ እርዳታ ይፈልጋሉ? (አማራጭ)",
    handoffReasonPlaceholder: "ምሳሌ፡ በሞጁል 2 መልመጃ ላይ እገዛ እፈልጋለሁ...",
    requestMentorBtn: "የሰው አማካሪ ጠይቅ",
    copyRoomBtn: "ሊንኩን ቅዳ",
    linkCodeCopied: "ሊንኩ ተቀድቷል!",
    voiceAccessibilityLabel: "የድምጽ አገልግሎት",
    voiceAccessibilityDesc: "የድምጽ ሰላምታ፣ መልሶችን ጮክ ብሎ ማንበብ፣ እና የድምጽ ዳሰሳ",
    autoWelcomeLabel: "ገጹ ሲከፈት የድምጽ ሰላምታ ይስጡ",
    autoWelcomeDesc: "ገጹ እንደተከፈተ ረዳቱ ዝግጁ መሆኑን በድምጽ ያስታውቃል",
    autoTtsLabel: "የአይአይ መልሶችን በድምጽ አንብብ",
    autoTtsDesc: "መልሶች ሲደርሱ ወዲያውኑ በድምጽ ያነባል",
    speechRateLabel: "የንግግር ፍጥነት",
    voiceInputLabel: "የድምጽ ግብዓት (ማይክሮፎን)",
    screenReaderModeLabel: "ለስክሪን አንባቢ ምቹ ሁነታ",
    screenReaderModeDesc: "የተሻሻለ የአሪያ ማብራሪያዎች እና ማስታወቂያዎች",
    keyboardNavLabel: "የተሻሻለ የኪቦርድ ትኩረት",
    keyboardNavDesc: "ግልጽ የትኩረት መስመሮች እና የዳሰሳ ጠቋሚዎች",
    syncPrefsLabel: "በሁሉም ድረ-ገጾች ላይ ምርጫዎችን አመሳስል",
    syncPrefsDesc: "ወደ ሌሎች የትምህርት ገጾች ሲሄዱ እነዚህን ምርጫዎች በራስ-ሰር ያግኙ",
    readPageBtn: "ገጹን በድምጽ አንብብ",
    readSectionBtn: "ወቅታዊውን ክፍል አንብብ",
    pauseReading: "ማንበብ አቁም",
    resumeReading: "ማንበብ ቀጥል",
    stopReading: "ማንበብ ጨርስ",
    readingPageAnnouncement: "የገጹን ይዘት በድምጽ እያነበበ ነው...",
    readingSectionAnnouncement: "ወቅታዊውን ክፍል በድምጽ እያነበበ ነው...",
    testVoiceBtn: "ድምጽን ፈትሽ",
    testingVoiceMsg: "ሰላም! የድምጽ አገልግሎት በአማርኛ ቋንቋ በትክክል እየሰራ ነው።",
    voiceNotAvailable: "ለዚህ ቋንቋ የድምጽ ንባብ በብራውዘርዎ ውስጥ አልተገኘም። የጽሑፍ እና የስክሪን አንባቢ አገልግሎት ሙሉ በሙሉ ይሰራል።",
    oneTapVoiceActivation: "የድምጽ አገልግሎት ዝግጁ ነው። የድምጽ ሰላምታውን ለማዳመጥ እዚህ ይጫኑ።",
    voiceWelcomeAnnouncement: "እንኳን ወደ ሳቫና ብሪጅ ረዳት በደህና መጡ። የድምጽ አገልግሎት በርቷል። ጥያቄዎችን መጠየቅ ወይም ገጹን እንዲያነብልዎ ማድረግ ይችላሉ።",
    onboardingTitle: "እንኳን ወደ ሳቫና ብሪጅ በደህና መጡ",
    onboardingSubtitle: "የእርስዎን የድምጽ እና የአጠቃቀም ምርጫዎች አንድ ጊዜ ያስተካክሉ፣ በሁሉም ቦታ ይጠቀሙ።",
    onboardingLangPrompt: "የሚመርጡትን ቋንቋ ይምረጡ፡",
    onboardingVoiceQuestion: "የድምጽ ድጋፍ እና ንባብ ይፈልጋሉ?",
    onboardingVoiceEnable: "የድምጽ አገልግሎትን አብራ",
    onboardingVoiceDesc: "የድምጽ ሰላምታ፣ መልሶችን ጮክ ብሎ ማንበብ፣ እና የድምጽ ዳሰሳ",
    onboardingMicExplain: "የግላዊነት ማሳሰቢያ፡ ማይክሮፎኑ የሚሰራው እርስዎ የማይክ ቁልፉን ሲጫኑ ብቻ ነው። ከበስተጀርባ ድምጽ አንቀዳም።",
    onboardingSave: "መዝግብና ጀምር",
    onboardingSkip: "ለጊዜው እለፈው",
    onboardingReplay: "የመጀመሪያ ቅንብር መመሪያ",
    spokenSetup: "የድምጽ ቅንብርን ጀምር",
    voiceTab: "ድምጽ እና ማዳመጥ",
    pageContextBadge: "ወቅታዊ ትምህርት፡",
    explainLessonBtn: "ይህንን ትምህርት አስረዳኝ",
    summarizePageBtn: "ይህንን ገጽ አጠቃልል",
    readingAloudHeading: "ገጹን ጮክ ብሎ በማንበብ ላይ",
    speakingIndicator: "እየተናገረ ነው...",
    listeningIndicator: "እያዳመጠ ነው...",
    wakeWordSetting: "የድምጽ ማግበር (የማንቂያ ቃል 'እርዳታ' / 'Help')",
    wakeWordDesc: "ረዳቱን በራስ-ሰር ለመክፈትና ለማናገር 'እርዳታ' ወይም 'Help' ይበሉ",
    navigatedToNotice: "ወደ አዲስ ትምህርት ገጽ ተቀይሯል፡",
    followupTitle: "ተከታይ ጥያቄዎች፡",
    followupQ1: "በምሳሌዎች አስረዳኝ",
    followupQ2: "ወደ ቀጣዩ ትምህርት ከመሄዴ በፊት ምን ልወቅ?",
    followupQ3: "ግንዛቤዬን ፈትነኝ",
  },
  om: {
    appTitle: "Gargaaraa Savanna Bridge",
    appSubtitle: "Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",
    closeLabel: "Cufi",
    launcherLabel: "Qaqqabummaa & Deeggarsa",
    wakeHint: "Tuqaa ykn Alt+Shift+A dhiibaa",
    settingsLabel: "Qindaa'ina",
    settingsTitle: "Qindaa'ina Gargaaraa",
    closeSettings: "Xumuri",
    textSizeLabel: "Hamma Barruu",
    textSmaller: "Xiqqaa",
    textNormal: "Idilee",
    textLarger: "Guddaa",
    highContrastLabel: "Waliin-dhaabbii Olaanaa",
    simpleModeLabel: "Ibsa salphaa",
    simpleModeDesc: "Himoota gaggabaaboo fi salphaadhaan ibsi",
    autoReadSpeechLabel: "Deebii ofumaan sagaleedhaan dubbisi",
    autoReadSpeechDesc: "Deebiin akkuma dhufeen gargaaraan sagaleedhaan dubbisa",
    supportNeedsTitle: "Filannoo Deeggarsaa",
    supportZeroProof: "Waraqaan yaalaa hin barbaachisu. Filannoon keessan dhuunfaadha.",
    needExtraTime: "Qorumsaaf yeroo dabalataa",
    needScreenReader: "Dubbisaa iskiriiniif kan mijate",
    needWritten: "Qajeelfama barruudhaan",
    needOther: "Deeggarsa biraa",
    otherPlaceholder: "Ibsaa...",
    contactModeLabel: "Mala qunnamtii filattan:",
    modeText: "Barruu",
    modeVoice: "Sagalee",
    modeVideo: "Viidiyoo",
    modeTelegram: "Telegiraamii",
    saveSupportBtn: "Galmeessi",
    supportSavedNotice: "Filannoon keessan galmaa'eera.",
    emptyWelcome: "Baga nagaan dhuftan! Gaaffii kamiyyuu gaafadhaa.",
    suggestedTitle: "Gaaffiiwwan filataman:",
    suggestedQ1: "Kutaan 2 maal barsiisa?",
    suggestedQ2: "Bu'uuraalee tajaajila maamiltootaa ibsi",
    suggestedQ3: "Maamiltoota waliin akkamittan qunnama?",
    inputPlaceholder: "Waa'ee barnoota kanaa gaafadhaa...",
    sendButton: "Ergi",
    micLabel: "Maaykirofoonii",
    recordingState: "Dhaggeeffachaa jira... dubbadhaa",
    transcribingState: "Sagalee jijjiiraa jira...",
    voicePreviewNotice: "Sagaleen gara barruutti jijjiirameera. Ergisaa dura sirreessuu dandeessu.",
    micError: "Maaykirofooniin hin argamne.",
    lookingInCourse: "Barnoota keessaa barbaadaa jira...",
    answerHeading: "Deebii",
    listenButton: "Dhaggeeffadhu",
    readFullAnswer: "Deebii guutuu dhaggeeffadhu",
    pauseButton: "Dhaabi",
    stopButton: "Dhaabi",
    replayButton: "Irra deebi'ii taphachiisi",
    makeSimplerButton: "Salphisi",
    sourcesTitle: "Madda barnootaa:",
    talkToPersonButton: "Nama waliin dubbadhu",
    continueOnTelegram: "Telegiraamiin Itti fufi",
    continueOnTelegramAria: "Telegiraamiin Itti fufi (Telegiraamii bana)",
    telegramPrivacyNotice: "Botiin beeksisa yeroo, barnoota ykn hojii banuu dura hayyama gaafata.",
    telegramConnected: "Telegiraam walqabateera",
    connectedToTelegram: "Telegiraamii waliin walqabateera",
    disconnectTelegram: "Gargar Baasi",
    tryAnotherQuestion: "Gaaffii biraa yaali",
    notVerifiedNotice: "Barnoota keessaa mirkaneessuu hin dandeenye.",
    offlineBanner: "Toora irraa ala jirtu.",
    savedOnPhoneNotice: "Bilbila kana irratti kuufameera. Toora irratti yemmuu dhuftan ergama.",
    serverErrorNotice: "Gargaaraa waliin walqunnamuu hin dandeenye.",
    handoffReadyTitle: "Kutaan gargaarsaa qophiidha",
    joinRoomButton: "Kutaa Seenaa ↗",
    leaveRoomButton: "Kutaa Dhiisaa",
    androidFallbackNote: "Iskiriinii qooduun Android irratti hin danda'amu.",
    voiceListening: "Dhaggeeffachaa jira... Amma dubbadhaa",
    voiceProcessing: "Sagalee gara barruutti jijjiiraa jira...",
    voiceSpeaking: "Gargaaraan deebii dubbisaa jira...",
    stopAudio: "Dhaabi",
    chatTab: "Haasaa",
    generalTab: "Mul'ina",
    supportTab: "Deeggarsa",
    linkTab: "Herrega Walqabsiisi",
    handoffTab: "Gargaarsa Kallattii",
    clearChatBtn: "Haquu",
    generateCodeBtn: "Koodii uumi",
    yourCodeIs: "Koodii keessan:",
    enterCodeLabel: "Koodii dijiitii 6 Telegiraamii irraa galchaa:",
    submitCodeBtn: "Koodiin walqunnamsiisi",
    codePlaceholder: "fkn: 123456",
    codeLinkSuccess: "Herregni milkaa'inaan walqabateera!",
    codeLinkError: "Koodiin dogoggora ykn yeroon isaa darbeera. Mee irra deebi'aa yaalaa.",
    haveCodePrompt: "Koodii walqunnamsiisaa qabduu?",
    hideCodePrompt: "Koodii galchuu dhoksi",
    codeInstructions: "Koodii dijiitii 6 kana boottii Telegiraamiitti ergaa: /confirm <koodii>",
    handoffConsentCheck: "Gorsaa waliin walqunnamuuf walii galeera",
    handoffReasonLabel: "Waan gargaarsa barbaaddan:",
    handoffReasonPlaceholder: "fkn: Kutaa 2ffaa...",
    requestMentorBtn: "Gorsaa Gaafadhaa",
    copyRoomBtn: "Waraabi",
    linkCodeCopied: "Waraabameera!",
    voiceAccessibilityLabel: "Tajaajila Sagalee",
    voiceAccessibilityDesc: "Nagaa gaafachuu sagalee, deebii dubbisuu, fi sagaleen deemsisa",
    autoWelcomeLabel: "Banaamuu irratti nagaa sagaleen",
    autoWelcomeDesc: "Fuulli yemmuu banamu gargaaraan qophaa'uu isaa sagaleen beeksisa",
    autoTtsLabel: "Deebii AI sagaleen dubbisi",
    autoTtsDesc: "Deebiin yemmuu dhufu battalumatti sagaleen dubbisa",
    speechRateLabel: "Saffisa Dubbisuu",
    voiceInputLabel: "Galtee Sagalee (Maaykirofoonii)",
    screenReaderModeLabel: "Dubbisaa Iskiriiniif kan Mijate",
    screenReaderModeDesc: "Ibsa fi beeksisa ARIA fooyya'aa",
    keyboardNavLabel: "Xiyyeeffannoo Kiibordii Fooyya'aa",
    keyboardNavDesc: "Sarara xiyyeeffannoo ifa ta'e",
    syncPrefsLabel: "Marsariitiiwwan hundatti Qindaa'ina Walsimsiisi",
    syncPrefsDesc: "Marsariitiiwwan barnootaa biroo yemmuu daawwattan qindaa'ina kana argadhaa",
    readPageBtn: "Fuula Sagaleen Dubbisi",
    readSectionBtn: "Kutaa Ammaa Dubbisi",
    pauseReading: "Dhaabi",
    resumeReading: "Itti Fufi",
    stopReading: "Xumuri",
    readingPageAnnouncement: "Qabiyyee fuulaa sagaleen dubbisaa jira...",
    readingSectionAnnouncement: "Kutaa jiru sagaleen dubbisaa jira...",
    testVoiceBtn: "Sagalee Qori",
    testingVoiceMsg: "Akkam! Tajaajilli sagalee Afaan Oromootiin hojjetaa jira.",
    voiceNotAvailable: "Sagaleen dubbisuu Afaan Oromoo biraawzarii keessan keessatti hin argamne. Tajaajilli barruu fi dubbisaa iskiriinii guutuu dha.",
    oneTapVoiceActivation: "Tajaajilli sagalee qophiidha. Nagaa dhaggeeffachuuf as tuqaa.",
    voiceWelcomeAnnouncement: "Baga nagaan gara Gargaaraa Savanna Bridge dhuftan. Tajaajilli sagalee hojjetaa jira. Gaaffii gaafachuu ykn fuula akka dubbisu gochuu dandeessu.",
    onboardingTitle: "Baga Nagaan Gara Savanna Bridge Dhuftan",
    onboardingSubtitle: "Filannoo keessan al tokko qindeessaa, iddoo hundatti itti fayyadamaa.",
    onboardingLangPrompt: "Afaan filattan filadhaa:",
    onboardingVoiceQuestion: "Deeggarsa sagalee fi dubbisuu barbaadduu?",
    onboardingVoiceEnable: "Tajaajila Sagalee Bani",
    onboardingVoiceDesc: "Nagaa sagalee, deebii dubbisuu, fi sagaleen deemsisa",
    onboardingMicExplain: "Eegumsa dhuunfaa: Maaykirofooniin kan hojjetu yemmuu isin cuqaastan qofa. Sagalee duubaa hin waraabnu.",
    onboardingSave: "Galmeessi & Jalqabi",
    onboardingSkip: "Ammaaf darbi",
    onboardingReplay: "Daawwannaa Qindaa'inaa",
    spokenSetup: "Qindaa'ina sagalee jalqabi",
    voiceTab: "Sagalee & Dhaggeeffannaa",
    pageContextBadge: "Kutaa Barnootaa Ammaa:",
    explainLessonBtn: "Barnoota kana naaf ibsi",
    summarizePageBtn: "Fuula kana naaf gabaabsi",
    readingAloudHeading: "Fuula kana sagaleedhaan dubbisaa jira",
    speakingIndicator: "Dubbataa jira...",
    listeningIndicator: "Dhaggeeffachaa jira...",
    wakeWordSetting: "Sagaleen kakaasuu (Jechama 'Gargaarsa' / 'Help')",
    wakeWordDesc: "Gargaaraa ofumaan banuuf 'Gargaarsa' ykn 'Help' jedhaa",
    navigatedToNotice: "Gara barnoota haaraatti jijjiirameera:",
    followupTitle: "Gaaffilee itti aanan:",
    followupQ1: "Fakkeenyotaan naaf ibsi",
    followupQ2: "Barnoota itti aanuuf maal beekuun qaba?",
    followupQ3: "Hubannoo koo na qori",
  },
  ti: {
    appTitle: "ናይ ሳቫና ብሪጅ ሓጋዚ",
    appSubtitle: "ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",
    closeLabel: "ዕጾ",
    launcherLabel: "ተበጻሕነት & ሓጋዚ",
    wakeHint: "ንከፉ ወይ Alt+Shift+A ጸቕጡ",
    settingsLabel: "ቅጥዕታት",
    settingsTitle: "ናይ ሓጋዚ ቅጥዕታት",
    closeSettings: "ወዲአ",
    textSizeLabel: "መጠን ጽሑፍ",
    textSmaller: "ንእሽቶ",
    textNormal: "ስሩዕ",
    textLarger: "ዓቢ",
    highContrastLabel: "ላዕለዋይ ንጽጽር",
    simpleModeLabel: "ቀሊል መብርሂ",
    simpleModeDesc: "ብሓጸርቲ ሓረጋት ኣረድኣኒ",
    autoReadSpeechLabel: "መልስታት ብድምጺ ብቐጥታ ኣንብብ",
    autoReadSpeechDesc: "መልሲ ምስ መጸ ብድምጺ ይንበብ",
    supportNeedsTitle: "ናይ ውልቂ ሓገዝ ምርጫታት",
    supportZeroProof: "ሕክምናዊ መርትዖ ኣየድልን እዩ። ምርጫታትኩም ምስጢራዊ እዩ።",
    needExtraTime: "ተወሳኺ ግዜ ንፈተናታት",
    needScreenReader: "ንስክሪን ኣንባቢ ምቹእ",
    needWritten: "ናይ ጽሑፍ መምርሒታት",
    needOther: "ካልእ ድሌታት",
    otherPlaceholder: "ግለጹ...",
    contactModeLabel: "ትመርጽዎ ናይ ርክብ መገዲ፡",
    modeText: "ጽሑፍ",
    modeVoice: "ድምጺ",
    modeVideo: "ቪድዮ",
    modeTelegram: "ቴሌግራም",
    saveSupportBtn: "ኣቐምጥ",
    supportSavedNotice: "ምርጫታትኩም ተቐሚጡ ኣሎ።",
    emptyWelcome: "እንቋዕ ብደሓን መጻእኩም! ዝኾነ ሕቶ ሕተቱ።",
    suggestedTitle: "ዝተመርጹ ሕቶታት፡",
    suggestedQ1: "ሞጁል 2 እንታይ ይምህር?",
    suggestedQ2: "መሰረታት ኣገልግሎት ዓማዊል ኣብርሃለይ",
    suggestedQ3: "ምስ ዓማዊል ብኸመይ ይራኸብ?",
    inputPlaceholder: "ብዛዕባዚ ኮርስ ሕቶ ሕተቱ...",
    sendButton: "ስደድ",
    micLabel: "ማይክሮፎን",
    recordingState: "ይሰምዕ ኣለኹ... ሕጂ ተዛረቡ",
    transcribingState: "ናብ ጽሑፍ ይቕየር ኣሎ...",
    voicePreviewNotice: "ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ።",
    micError: "ማይክሮፎን ክርከብ ኣይተኻእለን።",
    lookingInCourse: "ኣብ ኮርስ ይድለ ኣሎ...",
    answerHeading: "መልሲ",
    listenButton: "ስማዕ",
    readFullAnswer: "ሙሉእ መልሲ ስማዕ",
    pauseButton: "ኣዕርፍ",
    stopButton: "ኣቁም",
    replayButton: "ደጊምካ ኣጻውት",
    makeSimplerButton: "ቀሊል ግበሮ",
    sourcesTitle: "ምንጭታት ኮርስ፡",
    talkToPersonButton: "ምስ ሰብ ተዛረብ",
    continueOnTelegram: "ብቴሌግራም ቀጽል",
    continueOnTelegramAria: "ብቴሌግራም ቀጽል (ቴሌግራም ይኸፍት)",
    telegramPrivacyNotice: "ቦት ናይ ዕለት፣ ትምህርቲ ወይ ስራሕ መተሓሳሰቢ ቅድሚ ምኽፋቱ ፍቓድ ይሓትት።",
    telegramConnected: "ቴሌግራም ተላጊቡ ኣሎ",
    connectedToTelegram: "ምስ ቴሌግራም ተላጊቡ ኣሎ",
    disconnectTelegram: "ግንኙነት ኣቋርጽ",
    tryAnotherQuestion: "ካልእ ሕቶ ፈትን",
    notVerifiedNotice: "እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን።",
    offlineBanner: "መስመር ተቛሪጹ ኣሎ።",
    savedOnPhoneNotice: "ኣብዚ ስልኪ ተቐሚጡ ኣሎ። ኦንላይን ምስ ኮንኩም ክስደድ እዩ።",
    serverErrorNotice: "ምስ ሓጋዚ ክራኸብ ኣይተኻእለን።",
    handoffReadyTitle: "ናይ ሓገዝ ክፍሊ ድሉው እዩ",
    joinRoomButton: "ናብ ክፍሊ እቶ ↗",
    leaveRoomButton: "ክፍሊ ዕጾ",
    androidFallbackNote: "ኣብ አንድሮይድ ስክሪን ምክፋል ኣይድገፍን።",
    voiceListening: "ይሰምዕ ኣለኹ... ሕጂ ተዛረቡ",
    voiceProcessing: "ናብ ጽሑፍ ይቕየር ኣሎ...",
    voiceSpeaking: "ሓጋዚ መልሲ የንብብ ኣሎ...",
    stopAudio: "ኣቁም",
    chatTab: "ዕላል",
    generalTab: "ምርኣይ",
    supportTab: "ሓገዝ",
    linkTab: "ሕሳብ ኣላግብ",
    handoffTab: "ቀጥታዊ ሓገዝ",
    clearChatBtn: "ኣጽርዮ",
    generateCodeBtn: "ኮድ ፍጠር",
    yourCodeIs: "ናይ ስድሽተ ኣሃዝ ኮድኩም፡",
    enterCodeLabel: "ካብ ቴሌግራም ዝረኸብክምዎ ናይ 6 ኣሃዝ ኮድ የእትዉ፡",
    submitCodeBtn: "ብኮድ ኣላግብ",
    codePlaceholder: "ኣብነት፡ 123456",
    codeLinkSuccess: "ኣካውንትኩም ብዓወት ተላጊቡ ኣሎ!",
    codeLinkError: "ዘይትክክል ወይ ዝሓለፎ ኮድ። በጃኹም ደጊምኩም ፈትኑ።",
    haveCodePrompt: "ናይ ቴሌግራም መላገቢ ኮድ ኣለኩም ድዩ?",
    hideCodePrompt: "መእተዊ ኮድ ሕባእ",
    codeInstructions: "ነዚ ናይ 6 ኣሃዝ ኮድ ናብ ቴሌግራም ቦት ስደድዎ፡ /confirm <ኮድ>",
    handoffConsentCheck: "ምስ መካሪ ንምርኻብ ተሰማሚዐ ኣለኹ",
    handoffReasonLabel: "እንታይ ሓገዝ የድልየኩም?",
    handoffReasonPlaceholder: "ንኣብነት፡ ኣብ ሞጁል 2...",
    requestMentorBtn: "ናይ ሰብ ሓገዝ ሕተት",
    copyRoomBtn: "ቅዳሕ",
    linkCodeCopied: "ተቐዲሑ ኣሎ!",
    voiceAccessibilityLabel: "ናይ ድምጺ ኣገልግሎት",
    voiceAccessibilityDesc: "ናይ ድምጺ ሰላምታ፡ መልስታት ዓው ኢልካ ምንባብ፡ ናይ ድምጺ ምንቅስቓስ",
    autoWelcomeLabel: "ገጽ ክኽፈት ከሎ ብድምጺ ሰላምታ ሃብ",
    autoWelcomeDesc: "ገጽ ምስ ተኸፍተ ሓጋዚ ድሉው ምዃኑ ብድምጺ ይሕብር",
    autoTtsLabel: "መልስታት ብድምጺ ኣንብብ",
    autoTtsDesc: "መልስታት ምስ መጹ ብኡንብኡ ብድምጺ የንብብ",
    speechRateLabel: "ናይ ድምጺ ፍጥነት",
    voiceInputLabel: "ናይ ድምጺ ምእታዊ (ማይክሮፎን)",
    screenReaderModeLabel: "ንስክሪን ኣንባቢ ዝተመዓራረየ",
    screenReaderModeDesc: "ዝተመሓየሸ ናይ ARIA መብርሂታትን መተሓሳሰብታትን",
    keyboardNavLabel: "ዝተመሓየሸ ናይ ኪቦርድ ትኹረት",
    keyboardNavDesc: "ግሉጽ ናይ ትኹረት መስመራት",
    syncPrefsLabel: "ኣብ ኩሎም መርበባት ሓበሬታ ኣመሳስል",
    syncPrefsDesc: "ናብ ካልኦት ናይ ትምህርቲ መርበባት ክትከዱ ከለኹም ነዚ ምርጫታት ርኸቡ",
    readPageBtn: "ገጽ ብድምጺ ኣንብብ",
    readSectionBtn: "ዘለኹሞ ክፍሊ ኣንብብ",
    pauseReading: "ኣዕርፍ",
    resumeReading: "ቀጽል",
    stopReading: "ወድእ",
    readingPageAnnouncement: "ትሕዝቶ ገጽ ብድምጺ የንብብ ኣሎ...",
    readingSectionAnnouncement: "ክፍሊ ብድምጺ የንብብ ኣሎ...",
    testVoiceBtn: "ድምጺ ፈትን",
    testingVoiceMsg: "ሰላም! ናይ ድምጺ ኣገልግሎት ብትግርኛ ይሰርሕ ኣሎ።",
    voiceNotAvailable: "ናይዚ ቋንቋ ናይ ድምጺ ምንባብ ኣብዚ ብራውዘር ኣይተረኽበን። ናይ ጽሑፍን ስክሪን ኣንባብን ኣገልግሎት ሙሉእ ብሙሉእ ይሰርሕ።",
    oneTapVoiceActivation: "ናይ ድምጺ ኣገልግሎት ድሉው እዩ። ንምስማዕ ኣብዚ ጠውቑ።",
    voiceWelcomeAnnouncement: "እንቋዕ ናብ ሳቫና ብሪጅ ረዳኢ ብደሓን መጻእኩም። ናይ ድምጺ ኣገልግሎት ነቒሑ ኣሎ። ሕቶታት ክትሓቱ ወይ ገጽ ከነብበልኩም ክትሓቱ ትኽእሉ።",
    onboardingTitle: "እንቋዕ ናብ ሳቫና ብሪጅ ብደሓን መጻእኩም",
    onboardingSubtitle: "ምርጫታትኩም ሓንሳብ ኣመዓራርዩ፡ ኣብ ኩሉ ተጠቐሙ።",
    onboardingLangPrompt: "ዝመረጽኩምዎ ቋንቋ ምረጹ፡",
    onboardingVoiceQuestion: "ናይ ድምጺ ሓገዝን ምንባብን ትደልዩ ዶ?",
    onboardingVoiceEnable: "ናይ ድምጺ ኣገልግሎት ኣብርህ",
    onboardingVoiceDesc: "ናይ ድምጺ ሰላምታ፡ መልስታት ዓው ኢልካ ምንባብ፡ ናይ ድምጺ ምንቅስቓስ",
    onboardingMicExplain: "ናይ ብሕትውና መተሓሳሰቢ፡ ማይክሮፎን ዝሰርሕ እቲ ምልክት ክትጠውቑ ከለኹም ጥራይ እዩ። ናይ ድሕሪት ድምጺ ኣይንቐድሕን ኢና።",
    onboardingSave: "መዝግብ & ጀምር",
    onboardingSkip: "ንሕጂ ሕለፎ",
    onboardingReplay: "ናይ መጀመርታ መምርሒ",
    spokenSetup: "ናይ ድምጺ ቅጥዒ ጀምር",
    voiceTab: "ድምጽን ምስማዕን",
    pageContextBadge: "ህሉው ትምህርቲ፡",
    explainLessonBtn: "እዚ ትምህርቲ ኣብርሃለይ",
    summarizePageBtn: "እዚ ገጽ ኣጠቃልሎ",
    readingAloudHeading: "ገጽ ብድምጺ ምንባብ",
    speakingIndicator: "ይዛረብ ኣሎ...",
    listeningIndicator: "ይሰምዕ ኣሎ...",
    wakeWordSetting: "ብድምጺ ምኽፋት ('ሓገዝ' / 'Help')",
    wakeWordDesc: "ንሓጋዚ ንምኽፋት 'ሓገዝ' ወይ 'Help' በሉ",
    navigatedToNotice: "ናብ ሓድሽ ትምህርቲ ተቐይሩ፡",
    followupTitle: "ቀጸልቲ ሕቶታት፡",
    followupQ1: "ብኣብነታት ኣረድኣኒ",
    followupQ2: "ናብ ዝቕጽል ትምህርቲ ቅድሚ ምኻደይ እንታይ ክፈልጥ ኣለኒ?",
    followupQ3: "ግንዛበይ ፈትነኒ",
  },
  ar: {
    appTitle: "مساعد سافانا بريدج",
    appSubtitle: "اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",
    closeLabel: "إغلاق النافذة",
    launcherLabel: "إمكانية الوصول والمساعد",
    wakeHint: "انقر أو اضغط Alt+Shift+A للفتح",
    settingsLabel: "الإعدادات",
    settingsTitle: "إعدادات المساعد",
    closeSettings: "تم",
    textSizeLabel: "حجم النص",
    textSmaller: "أصغر",
    textNormal: "عادي",
    textLarger: "أكبر",
    highContrastLabel: "تباين عالٍ",
    simpleModeLabel: "شرح مبسط",
    simpleModeDesc: "اشرح بجمل أقصر وأبسط",
    autoReadSpeechLabel: "قراءة الإجابات تلقائياً بصوت عالٍ",
    autoReadSpeechDesc: "سيقوم المساعد بقراءة الإجابة فور وصولها",
    supportNeedsTitle: "تفضيلات الدعم",
    supportZeroProof: "لا يُطلب أي تشخيص أو وثائق طبية. جميع التفضيلات سرية.",
    needExtraTime: "وقت استجابة إضافي للاختبارات",
    needScreenReader: "مواد متوافقة مع قارئ الشاشة",
    needWritten: "أسئلة وتعليمات مكتوبة",
    needOther: "احتياجات دعم أخرى",
    otherPlaceholder: "حدد أي احتياجات أخرى...",
    contactModeLabel: "طريقة التواصل المفضلة للمساعدة:",
    modeText: "محادثة نصية",
    modeVoice: "مكالمة صوتية",
    modeVideo: "مكالمة فيديو",
    modeTelegram: "رسالة تيليجرام",
    saveSupportBtn: "حفظ التفضيلات",
    supportSavedNotice: "تم حفظ التفضيلات بسرية.",
    emptyWelcome: "مرحباً بك! اطرح أي سؤال حول الدورة التدريبية.",
    suggestedTitle: "أسئلة مقترحة:",
    suggestedQ1: "ماذا نتعلم في الوحدة الثانية؟",
    suggestedQ2: "اشرح أساسيات خدمة العملاء",
    suggestedQ3: "كيف أتواصل بفعالية مع العملاء؟",
    inputPlaceholder: "اطرح سؤالاً حول هذه الدورة...",
    sendButton: "إرسال",
    micLabel: "الميكروفون (إدخال صوتي)",
    recordingState: "جاري الاستماع... تحدث الآن",
    transcribingState: "جاري تحويل الصوت إلى نص...",
    voicePreviewNotice: "تم تحويل الصوت إلى نص. يمكنك تعديله قبل الإرسال.",
    micError: "الميكروفون غير متوفر. يرجى التحقق من أذونات الميكروفون.",
    lookingInCourse: "جاري البحث في محتوى الدورة...",
    answerHeading: "الإجابة",
    listenButton: "استماع",
    readFullAnswer: "قراءة الإجابة كاملة",
    pauseButton: "إيقاف مؤقت",
    stopButton: "إيقاف",
    replayButton: "إعادة التشغيل",
    makeSimplerButton: "تبسيط الشرح",
    sourcesTitle: "مصادر الدورة:",
    talkToPersonButton: "التحدث مع شخص",
    continueOnTelegram: "المتابعة عبر تيليجرام",
    continueOnTelegramAria: "المتابعة عبر تيليجرام (يفتح تيليجرام)",
    telegramPrivacyNotice: "سيطلب البوت موافقتك قبل تفعيل إشعارات المواعيد أو الدروس أو الوظائف.",
    telegramConnected: "تم ربط تيليجرام",
    connectedToTelegram: "متصل عبر تيليجرام",
    disconnectTelegram: "قطع الاتصال",
    tryAnotherQuestion: "جرب سؤالاً آخر",
    notVerifiedNotice: "لا يمكنني التحقق من ذلك من محتوى الدورة. يمكن لمرشد بشري مساعدتك مباشرة.",
    offlineBanner: "أنت غير متصل بالإنترنت.",
    savedOnPhoneNotice: "تم الحفظ على الهاتف. سيتم الإرسال فور اتصالك بالإنترنت.",
    serverErrorNotice: "تعذر الاتصال بالمساعد. يرجى التحقق من اتصالك والمحاولة لاحقاً.",
    handoffReadyTitle: "غرفة المساعدة المباشرة جاهزة",
    joinRoomButton: "الانضمام للغرفة ↗",
    leaveRoomButton: "إغلاق الجلسة",
    androidFallbackNote: "ملاحظة أندرويد: مشاركة الشاشة عبر المتصفح غير مدعومة على متصفح Chrome لنظام أندرويد.",
    voiceListening: "جاري الاستماع... تحدث الآن",
    voiceProcessing: "جاري معالجة الصوت وتحويله إلى نص...",
    voiceSpeaking: "المساعد يقرأ الإجابة بصوت عالٍ...",
    stopAudio: "إيقاف",
    chatTab: "محادثة",
    generalTab: "العرض والصوت",
    supportTab: "احتياجات الدعم",
    linkTab: "ربط الحساب",
    handoffTab: "المساعدة المباشرة",
    clearChatBtn: "مسح المحادثة",
    generateCodeBtn: "توليد رمز مكون من 6 أرقام",
    yourCodeIs: "رمزك المكون من 6 أرقام:",
    enterCodeLabel: "أدخل الرمز المكون من 6 أرقام من تيليجرام:",
    submitCodeBtn: "ربط بالرمز",
    codePlaceholder: "مثال: 123456",
    codeLinkSuccess: "تم ربط الحساب بنجاح!",
    codeLinkError: "رمز غير صالح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.",
    haveCodePrompt: "هل لديك رمز ربط من تيليجرام؟",
    hideCodePrompt: "إخفاء إدخال الرمز",
    codeInstructions: "أرسل هذا الرمز إلى بوت تيليجرام باستخدام: /confirm <الرمز>",
    handoffConsentCheck: "أوافق على التواصل مع مرشد بشري",
    handoffReasonLabel: "ما الذي تحتاج إلى مساعدة فيه؟ (اختياري)",
    handoffReasonPlaceholder: "مثال: أحتاج مساعدة في تمرين الوحدة 2...",
    requestMentorBtn: "طلب مساعدة بشرية",
    copyRoomBtn: "نسخ الرابط",
    linkCodeCopied: "تم نسخ الرابط بنجاح!",
    voiceAccessibilityLabel: "المساعدة الصوتية",
    voiceAccessibilityDesc: "ترحيب صوتي، قراءة الإجابات بصوت عالٍ، وملاحة صوتية",
    autoWelcomeLabel: "ترحيب صوتي تلقائي",
    autoWelcomeDesc: "الإعلان عن جاهزية المساعد عند فتح الصفحة",
    autoTtsLabel: "قراءة إجابات الذكاء الاصطناعي بصوت عالٍ",
    autoTtsDesc: "نطق الإجابات تلقائياً فور وصولها",
    speechRateLabel: "سرعة النطق",
    voiceInputLabel: "الإدخال الصوتي (الميكروفون)",
    screenReaderModeLabel: "محسّن لقارئات الشاشة",
    screenReaderModeDesc: "تسميات وإعلانات ARIA محسّنة ودقيقة",
    keyboardNavLabel: "تنقل محسّن بلوحة المفاتيح",
    keyboardNavDesc: "مؤشرات تركيز واضحة للمفاتيح",
    syncPrefsLabel: "مزامنة التفضيلات عبر جميع المواقع",
    syncPrefsDesc: "استعادة تفضيلاتك تلقائياً عند زيارة منصات تعليمية أخرى",
    readPageBtn: "قراءة الصفحة بصوت عالٍ",
    readSectionBtn: "قراءة القسم الحالي",
    pauseReading: "إيقاف مؤقت",
    resumeReading: "استئناف",
    stopReading: "إيقاف القراءة",
    readingPageAnnouncement: "جاري قراءة محتوى الصفحة بصوت عالٍ...",
    readingSectionAnnouncement: "جاري قراءة القسم الحالي بصوت عالٍ...",
    testVoiceBtn: "اختبار الصوت",
    testingVoiceMsg: "مرحباً! المساعدة الصوتية مفعلة وتعمل باللغة العربية.",
    voiceNotAvailable: "الصوت العربي غير مثبت في متصفحك. المساعدة النصية وتوافق قارئ الشاشة يعملان بشكل كامل.",
    oneTapVoiceActivation: "المساعدة الصوتية متاحة. اضغط هنا للاستماع للترحيب الصوتي.",
    voiceWelcomeAnnouncement: "مرحباً بكم في مساعد سافانا بريدج. تم تفعيل المساعدة الصوتية. يمكنك طرح الأسئلة أو طلب قراءة الصفحة.",
    onboardingTitle: "مرحباً بكم في سافانا بريدج",
    onboardingSubtitle: "اضبط تفضيلات إمكانية الوصول والصوت مرة واحدة، واستخدمها في كل مكان.",
    onboardingLangPrompt: "اختر لغتك المفضلة:",
    onboardingVoiceQuestion: "هل ترغب في تفعيل المساعدة الصوتية ونطق النصوص؟",
    onboardingVoiceEnable: "تفعيل المساعدة الصوتية",
    onboardingVoiceDesc: "ترحيب صوتي، قراءة الإجابات بصوت عالٍ، وملاحة صوتية",
    onboardingMicExplain: "إشعار الخصوصية: الميكروفون يعمل فقط عند الضغط على زر الميكروفون. لا نسجل أي صوت في الخلفية مطلقاً.",
    onboardingSave: "حفظ والبدء",
    onboardingSkip: "تخطي الآن",
    onboardingReplay: "دليل الإعداد الأولي",
    spokenSetup: "بدء الإعداد الصوتي",
    voiceTab: "الصوت والقراءة",
    pageContextBadge: "الدرس الحالي:",
    explainLessonBtn: "اشرح لي هذا الدرس",
    summarizePageBtn: "لخص هذه الصفحة",
    readingAloudHeading: "قراءة محتوى الصفحة بصوت عالٍ",
    speakingIndicator: "جاري التحدث...",
    listeningIndicator: "جاري الاستماع...",
    wakeWordSetting: "التفعيل الصوتي (كلمة التنبيه 'مساعدة' / 'Help')",
    wakeWordDesc: "قل 'مساعدة' أو 'Help' لفتح المساعد تلقائياً والتحدث مباشرة",
    navigatedToNotice: "تم الانتقال إلى درس جديد:",
    followupTitle: "أسئلة متابعة مقترحة:",
    followupQ1: "اشرح بالأمثلة",
    followupQ2: "ماذا يجب أن أفهم قبل الدرس التالي؟",
    followupQ3: "اختبر فهمي لهذا الموضوع",
  },
};

const STYLES = `
  :host {
    --b-font: var(--bs-body-font-family, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Ethiopic", "Noto Sans Arabic", "Nyala", sans-serif);
    --b-bg: var(--bs-body-bg, #ffffff);
    --b-text: var(--bs-body-color, #0f172a);
    --b-text-muted: #475569;
    --b-border: #cbd5e1;
    --b-primary: #b91c1c;
    --b-primary-hover: #991b1b;
    --b-primary-contrast: #ffffff;
    --b-surface: #f8fafc;
    --b-surface-alt: #f1f5f9;
    --b-focus: #2563eb;
    --b-radius: 0.75rem;
    --b-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    font-family: var(--b-font);
    font-size: 1rem;
    line-height: 1.5;
    box-sizing: border-box;
    color: var(--b-text);
  }

  :host([data-size="smaller"]) { font-size: 0.9375rem; }
  :host([data-size="normal"]) { font-size: 1rem; }
  :host([data-size="larger"]) { font-size: 1.25rem; }

  :host([data-contrast="high"]) {
    --b-bg: #ffffff;
    --b-text: #000000;
    --b-text-muted: #111111;
    --b-border: #000000;
    --b-primary: #000080;
    --b-primary-hover: #000050;
    --b-primary-contrast: #ffffff;
    --b-surface: #ffffff;
    --b-surface-alt: #f0f0f0;
    --b-focus: #000000;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  @media (forced-colors: active) {
    :host {
      --b-bg: Canvas;
      --b-text: CanvasText;
      --b-border: ButtonText;
      --b-primary: Highlight;
      --b-primary-hover: Highlight;
      --b-primary-contrast: HighlightText;
      --b-surface: Canvas;
      --b-surface-alt: Canvas;
      --b-focus: Highlight;
    }
    button, input, textarea, select, .btn {
      border: 2px solid ButtonText !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }

  @media (prefers-contrast: more) {
    :host {
      --b-border: #334155;
      --b-focus: #000000;
    }
    .panel, button, input, textarea, select, .btn {
      border-width: 2px;
    }
  }

  /* Touch Targets: fixed CSS-pixel floor, even when the host changes root font size. */
  button, .btn {
    min-height: 44px;
    min-width: 44px;
    padding: 0.5rem 0.75rem;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: 1px solid var(--b-border);
    background: var(--b-surface);
    color: var(--b-text);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    text-decoration: none;
    line-height: 1.2;
  }

  button:hover, .btn:hover {
    background: var(--b-surface-alt);
  }

  button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible, a:focus-visible {
    outline: 3px solid var(--b-focus);
    outline-offset: 2px;
  }

  button, input, textarea, select, a, [tabindex] {
    scroll-margin: 1rem;
  }

  .btn-primary {
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-color: var(--b-primary);
  }
  .btn-primary:hover {
    background: var(--b-primary-hover);
  }

  .btn-secondary {
    background: var(--b-surface-alt);
    color: var(--b-text);
    border-color: var(--b-border);
  }

  /* Floating Launcher Button */
  .launcher {
    position: fixed;
    inset-block-end: 1.25rem;
    inset-inline-end: 1.25rem;
    z-index: 2147483640;
    background: #b91c1c;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 2rem;
    padding: 0.5rem 1.25rem;
    box-shadow: var(--b-shadow);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
  }
  .launcher:hover {
    background: #991b1b;
  }

  /* Nav Tabs */
  .nav-tabs {
    display: flex;
    border-bottom: 1px solid var(--b-border);
    background: var(--b-surface-alt);
    flex-shrink: 0;
    overflow-x: auto;
  }

  .tab-btn {
    flex: 1;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3125rem;
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 0;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.375rem 0.375rem;
    white-space: nowrap;
    color: var(--b-text-muted);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tab-btn:hover {
    background: var(--b-bg-subtle, #f1f5f9);
    color: var(--b-text);
  }

  .tab-btn[aria-selected="true"] {
    border-bottom-color: var(--b-primary);
    color: var(--b-primary);
    background: var(--b-bg);
    font-weight: 700;
  }

  .tab-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 1rem;
    box-sizing: border-box;
    min-height: 0;
  }

  /* Open Panel */
  .panel {
    position: fixed;
    inset: auto 1.25rem 5.5rem auto;
    width: min(52rem, calc(100vw - 2rem));
    height: min(52rem, calc(100vh - 7rem));
    min-width: min(26rem, calc(100vw - 2rem));
    min-height: min(34rem, calc(100vh - 7rem));
    max-height: calc(100vh - 6.5rem);
    display: flex;
    flex-direction: column;
    background: var(--b-bg);
    color: var(--b-text);
    border: 2px solid var(--b-border);
    border-radius: var(--b-radius);
    box-shadow: var(--b-shadow);
    z-index: 2147483640;
    overflow: hidden;
    resize: both;
  }
  .panel[hidden] { display: none !important; }

  /* Header */
  .header {
    padding: 0.625rem 0.75rem 0.5rem;
    border-bottom: 1px solid var(--b-border);
    background: var(--b-surface);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-width: 0;
  }

  .header-titles {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  .header-accessibility-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    border-radius: 50%;
    background: #fef2f2;
    color: #b91c1c;
    flex-shrink: 0;
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25;
    color: var(--b-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-window-controls {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .header-actions {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
  }

  .lang-group {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
    background: var(--b-surface-alt, #f8fafc);
    padding: 0.1875rem;
    border-radius: 0.375rem;
    border: 1px solid var(--b-border, #e2e8f0);
    box-sizing: border-box;
  }

  .lang-toggle-btn {
    flex: 1;
    font-size: 0.75rem;
    padding: 0.35rem 0.25rem;
    min-height: 38px;
    min-width: 44px;
    border: none;
    border-radius: 0.25rem;
    background: transparent;
    color: var(--b-text);
    cursor: pointer;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
  }

  .lang-toggle-btn:hover {
    background: var(--b-border, #e2e8f0);
  }

  .lang-toggle-btn[aria-pressed="true"] {
    background: #b91c1c !important;
    color: #ffffff !important;
    border-color: #b91c1c !important;
    font-weight: 700;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  /* Offline Bar */
  .offline-bar {
    background: #854d0e;
    color: #fef9c3;
    font-size: 0.8125rem;
    padding: 0.375rem 0.75rem;
    text-align: center;
    font-weight: 600;
  }

  /* Dynamic Voice Status Bar (Listening / Processing / Speaking) */
  .voice-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    border-bottom: 1px solid var(--b-border);
    flex-shrink: 0;
  }

  .voice-status-bar.listening {
    background: #fef2f2;
    color: #991b1b;
    border-color: #fecaca;
  }

  .voice-status-bar.processing {
    background: #eff6ff;
    color: #1e40af;
    border-color: #bfdbfe;
  }

  .voice-status-bar.speaking {
    background: #f0fdf4;
    color: #166534;
    border-color: #bbf7d0;
  }

  /* Pulsing red dot for listening */
  .pulse-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    animation: pulse-ring 1.4s infinite;
    display: inline-block;
    flex-shrink: 0;
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 7px rgba(239, 68, 68, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }

  /* Sound bars animation for speaking */
  .sound-bars {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    height: 14px;
    flex-shrink: 0;
  }
  .sound-bars span {
    width: 3px;
    background-color: currentColor;
    border-radius: 1px;
    animation: sound-bounce 1s ease-in-out infinite;
  }
  .sound-bars span:nth-child(1) { height: 6px; animation-delay: 0.1s; }
  .sound-bars span:nth-child(2) { height: 14px; animation-delay: 0.25s; }
  .sound-bars span:nth-child(3) { height: 9px; animation-delay: 0.15s; }

  @keyframes sound-bounce {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
  }

  /* Body / Message List */
  .chat-log {
    flex: 1;
    overflow-y: auto;
    padding: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    background: var(--b-bg);
    min-height: 0;
  }

  .empty-state {
    text-align: center;
    padding: 1.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .suggested-questions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
    text-align: left;
  }

  .btn-suggested {
    text-align: left;
    justify-content: flex-start;
    background: var(--b-surface-alt);
    border-color: var(--b-border);
    font-weight: 500;
    padding: 0.625rem 0.875rem;
    line-height: 1.35;
  }
  .btn-suggested:hover {
    background: var(--b-surface);
    border-color: var(--b-primary);
    color: var(--b-primary);
  }

  /* Message items */
  .msg-row {
    display: flex;
    flex-direction: column;
    max-width: 90%;
  }

  .msg-learner {
    align-self: flex-end;
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    padding: 0.625rem 0.875rem;
    border-radius: 0.75rem 0.75rem 0.125rem 0.75rem;
  }

  .msg-assistant {
    align-self: flex-start;
    background: var(--b-surface-alt);
    color: var(--b-text);
    padding: 0.75rem 0.875rem;
    border-radius: 0.75rem 0.75rem 0.75rem 0.125rem;
    border: 1px solid var(--b-border);
  }

  .answer-heading {
    margin: 0 0 0.375rem 0;
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--b-primary);
  }

  .answer-text {
    margin: 0 0 0.5rem 0;
    word-break: break-word;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .answer-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--b-border);
    flex-wrap: wrap;
  }

  .answer-actions button {
    font-size: 0.8125rem;
    min-height: 44px;
    padding: 0.25rem 0.625rem;
  }

  .sources-box {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--b-border);
    font-size: 0.8125rem;
  }

  .followup-box {
    margin-top: 0.625rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--b-border);
  }

  .followup-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--b-text-muted);
    margin-bottom: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .followup-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .btn-followup {
    font-size: 0.8125rem !important;
    padding: 0.25rem 0.625rem !important;
    min-height: 2rem !important;
    border-radius: 1rem !important;
    background: #f8fafc !important;
    border: 1px solid #cbd5e1 !important;
    color: var(--b-text) !important;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .btn-followup:hover {
    background: #e2e8f0 !important;
    border-color: var(--b-primary) !important;
    color: var(--b-primary) !important;
  }

  .sources-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--b-text-muted);
  }

  .source-link {
    display: block;
    color: var(--b-primary);
    text-decoration: underline;
    margin-bottom: 0.25rem;
    word-break: break-all;
  }

  .not-verified-box {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    color: #991b1b;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .live-status-indicator {
    padding: 0.5rem 0.875rem;
    font-style: italic;
    color: var(--b-text-muted);
  }

  .page-context-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: var(--b-surface-alt);
    border: 1px solid var(--b-border);
    padding: 0.375rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    color: var(--b-primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .speaking-indicator-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    animation: sb-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .listening-indicator-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    animation: sb-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes sb-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  /* Footer (Always Visible) */
  .footer {
    padding: 0.625rem 0.75rem;
    border-top: 1px solid var(--b-border);
    background: var(--b-surface);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .text-input {
    flex: 1;
    min-height: 44px;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--b-border);
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 0.9375rem;
    background: var(--b-bg);
    color: var(--b-text);
  }

  .mic-btn.recording {
    background: #ef4444 !important;
    color: #ffffff !important;
    border-color: #ef4444 !important;
    animation: pulse-ring 1.4s infinite;
  }

  .footer-actions-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.375rem;
  }

  .btn-footer {
    font-size: 0.8125rem;
    padding: 0.5rem 0.375rem;
    text-align: center;
  }

  .telegram-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .telegram-privacy-note {
    font-size: 0.8125rem;
    color: var(--b-text-muted);
    text-align: center;
    line-height: 1.25;
  }

  /* Settings Modal Dialog */
  .settings-dialog {
    position: absolute;
    inset: 0;
    background: var(--b-bg);
    color: var(--b-text);
    z-index: 20;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
  }

  .settings-dialog[hidden] {
    display: none !important;
  }

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--b-border);
    padding-bottom: 0.5rem;
  }

  .settings-section {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .settings-card {
    background: var(--b-surface);
    border: 1px solid var(--b-border);
    border-radius: 0.75rem;
    padding: 0.875rem 1rem;
    margin-bottom: 0.875rem;
  }
  .settings-card-title {
    font-size: 0.9375rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  .settings-card-desc {
    font-size: 0.8125rem;
    color: var(--b-text-muted);
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
  .code-display {
    font-family: monospace;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-align: center;
    padding: 0.75rem;
    background: var(--b-surface-alt, #f8fafc);
    border: 2px dashed var(--b-primary);
    border-radius: 0.5rem;
    color: var(--b-primary);
    user-select: all;
  }
  .link-code-box {
    background: var(--b-surface-alt, #f8fafc);
    border: 1px solid var(--b-border);
    border-radius: 0.5rem;
    padding: 0.5rem 0.625rem;
  }

  .settings-label {
    font-weight: 700;
    font-size: 0.875rem;
  }

  .size-btn-group {
    display: flex;
    gap: 0.375rem;
  }

  .size-btn-group button {
    flex: 1;
  }

  .size-btn-group button[aria-pressed="true"] {
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-color: var(--b-primary);
  }

  .checkbox-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .checkbox-row input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--b-primary);
  }

  .toggle-title { font-size: 0.9375rem !important; font-weight: 650; }
  .toggle-desc { font-size: 0.8125rem !important; line-height: 1.45; color: var(--b-text-muted); }

  /* Right-To-Left (RTL) for Arabic */
  :host([dir="rtl"]) .header,
  :host([dir="rtl"]) .input-row,
  :host([dir="rtl"]) .footer-actions-row,
  :host([dir="rtl"]) .suggested-questions,
  :host([dir="rtl"]) .voice-status-bar {
    direction: rtl;
  }

  :host([dir="rtl"]) .suggested-questions {
    text-align: right;
  }

  :host([dir="rtl"]) .btn-suggested {
    text-align: right;
    justify-content: flex-end;
  }

  :host([dir="rtl"]) .msg-learner {
    align-self: flex-start;
    border-radius: 0.75rem 0.75rem 0.75rem 0.125rem;
    text-align: right;
  }

  :host([dir="rtl"]) .msg-assistant {
    align-self: flex-end;
    border-radius: 0.75rem 0.75rem 0.125rem 0.75rem;
    text-align: right;
  }

  /* Responsive Mobile Overhaul */
  @media (max-width: 640px), (max-height: 640px) {
    .panel {
      inset: 0 !important;
      width: 100vw !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      border-radius: 0 !important;
      border: none !important;
      box-shadow: none !important;
      min-width: 0 !important;
      min-height: 0 !important;
      resize: none !important;
    }
    .panel[hidden] {
      display: none !important;
    }
    .launcher {
      inset-block-end: 1rem !important;
      inset-inline-end: 1rem !important;
      padding: 0.5rem 1rem !important;
    }
    .header {
      padding: 0.75rem 0.875rem !important;
    }
    .settings-dialog {
      padding: 0.875rem !important;
    }
    .settings-tabs {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .settings-tabs::-webkit-scrollbar {
      display: none;
    }
    .settings-tab-btn {
      white-space: nowrap !important;
      flex: 0 0 auto !important;
    }
    .nav-tabs {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .nav-tabs::-webkit-scrollbar {
      display: none;
    }
    .tab-btn {
      padding: 0.375rem 0.625rem !important;
      font-size: 0.875rem !important;
      min-width: fit-content !important;
    }
    .footer {
      padding: 0.625rem 0.75rem !important;
    }
  }

  /* Onboarding Wizard Modal */
  .onboarding-overlay {
    position: absolute;
    inset: 0;
    z-index: 2147483647;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.75rem, 3vw, 2rem);
    box-sizing: border-box;
  }
  .onboarding-card {
    background: var(--b-bg);
    color: var(--b-text);
    border-radius: var(--b-radius);
    border: 2px solid var(--b-primary);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    max-width: 40rem;
    width: 100%;
    min-height: min(31rem, calc(100% - 1rem));
    max-height: calc(100% - 1rem);
    overflow-y: auto;
    padding: clamp(1rem, 3vw, 1.75rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
  }
  .onboarding-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--b-border);
    padding-bottom: 0.75rem;
  }
  .onboarding-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
    color: var(--b-text);
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }
  .onboarding-body {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    font-size: 0.875rem;
    flex: 1;
  }
  .onboarding-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    border-top: 1px solid var(--b-border);
    padding-top: 0.75rem;
    flex-wrap: wrap;
  }
  .wizard-progress {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.375rem;
  }
  .wizard-progress span {
    height: 0.375rem;
    border-radius: 999px;
    background: var(--b-border);
  }
  .wizard-progress span.active { background: var(--b-primary); }
  .wizard-step-label {
    color: var(--b-primary);
    font-size: 0.8125rem;
    font-weight: 700;
  }
  .onboarding-option-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
  .onboarding-option-grid .toggle-row {
    height: 100%;
    padding: 0.875rem;
    border: 1px solid var(--b-border);
    border-radius: 0.625rem;
    background: var(--b-surface-alt);
  }
  @media (max-width: 540px) {
    .onboarding-option-grid { grid-template-columns: 1fr; }
    .onboarding-card { min-height: calc(100% - 0.5rem); }
  }

  /* Voice Autoplay Activation Banner */
  .voice-activation-banner {
    background: #eff6ff;
    border-bottom: 1px solid #bfdbfe;
    padding: 0.5rem 0.875rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }
  .voice-act-btn {
    background: var(--b-primary);
    color: #ffffff;
    border: none;
    border-radius: 0.375rem;
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2rem;
  }
  .voice-act-btn:hover {
    background: var(--b-primary-hover);
  }

  /* Reading Controls Floating Bar */
  .reading-controls-bar {
    background: #f0fdf4;
    border-bottom: 1px solid #86efac;
    padding: 0.5rem 0.875rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: #166534;
    font-weight: 600;
  }
  .reading-btn-group {
    display: flex;
    gap: 0.375rem;
  }
  .reading-btn {
    background: #ffffff;
    border: 1px solid #86efac;
    color: #166534;
    border-radius: 0.375rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .reading-btn:hover {
    background: #dcfce7;
  }

  /* Speech Rate Selector */
  .rate-btn-group {
    display: flex;
    gap: 0.375rem;
    width: 100%;
  }
  .rate-btn {
    flex: 1;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.375rem 0.5rem;
    min-height: 44px;
    border-radius: 0.375rem;
    border: 1px solid var(--b-border);
    background: var(--b-surface);
    color: var(--b-text);
    cursor: pointer;
    text-align: center;
  }
  .rate-btn[aria-pressed="true"] {
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-color: var(--b-primary);
  }

  /* Enhanced focus outlines */
  :host(.keyboard-focus-enhanced) button:focus-visible,
  :host(.keyboard-focus-enhanced) input:focus-visible,
  :host(.keyboard-focus-enhanced) a:focus-visible,
  :host(.keyboard-focus-enhanced) [tabindex]:focus-visible {
    outline: 4px solid #f59e0b !important;
    outline-offset: 3px !important;
  }
`;

export class BridgeAssistant extends HTMLElement {
  private isOpen = false;
  private currentLang: SupportedLanguage = "en";
  private textSize: "smaller" | "normal" | "larger" = "normal";
  private highContrast = false;
  private simpleMode = false;
  private autoReadSpeech = false;
  private isOffline = !navigator.onLine;

  // Voice States
  private isThinking = false;
  private isRecording = false;
  private isProcessingSpeech = false;
  private isSpeaking = false;

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private activeRecognition: any = null;
  private wakeWordRecognizer: any = null;
  private activeUtterance: any = null;
  private readingWatchdogTimer: any = null;
  private currentReading: {
    msgId: string;
    items: Array<{ text: string; element?: HTMLElement | null }>;
    currentIndex: number;
    paragraphs?: string[];
    audioQueue?: string[];
    isBusy?: boolean;
    isPaused?: boolean;
  } | null = null;
  private navCheckTimer: any = null;
  private voiceActivationEnabled = false;
  private wakeWordRecognition: any = null;
  private lastPageUrl: string | null = null;
  private lastPageTitle: string | null = null;
  private lastPageSection: string | null = null;
  private activeAudio: HTMLAudioElement | null = null;
  private audioCache: Map<string, string> = new Map();

  private messages: ChatMessage[] = [];
  private sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // Telegram link state
  private telegramToken: string | null = null;
  private telegramDeepLink: string = "https://t.me/savannah_assistant3_bot";
  private isTelegramLinked = false;
  private isLinkCodeInputVisible = false;
  private telegramPollTimer: number | null = null;

  // Settings dialog visibility
  private isSettingsOpen = false;

  // Active Handoff state
  private activeHandoff: { id: string; room_url: string } | null = null;

  // Support needs
  private supportNeeds: SupportNeedsData = {
    needs: ["written_instructions"],
    other_text: "",
    preferred_contact_mode: "text",
  };

  private activeTab: "chat" | "support" | "handoff" = "chat";

  // Persistent Accessibility & Voice Preferences (Configure Once, Access Everywhere)
  private accessibilityPrefs: AccessibilityPreferences = {
    language: "en",
    voice_enabled: false,
    auto_welcome: true,
    auto_tts: false,
    speech_rate: 1.0,
    voice_input_enabled: true,
    screen_reader_mode: false,
    keyboard_navigation: false,
    high_contrast: false,
    large_text: "normal",
    simple_mode: false,
    sync_enabled: true,
    onboarded: false,
  };

  private onboardingDismissed = false;
  private onboardingStep = 0;
  private isReadingPage = false;
  private isReadingPaused = false;
  private showAutoplayBanner = false;
  private hasSpokenWelcomeThisSession = false;
  private popstateListener: (() => void) | null = null;
  private spokenOnboardingActive = false;
  private spokenOnboardingIndex = 0;
  private pendingVoiceAction: PageActionPlan | null = null;
  private pendingVoiceTranscript = "";
  private lastSpokenText = "";
  private voiceRecordingTimeout: number | null = null;

  private previousFocus: HTMLElement | null = null;

  // Attributes: supports both guide plain attributes (lang, api, content) and data-*
  get apiBase(): string {
    if (typeof window !== "undefined" && (window as any).SAVANNA_API_URL) {
      return (window as any).SAVANNA_API_URL;
    }

    if (typeof window !== "undefined" && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramApi = urlParams.get("api");
      if (paramApi) return paramApi;
    }

    const attr = this.getAttribute("api") || this.getAttribute("data-api");

    if (typeof window !== "undefined" && window.location && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      if (attr && !attr.includes("localhost") && !attr.includes("127.0.0.1")) {
        return attr;
      }
      const host = window.location.hostname;
      if (host.includes("-demo.onrender.com")) {
        return `${window.location.protocol}//${host.replace("-demo.onrender.com", "-api.onrender.com")}`;
      }
      if (host.includes(".onrender.com")) {
        return window.location.origin;
      }
    }

    return attr || "http://localhost:8000";
  }

  get courseId(): string {
    return this.getAttribute("content") || this.getAttribute("data-course") || "course_demo";
  }

  get platformId(): string {
    return this.getAttribute("platform") || this.getAttribute("data-platform") ||
      window.location.hostname || "generic";
  }

  get platformName(): string {
    return this.getAttribute("platform-name") || this.getAttribute("data-platform-name") ||
      document.title || "this platform";
  }

  static get observedAttributes(): string[] {
    return [
      "lang", "data-lang", "api", "data-api", "content", "data-course",
      "platform", "data-platform", "platform-name", "data-platform-name",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    if ((name === "lang" || name === "data-lang") && newValue in I18N) {
      if (this.currentLang === newValue) {
        this.setAttribute("dir", newValue === "ar" ? "rtl" : "ltr");
        return;
      }
      this.currentLang = newValue as SupportedLanguage;
      if (this.shadowRoot) {
        this.render();
      }
    }
  }

  connectedCallback(): void {
    if (this.shadowRoot) return;

    this.restoreState();

    const attrLang = (this.getAttribute("lang") || this.getAttribute("data-lang")) as SupportedLanguage | null;
    const persistentLang = localStorage.getItem("savanna_bridge_preferred_lang") as SupportedLanguage | null;
    const cachedLang = sessionStorage.getItem("savanna_bridge_lang") as SupportedLanguage | null;
    if (attrLang && attrLang in I18N) {
      this.currentLang = attrLang;
    } else if (this.accessibilityPrefs.language && this.accessibilityPrefs.language in I18N) {
      this.currentLang = this.accessibilityPrefs.language;
    } else if (persistentLang && persistentLang in I18N) {
      this.currentLang = persistentLang;
    } else if (cachedLang && cachedLang in I18N) {
      this.currentLang = cachedLang;
    }

    if (this.accessibilityPrefs.keyboard_navigation) {
      this.classList.add("keyboard-focus-enhanced");
    }
    if (this.accessibilityPrefs.screen_reader_mode) {
      this.classList.add("screen-reader-mode");
    }

    this.attachShadow({ mode: "open" });
    this.render();
    this.setupNetworkMonitor();
    this.setupPageNavigationMonitor();
    if (this.voiceActivationEnabled) {
      this.setupWakeWordDetector();
    }

    // Universal compatibility: track SPA navigation without re-initializing widget
    this.popstateListener = () => {
      if (this.isReadingPage) {
        this.stopPageReading();
      }
    };
    window.addEventListener("popstate", this.popstateListener);

    // Fetch initial Telegram start link and support needs
    this.fetchTelegramStartLink();
    this.fetchSupportNeeds();

    // Initialize wake-word listener and global keyboard shortcuts
    if (this.accessibilityPrefs.voice_enabled) {
      this.initWakeWordDetection();
    }
    this.initGlobalKeyboardShortcuts();

    // Synchronize preferences across websites if opted in
    if (this.accessibilityPrefs.sync_enabled) {
      this.syncPreferencesFromBackend();
    }

    // Automatic Voice Accessibility:
    // If voice accessibility was previously enabled, attempt welcome announcement
    if (this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome && !this.hasSpokenWelcomeThisSession) {
      setTimeout(() => this.triggerSpokenWelcome(), 500);
    }
  }

  disconnectedCallback(): void {
    if (this.telegramPollTimer) {
      window.clearInterval(this.telegramPollTimer);
      this.telegramPollTimer = null;
    }
    if (this.voiceRecordingTimeout) {
      window.clearTimeout(this.voiceRecordingTimeout);
      this.voiceRecordingTimeout = null;
    }
    if (this.wakeWordRecognizer) {
      try { this.wakeWordRecognizer.stop(); } catch {}
      this.wakeWordRecognizer = null;
    }
    if (this.wakeWordRecognition) {
      try { this.wakeWordRecognition.stop(); } catch {}
      this.wakeWordRecognition = null;
    }
    this.stopSpeaking();
    if (this.popstateListener) {
      window.removeEventListener("popstate", this.popstateListener);
      this.popstateListener = null;
    }
    if (this.navCheckTimer) {
      window.clearInterval(this.navCheckTimer);
      this.navCheckTimer = null;
    }
    if (this.isReadingPage) {
      this.stopPageReading();
    }
    this.stopPageReadingHighlight();
  }

  private t(key: string): string {
    const dict = I18N[this.currentLang] || I18N.en;
    return dict[key] || I18N.en[key] || key;
  }

  private announce(text: string): void {
    const liveRegion = this.shadowRoot?.querySelector("#live-announcer");
    if (liveRegion) {
      liveRegion.textContent = "";
      setTimeout(() => {
        liveRegion.textContent = text;
      }, 50);
    }
  }

  private getLangDisplayName(lang: SupportedLanguage = this.currentLang): string {
    switch (lang) {
      case "am": return "አማርኛ";
      case "om": return "Afaan Oromoo";
      case "ti": return "ትግርኛ";
      case "ar": return "العربية";
      default: return "English";
    }
  }

  private setLanguage(lang: SupportedLanguage, fullRender = true): void {
    this.currentLang = lang;
    sessionStorage.setItem("savanna_bridge_lang", lang);
    this.accessibilityPrefs.language = lang;
    this.savePreferences();
    this.setAttribute("lang", lang);
    this.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (fullRender) {
      // Clear chat on language change so that learner sees pure, non-mixed language experience
      this.messages = [];
      sessionStorage.removeItem("savanna_bridge_chat_history");
      this.render();
      this.announce(this.t("appTitle"));
      if (this.accessibilityPrefs.voice_enabled) {
        this.speakText(this.t("voiceWelcomeAnnouncement"));
      }
    } else {
      this.updateHeaderLanguageButtons();
      this.updateVoiceStatusUI();
    }
  }

  public clearChat(): void {
    this.messages = [];
    sessionStorage.removeItem("savanna_bridge_chat_history");
    this.renderMessages();
    this.announce(this.t("emptyWelcome"));
  }

  private getPlatformInfo(): { title: string; url: string; type: string } {
    const ctx = this.extractPlatformContext();
    const title = ctx.page_title || (typeof document !== "undefined" ? document.title : "Web Session");
    const url = ctx.page_url || (typeof window !== "undefined" ? window.location.href : "");
    const combined = `${title} ${url} ${this.courseId}`.toLowerCase();

    let type = "general";
    if (combined.includes("job") || combined.includes("career") || combined.includes("internship") || combined.includes("hire") || combined.includes("work")) {
      type = "jobs";
    } else if (combined.includes("course") || combined.includes("lesson") || combined.includes("module") || combined.includes("learn") || combined.includes("student") || combined.includes("class")) {
      type = "course";
    }
    return { title, url, type };
  }

  private async generateLinkCode(): Promise<void> {
    try {
      const platform = this.getPlatformInfo();
      const res = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
          platform_id: this.platformId,
          platform_name: this.platformName,
          platform_title: platform.title,
          platform_url: platform.url,
          platform_type: platform.type,
          course_id: this.courseId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        this.telegramToken = data.token;
        this.telegramDeepLink = data.deep_link || this.telegramDeepLink;
        const codeDisplay = this.shadowRoot?.querySelector<HTMLElement>("#code-display");
        if (codeDisplay) {
          codeDisplay.textContent = data.code || data.token;
          codeDisplay.style.display = "block";
          this.announce(`${this.t("yourCodeIs")} ${data.code || data.token}`);
        }
        const codeInstr = this.shadowRoot?.querySelector<HTMLElement>("#code-instructions");
        if (codeInstr) {
          codeInstr.style.display = "block";
        }
        this.onTelegramLinkClicked();
      }
    } catch (err) {
      console.warn("Failed to generate link code", err);
    }
  }

  private async confirmLinkCode(code: string, feedbackEl?: HTMLElement | null): Promise<boolean> {
    const cleanCode = code.trim().replace(/\s+/g, "");
    if (!cleanCode) return false;

    if (feedbackEl) {
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "var(--b-text-muted)";
      feedbackEl.textContent = "Verifying code...";
    }

    try {
      const res = await fetch(`${this.apiBase}/api/v1/link/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleanCode }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.linked) {
          this.isTelegramLinked = true;
          this.isLinkCodeInputVisible = false;
          if (this.telegramPollTimer) {
            window.clearInterval(this.telegramPollTimer);
            this.telegramPollTimer = null;
          }
          if (feedbackEl) {
            feedbackEl.style.color = "#166534";
            feedbackEl.textContent = this.t("codeLinkSuccess");
          }
          this.announce(this.t("codeLinkSuccess"));
          setTimeout(() => {
            this.updateTelegramLinkUI();
            this.updateLinkCodeUI();
            this.render();
          }, 600);
          return true;
        }
      }

      if (feedbackEl) {
        feedbackEl.style.color = "#dc2626";
        feedbackEl.textContent = this.t("codeLinkError");
      }
      return false;
    } catch (err) {
      console.warn("Error confirming link code:", err);
      if (feedbackEl) {
        feedbackEl.style.color = "#dc2626";
        feedbackEl.textContent = this.t("codeLinkError");
      }
      return false;
    }
  }

  private updateHeaderLanguageButtons(): void {
    const root = this.shadowRoot;
    if (!root) return;
    const langs: SupportedLanguage[] = ["en", "am", "om", "ti", "ar"];
    langs.forEach((l) => {
      const btn = root.querySelector<HTMLButtonElement>(`#btn-lang-${l}`);
      if (btn) {
        btn.setAttribute("aria-pressed", l === this.currentLang ? "true" : "false");
      }
    });
  }

  private setupNetworkMonitor(): void {
    window.addEventListener("online", () => {
      this.isOffline = false;
      this.render();
      this.flushOfflineQueue();
    });
    window.addEventListener("offline", () => {
      this.isOffline = true;
      this.render();
    });
  }

  private async flushOfflineQueue(): Promise<void> {
    try {
      const queueRaw = localStorage.getItem("db_assistant_offline_queue");
      if (!queueRaw) return;
      const queue = JSON.parse(queueRaw);
      localStorage.removeItem("db_assistant_offline_queue");
      for (const item of queue) {
        if (item && item.question) {
          await this.askQuestion(item.question);
        }
      }
    } catch (e) {
      console.warn("Could not flush offline queue", e);
    }
  }

  private restoreState(): void {
    try {
      const savedMessages = sessionStorage.getItem("savanna_bridge_chat_history");
      if (savedMessages) this.messages = JSON.parse(savedMessages);

      const savedPrefsRaw = localStorage.getItem("savanna_voice_prefs");
      if (savedPrefsRaw) {
        try {
          const parsed = JSON.parse(savedPrefsRaw);
          this.accessibilityPrefs = { ...this.accessibilityPrefs, ...parsed };
        } catch {}
      }

      const persistentLang = localStorage.getItem("savanna_bridge_preferred_lang") as SupportedLanguage | null;
      if (persistentLang && persistentLang in I18N) {
        this.currentLang = persistentLang;
        this.accessibilityPrefs.language = persistentLang;
      }

      const savedContrast = localStorage.getItem("savanna_bridge_contrast");
      if (savedContrast) {
        this.highContrast = savedContrast === "high";
        this.accessibilityPrefs.high_contrast = this.highContrast;
      }

      const savedSize = localStorage.getItem("savanna_bridge_text_size") as "smaller" | "normal" | "larger" | null;
      if (savedSize) {
        this.textSize = savedSize;
        this.accessibilityPrefs.large_text = savedSize;
      }

      const savedAutoRead = localStorage.getItem("savanna_bridge_auto_read");
      if (savedAutoRead !== null) this.autoReadSpeech = savedAutoRead === "true";
      const savedSimple = localStorage.getItem("savanna_bridge_simple_mode");
      if (savedSimple) {
        this.simpleMode = savedSimple === "true";
        this.accessibilityPrefs.simple_mode = this.simpleMode;
      }
      const savedWake = localStorage.getItem("savanna_bridge_wake_word");
      if (savedWake) this.voiceActivationEnabled = savedWake === "true";
    } catch {
      // Ignore storage errors
    }
  }

  public savePreferences(): void {
    try {
      this.accessibilityPrefs.language = this.currentLang;
      this.accessibilityPrefs.high_contrast = this.highContrast;
      this.accessibilityPrefs.large_text = this.textSize;
      this.accessibilityPrefs.simple_mode = this.simpleMode;

      localStorage.setItem("savanna_voice_prefs", JSON.stringify(this.accessibilityPrefs));
      localStorage.setItem("savanna_bridge_preferred_lang", this.currentLang);
      localStorage.setItem("savanna_bridge_contrast", this.highContrast ? "high" : "normal");
      localStorage.setItem("savanna_bridge_text_size", this.textSize);
      localStorage.setItem("savanna_bridge_simple_mode", this.simpleMode ? "true" : "false");
      sessionStorage.setItem("savanna_bridge_lang", this.currentLang);

      if (this.accessibilityPrefs.sync_enabled) {
        this.syncPreferencesToBackend();
      }
    } catch (e) {
      console.warn("Could not save preferences to localStorage:", e);
    }
  }

  private async syncPreferencesToBackend(): Promise<void> {
    try {
      const learnerRef = this.getAttribute("learner-id") || `learner_${this.sessionId}`;
      await fetch(`${this.apiBase}/api/v1/accessibility-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learner_ref: learnerRef,
          language: this.currentLang,
          voice_enabled: this.accessibilityPrefs.voice_enabled,
          auto_welcome: this.accessibilityPrefs.auto_welcome,
          auto_tts: this.accessibilityPrefs.auto_tts,
          speech_rate: this.accessibilityPrefs.speech_rate,
          voice_input_enabled: this.accessibilityPrefs.voice_input_enabled,
          screen_reader_mode: this.accessibilityPrefs.screen_reader_mode,
          keyboard_navigation: this.accessibilityPrefs.keyboard_navigation,
          high_contrast: this.highContrast,
          large_text: this.textSize,
          simple_mode: this.simpleMode,
          sync_enabled: this.accessibilityPrefs.sync_enabled,
          onboarded: this.accessibilityPrefs.onboarded,
          needs: this.supportNeeds.needs,
          other_text: this.supportNeeds.other_text,
          preferred_contact_mode: this.supportNeeds.preferred_contact_mode,
        }),
      });
    } catch (err) {
      console.warn("Could not sync accessibility profile to backend:", err);
    }
  }

  private async syncPreferencesFromBackend(): Promise<void> {
    try {
      const learnerRef = this.getAttribute("learner-id") || `learner_${this.sessionId}`;
      const res = await fetch(`${this.apiBase}/api/v1/accessibility-profile?learner_ref=${encodeURIComponent(learnerRef)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.updated_at) {
          this.accessibilityPrefs.voice_enabled = !!data.voice_enabled;
          this.accessibilityPrefs.auto_welcome = !!data.auto_welcome;
          this.accessibilityPrefs.auto_tts = !!data.auto_tts;
          if (typeof data.speech_rate === "number") this.accessibilityPrefs.speech_rate = data.speech_rate;
          if (data.language && data.language in I18N) {
            this.currentLang = data.language;
            this.accessibilityPrefs.language = data.language;
          }
          if (data.large_text) this.textSize = data.large_text;
          if (typeof data.high_contrast === "boolean") this.highContrast = data.high_contrast;
          if (typeof data.simple_mode === "boolean") this.simpleMode = data.simple_mode;
          if (typeof data.onboarded === "boolean") this.accessibilityPrefs.onboarded = data.onboarded;
          this.savePreferences();
          this.render();
        }
      }
    } catch (err) {
      console.warn("Could not fetch accessibility profile from backend:", err);
    }
  }

  public getBestVoice(lang: SupportedLanguage): SpeechSynthesisVoice | null {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const langMap: Record<SupportedLanguage, string> = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      ar: "ar-SA",
    };
    const targetTag = langMap[lang].toLowerCase();
    const prefix = lang.toLowerCase();

    // 1. Exact match
    let match = voices.find((v) => v.lang.toLowerCase() === targetTag);
    if (match) return match;

    // 2. Prefix match
    match = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (match) return match;

    // 3. Name match
    const nameMap: Record<SupportedLanguage, string> = {
      en: "english",
      am: "amharic",
      om: "oromo",
      ti: "tigrinya",
      ar: "arabic",
    };
    const needle = nameMap[lang];
    match = voices.find((v) => v.name.toLowerCase().includes(needle));
    return match || null;
  }

  public speakText(
    text: string,
    options?: {
      rate?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err?: any) => void;
    }
  ): boolean {
    this.lastSpokenText = text;
    if (!("speechSynthesis" in window)) {
      if (options?.onError) options.onError();
      return false;
    }

    try {
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(text);
      const langMap: Record<SupportedLanguage, string> = {
        en: "en-US",
        am: "am-ET",
        om: "om-ET",
        ti: "ti-ET",
        ar: "ar-SA",
      };
      u.lang = langMap[this.currentLang] || "en-US";
      u.rate = options?.rate || this.accessibilityPrefs.speech_rate || 1.0;

      const voice = this.getBestVoice(this.currentLang);
      if (voice) {
        u.voice = voice;
      }

      u.onstart = () => {
        if (options?.onStart) options.onStart();
      };
      u.onend = () => {
        if (options?.onEnd) options.onEnd();
      };
      u.onerror = (e) => {
        console.warn("Speech synthesis error or autoplay blocked:", e);
        if (options?.onError) options.onError(e);
      };

      window.speechSynthesis.speak(u);
      return true;
    } catch (err) {
      console.warn("Could not initiate speech synthesis:", err);
      if (options?.onError) options.onError(err);
      return false;
    }
  }

  public triggerSpokenWelcome(): void {
    if (this.hasSpokenWelcomeThisSession) return;
    this.hasSpokenWelcomeThisSession = true;

    const welcomeText = this.t("voiceWelcomeAnnouncement");
    const played = this.speakText(welcomeText, {
      onError: () => {
        this.showAutoplayBanner = true;
        this.render();
        this.announce(this.t("oneTapVoiceActivation"));
      },
    });

    if (!played) {
      this.showAutoplayBanner = true;
      this.render();
      this.announce(this.t("oneTapVoiceActivation"));
    }
  }

  // --- Platform Context Extraction (Reads live page) ---

  private extractPlatformContext(): { page_url: string; page_title: string; page_content: string; section: string } {
    const page_url = typeof window !== "undefined" ? window.location.href : "";
    let page_title = typeof document !== "undefined" ? document.title || "Savanna Platform" : "Savanna Platform";
    let section = "Current Lesson";
    if (typeof document !== "undefined") {
      // Find course title if on dashboard or course page
      const courseTitleEl = document.querySelector(
        ".curriculum-switcher-label span, .curriculum-title, .course-header h1, h1.course-name"
      );
      if (courseTitleEl && courseTitleEl.textContent?.trim()) {
        page_title = courseTitleEl.textContent.trim();
      } else if (page_title.includes("|")) {
        page_title = page_title.split("|")[0].replace(/^Concept page:\s*/i, "").trim();
      }

      // Find active lesson heading
      const heading = document.querySelector(
        ".homepage-card h5, .formatted-content h5, .active-lesson, [aria-current='page'], #curriculum_navigation_content .active, .card-title, h2, h1"
      );
      if (heading && heading.textContent) {
        section = heading.textContent.trim().replace(/^[\s\n\r]+|[\s\n\r]+$/g, "");
      }
    }

    let page_content = "";
    if (typeof document !== "undefined") {
      const mainEl =
        document.querySelector("#curriculum_navigation_content") ||
        document.querySelector("#static-track-host") ||
        document.querySelector(".homepage-card:not(.d-none)") ||
        document.querySelector(".formatted-content") ||
        document.querySelector("article") ||
        document.querySelector("main") ||
        document.querySelector(".card-body") ||
        document.querySelector(".content") ||
        document.body;

      if (mainEl) {
        try {
          const clone = mainEl.cloneNode(true) as HTMLElement;
          clone
            .querySelectorAll(
              "script, style, db-assistant, bridge-assistant, noscript, nav, footer, header, #sidebar, .sidebar, button, input"
            )
            .forEach((el) => el.remove());

          const blocks: string[] = [];
          clone.querySelectorAll("h1, h2, h3, h4, h5, p, li").forEach((node) => {
            const txt = (node.textContent || "").replace(/\s+/g, " ").trim();
            if (txt) {
              const tag = node.tagName.toLowerCase();
              if (tag.startsWith("h")) {
                blocks.push(`\n${txt}\n`);
              } else if (tag === "li") {
                blocks.push(`• ${txt}`);
              } else {
                blocks.push(txt);
              }
            }
          });

          if (blocks.length > 0) {
            page_content = blocks.join("\n\n").slice(0, 15000);
          } else {
            page_content = (clone.textContent || "").replace(/\s+/g, " ").trim().slice(0, 15000);
          }
        } catch {
          page_content = "";
        }
      }
    }

    return { page_url, page_title, page_content, section };
  }

  public readPageAloud(): void {
    const context = this.extractPlatformContext();
    if (!context.page_content && !context.page_title) {
      this.announce("No readable content found on this page.");
      return;
    }

    this.isReadingPage = true;
    this.isReadingPaused = false;
    this.render();

    const titlePrefix = context.page_title ? `${context.page_title}. ` : "";
    const sectionPrefix = context.section ? `${context.section}. ` : "";
    const fullText = `${titlePrefix}${sectionPrefix}${context.page_content}`.slice(0, 10000);

    this.announce(this.t("readingPageAnnouncement"));

    this.speakText(fullText, {
      onEnd: () => {
        this.isReadingPage = false;
        this.isReadingPaused = false;
        this.render();
      },
      onError: () => {
        this.isReadingPage = false;
        this.isReadingPaused = false;
        this.render();
      },
    });
  }

  public readSectionAloud(): void {
    const context = this.extractPlatformContext();
    const sectionText = context.section || context.page_title;
    if (!sectionText) {
      this.announce("No active section found.");
      return;
    }

    this.isReadingPage = true;
    this.isReadingPaused = false;
    this.render();

    this.announce(this.t("readingSectionAnnouncement"));

    this.speakText(`${sectionText}. ${context.page_content.slice(0, 2000)}`, {
      onEnd: () => {
        this.isReadingPage = false;
        this.isReadingPaused = false;
        this.render();
      },
      onError: () => {
        this.isReadingPage = false;
        this.isReadingPaused = false;
        this.render();
      },
    });
  }

  public pausePageReading(): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      this.isReadingPaused = true;
      this.render();
      this.announce(this.t("pauseReading"));
    }
  }

  public resumePageReading(): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      this.isReadingPaused = false;
      this.render();
      this.announce(this.t("resumeReading"));
    }
  }

  public stopPageReading(): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isReadingPage = false;
    this.isReadingPaused = false;
    this.render();
    this.announce(this.t("stopReading"));
  }

  private saveChatState(): void {
    try {
      sessionStorage.setItem("savanna_bridge_chat_history", JSON.stringify(this.messages.slice(-25)));
    } catch {
      // Ignore
    }
  }

  // --- Accessibility Earcons (Web Audio API) ---

  private playEarcon(type: "start" | "stop" | "transcribed" | "wake"): void {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "wake" || type === "start") {
        // Rising chime (440Hz -> 880Hz)
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "stop") {
        // Falling chime (880Hz -> 440Hz)
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "transcribed") {
        // Confirm ping (587Hz -> 880Hz)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Ignore audio context autoplay limitations
    }
  }

  // --- Wake Word Detection ("Help") ---

  private initWakeWordDetection(): void {
    // Continuous microphone access is opt-in only. Never listen on page load
    // until the learner has explicitly enabled voice accessibility.
    if (!this.accessibilityPrefs.voice_enabled) return;
    if (this.wakeWordRecognizer) return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      const recognizer = new SpeechRec();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      recognizer.lang = "en-US";

      recognizer.onresult = (event: any) => {
        if (this.isRecording) return;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = (event.results[i][0]?.transcript || "").toLowerCase();
          if (
            text.includes("help") ||
            text.includes("እርዳታ") ||
            text.includes("እርዳኝ") ||
            text.includes("gargaarsa") ||
            text.includes("مساعدة") ||
            text.includes("ساعدني")
          ) {
            this.onWakeWordTriggered();
            break;
          }
        }
      };

      recognizer.onerror = () => {
        // Background listener error; ignore
      };

      recognizer.onend = () => {
        if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer) {
          try {
            recognizer.start();
          } catch {
            // Ignore
          }
        }
      };

      recognizer.start();
      this.wakeWordRecognizer = recognizer;
    } catch (e) {
      console.warn("Wake word background recognition notice:", e);
    }
  }

  private onWakeWordTriggered(): void {
    this.openAssistant();
    this.playEarcon("wake");
    this.announce(this.t("voiceListening"));
    const inputEl = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
    if (inputEl) {
      this.startVoiceRecording(inputEl);
    }
  }

  private initGlobalKeyboardShortcuts(): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      // Alt+Shift+A toggles the assistant open/close; Alt+Shift+V explicitly starts voice input.
      if (e.altKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
        if (this.isOpen) {
          this.closeAssistant();
        } else {
          this.previousFocus = launcher ?? null;
          this.openAssistant();
        }
        return;
      }

      if (e.altKey && e.shiftKey && (e.key === "V" || e.key === "v")) {
        e.preventDefault();
        const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
        if (!this.isOpen) {
          this.previousFocus = launcher ?? null;
          this.openAssistant();
        }
        const inputEl = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (inputEl) {
          this.toggleVoiceInput(inputEl);
        }
        return;
      }
    });
  }

  public openAssistant(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    const dialog = this.shadowRoot?.querySelector<HTMLElement>("#assistant-dialog");
    const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
    if (dialog && launcher) {
      dialog.hidden = false;
      dialog.removeAttribute("hidden");
      dialog.style.display = "flex";
      launcher.setAttribute("aria-expanded", "true");
      this.announce("Savanna Bridge Assistant opened. Use Tab to navigate or Escape to close.");
      const chatInput = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
      const title = this.shadowRoot?.querySelector<HTMLElement>("#dialog-title");
      const onboardingTitle = this.shadowRoot?.querySelector<HTMLElement>("#onboard-title");
      setTimeout(
        () => {
          const initialTarget = onboardingTitle ?? (this.accessibilityPrefs.screen_reader_mode ? title : chatInput);
          if (initialTarget) initialTarget.focus();
          else dialog.focus();
        },
        60
      );
    }
  }

  public closeAssistant(): void {
    this.isOpen = false;
    const dialog = this.shadowRoot?.querySelector<HTMLElement>("#assistant-dialog");
    const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
    if (dialog && launcher) {
      dialog.setAttribute("hidden", "true");
      dialog.style.display = "none";
      launcher.setAttribute("aria-expanded", "false");
      const isHost = this.previousFocus === (this as unknown as HTMLElement);
      const targetFocus =
        this.previousFocus &&
        !isHost &&
        this.previousFocus !== document.body &&
        this.previousFocus !== dialog &&
        !dialog.contains(this.previousFocus)
          ? this.previousFocus
          : launcher;
      targetFocus.focus();
    }
    this.stopSpeaking();
    if (this.isRecording) {
      this.stopVoiceRecording();
    }
  }

  // --- Telegram Link Methods ---

  private async fetchTelegramStartLink(): Promise<void> {
    try {
      const platform = this.getPlatformInfo();
      const res = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: `learner_${this.sessionId}`,
          platform_id: this.platformId,
          platform_name: this.platformName,
          platform_title: platform.title,
          platform_url: platform.url,
          platform_type: platform.type,
          course_id: this.courseId,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        this.telegramToken = data.token;
        this.telegramDeepLink = data.deep_link;
        this.updateTelegramLinkUI();
      }
    } catch (err) {
      console.warn("Could not fetch telegram link start:", err);
    }
  }

  private onTelegramLinkClicked(): void {
    if (this.isTelegramLinked || !this.telegramToken) return;

    if (this.telegramPollTimer) {
      window.clearInterval(this.telegramPollTimer);
    }

    let pollCount = 0;
    const maxPolls = 300; // 10 minutes (every 2s)

    this.telegramPollTimer = window.setInterval(async () => {
      pollCount++;
      if (pollCount > maxPolls) {
        if (this.telegramPollTimer) window.clearInterval(this.telegramPollTimer);
        this.telegramPollTimer = null;
        return;
      }

      try {
        const res = await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken!)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.linked) {
            if (this.telegramPollTimer) window.clearInterval(this.telegramPollTimer);
            this.telegramPollTimer = null;
            this.isTelegramLinked = true;
            this.announce(this.t("telegramConnected"));
            this.updateTelegramLinkUI();
          }
        }
      } catch (err) {
        console.warn("Telegram status polling error:", err);
      }
    }, 2000);
  }

  private async disconnectTelegram(): Promise<void> {
    try {
      await fetch(`${this.apiBase}/api/v1/link/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: this.telegramToken,
          learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
        }),
      });
    } catch {
      // Ignore
    }
    this.isTelegramLinked = false;
    await this.fetchTelegramStartLink();
    this.updateTelegramLinkUI();
    this.updateLinkCodeUI();
    this.render();
  }

  private updateLinkCodeUI(): void {
    const container = this.shadowRoot?.querySelector("#link-code-container");
    if (!container) return;

    if (this.isTelegramLinked) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:center; margin-top:0.25rem;">
        <button type="button" class="btn-toggle-link-code" id="btn-toggle-link-code" style="background:none; border:none; color:var(--b-primary); font-size:0.75rem; text-decoration:underline; cursor:pointer; padding:0.125rem 0;">
          ${this.isLinkCodeInputVisible ? this.t("hideCodePrompt") : `${ICONS.link} <span>${this.t("haveCodePrompt")}</span>`}
        </button>
      </div>
      ${
        this.isLinkCodeInputVisible
          ? `
        <div class="link-code-box" style="margin-top:0.375rem;">
          <div style="font-size:0.75rem; font-weight:600; margin-bottom:0.25rem; color:var(--b-text);">${this.t("enterCodeLabel")}</div>
          <form id="footer-code-form" style="display:flex; gap:0.25rem;">
            <input type="text" id="footer-input-code" class="text-input" placeholder="${this.t("codePlaceholder")}" maxlength="8" style="min-height:2.25rem; font-size:0.9375rem; font-weight:700; letter-spacing:0.15em; text-align:center; padding:0.25rem 0.5rem; flex:1;" required autocomplete="off" />
            <button type="submit" class="btn btn-primary" id="btn-footer-submit-code" style="min-height:2.25rem; font-size:0.75rem; padding:0.25rem 0.625rem; white-space:nowrap;">
              ${this.t("submitCodeBtn")}
            </button>
          </form>
          <div id="footer-code-msg" style="font-size:0.6875rem; font-weight:600; margin-top:0.25rem; text-align:center; display:none;"></div>
        </div>
      `
          : ""
      }
    `;

    container.querySelector("#btn-toggle-link-code")?.addEventListener("click", () => {
      this.isLinkCodeInputVisible = !this.isLinkCodeInputVisible;
      this.updateLinkCodeUI();
    });

    const form = container.querySelector<HTMLFormElement>("#footer-code-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = container.querySelector<HTMLInputElement>("#footer-input-code");
        const msg = container.querySelector<HTMLElement>("#footer-code-msg");
        if (input && input.value) {
          this.confirmLinkCode(input.value, msg);
        }
      });
    }
  }

  private updateTelegramLinkUI(): void {
    const container = this.shadowRoot?.querySelector("#telegram-container");
    if (!container) return;

    if (this.isTelegramLinked) {
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ${this.t("connectedToTelegram")}
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg">
            ${this.t("disconnectTelegram")}
          </button>
        </div>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `;
      container.querySelector("#btn-disconnect-tg")?.addEventListener("click", () => this.disconnectTelegram());
    } else {
      container.innerHTML = `
        <a href="${this.telegramDeepLink}" target="_blank" rel="noopener noreferrer" 
           class="btn btn-secondary btn-footer" id="tg-deep-link" 
           aria-label="${this.t("continueOnTelegramAria")}">
          ${this.t("continueOnTelegram")}
        </a>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `;
      container.querySelector("#tg-deep-link")?.addEventListener("click", () => this.onTelegramLinkClicked());
    }
  }

  // --- Support Needs API ---

  private async fetchSupportNeeds(): Promise<void> {
    try {
      const res = await fetch(`${this.apiBase}/api/v1/support-needs`);
      if (res.ok) {
        const data = await res.json();
        this.supportNeeds = {
          needs: data.needs || [],
          other_text: data.other_text || "",
          preferred_contact_mode: data.preferred_contact_mode || "text",
        };
      }
    } catch {
      // Ignore
    }
  }

  private async saveSupportNeeds(needs: string[], otherText: string, contactMode: "text" | "voice" | "video" | "telegram"): Promise<void> {
    this.supportNeeds = {
      needs,
      other_text: otherText,
      preferred_contact_mode: contactMode,
    };
    try {
      const res = await fetch(`${this.apiBase}/api/v1/support-needs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.supportNeeds),
      });
      const noticeEl = this.shadowRoot?.querySelector("#support-saved-notice");
      if (noticeEl) {
        noticeEl.removeAttribute("hidden");
        setTimeout(() => noticeEl.setAttribute("hidden", "true"), 3500);
      }
      if (!res.ok) {
        console.warn("PUT /support-needs failed", res.status);
      }
    } catch (e) {
      console.warn("Save support needs error:", e);
    }
  }

  // --- Language Script Detection ---

  public detectLanguage(text: string): SupportedLanguage {
    // Ethiopic Unicode block (U+1200 - U+137F) -> Amharic (ፊደል)
    if (/[\u1200-\u137F]/.test(text)) {
      return "am";
    }
    // Arabic Unicode block (U+0600 - U+06FF) -> Arabic (العربية)
    if (/[\u0600-\u06FF]/.test(text)) {
      return "ar";
    }
    // Afaan Oromo indicators (Latin alphabet with Oromo particles/words)
    if (
      /\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/i.test(text) ||
      /\b[A-Za-z]+'[A-Za-z]+\b/.test(text)
    ) {
      return "om";
    }
    return "en";
  }

  private detectLanguageWithConfidence(text: string): { language: SupportedLanguage; confidence: number } {
    const clean = text.trim();
    if (/[؀-ۿ]/.test(clean)) return { language: "ar", confidence: 0.99 };
    if (/[ሀ-፿]/.test(clean)) {
      const tigrinya = /\b(ናይ|እንታይ|እቲ|እዚ|ከመይ|ትምህርቲ)\b/.test(clean);
      return { language: tigrinya ? "ti" : "am", confidence: tigrinya ? 0.94 : 0.92 };
    }
    const oromoMatches = clean.match(/\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/gi);
    if (oromoMatches?.length) {
      return { language: "om", confidence: Math.min(0.98, 0.8 + oromoMatches.length * 0.06) };
    }
    const latinWords = clean.match(/[A-Za-z]+/g) || [];
    if (latinWords.length >= 3) return { language: "en", confidence: 0.9 };
    return { language: this.currentLang, confidence: 0.45 };
  }

  private collectPageControls(): PageControlDescriptor[] {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "button, a[href], input, select, textarea, [role='button'], [role='link'], [tabindex]"
      )
    ).filter((element) => !this.contains(element) && !element.hasAttribute("disabled"));

    return elements.slice(0, 100).map((element, index) => {
      let id = element.getAttribute("data-savanna-action-id");
      if (!id) {
        id = `page-control-${index}-${Math.random().toString(36).slice(2, 7)}`;
        element.setAttribute("data-savanna-action-id", id);
      }
      const input = element as HTMLInputElement;
      const label = (
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        input.labels?.[0]?.textContent ||
        element.textContent ||
        input.placeholder ||
        input.value ||
        element.getAttribute("name") ||
        element.tagName.toLowerCase()
      ).replace(/\s+/g, " ").trim().slice(0, 120);
      return {
        id,
        label,
        role: element.getAttribute("role") || element.tagName.toLowerCase(),
      };
    });
  }

  private findPageControl(id?: string | null): HTMLElement | null {
    if (!id) return null;
    return Array.from(document.querySelectorAll<HTMLElement>("[data-savanna-action-id]"))
      .find((element) => element.getAttribute("data-savanna-action-id") === id) || null;
  }

  private isAffirmative(text: string): boolean {
    return /^(yes|yeah|yep|confirm|okay|ok|አዎ|እሺ|eeyyee|እወ|نعم|أجل)\b/i.test(text.trim());
  }

  private isNegative(text: string): boolean {
    return /^(no|nope|cancel|stop|አይ|አይደለም|lakki|ኣይፋል|لا|إلغاء)\b/i.test(text.trim());
  }

  private async planVoiceAction(utterance: string): Promise<PageActionPlan> {
    const fallback: PageActionPlan = {
      action: "none",
      spoken_confirmation: "I did not recognize a page command.",
      requires_confirmation: false,
      confidence: 0,
      language: this.currentLang,
    };
    try {
      const response = await fetch(`${this.apiBase}/api/v1/agent/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utterance,
          language: this.currentLang,
          page_title: document.title,
          available_controls: this.collectPageControls(),
        }),
      });
      if (response.ok) return await response.json() as PageActionPlan;
    } catch (error) {
      console.warn("Voice command planner unavailable; keeping editable transcript.", error);
    }
    return fallback;
  }

  private async executeVoiceAction(plan: PageActionPlan): Promise<void> {
    const target = this.findPageControl(plan.target);
    switch (plan.action) {
      case "read_page":
        this.readPageAloud();
        return;
      case "read_section":
        this.readSectionAloud();
        return;
      case "list_controls": {
        const labels = this.collectPageControls().map((control) => control.label).filter(Boolean).slice(0, 20);
        const message = labels.length
          ? `Available controls: ${labels.join(", ")}.`
          : "No labelled page controls were found.";
        this.announce(message);
        this.speakText(message);
        return;
      }
      case "focus_control":
        if (target) {
          target.focus();
          target.scrollIntoView({ block: "center", behavior: "smooth" });
          this.announce(plan.spoken_confirmation);
        }
        return;
      case "activate_control":
        target?.click();
        this.announce(plan.spoken_confirmation);
        return;
      case "fill_control":
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
          target.value = plan.value || "";
          target.dispatchEvent(new Event("input", { bubbles: true }));
          target.dispatchEvent(new Event("change", { bubbles: true }));
          target.focus();
        }
        return;
      case "submit": {
        const chatInput = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (!target && chatInput?.value.trim()) {
          const text = chatInput.value;
          chatInput.value = "";
          this.pendingVoiceTranscript = "";
          await this.askQuestion(text);
          return;
        }
        if (target instanceof HTMLButtonElement || target instanceof HTMLInputElement) {
          target.click();
        } else if (target instanceof HTMLFormElement) {
          target.requestSubmit();
        }
        return;
      }
      case "stop_reading":
        this.stopPageReading();
        return;
      case "repeat":
        if (this.lastSpokenText) this.speakText(this.lastSpokenText);
        return;
      default:
        return;
    }
  }

  private async handleVoiceTranscript(text: string, inputEl: HTMLInputElement): Promise<void> {
    const transcript = text.trim();
    if (!transcript) return;

    if (this.spokenOnboardingActive) {
      this.handleSpokenOnboardingAnswer(transcript);
      return;
    }

    // A bare yes/no while the onboarding dialog is visible must never be sent
    // to the page-action planner. Only spoken setup owns onboarding answers.
    if (
      this.shadowRoot?.querySelector("#onboarding-overlay") &&
      (this.isAffirmative(transcript) || this.isNegative(transcript))
    ) {
      this.speakText("Choose Start spoken setup before answering yes or no.");
      return;
    }

    if (this.pendingVoiceAction) {
      if (this.isAffirmative(transcript)) {
        const action = this.pendingVoiceAction;
        this.pendingVoiceAction = null;
        await this.executeVoiceAction(action);
      } else if (this.isNegative(transcript)) {
        this.pendingVoiceAction = null;
        this.announce("Action cancelled.");
        this.speakText("Action cancelled.");
      } else {
        this.speakText("Please say yes to confirm or no to cancel.");
      }
      return;
    }

    const detected = this.detectLanguageWithConfidence(transcript);
    if (detected.confidence >= 0.82 && detected.language !== this.currentLang) {
      this.setLanguage(detected.language, false);
    }

    const plan = await this.planVoiceAction(transcript);
    if (plan.language && plan.confidence >= 0.82 && plan.language !== this.currentLang) {
      this.setLanguage(plan.language, false);
    }
    if (plan.action !== "none") {
      if (plan.requires_confirmation) {
        this.pendingVoiceAction = plan;
        this.announce(plan.spoken_confirmation);
        this.speakText(plan.spoken_confirmation);
      } else {
        await this.executeVoiceAction(plan);
      }
      return;
    }

    inputEl.value = transcript;
    inputEl.focus();
    this.pendingVoiceTranscript = transcript;
    const preview = `I heard: ${transcript}. You can edit it, or say send.`;
    this.announce(preview);
    this.speakText(preview);
  }

  private spokenOnboardingQuestions(): string[] {
    const languageConfirmation: Record<SupportedLanguage, string> = {
      en: "English is selected. Continue in English? Say yes or no.",
      am: "አማርኛ ተመርጧል። በአማርኛ እንቀጥል? አዎ ወይም አይ ይበሉ።",
      om: "Afaan Oromoo filatameera. Afaan Oromootiin itti fufnaa? Eeyyee ykn lakki jedhaa.",
      ti: "ትግርኛ ተመሪጹ። ብትግርኛ ንቐጽል? እወ ወይ ኣይፋል በሉ።",
      ar: "تم اختيار العربية. هل نتابع بالعربية؟ قل نعم أو لا.",
    };
    const questions: Record<SupportedLanguage, string[]> = {
      en: [
        languageConfirmation.en,
        "Are you using a screen reader such as NVDA, TalkBack, or VoiceOver?",
        "Would you like enhanced keyboard focus?",
        "Would you like high contrast colors?",
        "Would you like larger text?",
        "Would you like voice assistance? Say yes or no.",
        "Should I read new answers aloud automatically?",
      ],
      am: [
        languageConfirmation.am,
        "NVDA፣ TalkBack ወይም VoiceOver የሚባል የማያ አንባቢ ይጠቀማሉ?",
        "ግልጽ የቁልፍ ሰሌዳ ትኩረት ይፈልጋሉ?",
        "ከፍተኛ ንፅፅር ቀለም ይፈልጋሉ?",
        "ትልቅ ጽሑፍ ይፈልጋሉ?",
        "የድምጽ እርዳታ ይፈልጋሉ? አዎ ወይም አይ ይበሉ።",
        "አዲስ መልሶችን በራስ-ሰር እንዳነብልዎት ይፈልጋሉ?",
      ],
      om: [
        languageConfirmation.om,
        "Dubbisaa iskiriinii akka NVDA, TalkBack ykn VoiceOver fayyadamtu?",
        "Xiyyeeffannoo kiiboodii ifaa barbaadduu?",
        "Halluu walbira qabuu olaanaa barbaadduu?",
        "Barreeffama guddaa barbaadduu?",
        "Gargaarsa sagalee barbaadduu? Eeyyee ykn lakki jedhaa.",
        "Deebii haaraa ofumaan sagaleedhaan dubbisuu qabaa?",
      ],
      ti: [
        languageConfirmation.ti,
        "ከም NVDA፣ TalkBack ወይ VoiceOver ዝኣመሰለ ኣንባቢ ስክሪን ትጥቀሙ ዶ?",
        "ንጹር ናይ ኪቦርድ ትኹረት ትደልዩ ዶ?",
        "ልዑል ንጽጽር ሕብሪ ትደልዩ ዶ?",
        "ዓቢ ጽሑፍ ትደልዩ ዶ?",
        "ናይ ድምጺ ሓገዝ ትደልዩ ዶ? እወ ወይ ኣይፋል በሉ።",
        "ሓደስቲ መልስታት ብኣውቶማቲክ ከንብበልኩም ዶ?",
      ],
      ar: [
        languageConfirmation.ar,
        "هل تستخدم قارئ شاشة مثل NVDA أو TalkBack أو VoiceOver؟",
        "هل تريد مؤشراً أوضح للتركيز عند استخدام لوحة المفاتيح؟",
        "هل تريد ألواناً عالية التباين؟",
        "هل تريد نصاً أكبر؟",
        "هل تريد المساعدة الصوتية؟ قل نعم أو لا.",
        "هل تريد قراءة الإجابات الجديدة بصوت عال تلقائياً؟",
      ],
    };
    return questions[this.currentLang];
  }

  private startSpokenOnboarding(): void {
    this.stopPageReading();
    this.pendingVoiceAction = null;
    this.spokenOnboardingActive = true;
    this.spokenOnboardingIndex = [0, 1, 3, 5][this.onboardingStep] ?? 0;
    this.speakSpokenOnboardingQuestion();
  }

  private speakSpokenOnboardingQuestion(prefix = ""): void {
    const question = this.spokenOnboardingQuestions()[this.spokenOnboardingIndex];
    if (!question) return;
    const spoken = prefix ? `${prefix} ${question}` : question;
    this.announce(spoken);
    this.speakText(spoken, {
      onEnd: () => {
        const input = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (input && this.spokenOnboardingActive) this.startVoiceRecording(input);
      },
    });
  }

  private handleSpokenOnboardingAnswer(answer: string): void {
    if (!this.isAffirmative(answer) && !this.isNegative(answer)) {
      this.speakText("Please answer yes or no.", { onEnd: () => this.speakSpokenOnboardingQuestion() });
      return;
    }
    const selected = this.isAffirmative(answer);
    const acknowledgements: Record<SupportedLanguage, [string, string]> = {
      en: ["Selected yes.", "Selected no."],
      am: ["አዎ ተመርጧል።", "አይ ተመርጧል።"],
      om: ["Eeyyee filatameera.", "Lakki filatameera."],
      ti: ["እወ ተመሪጹ።", "ኣይፋል ተመሪጹ።"],
      ar: ["تم اختيار نعم.", "تم اختيار لا."],
    };

    if (this.spokenOnboardingIndex === 0 && !selected) {
      this.spokenOnboardingActive = false;
      const chooseLanguage: Record<SupportedLanguage, string> = {
        en: "Choose another language, then select Start spoken setup again.",
        am: "ሌላ ቋንቋ ይምረጡ፣ ከዚያ የድምጽ ቅንብርን እንደገና ይጀምሩ።",
        om: "Afaan biraa filadhaa, sana booda qindaa'ina sagalee irra deebi'aa jalqabaa.",
        ti: "ካልእ ቋንቋ ምረጹ፣ ድሕሪኡ ናይ ድምጺ ቅጥዒ እንደገና ጀምሩ።",
        ar: "اختر لغة أخرى، ثم ابدأ الإعداد الصوتي مرة أخرى.",
      };
      this.speakText(chooseLanguage[this.currentLang]);
      return;
    }

    switch (this.spokenOnboardingIndex) {
      case 0: break;
      case 1: this.accessibilityPrefs.screen_reader_mode = selected; break;
      case 2: this.accessibilityPrefs.keyboard_navigation = selected; break;
      case 3:
        this.highContrast = selected;
        this.accessibilityPrefs.high_contrast = selected;
        break;
      case 4:
        this.textSize = selected ? "larger" : "normal";
        this.accessibilityPrefs.large_text = this.textSize;
        break;
      case 5: this.accessibilityPrefs.voice_enabled = selected; break;
      case 6: this.accessibilityPrefs.auto_tts = selected; break;
    }
    this.spokenOnboardingIndex += 1;
    if (this.spokenOnboardingIndex < this.spokenOnboardingQuestions().length) {
      this.onboardingStep = this.spokenOnboardingIndex < 1
        ? 0
        : this.spokenOnboardingIndex < 3
          ? 1
          : this.spokenOnboardingIndex < 5
            ? 2
            : 3;
      this.savePreferences();
      this.render();
      setTimeout(
        () => this.speakSpokenOnboardingQuestion(acknowledgements[this.currentLang][selected ? 0 : 1]),
        0
      );
      return;
    }
    this.spokenOnboardingActive = false;
    this.accessibilityPrefs.onboarded = true;
    this.onboardingDismissed = true;
    this.savePreferences();
    this.render();
    const completed: Record<SupportedLanguage, string> = {
      en: "Setup complete. You can change these choices in accessibility settings.",
      am: "ቅንብሩ ተጠናቋል። እነዚህን ምርጫዎች በተደራሽነት ቅንብሮች ውስጥ መቀየር ይችላሉ።",
      om: "Qindaa'inni xumurameera. Filannoowwan kana qindaa'ina qaqqabummaa keessatti jijjiiruu dandeessu.",
      ti: "ቅጥዒ ተዛዚሙ። ነዞም ምርጫታት ኣብ ቅጥዒ ተበጻሕነት ክትቅይሩ ትኽእሉ።",
      ar: "اكتمل الإعداد. يمكنك تغيير هذه الخيارات من إعدادات إمكانية الوصول.",
    };
    this.speakText(completed[this.currentLang]);
    if (this.accessibilityPrefs.voice_enabled) this.initWakeWordDetection();
  }

  // --- Voice-to-Text (Speech Recognition) ---

  private async toggleVoiceInput(inputEl: HTMLInputElement): Promise<void> {
    if (this.isRecording) {
      this.stopVoiceRecording();
    } else {
      await this.startVoiceRecording(inputEl);
    }
  }

  private async startVoiceRecording(inputEl: HTMLInputElement): Promise<void> {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (this.wakeWordRecognizer) {
      try { this.wakeWordRecognizer.stop(); } catch {}
    }

    this.isRecording = true;
    this.isProcessingSpeech = false;
    this.playEarcon("start");
    this.announce(this.t("voiceListening"));
    this.updateVoiceStatusUI();
    this.updateMicButtonUI();

    let speechRecDeliveredText = false;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        this.activeRecognition = new SpeechRec();
        this.activeRecognition.continuous = false;
        this.activeRecognition.interimResults = true;

        const langMap: Record<SupportedLanguage, string> = {
          en: "en-US",
          am: "am-ET",
          om: "om-ET",
          ar: "ar-SA",
          ti: "ti-ET",
        };
        this.activeRecognition.lang = langMap[this.currentLang] || "en-US";

        this.activeRecognition.onresult = (event: any) => {
          let fullTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0]?.transcript || "";
          }
          const text = fullTranscript.trim();
          if (text) {
            inputEl.value = text;
            const lastResult = event.results[event.results.length - 1];
            if (lastResult?.isFinal) {
              speechRecDeliveredText = true;
              void this.handleVoiceTranscript(text, inputEl);
            }
          }
        };

        this.activeRecognition.onend = () => {
          if (this.isRecording) {
            this.stopVoiceRecording(speechRecDeliveredText);
          }
        };

        this.activeRecognition.onerror = (e: any) => {
          console.warn("Active speech recognition error:", e.error);
        };

        this.activeRecognition.start();
      } catch (e) {
        console.warn("Active recognition init error, falling back to MediaRecorder", e);
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioChunks = [];
        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : MediaRecorder.isTypeSupported("audio/ogg")
            ? "audio/ogg"
            : "audio/wav";

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.audioChunks.push(e.data);
        };
        this.mediaRecorder.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          if (!speechRecDeliveredText && this.audioChunks.length > 0) {
            const blob = new Blob(this.audioChunks, { type: mimeType });
            await this.sendAudioForTranscription(blob, mimeType, inputEl);
          }
        };

        this.mediaRecorder.start();
        this.voiceRecordingTimeout = window.setTimeout(() => {
          if (this.isRecording) this.stopVoiceRecording(speechRecDeliveredText);
        }, 10000);
      } catch (err) {
        console.warn("MediaRecorder permission/init notice:", err);
        if (!SpeechRec) {
          alert(this.t("micError"));
          this.isRecording = false;
          this.updateMicButtonUI();
          this.updateVoiceStatusUI();
        }
      }
    }
  }

  private stopVoiceRecording(hadDirectTranscript = false): void {
    this.isRecording = false;
    if (this.voiceRecordingTimeout) {
      window.clearTimeout(this.voiceRecordingTimeout);
      this.voiceRecordingTimeout = null;
    }
    this.playEarcon("stop");

    if (this.activeRecognition) {
      try { this.activeRecognition.stop(); } catch {}
      this.activeRecognition = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      if (!hadDirectTranscript) {
        this.isProcessingSpeech = true;
        this.announce(this.t("voiceProcessing"));
        this.updateVoiceStatusUI();
      }
      this.mediaRecorder.stop();
    } else {
      this.isProcessingSpeech = false;
      this.updateVoiceStatusUI();
    }

    this.updateMicButtonUI();

    if (hadDirectTranscript) {
      this.playEarcon("transcribed");
      this.announce(this.t("voicePreviewNotice"));
      const chatInput = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
      if (chatInput) chatInput.focus();
    }

    setTimeout(() => {
      if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer) {
        try { this.wakeWordRecognizer.start(); } catch {}
      }
    }, 1200);
  }

  private async sendAudioForTranscription(blob: Blob, mediaType: string, inputEl: HTMLInputElement): Promise<void> {
    this.isProcessingSpeech = true;
    this.updateVoiceStatusUI();
    this.announce(this.t("voiceProcessing"));

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const res = reader.result as string;
          resolve(res.split(",")[1] || "");
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(blob);
      const audioBase64 = await base64Promise;

      const res = await fetch(`${this.apiBase}/api/v1/speech/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio_base64: audioBase64,
          media_type: mediaType,
          language: "auto",
          retain: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.transcript) {
          const detected = data.detected_language as SupportedLanguage | undefined;
          const confidence = Number(data.language_confidence || 0);
          if (detected && detected in I18N && confidence >= 0.82 && detected !== this.currentLang) {
            this.setLanguage(detected, false);
          } else {
            const fallbackDetected = this.detectLanguage(data.transcript);
            if (fallbackDetected !== this.currentLang) {
              this.setLanguage(fallbackDetected, false);
            }
          }
          await this.handleVoiceTranscript(data.transcript, inputEl);
          this.playEarcon("transcribed");
          this.announce(this.t("voicePreviewNotice"));
          await this.askQuestion(data.transcript, false, true);
        }
      }
    } catch (err) {
      console.warn("Transcription fallback notice:", err);
    } finally {
      this.isProcessingSpeech = false;
      this.updateVoiceStatusUI();
    }
  }

  private updateMicButtonUI(): void {
    const micBtn = this.shadowRoot?.querySelector<HTMLButtonElement>("#mic-btn");
    if (!micBtn) return;
    if (this.isRecording) {
      micBtn.classList.add("recording");
      micBtn.setAttribute("aria-pressed", "true");
      micBtn.setAttribute("title", this.t("recordingState"));
    } else {
      micBtn.classList.remove("recording");
      micBtn.setAttribute("aria-pressed", "false");
      micBtn.setAttribute("title", this.t("micLabel"));
    }
  }

  private updateVoiceStatusUI(): void {
    const container = this.shadowRoot?.querySelector("#voice-status-container");
    if (!container) return;

    if (this.isRecording) {
      container.innerHTML = `
        <div class="voice-status-bar listening" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot"></span>
            <span>${this.t("voiceListening")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-voice">
            ${this.t("stopAudio")}
          </button>
        </div>
      `;
      container.querySelector("#btn-stop-voice")?.addEventListener("click", () => this.stopVoiceRecording());
    } else if (this.isProcessingSpeech) {
      container.innerHTML = `
        <div class="voice-status-bar processing" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot" style="background:#2563eb;"></span>
            <span>${this.t("voiceProcessing")} (${this.getLangDisplayName()})</span>
          </div>
        </div>
      `;
    } else if (this.isSpeaking) {
      container.innerHTML = `
        <div class="voice-status-bar speaking" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="sound-bars"><span></span><span></span><span></span></span>
            <span>${this.t("voiceSpeaking")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-speech">
            ${this.t("stopAudio")}
          </button>
        </div>
      `;
      container.querySelector("#btn-stop-speech")?.addEventListener("click", () => this.stopSpeaking());
    } else {
      container.innerHTML = "";
    }
  }

  // --- Text-to-Speech (Voice Responses) ---

  private cleanTextForSpeech(text: string): string {
    return text
      .replace(/\[\d+\]/g, "") // strip [1], [2] citations
      .replace(/\bhttps?:\/\/\S+/gi, "") // strip URLs
      .replace(/[#*_`~>]/g, "") // strip markdown
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}]/gu, "") // strip emojis
      .replace(/\s+/g, " ")
      .trim();
  }

  public async speakResponse(msg: ChatMessage, readFull: boolean = false): Promise<void> {
    this.stopSpeaking();

    const rawText = readFull ? msg.text : (msg.spoken || msg.text);
    const cleanText = this.cleanTextForSpeech(rawText);
    if (!cleanText) return;

    this.isSpeaking = true;
    msg.isAudioPlaying = true;
    this.renderMessages();
    this.updateVoiceStatusUI();

    const style = "warm, calm tutor, moderate pace, clear, unhurried";
    const cacheKey = `${cleanText}_${this.currentLang}_${style}`;

    if (this.audioCache.has(cacheKey)) {
      const cachedUrl = this.audioCache.get(cacheKey)!;
      this.activeAudio = new Audio(cachedUrl);
      this.activeAudio.onended = () => this.finishSpeaking(msg);
      this.activeAudio.onerror = () => this.fallbackTTS(cleanText, msg);
      try {
        await this.activeAudio.play();
        return;
      } catch (err) {
        console.warn("Cached audio playback failed, refetching...", err);
      }
    }

    // Prefer language-aware server TTS, then use browser speech.
    try {
      const res = await fetch(`${this.apiBase}/api/v1/speech/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          language: this.currentLang,
          speed: 1.0,
          style: style,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const hasRealAudio = data.audio_url && !data.audio_url.includes("demo.ogg");
        if (hasRealAudio) {
          const rawAudioUrl = String(data.audio_url);
          const audioUrl = /^(https?:|data:|blob:)/.test(rawAudioUrl)
            ? rawAudioUrl
            : `${this.apiBase}${rawAudioUrl}`;
          this.audioCache.set(cacheKey, audioUrl);
          this.activeAudio = new Audio(audioUrl);
          this.activeAudio.onended = () => this.finishSpeaking(msg);
          this.activeAudio.onerror = () => {
            if (this.currentLang === "en") {
              this.fallbackTTS(cleanText, msg);
            } else {
              this.finishSpeaking(msg);
            }
          };
          await this.activeAudio.play();
          return;
        } else if (data.mocked && this.currentLang === "en") {
          this.fallbackTTS(cleanText, msg);
          return;
        }
      }
    } catch (error) {
      console.warn("Server TTS unavailable:", error);
    }

    if (this.currentLang === "en") {
      this.fallbackTTS(cleanText, msg);
    } else {
      this.finishSpeaking(msg);
    }
  }

  private fallbackTTS(text: string, msg: ChatMessage): void {
    // Only use browser SpeechSynthesis for English; never for Ethiopian languages where browser lacks native voices
    if (this.currentLang !== "en" || !("speechSynthesis" in window)) {
      this.finishSpeaking(msg);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      ar: "ar-SA",
    };
    utterance.lang = langMap[this.currentLang] || "en-US";
    utterance.onend = () => this.finishSpeaking(msg);
    utterance.onerror = () => this.finishSpeaking(msg);
    window.speechSynthesis.speak(utterance);
  }

  private finishSpeaking(msg: ChatMessage): void {
    this.isSpeaking = false;
    msg.isAudioPlaying = false;
    this.activeAudio = null;
    this.renderMessages();
    this.updateVoiceStatusUI();
  }

  public stopSpeaking(): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio = null;
    }
    this.isSpeaking = false;
    this.messages.forEach((m) => (m.isAudioPlaying = false));
    this.renderMessages();
    this.updateVoiceStatusUI();
  }

  // --- TTS Audio & Read Aloud Controls ---

  private ensureHighlightStyles(): void {
    if (typeof document === "undefined") return;
    if (!document.getElementById("sb-reading-highlight-styles")) {
      const style = document.createElement("style");
      style.id = "sb-reading-highlight-styles";
      style.textContent = `
        .sb-reading-highlight {
          background-color: rgba(254, 240, 138, 0.9) !important;
          outline: 3.5px solid #eab308 !important;
          box-shadow: 0 0 16px rgba(234, 179, 8, 0.5) !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          transition: background-color 0.25s ease, outline 0.25s ease, box-shadow 0.25s ease !important;
        }
        .answer-para-item {
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .answer-para-item:hover {
          background-color: rgba(254, 240, 138, 0.25);
          border-radius: 4px;
        }
        .active-reading-para {
          background-color: rgba(254, 240, 138, 0.35) !important;
          border-left: 4px solid #eab308 !important;
          border-radius: 4px !important;
          padding-left: 0.5rem !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  private highlightElement(el: HTMLElement | null): void {
    this.ensureHighlightStyles();
    this.stopPageReadingHighlight();
    if (el) {
      el.classList.add("sb-reading-highlight");

      // If element is inside an overflow-clipped card or preview container (e.g. Savanna dashboard card with height:400px & overflow-y-hidden),
      // ensure the parent expands or scrolls so the highlighted paragraph is 100% visible!
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        const computed = window.getComputedStyle(parent);
        if (
          computed.overflowY === "hidden" ||
          computed.overflow === "hidden" ||
          parent.classList.contains("overflow-y-hidden") ||
          parent.style.height === "400px" ||
          parent.getAttribute("style")?.includes("400px")
        ) {
          parent.style.overflowY = "visible";
          parent.style.height = "auto";
          parent.style.maxHeight = "none";
          parent.classList.remove("overflow-y-hidden", "pe-none");
        }
        parent = parent.parentElement;
      }

      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {}
    }
  }

  private stopPageReadingHighlight(): void {
    if (typeof document !== "undefined") {
      document.querySelectorAll(".sb-reading-highlight").forEach((node) => {
        node.classList.remove("sb-reading-highlight");
      });
    }
  }

  private getReadablePageElements(): HTMLElement[] {
    if (typeof document === "undefined") return [];
    
    // Selectors covering all major LMS and educational platforms:
    // Canvas LMS: #content, .user_content, .show-content, #wiki_page_show
    // Moodle: #region-main, .course-content, .activity-information, .format-topics, .format-weeks
    // Blackboard: #content-frame, .vcr-content, .contentBox
    // Coursera / edX: [role="main"], main, article, .rc-ItemContent
    // Savanna: #curriculum_navigation_content, #static-track-host, .formatted-content, .homepage-card
    // WordPress LMS / Generic: .lesson-content, .course-content, .entry-content, main, article, .card-body
    const containerSelectors = [
      "#curriculum_navigation_content",
      "#static-track-host:not([hidden])",
      "#static-track-host",
      "[role='main']",
      "main",
      "article",
      ".course-content",
      ".lesson-content",
      ".activity-information",
      "#region-main",
      ".user_content",
      ".formatted-content",
      ".homepage-card:not(.d-none) .card-body:not(.d-none)",
      ".homepage-card:not(.d-none)",
      ".card-body",
      "#content",
      ".content",
      "body",
    ];

    let foundElements: HTMLElement[] = [];
    for (const sel of containerSelectors) {
      const container = document.querySelector<HTMLElement>(sel);
      if (!container) continue;

      const candidates = Array.from(
        container.querySelectorAll<HTMLElement>("p, h1, h2, h3, h4, h5, li, blockquote, pre")
      ).filter((el) => {
        // Exclude UI controls, assistants, sidebars, navigation, footers, scripts
        if (el.closest("bridge-assistant, db-assistant, nav, footer, header, #sidebar, .sidebar, script, style, noscript, dialog, .modal, template")) {
          return false;
        }
        // Exclude elements that are hidden or in inactive tabs
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) {
          return false;
        }
        const text = el.textContent?.trim() || "";
        return text.length > 15;
      });

      if (candidates.length > 0) {
        foundElements = candidates;
        break;
      }
    }

    if (foundElements.length === 0 && document.body) {
      foundElements = Array.from(
        document.body.querySelectorAll<HTMLElement>("p, h2, h3, h4, h5")
      ).filter((el) => {
        if (el.closest("bridge-assistant, db-assistant, nav, footer, header, #sidebar, .sidebar, script, style, template")) return false;
        return (el.textContent?.trim() || "").length > 15;
      });
    }

    return foundElements;
  }

  private startSequentialReading(msg: ChatMessage, startIndex: number = 0): void {
    if (this.readingWatchdogTimer) {
      clearTimeout(this.readingWatchdogTimer);
      this.readingWatchdogTimer = null;
    }
    this.activeUtterance = null;
    (window as any).__activeUtterance = null;

    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const pageElements = this.getReadablePageElements();

    // Split message into paragraphs/sections, ignoring follow-up suggestions
    const rawParagraphs = msg.text
      .split(/\n\s*\n|\n/)
      .map((p) => p.trim())
      .filter((p) => {
        if (!p || p.length < 5) return false;
        if (
          /^(Would you like|የሚከተሉትን|Maal gochuu|هل ترغب|•\s*Explain|•\s*Quiz|•\s*What|•\s*ይህንን|•\s*ወደ|•\s*ግንዛቤ|•\s*Yaada|•\s*Barnoota|•\s*Hubannoo|•\s*أشرح|•\s*أوضح|•\s*أطرح)/i.test(
            p
          )
        ) {
          return false;
        }
        return true;
      });

    const paragraphs = rawParagraphs.length > 0 ? rawParagraphs : [msg.text];

    let lastMatchedIdx = -1;
    const items = paragraphs.map((para, i) => {
      const cleanPara = para.replace(/[#*•_`]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
      const isIntro = /^(this course|this lesson|summary of|የዚህ|ይህ ትምህርት|barnoonni|يشرح|ملخص)/i.test(cleanPara);
      const searchSnippet = cleanPara.slice(0, 35);
      
      let matchedEl: HTMLElement | null = null;
      let matchedIdx = -1;

      // Try finding the matching element starting forward from lastMatchedIdx
      for (let idx = 0; idx < pageElements.length; idx++) {
        const el = pageElements[idx];
        const elText = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        if (
          (searchSnippet.length > 10 && elText.includes(searchSnippet)) ||
          (cleanPara.length > 20 && elText.includes(cleanPara.slice(10, 45))) ||
          (elText.length > 15 && cleanPara.includes(elText.slice(0, 35)))
        ) {
          // If advancing sequentially, prioritize elements after the last one used
          if (idx > lastMatchedIdx || matchedIdx === -1) {
            matchedEl = el;
            matchedIdx = idx;
            if (idx > lastMatchedIdx) break;
          }
        }
      }

      // If no text match found, advance sequentially through page elements!
      if (!matchedEl) {
        if (isIntro && pageElements.length > 0) {
          matchedEl = pageElements[0];
          matchedIdx = 0;
        } else {
          const nextIdx = lastMatchedIdx + 1;
          if (nextIdx < pageElements.length) {
            matchedEl = pageElements[nextIdx];
            matchedIdx = nextIdx;
          } else if (i < pageElements.length) {
            matchedEl = pageElements[i];
            matchedIdx = i;
          }
        }
      }

      if (matchedIdx !== -1) {
        lastMatchedIdx = matchedIdx;
      }

      return {
        text: para,
        element: matchedEl || null,
      };
    });

    this.currentReading = {
      msgId: msg.id,
      items,
      currentIndex: startIndex,
      isPaused: false,
    };

    msg.isAudioPlaying = true;
    msg.isAudioPaused = false;
    this.renderMessages();
    this.playNextReadingItem(msg);
  }

  private playNextReadingItem(msg: ChatMessage): void {
    if (this.readingWatchdogTimer) {
      clearTimeout(this.readingWatchdogTimer);
      this.readingWatchdogTimer = null;
    }

    if (!this.currentReading || this.currentReading.msgId !== msg.id || this.currentReading.isPaused) {
      return;
    }

    if (this.currentReading.currentIndex >= this.currentReading.items.length) {
      this.stopPageReadingHighlight();
      msg.isAudioPlaying = false;
      msg.isAudioPaused = false;
      this.currentReading = null;
      this.activeUtterance = null;
      (window as any).__activeUtterance = null;
      this.renderMessages();
      return;
    }

    const currentItem = this.currentReading.items[this.currentReading.currentIndex];

    // Advance highlight smoothly to the current paragraph and scroll it into view!
    if (currentItem.element) {
      this.highlightElement(currentItem.element);
    } else {
      this.stopPageReadingHighlight();
    }

    // Update UI so the active paragraph in the widget shows the reading indicator
    this.renderMessages();

    const cleanSpoken = currentItem.text.replace(/[#*•_`]/g, " ").replace(/\s+/g, " ").trim();
    if (!cleanSpoken) {
      this.currentReading.currentIndex++;
      this.playNextReadingItem(msg);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      try {
        window.speechSynthesis.resume();
      } catch {}

      const advanceNext = () => {
        if (this.readingWatchdogTimer) {
          clearTimeout(this.readingWatchdogTimer);
          this.readingWatchdogTimer = null;
        }
        this.activeUtterance = null;
        (window as any).__activeUtterance = null;

        if (!this.currentReading || this.currentReading.msgId !== msg.id || this.currentReading.isPaused) {
          return;
        }
        // Advance to next paragraph sequentially!
        this.currentReading.currentIndex++;
        this.playNextReadingItem(msg);
      };

      const u = new SpeechSynthesisUtterance(cleanSpoken);
      // Retain strong reference to prevent Chromium garbage collection of utterance during speech!
      this.activeUtterance = u;
      (window as any).__activeUtterance = u;

      const langMap: Record<SupportedLanguage, string> = {
        en: "en-US",
        am: "am-ET",
        om: "om-ET",
        ti: "ti-ET",
        ar: "ar-SA",
      };
      u.lang = langMap[this.currentLang] || "en-US";
      u.rate = 1.0;

      u.onstart = () => {
        msg.isAudioPlaying = true;
        msg.isAudioPaused = false;
      };

      u.onend = () => {
        advanceNext();
      };

      u.onerror = (e) => {
        console.warn("TTS segment error:", e);
        advanceNext();
      };

      // Watchdog timer: If Chrome drops onend or speech gets stuck, automatically advance to next paragraph!
      const words = cleanSpoken.split(/\s+/).filter(Boolean).length;
      const estimatedDurationMs = Math.min(14000, Math.max(3000, Math.ceil((words / 2.0) * 1000) + 1200));
      this.readingWatchdogTimer = setTimeout(() => {
        advanceNext();
      }, estimatedDurationMs);

      // Short delay ensures window.speechSynthesis.cancel() has completed before speak() is scheduled
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(u);
        } catch {
          advanceNext();
        }
      }, 40);
    } else {
      msg.isAudioPlaying = false;
      msg.isAudioPaused = false;
      this.stopPageReadingHighlight();
      this.renderMessages();
    }
  }

  private async handleListen(msg: ChatMessage): Promise<void> {
    if (this.readingWatchdogTimer) {
      clearTimeout(this.readingWatchdogTimer);
      this.readingWatchdogTimer = null;
    }

    if (msg.isAudioPlaying) {
      if (this.currentReading && this.currentReading.msgId === msg.id) {
        this.currentReading.isPaused = true;
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.pause();
      }
      if (this.activeAudio && !this.activeAudio.paused) {
        this.activeAudio.pause();
      }
      msg.isAudioPlaying = false;
      msg.isAudioPaused = true;
      this.renderMessages();
      this.announce(this.t("pauseButton"));
      return;
    }

    if (msg.isAudioPaused) {
      if (this.currentReading && this.currentReading.msgId === msg.id) {
        this.currentReading.isPaused = false;
        msg.isAudioPlaying = true;
        msg.isAudioPaused = false;
        if ("speechSynthesis" in window && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          this.playNextReadingItem(msg);
        }
        this.renderMessages();
        this.announce(this.t("listenButton"));
        return;
      }
      if (this.activeAudio && this.activeAudio.paused) {
        this.activeAudio.play().catch(() => this.startSequentialReading(msg, 0));
        msg.isAudioPlaying = true;
        msg.isAudioPaused = false;
        this.renderMessages();
        this.announce(this.t("listenButton"));
        return;
      }
    }

    this.startSequentialReading(msg, 0);
  }

  private handleStop(msg: ChatMessage): void {
    if (this.readingWatchdogTimer) {
      clearTimeout(this.readingWatchdogTimer);
      this.readingWatchdogTimer = null;
    }
    this.activeUtterance = null;
    (window as any).__activeUtterance = null;

    if (this.currentReading) {
      this.currentReading.isPaused = true;
      this.currentReading = null;
    }
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.stopPageReadingHighlight();
    msg.isAudioPlaying = false;
    msg.isAudioPaused = false;
    this.renderMessages();
    this.announce(this.t("stopButton"));
  }

  private handleReplay(msg: ChatMessage): void {
    this.handleStop(msg);
    setTimeout(() => {
      this.startSequentialReading(msg, 0);
    }, 120);
  }

  // --- Page Navigation and Context Monitoring ---

  private setupPageNavigationMonitor(): void {
    if (typeof window === "undefined") return;

    const updateContext = () => {
      const currentUrl = window.location.href;
      const currentTitle = document.title || "";
      const currentCtx = this.extractPlatformContext();

      const changed =
        (this.lastPageUrl && this.lastPageUrl !== currentUrl) ||
        (this.lastPageSection && this.lastPageSection !== currentCtx.section);

      if (changed) {
        this.stopPageReadingHighlight();
        if (this.activeAudio) {
          this.activeAudio.pause();
          this.activeAudio = null;
        }
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        this.announce(`${this.t("navigatedToNotice")} ${currentCtx.section}`);
        if (this.messages.length === 0) {
          this.renderMessages();
        }
      }

      this.lastPageUrl = currentUrl;
      this.lastPageTitle = currentTitle;
      this.lastPageSection = currentCtx.section;
    };

    window.addEventListener("popstate", updateContext);
    window.addEventListener("hashchange", updateContext);

    const originalPush = history.pushState;
    if (originalPush) {
      history.pushState = function (...args) {
        const ret = originalPush.apply(this, args);
        setTimeout(updateContext, 50);
        return ret;
      };
    }
    const originalReplace = history.replaceState;
    if (originalReplace) {
      history.replaceState = function (...args) {
        const ret = originalReplace.apply(this, args);
        setTimeout(updateContext, 50);
        return ret;
      };
    }

    this.navCheckTimer = window.setInterval(updateContext, 1500);
    updateContext();
  }

  // --- Voice Activation & Wake Word ("Help") ---

  private setupWakeWordDetector(): void {
    if (typeof window === "undefined") return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;

    try {
      this.wakeWordRecognition = new SpeechRec();
      this.wakeWordRecognition.continuous = true;
      this.wakeWordRecognition.interimResults = false;
      this.wakeWordRecognition.lang =
        this.currentLang === "ar"
          ? "ar-SA"
          : this.currentLang === "am"
            ? "am-ET"
            : this.currentLang === "om"
              ? "om-ET"
              : "en-US";

      this.wakeWordRecognition.onresult = (e: any) => {
        const last = e.results[e.results.length - 1];
        if (!last || !last[0]) return;
        const phrase = (last[0].transcript || "").trim().toLowerCase();
        if (
          phrase.includes("help") ||
          phrase.includes("እርዳታ") ||
          phrase.includes("gargaarsa") ||
          phrase.includes("مساعدة")
        ) {
          this.triggerVoiceActivation();
        }
      };

      this.wakeWordRecognition.onerror = () => {
        if (this.voiceActivationEnabled && !this.isRecording) {
          setTimeout(() => {
            try {
              this.wakeWordRecognition?.start();
            } catch {}
          }, 1000);
        }
      };

      this.wakeWordRecognition.onend = () => {
        if (this.voiceActivationEnabled && !this.isRecording) {
          setTimeout(() => {
            try {
              this.wakeWordRecognition?.start();
            } catch {}
          }, 500);
        }
      };

      this.wakeWordRecognition.start();
    } catch (err) {
      console.warn("Wake word detector error:", err);
    }
  }

  private triggerVoiceActivation(): void {
    this.openAssistant();
    const chatInput = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
    if (chatInput) {
      setTimeout(() => {
        this.toggleVoiceInput(chatInput);
      }, 250);
    }
  }
  // --- Q&A / Ask ---

  public switchTab(tabId: "chat" | "support" | "handoff"): void {
    this.activeTab = tabId;
    if (!this.shadowRoot) return;
    const mainTabs = [
      { id: "chat", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-chat"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-chat") },
      { id: "support", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-support"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-support") },
      { id: "handoff", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-handoff"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-handoff") },
    ];
    mainTabs.forEach((t) => {
      const selected = t.id === tabId;
      t.btn?.setAttribute("aria-selected", selected ? "true" : "false");
      if (t.pane) {
        t.pane.hidden = !selected;
        t.pane.style.display = selected ? (t.id === "chat" ? "flex" : "block") : "none";
      }
    });
    const activeBtn = mainTabs.find((t) => t.id === tabId)?.btn;
    if (activeBtn) {
      activeBtn.focus();
      this.announce(`${activeBtn.textContent?.trim()} tab selected`);
    }
  }

  public async askQuestion(questionText: string, forceSimple = false, fromVoice = false): Promise<void> {
    const q = questionText.trim();
    if (!q || this.isThinking) return;

    if (this.activeTab !== "chat") {
      this.switchTab("chat");
    }

    // Check if user entered a 6-digit linking code or /confirm <code> directly in chat
    const codeMatch = q.match(/^(?:\/confirm|\/link)?\s*([0-9]{6})$/i);
    if (codeMatch) {
      const code = codeMatch[1];
      const success = await this.confirmLinkCode(code);
      if (success) {
        this.messages.push({
          id: `msg_link_${Date.now()}`,
          sender: "assistant",
          text: this.t("codeLinkSuccess"),
        });
        this.renderMessages();
        return;
      }
    }

    this.stopSpeaking();

    this.dispatchEvent(
      new CustomEvent("db-assistant:question", {
        bubbles: true,
        composed: true,
        detail: { text: q, language: this.currentLang },
      })
    );

    const learnerMsg: ChatMessage = {
      id: `msg_${Date.now()}_learner`,
      sender: "learner",
      text: q,
    };
    this.messages.push(learnerMsg);
    this.isThinking = true;
    this.announce(this.t("lookingInCourse"));
    this.renderMessages();
    const pageContext = this.extractPlatformContext();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      let res = await fetch(`${this.apiBase}/api/v1/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          question: q,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: forceSimple || this.simpleMode,
          channel: "web",
          learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
          platform_id: this.platformId,
          ...pageContext,
        }),
      });

      if (!res.ok && res.status === 404) {
        res = await fetch(`${this.apiBase}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            question: q,
            language: this.currentLang,
            course_id: this.courseId,
            simple_mode: forceSimple || this.simpleMode,
            channel: "web",
            learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
            platform_id: this.platformId,
            ...pageContext,
          }),
        });
      }

      if (res.ok) {
        const data = await res.json();
        const responseLanguage = data.language as SupportedLanguage | undefined;
        if (data.language_changed && responseLanguage && responseLanguage in I18N && responseLanguage !== this.currentLang) {
          this.setLanguage(responseLanguage, false);
        }
        const isRefusal = !!data.offer_human || data.reason === "low_confidence";
        const assistantMsg: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          sender: "assistant",
          text: data.answer,
          spoken: data.spoken || data.answer,
          heading: this.t("answerHeading"),
          citations: data.citations || [],
          offerHuman: data.offer_human,
          isRefusal: isRefusal,
        };
        this.messages.push(assistantMsg);
        this.saveChatState();
        this.renderMessages();

        if (fromVoice) {
          setTimeout(() => {
            this.speakResponse(assistantMsg);
          }, 300);
        } else if (this.autoReadSpeech || (this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_tts)) {
          this.speakResponse(assistantMsg);
        }
      } else {
        const errMsg: ChatMessage = {
          id: `msg_${Date.now()}_err`,
          sender: "assistant",
          text: this.t("serverErrorNotice"),
          offerHuman: true,
        };
        this.messages.push(errMsg);
        this.renderMessages();
      }
    } catch {
      try {
        const queue = JSON.parse(localStorage.getItem("db_assistant_offline_queue") || "[]");
        queue.push({ question: q, language: this.currentLang, timestamp: Date.now() });
        localStorage.setItem("db_assistant_offline_queue", JSON.stringify(queue));
      } catch {
        // Ignore
      }
      const offlineMsg: ChatMessage = {
        id: `msg_${Date.now()}_offline`,
        sender: "assistant",
        text: this.t("savedOnPhoneNotice"),
        offerHuman: true,
        isRefusal: true,
      };
      this.messages.push(offlineMsg);
      this.renderMessages();
    } finally {
      clearTimeout(timeoutId);
      this.isThinking = false;
      this.renderMessages();
    }
  }

  // --- Human Handoff ---

  private async requestHandoff(contextReason?: string): Promise<void> {
    if (this.isOffline) {
      alert(this.t("offlineBanner"));
      return;
    }

    const consentBox = this.shadowRoot?.querySelector<HTMLInputElement>("#handoff-consent");
    if (consentBox && !consentBox.checked) {
      const errBox = this.shadowRoot?.querySelector<HTMLElement>("#handoff-consent-error");
      if (errBox) {
        errBox.textContent = this.t("handoffConsentCheck");
        errBox.style.display = "block";
      }
      consentBox.focus();
      return;
    }

    // If initiated outside form (e.g. from chat button), switch to handoff tab with context
    if (this.activeTab !== "handoff") {
      this.switchTab("handoff");
      const reasonInput = this.shadowRoot?.querySelector<HTMLInputElement>("#handoff-reason");
      if (reasonInput && contextReason) {
        reasonInput.value = contextReason;
      }
    }

    const errBox = this.shadowRoot?.querySelector<HTMLElement>("#handoff-consent-error");
    if (errBox) errBox.style.display = "none";

    const submitBtn = this.shadowRoot?.querySelector<HTMLButtonElement>("#btn-submit-handoff");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${this.t("lookingInCourse")}...</span>`;
    }

    this.announce(this.t("lookingInCourse"));

    try {
      const endpoints = [
        `${this.apiBase}/api/v1/escalations`,
        `${this.apiBase}/escalations`,
        `${this.apiBase}/api/v1/handoff`,
        `${this.apiBase}/handoff`,
      ];

      const payload = {
        consent: true,
        learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
        card: {
          language: this.currentLang,
          context: contextReason || this.shadowRoot?.querySelector<HTMLInputElement>("#handoff-reason")?.value || "Learner requested a human mentor from web assistant.",
          support_needs: this.supportNeeds.needs,
          contact_mode: this.supportNeeds.preferred_contact_mode,
        },
        channel: "web",
      };

      let res: Response | null = null;
      for (const endpoint of endpoints) {
        try {
          const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (r.ok) {
            res = r;
            break;
          }
        } catch {
          // try next fallback endpoint
        }
      }

      if (res && res.ok) {
        const data = await res.json();
        const ticketId = data.ticketId || data.handoff_id || data.id || "ticket_01";
        const roomUrl = data.room_url || data.roomUrl || "https://meet.jit.si/savanna-bridge-demo";
        this.activeHandoff = {
          id: ticketId,
          room_url: roomUrl,
        };

        this.dispatchEvent(
          new CustomEvent("db-assistant:escalated", {
            bubbles: true,
            composed: true,
            detail: { ticketId, roomUrl },
          })
        );

        this.messages.push({
          id: `msg_${Date.now()}_handoff`,
          sender: "assistant",
          text: `${this.t("handoffReadyTitle")}: ${this.activeHandoff.room_url}`,
          heading: this.t("handoffReadyTitle"),
          isHandoff: true,
          roomUrl,
          offerHuman: false,
        });
        this.saveChatState();

        const roomBox = this.shadowRoot?.querySelector<HTMLElement>("#handoff-room-box");
        if (roomBox) {
          roomBox.innerHTML = `
            <div style="padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; margin-top:0.75rem;">
              <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                ${ICONS.celebrate} <span>${this.t("handoffReadyTitle")}</span>
              </p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${roomUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${ICONS.video} <span>${this.t("joinRoomButton")}</span>
                </a>
                <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(roomUrl)}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${ICONS.copy} <span>${this.t("copyRoomBtn")}</span>
                </button>
              </div>
            </div>
          `;

          const copyBtn = roomBox.querySelector<HTMLButtonElement>(".btn-copy-room");
          if (copyBtn) {
            copyBtn.addEventListener("click", async () => {
              const url = copyBtn.getAttribute("data-url");
              if (url) {
                try {
                  await navigator.clipboard.writeText(url);
                } catch {
                  const ta = document.createElement("textarea");
                  ta.value = url;
                  document.body.appendChild(ta);
                  ta.select();
                  document.execCommand("copy");
                  document.body.removeChild(ta);
                }
                copyBtn.innerHTML = `${ICONS.check} <span>${this.t("linkCodeCopied")}</span>`;
                this.announce(this.t("linkCodeCopied"));
                setTimeout(() => {
                  copyBtn.innerHTML = `${ICONS.copy} <span>${this.t("copyRoomBtn")}</span>`;
                }, 2000);
              }
            });
          }
        }

        this.renderMessages();
      } else {
        const errNotice = this.shadowRoot?.querySelector<HTMLElement>("#handoff-consent-error");
        if (errNotice) {
          errNotice.textContent = this.t("serverErrorNotice");
          errNotice.style.display = "block";
        } else {
          alert(this.t("serverErrorNotice"));
        }
      }
    } catch {
      const errNotice = this.shadowRoot?.querySelector<HTMLElement>("#handoff-consent-error");
      if (errNotice) {
        errNotice.textContent = this.t("serverErrorNotice");
        errNotice.style.display = "block";
      } else {
        alert(this.t("serverErrorNotice"));
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${ICONS.users} <span>${this.t("requestMentorBtn")}</span>`;
      }
    }
  }

  private renderOnboardingWizard(): string {
    if (this.accessibilityPrefs.onboarded || this.onboardingDismissed) return "";

    const copy = {
      en: { step: "Step", of: "of", back: "Back", next: "Next", finish: "Finish setup", skip: "Skip for now" },
      am: { step: "ደረጃ", of: "ከ", back: "ተመለስ", next: "ቀጣይ", finish: "ቅንብሩን ጨርስ", skip: "ለጊዜው ዝለል" },
      om: { step: "Tarkaanfii", of: "kan", back: "Duubatti", next: "Itti aanu", finish: "Qindaa'ina xumuri", skip: "Ammaaf darbi" },
      ti: { step: "ስጉምቲ", of: "ካብ", back: "ተመለስ", next: "ቀጻሊ", finish: "ቅጥዒ ዛዝም", skip: "ንሕጂ ሕለፎ" },
      ar: { step: "الخطوة", of: "من", back: "رجوع", next: "التالي", finish: "إنهاء الإعداد", skip: "تخطي الآن" },
    }[this.currentLang];

    const steps = [
      `
        <p class="onboarding-subtitle">${this.t("onboardingSubtitle")}</p>
        <label class="settings-label">${this.t("onboardingLangPrompt")}</label>
        <div class="lang-group onboarding-languages" role="group" aria-label="${this.t("onboardingLangPrompt")}" style="display:grid; grid-template-columns:repeat(5, minmax(44px,1fr)); gap:0.375rem; padding:0.375rem;">
          <button type="button" class="lang-toggle-btn" id="onboard-lang-en" aria-pressed="${this.currentLang === "en"}" aria-label="EN, English">EN</button>
          <button type="button" class="lang-toggle-btn" id="onboard-lang-am" aria-pressed="${this.currentLang === "am"}" aria-label="አማ, አማርኛ">አማ</button>
          <button type="button" class="lang-toggle-btn" id="onboard-lang-om" aria-pressed="${this.currentLang === "om"}" aria-label="OM, Afaan Oromoo">OM</button>
          <button type="button" class="lang-toggle-btn" id="onboard-lang-ti" aria-pressed="${this.currentLang === "ti"}" aria-label="ትግ, ትግርኛ">ትግ</button>
          <button type="button" class="lang-toggle-btn" id="onboard-lang-ar" aria-pressed="${this.currentLang === "ar"}" aria-label="عربي, العربية">عربي</button>
        </div>
        <button type="button" class="btn btn-secondary" id="btn-spoken-onboarding" style="align-self:flex-start;">
          ${ICONS.sound} <span>${this.t("spokenSetup")}</span>
        </button>
      `,
      `
        <p class="onboarding-subtitle">Choose how the assistant should work with your assistive technology.</p>
        <div class="onboarding-option-grid">
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("screenReaderModeLabel")}</span><span class="toggle-desc">${this.t("screenReaderModeDesc")}</span></div>
            <input type="checkbox" id="onboard-chk-screen-reader" class="toggle-switch" ${this.accessibilityPrefs.screen_reader_mode ? "checked" : ""}>
          </label>
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("keyboardNavLabel")}</span><span class="toggle-desc">${this.t("keyboardNavDesc")}</span></div>
            <input type="checkbox" id="onboard-chk-keyboard-nav" class="toggle-switch" ${this.accessibilityPrefs.keyboard_navigation ? "checked" : ""}>
          </label>
        </div>
      `,
      `
        <p class="onboarding-subtitle">Adjust the visual presentation. You can change these choices later in Settings.</p>
        <div class="onboarding-option-grid">
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("highContrastLabel")}</span><span class="toggle-desc">Increase separation between text, controls, and backgrounds.</span></div>
            <input type="checkbox" id="onboard-chk-contrast" class="toggle-switch" ${this.accessibilityPrefs.high_contrast ? "checked" : ""}>
          </label>
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("textLarger")}</span><span class="toggle-desc">${this.t("textSizeLabel")}</span></div>
            <input type="checkbox" id="onboard-chk-large-text" class="toggle-switch" ${this.accessibilityPrefs.large_text === "larger" ? "checked" : ""}>
          </label>
        </div>
      `,
      `
        <p class="onboarding-subtitle">Choose voice assistance. Written content always remains available.</p>
        <div class="onboarding-option-grid">
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("onboardingVoiceEnable")}</span><span class="toggle-desc">${this.t("onboardingVoiceDesc")}</span></div>
            <input type="checkbox" id="onboard-chk-voice" class="toggle-switch" ${this.accessibilityPrefs.voice_enabled ? "checked" : ""}>
          </label>
          <label class="toggle-row">
            <div class="toggle-info"><span class="toggle-title">${this.t("autoTtsLabel")}</span><span class="toggle-desc">${this.t("autoTtsDesc")}</span></div>
            <input type="checkbox" id="onboard-chk-auto-tts" class="toggle-switch" ${this.accessibilityPrefs.auto_tts ? "checked" : ""}>
          </label>
        </div>
        <div class="privacy-note">${ICONS.lock} <span>${this.t("onboardingMicExplain")}</span></div>
      `,
    ];

    const progress = [0, 1, 2, 3]
      .map((index) => `<span class="${index <= this.onboardingStep ? "active" : ""}"></span>`)
      .join("");

    return `
      <div class="onboarding-overlay" id="onboarding-overlay">
        <section class="onboarding-card" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
          <div class="onboarding-header">
            <h3 class="onboarding-title" id="onboard-title" tabindex="-1">${ICONS.accessibility}<span>${this.t("onboardingTitle")}</span></h3>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-onboard-close" aria-label="${copy.skip}">${ICONS.close}</button>
          </div>
          <div class="wizard-progress" role="progressbar" aria-label="${copy.step} ${this.onboardingStep + 1} ${copy.of} 4" aria-valuemin="1" aria-valuemax="4" aria-valuenow="${this.onboardingStep + 1}">${progress}</div>
          <div class="wizard-step-label">${copy.step} ${this.onboardingStep + 1} ${copy.of} 4</div>
          <div class="onboarding-body">${steps[this.onboardingStep]}</div>
          <div class="onboarding-actions">
            <button type="button" class="btn btn-secondary" id="btn-onboard-skip">${copy.skip}</button>
            <span style="flex:1;"></span>
            ${this.onboardingStep > 0 ? `<button type="button" class="btn btn-secondary" id="btn-onboard-back">${copy.back}</button>` : ""}
            ${this.onboardingStep < 3
              ? `<button type="button" class="btn btn-primary" id="btn-onboard-next">${copy.next} ${ICONS.arrowRight}</button>`
              : `<button type="button" class="btn btn-primary" id="btn-onboard-save">${copy.finish}</button>`}
          </div>
        </section>
      </div>`;
  }

  private captureOnboardingStep(): void {
    const value = (id: string): boolean | null => {
      const input = this.shadowRoot?.querySelector<HTMLInputElement>(`#${id}`);
      return input ? input.checked : null;
    };
    const screenReader = value("onboard-chk-screen-reader");
    const keyboard = value("onboard-chk-keyboard-nav");
    const contrast = value("onboard-chk-contrast");
    const largeText = value("onboard-chk-large-text");
    const voice = value("onboard-chk-voice");
    const autoTts = value("onboard-chk-auto-tts");
    if (screenReader !== null) this.accessibilityPrefs.screen_reader_mode = screenReader;
    if (keyboard !== null) this.accessibilityPrefs.keyboard_navigation = keyboard;
    if (contrast !== null) this.accessibilityPrefs.high_contrast = contrast;
    if (largeText !== null) this.accessibilityPrefs.large_text = largeText ? "larger" : "normal";
    if (voice !== null) this.accessibilityPrefs.voice_enabled = voice;
    if (autoTts !== null) this.accessibilityPrefs.auto_tts = autoTts;
    this.highContrast = this.accessibilityPrefs.high_contrast;
    this.textSize = this.accessibilityPrefs.large_text;
  }

  private completeOnboarding(saveSelected: boolean): void {
    if (saveSelected) this.captureOnboardingStep();
    this.accessibilityPrefs.onboarded = true;
    this.onboardingDismissed = true;
    this.onboardingStep = 0;
    this.savePreferences();
    this.render();
    if (saveSelected && this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome) {
      this.triggerSpokenWelcome();
    }
    if (saveSelected && this.accessibilityPrefs.voice_enabled) this.initWakeWordDetection();
  }

  // --- Rendering ---

  private render(): void {
    if (!this.shadowRoot) return;

    this.setAttribute("data-contrast", this.highContrast ? "high" : "normal");
    this.setAttribute("data-size", this.textSize);
    this.setAttribute("dir", this.currentLang === "ar" ? "rtl" : "ltr");

    if (this.accessibilityPrefs?.keyboard_navigation) {
      this.classList.add("keyboard-focus-enhanced");
    } else {
      this.classList.remove("keyboard-focus-enhanced");
    }
    if (this.accessibilityPrefs?.screen_reader_mode) {
      this.classList.add("screen-reader-mode");
    } else {
      this.classList.remove("screen-reader-mode");
    }

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>

      <!-- Live Announcer -->
      <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true" style="position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); border:0;"></div>

      <!-- Floating Launcher Button with Wake Word Hint -->
      <button class="launcher" type="button" id="launcher-btn" accesskey="a" aria-keyshortcuts="Alt+Shift+A"
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog"
              aria-label="${this.t("launcherLabel")}. ${this.t("wakeHint")}">
        <span class="launcher-icon-badge" aria-hidden="true" style="display:inline-flex; align-items:center; justify-content:center; width:2rem; height:2rem; border-radius:50%; background:rgba(255,255,255,0.22); color:#ffffff; flex-shrink:0;">
          ${ICONS.launcher}
        </span>
        <div style="display:flex; flex-direction:column; align-items:flex-start; text-align:left; line-height:1.2;">
          <span style="color:#ffffff; font-weight:700;">${this.t("launcherLabel")}</span>
          <span style="font-size:0.8125rem; font-weight:500; color:#ffffff;">${this.t("wakeHint")}</span>
        </div>
      </button>

      <!-- Floating Autoplay Audio Permission Banner if closed -->
      ${!this.isOpen && this.showAutoplayBanner ? `
        <div class="voice-activation-banner" role="alert" style="position:fixed; bottom:5.5rem; right:1.5rem; max-width:320px; z-index:99999; box-shadow:0 8px 24px rgba(0,0,0,0.18);">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            ${ICONS.sound}
            <span>${this.t("oneTapVoiceActivation")}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.375rem; margin-top:0.375rem;">
            <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome-floating">
              ${this.t("voiceAccessibilityLabel")}
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner-floating" aria-label="Dismiss">
              ${ICONS.close}
            </button>
          </div>
        </div>
      ` : ""}

      <!-- Main Open Panel -->
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1" lang="${this.currentLang}" dir="${this.currentLang === "ar" ? "rtl" : "ltr"}" ${this.isOpen ? "" : "hidden"}>
        
        ${this.isOffline ? `<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>` : ""}

        <!-- Header -->
        <header class="header">
          <div class="header-top">
            <div class="header-titles">
              <span class="header-accessibility-icon" aria-hidden="true">
                ${ICONS.accessibility}
              </span>
              <h2 id="dialog-title" class="title" tabindex="-1">${this.t("appTitle")}</h2>
            </div>
            <div class="header-window-controls">
              <!-- Settings Button -->
              <button type="button" class="btn btn-secondary" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}" style="min-height:38px; min-width:38px; width:38px; height:38px; padding:0; display:inline-flex; align-items:center; justify-content:center;">
                ${ICONS.settings}
              </button>
              <!-- Close Button -->
              <button type="button" class="btn btn-secondary" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" style="min-height:38px; min-width:38px; width:38px; height:38px; padding:0; display:inline-flex; align-items:center; justify-content:center;">
                ${ICONS.close}
              </button>
            </div>
          </div>
          <div class="header-actions">
            <!-- 5-Language Segmented Selector in Native Scripts with WCAG 2.5.3 Compliant Labels -->
            <div class="lang-group" role="group" aria-label="Language selection">
              <button type="button" class="lang-toggle-btn lang-btn" id="btn-lang-en" 
                      aria-pressed="${this.currentLang === "en"}" 
                      aria-label="EN - English">EN</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-am" 
                      aria-pressed="${this.currentLang === "am"}" 
                      aria-label="አማ - አማርኛ (Amharic)">አማ</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-om" 
                      aria-pressed="${this.currentLang === "om"}" 
                      aria-label="OM - Afaan Oromoo">OM</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ti" 
                      aria-pressed="${this.currentLang === "ti"}" 
                      aria-label="ትግ - ትግርኛ (Tigrinya)">ትግ</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ar" 
                      aria-pressed="${this.currentLang === "ar"}" 
                      aria-label="عربي - العربية (Arabic)">عربي</button>
            </div>
          </div>
        </header>

        <!-- Navigation Tabs on Main Assistant Dialog -->
        <nav class="nav-tabs" role="tablist" aria-label="Assistant sections">
          <button type="button" class="tab-btn" id="tab-chat" role="tab" aria-selected="${this.activeTab === "chat"}" aria-controls="pane-chat">
            ${ICONS.launcher}
            <span>${this.t("chatTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-support" role="tab" aria-selected="${this.activeTab === "support"}" aria-controls="pane-support">
            ${ICONS.heart}
            <span>${this.t("supportTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-handoff" role="tab" aria-selected="${this.activeTab === "handoff"}" aria-controls="pane-handoff">
            ${ICONS.headphones}
            <span>${this.t("handoffTab")}</span>
          </button>
        </nav>

        <!-- Pane 1: Chat Message Stream & Footer -->
        <div id="pane-chat" class="tab-panel" role="tabpanel" ${this.activeTab === "chat" ? "" : "hidden"} style="${this.activeTab === "chat" ? "display:flex; flex-direction:column; flex:1; overflow:hidden;" : "display:none;"}">
          <!-- Voice Status Bar (Listening / Processing / Speaking) -->
          <div id="voice-status-container" aria-live="polite"></div>

          ${this.showAutoplayBanner ? `
            <div class="voice-activation-banner" role="alert" style="margin:0.5rem 1rem; padding:0.625rem 0.875rem; background:#eff6ff; border:1px solid #bfdbfe; border-radius:0.5rem; display:flex; align-items:center; justify-content:space-between; gap:0.5rem; font-size:0.8125rem; color:#1e40af;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                ${ICONS.sound}
                <span>${this.t("oneTapVoiceActivation")}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.375rem;">
                <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome">
                  ${this.t("voiceAccessibilityLabel")}
                </button>
                <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner" aria-label="Dismiss">
                  ${ICONS.close}
                </button>
              </div>
            </div>
          ` : ""}

          ${this.isReadingPage ? `
            <div class="reading-controls-bar" role="region" aria-label="${this.t("readingPageAnnouncement")}">
              <div class="reading-indicator">
                <span class="reading-pulse"></span>
                <span style="font-weight:600; font-size:0.8125rem; color:#065f46;">
                  ${this.isReadingPaused ? this.t("pauseReading") : this.t("readingPageAnnouncement")}
                </span>
              </div>
              <div class="reading-btns">
                ${this.isReadingPaused
                  ? `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-resume" aria-label="${this.t("resumeReading")}" title="${this.t("resumeReading")}">${ICONS.play}</button>`
                  : `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-pause" aria-label="${this.t("pauseReading")}" title="${this.t("pauseReading")}">${ICONS.pause}</button>`
                }
                <button type="button" class="btn btn-danger btn-icon-only" id="btn-reading-stop" aria-label="${this.t("stopReading")}" title="${this.t("stopReading")}" style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;">
                  ${ICONS.stop}
                </button>
              </div>
            </div>
          ` : ""}

          <!-- Body: Message List -->
          <div class="chat-log" id="chat-log" role="log" aria-live="polite">
            <!-- Populated by renderMessages() -->
          </div>

          <!-- Footer (Always Visible in Chat Tab) -->
          <footer class="footer">
            <!-- Top Row: Input, Mic, Send -->
            <form class="input-row" id="chat-form">
              <input type="text" class="text-input" id="chat-input" data-id="chat-input"
                     placeholder="${this.t("inputPlaceholder")}" 
                     aria-label="${this.t("inputPlaceholder")}" 
                     dir="${this.currentLang === "ar" ? "rtl" : "ltr"}"
                     required autocomplete="off">
              <button type="button" class="btn btn-secondary mic-btn btn-icon-only" id="mic-btn"
                      aria-label="${this.t("micLabel")}" title="${this.t("micLabel")}" aria-keyshortcuts="Alt+Shift+V">
                ${ICONS.mic}
              </button>
              <button type="submit" class="btn btn-primary" id="btn-send" data-id="btn-send" style="display:inline-flex; align-items:center; gap:0.375rem;">
                <span>${this.t("sendButton")}</span>
                ${ICONS.send}
              </button>
            </form>

            <!-- Bottom Row: Talk to a person & Continue on Telegram -->
            <div class="footer-actions-row">
              <button type="button" class="btn btn-secondary btn-footer btn-talk-person" id="btn-footer-handoff" style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${ICONS.user}
                <span>${this.t("talkToPersonButton")}</span>
              </button>
              <div id="telegram-container" class="telegram-section">
                <!-- Rendered by updateTelegramLinkUI() -->
              </div>
            </div>
            <!-- Space to enter / toggle link code -->
            <div id="link-code-container" class="link-code-section" style="width:100%;">
              <!-- Rendered by updateLinkCodeUI() -->
            </div>
          </footer>
        </div>

        <!-- Pane 2: Support Preferences (Zero Proof Required) -->
        <div id="pane-support" class="tab-panel" role="tabpanel" ${this.activeTab === "support" ? "" : "hidden"} style="${this.activeTab === "support" ? "display:block; overflow-y:auto; padding:1rem;" : "display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${ICONS.heart} <span>${this.t("supportNeedsTitle")}</span></div>
            <div class="settings-card-desc">
              ${this.t("supportZeroProof")}
            </div>

            <form id="support-form" style="display:flex; flex-direction:column; gap:0.625rem;">
              <label class="checkbox-card">
                <input type="checkbox" name="need" value="extra_time" 
                       ${this.supportNeeds.needs.includes("extra_time") ? "checked" : ""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needExtraTime")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="screen_reader_help" 
                       ${this.supportNeeds.needs.includes("screen_reader_help") ? "checked" : ""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needScreenReader")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="written_instructions" 
                       ${this.supportNeeds.needs.includes("written_instructions") ? "checked" : ""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needWritten")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="other" 
                       ${this.supportNeeds.needs.includes("other") || !!this.supportNeeds.other_text ? "checked" : ""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needOther")}</span>
                </div>
              </label>

              <textarea name="other_text" class="text-input" style="min-height:3.5rem; font-size:0.875rem;" 
                        placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text || ""}</textarea>

              <label style="font-size:0.875rem; font-weight:600; margin-top:0.25rem;">
                ${this.t("contactModeLabel")}
                <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:44px; font-size:0.875rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode === "text" ? "selected" : ""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode === "voice" ? "selected" : ""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode === "video" ? "selected" : ""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode === "telegram" ? "selected" : ""}>${this.t("modeTelegram")}</option>
                </select>
              </label>

              <div id="support-saved-notice" class="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600; display:inline-flex; align-items:center; gap:0.375rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; padding:0.5rem 0.75rem;">
                ${ICONS.check} <span>${this.t("supportSavedNotice")}</span>
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top:0.25rem;">
                ${this.t("saveSupportBtn")}
              </button>
            </form>
          </div>
        </div>

        <!-- Pane 3: Consented Live Help Handoff -->
        <div id="pane-handoff" class="tab-panel" role="tabpanel" ${this.activeTab === "handoff" ? "" : "hidden"} style="${this.activeTab === "handoff" ? "display:block; overflow-y:auto; padding:1rem;" : "display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${ICONS.headphones} <span>${this.t("handoffTab")}</span></div>
            <div class="settings-card-desc">
              ${this.t("appSubtitle")}
            </div>
            <form id="handoff-request-form" style="display:flex; flex-direction:column; gap:0.625rem;">
              <div id="handoff-consent-error" style="display:none; color:#dc2626; font-size:0.8125rem; font-weight:600; padding:0.375rem 0.5rem; background:#fee2e2; border:1px solid #fca5a5; border-radius:0.375rem;" role="alert"></div>
              <label class="checkbox-card">
                <input type="checkbox" id="handoff-consent" checked>
                <div class="checkbox-card-content">
                  <span style="font-size:0.8125rem;">${this.t("handoffConsentCheck")}</span>
                </div>
              </label>
              <label style="font-size:0.8125rem; font-weight:600;">
                ${this.t("handoffReasonLabel")}
                <input type="text" id="handoff-reason" class="text-input" style="margin-top:0.25rem;" 
                       placeholder="${this.t("handoffReasonPlaceholder")}">
              </label>
              <button type="submit" class="btn btn-primary" id="btn-submit-handoff" style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${ICONS.users} <span>${this.t("requestMentorBtn")}</span>
              </button>
            </form>
            <div id="handoff-room-box" style="margin-top:0.5rem;"></div>
          </div>
        </div>

        <!-- Settings Modal Overlay (Region) -->
        <div id="settings-dialog" class="settings-dialog" ${this.isSettingsOpen ? "" : "hidden"} role="region" aria-labelledby="settings-dialog-title">
          <div class="settings-header">
            <h3 id="settings-dialog-title" style="margin:0; font-size:1.125rem;">${this.t("settingsTitle")}</h3>
            <button type="button" class="btn btn-secondary" id="btn-close-settings">
              ${this.t("closeSettings")}
            </button>
          </div>

          <!-- General Display & Voice Settings Pane -->
          <div id="pane-general" class="settings-pane" style="overflow-y:auto; flex:1; padding:0.5rem 0;">
            <!-- Text Size Card -->
            <div class="settings-card">
              <div class="settings-card-title">${ICONS.type} <span>${this.t("textSizeLabel")}</span></div>
              <div class="size-btn-group">
                <button type="button" class="size-btn" id="btn-size-smaller" aria-pressed="${this.textSize === "smaller"}" aria-label="A- Smaller text">
                  A- <span>${this.t("textSmaller")}</span>
                </button>
                <button type="button" class="size-btn" id="btn-size-normal" aria-pressed="${this.textSize === "normal"}" aria-label="A Normal text">
                  A <span>${this.t("textNormal")}</span>
                </button>
                <button type="button" class="size-btn" id="btn-size-larger" aria-pressed="${this.textSize === "larger"}" aria-label="A+ Larger text">
                  A+ <span>${this.t("textLarger")}</span>
                </button>
              </div>
            </div>

            <!-- Accessibility Card -->
            <div class="settings-card">
              <div class="settings-card-title">${ICONS.contrast} <span>Display & Accessibility</span></div>
              
              <!-- High Contrast -->
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("highContrastLabel")}</span>
                  <span class="toggle-desc">High contrast color theme for enhanced visibility</span>
                </div>
                <input type="checkbox" id="chk-contrast" class="toggle-switch" aria-label="${this.t("highContrastLabel")}" ${this.highContrast ? "checked" : ""}>
              </label>

              <!-- Simple Mode -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("simpleModeLabel")}</span>
                  <span class="toggle-desc">${this.t("simpleModeDesc")}</span>
                </div>
                <input type="checkbox" id="chk-simple-mode" class="toggle-switch" aria-label="${this.t("simpleModeLabel")}" ${this.simpleMode ? "checked" : ""}>
              </label>

              <!-- Wake Word Voice Activation -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("wakeWordSetting")}</span>
                  <span class="toggle-desc">${this.t("wakeWordDesc")}</span>
                </div>
                <input type="checkbox" id="chk-wake-word" class="toggle-switch" ${this.voiceActivationEnabled ? "checked" : ""}>
              </label>
            </div>

            <!-- Voice Accessibility & Screen Reader Suite -->
            <div class="settings-card">
              <div class="settings-card-title">${ICONS.sound} <span>${this.t("voiceTab")}</span></div>

              <!-- Master Voice Toggle -->
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("voiceAccessibilityLabel")}</span>
                  <span class="toggle-desc">${this.t("voiceAccessibilityDesc")}</span>
                </div>
                <input type="checkbox" id="chk-voice-master" class="toggle-switch" aria-label="${this.t("voiceAccessibilityLabel")}" ${this.accessibilityPrefs.voice_enabled ? "checked" : ""}>
              </label>

              <!-- Spoken Welcome Announcement -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("autoWelcomeLabel")}</span>
                  <span class="toggle-desc">${this.t("autoWelcomeDesc")}</span>
                </div>
                <input type="checkbox" id="chk-auto-welcome" class="toggle-switch" aria-label="${this.t("autoWelcomeLabel")}" ${this.accessibilityPrefs.auto_welcome ? "checked" : ""}>
              </label>

              <!-- Auto TTS for AI Responses -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("autoTtsLabel")}</span>
                  <span class="toggle-desc">${this.t("autoTtsDesc")}</span>
                </div>
                <input type="checkbox" id="chk-auto-tts" class="toggle-switch" aria-label="${this.t("autoTtsLabel")}" ${this.accessibilityPrefs.auto_tts ? "checked" : ""}>
              </label>

              <!-- Speech Rate Selector -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="margin:0.25rem 0;">
                <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--b-text); margin-bottom:0.375rem;">
                  ${this.t("speechRateLabel")}
                </label>
                <div class="rate-btn-group" role="group" aria-label="${this.t("speechRateLabel")}">
                  <button type="button" class="rate-btn" id="btn-rate-075" aria-pressed="${this.accessibilityPrefs.speech_rate === 0.75}">0.75x</button>
                  <button type="button" class="rate-btn" id="btn-rate-100" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.0}">1.0x</button>
                  <button type="button" class="rate-btn" id="btn-rate-125" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.25}">1.25x</button>
                  <button type="button" class="rate-btn" id="btn-rate-150" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.5}">1.5x</button>
                </div>
              </div>

              <!-- Page Reading & Voice Test Buttons -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="display:flex; flex-direction:column; gap:0.375rem; margin-top:0.25rem;">
                <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                  <button type="button" class="btn btn-secondary" id="btn-read-page" style="flex:1; min-height:44px; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${ICONS.sound} <span>${this.t("readPageBtn")}</span>
                  </button>
                  <button type="button" class="btn btn-secondary" id="btn-read-section" style="flex:1; min-height:44px; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${ICONS.sound} <span>${this.t("readSectionBtn")}</span>
                  </button>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-test-voice" style="min-height:2rem; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                  ${ICONS.play} <span>${this.t("testVoiceBtn")}</span>
                </button>
              </div>

              <!-- Screen Reader & Enhanced Keyboard Navigation -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("screenReaderModeLabel")}</span>
                  <span class="toggle-desc">${this.t("screenReaderModeDesc")}</span>
                </div>
                <input type="checkbox" id="chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderModeLabel")}" ${this.accessibilityPrefs.screen_reader_mode ? "checked" : ""}>
              </label>

              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("keyboardNavLabel")}</span>
                  <span class="toggle-desc">${this.t("keyboardNavDesc")}</span>
                </div>
                <input type="checkbox" id="chk-keyboard-nav" class="toggle-switch" aria-label="${this.t("keyboardNavLabel")}" ${this.accessibilityPrefs.keyboard_navigation ? "checked" : ""}>
              </label>

              <!-- Cross-Site Preference Synchronization -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("syncPrefsLabel")}</span>
                  <span class="toggle-desc">${this.t("syncPrefsDesc")}</span>
                </div>
                <input type="checkbox" id="chk-sync-prefs" class="toggle-switch" aria-label="${this.t("syncPrefsLabel")}" ${this.accessibilityPrefs.sync_enabled ? "checked" : ""}>
              </label>

              <!-- Replay Onboarding Wizard -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <button type="button" class="btn btn-secondary" id="btn-replay-onboarding" style="width:100%; min-height:44px; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${ICONS.accessibility} <span>${this.t("onboardingReplay")}</span>
              </button>
            </div>

            <!-- Account & Telegram Linking Card -->
            <div class="settings-card" id="card-account-linking">
              <div class="settings-card-title">${ICONS.link} <span>${this.t("linkTab")}</span></div>
              <div class="settings-card-desc">
                ${this.t("supportZeroProof")}
              </div>

              ${this.isTelegramLinked ? `
                <div style="display:flex; align-items:center; justify-content:space-between; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; padding:0.625rem 0.75rem; margin-bottom:0.75rem;">
                  <span style="font-size:0.875rem; font-weight:600; color:#166534;">${this.t("connectedToTelegram")}</span>
                  <button type="button" class="btn btn-secondary btn-sm" id="btn-settings-disconnect-tg" style="font-size:0.75rem;">
                    ${this.t("disconnectTelegram")}
                  </button>
                </div>
              ` : `
                <!-- Enter Code from Telegram -->
                <form id="settings-code-form" style="margin-bottom:0.875rem;">
                  <label style="display:block; font-size:0.8125rem; font-weight:600; margin-bottom:0.375rem;">
                    ${this.t("enterCodeLabel")}
                  </label>
                  <div style="display:flex; gap:0.375rem;">
                    <input type="text" id="settings-input-code" class="text-input" placeholder="${this.t("codePlaceholder")}" maxlength="8" style="font-size:1rem; font-weight:700; letter-spacing:0.15em; text-align:center; flex:1;" required autocomplete="off" />
                    <button type="submit" class="btn btn-primary" id="btn-settings-submit-code" style="white-space:nowrap; padding:0 0.875rem;">
                      ${this.t("submitCodeBtn")}
                    </button>
                  </div>
                  <div id="settings-code-msg" style="font-size:0.75rem; font-weight:600; margin-top:0.375rem; display:none;"></div>
                </form>

                <div style="display:flex; align-items:center; gap:0.5rem; margin:0.75rem 0;">
                  <div style="flex:1; border-top:1px solid var(--b-border);"></div>
                  <span style="font-size:0.75rem; color:var(--b-text-muted); font-weight:600;">OR</span>
                  <div style="flex:1; border-top:1px solid var(--b-border);"></div>
                </div>

                <!-- Generate Code for Telegram -->
                <div>
                  <button type="button" class="btn btn-secondary" id="btn-generate-code" style="width:100%; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${ICONS.link} <span>${this.t("generateCodeBtn")}</span>
                  </button>
                  <div class="code-display" id="code-display" style="display:none; font-size:1.5rem; font-weight:700; letter-spacing:0.25em; text-align:center; padding:0.75rem; background:var(--b-surface-alt, #f8fafc); border:2px dashed var(--b-primary); border-radius:0.5rem; margin-top:0.625rem; color:var(--b-primary);">
                  </div>
                  <div id="code-instructions" style="display:none; font-size:0.75rem; color:var(--b-text-muted); text-align:center; margin-top:0.375rem;">
                    ${this.escapeHtml(this.t("codeInstructions"))}
                  </div>
                </div>
              `}
            </div>

            <!-- Clear Chat Card -->
            <div class="settings-card" style="border-color:#fecaca; background:#fff5f5;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:#991b1b;">${this.t("clearChatBtn")}</div>
                  <div style="font-size:0.75rem; color:#7f1d1d;">Reset conversation and erase stored history</div>
                </div>
                <button type="button" class="btn btn-danger" id="btn-clear-chat" style="font-size:0.8125rem; min-height:44px; padding:0.375rem 0.75rem;">
                  ${ICONS.trash} <span>${this.t("clearChatBtn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        ${this.renderOnboardingWizard()}

      </section>
    `;

    this.renderMessages();
    this.updateTelegramLinkUI();
    this.updateLinkCodeUI();
    this.updateVoiceStatusUI();
    this.bindEvents();
  }

  private renderMessages(): void {
    const chatLog = this.shadowRoot?.querySelector("#chat-log");
    if (!chatLog) return;

    // Onboarding is rendered as a full dialog overlay, not inside the scrolling chat log.
    const showOnboarding = false;
    const onboardHtml = showOnboarding ? `
      <div class="onboarding-card" id="onboarding-card" role="region" aria-labelledby="onboard-title" style="margin:0 0 1rem 0; padding:1rem; background:var(--b-surface); border:2px solid var(--b-primary); border-radius:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 id="onboard-title" style="margin:0; font-size:1rem; font-weight:700; color:var(--b-text); display:flex; align-items:center; gap:0.5rem;">
            ${ICONS.accessibility} <span>${this.t("onboardingTitle")}</span>
          </h3>
          <button type="button" class="btn btn-secondary btn-icon-only" id="btn-onboard-close" aria-label="${this.t("onboardingSkip")}" title="${this.t("onboardingSkip")}">
            ${ICONS.close}
          </button>
        </div>
        
        <p style="font-size:0.8125rem; color:var(--b-text-muted); margin:0 0 0.875rem 0; line-height:1.4;">
          ${this.t("onboardingSubtitle")}
        </p>

        <!-- Language Selection in Onboarding -->
        <div style="margin-bottom:0.875rem;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--b-text); margin-bottom:0.375rem;">
            ${this.t("onboardingLangPrompt")}
          </label>
          <div class="lang-group" role="group" aria-label="Language selection" style="width:100%; display:flex; justify-content:stretch;">
            <button type="button" class="lang-toggle-btn" id="onboard-lang-en" style="flex:1;" aria-pressed="${this.currentLang === "en"}" aria-label="EN - English">EN</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-am" style="flex:1;" aria-pressed="${this.currentLang === "am"}" aria-label="አማ - አማርኛ (Amharic)">አማ</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-om" style="flex:1;" aria-pressed="${this.currentLang === "om"}" aria-label="OM - Afaan Oromoo">OM</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-ti" style="flex:1;" aria-pressed="${this.currentLang === "ti"}" aria-label="ትግ - ትግርኛ (Tigrinya)">ትግ</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-ar" style="flex:1;" aria-pressed="${this.currentLang === "ar"}" aria-label="عربي - العربية (Arabic)">عربي</button>
          </div>
        </div>

        <!-- Options -->
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:0.875rem;">
          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title">${this.t("onboardingVoiceEnable")}</span>
              <span class="toggle-desc">${this.t("onboardingVoiceDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-voice" class="toggle-switch" aria-label="${this.t("onboardingVoiceEnable")}" ${this.accessibilityPrefs.voice_enabled ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title">${this.t("screenReaderModeLabel")}</span>
              <span class="toggle-desc">${this.t("screenReaderModeDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderModeLabel")}" ${this.accessibilityPrefs.screen_reader_mode ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title">${this.t("keyboardNavLabel")}</span>
              <span class="toggle-desc">${this.t("keyboardNavDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-keyboard-nav" class="toggle-switch" aria-label="${this.t("keyboardNavLabel")}" ${this.accessibilityPrefs.keyboard_navigation ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title">${this.t("highContrastLabel")}</span>
              <span class="toggle-desc">${this.t("highContrastLabel")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-contrast" class="toggle-switch" aria-label="${this.t("highContrastLabel")}" ${this.accessibilityPrefs.high_contrast ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title">${this.t("textLarger")}</span>
              <span class="toggle-desc">${this.t("textSizeLabel")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-large-text" class="toggle-switch" aria-label="${this.t("textLarger")}" ${this.accessibilityPrefs.large_text === "larger" ? "checked" : ""}>
          </label>
        </div>

        <div style="font-size:0.6875rem; color:var(--b-text-muted); margin-bottom:0.875rem; padding:0.375rem 0.5rem; background:#f1f5f9; border-radius:0.375rem; line-height:1.35;">
          ${this.t("onboardingMicExplain")}
        </div>

        <!-- Buttons -->
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:0.5rem;">
          <button type="button" class="btn btn-secondary" id="btn-spoken-onboarding">
            ${ICONS.sound} ${this.t("spokenSetup")}
          </button>
          <button type="button" class="btn btn-secondary" id="btn-onboard-skip">
            ${this.t("onboardingSkip")}
          </button>
          <button type="button" class="btn btn-primary" id="btn-onboard-save">
            ${this.t("onboardingSave")}
          </button>
        </div>
      </div>
    ` : "";

    if (this.messages.length === 0) {
      const sectionName = this.lastPageSection || "The Future of the VA Industry";
      chatLog.innerHTML = `
        ${onboardHtml}
        <div class="empty-state">
          <div class="page-context-pill">
            ${ICONS.book} <span>${this.t("pageContextBadge")} <strong>${this.escapeHtml(sectionName)}</strong></span>
          </div>
          <p style="margin:0 0 0.5rem 0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested btn-quick-explain" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.lightbulb} <span>${this.escapeHtml(this.t("explainLessonBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested btn-quick-summarize" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.book} <span>${this.escapeHtml(this.t("summarizePageBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested btn-quick-read" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.listen} <span>${this.escapeHtml(this.t("readPageBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ1"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ2"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${ICONS.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ3"))}</span>
            </button>
          </div>
        </div>
      `;

      chatLog.querySelector<HTMLButtonElement>(".btn-quick-explain")?.addEventListener("click", () => {
        this.askQuestion(this.t("explainLessonBtn"));
      });
      chatLog.querySelector<HTMLButtonElement>(".btn-quick-summarize")?.addEventListener("click", () => {
        this.askQuestion(this.t("summarizePageBtn"));
      });
      chatLog.querySelector<HTMLButtonElement>(".btn-quick-read")?.addEventListener("click", () => {
        this.askQuestion(this.t("readPageBtn"));
      });
      chatLog.querySelectorAll<HTMLButtonElement>(".btn-suggested[data-q]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const q = btn.getAttribute("data-q");
          if (q) this.askQuestion(q);
        });
      });
      return;
    }

    chatLog.innerHTML = onboardHtml + this.messages
      .map((msg) => {
        if (msg.sender === "learner") {
          return `
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(msg.text)}</p>
            </div>
          `;
        }

        // Assistant Message Card
        const uniqueCitations: Citation[] = [];
        const seenCit = new Set<string>();
        if (msg.citations) {
          for (const cit of msg.citations) {
            const rawLabel = cit.title || cit.heading || "";
            const label = rawLabel.replace(/\s*\|\s*.*$/, "").replace(/^Concept page:\s*/i, "").trim();
            if (label && !seenCit.has(label)) {
              seenCit.add(label);
              uniqueCitations.push({ ...cit, title: label });
            }
          }
        }
        const hasCitations = uniqueCitations.length > 0;
        const isRefusal = !!msg.isRefusal;
        const headingText = msg.heading || (msg.isHandoff ? this.t("handoffReadyTitle") : this.t("answerHeading"));
        const isThisReading = !!(this.currentReading && this.currentReading.msgId === msg.id);

        const paragraphs = msg.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
        const renderedTextHtml = paragraphs
          .map((p, idx) => {
            const isActive = isThisReading && this.currentReading!.currentIndex === idx;
            return `<div class="answer-para-item ${isActive ? "active-reading-para" : ""}" data-msg-id="${msg.id}" data-idx="${idx}" title="Click to read and highlight this paragraph" style="cursor:pointer; margin-bottom:0.625rem; line-height:1.5;">${this.escapeHtml(p)}</div>`;
          })
          .join("");

        return `
          <div class="msg-row msg-assistant" id="${msg.id}">
            <h4 class="answer-heading">${this.escapeHtml(headingText)}</h4>
            <div class="answer-text">${renderedTextHtml}</div>

            ${
              msg.isHandoff
                ? `
                <div class="handoff-card" style="margin-top:0.75rem; padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem;">
                  <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                    ${ICONS.celebrate} <span>${this.t("handoffReadyTitle")}</span>
                  </p>
                  <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <a href="${this.escapeHtml(msg.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" id="btn-join-room-card" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${ICONS.video} <span>${this.t("joinRoomButton")}</span>
                    </a>
                    <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(msg.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${ICONS.copy} <span>${this.t("copyRoomBtn")}</span>
                    </button>
                  </div>
                </div>
              `
                : ""
            }

            ${isRefusal
            ? `
                <div class="not-verified-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${msg.id}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${ICONS.user} <span>${this.t("talkToPersonButton")}</span>
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:44px;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              `
            : ""
          }

            <!-- Listen, Stop, Replay & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${msg.id}">
                ${msg.isAudioPlaying ? `${ICONS.pause} <span>${this.t("pauseButton")}</span>` : `${ICONS.sound} <span>${this.t("listenButton")}</span>`}
              </button>
              ${
                msg.spoken && msg.text && msg.spoken.trim() !== msg.text.trim()
                  ? `
                <button type="button" class="btn btn-secondary btn-read-full" data-msg-id="${msg.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                  ${ICONS.sound} <span>${this.t("readFullAnswer")}</span>
                </button>
              `
                  : ""
              }
              <button type="button" class="btn btn-secondary btn-stop" data-msg-id="${msg.id}" style="display:inline-flex; align-items:center; gap:0.375rem;" ${msg.isAudioPlaying || msg.isAudioPaused ? "" : "hidden"}>
                ${ICONS.stop}
                <span>${this.t("stopButton")}</span>
              </button>
              <button type="button" class="btn btn-secondary btn-replay" data-msg-id="${msg.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${ICONS.replay}
                <span>${this.t("replayButton")}</span>
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${msg.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${ICONS.lightbulb}
                <span>${this.t("makeSimplerButton")}</span>
              </button>
              ${msg.isAudioPlaying ? `<span class="speaking-indicator-pill" role="status" aria-live="polite">${ICONS.volume} <span>${this.t("speakingIndicator")}</span></span>` : ""}
            </div>

            <!-- Citations / Sources with readable names -->
            ${hasCitations
            ? `
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${(msg.citations || [])
                    .filter((c, idx, arr) => arr.findIndex((x) => x.url === c.url) === idx)
                    .map(
                      (c) => `
                    <a href="${this.escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="source-link citation-link" style="display:inline-flex; align-items:center; gap:0.375rem;">
                      ${ICONS.book} <span>${this.escapeHtml(c.title || c.heading)}</span>
                    </a>
                  `
                    )
                    .join("")}
                </div>
              `
                : ""
            }

            <!-- Suggested Follow-up Questions -->
            ${
              !isRefusal && !msg.isHandoff
                ? `
                <div class="followup-box">
                  <div class="followup-title">
                    <span>${this.t("followupTitle")}</span>
                  </div>
                  <div class="followup-chips">
                    <button type="button" class="btn btn-secondary btn-followup" data-query="${this.escapeHtml(this.t("followupQ1"))}" ${this.isThinking ? "disabled" : ""}>
                      ${this.t("followupQ1")}
                    </button>
                    <button type="button" class="btn btn-secondary btn-followup" data-query="${this.escapeHtml(this.t("followupQ2"))}" ${this.isThinking ? "disabled" : ""}>
                      ${this.t("followupQ2")}
                    </button>
                    <button type="button" class="btn btn-secondary btn-followup" data-query="${this.escapeHtml(this.t("followupQ3"))}" ${this.isThinking ? "disabled" : ""}>
                      ${this.t("followupQ3")}
                    </button>
                  </div>
                </div>
              `
                : ""
            }
          </div>
        `;
      })
      .join("");

    if (this.isThinking) {
      chatLog.innerHTML += `
        <div class="live-status-indicator">
          <span>${this.t("lookingInCourse")}</span>
        </div>
      `;
    }

    if (this.isRecording) {
      chatLog.innerHTML += `
        <div class="live-status-indicator" style="display:inline-flex; align-items:center; gap:0.375rem;">
          <span class="listening-indicator-pill">${ICONS.mic} <span>${this.t("listeningIndicator")}</span></span>
        </div>
      `;
    }

    // Attach listeners for dynamic answer buttons
    chatLog.querySelectorAll<HTMLElement>(".answer-para-item").forEach((el) => {
      el.addEventListener("click", () => {
        const msgId = el.getAttribute("data-msg-id");
        const idx = parseInt(el.getAttribute("data-idx") || "0", 10);
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) {
          this.startSequentialReading(msg, idx);
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-prev-para").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg && this.currentReading && this.currentReading.currentIndex > 0) {
          this.currentReading.currentIndex--;
          this.playNextReadingItem(msg);
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-next-para").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg && this.currentReading && this.currentReading.currentIndex < this.currentReading.items.length - 1) {
          this.currentReading.currentIndex++;
          this.playNextReadingItem(msg);
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-listen").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) {
          if (msg.isAudioPlaying) {
            this.stopSpeaking();
          } else {
            this.speakResponse(msg);
          }
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-read-full").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) {
          if (msg.isAudioPlaying) {
            this.stopSpeaking();
          } else {
            this.speakResponse(msg, true);
          }
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-stop").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) this.handleStop(msg);
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-replay").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) this.handleReplay(msg);
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-simpler").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) this.askQuestion(`Explain simpler: ${msg.text}`, true);
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-followup").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const query = btn.getAttribute("data-query") || btn.textContent?.trim();
        if (query) {
          this.askQuestion(query);
        }
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-talk-person").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        this.requestHandoff(msg ? `Refusal regarding question: ${msg.text}` : undefined);
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-try-another").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (input) {
          input.value = "";
          input.focus();
        }
      });
    });

    chatLog.scrollTop = chatLog.scrollHeight;
    setTimeout(() => {
      chatLog.scrollTop = chatLog.scrollHeight;
    }, 40);
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    const launcher = this.shadowRoot.querySelector<HTMLButtonElement>("#launcher-btn")!;
    const dialog = this.shadowRoot.querySelector<HTMLElement>("#assistant-dialog")!;
    const closeBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-close-dialog")!;
    const openSettingsBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-open-settings")!;
    const closeSettingsBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-close-settings")!;

    // Open/Close Dialog
    launcher.addEventListener("click", () => {
      if (this.isOpen) {
        this.closeAssistant();
      } else {
        this.previousFocus = launcher;
        this.openAssistant();
      }
    });

    closeBtn.addEventListener("click", () => this.closeAssistant());

    dialog.addEventListener("focusin", (event) => {
      const target = event.target as HTMLElement | null;
      target?.scrollIntoView({ block: "nearest", inline: "nearest" });
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.isSettingsOpen) {
          this.isSettingsOpen = false;
          const settingsDialog = this.shadowRoot?.querySelector("#settings-dialog");
          if (settingsDialog) settingsDialog.setAttribute("hidden", "true");
        } else {
          this.closeAssistant();
        }
      }

      if (e.key === "Tab") {
        const onboarding = this.shadowRoot?.querySelector<HTMLElement>("#onboarding-overlay");
        const settings = this.shadowRoot?.querySelector<HTMLElement>("#settings-dialog:not([hidden])");
        const scope = onboarding || settings || dialog;
        const focusable = Array.from(
          scope.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => element.getClientRects().length > 0);

        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = this.shadowRoot?.activeElement;
          if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // 5-Language Switcher (en, am, om, ti, ar)
    this.shadowRoot.querySelectorAll<HTMLButtonElement>(".lang-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const langCode = btn.id.replace(/^btn-lang-|^onboard-lang-/, "") as SupportedLanguage;
        if (langCode && ["en", "am", "om", "ti", "ar"].includes(langCode)) {
          this.setLanguage(langCode);
        }
      });
    });

    // Settings Modal
    openSettingsBtn.addEventListener("click", () => {
      this.isSettingsOpen = true;
      const settingsDialog = this.shadowRoot?.querySelector("#settings-dialog");
      if (settingsDialog) {
        settingsDialog.removeAttribute("hidden");
        const focusable = settingsDialog.querySelector<HTMLElement>("button, input");
        if (focusable) focusable.focus();
      }
    });

    closeSettingsBtn.addEventListener("click", () => {
      this.isSettingsOpen = false;
      const settingsDialog = this.shadowRoot?.querySelector("#settings-dialog");
      if (settingsDialog) settingsDialog.setAttribute("hidden", "true");
      openSettingsBtn.focus();
    });

    // Main Navigation Tabs Switching (Chat, Support, Handoff)
    const mainTabs = [
      { id: "chat", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-chat"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-chat") },
      { id: "support", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-support"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-support") },
      { id: "handoff", btn: this.shadowRoot.querySelector<HTMLButtonElement>("#tab-handoff"), pane: this.shadowRoot.querySelector<HTMLElement>("#pane-handoff") },
    ];

    const switchMainTab = (index: number) => {
      this.switchTab(mainTabs[index].id as "chat" | "support" | "handoff");
    };

    mainTabs.forEach(({ btn }, idx) => {
      btn?.addEventListener("click", () => switchMainTab(idx));
      btn?.addEventListener("keydown", (e: Event) => {
        const evt = e as KeyboardEvent;
        if (evt.key === "ArrowRight") {
          evt.preventDefault();
          switchMainTab((idx + 1) % mainTabs.length);
        } else if (evt.key === "ArrowLeft") {
          evt.preventDefault();
          switchMainTab((idx - 1 + mainTabs.length) % mainTabs.length);
        }
      });
    });

    // Talk to a person button switches to handoff tab
    this.shadowRoot.querySelectorAll<HTMLButtonElement>(".btn-talk-person, #btn-footer-handoff").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchTab("handoff");
      });
    });

    // Text Size Settings
    this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click", () => {
      this.textSize = "smaller";
      localStorage.setItem("savanna_bridge_text_size", "smaller");
      this.render();
    });
    this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click", () => {
      this.textSize = "normal";
      localStorage.setItem("savanna_bridge_text_size", "normal");
      this.render();
    });
    this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click", () => {
      this.textSize = "larger";
      localStorage.setItem("savanna_bridge_text_size", "larger");
      this.render();
    });

    // Contrast Toggle
    const chkContrast = this.shadowRoot.querySelector<HTMLInputElement>("#chk-contrast");
    if (chkContrast) {
      chkContrast.addEventListener("change", () => {
        this.highContrast = chkContrast.checked;
        localStorage.setItem("savanna_bridge_contrast", this.highContrast ? "high" : "normal");
        this.render();
      });
    }

    // Simple Mode Toggle
    const chkSimple = this.shadowRoot.querySelector<HTMLInputElement>("#chk-simple-mode");
    if (chkSimple) {
      chkSimple.addEventListener("change", () => {
        this.simpleMode = chkSimple.checked;
      });
    }

    // Auto-read Speech Toggle
    const chkAutoRead = this.shadowRoot.querySelector<HTMLInputElement>("#chk-auto-read");
    if (chkAutoRead) {
      chkAutoRead.addEventListener("change", () => {
        this.autoReadSpeech = chkAutoRead.checked;
        localStorage.setItem("savanna_bridge_auto_read", this.autoReadSpeech ? "true" : "false");
        if (!this.autoReadSpeech && this.isSpeaking) {
          this.stopSpeaking();
        }
      });
    }

    // Wake Word Toggle
    const chkWakeWord = this.shadowRoot.querySelector<HTMLInputElement>("#chk-wake-word");
    if (chkWakeWord) {
      chkWakeWord.addEventListener("change", () => {
        this.voiceActivationEnabled = chkWakeWord.checked;
        localStorage.setItem("savanna_bridge_wake_word", this.voiceActivationEnabled ? "true" : "false");
        if (this.voiceActivationEnabled) {
          this.setupWakeWordDetector();
        } else if (this.wakeWordRecognition) {
          try {
            this.wakeWordRecognition.stop();
          } catch {}
          this.wakeWordRecognition = null;
        }
      });
    }

    // Settings Code Form
    const settingsCodeForm = this.shadowRoot.querySelector<HTMLFormElement>("#settings-code-form");
    if (settingsCodeForm) {
      settingsCodeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = this.shadowRoot?.querySelector<HTMLInputElement>("#settings-input-code");
        const msg = this.shadowRoot?.querySelector<HTMLElement>("#settings-code-msg");
        if (input && input.value) {
          this.confirmLinkCode(input.value, msg);
        }
      });
    }

    // Settings Disconnect Telegram
    this.shadowRoot.querySelector("#btn-settings-disconnect-tg")?.addEventListener("click", () => {
      this.disconnectTelegram();
    });

    // Clear Chat Button
    this.shadowRoot.querySelector("#btn-clear-chat")?.addEventListener("click", () => {
      this.clearChat();
    });

    // Generate Link Code Button
    this.shadowRoot.querySelector("#btn-generate-code")?.addEventListener("click", () => {
      this.generateLinkCode();
    });

    // Handoff Request Form & Button
    const settingsHandoffForm = this.shadowRoot.querySelector<HTMLFormElement>("#handoff-request-form");
    const submitHandoffBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-submit-handoff");
    const triggerHandoff = (e?: Event) => {
      if (e) e.preventDefault();
      const reasonInput = this.shadowRoot?.querySelector<HTMLInputElement>("#handoff-reason");
      this.requestHandoff(reasonInput?.value || undefined);
    };
    if (settingsHandoffForm) {
      settingsHandoffForm.addEventListener("submit", triggerHandoff);
    }
    if (submitHandoffBtn) {
      submitHandoffBtn.addEventListener("click", (e) => {
        triggerHandoff(e);
      });
    }

    // Chat Log Event Delegation (for suggested and follow-up chips)
    const chatLogEl = this.shadowRoot.querySelector<HTMLElement>("#chat-log");
    if (chatLogEl) {
      chatLogEl.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        // Follow-up question chip
        const followupBtn = target.closest<HTMLButtonElement>(".btn-followup");
        if (followupBtn) {
          e.preventDefault();
          const query = followupBtn.getAttribute("data-query") || followupBtn.textContent?.trim();
          if (query) {
            this.askQuestion(query);
          }
          return;
        }

        // Suggested question in empty state
        const suggestedBtn = target.closest<HTMLButtonElement>(".btn-suggested");
        if (suggestedBtn) {
          e.preventDefault();
          const q = suggestedBtn.getAttribute("data-q") || suggestedBtn.textContent?.trim();
          if (q) {
            this.askQuestion(q);
          }
          return;
        }

        // Quick action buttons in empty state
        if (target.closest(".btn-quick-explain")) {
          e.preventDefault();
          this.askQuestion(this.t("explainLessonBtn"));
          return;
        }
        if (target.closest(".btn-quick-summarize")) {
          e.preventDefault();
          this.askQuestion(this.t("summarizePageBtn"));
          return;
        }
        if (target.closest(".btn-quick-read")) {
          e.preventDefault();
          this.askQuestion(this.t("readPageBtn"));
          return;
        }
      });
    }

    // Support Form
    const supportForm = this.shadowRoot.querySelector<HTMLFormElement>("#support-form");
    if (supportForm) {
      supportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(supportForm);
        const selectedNeeds = data.getAll("need") as string[];
        const otherText = (data.get("other_text") as string) || "";
        const contactMode = (data.get("contact_mode") as "text" | "voice" | "video" | "telegram") || "text";
        this.saveSupportNeeds(selectedNeeds, otherText, contactMode);
      });
    }

    // Chat Form Submit
    const chatForm = this.shadowRoot.querySelector<HTMLFormElement>("#chat-form");
    const chatInput = this.shadowRoot.querySelector<HTMLInputElement>("#chat-input");
    const micBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#mic-btn");

    if (chatForm && chatInput) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value;
        chatInput.value = "";
        this.askQuestion(text);
      });
    }

    if (micBtn && chatInput) {
      micBtn.addEventListener("click", () => {
        this.toggleVoiceInput(chatInput);
      });
    }

    // Autoplay Voice Activation Handlers
    const handleActivateVoice = () => {
      this.showAutoplayBanner = false;
      this.accessibilityPrefs.voice_enabled = true;
      this.savePreferences();
      this.announce(this.t("voiceWelcomeAnnouncement"));
      this.triggerSpokenWelcome();
      this.render();
    };
    this.shadowRoot.querySelector("#btn-activate-voice-welcome")?.addEventListener("click", handleActivateVoice);
    this.shadowRoot.querySelector("#btn-activate-voice-welcome-floating")?.addEventListener("click", handleActivateVoice);

    const handleDismissVoiceBanner = () => {
      this.showAutoplayBanner = false;
      this.render();
    };
    this.shadowRoot.querySelector("#btn-dismiss-voice-banner")?.addEventListener("click", handleDismissVoiceBanner);
    this.shadowRoot.querySelector("#btn-dismiss-voice-banner-floating")?.addEventListener("click", handleDismissVoiceBanner);

    // Reading Aloud In-Progress Controls
    this.shadowRoot.querySelector("#btn-reading-pause")?.addEventListener("click", () => this.pausePageReading());
    this.shadowRoot.querySelector("#btn-reading-resume")?.addEventListener("click", () => this.resumePageReading());
    this.shadowRoot.querySelector("#btn-reading-stop")?.addEventListener("click", () => this.stopPageReading());

    // First-Time Accessible Onboarding Wizard Handlers
    const onboardLangCodes: SupportedLanguage[] = ["en", "am", "om", "ti", "ar"];
    onboardLangCodes.forEach((l) => {
      this.shadowRoot?.querySelector(`#onboard-lang-${l}`)?.addEventListener("click", () => {
        this.setLanguage(l);
      });
    });

    this.shadowRoot.querySelector("#btn-spoken-onboarding")?.addEventListener("click", () => {
      this.startSpokenOnboarding();
    });

    this.shadowRoot.querySelector("#btn-onboard-next")?.addEventListener("click", () => {
      this.captureOnboardingStep();
      this.onboardingStep = Math.min(3, this.onboardingStep + 1);
      this.render();
      setTimeout(() => this.shadowRoot?.querySelector<HTMLElement>("#onboard-title")?.focus(), 0);
    });
    this.shadowRoot.querySelector("#btn-onboard-back")?.addEventListener("click", () => {
      this.captureOnboardingStep();
      this.onboardingStep = Math.max(0, this.onboardingStep - 1);
      this.render();
    });
    this.shadowRoot.querySelector("#btn-onboard-save")?.addEventListener("click", () => this.completeOnboarding(true));
    this.shadowRoot.querySelector("#btn-onboard-skip")?.addEventListener("click", () => this.completeOnboarding(false));
    this.shadowRoot.querySelector("#btn-onboard-close")?.addEventListener("click", () => this.completeOnboarding(false));

    // Voice Accessibility Settings (Settings Modal -> Display & Accessibility Pane)
    const chkVoiceMaster = this.shadowRoot.querySelector<HTMLInputElement>("#chk-voice-master");
    if (chkVoiceMaster) {
      chkVoiceMaster.addEventListener("change", () => {
        this.accessibilityPrefs.voice_enabled = chkVoiceMaster.checked;
        this.savePreferences();
        if (chkVoiceMaster.checked) {
          this.initWakeWordDetection();
        } else if (this.wakeWordRecognizer) {
          try { this.wakeWordRecognizer.stop(); } catch {}
          this.wakeWordRecognizer = null;
        }
        this.announce(chkVoiceMaster.checked ? "Voice accessibility enabled" : "Voice accessibility disabled");
      });
    }

    const chkAutoWelcome = this.shadowRoot.querySelector<HTMLInputElement>("#chk-auto-welcome");
    if (chkAutoWelcome) {
      chkAutoWelcome.addEventListener("change", () => {
        this.accessibilityPrefs.auto_welcome = chkAutoWelcome.checked;
        this.savePreferences();
      });
    }

    const chkAutoTts = this.shadowRoot.querySelector<HTMLInputElement>("#chk-auto-tts");
    if (chkAutoTts) {
      chkAutoTts.addEventListener("change", () => {
        this.accessibilityPrefs.auto_tts = chkAutoTts.checked;
        this.savePreferences();
      });
    }

    const rateList: { id: string; rate: number }[] = [
      { id: "#btn-rate-075", rate: 0.75 },
      { id: "#btn-rate-100", rate: 1.0 },
      { id: "#btn-rate-125", rate: 1.25 },
      { id: "#btn-rate-150", rate: 1.5 },
    ];
    rateList.forEach(({ id, rate }) => {
      this.shadowRoot?.querySelector(id)?.addEventListener("click", () => {
        this.accessibilityPrefs.speech_rate = rate;
        if (this.activeAudio) {
          this.activeAudio.playbackRate = rate;
          (this.activeAudio as any).preservesPitch = true;
          (this.activeAudio as any).mozPreservesPitch = true;
          (this.activeAudio as any).webkitPreservesPitch = true;
        }
        this.savePreferences();
        rateList.forEach((r) => {
          this.shadowRoot?.querySelector(r.id)?.setAttribute("aria-pressed", r.rate === rate ? "true" : "false");
        });
        this.announce(`Speech rate set to ${rate}x`);
      });
    });

    this.shadowRoot.querySelector("#btn-read-page")?.addEventListener("click", () => this.readPageAloud());
    this.shadowRoot.querySelector("#btn-read-section")?.addEventListener("click", () => this.readSectionAloud());
    this.shadowRoot.querySelector("#btn-test-voice")?.addEventListener("click", () => {
      this.speakText(this.t("voiceWelcomeAnnouncement"));
    });

    const chkScreenReader = this.shadowRoot.querySelector<HTMLInputElement>("#chk-screen-reader");
    if (chkScreenReader) {
      chkScreenReader.addEventListener("change", () => {
        this.accessibilityPrefs.screen_reader_mode = chkScreenReader.checked;
        if (chkScreenReader.checked) {
          this.accessibilityPrefs.auto_tts = false;
          this.autoReadSpeech = false;
          localStorage.setItem("savanna_bridge_auto_read", "false");
          this.stopSpeaking();
        }
        this.savePreferences();
        this.announce(chkScreenReader.checked ? "Screen reader mode enabled" : "Screen reader mode disabled");
      });
    }

    const chkKeyboardNav = this.shadowRoot.querySelector<HTMLInputElement>("#chk-keyboard-nav");
    if (chkKeyboardNav) {
      chkKeyboardNav.addEventListener("change", () => {
        this.accessibilityPrefs.keyboard_navigation = chkKeyboardNav.checked;
        this.savePreferences();
        if (chkKeyboardNav.checked) {
          this.classList.add("keyboard-focus-enhanced");
        } else {
          this.classList.remove("keyboard-focus-enhanced");
        }
        this.announce(chkKeyboardNav.checked ? "Enhanced keyboard navigation enabled" : "Enhanced keyboard navigation disabled");
      });
    }

    const chkSyncPrefs = this.shadowRoot.querySelector<HTMLInputElement>("#chk-sync-prefs");
    if (chkSyncPrefs) {
      chkSyncPrefs.addEventListener("change", () => {
        this.accessibilityPrefs.sync_enabled = chkSyncPrefs.checked;
        this.savePreferences();
        if (chkSyncPrefs.checked) {
          this.syncPreferencesToBackend();
          this.announce("Cross-website synchronization enabled");
        } else {
          this.announce("Cross-website synchronization disabled");
        }
      });
    }

    this.shadowRoot.querySelector("#btn-replay-onboarding")?.addEventListener("click", () => {
      this.accessibilityPrefs.onboarded = false;
      this.onboardingDismissed = false;
      this.onboardingStep = 0;
      this.isSettingsOpen = false;
      this.render();
    });


  }

  private escapeHtml(text: string): string {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Register both custom elements for full compatibility across systems
if (!customElements.get("bridge-assistant")) {
  customElements.define("bridge-assistant", BridgeAssistant);
}
if (!customElements.get("db-assistant")) {
  class DBAssistant extends BridgeAssistant {}
  customElements.define("db-assistant", DBAssistant);
}
