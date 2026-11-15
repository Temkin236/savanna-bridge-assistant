var I = Object.defineProperty;
var D = (v, m, e) => m in v ? I(v, m, { enumerable: !0, configurable: !0, writable: !0, value: e }) : v[m] = e;
var c = (v, m, e) => D(v, typeof m != "symbol" ? m + "" : m, e);
const o = {
  launcher: '<svg class="icon-inline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="7.2" r="1.5" fill="currentColor"></circle><path d="M5.5 10.5h13"></path><path d="M12 10.5v4"></path><path d="M12 14.5l-2.8 5"></path><path d="M12 14.5l2.8 5"></path></svg>',
  accessibility: '<svg class="icon-inline" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="7.2" r="1.5" fill="currentColor"></circle><path d="M5.5 10.5h13"></path><path d="M12 10.5v4"></path><path d="M12 14.5l-2.8 5"></path><path d="M12 14.5l2.8 5"></path></svg>',
  chat: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  settings: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
  close: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  mic: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
  send: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
  user: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  users: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  video: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
  copy: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  check: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  trash: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
  key: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-3 3L8 9 5 12l3 3 4.5-4.5"></path><circle cx="7.5" cy="16.5" r="4.5"></circle></svg>',
  listen: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
  pause: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
  lightbulb: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>',
  book: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
  arrowRight: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  spinner: '<svg class="icon-inline spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
  celebrate: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  telegram: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
  sliders: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>',
  heart: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
  link: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
  headphones: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
  type: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
  contrast: '<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg>',
  sound: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
  volumeMute: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',
  play: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
  stop: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect></svg>',
  speed: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  sync: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>',
  sparkles: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>'
}, f = {
  en: {
    appTitle: "Savanna Bridge Assistant",
    appSubtitle: "Ask questions, adjust support, or connect with a mentor",
    closeLabel: "Close dialog",
    launcherLabel: "Accessibility & Assistant",
    wakeHint: "Tap or press Alt+A to open",
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
    pauseButton: "Stop",
    replayButton: "Replay",
    makeSimplerButton: "Make simpler",
    sourcesTitle: "Course sources:",
    talkToPersonButton: "Talk to a person",
    continueOnTelegram: "Continue on Telegram",
    continueOnTelegramAria: "Continue on Telegram (opens Telegram)",
    telegramPrivacyNotice: "Telegram will receive your questions and the answers.",
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
    voiceTab: "Voice & Audio"
  },
  am: {
    appTitle: "የሳቫና ብሪጅ ረዳት",
    appSubtitle: "ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",
    closeLabel: "መስኮቱን ዝጋ",
    launcherLabel: "ተደራሽነት እና ረዳት",
    wakeHint: "ይንኩ ወይም Alt+A ን ይጫኑ",
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
    pauseButton: "አቁም",
    replayButton: "እንደገና አጫውት",
    makeSimplerButton: "ቀለል አድርግ",
    sourcesTitle: "የኮርስ ምንጮች፡",
    talkToPersonButton: "ከሰው ጋር ተነጋገር",
    continueOnTelegram: "በቴሌግራም ቀጥል",
    continueOnTelegramAria: "በቴሌግራም ቀጥል (ቴሌግራምን ይከፍታል)",
    telegramPrivacyNotice: "ቴሌግራም ጥያቄዎችዎን እና መልሶቹን ይቀበላል።",
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
    voiceTab: "ድምጽ እና ማዳመጥ"
  },
  om: {
    appTitle: "Gargaaraa Savanna Bridge",
    appSubtitle: "Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",
    closeLabel: "Cufi",
    launcherLabel: "Qaqqabummaa & Deeggarsa",
    wakeHint: "Tuqaa ykn Alt+A dhiibaa",
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
    pauseButton: "Dhaabi",
    replayButton: "Irra deebi'i",
    makeSimplerButton: "Salphisi",
    sourcesTitle: "Madda barnootaa:",
    talkToPersonButton: "Nama waliin dubbadhu",
    continueOnTelegram: "Telegiraamiin Itti fufi",
    continueOnTelegramAria: "Telegiraamiin Itti fufi (Telegiraamii bana)",
    telegramPrivacyNotice: "Telegiraam gaaffii fi deebii keessan ni fudhata.",
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
    voiceTab: "Sagalee & Dhaggeeffannaa"
  },
  ti: {
    appTitle: "ናይ ሳቫና ብሪጅ ሓጋዚ",
    appSubtitle: "ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",
    closeLabel: "ዕጾ",
    launcherLabel: "ተበጻሕነት & ሓጋዚ",
    wakeHint: "ንከፉ ወይ Alt+A ጸቕጡ",
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
    pauseButton: "ኣዕርፍ",
    replayButton: "ደጊምካ ስማዕ",
    makeSimplerButton: "ቀሊል ግበሮ",
    sourcesTitle: "ምንጭታት ኮርስ፡",
    talkToPersonButton: "ምስ ሰብ ተዛረብ",
    continueOnTelegram: "ብቴሌግራም ቀጽል",
    continueOnTelegramAria: "ብቴሌግራም ቀጽል (ቴሌግራም ይኸፍት)",
    telegramPrivacyNotice: "ቴሌግራም ሕቶኹምን መልስኹምን ይቕበል እዩ።",
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
    voiceTab: "ድምጽን ምስማዕን"
  },
  ar: {
    appTitle: "مساعد سافانا بريدج",
    appSubtitle: "اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",
    closeLabel: "إغلاق النافذة",
    launcherLabel: "إمكانية الوصول والمساعد",
    wakeHint: "انقر أو اضغط Alt+A للفتح",
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
    pauseButton: "إيقاف",
    replayButton: "إعادة",
    makeSimplerButton: "تبسيط الشرح",
    sourcesTitle: "مصادر الدورة:",
    talkToPersonButton: "التحدث مع شخص",
    continueOnTelegram: "المتابعة عبر تيليجرام",
    continueOnTelegramAria: "المتابعة عبر تيليجرام (يفتح تيليجرام)",
    telegramPrivacyNotice: "سيتلقى تيليجرام أسئلتك وإجاباتها.",
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
    voiceTab: "الصوت والقراءة"
  }
}, V = `
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
    --b-focus: #b91c1c;
    --b-radius: 0.75rem;
    --b-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    font-family: var(--b-font);
    font-size: 1rem;
    line-height: 1.5;
    box-sizing: border-box;
    color: var(--b-text);
  }

  :host([data-size="smaller"]) { font-size: 0.875rem; }
  :host([data-size="normal"]) { font-size: 1rem; }
  :host([data-size="larger"]) { font-size: 1.15rem; }

  :host([data-contrast="high"]) {
    --b-bg: #000000;
    --b-text: #ffffff;
    --b-text-muted: #e2e8f0;
    --b-border: #ffffff;
    --b-primary: #facc15;
    --b-primary-hover: #eab308;
    --b-primary-contrast: #000000;
    --b-surface: #0a0a0a;
    --b-surface-alt: #1a1a1a;
    --b-focus: #facc15;
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

  /* Touch Targets: Min 44x44px (2.75rem) */
  button, .btn {
    min-height: 2.75rem;
    min-width: 2.75rem;
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

  /* Floating Accessibility Launcher Button */
  .launcher {
    position: fixed;
    inset: auto 1.25rem 1.25rem auto;
    z-index: 2147483640;
    background: #b91c1c;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 2rem;
    padding: 0.625rem 1.25rem;
    box-shadow: 0 4px 14px rgba(185, 28, 28, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    cursor: pointer;
    transition: transform 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
  }
  .launcher:hover {
    background: #991b1b;
    box-shadow: 0 6px 20px rgba(185, 28, 28, 0.5), 0 3px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  :host([data-contrast="high"]) .launcher {
    background: #000000;
    color: #facc15;
    border: 3px solid #facc15;
    box-shadow: 0 0 0 2px #000000, 0 0 16px rgba(250, 204, 21, 0.6);
  }
  :host([data-contrast="high"]) .launcher .launcher-icon-badge {
    background: #facc15;
    color: #000000;
  }
  :host([data-contrast="high"]) .launcher span {
    color: #facc15 !important;
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
    min-height: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3125rem;
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 0;
    background: transparent;
    font-size: 0.75rem;
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
    inset: auto 1rem 5rem auto;
    width: min(30rem, calc(100vw - 1.5rem));
    height: min(46rem, calc(100vh - 6.5rem));
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
  }

  /* Header */
  .header {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--b-border);
    background: var(--b-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .header-titles {
    flex: 1;
    min-width: 0;
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .lang-bar {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .lang-toggle-btn {
    font-size: 0.8125rem;
    padding: 0.375rem 0.5rem;
    min-height: 2.5rem;
    min-width: 2.5rem;
  }

  .lang-toggle-btn[aria-pressed="true"] {
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-color: var(--b-primary);
    font-weight: 700;
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
    min-height: 2.25rem;
    padding: 0.25rem 0.625rem;
  }

  .sources-box {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--b-border);
    font-size: 0.8125rem;
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
    min-height: 2.75rem;
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
    font-size: 0.6875rem;
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
  @media (max-width: 640px) {
    .panel {
      inset: 0 !important;
      width: 100vw !important;
      height: 100dvh !important;
      max-height: 100dvh !important;
      border-radius: 0 !important;
      border: none !important;
      box-shadow: none !important;
    }
    .panel[hidden] {
      display: none !important;
    }
    .launcher {
      bottom: 1rem !important;
      right: 1rem !important;
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
      font-size: 0.75rem !important;
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
    padding: 1rem;
    box-sizing: border-box;
  }
  .onboarding-card {
    background: var(--b-bg);
    color: var(--b-text);
    border-radius: var(--b-radius);
    border: 2px solid var(--b-primary);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    max-width: 28rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.25rem;
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
  }
  .onboarding-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    border-top: 1px solid var(--b-border);
    padding-top: 0.75rem;
    flex-wrap: wrap;
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
    min-height: 2rem;
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
    min-height: 2.25rem;
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
class N extends HTMLElement {
  constructor() {
    super(...arguments);
    c(this, "isOpen", !1);
    c(this, "currentLang", "en");
    c(this, "textSize", "normal");
    c(this, "highContrast", !1);
    c(this, "simpleMode", !1);
    c(this, "autoReadSpeech", !0);
    c(this, "isOffline", !navigator.onLine);
    // Voice States
    c(this, "isThinking", !1);
    c(this, "isRecording", !1);
    c(this, "isProcessingSpeech", !1);
    c(this, "isSpeaking", !1);
    c(this, "mediaRecorder", null);
    c(this, "audioChunks", []);
    c(this, "activeRecognition", null);
    c(this, "wakeWordRecognizer", null);
    c(this, "activeAudio", null);
    c(this, "messages", []);
    c(this, "sessionId", `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    // Telegram link state
    c(this, "telegramToken", null);
    c(this, "telegramDeepLink", "https://t.me/savannah_assistant3_bot");
    c(this, "isTelegramLinked", !1);
    c(this, "telegramPollTimer", null);
    // Settings dialog visibility
    c(this, "isSettingsOpen", !1);
    // Active Handoff state
    c(this, "activeHandoff", null);
    // Support needs
    c(this, "supportNeeds", {
      needs: ["written_instructions"],
      other_text: "",
      preferred_contact_mode: "text"
    });
    c(this, "activeTab", "chat");
    // Persistent Accessibility & Voice Preferences (Configure Once, Access Everywhere)
    c(this, "accessibilityPrefs", {
      language: "en",
      voice_enabled: !1,
      auto_welcome: !0,
      auto_tts: !1,
      speech_rate: 1,
      voice_input_enabled: !0,
      screen_reader_mode: !1,
      keyboard_navigation: !1,
      high_contrast: !1,
      large_text: "normal",
      simple_mode: !1,
      sync_enabled: !0,
      onboarded: !1
    });
    c(this, "onboardingDismissed", !1);
    c(this, "isReadingPage", !1);
    c(this, "isReadingPaused", !1);
    c(this, "showAutoplayBanner", !1);
    c(this, "hasSpokenWelcomeThisSession", !1);
    c(this, "popstateListener", null);
    c(this, "previousFocus", null);
  }
  // Attributes: supports both guide plain attributes (lang, api, content) and data-*
  get apiBase() {
    return this.getAttribute("api") || this.getAttribute("data-api") || "http://localhost:8000";
  }
  get courseId() {
    return this.getAttribute("content") || this.getAttribute("data-course") || "course_demo";
  }
  static get observedAttributes() {
    return ["lang", "data-lang", "api", "data-api", "content", "data-course"];
  }
  attributeChangedCallback(e, t, a) {
    t !== a && (e === "lang" || e === "data-lang") && a in f && (this.currentLang = a, this.shadowRoot && this.render());
  }
  connectedCallback() {
    if (this.shadowRoot) return;
    this.restoreState();
    const e = this.getAttribute("lang") || this.getAttribute("data-lang"), t = localStorage.getItem("savanna_bridge_preferred_lang"), a = sessionStorage.getItem("savanna_bridge_lang");
    e && e in f ? this.currentLang = e : this.accessibilityPrefs.language && this.accessibilityPrefs.language in f ? this.currentLang = this.accessibilityPrefs.language : t && t in f ? this.currentLang = t : a && a in f && (this.currentLang = a), this.accessibilityPrefs.keyboard_navigation && this.classList.add("keyboard-focus-enhanced"), this.accessibilityPrefs.screen_reader_mode && this.classList.add("screen-reader-mode"), this.attachShadow({ mode: "open" }), this.render(), this.setupNetworkMonitor(), this.popstateListener = () => {
      this.isReadingPage && this.stopPageReading();
    }, window.addEventListener("popstate", this.popstateListener), this.fetchTelegramStartLink(), this.fetchSupportNeeds(), this.initWakeWordDetection(), this.initGlobalKeyboardShortcuts(), this.accessibilityPrefs.sync_enabled && this.syncPreferencesFromBackend(), this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome && !this.hasSpokenWelcomeThisSession && setTimeout(() => this.triggerSpokenWelcome(), 500);
  }
  disconnectedCallback() {
    if (this.telegramPollTimer && (window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null), this.wakeWordRecognizer) {
      try {
        this.wakeWordRecognizer.stop();
      } catch {
      }
      this.wakeWordRecognizer = null;
    }
    this.stopSpeaking(), this.popstateListener && (window.removeEventListener("popstate", this.popstateListener), this.popstateListener = null), this.isReadingPage && this.stopPageReading();
  }
  t(e) {
    return (f[this.currentLang] || f.en)[e] || f.en[e] || e;
  }
  announce(e) {
    const t = this.shadowRoot?.querySelector("#live-announcer");
    t && (t.textContent = "", setTimeout(() => {
      t.textContent = e;
    }, 50));
  }
  getLangDisplayName(e = this.currentLang) {
    switch (e) {
      case "am":
        return "አማርኛ";
      case "om":
        return "Afaan Oromoo";
      case "ti":
        return "ትግርኛ";
      case "ar":
        return "العربية";
      default:
        return "English";
    }
  }
  setLanguage(e, t = !0) {
    this.currentLang = e, sessionStorage.setItem("savanna_bridge_lang", e), this.accessibilityPrefs.language = e, this.savePreferences(), this.setAttribute("lang", e), this.setAttribute("dir", e === "ar" ? "rtl" : "ltr"), t ? (this.messages = [], sessionStorage.removeItem("savanna_bridge_chat_history"), this.render(), this.announce(this.t("appTitle")), this.accessibilityPrefs.voice_enabled && this.speakText(this.t("voiceWelcomeAnnouncement"))) : (this.updateHeaderLanguageButtons(), this.updateVoiceStatusUI());
  }
  clearChat() {
    this.messages = [], sessionStorage.removeItem("savanna_bridge_chat_history"), this.renderMessages(), this.announce(this.t("emptyWelcome"));
  }
  async generateLinkCode() {
    try {
      const e = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: `learner_${this.sessionId}`
        })
      });
      if (e.ok) {
        const t = await e.json(), a = this.shadowRoot?.querySelector("#code-display");
        a && (a.textContent = t.code || t.token, a.style.display = "block", this.announce(`${this.t("yourCodeIs")} ${t.code || t.token}`));
      }
    } catch (e) {
      console.warn("Failed to generate link code", e);
    }
  }
  updateHeaderLanguageButtons() {
    const e = this.shadowRoot;
    if (!e) return;
    ["en", "am", "om", "ti", "ar"].forEach((a) => {
      const i = e.querySelector(`#btn-lang-${a}`);
      i && i.setAttribute("aria-pressed", a === this.currentLang ? "true" : "false");
    });
  }
  setupNetworkMonitor() {
    window.addEventListener("online", () => {
      this.isOffline = !1, this.render(), this.flushOfflineQueue();
    }), window.addEventListener("offline", () => {
      this.isOffline = !0, this.render();
    });
  }
  async flushOfflineQueue() {
    try {
      const e = localStorage.getItem("db_assistant_offline_queue");
      if (!e) return;
      const t = JSON.parse(e);
      localStorage.removeItem("db_assistant_offline_queue");
      for (const a of t)
        a && a.question && await this.askQuestion(a.question);
    } catch (e) {
      console.warn("Could not flush offline queue", e);
    }
  }
  restoreState() {
    try {
      const e = sessionStorage.getItem("savanna_bridge_chat_history");
      e && (this.messages = JSON.parse(e));
      const t = localStorage.getItem("savanna_voice_prefs");
      if (t)
        try {
          const h = JSON.parse(t);
          this.accessibilityPrefs = { ...this.accessibilityPrefs, ...h };
        } catch {
        }
      const a = localStorage.getItem("savanna_bridge_preferred_lang");
      a && a in f && (this.currentLang = a, this.accessibilityPrefs.language = a);
      const i = localStorage.getItem("savanna_bridge_contrast");
      i && (this.highContrast = i === "high", this.accessibilityPrefs.high_contrast = this.highContrast);
      const n = localStorage.getItem("savanna_bridge_text_size");
      n && (this.textSize = n, this.accessibilityPrefs.large_text = n);
      const s = localStorage.getItem("savanna_bridge_auto_read");
      s !== null && (this.autoReadSpeech = s === "true");
      const l = localStorage.getItem("savanna_bridge_simple_mode");
      l && (this.simpleMode = l === "true", this.accessibilityPrefs.simple_mode = this.simpleMode);
    } catch {
    }
  }
  savePreferences() {
    try {
      this.accessibilityPrefs.language = this.currentLang, this.accessibilityPrefs.high_contrast = this.highContrast, this.accessibilityPrefs.large_text = this.textSize, this.accessibilityPrefs.simple_mode = this.simpleMode, localStorage.setItem("savanna_voice_prefs", JSON.stringify(this.accessibilityPrefs)), localStorage.setItem("savanna_bridge_preferred_lang", this.currentLang), localStorage.setItem("savanna_bridge_contrast", this.highContrast ? "high" : "normal"), localStorage.setItem("savanna_bridge_text_size", this.textSize), localStorage.setItem("savanna_bridge_simple_mode", this.simpleMode ? "true" : "false"), sessionStorage.setItem("savanna_bridge_lang", this.currentLang), this.accessibilityPrefs.sync_enabled && this.syncPreferencesToBackend();
    } catch (e) {
      console.warn("Could not save preferences to localStorage:", e);
    }
  }
  async syncPreferencesToBackend() {
    try {
      const e = this.getAttribute("learner-id") || `learner_${this.sessionId}`;
      await fetch(`${this.apiBase}/api/v1/accessibility-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learner_ref: e,
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
          preferred_contact_mode: this.supportNeeds.preferred_contact_mode
        })
      });
    } catch (e) {
      console.warn("Could not sync accessibility profile to backend:", e);
    }
  }
  async syncPreferencesFromBackend() {
    try {
      const e = this.getAttribute("learner-id") || `learner_${this.sessionId}`, t = await fetch(`${this.apiBase}/api/v1/accessibility-profile?learner_ref=${encodeURIComponent(e)}`);
      if (t.ok) {
        const a = await t.json();
        a && a.updated_at && (this.accessibilityPrefs.voice_enabled = !!a.voice_enabled, this.accessibilityPrefs.auto_welcome = !!a.auto_welcome, this.accessibilityPrefs.auto_tts = !!a.auto_tts, typeof a.speech_rate == "number" && (this.accessibilityPrefs.speech_rate = a.speech_rate), a.language && a.language in f && (this.currentLang = a.language, this.accessibilityPrefs.language = a.language), a.large_text && (this.textSize = a.large_text), typeof a.high_contrast == "boolean" && (this.highContrast = a.high_contrast), typeof a.simple_mode == "boolean" && (this.simpleMode = a.simple_mode), typeof a.onboarded == "boolean" && (this.accessibilityPrefs.onboarded = a.onboarded), this.savePreferences(), this.render());
      }
    } catch (e) {
      console.warn("Could not fetch accessibility profile from backend:", e);
    }
  }
  getBestVoice(e) {
    if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices != "function") return null;
    const t = window.speechSynthesis.getVoices();
    if (!t || t.length === 0) return null;
    const i = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      ar: "ar-SA"
    }[e].toLowerCase(), n = e.toLowerCase();
    let s = t.find((u) => u.lang.toLowerCase() === i);
    if (s || (s = t.find((u) => u.lang.toLowerCase().startsWith(n)), s)) return s;
    const h = {
      en: "english",
      am: "amharic",
      om: "oromo",
      ti: "tigrinya",
      ar: "arabic"
    }[e];
    return s = t.find((u) => u.name.toLowerCase().includes(h)), s || null;
  }
  speakText(e, t) {
    if (!("speechSynthesis" in window))
      return t?.onError && t.onError(), !1;
    try {
      window.speechSynthesis.cancel();
      const a = new SpeechSynthesisUtterance(e), i = {
        en: "en-US",
        am: "am-ET",
        om: "om-ET",
        ti: "ti-ET",
        ar: "ar-SA"
      };
      a.lang = i[this.currentLang] || "en-US", a.rate = t?.rate || this.accessibilityPrefs.speech_rate || 1;
      const n = this.getBestVoice(this.currentLang);
      return n && (a.voice = n), a.onstart = () => {
        t?.onStart && t.onStart();
      }, a.onend = () => {
        t?.onEnd && t.onEnd();
      }, a.onerror = (s) => {
        console.warn("Speech synthesis error or autoplay blocked:", s), t?.onError && t.onError(s);
      }, window.speechSynthesis.speak(a), !0;
    } catch (a) {
      return console.warn("Could not initiate speech synthesis:", a), t?.onError && t.onError(a), !1;
    }
  }
  triggerSpokenWelcome() {
    if (this.hasSpokenWelcomeThisSession) return;
    this.hasSpokenWelcomeThisSession = !0;
    const e = this.t("voiceWelcomeAnnouncement");
    this.speakText(e, {
      onError: () => {
        this.showAutoplayBanner = !0, this.render(), this.announce(this.t("oneTapVoiceActivation"));
      }
    }) || (this.showAutoplayBanner = !0, this.render(), this.announce(this.t("oneTapVoiceActivation")));
  }
  // --- Platform Context Extraction (Reads live page) ---
  extractPlatformContext() {
    const e = typeof window < "u" ? window.location.href : "", t = typeof document < "u" && document.title || "Savanna Platform";
    let a = "Current Lesson";
    if (typeof document < "u") {
      const n = document.querySelector("h1, h2, [aria-current='page'], .active-lesson, .module-title");
      n && n.textContent && (a = n.textContent.trim());
    }
    let i = "";
    if (typeof document < "u") {
      const n = document.querySelector("main") || document.querySelector("article") || document.querySelector(".content") || document.body;
      if (n)
        try {
          const s = n.cloneNode(!0);
          s.querySelectorAll("script, style, db-assistant, bridge-assistant, noscript, nav, footer, header").forEach((l) => l.remove()), i = (s.textContent || "").replace(/\s+/g, " ").trim().slice(0, 15e3);
        } catch {
          i = "";
        }
    }
    return { page_url: e, page_title: t, page_content: i, section: a };
  }
  readPageAloud() {
    const e = this.extractPlatformContext();
    if (!e.page_content && !e.page_title) {
      this.announce("No readable content found on this page.");
      return;
    }
    this.isReadingPage = !0, this.isReadingPaused = !1, this.render();
    const t = e.page_title ? `${e.page_title}. ` : "", a = e.section ? `${e.section}. ` : "", i = `${t}${a}${e.page_content}`.slice(0, 1e4);
    this.announce(this.t("readingPageAnnouncement")), this.speakText(i, {
      onEnd: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      },
      onError: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      }
    });
  }
  readSectionAloud() {
    const e = this.extractPlatformContext(), t = e.section || e.page_title;
    if (!t) {
      this.announce("No active section found.");
      return;
    }
    this.isReadingPage = !0, this.isReadingPaused = !1, this.render(), this.announce(this.t("readingSectionAnnouncement")), this.speakText(`${t}. ${e.page_content.slice(0, 2e3)}`, {
      onEnd: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      },
      onError: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      }
    });
  }
  pausePageReading() {
    "speechSynthesis" in window && (window.speechSynthesis.pause(), this.isReadingPaused = !0, this.render(), this.announce(this.t("pauseReading")));
  }
  resumePageReading() {
    "speechSynthesis" in window && (window.speechSynthesis.resume(), this.isReadingPaused = !1, this.render(), this.announce(this.t("resumeReading")));
  }
  stopPageReading() {
    "speechSynthesis" in window && window.speechSynthesis.cancel(), this.isReadingPage = !1, this.isReadingPaused = !1, this.render(), this.announce(this.t("stopReading"));
  }
  saveChatState() {
    try {
      sessionStorage.setItem("savanna_bridge_chat_history", JSON.stringify(this.messages.slice(-25)));
    } catch {
    }
  }
  // --- Accessibility Earcons (Web Audio API) ---
  playEarcon(e) {
    try {
      const t = window.AudioContext || window.webkitAudioContext;
      if (!t) return;
      const a = new t(), i = a.createOscillator(), n = a.createGain();
      i.connect(n), n.connect(a.destination);
      const s = a.currentTime;
      e === "wake" || e === "start" ? (i.type = "sine", i.frequency.setValueAtTime(440, s), i.frequency.exponentialRampToValueAtTime(880, s + 0.15), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.22), i.start(s), i.stop(s + 0.22)) : e === "stop" ? (i.type = "sine", i.frequency.setValueAtTime(880, s), i.frequency.exponentialRampToValueAtTime(440, s + 0.15), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.22), i.start(s), i.stop(s + 0.22)) : e === "transcribed" && (i.type = "triangle", i.frequency.setValueAtTime(587.33, s), i.frequency.setValueAtTime(880, s + 0.08), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.2), i.start(s), i.stop(s + 0.2));
    } catch {
    }
  }
  // --- Wake Word Detection ("Help") ---
  initWakeWordDetection() {
    const e = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (e)
      try {
        const t = new e();
        t.continuous = !0, t.interimResults = !0, t.lang = "en-US", t.onresult = (a) => {
          if (!this.isRecording)
            for (let i = a.resultIndex; i < a.results.length; i++) {
              const n = (a.results[i][0]?.transcript || "").toLowerCase();
              if (n.includes("help") || n.includes("እርዳታ") || n.includes("እርዳኝ") || n.includes("gargaarsa") || n.includes("مساعدة") || n.includes("ساعدني")) {
                this.onWakeWordTriggered();
                break;
              }
            }
        }, t.onerror = () => {
        }, t.onend = () => {
          if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer)
            try {
              t.start();
            } catch {
            }
        }, t.start(), this.wakeWordRecognizer = t;
      } catch (t) {
        console.warn("Wake word background recognition notice:", t);
      }
  }
  onWakeWordTriggered() {
    this.openAssistant(), this.playEarcon("wake"), this.announce(this.t("voiceListening"));
    const e = this.shadowRoot?.querySelector("#chat-text-input");
    e && this.startVoiceRecording(e);
  }
  initGlobalKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && e.shiftKey && (e.key === "V" || e.key === "v" || e.key === "A" || e.key === "a")) {
        e.preventDefault(), this.isOpen || this.openAssistant();
        const t = this.shadowRoot?.querySelector("#chat-text-input");
        t && this.toggleVoiceInput(t);
      }
    });
  }
  openAssistant() {
    this.isOpen = !0;
    const e = this.shadowRoot?.querySelector("#assistant-dialog"), t = this.shadowRoot?.querySelector("#launcher-btn");
    if (e && t) {
      e.hidden = !1, e.removeAttribute("hidden"), e.style.display = "flex", t.setAttribute("aria-expanded", "true"), this.announce("Savanna Bridge Assistant opened. Use Tab to navigate or Escape to close.");
      const a = this.shadowRoot?.querySelector("#chat-text-input");
      setTimeout(() => (a ?? e).focus(), 60);
    }
  }
  closeAssistant() {
    this.isOpen = !1;
    const e = this.shadowRoot?.querySelector("#assistant-dialog"), t = this.shadowRoot?.querySelector("#launcher-btn");
    e && t && (e.hidden = !0, e.setAttribute("hidden", "true"), e.style.display = "none", t.setAttribute("aria-expanded", "false"), (this.previousFocus ?? t).focus()), this.stopSpeaking(), this.isRecording && this.stopVoiceRecording();
  }
  // --- Telegram Link Methods ---
  async fetchTelegramStartLink() {
    try {
      const e = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: `learner_${this.sessionId}`
        })
      });
      if (e.ok) {
        const t = await e.json();
        this.telegramToken = t.token, this.telegramDeepLink = t.deep_link, this.updateTelegramLinkUI();
      }
    } catch (e) {
      console.warn("Could not fetch telegram link start:", e);
    }
  }
  onTelegramLinkClicked() {
    if (this.isTelegramLinked || !this.telegramToken) return;
    this.telegramPollTimer && window.clearInterval(this.telegramPollTimer);
    let e = 0;
    const t = 300;
    this.telegramPollTimer = window.setInterval(async () => {
      if (e++, e > t) {
        this.telegramPollTimer && window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null;
        return;
      }
      try {
        const a = await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken)}`);
        a.ok && (await a.json()).linked && (this.telegramPollTimer && window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null, this.isTelegramLinked = !0, this.announce(this.t("telegramConnected")), this.updateTelegramLinkUI());
      } catch (a) {
        console.warn("Telegram status polling error:", a);
      }
    }, 2e3);
  }
  async disconnectTelegram() {
    try {
      await fetch(`${this.apiBase}/api/v1/link/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "telegram"
        })
      });
    } catch {
    }
    this.isTelegramLinked = !1, await this.fetchTelegramStartLink(), this.updateTelegramLinkUI();
  }
  updateTelegramLinkUI() {
    const e = this.shadowRoot?.querySelector("#telegram-container");
    e && (this.isTelegramLinked ? (e.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ${o.check} ${this.t("connectedToTelegram")}
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg" style="font-size:0.75rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
            ${this.t("disconnectTelegram")}
          </button>
        </div>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `, e.querySelector("#btn-disconnect-tg")?.addEventListener("click", () => this.disconnectTelegram())) : (e.innerHTML = `
        <a href="${this.telegramDeepLink}" target="_blank" rel="noopener noreferrer"
           class="btn btn-secondary btn-footer" id="tg-deep-link"
           aria-label="${this.t("continueOnTelegramAria")}"
           style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
          ${o.telegram}
          <span>${this.t("continueOnTelegram")}</span>
        </a>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `, e.querySelector("#tg-deep-link")?.addEventListener("click", () => this.onTelegramLinkClicked())));
  }
  // --- Support Needs API ---
  async fetchSupportNeeds() {
    try {
      const e = await fetch(`${this.apiBase}/api/v1/support-needs`);
      if (e.ok) {
        const t = await e.json();
        this.supportNeeds = {
          needs: t.needs || [],
          other_text: t.other_text || "",
          preferred_contact_mode: t.preferred_contact_mode || "text"
        };
      }
    } catch {
    }
  }
  async saveSupportNeeds(e, t, a) {
    this.supportNeeds = {
      needs: e,
      other_text: t,
      preferred_contact_mode: a
    };
    try {
      const i = await fetch(`${this.apiBase}/api/v1/support-needs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.supportNeeds)
      }), n = this.shadowRoot?.querySelector("#support-saved-notice");
      n && (n.removeAttribute("hidden"), setTimeout(() => n.setAttribute("hidden", "true"), 3500)), i.ok || console.warn("PUT /support-needs failed", i.status);
    } catch (i) {
      console.warn("Save support needs error:", i);
    }
  }
  // --- Language Script Detection ---
  detectLanguage(e) {
    return /[\u1200-\u137F]/.test(e) ? "am" : /[\u0600-\u06FF]/.test(e) ? "ar" : /\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/i.test(e) || /\b[A-Za-z]+'[A-Za-z]+\b/.test(e) ? "om" : "en";
  }
  // --- Voice-to-Text (Speech Recognition) ---
  async toggleVoiceInput(e) {
    this.isRecording ? this.stopVoiceRecording() : await this.startVoiceRecording(e);
  }
  async startVoiceRecording(e) {
    if (this.isSpeaking && this.stopSpeaking(), this.wakeWordRecognizer)
      try {
        this.wakeWordRecognizer.stop();
      } catch {
      }
    this.isRecording = !0, this.isProcessingSpeech = !1, this.playEarcon("start"), this.announce(this.t("voiceListening")), this.updateVoiceStatusUI(), this.updateMicButtonUI();
    let t = !1;
    const a = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (a)
      try {
        this.activeRecognition = new a(), this.activeRecognition.continuous = !1, this.activeRecognition.interimResults = !0;
        const i = {
          en: "en-US",
          am: "am-ET",
          om: "om-ET",
          ar: "ar-SA",
          ti: "ti-ET"
        };
        this.activeRecognition.lang = i[this.currentLang] || "en-US", this.activeRecognition.onresult = (n) => {
          let s = "";
          for (let h = 0; h < n.results.length; h++)
            s += n.results[h][0]?.transcript || "";
          const l = s.trim();
          if (l) {
            t = !0;
            const h = this.detectLanguage(l);
            h !== this.currentLang && this.setLanguage(h, !1), e.value = l;
          }
        }, this.activeRecognition.onend = () => {
          this.isRecording && this.stopVoiceRecording(t);
        }, this.activeRecognition.onerror = (n) => {
          console.warn("Active speech recognition error:", n.error);
        }, this.activeRecognition.start();
      } catch (i) {
        console.warn("Active recognition init error, falling back to MediaRecorder", i);
      }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      try {
        const i = await navigator.mediaDevices.getUserMedia({ audio: !0 });
        this.audioChunks = [];
        const n = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : MediaRecorder.isTypeSupported("audio/ogg") ? "audio/ogg" : "audio/wav";
        this.mediaRecorder = new MediaRecorder(i), this.mediaRecorder.ondataavailable = (s) => {
          s.data.size > 0 && this.audioChunks.push(s.data);
        }, this.mediaRecorder.onstop = async () => {
          if (i.getTracks().forEach((s) => s.stop()), !t && this.audioChunks.length > 0) {
            const s = new Blob(this.audioChunks, { type: n });
            await this.sendAudioForTranscription(s, n, e);
          }
        }, this.mediaRecorder.start();
      } catch (i) {
        console.warn("MediaRecorder permission/init notice:", i), a || (alert(this.t("micError")), this.isRecording = !1, this.updateMicButtonUI(), this.updateVoiceStatusUI());
      }
  }
  stopVoiceRecording(e = !1) {
    if (this.isRecording = !1, this.playEarcon("stop"), this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch {
      }
      this.activeRecognition = null;
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive" ? (e || (this.isProcessingSpeech = !0, this.announce(this.t("voiceProcessing")), this.updateVoiceStatusUI()), this.mediaRecorder.stop()) : (this.isProcessingSpeech = !1, this.updateVoiceStatusUI()), this.updateMicButtonUI(), e) {
      this.playEarcon("transcribed"), this.announce(this.t("voicePreviewNotice"));
      const t = this.shadowRoot?.querySelector("#chat-text-input");
      t && t.focus();
    }
    setTimeout(() => {
      if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer)
        try {
          this.wakeWordRecognizer.start();
        } catch {
        }
    }, 1200);
  }
  async sendAudioForTranscription(e, t, a) {
    this.isProcessingSpeech = !0, this.updateVoiceStatusUI(), this.announce(this.t("voiceProcessing"));
    try {
      const i = new FileReader(), n = new Promise((h, u) => {
        i.onloadend = () => {
          const y = i.result;
          h(y.split(",")[1] || "");
        }, i.onerror = u;
      });
      i.readAsDataURL(e);
      const s = await n, l = await fetch(`${this.apiBase}/api/v1/speech/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio_base64: s,
          media_type: t,
          language: this.currentLang,
          retain: !1
        })
      });
      if (l.ok) {
        const h = await l.json();
        if (h.transcript) {
          const u = this.detectLanguage(h.transcript);
          u !== this.currentLang && this.setLanguage(u, !1), a.value = (a.value ? a.value + " " : "") + h.transcript, a.focus(), this.playEarcon("transcribed"), this.announce(this.t("voicePreviewNotice"));
        }
      }
    } catch (i) {
      console.warn("Transcription fallback notice:", i);
    } finally {
      this.isProcessingSpeech = !1, this.updateVoiceStatusUI();
    }
  }
  updateMicButtonUI() {
    const e = this.shadowRoot?.querySelector("#mic-btn");
    e && (this.isRecording ? (e.classList.add("recording"), e.setAttribute("aria-pressed", "true"), e.setAttribute("title", this.t("recordingState"))) : (e.classList.remove("recording"), e.setAttribute("aria-pressed", "false"), e.setAttribute("title", this.t("micLabel"))));
  }
  updateVoiceStatusUI() {
    const e = this.shadowRoot?.querySelector("#voice-status-container");
    e && (this.isRecording ? (e.innerHTML = `
        <div class="voice-status-bar listening" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot"></span>
            <span>${this.t("voiceListening")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-voice" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
            ${this.t("stopAudio")}
          </button>
        </div>
      `, e.querySelector("#btn-stop-voice")?.addEventListener("click", () => this.stopVoiceRecording())) : this.isProcessingSpeech ? e.innerHTML = `
        <div class="voice-status-bar processing" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot" style="background:#2563eb;"></span>
            <span>${this.t("voiceProcessing")} (${this.getLangDisplayName()})</span>
          </div>
        </div>
      ` : this.isSpeaking ? (e.innerHTML = `
        <div class="voice-status-bar speaking" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="sound-bars"><span></span><span></span><span></span></span>
            <span>${this.t("voiceSpeaking")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-speech" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
            ${this.t("stopAudio")}
          </button>
        </div>
      `, e.querySelector("#btn-stop-speech")?.addEventListener("click", () => this.stopSpeaking())) : e.innerHTML = "");
  }
  // --- Text-to-Speech (Voice Responses) ---
  cleanTextForSpeech(e) {
    return e.replace(/\[\d+\]/g, "").replace(/\bhttps?:\/\/\S+/gi, "").replace(/[#*_`~>]/g, "").replace(/\s+/g, " ").trim();
  }
  async speakResponse(e) {
    this.stopSpeaking();
    const t = this.cleanTextForSpeech(e.text);
    if (t) {
      this.isSpeaking = !0, e.isAudioPlaying = !0, this.renderMessages(), this.updateVoiceStatusUI();
      try {
        const a = await fetch(`${this.apiBase}/api/v1/speech/synthesize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: t,
            language: this.currentLang,
            speed: 1
          })
        });
        if (a.ok) {
          const i = await a.json();
          if (!i.mocked && i.audio_url) {
            const n = String(i.audio_url), s = /^(https?:|data:|blob:)/.test(n) ? n : `${this.apiBase}${n}`;
            this.activeAudio = new Audio(s), this.activeAudio.onended = () => this.finishSpeaking(e), this.activeAudio.onerror = () => this.fallbackTTS(t, e), await this.activeAudio.play();
            return;
          }
        }
      } catch (a) {
        console.warn("Server TTS unavailable; using browser speech fallback.", a);
      }
      this.fallbackTTS(t, e);
    }
  }
  fallbackTTS(e, t) {
    this.speakText(e, {
      onStart: () => {
        this.isSpeaking = !0, t.isAudioPlaying = !0, this.renderMessages(), this.updateVoiceStatusUI();
      },
      onEnd: () => this.finishSpeaking(t),
      onError: () => this.finishSpeaking(t)
    }) || this.finishSpeaking(t);
  }
  finishSpeaking(e) {
    this.isSpeaking = !1, e.isAudioPlaying = !1, this.activeAudio = null, this.renderMessages(), this.updateVoiceStatusUI();
  }
  stopSpeaking() {
    "speechSynthesis" in window && window.speechSynthesis.cancel(), this.activeAudio && (this.activeAudio.pause(), this.activeAudio = null), this.isSpeaking = !1, this.messages.forEach((e) => e.isAudioPlaying = !1), this.renderMessages(), this.updateVoiceStatusUI();
  }
  // --- Q&A / Ask ---
  async askQuestion(e, t = !1) {
    const a = e.trim();
    if (!a || this.isThinking) return;
    this.stopSpeaking();
    const i = this.detectLanguage(a);
    i !== this.currentLang && this.setLanguage(i, !1), this.dispatchEvent(
      new CustomEvent("db-assistant:question", {
        bubbles: !0,
        composed: !0,
        detail: { text: a, language: this.currentLang }
      })
    );
    const n = {
      id: `msg_${Date.now()}_learner`,
      sender: "learner",
      text: a
    };
    this.messages.push(n), this.isThinking = !0, this.announce(this.t("lookingInCourse")), this.renderMessages();
    const s = this.extractPlatformContext();
    try {
      let l = await fetch(`${this.apiBase}/api/v1/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: a,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: t || this.simpleMode,
          channel: "web",
          ...s
        })
      });
      if (!l.ok && l.status === 404 && (l = await fetch(`${this.apiBase}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: a,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: t || this.simpleMode,
          channel: "web",
          ...s
        })
      })), this.isThinking = !1, l.ok) {
        const h = await l.json(), u = !!h.offer_human || h.reason === "low_confidence", y = {
          id: `msg_${Date.now()}_assistant`,
          sender: "assistant",
          text: h.answer,
          heading: this.t("answerHeading"),
          citations: h.citations || [],
          offerHuman: h.offer_human,
          isRefusal: u
        };
        this.messages.push(y), this.saveChatState(), this.renderMessages(), (this.autoReadSpeech || this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_tts) && this.speakResponse(y);
      } else {
        const h = {
          id: `msg_${Date.now()}_err`,
          sender: "assistant",
          text: this.t("serverErrorNotice"),
          offerHuman: !0
        };
        this.messages.push(h), this.renderMessages();
      }
    } catch {
      this.isThinking = !1;
      try {
        const h = JSON.parse(localStorage.getItem("db_assistant_offline_queue") || "[]");
        h.push({ question: a, language: this.currentLang, timestamp: Date.now() }), localStorage.setItem("db_assistant_offline_queue", JSON.stringify(h));
      } catch {
      }
      const l = {
        id: `msg_${Date.now()}_offline`,
        sender: "assistant",
        text: this.t("savedOnPhoneNotice"),
        offerHuman: !0
      };
      this.messages.push(l), this.renderMessages();
    }
  }
  // --- Human Handoff ---
  async requestHandoff(e) {
    if (this.isOffline) {
      alert(this.t("offlineBanner"));
      return;
    }
    if (window.confirm(this.t("handoffConsentPrompt"))) {
      this.announce(this.t("lookingInCourse"));
      try {
        const t = await fetch(`${this.apiBase}/api/v1/escalations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consent: !0,
            learner_ref: `learner_${this.sessionId}`,
            card: {
              language: this.currentLang,
              context: e || "Learner requested a human mentor from web assistant.",
              support_needs: this.supportNeeds.needs,
              contact_mode: this.supportNeeds.preferred_contact_mode
            },
            channel: "web"
          })
        });
        if (t.ok) {
          const a = await t.json(), i = a.ticketId || a.id || "ticket_01", n = a.room_url || a.roomUrl || "https://meet.jit.si/savanna-bridge-demo";
          this.activeHandoff = {
            id: i,
            room_url: n
          }, this.dispatchEvent(
            new CustomEvent("db-assistant:escalated", {
              bubbles: !0,
              composed: !0,
              detail: { ticketId: i, roomUrl: n }
            })
          ), this.messages.push({
            id: `msg_${Date.now()}_handoff`,
            sender: "assistant",
            text: `${this.t("handoffReadyTitle")}: ${this.activeHandoff.room_url}`,
            heading: this.t("handoffReadyTitle"),
            isHandoff: !0,
            roomUrl: n,
            offerHuman: !1
          }), this.saveChatState();
          const s = this.shadowRoot?.querySelector("#handoff-room-box");
          s && (s.innerHTML = `
            <div style="padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; margin-top:0.75rem;">
              <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                ${o.celebrate} <span>${this.t("handoffReadyTitle")}</span>
              </p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${n}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${o.video} <span>${this.t("joinRoomButton")}</span>
                </a>
                <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(n)}" style="font-size:0.8125rem; min-height:2.25rem; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${o.copy} <span>${this.t("copyRoomBtn")}</span>
                </button>
              </div>
            </div>
          `), this.renderMessages();
        } else
          alert(this.t("serverErrorNotice"));
      } catch {
        alert(this.t("serverErrorNotice"));
      }
    }
  }
  // --- Rendering ---
  render() {
    this.shadowRoot && (this.setAttribute("data-contrast", this.highContrast ? "high" : "normal"), this.setAttribute("data-size", this.textSize), this.setAttribute("dir", this.currentLang === "ar" ? "rtl" : "ltr"), this.accessibilityPrefs?.keyboard_navigation ? this.classList.add("keyboard-focus-enhanced") : this.classList.remove("keyboard-focus-enhanced"), this.shadowRoot.innerHTML = `
      <style>${V}</style>

      <!-- Live Announcer -->
      <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true" style="position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); border:0;"></div>

      <!-- Floating Launcher Button with Wake Word Hint -->
      <button class="launcher" type="button" id="launcher-btn" accesskey="a"
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog"
              aria-label="${this.t("launcherLabel")}. ${this.t("wakeHint")}">
        <span class="launcher-icon-badge" aria-hidden="true" style="display:inline-flex; align-items:center; justify-content:center; width:2rem; height:2rem; border-radius:50%; background:rgba(255,255,255,0.22); color:#ffffff; flex-shrink:0;">
          ${o.launcher}
        </span>
        <div style="display:flex; flex-direction:column; align-items:flex-start; text-align:left; line-height:1.2;">
          <span style="color:#ffffff; font-weight:700;">${this.t("launcherLabel")}</span>
          <span style="font-size:0.75rem; font-weight:500; color:#ffffff;">${this.t("wakeHint")}</span>
        </div>
      </button>

      <!-- Floating Autoplay Audio Permission Banner if closed -->
      ${!this.isOpen && this.showAutoplayBanner ? `
        <div class="voice-activation-banner" role="alert" style="position:fixed; bottom:5.5rem; right:1.5rem; max-width:320px; z-index:99999; box-shadow:0 8px 24px rgba(0,0,0,0.18);">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            ${o.sound}
            <span>${this.t("voiceActivationPrompt")}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.375rem; margin-top:0.375rem;">
            <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome-floating" style="padding:0.25rem 0.625rem; font-size:0.75rem; min-height:1.75rem;">
              ${this.t("voiceActivationBtn")}
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner-floating" style="min-height:1.75rem; width:1.75rem; padding:0;" aria-label="Dismiss">
              ${o.close}
            </button>
          </div>
        </div>
      ` : ""}

      <!-- Main Open Panel -->
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" lang="${this.currentLang}" dir="${this.currentLang === "ar" ? "rtl" : "ltr"}" tabindex="-1" ${this.isOpen ? "" : "hidden"}>

        ${this.isOffline ? `<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>` : ""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles" style="display:flex; align-items:center; gap:0.5rem;">
            <span class="header-accessibility-icon" aria-hidden="true" style="display:inline-flex; align-items:center; justify-content:center; width:1.875rem; height:1.875rem; border-radius:50%; background:#fef2f2; color:#b91c1c; flex-shrink:0;">
              ${o.accessibility}
            </span>
            <div>
              <h2 id="dialog-title" class="title">${this.t("appTitle")}</h2>
            </div>
          </div>
          <div class="header-actions">
            <!-- Quick EN/AM Toggle for backward compatibility with integration tests -->
            <button class="lang-btn" type="button" id="btn-lang-toggle"
                    aria-label="${this.currentLang === "am" ? "English - Switch Language" : "አማርኛ - ቋንቋ ቀይር"}"
                    style="font-size:0.6875rem; font-weight:700; padding:0.25rem 0.5rem; min-height:1.75rem; border-radius:0.375rem; background:var(--b-surface-alt); border:1px solid var(--b-border); color:var(--b-text); cursor:pointer;">
              ${this.currentLang === "am" ? "English" : "አማርኛ"}
            </button>
            <!-- 5-Language Segmented Selector in Native Scripts with WCAG 2.5.3 Compliant Labels -->
            <div class="lang-group" role="group" aria-label="Language selection">
              <button type="button" class="lang-toggle-btn" id="btn-lang-en"
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

            <!-- Settings Button -->
            <button type="button" class="btn btn-secondary" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}" style="padding:0.4rem 0.6rem;">
              ${o.settings}
            </button>
            <!-- Close Button -->
            <button type="button" class="btn btn-secondary" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" style="padding:0.4rem 0.6rem;">
              ${o.close}
            </button>
          </div>
        </header>

        <!-- Navigation Tabs on Main Assistant Dialog -->
        <nav class="nav-tabs" role="tablist" aria-label="Assistant sections">
          <button type="button" class="tab-btn" id="tab-chat" role="tab" aria-selected="${this.activeTab === "chat"}" aria-controls="pane-chat">
            ${o.chat}
            <span>${this.t("chatTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-support" role="tab" aria-selected="${this.activeTab === "support"}" aria-controls="pane-support">
            ${o.heart}
            <span>${this.t("supportTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-handoff" role="tab" aria-selected="${this.activeTab === "handoff"}" aria-controls="pane-handoff">
            ${o.headphones}
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
                ${o.sound}
                <span>${this.t("voiceActivationPrompt")}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.375rem;">
                <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome" style="padding:0.25rem 0.625rem; font-size:0.75rem; min-height:1.75rem;">
                  ${this.t("voiceActivationBtn")}
                </button>
                <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner" style="min-height:1.75rem; width:1.75rem; padding:0;" aria-label="Dismiss">
                  ${o.close}
                </button>
              </div>
            </div>
          ` : ""}

          ${this.isReadingPage ? `
            <div class="reading-controls-bar" role="region" aria-label="${this.t("readingActive")}">
              <div class="reading-indicator">
                <span class="reading-pulse"></span>
                <span style="font-weight:600; font-size:0.8125rem; color:#065f46;">
                  ${this.isReadingPaused ? this.t("readingPaused") : this.t("readingActive")}
                </span>
              </div>
              <div class="reading-btns">
                ${this.isReadingPaused ? `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-resume" aria-label="${this.t("resumeReading")}" title="${this.t("resumeReading")}">${o.play}</button>` : `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-pause" aria-label="${this.t("pauseReading")}" title="${this.t("pauseReading")}">${o.pause}</button>`}
                <button type="button" class="btn btn-danger btn-icon-only" id="btn-reading-stop" aria-label="${this.t("stopReading")}" title="${this.t("stopReading")}" style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;">
                  ${o.stop}
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
              <input type="text" class="text-input" id="chat-text-input" data-id="chat-input"
                     placeholder="${this.t("inputPlaceholder")}"
                     aria-label="${this.t("inputPlaceholder")}"
                     dir="${this.currentLang === "ar" ? "rtl" : "ltr"}"
                     required autocomplete="off">
              <button type="button" class="btn btn-secondary mic-btn btn-icon-only" id="mic-btn"
                      aria-label="${this.t("micLabel")}" title="${this.t("micLabel")}">
                ${o.mic}
              </button>
              <button type="submit" class="btn btn-primary" id="send-btn" data-id="btn-send" style="display:inline-flex; align-items:center; gap:0.375rem;">
                <span>${this.t("sendButton")}</span>
                ${o.send}
              </button>
            </form>

            <!-- Bottom Row: Talk to a person & Continue on Telegram -->
            <div class="footer-actions-row">
              <button type="button" class="btn btn-secondary btn-footer btn-talk-person" id="btn-footer-handoff" style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${o.user}
                <span>${this.t("talkToPersonButton")}</span>
              </button>
              <div id="telegram-container" class="telegram-section">
                <!-- Rendered by updateTelegramLinkUI() -->
              </div>
            </div>
          </footer>
        </div>

        <!-- Pane 2: Support Preferences (Zero Proof Required) -->
        <div id="pane-support" class="tab-panel" role="tabpanel" ${this.activeTab === "support" ? "" : "hidden"} style="${this.activeTab === "support" ? "display:block; overflow-y:auto; padding:1rem;" : "display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${o.heart} <span>${this.t("supportNeedsTitle")}</span></div>
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
                       ${this.supportNeeds.needs.includes("other") || this.supportNeeds.other_text ? "checked" : ""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needOther")}</span>
                </div>
              </label>

              <textarea name="other_text" class="text-input" style="min-height:3.5rem; font-size:0.875rem;"
                        placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text || ""}</textarea>

              <label style="font-size:0.875rem; font-weight:600; margin-top:0.25rem;">
                ${this.t("contactModeLabel")}
                <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:2.625rem; font-size:0.875rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode === "text" ? "selected" : ""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode === "voice" ? "selected" : ""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode === "video" ? "selected" : ""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode === "telegram" ? "selected" : ""}>${this.t("modeTelegram")}</option>
                </select>
              </label>

              <div id="support-saved-notice" class="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600; display:inline-flex; align-items:center; gap:0.375rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; padding:0.5rem 0.75rem;">
                ${o.check} <span>${this.t("supportSavedNotice")}</span>
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
            <div class="settings-card-title">${o.headphones} <span>${this.t("handoffTab")}</span></div>
            <div class="settings-card-desc">
              ${this.t("appSubtitle")}
            </div>
            <form id="handoff-request-form" style="display:flex; flex-direction:column; gap:0.625rem;">
              <label class="checkbox-card">
                <input type="checkbox" id="handoff-consent" required checked>
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
                ${o.users} <span>${this.t("requestMentorBtn")}</span>
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
              <div class="settings-card-title">${o.type} <span>${this.t("textSizeLabel")}</span></div>
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
              <div class="settings-card-title">${o.contrast} <span>Display & Accessibility</span></div>

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
            </div>

            <!-- Voice Accessibility & Screen Reader Suite -->
            <div class="settings-card">
              <div class="settings-card-title">${o.sound} <span>${this.t("voicePrefsTitle")}</span></div>

              <!-- Master Voice Toggle -->
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("voiceMasterLabel")}</span>
                  <span class="toggle-desc">${this.t("voiceMasterDesc")}</span>
                </div>
                <input type="checkbox" id="chk-voice-master" class="toggle-switch" aria-label="${this.t("voiceMasterLabel")}" ${this.accessibilityPrefs.voice_enabled ? "checked" : ""}>
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
                  <button type="button" class="rate-btn" id="btn-rate-100" aria-pressed="${this.accessibilityPrefs.speech_rate === 1}">1.0x</button>
                  <button type="button" class="rate-btn" id="btn-rate-125" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.25}">1.25x</button>
                  <button type="button" class="rate-btn" id="btn-rate-150" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.5}">1.5x</button>
                </div>
              </div>

              <!-- Page Reading & Voice Test Buttons -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="display:flex; flex-direction:column; gap:0.375rem; margin-top:0.25rem;">
                <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                  <button type="button" class="btn btn-secondary" id="btn-read-page" style="flex:1; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${o.sound} <span>${this.t("readPageBtn")}</span>
                  </button>
                  <button type="button" class="btn btn-secondary" id="btn-read-section" style="flex:1; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${o.sound} <span>${this.t("readSectionBtn")}</span>
                  </button>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-test-voice" style="min-height:2rem; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                  ${o.play} <span>${this.t("testVoiceBtn")}</span>
                </button>
              </div>

              <!-- Screen Reader & Enhanced Keyboard Navigation -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("screenReaderLabel")}</span>
                  <span class="toggle-desc">${this.t("screenReaderDesc")}</span>
                </div>
                <input type="checkbox" id="chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderLabel")}" ${this.accessibilityPrefs.screen_reader_mode ? "checked" : ""}>
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
                  <span class="toggle-title">${this.t("crossSiteSyncLabel")}</span>
                  <span class="toggle-desc">${this.t("crossSiteSyncDesc")}</span>
                </div>
                <input type="checkbox" id="chk-sync-prefs" class="toggle-switch" aria-label="${this.t("crossSiteSyncLabel")}" ${this.accessibilityPrefs.sync_enabled ? "checked" : ""}>
              </label>

              <!-- Replay Onboarding Wizard -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <button type="button" class="btn btn-secondary" id="btn-replay-onboarding" style="width:100%; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${o.sparkles} <span>${this.t("replayOnboardBtn")}</span>
              </button>
            </div>

            <!-- Clear Chat Card -->
            <div class="settings-card" style="border-color:#fecaca; background:#fff5f5;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <div>
                  <div style="font-weight:700; font-size:0.875rem; color:#991b1b;">${this.t("clearChatBtn")}</div>
                  <div style="font-size:0.75rem; color:#7f1d1d;">Reset conversation and erase stored history</div>
                </div>
                <button type="button" class="btn btn-danger" id="btn-clear-chat" style="font-size:0.8125rem; min-height:2.25rem; padding:0.375rem 0.75rem;">
                  ${o.trash} <span>${this.t("clearChatBtn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>
    `, this.renderMessages(), this.updateTelegramLinkUI(), this.updateVoiceStatusUI(), this.bindEvents());
  }
  renderMessages() {
    const e = this.shadowRoot?.querySelector("#chat-log");
    if (!e) return;
    const a = !this.accessibilityPrefs.onboarded && !this.onboardingDismissed ? `
      <div class="onboarding-card" id="onboarding-card" role="region" aria-label="${this.t("onboardTitle")}" style="margin:0 0 1rem 0; padding:1rem; background:var(--b-surface); border:2px solid var(--b-primary); border-radius:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 id="onboard-title" style="margin:0; font-size:1rem; font-weight:700; color:var(--b-text); display:flex; align-items:center; gap:0.5rem;">
            ${o.sparkles} <span>${this.t("onboardTitle")}</span>
          </h3>
          <button type="button" class="btn btn-secondary btn-icon-only" id="btn-onboard-close" aria-label="${this.t("onboardSkipBtn")}" title="${this.t("onboardSkipBtn")}" style="min-height:2rem; width:2rem; padding:0;">
            ${o.close}
          </button>
        </div>

        <p style="font-size:0.8125rem; color:var(--b-text-muted); margin:0 0 0.875rem 0; line-height:1.4;">
          ${this.t("onboardSubtitle")}
        </p>

        <!-- Language Selection in Onboarding -->
        <div style="margin-bottom:0.875rem;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--b-text); margin-bottom:0.375rem;">
            ${this.t("preferredLanguageLabel")}
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
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("onboardVoiceOpt")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardVoiceDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-voice" class="toggle-switch" aria-label="${this.t("onboardVoiceOpt")}" ${this.accessibilityPrefs.voice_enabled ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("screenReaderLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardScreenReaderDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderLabel")}" ${this.accessibilityPrefs.screen_reader_mode ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("keyboardNavLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardKeyboardNavDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-keyboard-nav" class="toggle-switch" aria-label="${this.t("keyboardNavLabel")}" ${this.accessibilityPrefs.keyboard_navigation ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("highContrastLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardHighContrastDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-contrast" class="toggle-switch" aria-label="${this.t("highContrastLabel")}" ${this.accessibilityPrefs.high_contrast ? "checked" : ""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("onboardLargeTextOpt")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardLargeTextDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-large-text" class="toggle-switch" aria-label="${this.t("onboardLargeTextOpt")}" ${this.accessibilityPrefs.large_text === "larger" ? "checked" : ""}>
          </label>
        </div>

        <div style="font-size:0.6875rem; color:var(--b-text-muted); margin-bottom:0.875rem; padding:0.375rem 0.5rem; background:#f1f5f9; border-radius:0.375rem; line-height:1.35;">
          ${this.t("onboardMicNote")}
        </div>

        <!-- Buttons -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
          <button type="button" class="btn btn-secondary" id="btn-onboard-skip" style="min-height:2rem; font-size:0.8125rem;">
            ${this.t("onboardSkipBtn")}
          </button>
          <button type="button" class="btn btn-primary" id="btn-onboard-save" style="min-height:2rem; font-size:0.8125rem;">
            ${this.t("onboardSaveBtn")}
          </button>
        </div>
      </div>
    ` : "";
    if (this.messages.length === 0) {
      e.innerHTML = `
        ${a}
        <div class="empty-state">
          <p style="margin:0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}">
              ${o.arrowRight} ${this.escapeHtml(this.t("suggestedQ1"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}">
              ${o.arrowRight} ${this.escapeHtml(this.t("suggestedQ2"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}">
              ${o.arrowRight} ${this.escapeHtml(this.t("suggestedQ3"))}
            </button>
          </div>
        </div>
      `, e.querySelectorAll(".btn-suggested").forEach((i) => {
        i.addEventListener("click", () => {
          const n = i.getAttribute("data-q");
          n && this.askQuestion(n);
        });
      });
      return;
    }
    e.innerHTML = a + this.messages.map((i) => {
      if (i.sender === "learner")
        return `
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(i.text)}</p>
            </div>
          `;
      const n = i.citations && i.citations.length > 0, s = !!i.isRefusal;
      return `
          <div class="msg-row msg-assistant" id="${i.id}">
            <h4 class="answer-heading">${this.escapeHtml(i.heading || this.t("answerHeading"))}</h4>
            <p class="answer-text">${this.escapeHtml(i.text)}</p>

            ${i.isHandoff ? `
                <div class="handoff-card" style="margin-top:0.75rem; padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem;">
                  <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                    ${o.celebrate} <span>${this.t("handoffReadyTitle")}</span>
                  </p>
                  <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <a href="${this.escapeHtml(i.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" id="btn-join-room-card" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${o.video} <span>${this.t("joinRoomButton")}</span>
                    </a>
                    <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(i.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" style="font-size:0.8125rem; min-height:2.25rem; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${o.copy} <span>${this.t("copyRoomBtn")}</span>
                    </button>
                  </div>
                  <div style="font-size:0.75rem; color:#15803d; margin-top:0.5rem;">${this.t("androidFallbackNote")}</div>
                </div>
              ` : ""}

            ${s ? `
                <div class="not-verified-box refusal-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${i.id}" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${o.user} ${this.t("talkToPersonButton")}
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              ` : ""}

            <!-- Listen & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${i.id}">
                ${i.isAudioPlaying ? `${o.pause} ${this.t("pauseButton")}` : `${o.sound} ${this.t("listenButton")}`}
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${i.id}">
                ${o.lightbulb} ${this.t("makeSimplerButton")}
              </button>
            </div>

            <!-- Citations / Sources with readable names -->
            ${n ? `
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${i.citations.map(
        (l) => `
                    <a href="${this.escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="source-link">
                      📖 ${this.escapeHtml(l.title || l.heading)}
                    </a>
                  `
      ).join("")}
                </div>
              ` : ""}
          </div>
        `;
    }).join(""), this.isThinking && (e.innerHTML += `
        <div class="live-status-indicator">
          ⏳ ${this.t("lookingInCourse")}
        </div>
      `), e.querySelectorAll(".btn-listen").forEach((i) => {
      i.addEventListener("click", () => {
        const n = i.getAttribute("data-msg-id"), s = this.messages.find((l) => l.id === n);
        s && (s.isAudioPlaying ? this.stopSpeaking() : this.speakResponse(s));
      });
    }), e.querySelectorAll(".btn-simpler").forEach((i) => {
      i.addEventListener("click", () => {
        const n = i.getAttribute("data-msg-id"), s = this.messages.find((l) => l.id === n);
        s && this.askQuestion(`Explain simpler: ${s.text}`, !0);
      });
    }), e.querySelectorAll(".btn-talk-person").forEach((i) => {
      i.addEventListener("click", () => {
        const n = i.getAttribute("data-msg-id"), s = this.messages.find((l) => l.id === n);
        this.requestHandoff(s ? `Refusal regarding question: ${s.text}` : void 0);
      });
    }), e.querySelectorAll(".btn-try-another").forEach((i) => {
      i.addEventListener("click", () => {
        const n = this.shadowRoot?.querySelector("#chat-text-input");
        n && (n.value = "", n.focus());
      });
    }), e.scrollTop = e.scrollHeight;
  }
  bindEvents() {
    if (!this.shadowRoot) return;
    const e = this.shadowRoot.querySelector("#launcher-btn"), t = this.shadowRoot.querySelector("#assistant-dialog"), a = this.shadowRoot.querySelector("#btn-close-dialog"), i = this.shadowRoot.querySelector("#btn-open-settings"), n = this.shadowRoot.querySelector("#btn-close-settings");
    e.addEventListener("click", (r) => {
      r.preventDefault(), r.stopPropagation(), this.previousFocus = e, this.isOpen ? this.closeAssistant() : this.openAssistant();
    }), a.addEventListener("click", () => this.closeAssistant()), t.addEventListener("keydown", (r) => {
      if (r.key === "Escape") {
        if (this.isSettingsOpen) {
          this.isSettingsOpen = !1;
          const d = this.shadowRoot?.querySelector("#settings-dialog");
          d && d.setAttribute("hidden", "true");
        } else
          this.closeAssistant();
        return;
      }
      if (r.key === "Tab") {
        const d = this.isSettingsOpen ? this.shadowRoot?.querySelector("#settings-dialog") : t;
        if (!d) return;
        const g = Array.from(
          d.querySelectorAll(
            'button:not([disabled]):not([hidden]), [href]:not([disabled]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((j) => j.offsetParent !== null);
        if (g.length === 0) return;
        const p = g[0], b = g[g.length - 1], x = this.shadowRoot?.activeElement ?? document.activeElement;
        r.shiftKey && x === p ? (r.preventDefault(), b.focus()) : !r.shiftKey && x === b && (r.preventDefault(), p.focus());
      }
    }), this.shadowRoot.querySelector("#btn-lang-en")?.addEventListener("click", () => this.setLanguage("en")), this.shadowRoot.querySelector("#btn-lang-am")?.addEventListener("click", () => this.setLanguage("am")), this.shadowRoot.querySelector("#btn-lang-om")?.addEventListener("click", () => this.setLanguage("om")), this.shadowRoot.querySelector("#btn-lang-ar")?.addEventListener("click", () => this.setLanguage("ar")), this.shadowRoot.querySelector(".lang-btn")?.addEventListener("click", () => {
      this.setLanguage(this.currentLang === "en" ? "am" : "en");
    }), i.addEventListener("click", () => {
      this.isSettingsOpen = !0;
      const r = this.shadowRoot?.querySelector("#settings-dialog");
      if (r) {
        r.removeAttribute("hidden");
        const d = r.querySelector("button, input");
        d && d.focus();
      }
    }), n.addEventListener("click", () => {
      this.isSettingsOpen = !1;
      const r = this.shadowRoot?.querySelector("#settings-dialog");
      r && r.setAttribute("hidden", "true"), i.focus();
    });
    const s = [
      { id: "chat", btn: this.shadowRoot.querySelector("#tab-chat"), pane: this.shadowRoot.querySelector("#pane-chat") },
      { id: "support", btn: this.shadowRoot.querySelector("#tab-support"), pane: this.shadowRoot.querySelector("#pane-support") },
      { id: "handoff", btn: this.shadowRoot.querySelector("#tab-handoff"), pane: this.shadowRoot.querySelector("#pane-handoff") }
    ], l = (r) => {
      this.activeTab = s[r].id, s.forEach((g, p) => {
        const b = p === r;
        g.btn?.setAttribute("aria-selected", b ? "true" : "false"), g.pane && (g.pane.hidden = !b, g.pane.style.display = b ? g.id === "chat" ? "flex" : "block" : "none");
      });
      const d = s[r].btn;
      d && (d.focus(), this.announce(d.textContent?.trim() + " tab selected"));
    };
    s.forEach(({ btn: r }, d) => {
      r?.addEventListener("click", () => l(d)), r?.addEventListener("keydown", (g) => {
        const p = g;
        p.key === "ArrowRight" ? (p.preventDefault(), l((d + 1) % s.length)) : p.key === "ArrowLeft" && (p.preventDefault(), l((d - 1 + s.length) % s.length));
      });
    }), this.shadowRoot.querySelectorAll(".btn-talk-person, #btn-footer-handoff").forEach((r) => {
      r.addEventListener("click", (d) => {
        d.preventDefault();
        const g = s.findIndex((p) => p.id === "handoff");
        g >= 0 && l(g);
      });
    }), this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click", () => {
      this.textSize = "smaller", localStorage.setItem("savanna_bridge_text_size", "smaller"), this.render();
    }), this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click", () => {
      this.textSize = "normal", localStorage.setItem("savanna_bridge_text_size", "normal"), this.render();
    }), this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click", () => {
      this.textSize = "larger", localStorage.setItem("savanna_bridge_text_size", "larger"), this.render();
    });
    const h = this.shadowRoot.querySelector("#chk-contrast");
    h && h.addEventListener("change", () => {
      this.highContrast = h.checked, localStorage.setItem("savanna_bridge_contrast", this.highContrast ? "high" : "normal"), this.render();
    });
    const u = this.shadowRoot.querySelector("#chk-simple-mode");
    u && u.addEventListener("change", () => {
      this.simpleMode = u.checked;
    });
    const y = this.shadowRoot.querySelector("#chk-auto-read");
    y && y.addEventListener("change", () => {
      this.autoReadSpeech = y.checked, localStorage.setItem("savanna_bridge_auto_read", this.autoReadSpeech ? "true" : "false"), !this.autoReadSpeech && this.isSpeaking && this.stopSpeaking();
    });
    const R = this.shadowRoot.querySelector("#support-form");
    R && R.addEventListener("submit", (r) => {
      r.preventDefault();
      const d = new FormData(R), g = d.getAll("need"), p = d.get("other_text") || "", b = d.get("contact_mode") || "text";
      this.saveSupportNeeds(g, p, b);
    });
    const A = this.shadowRoot.querySelector("#handoff-request-form, #handoff-form");
    A && A.addEventListener("submit", (r) => {
      r.preventDefault();
      const g = this.shadowRoot?.querySelector("#handoff-reason")?.value?.trim() || void 0;
      this.requestHandoff(g);
    });
    const B = this.shadowRoot.querySelector("#btn-submit-handoff");
    B && B.addEventListener("click", (r) => {
      r.preventDefault();
      const g = this.shadowRoot?.querySelector("#handoff-reason")?.value?.trim() || void 0;
      this.requestHandoff(g);
    });
    const C = this.shadowRoot.querySelector("#chat-form"), k = this.shadowRoot.querySelector("#chat-text-input"), M = this.shadowRoot.querySelector("#mic-btn");
    C && k && C.addEventListener("submit", (r) => {
      r.preventDefault();
      const d = k.value;
      k.value = "", this.askQuestion(d);
    }), M && k && M.addEventListener("click", () => {
      this.toggleVoiceInput(k);
    });
    const q = () => {
      this.showAutoplayBanner = !1, this.accessibilityPrefs.voice_enabled = !0, this.savePreferences(), this.announce(this.t("welcomeSpoken")), this.triggerSpokenWelcome(), this.render();
    };
    this.shadowRoot.querySelector("#btn-activate-voice-welcome")?.addEventListener("click", q), this.shadowRoot.querySelector("#btn-activate-voice-welcome-floating")?.addEventListener("click", q);
    const E = () => {
      this.showAutoplayBanner = !1, this.render();
    };
    this.shadowRoot.querySelector("#btn-dismiss-voice-banner")?.addEventListener("click", E), this.shadowRoot.querySelector("#btn-dismiss-voice-banner-floating")?.addEventListener("click", E), this.shadowRoot.querySelector("#btn-reading-pause")?.addEventListener("click", () => this.pausePageReading()), this.shadowRoot.querySelector("#btn-reading-resume")?.addEventListener("click", () => this.resumePageReading()), this.shadowRoot.querySelector("#btn-reading-stop")?.addEventListener("click", () => this.stopPageReading()), ["en", "am", "om", "ti", "ar"].forEach((r) => {
      this.shadowRoot?.querySelector(`#onboard-lang-${r}`)?.addEventListener("click", () => {
        this.setLanguage(r);
      });
    });
    const $ = (r) => {
      if (r) {
        const d = this.shadowRoot?.querySelector("#onboard-chk-voice")?.checked ?? !0, g = this.shadowRoot?.querySelector("#onboard-chk-screen-reader")?.checked ?? !1, p = this.shadowRoot?.querySelector("#onboard-chk-keyboard-nav")?.checked ?? !1, b = this.shadowRoot?.querySelector("#onboard-chk-contrast")?.checked ?? !1, x = this.shadowRoot?.querySelector("#onboard-chk-large-text")?.checked ?? !1;
        this.accessibilityPrefs.voice_enabled = d, this.accessibilityPrefs.screen_reader_mode = g, this.accessibilityPrefs.keyboard_navigation = p, this.accessibilityPrefs.high_contrast = b, this.accessibilityPrefs.large_text = x ? "larger" : "normal", this.highContrast = b, x && (this.textSize = "larger", localStorage.setItem("savanna_bridge_text_size", "larger"));
      }
      this.accessibilityPrefs.onboarded = !0, this.onboardingDismissed = !0, this.savePreferences(), this.render(), this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome && this.triggerSpokenWelcome();
    };
    this.shadowRoot.querySelector("#btn-onboard-save")?.addEventListener("click", () => $(!0)), this.shadowRoot.querySelector("#btn-onboard-skip")?.addEventListener("click", () => $(!1)), this.shadowRoot.querySelector("#btn-onboard-close")?.addEventListener("click", () => $(!1));
    const S = this.shadowRoot.querySelector("#chk-voice-master");
    S && S.addEventListener("change", () => {
      this.accessibilityPrefs.voice_enabled = S.checked, this.savePreferences(), this.announce(S.checked ? "Voice accessibility enabled" : "Voice accessibility disabled");
    });
    const P = this.shadowRoot.querySelector("#chk-auto-welcome");
    P && P.addEventListener("change", () => {
      this.accessibilityPrefs.auto_welcome = P.checked, this.savePreferences();
    });
    const _ = this.shadowRoot.querySelector("#chk-auto-tts");
    _ && _.addEventListener("change", () => {
      this.accessibilityPrefs.auto_tts = _.checked, this.savePreferences();
    });
    const z = [
      { id: "#btn-rate-075", rate: 0.75 },
      { id: "#btn-rate-100", rate: 1 },
      { id: "#btn-rate-125", rate: 1.25 },
      { id: "#btn-rate-150", rate: 1.5 }
    ];
    z.forEach(({ id: r, rate: d }) => {
      this.shadowRoot?.querySelector(r)?.addEventListener("click", () => {
        this.accessibilityPrefs.speech_rate = d, this.savePreferences(), z.forEach((g) => {
          this.shadowRoot?.querySelector(g.id)?.setAttribute("aria-pressed", g.rate === d ? "true" : "false");
        }), this.announce(`Speech rate set to ${d}x`);
      });
    }), this.shadowRoot.querySelector("#btn-read-page")?.addEventListener("click", () => this.readPageAloud()), this.shadowRoot.querySelector("#btn-read-section")?.addEventListener("click", () => this.readSectionAloud()), this.shadowRoot.querySelector("#btn-test-voice")?.addEventListener("click", () => {
      this.speakText(this.t("welcomeSpoken"));
    });
    const L = this.shadowRoot.querySelector("#chk-screen-reader");
    L && L.addEventListener("change", () => {
      this.accessibilityPrefs.screen_reader_mode = L.checked, this.savePreferences(), this.announce(L.checked ? "Screen reader mode enabled" : "Screen reader mode disabled");
    });
    const w = this.shadowRoot.querySelector("#chk-keyboard-nav");
    w && w.addEventListener("change", () => {
      this.accessibilityPrefs.keyboard_navigation = w.checked, this.savePreferences(), w.checked ? this.classList.add("keyboard-focus-enhanced") : this.classList.remove("keyboard-focus-enhanced"), this.announce(w.checked ? "Enhanced keyboard navigation enabled" : "Enhanced keyboard navigation disabled");
    });
    const T = this.shadowRoot.querySelector("#chk-sync-prefs");
    T && T.addEventListener("change", () => {
      this.accessibilityPrefs.sync_enabled = T.checked, this.savePreferences(), T.checked ? (this.syncPreferencesToBackend(), this.announce("Cross-website synchronization enabled")) : this.announce("Cross-website synchronization disabled");
    }), this.shadowRoot.querySelector("#btn-replay-onboarding")?.addEventListener("click", () => {
      this.accessibilityPrefs.onboarded = !1, this.onboardingDismissed = !1, this.isSettingsOpen = !1, this.render();
    });
  }
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
}
customElements.get("bridge-assistant") || customElements.define("bridge-assistant", N);
customElements.get("db-assistant") || customElements.define("db-assistant", N);
export {
  N as BridgeAssistant,
  o as ICONS
};
//# sourceMappingURL=widget.js.map
