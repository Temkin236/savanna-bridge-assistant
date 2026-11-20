var H = Object.defineProperty;
var O = (T, S, e) => S in T ? H(T, S, { enumerable: !0, configurable: !0, writable: !0, value: e }) : T[S] = e;
var l = (T, S, e) => O(T, typeof S != "symbol" ? S + "" : S, e);
const r = {
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
  stop: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>',
  replay: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
  volume: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
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
  lock: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
  speed: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  sync: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>',
  sparkles: '<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>'
}, w = {
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
    followupQ3: "Quiz me on this topic"
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
    followupQ3: "ግንዛቤዬን ፈትነኝ"
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
    followupQ3: "Hubannoo koo na qori"
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
    followupQ3: "ግንዛበይ ፈትነኒ"
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
    followupQ3: "اختبر فهمي لهذا الموضوع"
  }
}, Q = `
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
class D extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, "isOpen", !1);
    l(this, "currentLang", "en");
    l(this, "textSize", "normal");
    l(this, "highContrast", !1);
    l(this, "simpleMode", !1);
    l(this, "autoReadSpeech", !1);
    l(this, "isOffline", !navigator.onLine);
    // Voice States
    l(this, "isThinking", !1);
    l(this, "isRecording", !1);
    l(this, "isProcessingSpeech", !1);
    l(this, "isSpeaking", !1);
    l(this, "mediaRecorder", null);
    l(this, "audioChunks", []);
    l(this, "activeRecognition", null);
    l(this, "wakeWordRecognizer", null);
    l(this, "activeUtterance", null);
    l(this, "readingWatchdogTimer", null);
    l(this, "currentReading", null);
    l(this, "navCheckTimer", null);
    l(this, "voiceActivationEnabled", !1);
    l(this, "wakeWordRecognition", null);
    l(this, "lastPageUrl", null);
    l(this, "lastPageTitle", null);
    l(this, "lastPageSection", null);
    l(this, "activeAudio", null);
    l(this, "audioCache", /* @__PURE__ */ new Map());
    l(this, "messages", []);
    l(this, "sessionId", `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    // Telegram link state
    l(this, "telegramToken", null);
    l(this, "telegramDeepLink", "https://t.me/savannah_assistant3_bot");
    l(this, "isTelegramLinked", !1);
    l(this, "isLinkCodeInputVisible", !1);
    l(this, "telegramPollTimer", null);
    // Settings dialog visibility
    l(this, "isSettingsOpen", !1);
    // Active Handoff state
    l(this, "activeHandoff", null);
    // Support needs
    l(this, "supportNeeds", {
      needs: ["written_instructions"],
      other_text: "",
      preferred_contact_mode: "text"
    });
    l(this, "activeTab", "chat");
    // Persistent Accessibility & Voice Preferences (Configure Once, Access Everywhere)
    l(this, "accessibilityPrefs", {
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
    l(this, "onboardingDismissed", !1);
    l(this, "onboardingStep", 0);
    l(this, "isReadingPage", !1);
    l(this, "isReadingPaused", !1);
    l(this, "showAutoplayBanner", !1);
    l(this, "hasSpokenWelcomeThisSession", !1);
    l(this, "popstateListener", null);
    l(this, "spokenOnboardingActive", !1);
    l(this, "spokenOnboardingIndex", 0);
    l(this, "pendingVoiceAction", null);
    l(this, "pendingVoiceTranscript", "");
    l(this, "lastSpokenText", "");
    l(this, "voiceRecordingTimeout", null);
    l(this, "previousFocus", null);
  }
  // Attributes: supports both guide plain attributes (lang, api, content) and data-*
  get apiBase() {
    if (typeof window < "u" && window.SAVANNA_API_URL)
      return window.SAVANNA_API_URL;
    if (typeof window < "u" && window.location) {
      const t = new URLSearchParams(window.location.search).get("api");
      if (t) return t;
    }
    const e = this.getAttribute("api") || this.getAttribute("data-api");
    if (typeof window < "u" && window.location && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      if (e && !e.includes("localhost") && !e.includes("127.0.0.1"))
        return e;
      const i = window.location.hostname;
      if (i.includes("-demo.onrender.com"))
        return `${window.location.protocol}//${i.replace("-demo.onrender.com", "-api.onrender.com")}`;
      if (i.includes(".onrender.com"))
        return window.location.origin;
    }
    return e || "http://localhost:8000";
  }
  get courseId() {
    return this.getAttribute("content") || this.getAttribute("data-course") || "course_demo";
  }
  get platformId() {
    return this.getAttribute("platform") || this.getAttribute("data-platform") || window.location.hostname || "generic";
  }
  get platformName() {
    return this.getAttribute("platform-name") || this.getAttribute("data-platform-name") || document.title || "this platform";
  }
  static get observedAttributes() {
    return [
      "lang",
      "data-lang",
      "api",
      "data-api",
      "content",
      "data-course",
      "platform",
      "data-platform",
      "platform-name",
      "data-platform-name"
    ];
  }
  attributeChangedCallback(e, i, t) {
    if (i !== t && (e === "lang" || e === "data-lang") && t in w) {
      if (this.currentLang === t) {
        this.setAttribute("dir", t === "ar" ? "rtl" : "ltr");
        return;
      }
      this.currentLang = t, this.shadowRoot && this.render();
    }
  }
  connectedCallback() {
    if (this.shadowRoot) return;
    this.restoreState();
    const e = this.getAttribute("lang") || this.getAttribute("data-lang"), i = localStorage.getItem("savanna_bridge_preferred_lang"), t = sessionStorage.getItem("savanna_bridge_lang");
    e && e in w ? this.currentLang = e : this.accessibilityPrefs.language && this.accessibilityPrefs.language in w ? this.currentLang = this.accessibilityPrefs.language : i && i in w ? this.currentLang = i : t && t in w && (this.currentLang = t), this.accessibilityPrefs.keyboard_navigation && this.classList.add("keyboard-focus-enhanced"), this.accessibilityPrefs.screen_reader_mode && this.classList.add("screen-reader-mode"), this.attachShadow({ mode: "open" }), this.render(), this.setupNetworkMonitor(), this.setupPageNavigationMonitor(), this.voiceActivationEnabled && this.setupWakeWordDetector(), this.popstateListener = () => {
      this.isReadingPage && this.stopPageReading();
    }, window.addEventListener("popstate", this.popstateListener), this.fetchTelegramStartLink(), this.fetchSupportNeeds(), this.accessibilityPrefs.voice_enabled && this.initWakeWordDetection(), this.initGlobalKeyboardShortcuts(), this.accessibilityPrefs.sync_enabled && this.syncPreferencesFromBackend(), this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome && !this.hasSpokenWelcomeThisSession && setTimeout(() => this.triggerSpokenWelcome(), 500);
  }
  disconnectedCallback() {
    if (this.telegramPollTimer && (window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null), this.voiceRecordingTimeout && (window.clearTimeout(this.voiceRecordingTimeout), this.voiceRecordingTimeout = null), this.wakeWordRecognizer) {
      try {
        this.wakeWordRecognizer.stop();
      } catch {
      }
      this.wakeWordRecognizer = null;
    }
    if (this.wakeWordRecognition) {
      try {
        this.wakeWordRecognition.stop();
      } catch {
      }
      this.wakeWordRecognition = null;
    }
    this.stopSpeaking(), this.popstateListener && (window.removeEventListener("popstate", this.popstateListener), this.popstateListener = null), this.navCheckTimer && (window.clearInterval(this.navCheckTimer), this.navCheckTimer = null), this.isReadingPage && this.stopPageReading(), this.stopPageReadingHighlight();
  }
  t(e) {
    return (w[this.currentLang] || w.en)[e] || w.en[e] || e;
  }
  announce(e) {
    const i = this.shadowRoot?.querySelector("#live-announcer");
    i && (i.textContent = "", setTimeout(() => {
      i.textContent = e;
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
  setLanguage(e, i = !0) {
    this.currentLang = e, sessionStorage.setItem("savanna_bridge_lang", e), this.accessibilityPrefs.language = e, this.savePreferences(), this.setAttribute("lang", e), this.setAttribute("dir", e === "ar" ? "rtl" : "ltr"), i ? (this.messages = [], sessionStorage.removeItem("savanna_bridge_chat_history"), this.render(), this.announce(this.t("appTitle")), this.accessibilityPrefs.voice_enabled && this.speakText(this.t("voiceWelcomeAnnouncement"))) : (this.updateHeaderLanguageButtons(), this.updateVoiceStatusUI());
  }
  clearChat() {
    this.messages = [], sessionStorage.removeItem("savanna_bridge_chat_history"), this.renderMessages(), this.announce(this.t("emptyWelcome"));
  }
  getPlatformInfo() {
    const e = this.extractPlatformContext(), i = e.page_title || (typeof document < "u" ? document.title : "Web Session"), t = e.page_url || (typeof window < "u" ? window.location.href : ""), a = `${i} ${t} ${this.courseId}`.toLowerCase();
    let n = "general";
    return a.includes("job") || a.includes("career") || a.includes("internship") || a.includes("hire") || a.includes("work") ? n = "jobs" : (a.includes("course") || a.includes("lesson") || a.includes("module") || a.includes("learn") || a.includes("student") || a.includes("class")) && (n = "course"), { title: i, url: t, type: n };
  }
  async generateLinkCode() {
    try {
      const e = this.getPlatformInfo(), i = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
          platform_id: this.platformId,
          platform_name: this.platformName,
          platform_title: e.title,
          platform_url: e.url,
          platform_type: e.type,
          course_id: this.courseId
        })
      });
      if (i.ok) {
        const t = await i.json();
        this.telegramToken = t.token, this.telegramDeepLink = t.deep_link || this.telegramDeepLink;
        const a = this.shadowRoot?.querySelector("#code-display");
        a && (a.textContent = t.code || t.token, a.style.display = "block", this.announce(`${this.t("yourCodeIs")} ${t.code || t.token}`));
        const n = this.shadowRoot?.querySelector("#code-instructions");
        n && (n.style.display = "block"), this.onTelegramLinkClicked();
      }
    } catch (e) {
      console.warn("Failed to generate link code", e);
    }
  }
  async confirmLinkCode(e, i) {
    const t = e.trim().replace(/\s+/g, "");
    if (!t) return !1;
    i && (i.style.display = "block", i.style.color = "var(--b-text-muted)", i.textContent = "Verifying code...");
    try {
      const a = await fetch(`${this.apiBase}/api/v1/link/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: t })
      });
      return a.ok && (await a.json()).linked ? (this.isTelegramLinked = !0, this.isLinkCodeInputVisible = !1, this.telegramPollTimer && (window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null), i && (i.style.color = "#166534", i.textContent = this.t("codeLinkSuccess")), this.announce(this.t("codeLinkSuccess")), setTimeout(() => {
        this.updateTelegramLinkUI(), this.updateLinkCodeUI(), this.render();
      }, 600), !0) : (i && (i.style.color = "#dc2626", i.textContent = this.t("codeLinkError")), !1);
    } catch (a) {
      return console.warn("Error confirming link code:", a), i && (i.style.color = "#dc2626", i.textContent = this.t("codeLinkError")), !1;
    }
  }
  updateHeaderLanguageButtons() {
    const e = this.shadowRoot;
    if (!e) return;
    ["en", "am", "om", "ti", "ar"].forEach((t) => {
      const a = e.querySelector(`#btn-lang-${t}`);
      a && a.setAttribute("aria-pressed", t === this.currentLang ? "true" : "false");
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
      const i = JSON.parse(e);
      localStorage.removeItem("db_assistant_offline_queue");
      for (const t of i)
        t && t.question && await this.askQuestion(t.question);
    } catch (e) {
      console.warn("Could not flush offline queue", e);
    }
  }
  restoreState() {
    try {
      const e = sessionStorage.getItem("savanna_bridge_chat_history");
      e && (this.messages = JSON.parse(e));
      const i = localStorage.getItem("savanna_voice_prefs");
      if (i)
        try {
          const h = JSON.parse(i);
          this.accessibilityPrefs = { ...this.accessibilityPrefs, ...h };
        } catch {
        }
      const t = localStorage.getItem("savanna_bridge_preferred_lang");
      t && t in w && (this.currentLang = t, this.accessibilityPrefs.language = t);
      const a = localStorage.getItem("savanna_bridge_contrast");
      a && (this.highContrast = a === "high", this.accessibilityPrefs.high_contrast = this.highContrast);
      const n = localStorage.getItem("savanna_bridge_text_size");
      n && (this.textSize = n, this.accessibilityPrefs.large_text = n);
      const s = localStorage.getItem("savanna_bridge_auto_read");
      s !== null && (this.autoReadSpeech = s === "true");
      const c = localStorage.getItem("savanna_bridge_simple_mode");
      c && (this.simpleMode = c === "true", this.accessibilityPrefs.simple_mode = this.simpleMode);
      const o = localStorage.getItem("savanna_bridge_wake_word");
      o && (this.voiceActivationEnabled = o === "true");
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
      const e = this.getAttribute("learner-id") || `learner_${this.sessionId}`, i = await fetch(`${this.apiBase}/api/v1/accessibility-profile?learner_ref=${encodeURIComponent(e)}`);
      if (i.ok) {
        const t = await i.json();
        t && t.updated_at && (this.accessibilityPrefs.voice_enabled = !!t.voice_enabled, this.accessibilityPrefs.auto_welcome = !!t.auto_welcome, this.accessibilityPrefs.auto_tts = !!t.auto_tts, typeof t.speech_rate == "number" && (this.accessibilityPrefs.speech_rate = t.speech_rate), t.language && t.language in w && (this.currentLang = t.language, this.accessibilityPrefs.language = t.language), t.large_text && (this.textSize = t.large_text), typeof t.high_contrast == "boolean" && (this.highContrast = t.high_contrast), typeof t.simple_mode == "boolean" && (this.simpleMode = t.simple_mode), typeof t.onboarded == "boolean" && (this.accessibilityPrefs.onboarded = t.onboarded), this.savePreferences(), this.render());
      }
    } catch (e) {
      console.warn("Could not fetch accessibility profile from backend:", e);
    }
  }
  getBestVoice(e) {
    if (!("speechSynthesis" in window)) return null;
    const i = window.speechSynthesis.getVoices();
    if (!i || i.length === 0) return null;
    const a = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      ar: "ar-SA"
    }[e].toLowerCase(), n = e.toLowerCase();
    let s = i.find((h) => h.lang.toLowerCase() === a);
    if (s || (s = i.find((h) => h.lang.toLowerCase().startsWith(n)), s)) return s;
    const o = {
      en: "english",
      am: "amharic",
      om: "oromo",
      ti: "tigrinya",
      ar: "arabic"
    }[e];
    return s = i.find((h) => h.name.toLowerCase().includes(o)), s || null;
  }
  speakText(e, i) {
    if (this.lastSpokenText = e, !("speechSynthesis" in window))
      return i?.onError && i.onError(), !1;
    try {
      window.speechSynthesis.cancel();
      const t = new SpeechSynthesisUtterance(e), a = {
        en: "en-US",
        am: "am-ET",
        om: "om-ET",
        ti: "ti-ET",
        ar: "ar-SA"
      };
      t.lang = a[this.currentLang] || "en-US", t.rate = i?.rate || this.accessibilityPrefs.speech_rate || 1;
      const n = this.getBestVoice(this.currentLang);
      return n && (t.voice = n), t.onstart = () => {
        i?.onStart && i.onStart();
      }, t.onend = () => {
        i?.onEnd && i.onEnd();
      }, t.onerror = (s) => {
        console.warn("Speech synthesis error or autoplay blocked:", s), i?.onError && i.onError(s);
      }, window.speechSynthesis.speak(t), !0;
    } catch (t) {
      return console.warn("Could not initiate speech synthesis:", t), i?.onError && i.onError(t), !1;
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
    const e = typeof window < "u" ? window.location.href : "";
    let i = typeof document < "u" && document.title || "Savanna Platform", t = "Current Lesson";
    if (typeof document < "u") {
      const n = document.querySelector(
        ".curriculum-switcher-label span, .curriculum-title, .course-header h1, h1.course-name"
      );
      n && n.textContent?.trim() ? i = n.textContent.trim() : i.includes("|") && (i = i.split("|")[0].replace(/^Concept page:\s*/i, "").trim());
      const s = document.querySelector(
        ".homepage-card h5, .formatted-content h5, .active-lesson, [aria-current='page'], #curriculum_navigation_content .active, .card-title, h2, h1"
      );
      s && s.textContent && (t = s.textContent.trim().replace(/^[\s\n\r]+|[\s\n\r]+$/g, ""));
    }
    let a = "";
    if (typeof document < "u") {
      const n = document.querySelector("#curriculum_navigation_content") || document.querySelector("#static-track-host") || document.querySelector(".homepage-card:not(.d-none)") || document.querySelector(".formatted-content") || document.querySelector("article") || document.querySelector("main") || document.querySelector(".card-body") || document.querySelector(".content") || document.body;
      if (n)
        try {
          const s = n.cloneNode(!0);
          s.querySelectorAll(
            "script, style, db-assistant, bridge-assistant, noscript, nav, footer, header, #sidebar, .sidebar, button, input"
          ).forEach((o) => o.remove());
          const c = [];
          s.querySelectorAll("h1, h2, h3, h4, h5, p, li").forEach((o) => {
            const h = (o.textContent || "").replace(/\s+/g, " ").trim();
            if (h) {
              const g = o.tagName.toLowerCase();
              g.startsWith("h") ? c.push(`
${h}
`) : g === "li" ? c.push(`• ${h}`) : c.push(h);
            }
          }), c.length > 0 ? a = c.join(`

`).slice(0, 15e3) : a = (s.textContent || "").replace(/\s+/g, " ").trim().slice(0, 15e3);
        } catch {
          a = "";
        }
    }
    return { page_url: e, page_title: i, page_content: a, section: t };
  }
  readPageAloud() {
    const e = this.extractPlatformContext();
    if (!e.page_content && !e.page_title) {
      this.announce("No readable content found on this page.");
      return;
    }
    this.isReadingPage = !0, this.isReadingPaused = !1, this.render();
    const i = e.page_title ? `${e.page_title}. ` : "", t = e.section ? `${e.section}. ` : "", a = `${i}${t}${e.page_content}`.slice(0, 1e4);
    this.announce(this.t("readingPageAnnouncement")), this.speakText(a, {
      onEnd: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      },
      onError: () => {
        this.isReadingPage = !1, this.isReadingPaused = !1, this.render();
      }
    });
  }
  readSectionAloud() {
    const e = this.extractPlatformContext(), i = e.section || e.page_title;
    if (!i) {
      this.announce("No active section found.");
      return;
    }
    this.isReadingPage = !0, this.isReadingPaused = !1, this.render(), this.announce(this.t("readingSectionAnnouncement")), this.speakText(`${i}. ${e.page_content.slice(0, 2e3)}`, {
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
      const i = window.AudioContext || window.webkitAudioContext;
      if (!i) return;
      const t = new i(), a = t.createOscillator(), n = t.createGain();
      a.connect(n), n.connect(t.destination);
      const s = t.currentTime;
      e === "wake" || e === "start" ? (a.type = "sine", a.frequency.setValueAtTime(440, s), a.frequency.exponentialRampToValueAtTime(880, s + 0.15), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.22), a.start(s), a.stop(s + 0.22)) : e === "stop" ? (a.type = "sine", a.frequency.setValueAtTime(880, s), a.frequency.exponentialRampToValueAtTime(440, s + 0.15), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.22), a.start(s), a.stop(s + 0.22)) : e === "transcribed" && (a.type = "triangle", a.frequency.setValueAtTime(587.33, s), a.frequency.setValueAtTime(880, s + 0.08), n.gain.setValueAtTime(0.12, s), n.gain.exponentialRampToValueAtTime(1e-3, s + 0.2), a.start(s), a.stop(s + 0.2));
    } catch {
    }
  }
  // --- Wake Word Detection ("Help") ---
  initWakeWordDetection() {
    if (!this.accessibilityPrefs.voice_enabled || this.wakeWordRecognizer) return;
    const e = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (e)
      try {
        const i = new e();
        i.continuous = !0, i.interimResults = !0, i.lang = "en-US", i.onresult = (t) => {
          if (!this.isRecording)
            for (let a = t.resultIndex; a < t.results.length; a++) {
              const n = (t.results[a][0]?.transcript || "").toLowerCase();
              if (n.includes("help") || n.includes("እርዳታ") || n.includes("እርዳኝ") || n.includes("gargaarsa") || n.includes("مساعدة") || n.includes("ساعدني")) {
                this.onWakeWordTriggered();
                break;
              }
            }
        }, i.onerror = () => {
        }, i.onend = () => {
          if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer)
            try {
              i.start();
            } catch {
            }
        }, i.start(), this.wakeWordRecognizer = i;
      } catch (i) {
        console.warn("Wake word background recognition notice:", i);
      }
  }
  onWakeWordTriggered() {
    this.openAssistant(), this.playEarcon("wake"), this.announce(this.t("voiceListening"));
    const e = this.shadowRoot?.querySelector("#chat-input");
    e && this.startVoiceRecording(e);
  }
  initGlobalKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        const i = this.shadowRoot?.querySelector("#launcher-btn");
        this.isOpen ? this.closeAssistant() : (this.previousFocus = i ?? null, this.openAssistant());
        return;
      }
      if (e.altKey && e.shiftKey && (e.key === "V" || e.key === "v")) {
        e.preventDefault();
        const i = this.shadowRoot?.querySelector("#launcher-btn");
        this.isOpen || (this.previousFocus = i ?? null, this.openAssistant());
        const t = this.shadowRoot?.querySelector("#chat-input");
        t && this.toggleVoiceInput(t);
        return;
      }
    });
  }
  openAssistant() {
    if (this.isOpen) return;
    this.isOpen = !0;
    const e = this.shadowRoot?.querySelector("#assistant-dialog"), i = this.shadowRoot?.querySelector("#launcher-btn");
    if (e && i) {
      e.hidden = !1, e.removeAttribute("hidden"), e.style.display = "flex", i.setAttribute("aria-expanded", "true"), this.announce("Savanna Bridge Assistant opened. Use Tab to navigate or Escape to close.");
      const t = this.shadowRoot?.querySelector("#chat-input"), a = this.shadowRoot?.querySelector("#dialog-title"), n = this.shadowRoot?.querySelector("#onboard-title");
      setTimeout(
        () => {
          const s = n ?? (this.accessibilityPrefs.screen_reader_mode ? a : t);
          s ? s.focus() : e.focus();
        },
        60
      );
    }
  }
  closeAssistant() {
    this.isOpen = !1;
    const e = this.shadowRoot?.querySelector("#assistant-dialog"), i = this.shadowRoot?.querySelector("#launcher-btn");
    if (e && i) {
      e.setAttribute("hidden", "true"), e.style.display = "none", i.setAttribute("aria-expanded", "false");
      const t = this.previousFocus === this;
      (this.previousFocus && !t && this.previousFocus !== document.body && this.previousFocus !== e && !e.contains(this.previousFocus) ? this.previousFocus : i).focus();
    }
    this.stopSpeaking(), this.isRecording && this.stopVoiceRecording();
  }
  // --- Telegram Link Methods ---
  async fetchTelegramStartLink() {
    try {
      const e = this.getPlatformInfo(), i = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: `learner_${this.sessionId}`,
          platform_id: this.platformId,
          platform_name: this.platformName,
          platform_title: e.title,
          platform_url: e.url,
          platform_type: e.type,
          course_id: this.courseId
        })
      });
      if (i.ok) {
        const t = await i.json();
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
    const i = 300;
    this.telegramPollTimer = window.setInterval(async () => {
      if (e++, e > i) {
        this.telegramPollTimer && window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null;
        return;
      }
      try {
        const t = await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken)}`);
        t.ok && (await t.json()).linked && (this.telegramPollTimer && window.clearInterval(this.telegramPollTimer), this.telegramPollTimer = null, this.isTelegramLinked = !0, this.announce(this.t("telegramConnected")), this.updateTelegramLinkUI());
      } catch (t) {
        console.warn("Telegram status polling error:", t);
      }
    }, 2e3);
  }
  async disconnectTelegram() {
    try {
      await fetch(`${this.apiBase}/api/v1/link/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: this.telegramToken,
          learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`
        })
      });
    } catch {
    }
    this.isTelegramLinked = !1, await this.fetchTelegramStartLink(), this.updateTelegramLinkUI(), this.updateLinkCodeUI(), this.render();
  }
  updateLinkCodeUI() {
    const e = this.shadowRoot?.querySelector("#link-code-container");
    if (!e) return;
    if (this.isTelegramLinked) {
      e.innerHTML = "";
      return;
    }
    e.innerHTML = `
      <div style="display:flex; justify-content:center; margin-top:0.25rem;">
        <button type="button" class="btn-toggle-link-code" id="btn-toggle-link-code" style="background:none; border:none; color:var(--b-primary); font-size:0.75rem; text-decoration:underline; cursor:pointer; padding:0.125rem 0;">
          ${this.isLinkCodeInputVisible ? this.t("hideCodePrompt") : `${r.link} <span>${this.t("haveCodePrompt")}</span>`}
        </button>
      </div>
      ${this.isLinkCodeInputVisible ? `
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
      ` : ""}
    `, e.querySelector("#btn-toggle-link-code")?.addEventListener("click", () => {
      this.isLinkCodeInputVisible = !this.isLinkCodeInputVisible, this.updateLinkCodeUI();
    });
    const i = e.querySelector("#footer-code-form");
    i && i.addEventListener("submit", (t) => {
      t.preventDefault();
      const a = e.querySelector("#footer-input-code"), n = e.querySelector("#footer-code-msg");
      a && a.value && this.confirmLinkCode(a.value, n);
    });
  }
  updateTelegramLinkUI() {
    const e = this.shadowRoot?.querySelector("#telegram-container");
    e && (this.isTelegramLinked ? (e.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ${this.t("connectedToTelegram")}
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg">
            ${this.t("disconnectTelegram")}
          </button>
        </div>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `, e.querySelector("#btn-disconnect-tg")?.addEventListener("click", () => this.disconnectTelegram())) : (e.innerHTML = `
        <a href="${this.telegramDeepLink}" target="_blank" rel="noopener noreferrer" 
           class="btn btn-secondary btn-footer" id="tg-deep-link" 
           aria-label="${this.t("continueOnTelegramAria")}">
          ${this.t("continueOnTelegram")}
        </a>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `, e.querySelector("#tg-deep-link")?.addEventListener("click", () => this.onTelegramLinkClicked())));
  }
  // --- Support Needs API ---
  async fetchSupportNeeds() {
    try {
      const e = await fetch(`${this.apiBase}/api/v1/support-needs`);
      if (e.ok) {
        const i = await e.json();
        this.supportNeeds = {
          needs: i.needs || [],
          other_text: i.other_text || "",
          preferred_contact_mode: i.preferred_contact_mode || "text"
        };
      }
    } catch {
    }
  }
  async saveSupportNeeds(e, i, t) {
    this.supportNeeds = {
      needs: e,
      other_text: i,
      preferred_contact_mode: t
    };
    try {
      const a = await fetch(`${this.apiBase}/api/v1/support-needs`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.supportNeeds)
      }), n = this.shadowRoot?.querySelector("#support-saved-notice");
      n && (n.removeAttribute("hidden"), setTimeout(() => n.setAttribute("hidden", "true"), 3500)), a.ok || console.warn("PUT /support-needs failed", a.status);
    } catch (a) {
      console.warn("Save support needs error:", a);
    }
  }
  // --- Language Script Detection ---
  detectLanguage(e) {
    return /[\u1200-\u137F]/.test(e) ? "am" : /[\u0600-\u06FF]/.test(e) ? "ar" : /\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/i.test(e) || /\b[A-Za-z]+'[A-Za-z]+\b/.test(e) ? "om" : "en";
  }
  detectLanguageWithConfidence(e) {
    const i = e.trim();
    if (/[؀-ۿ]/.test(i)) return { language: "ar", confidence: 0.99 };
    if (/[ሀ-፿]/.test(i)) {
      const n = /\b(ናይ|እንታይ|እቲ|እዚ|ከመይ|ትምህርቲ)\b/.test(i);
      return { language: n ? "ti" : "am", confidence: n ? 0.94 : 0.92 };
    }
    const t = i.match(/\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/gi);
    return t?.length ? { language: "om", confidence: Math.min(0.98, 0.8 + t.length * 0.06) } : (i.match(/[A-Za-z]+/g) || []).length >= 3 ? { language: "en", confidence: 0.9 } : { language: this.currentLang, confidence: 0.45 };
  }
  collectPageControls() {
    return Array.from(
      document.querySelectorAll(
        "button, a[href], input, select, textarea, [role='button'], [role='link'], [tabindex]"
      )
    ).filter((i) => !this.contains(i) && !i.hasAttribute("disabled")).slice(0, 100).map((i, t) => {
      let a = i.getAttribute("data-savanna-action-id");
      a || (a = `page-control-${t}-${Math.random().toString(36).slice(2, 7)}`, i.setAttribute("data-savanna-action-id", a));
      const n = i, s = (i.getAttribute("aria-label") || i.getAttribute("title") || n.labels?.[0]?.textContent || i.textContent || n.placeholder || n.value || i.getAttribute("name") || i.tagName.toLowerCase()).replace(/\s+/g, " ").trim().slice(0, 120);
      return {
        id: a,
        label: s,
        role: i.getAttribute("role") || i.tagName.toLowerCase()
      };
    });
  }
  findPageControl(e) {
    return e && Array.from(document.querySelectorAll("[data-savanna-action-id]")).find((i) => i.getAttribute("data-savanna-action-id") === e) || null;
  }
  isAffirmative(e) {
    return /^(yes|yeah|yep|confirm|okay|ok|አዎ|እሺ|eeyyee|እወ|نعم|أجل)\b/i.test(e.trim());
  }
  isNegative(e) {
    return /^(no|nope|cancel|stop|አይ|አይደለም|lakki|ኣይፋል|لا|إلغاء)\b/i.test(e.trim());
  }
  async planVoiceAction(e) {
    const i = {
      action: "none",
      spoken_confirmation: "I did not recognize a page command.",
      requires_confirmation: !1,
      confidence: 0,
      language: this.currentLang
    };
    try {
      const t = await fetch(`${this.apiBase}/api/v1/agent/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utterance: e,
          language: this.currentLang,
          page_title: document.title,
          available_controls: this.collectPageControls()
        })
      });
      if (t.ok) return await t.json();
    } catch (t) {
      console.warn("Voice command planner unavailable; keeping editable transcript.", t);
    }
    return i;
  }
  async executeVoiceAction(e) {
    const i = this.findPageControl(e.target);
    switch (e.action) {
      case "read_page":
        this.readPageAloud();
        return;
      case "read_section":
        this.readSectionAloud();
        return;
      case "list_controls": {
        const t = this.collectPageControls().map((n) => n.label).filter(Boolean).slice(0, 20), a = t.length ? `Available controls: ${t.join(", ")}.` : "No labelled page controls were found.";
        this.announce(a), this.speakText(a);
        return;
      }
      case "focus_control":
        i && (i.focus(), i.scrollIntoView({ block: "center", behavior: "smooth" }), this.announce(e.spoken_confirmation));
        return;
      case "activate_control":
        i?.click(), this.announce(e.spoken_confirmation);
        return;
      case "fill_control":
        (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) && (i.value = e.value || "", i.dispatchEvent(new Event("input", { bubbles: !0 })), i.dispatchEvent(new Event("change", { bubbles: !0 })), i.focus());
        return;
      case "submit": {
        const t = this.shadowRoot?.querySelector("#chat-input");
        if (!i && t?.value.trim()) {
          const a = t.value;
          t.value = "", this.pendingVoiceTranscript = "", await this.askQuestion(a);
          return;
        }
        i instanceof HTMLButtonElement || i instanceof HTMLInputElement ? i.click() : i instanceof HTMLFormElement && i.requestSubmit();
        return;
      }
      case "stop_reading":
        this.stopPageReading();
        return;
      case "repeat":
        this.lastSpokenText && this.speakText(this.lastSpokenText);
        return;
      default:
        return;
    }
  }
  async handleVoiceTranscript(e, i) {
    const t = e.trim();
    if (!t) return;
    if (this.spokenOnboardingActive) {
      this.handleSpokenOnboardingAnswer(t);
      return;
    }
    if (this.shadowRoot?.querySelector("#onboarding-overlay") && (this.isAffirmative(t) || this.isNegative(t))) {
      this.speakText("Choose Start spoken setup before answering yes or no.");
      return;
    }
    if (this.pendingVoiceAction) {
      if (this.isAffirmative(t)) {
        const c = this.pendingVoiceAction;
        this.pendingVoiceAction = null, await this.executeVoiceAction(c);
      } else this.isNegative(t) ? (this.pendingVoiceAction = null, this.announce("Action cancelled."), this.speakText("Action cancelled.")) : this.speakText("Please say yes to confirm or no to cancel.");
      return;
    }
    const a = this.detectLanguageWithConfidence(t);
    a.confidence >= 0.82 && a.language !== this.currentLang && this.setLanguage(a.language, !1);
    const n = await this.planVoiceAction(t);
    if (n.language && n.confidence >= 0.82 && n.language !== this.currentLang && this.setLanguage(n.language, !1), n.action !== "none") {
      n.requires_confirmation ? (this.pendingVoiceAction = n, this.announce(n.spoken_confirmation), this.speakText(n.spoken_confirmation)) : await this.executeVoiceAction(n);
      return;
    }
    i.value = t, i.focus(), this.pendingVoiceTranscript = t;
    const s = `I heard: ${t}. You can edit it, or say send.`;
    this.announce(s), this.speakText(s);
  }
  spokenOnboardingQuestions() {
    const e = {
      en: "English is selected. Continue in English? Say yes or no.",
      am: "አማርኛ ተመርጧል። በአማርኛ እንቀጥል? አዎ ወይም አይ ይበሉ።",
      om: "Afaan Oromoo filatameera. Afaan Oromootiin itti fufnaa? Eeyyee ykn lakki jedhaa.",
      ti: "ትግርኛ ተመሪጹ። ብትግርኛ ንቐጽል? እወ ወይ ኣይፋል በሉ።",
      ar: "تم اختيار العربية. هل نتابع بالعربية؟ قل نعم أو لا."
    };
    return {
      en: [
        e.en,
        "Are you using a screen reader such as NVDA, TalkBack, or VoiceOver?",
        "Would you like enhanced keyboard focus?",
        "Would you like high contrast colors?",
        "Would you like larger text?",
        "Would you like voice assistance? Say yes or no.",
        "Should I read new answers aloud automatically?"
      ],
      am: [
        e.am,
        "NVDA፣ TalkBack ወይም VoiceOver የሚባል የማያ አንባቢ ይጠቀማሉ?",
        "ግልጽ የቁልፍ ሰሌዳ ትኩረት ይፈልጋሉ?",
        "ከፍተኛ ንፅፅር ቀለም ይፈልጋሉ?",
        "ትልቅ ጽሑፍ ይፈልጋሉ?",
        "የድምጽ እርዳታ ይፈልጋሉ? አዎ ወይም አይ ይበሉ።",
        "አዲስ መልሶችን በራስ-ሰር እንዳነብልዎት ይፈልጋሉ?"
      ],
      om: [
        e.om,
        "Dubbisaa iskiriinii akka NVDA, TalkBack ykn VoiceOver fayyadamtu?",
        "Xiyyeeffannoo kiiboodii ifaa barbaadduu?",
        "Halluu walbira qabuu olaanaa barbaadduu?",
        "Barreeffama guddaa barbaadduu?",
        "Gargaarsa sagalee barbaadduu? Eeyyee ykn lakki jedhaa.",
        "Deebii haaraa ofumaan sagaleedhaan dubbisuu qabaa?"
      ],
      ti: [
        e.ti,
        "ከም NVDA፣ TalkBack ወይ VoiceOver ዝኣመሰለ ኣንባቢ ስክሪን ትጥቀሙ ዶ?",
        "ንጹር ናይ ኪቦርድ ትኹረት ትደልዩ ዶ?",
        "ልዑል ንጽጽር ሕብሪ ትደልዩ ዶ?",
        "ዓቢ ጽሑፍ ትደልዩ ዶ?",
        "ናይ ድምጺ ሓገዝ ትደልዩ ዶ? እወ ወይ ኣይፋል በሉ።",
        "ሓደስቲ መልስታት ብኣውቶማቲክ ከንብበልኩም ዶ?"
      ],
      ar: [
        e.ar,
        "هل تستخدم قارئ شاشة مثل NVDA أو TalkBack أو VoiceOver؟",
        "هل تريد مؤشراً أوضح للتركيز عند استخدام لوحة المفاتيح؟",
        "هل تريد ألواناً عالية التباين؟",
        "هل تريد نصاً أكبر؟",
        "هل تريد المساعدة الصوتية؟ قل نعم أو لا.",
        "هل تريد قراءة الإجابات الجديدة بصوت عال تلقائياً؟"
      ]
    }[this.currentLang];
  }
  startSpokenOnboarding() {
    this.stopPageReading(), this.pendingVoiceAction = null, this.spokenOnboardingActive = !0, this.spokenOnboardingIndex = [0, 1, 3, 5][this.onboardingStep] ?? 0, this.speakSpokenOnboardingQuestion();
  }
  speakSpokenOnboardingQuestion(e = "") {
    const i = this.spokenOnboardingQuestions()[this.spokenOnboardingIndex];
    if (!i) return;
    const t = e ? `${e} ${i}` : i;
    this.announce(t), this.speakText(t, {
      onEnd: () => {
        const a = this.shadowRoot?.querySelector("#chat-input");
        a && this.spokenOnboardingActive && this.startVoiceRecording(a);
      }
    });
  }
  handleSpokenOnboardingAnswer(e) {
    if (!this.isAffirmative(e) && !this.isNegative(e)) {
      this.speakText("Please answer yes or no.", { onEnd: () => this.speakSpokenOnboardingQuestion() });
      return;
    }
    const i = this.isAffirmative(e), t = {
      en: ["Selected yes.", "Selected no."],
      am: ["አዎ ተመርጧል።", "አይ ተመርጧል።"],
      om: ["Eeyyee filatameera.", "Lakki filatameera."],
      ti: ["እወ ተመሪጹ።", "ኣይፋል ተመሪጹ።"],
      ar: ["تم اختيار نعم.", "تم اختيار لا."]
    };
    if (this.spokenOnboardingIndex === 0 && !i) {
      this.spokenOnboardingActive = !1;
      const n = {
        en: "Choose another language, then select Start spoken setup again.",
        am: "ሌላ ቋንቋ ይምረጡ፣ ከዚያ የድምጽ ቅንብርን እንደገና ይጀምሩ።",
        om: "Afaan biraa filadhaa, sana booda qindaa'ina sagalee irra deebi'aa jalqabaa.",
        ti: "ካልእ ቋንቋ ምረጹ፣ ድሕሪኡ ናይ ድምጺ ቅጥዒ እንደገና ጀምሩ።",
        ar: "اختر لغة أخرى، ثم ابدأ الإعداد الصوتي مرة أخرى."
      };
      this.speakText(n[this.currentLang]);
      return;
    }
    switch (this.spokenOnboardingIndex) {
      case 0:
        break;
      case 1:
        this.accessibilityPrefs.screen_reader_mode = i;
        break;
      case 2:
        this.accessibilityPrefs.keyboard_navigation = i;
        break;
      case 3:
        this.highContrast = i, this.accessibilityPrefs.high_contrast = i;
        break;
      case 4:
        this.textSize = i ? "larger" : "normal", this.accessibilityPrefs.large_text = this.textSize;
        break;
      case 5:
        this.accessibilityPrefs.voice_enabled = i;
        break;
      case 6:
        this.accessibilityPrefs.auto_tts = i;
        break;
    }
    if (this.spokenOnboardingIndex += 1, this.spokenOnboardingIndex < this.spokenOnboardingQuestions().length) {
      this.onboardingStep = this.spokenOnboardingIndex < 1 ? 0 : this.spokenOnboardingIndex < 3 ? 1 : this.spokenOnboardingIndex < 5 ? 2 : 3, this.savePreferences(), this.render(), setTimeout(
        () => this.speakSpokenOnboardingQuestion(t[this.currentLang][i ? 0 : 1]),
        0
      );
      return;
    }
    this.spokenOnboardingActive = !1, this.accessibilityPrefs.onboarded = !0, this.onboardingDismissed = !0, this.savePreferences(), this.render();
    const a = {
      en: "Setup complete. You can change these choices in accessibility settings.",
      am: "ቅንብሩ ተጠናቋል። እነዚህን ምርጫዎች በተደራሽነት ቅንብሮች ውስጥ መቀየር ይችላሉ።",
      om: "Qindaa'inni xumurameera. Filannoowwan kana qindaa'ina qaqqabummaa keessatti jijjiiruu dandeessu.",
      ti: "ቅጥዒ ተዛዚሙ። ነዞም ምርጫታት ኣብ ቅጥዒ ተበጻሕነት ክትቅይሩ ትኽእሉ።",
      ar: "اكتمل الإعداد. يمكنك تغيير هذه الخيارات من إعدادات إمكانية الوصول."
    };
    this.speakText(a[this.currentLang]), this.accessibilityPrefs.voice_enabled && this.initWakeWordDetection();
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
    let i = !1;
    const t = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (t)
      try {
        this.activeRecognition = new t(), this.activeRecognition.continuous = !1, this.activeRecognition.interimResults = !0;
        const a = {
          en: "en-US",
          am: "am-ET",
          om: "om-ET",
          ar: "ar-SA",
          ti: "ti-ET"
        };
        this.activeRecognition.lang = a[this.currentLang] || "en-US", this.activeRecognition.onresult = (n) => {
          let s = "";
          for (let o = 0; o < n.results.length; o++)
            s += n.results[o][0]?.transcript || "";
          const c = s.trim();
          c && (e.value = c, n.results[n.results.length - 1]?.isFinal && (i = !0, this.handleVoiceTranscript(c, e)));
        }, this.activeRecognition.onend = () => {
          this.isRecording && this.stopVoiceRecording(i);
        }, this.activeRecognition.onerror = (n) => {
          console.warn("Active speech recognition error:", n.error);
        }, this.activeRecognition.start();
      } catch (a) {
        console.warn("Active recognition init error, falling back to MediaRecorder", a);
      }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      try {
        const a = await navigator.mediaDevices.getUserMedia({ audio: !0 });
        this.audioChunks = [];
        const n = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : MediaRecorder.isTypeSupported("audio/ogg") ? "audio/ogg" : "audio/wav";
        this.mediaRecorder = new MediaRecorder(a), this.mediaRecorder.ondataavailable = (s) => {
          s.data.size > 0 && this.audioChunks.push(s.data);
        }, this.mediaRecorder.onstop = async () => {
          if (a.getTracks().forEach((s) => s.stop()), !i && this.audioChunks.length > 0) {
            const s = new Blob(this.audioChunks, { type: n });
            await this.sendAudioForTranscription(s, n, e);
          }
        }, this.mediaRecorder.start(), this.voiceRecordingTimeout = window.setTimeout(() => {
          this.isRecording && this.stopVoiceRecording(i);
        }, 1e4);
      } catch (a) {
        console.warn("MediaRecorder permission/init notice:", a), t || (alert(this.t("micError")), this.isRecording = !1, this.updateMicButtonUI(), this.updateVoiceStatusUI());
      }
  }
  stopVoiceRecording(e = !1) {
    if (this.isRecording = !1, this.voiceRecordingTimeout && (window.clearTimeout(this.voiceRecordingTimeout), this.voiceRecordingTimeout = null), this.playEarcon("stop"), this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch {
      }
      this.activeRecognition = null;
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive" ? (e || (this.isProcessingSpeech = !0, this.announce(this.t("voiceProcessing")), this.updateVoiceStatusUI()), this.mediaRecorder.stop()) : (this.isProcessingSpeech = !1, this.updateVoiceStatusUI()), this.updateMicButtonUI(), e) {
      this.playEarcon("transcribed"), this.announce(this.t("voicePreviewNotice"));
      const i = this.shadowRoot?.querySelector("#chat-input");
      i && i.focus();
    }
    setTimeout(() => {
      if (!this.isRecording && !this.isSpeaking && this.wakeWordRecognizer)
        try {
          this.wakeWordRecognizer.start();
        } catch {
        }
    }, 1200);
  }
  async sendAudioForTranscription(e, i, t) {
    this.isProcessingSpeech = !0, this.updateVoiceStatusUI(), this.announce(this.t("voiceProcessing"));
    try {
      const a = new FileReader(), n = new Promise((o, h) => {
        a.onloadend = () => {
          const g = a.result;
          o(g.split(",")[1] || "");
        }, a.onerror = h;
      });
      a.readAsDataURL(e);
      const s = await n, c = await fetch(`${this.apiBase}/api/v1/speech/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio_base64: s,
          media_type: i,
          language: "auto",
          retain: !1
        })
      });
      if (c.ok) {
        const o = await c.json();
        if (o.transcript) {
          const h = o.detected_language, g = Number(o.language_confidence || 0);
          if (h && h in w && g >= 0.82 && h !== this.currentLang)
            this.setLanguage(h, !1);
          else {
            const p = this.detectLanguage(o.transcript);
            p !== this.currentLang && this.setLanguage(p, !1);
          }
          await this.handleVoiceTranscript(o.transcript, t), this.playEarcon("transcribed"), this.announce(this.t("voicePreviewNotice")), await this.askQuestion(o.transcript, !1, !0);
        }
      }
    } catch (a) {
      console.warn("Transcription fallback notice:", a);
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
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-voice">
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
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-speech">
            ${this.t("stopAudio")}
          </button>
        </div>
      `, e.querySelector("#btn-stop-speech")?.addEventListener("click", () => this.stopSpeaking())) : e.innerHTML = "");
  }
  // --- Text-to-Speech (Voice Responses) ---
  cleanTextForSpeech(e) {
    return e.replace(/\[\d+\]/g, "").replace(/\bhttps?:\/\/\S+/gi, "").replace(/[#*_`~>]/g, "").replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}]/gu, "").replace(/\s+/g, " ").trim();
  }
  async speakResponse(e, i = !1) {
    this.stopSpeaking();
    const t = i ? e.text : e.spoken || e.text, a = this.cleanTextForSpeech(t);
    if (!a) return;
    this.isSpeaking = !0, e.isAudioPlaying = !0, this.renderMessages(), this.updateVoiceStatusUI();
    const n = "warm, calm tutor, moderate pace, clear, unhurried", s = `${a}_${this.currentLang}_${n}`;
    if (this.audioCache.has(s)) {
      const c = this.audioCache.get(s);
      this.activeAudio = new Audio(c), this.activeAudio.onended = () => this.finishSpeaking(e), this.activeAudio.onerror = () => this.fallbackTTS(a, e);
      try {
        await this.activeAudio.play();
        return;
      } catch (o) {
        console.warn("Cached audio playback failed, refetching...", o);
      }
    }
    try {
      const c = await fetch(`${this.apiBase}/api/v1/speech/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: a,
          language: this.currentLang,
          speed: 1,
          style: n
        })
      });
      if (c.ok) {
        const o = await c.json();
        if (!o.mocked && o.audio_url) {
          const h = String(o.audio_url), g = /^(https?:|data:|blob:)/.test(h) ? h : `${this.apiBase}${h}`;
          this.audioCache.set(s, g), this.activeAudio = new Audio(g), this.activeAudio.onended = () => this.finishSpeaking(e), this.activeAudio.onerror = () => this.fallbackTTS(a, e), await this.activeAudio.play();
          return;
        }
      }
    } catch (c) {
      console.warn("Server TTS unavailable; using browser speech fallback.", c);
    }
    this.fallbackTTS(a, e);
  }
  fallbackTTS(e, i) {
    if (!("speechSynthesis" in window)) {
      this.finishSpeaking(i);
      return;
    }
    const t = new SpeechSynthesisUtterance(e), a = {
      en: "en-US",
      am: "am-ET",
      om: "om-ET",
      ti: "ti-ET",
      ar: "ar-SA"
    };
    t.lang = a[this.currentLang] || "en-US", t.onend = () => this.finishSpeaking(i), t.onerror = () => this.finishSpeaking(i), window.speechSynthesis.speak(t);
  }
  finishSpeaking(e) {
    this.isSpeaking = !1, e.isAudioPlaying = !1, this.activeAudio = null, this.renderMessages(), this.updateVoiceStatusUI();
  }
  stopSpeaking() {
    "speechSynthesis" in window && window.speechSynthesis.cancel(), this.activeAudio && (this.activeAudio.pause(), this.activeAudio = null), this.isSpeaking = !1, this.messages.forEach((e) => e.isAudioPlaying = !1), this.renderMessages(), this.updateVoiceStatusUI();
  }
  // --- TTS Audio & Read Aloud Controls ---
  ensureHighlightStyles() {
    if (!(typeof document > "u") && !document.getElementById("sb-reading-highlight-styles")) {
      const e = document.createElement("style");
      e.id = "sb-reading-highlight-styles", e.textContent = `
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
      `, document.head.appendChild(e);
    }
  }
  highlightElement(e) {
    if (this.ensureHighlightStyles(), this.stopPageReadingHighlight(), e) {
      e.classList.add("sb-reading-highlight");
      let i = e.parentElement;
      for (; i && i !== document.body; ) {
        const t = window.getComputedStyle(i);
        (t.overflowY === "hidden" || t.overflow === "hidden" || i.classList.contains("overflow-y-hidden") || i.style.height === "400px" || i.getAttribute("style")?.includes("400px")) && (i.style.overflowY = "visible", i.style.height = "auto", i.style.maxHeight = "none", i.classList.remove("overflow-y-hidden", "pe-none")), i = i.parentElement;
      }
      try {
        e.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch {
      }
    }
  }
  stopPageReadingHighlight() {
    typeof document < "u" && document.querySelectorAll(".sb-reading-highlight").forEach((e) => {
      e.classList.remove("sb-reading-highlight");
    });
  }
  getReadablePageElements() {
    if (typeof document > "u") return [];
    const e = [
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
      "body"
    ];
    let i = [];
    for (const t of e) {
      const a = document.querySelector(t);
      if (!a) continue;
      const n = Array.from(
        a.querySelectorAll("p, h1, h2, h3, h4, h5, li, blockquote, pre")
      ).filter((s) => s.closest("bridge-assistant, db-assistant, nav, footer, header, #sidebar, .sidebar, script, style, noscript, dialog, .modal, template") || s.offsetParent === null && s.offsetWidth === 0 && s.offsetHeight === 0 ? !1 : (s.textContent?.trim() || "").length > 15);
      if (n.length > 0) {
        i = n;
        break;
      }
    }
    return i.length === 0 && document.body && (i = Array.from(
      document.body.querySelectorAll("p, h2, h3, h4, h5")
    ).filter((t) => t.closest("bridge-assistant, db-assistant, nav, footer, header, #sidebar, .sidebar, script, style, template") ? !1 : (t.textContent?.trim() || "").length > 15)), i;
  }
  startSequentialReading(e, i = 0) {
    this.readingWatchdogTimer && (clearTimeout(this.readingWatchdogTimer), this.readingWatchdogTimer = null), this.activeUtterance = null, window.__activeUtterance = null, this.activeAudio && (this.activeAudio.pause(), this.activeAudio = null), "speechSynthesis" in window && window.speechSynthesis.cancel();
    const t = this.getReadablePageElements(), a = e.text.split(/\n\s*\n|\n/).map((o) => o.trim()).filter((o) => !(!o || o.length < 5 || /^(Would you like|የሚከተሉትን|Maal gochuu|هل ترغب|•\s*Explain|•\s*Quiz|•\s*What|•\s*ይህንን|•\s*ወደ|•\s*ግንዛቤ|•\s*Yaada|•\s*Barnoota|•\s*Hubannoo|•\s*أشرح|•\s*أوضح|•\s*أطرح)/i.test(
      o
    ))), n = a.length > 0 ? a : [e.text];
    let s = -1;
    const c = n.map((o, h) => {
      const g = o.replace(/[#*•_`]/g, " ").replace(/\s+/g, " ").trim().toLowerCase(), p = /^(this course|this lesson|summary of|የዚህ|ይህ ትምህርት|barnoonni|يشرح|ملخص)/i.test(g), b = g.slice(0, 35);
      let m = null, f = -1;
      for (let y = 0; y < t.length; y++) {
        const L = t[y], R = (L.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        if ((b.length > 10 && R.includes(b) || g.length > 20 && R.includes(g.slice(10, 45)) || R.length > 15 && g.includes(R.slice(0, 35))) && (y > s || f === -1) && (m = L, f = y, y > s))
          break;
      }
      if (!m)
        if (p && t.length > 0)
          m = t[0], f = 0;
        else {
          const y = s + 1;
          y < t.length ? (m = t[y], f = y) : h < t.length && (m = t[h], f = h);
        }
      return f !== -1 && (s = f), {
        text: o,
        element: m || null
      };
    });
    this.currentReading = {
      msgId: e.id,
      items: c,
      currentIndex: i,
      isPaused: !1
    }, e.isAudioPlaying = !0, e.isAudioPaused = !1, this.renderMessages(), this.playNextReadingItem(e);
  }
  playNextReadingItem(e) {
    if (this.readingWatchdogTimer && (clearTimeout(this.readingWatchdogTimer), this.readingWatchdogTimer = null), !this.currentReading || this.currentReading.msgId !== e.id || this.currentReading.isPaused)
      return;
    if (this.currentReading.currentIndex >= this.currentReading.items.length) {
      this.stopPageReadingHighlight(), e.isAudioPlaying = !1, e.isAudioPaused = !1, this.currentReading = null, this.activeUtterance = null, window.__activeUtterance = null, this.renderMessages();
      return;
    }
    const i = this.currentReading.items[this.currentReading.currentIndex];
    i.element ? this.highlightElement(i.element) : this.stopPageReadingHighlight(), this.renderMessages();
    const t = i.text.replace(/[#*•_`]/g, " ").replace(/\s+/g, " ").trim();
    if (!t) {
      this.currentReading.currentIndex++, this.playNextReadingItem(e);
      return;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      try {
        window.speechSynthesis.resume();
      } catch {
      }
      const a = () => {
        this.readingWatchdogTimer && (clearTimeout(this.readingWatchdogTimer), this.readingWatchdogTimer = null), this.activeUtterance = null, window.__activeUtterance = null, !(!this.currentReading || this.currentReading.msgId !== e.id || this.currentReading.isPaused) && (this.currentReading.currentIndex++, this.playNextReadingItem(e));
      }, n = new SpeechSynthesisUtterance(t);
      this.activeUtterance = n, window.__activeUtterance = n;
      const s = {
        en: "en-US",
        am: "am-ET",
        om: "om-ET",
        ti: "ti-ET",
        ar: "ar-SA"
      };
      n.lang = s[this.currentLang] || "en-US", n.rate = 1, n.onstart = () => {
        e.isAudioPlaying = !0, e.isAudioPaused = !1;
      }, n.onend = () => {
        a();
      }, n.onerror = (h) => {
        console.warn("TTS segment error:", h), a();
      };
      const c = t.split(/\s+/).filter(Boolean).length, o = Math.min(14e3, Math.max(3e3, Math.ceil(c / 2 * 1e3) + 1200));
      this.readingWatchdogTimer = setTimeout(() => {
        a();
      }, o), setTimeout(() => {
        try {
          window.speechSynthesis.speak(n);
        } catch {
          a();
        }
      }, 40);
    } else
      e.isAudioPlaying = !1, e.isAudioPaused = !1, this.stopPageReadingHighlight(), this.renderMessages();
  }
  async handleListen(e) {
    if (this.readingWatchdogTimer && (clearTimeout(this.readingWatchdogTimer), this.readingWatchdogTimer = null), e.isAudioPlaying) {
      this.currentReading && this.currentReading.msgId === e.id && (this.currentReading.isPaused = !0), "speechSynthesis" in window && window.speechSynthesis.pause(), this.activeAudio && !this.activeAudio.paused && this.activeAudio.pause(), e.isAudioPlaying = !1, e.isAudioPaused = !0, this.renderMessages(), this.announce(this.t("pauseButton"));
      return;
    }
    if (e.isAudioPaused) {
      if (this.currentReading && this.currentReading.msgId === e.id) {
        this.currentReading.isPaused = !1, e.isAudioPlaying = !0, e.isAudioPaused = !1, "speechSynthesis" in window && window.speechSynthesis.paused ? window.speechSynthesis.resume() : this.playNextReadingItem(e), this.renderMessages(), this.announce(this.t("listenButton"));
        return;
      }
      if (this.activeAudio && this.activeAudio.paused) {
        this.activeAudio.play().catch(() => this.startSequentialReading(e, 0)), e.isAudioPlaying = !0, e.isAudioPaused = !1, this.renderMessages(), this.announce(this.t("listenButton"));
        return;
      }
    }
    this.startSequentialReading(e, 0);
  }
  handleStop(e) {
    this.readingWatchdogTimer && (clearTimeout(this.readingWatchdogTimer), this.readingWatchdogTimer = null), this.activeUtterance = null, window.__activeUtterance = null, this.currentReading && (this.currentReading.isPaused = !0, this.currentReading = null), this.activeAudio && (this.activeAudio.pause(), this.activeAudio.currentTime = 0, this.activeAudio = null), "speechSynthesis" in window && window.speechSynthesis.cancel(), this.stopPageReadingHighlight(), e.isAudioPlaying = !1, e.isAudioPaused = !1, this.renderMessages(), this.announce(this.t("stopButton"));
  }
  handleReplay(e) {
    this.handleStop(e), setTimeout(() => {
      this.startSequentialReading(e, 0);
    }, 120);
  }
  // --- Page Navigation and Context Monitoring ---
  setupPageNavigationMonitor() {
    if (typeof window > "u") return;
    const e = () => {
      const a = window.location.href, n = document.title || "", s = this.extractPlatformContext();
      (this.lastPageUrl && this.lastPageUrl !== a || this.lastPageSection && this.lastPageSection !== s.section) && (this.stopPageReadingHighlight(), this.activeAudio && (this.activeAudio.pause(), this.activeAudio = null), "speechSynthesis" in window && window.speechSynthesis.cancel(), this.announce(`${this.t("navigatedToNotice")} ${s.section}`), this.messages.length === 0 && this.renderMessages()), this.lastPageUrl = a, this.lastPageTitle = n, this.lastPageSection = s.section;
    };
    window.addEventListener("popstate", e), window.addEventListener("hashchange", e);
    const i = history.pushState;
    i && (history.pushState = function(...a) {
      const n = i.apply(this, a);
      return setTimeout(e, 50), n;
    });
    const t = history.replaceState;
    t && (history.replaceState = function(...a) {
      const n = t.apply(this, a);
      return setTimeout(e, 50), n;
    }), this.navCheckTimer = window.setInterval(e, 1500), e();
  }
  // --- Voice Activation & Wake Word ("Help") ---
  setupWakeWordDetector() {
    if (typeof window > "u") return;
    const e = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (e)
      try {
        this.wakeWordRecognition = new e(), this.wakeWordRecognition.continuous = !0, this.wakeWordRecognition.interimResults = !1, this.wakeWordRecognition.lang = this.currentLang === "ar" ? "ar-SA" : this.currentLang === "am" ? "am-ET" : this.currentLang === "om" ? "om-ET" : "en-US", this.wakeWordRecognition.onresult = (i) => {
          const t = i.results[i.results.length - 1];
          if (!t || !t[0]) return;
          const a = (t[0].transcript || "").trim().toLowerCase();
          (a.includes("help") || a.includes("እርዳታ") || a.includes("gargaarsa") || a.includes("مساعدة")) && this.triggerVoiceActivation();
        }, this.wakeWordRecognition.onerror = () => {
          this.voiceActivationEnabled && !this.isRecording && setTimeout(() => {
            try {
              this.wakeWordRecognition?.start();
            } catch {
            }
          }, 1e3);
        }, this.wakeWordRecognition.onend = () => {
          this.voiceActivationEnabled && !this.isRecording && setTimeout(() => {
            try {
              this.wakeWordRecognition?.start();
            } catch {
            }
          }, 500);
        }, this.wakeWordRecognition.start();
      } catch (i) {
        console.warn("Wake word detector error:", i);
      }
  }
  triggerVoiceActivation() {
    this.openAssistant();
    const e = this.shadowRoot?.querySelector("#chat-input");
    e && setTimeout(() => {
      this.toggleVoiceInput(e);
    }, 250);
  }
  // --- Q&A / Ask ---
  switchTab(e) {
    if (this.activeTab = e, !this.shadowRoot) return;
    const i = [
      { id: "chat", btn: this.shadowRoot.querySelector("#tab-chat"), pane: this.shadowRoot.querySelector("#pane-chat") },
      { id: "support", btn: this.shadowRoot.querySelector("#tab-support"), pane: this.shadowRoot.querySelector("#pane-support") },
      { id: "handoff", btn: this.shadowRoot.querySelector("#tab-handoff"), pane: this.shadowRoot.querySelector("#pane-handoff") }
    ];
    i.forEach((a) => {
      const n = a.id === e;
      a.btn?.setAttribute("aria-selected", n ? "true" : "false"), a.pane && (a.pane.hidden = !n, a.pane.style.display = n ? a.id === "chat" ? "flex" : "block" : "none");
    });
    const t = i.find((a) => a.id === e)?.btn;
    t && (t.focus(), this.announce(`${t.textContent?.trim()} tab selected`));
  }
  async askQuestion(e, i = !1, t = !1) {
    const a = e.trim();
    if (!a || this.isThinking) return;
    this.activeTab !== "chat" && this.switchTab("chat");
    const n = a.match(/^(?:\/confirm|\/link)?\s*([0-9]{6})$/i);
    if (n) {
      const g = n[1];
      if (await this.confirmLinkCode(g)) {
        this.messages.push({
          id: `msg_link_${Date.now()}`,
          sender: "assistant",
          text: this.t("codeLinkSuccess")
        }), this.renderMessages();
        return;
      }
    }
    this.stopSpeaking(), this.dispatchEvent(
      new CustomEvent("db-assistant:question", {
        bubbles: !0,
        composed: !0,
        detail: { text: a, language: this.currentLang }
      })
    );
    const s = {
      id: `msg_${Date.now()}_learner`,
      sender: "learner",
      text: a
    };
    this.messages.push(s), this.isThinking = !0, this.announce(this.t("lookingInCourse")), this.renderMessages();
    const c = this.extractPlatformContext(), o = new AbortController(), h = setTimeout(() => o.abort(), 25e3);
    try {
      let g = await fetch(`${this.apiBase}/api/v1/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: o.signal,
        body: JSON.stringify({
          question: a,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: i || this.simpleMode,
          channel: "web",
          learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
          platform_id: this.platformId,
          ...c
        })
      });
      if (!g.ok && g.status === 404 && (g = await fetch(`${this.apiBase}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: o.signal,
        body: JSON.stringify({
          question: a,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: i || this.simpleMode,
          channel: "web",
          learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
          platform_id: this.platformId,
          ...c
        })
      })), g.ok) {
        const p = await g.json(), b = p.language;
        p.language_changed && b && b in w && b !== this.currentLang && this.setLanguage(b, !1);
        const m = !!p.offer_human || p.reason === "low_confidence", f = {
          id: `msg_${Date.now()}_assistant`,
          sender: "assistant",
          text: p.answer,
          spoken: p.spoken || p.answer,
          heading: this.t("answerHeading"),
          citations: p.citations || [],
          offerHuman: p.offer_human,
          isRefusal: m
        };
        this.messages.push(f), this.saveChatState(), this.renderMessages(), t ? setTimeout(() => {
          this.speakResponse(f);
        }, 300) : (this.autoReadSpeech || this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_tts) && this.speakResponse(f);
      } else {
        const p = {
          id: `msg_${Date.now()}_err`,
          sender: "assistant",
          text: this.t("serverErrorNotice"),
          offerHuman: !0
        };
        this.messages.push(p), this.renderMessages();
      }
    } catch {
      try {
        const p = JSON.parse(localStorage.getItem("db_assistant_offline_queue") || "[]");
        p.push({ question: a, language: this.currentLang, timestamp: Date.now() }), localStorage.setItem("db_assistant_offline_queue", JSON.stringify(p));
      } catch {
      }
      const g = {
        id: `msg_${Date.now()}_offline`,
        sender: "assistant",
        text: this.t("savedOnPhoneNotice"),
        offerHuman: !0,
        isRefusal: !0
      };
      this.messages.push(g), this.renderMessages();
    } finally {
      clearTimeout(h), this.isThinking = !1, this.renderMessages();
    }
  }
  // --- Human Handoff ---
  async requestHandoff(e) {
    if (this.isOffline) {
      alert(this.t("offlineBanner"));
      return;
    }
    const i = this.shadowRoot?.querySelector("#handoff-consent");
    if (i && !i.checked) {
      const n = this.shadowRoot?.querySelector("#handoff-consent-error");
      n && (n.textContent = this.t("handoffConsentCheck"), n.style.display = "block"), i.focus();
      return;
    }
    if (this.activeTab !== "handoff") {
      this.switchTab("handoff");
      const n = this.shadowRoot?.querySelector("#handoff-reason");
      n && e && (n.value = e);
    }
    const t = this.shadowRoot?.querySelector("#handoff-consent-error");
    t && (t.style.display = "none");
    const a = this.shadowRoot?.querySelector("#btn-submit-handoff");
    a && (a.disabled = !0, a.innerHTML = `<span>${this.t("lookingInCourse")}...</span>`), this.announce(this.t("lookingInCourse"));
    try {
      const n = [
        `${this.apiBase}/api/v1/escalations`,
        `${this.apiBase}/escalations`,
        `${this.apiBase}/api/v1/handoff`,
        `${this.apiBase}/handoff`
      ], s = {
        consent: !0,
        learner_ref: this.getAttribute("learner-id") || `learner_${this.sessionId}`,
        card: {
          language: this.currentLang,
          context: e || this.shadowRoot?.querySelector("#handoff-reason")?.value || "Learner requested a human mentor from web assistant.",
          support_needs: this.supportNeeds.needs,
          contact_mode: this.supportNeeds.preferred_contact_mode
        },
        channel: "web"
      };
      let c = null;
      for (const o of n)
        try {
          const h = await fetch(o, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(s)
          });
          if (h.ok) {
            c = h;
            break;
          }
        } catch {
        }
      if (c && c.ok) {
        const o = await c.json(), h = o.ticketId || o.handoff_id || o.id || "ticket_01", g = o.room_url || o.roomUrl || "https://meet.jit.si/savanna-bridge-demo";
        this.activeHandoff = {
          id: h,
          room_url: g
        }, this.dispatchEvent(
          new CustomEvent("db-assistant:escalated", {
            bubbles: !0,
            composed: !0,
            detail: { ticketId: h, roomUrl: g }
          })
        ), this.messages.push({
          id: `msg_${Date.now()}_handoff`,
          sender: "assistant",
          text: `${this.t("handoffReadyTitle")}: ${this.activeHandoff.room_url}`,
          heading: this.t("handoffReadyTitle"),
          isHandoff: !0,
          roomUrl: g,
          offerHuman: !1
        }), this.saveChatState();
        const p = this.shadowRoot?.querySelector("#handoff-room-box");
        if (p) {
          p.innerHTML = `
            <div style="padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; margin-top:0.75rem;">
              <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                ${r.celebrate} <span>${this.t("handoffReadyTitle")}</span>
              </p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${g}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${r.video} <span>${this.t("joinRoomButton")}</span>
                </a>
                <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(g)}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${r.copy} <span>${this.t("copyRoomBtn")}</span>
                </button>
              </div>
            </div>
          `;
          const b = p.querySelector(".btn-copy-room");
          b && b.addEventListener("click", async () => {
            const m = b.getAttribute("data-url");
            if (m) {
              try {
                await navigator.clipboard.writeText(m);
              } catch {
                const f = document.createElement("textarea");
                f.value = m, document.body.appendChild(f), f.select(), document.execCommand("copy"), document.body.removeChild(f);
              }
              b.innerHTML = `${r.check} <span>${this.t("linkCodeCopied")}</span>`, this.announce(this.t("linkCodeCopied")), setTimeout(() => {
                b.innerHTML = `${r.copy} <span>${this.t("copyRoomBtn")}</span>`;
              }, 2e3);
            }
          });
        }
        this.renderMessages();
      } else {
        const o = this.shadowRoot?.querySelector("#handoff-consent-error");
        o ? (o.textContent = this.t("serverErrorNotice"), o.style.display = "block") : alert(this.t("serverErrorNotice"));
      }
    } catch {
      const n = this.shadowRoot?.querySelector("#handoff-consent-error");
      n ? (n.textContent = this.t("serverErrorNotice"), n.style.display = "block") : alert(this.t("serverErrorNotice"));
    } finally {
      a && (a.disabled = !1, a.innerHTML = `${r.users} <span>${this.t("requestMentorBtn")}</span>`);
    }
  }
  renderOnboardingWizard() {
    if (this.accessibilityPrefs.onboarded || this.onboardingDismissed) return "";
    const e = {
      en: { step: "Step", of: "of", back: "Back", next: "Next", finish: "Finish setup", skip: "Skip for now" },
      am: { step: "ደረጃ", of: "ከ", back: "ተመለስ", next: "ቀጣይ", finish: "ቅንብሩን ጨርስ", skip: "ለጊዜው ዝለል" },
      om: { step: "Tarkaanfii", of: "kan", back: "Duubatti", next: "Itti aanu", finish: "Qindaa'ina xumuri", skip: "Ammaaf darbi" },
      ti: { step: "ስጉምቲ", of: "ካብ", back: "ተመለስ", next: "ቀጻሊ", finish: "ቅጥዒ ዛዝም", skip: "ንሕጂ ሕለፎ" },
      ar: { step: "الخطوة", of: "من", back: "رجوع", next: "التالي", finish: "إنهاء الإعداد", skip: "تخطي الآن" }
    }[this.currentLang], i = [
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
          ${r.sound} <span>${this.t("spokenSetup")}</span>
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
        <div class="privacy-note">${r.lock} <span>${this.t("onboardingMicExplain")}</span></div>
      `
    ], t = [0, 1, 2, 3].map((a) => `<span class="${a <= this.onboardingStep ? "active" : ""}"></span>`).join("");
    return `
      <div class="onboarding-overlay" id="onboarding-overlay">
        <section class="onboarding-card" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
          <div class="onboarding-header">
            <h3 class="onboarding-title" id="onboard-title" tabindex="-1">${r.accessibility}<span>${this.t("onboardingTitle")}</span></h3>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-onboard-close" aria-label="${e.skip}">${r.close}</button>
          </div>
          <div class="wizard-progress" role="progressbar" aria-label="${e.step} ${this.onboardingStep + 1} ${e.of} 4" aria-valuemin="1" aria-valuemax="4" aria-valuenow="${this.onboardingStep + 1}">${t}</div>
          <div class="wizard-step-label">${e.step} ${this.onboardingStep + 1} ${e.of} 4</div>
          <div class="onboarding-body">${i[this.onboardingStep]}</div>
          <div class="onboarding-actions">
            <button type="button" class="btn btn-secondary" id="btn-onboard-skip">${e.skip}</button>
            <span style="flex:1;"></span>
            ${this.onboardingStep > 0 ? `<button type="button" class="btn btn-secondary" id="btn-onboard-back">${e.back}</button>` : ""}
            ${this.onboardingStep < 3 ? `<button type="button" class="btn btn-primary" id="btn-onboard-next">${e.next} ${r.arrowRight}</button>` : `<button type="button" class="btn btn-primary" id="btn-onboard-save">${e.finish}</button>`}
          </div>
        </section>
      </div>`;
  }
  captureOnboardingStep() {
    const e = (o) => {
      const h = this.shadowRoot?.querySelector(`#${o}`);
      return h ? h.checked : null;
    }, i = e("onboard-chk-screen-reader"), t = e("onboard-chk-keyboard-nav"), a = e("onboard-chk-contrast"), n = e("onboard-chk-large-text"), s = e("onboard-chk-voice"), c = e("onboard-chk-auto-tts");
    i !== null && (this.accessibilityPrefs.screen_reader_mode = i), t !== null && (this.accessibilityPrefs.keyboard_navigation = t), a !== null && (this.accessibilityPrefs.high_contrast = a), n !== null && (this.accessibilityPrefs.large_text = n ? "larger" : "normal"), s !== null && (this.accessibilityPrefs.voice_enabled = s), c !== null && (this.accessibilityPrefs.auto_tts = c), this.highContrast = this.accessibilityPrefs.high_contrast, this.textSize = this.accessibilityPrefs.large_text;
  }
  completeOnboarding(e) {
    e && this.captureOnboardingStep(), this.accessibilityPrefs.onboarded = !0, this.onboardingDismissed = !0, this.onboardingStep = 0, this.savePreferences(), this.render(), e && this.accessibilityPrefs.voice_enabled && this.accessibilityPrefs.auto_welcome && this.triggerSpokenWelcome(), e && this.accessibilityPrefs.voice_enabled && this.initWakeWordDetection();
  }
  // --- Rendering ---
  render() {
    this.shadowRoot && (this.setAttribute("data-contrast", this.highContrast ? "high" : "normal"), this.setAttribute("data-size", this.textSize), this.setAttribute("dir", this.currentLang === "ar" ? "rtl" : "ltr"), this.accessibilityPrefs?.keyboard_navigation ? this.classList.add("keyboard-focus-enhanced") : this.classList.remove("keyboard-focus-enhanced"), this.accessibilityPrefs?.screen_reader_mode ? this.classList.add("screen-reader-mode") : this.classList.remove("screen-reader-mode"), this.shadowRoot.innerHTML = `
      <style>${Q}</style>

      <!-- Live Announcer -->
      <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true" style="position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); border:0;"></div>

      <!-- Floating Launcher Button with Wake Word Hint -->
      <button class="launcher" type="button" id="launcher-btn" accesskey="a" aria-keyshortcuts="Alt+Shift+A"
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog"
              aria-label="${this.t("launcherLabel")}. ${this.t("wakeHint")}">
        <span class="launcher-icon-badge" aria-hidden="true" style="display:inline-flex; align-items:center; justify-content:center; width:2rem; height:2rem; border-radius:50%; background:rgba(255,255,255,0.22); color:#ffffff; flex-shrink:0;">
          ${r.launcher}
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
            ${r.sound}
            <span>${this.t("oneTapVoiceActivation")}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.375rem; margin-top:0.375rem;">
            <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome-floating">
              ${this.t("voiceAccessibilityLabel")}
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner-floating" aria-label="Dismiss">
              ${r.close}
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
                ${r.accessibility}
              </span>
              <h2 id="dialog-title" class="title" tabindex="-1">${this.t("appTitle")}</h2>
            </div>
            <div class="header-window-controls">
              <!-- Settings Button -->
              <button type="button" class="btn btn-secondary" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}" style="min-height:38px; min-width:38px; width:38px; height:38px; padding:0; display:inline-flex; align-items:center; justify-content:center;">
                ${r.settings}
              </button>
              <!-- Close Button -->
              <button type="button" class="btn btn-secondary" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" style="min-height:38px; min-width:38px; width:38px; height:38px; padding:0; display:inline-flex; align-items:center; justify-content:center;">
                ${r.close}
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
            ${r.launcher}
            <span>${this.t("chatTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-support" role="tab" aria-selected="${this.activeTab === "support"}" aria-controls="pane-support">
            ${r.heart}
            <span>${this.t("supportTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-handoff" role="tab" aria-selected="${this.activeTab === "handoff"}" aria-controls="pane-handoff">
            ${r.headphones}
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
                ${r.sound}
                <span>${this.t("oneTapVoiceActivation")}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.375rem;">
                <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome">
                  ${this.t("voiceAccessibilityLabel")}
                </button>
                <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner" aria-label="Dismiss">
                  ${r.close}
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
                ${this.isReadingPaused ? `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-resume" aria-label="${this.t("resumeReading")}" title="${this.t("resumeReading")}">${r.play}</button>` : `<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-pause" aria-label="${this.t("pauseReading")}" title="${this.t("pauseReading")}">${r.pause}</button>`}
                <button type="button" class="btn btn-danger btn-icon-only" id="btn-reading-stop" aria-label="${this.t("stopReading")}" title="${this.t("stopReading")}" style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;">
                  ${r.stop}
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
                ${r.mic}
              </button>
              <button type="submit" class="btn btn-primary" id="btn-send" data-id="btn-send" style="display:inline-flex; align-items:center; gap:0.375rem;">
                <span>${this.t("sendButton")}</span>
                ${r.send}
              </button>
            </form>

            <!-- Bottom Row: Talk to a person & Continue on Telegram -->
            <div class="footer-actions-row">
              <button type="button" class="btn btn-secondary btn-footer btn-talk-person" id="btn-footer-handoff" style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${r.user}
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
            <div class="settings-card-title">${r.heart} <span>${this.t("supportNeedsTitle")}</span></div>
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
                <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:44px; font-size:0.875rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode === "text" ? "selected" : ""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode === "voice" ? "selected" : ""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode === "video" ? "selected" : ""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode === "telegram" ? "selected" : ""}>${this.t("modeTelegram")}</option>
                </select>
              </label>

              <div id="support-saved-notice" class="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600; display:inline-flex; align-items:center; gap:0.375rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; padding:0.5rem 0.75rem;">
                ${r.check} <span>${this.t("supportSavedNotice")}</span>
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
            <div class="settings-card-title">${r.headphones} <span>${this.t("handoffTab")}</span></div>
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
                ${r.users} <span>${this.t("requestMentorBtn")}</span>
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
              <div class="settings-card-title">${r.type} <span>${this.t("textSizeLabel")}</span></div>
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
              <div class="settings-card-title">${r.contrast} <span>Display & Accessibility</span></div>
              
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
              <div class="settings-card-title">${r.sound} <span>${this.t("voiceTab")}</span></div>

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
                  <button type="button" class="rate-btn" id="btn-rate-100" aria-pressed="${this.accessibilityPrefs.speech_rate === 1}">1.0x</button>
                  <button type="button" class="rate-btn" id="btn-rate-125" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.25}">1.25x</button>
                  <button type="button" class="rate-btn" id="btn-rate-150" aria-pressed="${this.accessibilityPrefs.speech_rate === 1.5}">1.5x</button>
                </div>
              </div>

              <!-- Page Reading & Voice Test Buttons -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="display:flex; flex-direction:column; gap:0.375rem; margin-top:0.25rem;">
                <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                  <button type="button" class="btn btn-secondary" id="btn-read-page" style="flex:1; min-height:44px; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${r.sound} <span>${this.t("readPageBtn")}</span>
                  </button>
                  <button type="button" class="btn btn-secondary" id="btn-read-section" style="flex:1; min-height:44px; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${r.sound} <span>${this.t("readSectionBtn")}</span>
                  </button>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-test-voice" style="min-height:2rem; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                  ${r.play} <span>${this.t("testVoiceBtn")}</span>
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
                ${r.accessibility} <span>${this.t("onboardingReplay")}</span>
              </button>
            </div>

            <!-- Account & Telegram Linking Card -->
            <div class="settings-card" id="card-account-linking">
              <div class="settings-card-title">${r.link} <span>${this.t("linkTab")}</span></div>
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
                    ${r.link} <span>${this.t("generateCodeBtn")}</span>
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
                  ${r.trash} <span>${this.t("clearChatBtn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        ${this.renderOnboardingWizard()}

      </section>
    `, this.renderMessages(), this.updateTelegramLinkUI(), this.updateLinkCodeUI(), this.updateVoiceStatusUI(), this.bindEvents());
  }
  renderMessages() {
    const e = this.shadowRoot?.querySelector("#chat-log");
    if (!e) return;
    const i = "";
    if (this.messages.length === 0) {
      const t = this.lastPageSection || "The Future of the VA Industry";
      e.innerHTML = `
        ${i}
        <div class="empty-state">
          <div class="page-context-pill">
            ${r.book} <span>${this.t("pageContextBadge")} <strong>${this.escapeHtml(t)}</strong></span>
          </div>
          <p style="margin:0 0 0.5rem 0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested btn-quick-explain" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.lightbulb} <span>${this.escapeHtml(this.t("explainLessonBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested btn-quick-summarize" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.book} <span>${this.escapeHtml(this.t("summarizePageBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested btn-quick-read" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.listen} <span>${this.escapeHtml(this.t("readPageBtn"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ1"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ2"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${r.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ3"))}</span>
            </button>
          </div>
        </div>
      `, e.querySelector(".btn-quick-explain")?.addEventListener("click", () => {
        this.askQuestion(this.t("explainLessonBtn"));
      }), e.querySelector(".btn-quick-summarize")?.addEventListener("click", () => {
        this.askQuestion(this.t("summarizePageBtn"));
      }), e.querySelector(".btn-quick-read")?.addEventListener("click", () => {
        this.askQuestion(this.t("readPageBtn"));
      }), e.querySelectorAll(".btn-suggested[data-q]").forEach((a) => {
        a.addEventListener("click", () => {
          const n = a.getAttribute("data-q");
          n && this.askQuestion(n);
        });
      });
      return;
    }
    e.innerHTML = i + this.messages.map((t) => {
      if (t.sender === "learner")
        return `
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(t.text)}</p>
            </div>
          `;
      const a = [], n = /* @__PURE__ */ new Set();
      if (t.citations)
        for (const b of t.citations) {
          const f = (b.title || b.heading || "").replace(/\s*\|\s*.*$/, "").replace(/^Concept page:\s*/i, "").trim();
          f && !n.has(f) && (n.add(f), a.push({ ...b, title: f }));
        }
      const s = a.length > 0, c = !!t.isRefusal, o = t.heading || (t.isHandoff ? this.t("handoffReadyTitle") : this.t("answerHeading")), h = !!(this.currentReading && this.currentReading.msgId === t.id), p = t.text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map((b, m) => `<div class="answer-para-item ${h && this.currentReading.currentIndex === m ? "active-reading-para" : ""}" data-msg-id="${t.id}" data-idx="${m}" title="Click to read and highlight this paragraph" style="cursor:pointer; margin-bottom:0.625rem; line-height:1.5;">${this.escapeHtml(b)}</div>`).join("");
      return `
          <div class="msg-row msg-assistant" id="${t.id}">
            <h4 class="answer-heading">${this.escapeHtml(o)}</h4>
            <div class="answer-text">${p}</div>

            ${t.isHandoff ? `
                <div class="handoff-card" style="margin-top:0.75rem; padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem;">
                  <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                    ${r.celebrate} <span>${this.t("handoffReadyTitle")}</span>
                  </p>
                  <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <a href="${this.escapeHtml(t.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" id="btn-join-room-card" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${r.video} <span>${this.t("joinRoomButton")}</span>
                    </a>
                    <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(t.roomUrl || this.activeHandoff?.room_url || "https://meet.jit.si/savanna-bridge-demo")}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${r.copy} <span>${this.t("copyRoomBtn")}</span>
                    </button>
                  </div>
                </div>
              ` : ""}

            ${c ? `
                <div class="not-verified-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${t.id}" style="font-size:0.8125rem; min-height:44px; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${r.user} <span>${this.t("talkToPersonButton")}</span>
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:44px;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              ` : ""}

            <!-- Listen, Stop, Replay & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${t.id}">
                ${t.isAudioPlaying ? `${r.pause} <span>${this.t("pauseButton")}</span>` : `${r.sound} <span>${this.t("listenButton")}</span>`}
              </button>
              ${t.spoken && t.text && t.spoken.trim() !== t.text.trim() ? `
                <button type="button" class="btn btn-secondary btn-read-full" data-msg-id="${t.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                  ${r.sound} <span>${this.t("readFullAnswer")}</span>
                </button>
              ` : ""}
              <button type="button" class="btn btn-secondary btn-stop" data-msg-id="${t.id}" style="display:inline-flex; align-items:center; gap:0.375rem;" ${t.isAudioPlaying || t.isAudioPaused ? "" : "hidden"}>
                ${r.stop}
                <span>${this.t("stopButton")}</span>
              </button>
              <button type="button" class="btn btn-secondary btn-replay" data-msg-id="${t.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${r.replay}
                <span>${this.t("replayButton")}</span>
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${t.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${r.lightbulb}
                <span>${this.t("makeSimplerButton")}</span>
              </button>
              ${t.isAudioPlaying ? `<span class="speaking-indicator-pill" role="status" aria-live="polite">${r.volume} <span>${this.t("speakingIndicator")}</span></span>` : ""}
            </div>

            <!-- Citations / Sources with readable names -->
            ${s ? `
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${(t.citations || []).filter((b, m, f) => f.findIndex((y) => y.url === b.url) === m).map(
        (b) => `
                    <a href="${this.escapeHtml(b.url)}" target="_blank" rel="noopener noreferrer" class="source-link citation-link" style="display:inline-flex; align-items:center; gap:0.375rem;">
                      ${r.book} <span>${this.escapeHtml(b.title || b.heading)}</span>
                    </a>
                  `
      ).join("")}
                </div>
              ` : ""}

            <!-- Suggested Follow-up Questions -->
            ${!c && !t.isHandoff ? `
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
              ` : ""}
          </div>
        `;
    }).join(""), this.isThinking && (e.innerHTML += `
        <div class="live-status-indicator">
          <span>${this.t("lookingInCourse")}</span>
        </div>
      `), this.isRecording && (e.innerHTML += `
        <div class="live-status-indicator" style="display:inline-flex; align-items:center; gap:0.375rem;">
          <span class="listening-indicator-pill">${r.mic} <span>${this.t("listeningIndicator")}</span></span>
        </div>
      `), e.querySelectorAll(".answer-para-item").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = parseInt(t.getAttribute("data-idx") || "0", 10), s = this.messages.find((c) => c.id === a);
        s && this.startSequentialReading(s, n);
      });
    }), e.querySelectorAll(".btn-prev-para").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && this.currentReading && this.currentReading.currentIndex > 0 && (this.currentReading.currentIndex--, this.playNextReadingItem(n));
      });
    }), e.querySelectorAll(".btn-next-para").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && this.currentReading && this.currentReading.currentIndex < this.currentReading.items.length - 1 && (this.currentReading.currentIndex++, this.playNextReadingItem(n));
      });
    }), e.querySelectorAll(".btn-listen").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && (n.isAudioPlaying ? this.stopSpeaking() : this.speakResponse(n));
      });
    }), e.querySelectorAll(".btn-read-full").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && (n.isAudioPlaying ? this.stopSpeaking() : this.speakResponse(n, !0));
      });
    }), e.querySelectorAll(".btn-stop").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && this.handleStop(n);
      });
    }), e.querySelectorAll(".btn-replay").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && this.handleReplay(n);
      });
    }), e.querySelectorAll(".btn-simpler").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        n && this.askQuestion(`Explain simpler: ${n.text}`, !0);
      });
    }), e.querySelectorAll(".btn-followup").forEach((t) => {
      t.addEventListener("click", (a) => {
        a.stopPropagation();
        const n = t.getAttribute("data-query") || t.textContent?.trim();
        n && this.askQuestion(n);
      });
    }), e.querySelectorAll(".btn-talk-person").forEach((t) => {
      t.addEventListener("click", () => {
        const a = t.getAttribute("data-msg-id"), n = this.messages.find((s) => s.id === a);
        this.requestHandoff(n ? `Refusal regarding question: ${n.text}` : void 0);
      });
    }), e.querySelectorAll(".btn-try-another").forEach((t) => {
      t.addEventListener("click", () => {
        const a = this.shadowRoot?.querySelector("#chat-input");
        a && (a.value = "", a.focus());
      });
    }), e.scrollTop = e.scrollHeight, setTimeout(() => {
      e.scrollTop = e.scrollHeight;
    }, 40);
  }
  bindEvents() {
    if (!this.shadowRoot) return;
    const e = this.shadowRoot.querySelector("#launcher-btn"), i = this.shadowRoot.querySelector("#assistant-dialog"), t = this.shadowRoot.querySelector("#btn-close-dialog"), a = this.shadowRoot.querySelector("#btn-open-settings"), n = this.shadowRoot.querySelector("#btn-close-settings");
    e.addEventListener("click", () => {
      this.isOpen ? this.closeAssistant() : (this.previousFocus = e, this.openAssistant());
    }), t.addEventListener("click", () => this.closeAssistant()), i.addEventListener("focusin", (d) => {
      d.target?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }), i.addEventListener("keydown", (d) => {
      if (d.key === "Escape")
        if (this.isSettingsOpen) {
          this.isSettingsOpen = !1;
          const u = this.shadowRoot?.querySelector("#settings-dialog");
          u && u.setAttribute("hidden", "true");
        } else
          this.closeAssistant();
      if (d.key === "Tab") {
        const u = this.shadowRoot?.querySelector("#onboarding-overlay"), v = this.shadowRoot?.querySelector("#settings-dialog:not([hidden])"), k = Array.from(
          (u || v || i).querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((B) => B.getClientRects().length > 0);
        if (k.length > 0) {
          const B = k[0], j = k[k.length - 1], W = this.shadowRoot?.activeElement;
          d.shiftKey && W === B ? (d.preventDefault(), j.focus()) : !d.shiftKey && W === j && (d.preventDefault(), B.focus());
        }
      }
    }), this.shadowRoot.querySelectorAll(".lang-toggle-btn").forEach((d) => {
      d.addEventListener("click", () => {
        const u = d.id.replace(/^btn-lang-|^onboard-lang-/, "");
        u && ["en", "am", "om", "ti", "ar"].includes(u) && this.setLanguage(u);
      });
    }), a.addEventListener("click", () => {
      this.isSettingsOpen = !0;
      const d = this.shadowRoot?.querySelector("#settings-dialog");
      if (d) {
        d.removeAttribute("hidden");
        const u = d.querySelector("button, input");
        u && u.focus();
      }
    }), n.addEventListener("click", () => {
      this.isSettingsOpen = !1;
      const d = this.shadowRoot?.querySelector("#settings-dialog");
      d && d.setAttribute("hidden", "true"), a.focus();
    });
    const s = [
      { id: "chat", btn: this.shadowRoot.querySelector("#tab-chat"), pane: this.shadowRoot.querySelector("#pane-chat") },
      { id: "support", btn: this.shadowRoot.querySelector("#tab-support"), pane: this.shadowRoot.querySelector("#pane-support") },
      { id: "handoff", btn: this.shadowRoot.querySelector("#tab-handoff"), pane: this.shadowRoot.querySelector("#pane-handoff") }
    ], c = (d) => {
      this.switchTab(s[d].id);
    };
    s.forEach(({ btn: d }, u) => {
      d?.addEventListener("click", () => c(u)), d?.addEventListener("keydown", (v) => {
        const x = v;
        x.key === "ArrowRight" ? (x.preventDefault(), c((u + 1) % s.length)) : x.key === "ArrowLeft" && (x.preventDefault(), c((u - 1 + s.length) % s.length));
      });
    }), this.shadowRoot.querySelectorAll(".btn-talk-person, #btn-footer-handoff").forEach((d) => {
      d.addEventListener("click", (u) => {
        u.preventDefault(), this.switchTab("handoff");
      });
    }), this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click", () => {
      this.textSize = "smaller", localStorage.setItem("savanna_bridge_text_size", "smaller"), this.render();
    }), this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click", () => {
      this.textSize = "normal", localStorage.setItem("savanna_bridge_text_size", "normal"), this.render();
    }), this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click", () => {
      this.textSize = "larger", localStorage.setItem("savanna_bridge_text_size", "larger"), this.render();
    });
    const o = this.shadowRoot.querySelector("#chk-contrast");
    o && o.addEventListener("change", () => {
      this.highContrast = o.checked, localStorage.setItem("savanna_bridge_contrast", this.highContrast ? "high" : "normal"), this.render();
    });
    const h = this.shadowRoot.querySelector("#chk-simple-mode");
    h && h.addEventListener("change", () => {
      this.simpleMode = h.checked;
    });
    const g = this.shadowRoot.querySelector("#chk-auto-read");
    g && g.addEventListener("change", () => {
      this.autoReadSpeech = g.checked, localStorage.setItem("savanna_bridge_auto_read", this.autoReadSpeech ? "true" : "false"), !this.autoReadSpeech && this.isSpeaking && this.stopSpeaking();
    });
    const p = this.shadowRoot.querySelector("#chk-wake-word");
    p && p.addEventListener("change", () => {
      if (this.voiceActivationEnabled = p.checked, localStorage.setItem("savanna_bridge_wake_word", this.voiceActivationEnabled ? "true" : "false"), this.voiceActivationEnabled)
        this.setupWakeWordDetector();
      else if (this.wakeWordRecognition) {
        try {
          this.wakeWordRecognition.stop();
        } catch {
        }
        this.wakeWordRecognition = null;
      }
    });
    const b = this.shadowRoot.querySelector("#settings-code-form");
    b && b.addEventListener("submit", (d) => {
      d.preventDefault();
      const u = this.shadowRoot?.querySelector("#settings-input-code"), v = this.shadowRoot?.querySelector("#settings-code-msg");
      u && u.value && this.confirmLinkCode(u.value, v);
    }), this.shadowRoot.querySelector("#btn-settings-disconnect-tg")?.addEventListener("click", () => {
      this.disconnectTelegram();
    }), this.shadowRoot.querySelector("#btn-clear-chat")?.addEventListener("click", () => {
      this.clearChat();
    }), this.shadowRoot.querySelector("#btn-generate-code")?.addEventListener("click", () => {
      this.generateLinkCode();
    });
    const m = this.shadowRoot.querySelector("#handoff-request-form"), f = this.shadowRoot.querySelector("#btn-submit-handoff"), y = (d) => {
      d && d.preventDefault();
      const u = this.shadowRoot?.querySelector("#handoff-reason");
      this.requestHandoff(u?.value || void 0);
    };
    m && m.addEventListener("submit", y), f && f.addEventListener("click", (d) => {
      y(d);
    });
    const L = this.shadowRoot.querySelector("#chat-log");
    L && L.addEventListener("click", (d) => {
      const u = d.target, v = u.closest(".btn-followup");
      if (v) {
        d.preventDefault();
        const k = v.getAttribute("data-query") || v.textContent?.trim();
        k && this.askQuestion(k);
        return;
      }
      const x = u.closest(".btn-suggested");
      if (x) {
        d.preventDefault();
        const k = x.getAttribute("data-q") || x.textContent?.trim();
        k && this.askQuestion(k);
        return;
      }
      if (u.closest(".btn-quick-explain")) {
        d.preventDefault(), this.askQuestion(this.t("explainLessonBtn"));
        return;
      }
      if (u.closest(".btn-quick-summarize")) {
        d.preventDefault(), this.askQuestion(this.t("summarizePageBtn"));
        return;
      }
      if (u.closest(".btn-quick-read")) {
        d.preventDefault(), this.askQuestion(this.t("readPageBtn"));
        return;
      }
    });
    const R = this.shadowRoot.querySelector("#support-form");
    R && R.addEventListener("submit", (d) => {
      d.preventDefault();
      const u = new FormData(R), v = u.getAll("need"), x = u.get("other_text") || "", k = u.get("contact_mode") || "text";
      this.saveSupportNeeds(v, x, k);
    });
    const I = this.shadowRoot.querySelector("#chat-form"), A = this.shadowRoot.querySelector("#chat-input"), M = this.shadowRoot.querySelector("#mic-btn");
    I && A && I.addEventListener("submit", (d) => {
      d.preventDefault();
      const u = A.value;
      A.value = "", this.askQuestion(u);
    }), M && A && M.addEventListener("click", () => {
      this.toggleVoiceInput(A);
    });
    const z = () => {
      this.showAutoplayBanner = !1, this.accessibilityPrefs.voice_enabled = !0, this.savePreferences(), this.announce(this.t("voiceWelcomeAnnouncement")), this.triggerSpokenWelcome(), this.render();
    };
    this.shadowRoot.querySelector("#btn-activate-voice-welcome")?.addEventListener("click", z), this.shadowRoot.querySelector("#btn-activate-voice-welcome-floating")?.addEventListener("click", z);
    const N = () => {
      this.showAutoplayBanner = !1, this.render();
    };
    this.shadowRoot.querySelector("#btn-dismiss-voice-banner")?.addEventListener("click", N), this.shadowRoot.querySelector("#btn-dismiss-voice-banner-floating")?.addEventListener("click", N), this.shadowRoot.querySelector("#btn-reading-pause")?.addEventListener("click", () => this.pausePageReading()), this.shadowRoot.querySelector("#btn-reading-resume")?.addEventListener("click", () => this.resumePageReading()), this.shadowRoot.querySelector("#btn-reading-stop")?.addEventListener("click", () => this.stopPageReading()), ["en", "am", "om", "ti", "ar"].forEach((d) => {
      this.shadowRoot?.querySelector(`#onboard-lang-${d}`)?.addEventListener("click", () => {
        this.setLanguage(d);
      });
    }), this.shadowRoot.querySelector("#btn-spoken-onboarding")?.addEventListener("click", () => {
      this.startSpokenOnboarding();
    }), this.shadowRoot.querySelector("#btn-onboard-next")?.addEventListener("click", () => {
      this.captureOnboardingStep(), this.onboardingStep = Math.min(3, this.onboardingStep + 1), this.render(), setTimeout(() => this.shadowRoot?.querySelector("#onboard-title")?.focus(), 0);
    }), this.shadowRoot.querySelector("#btn-onboard-back")?.addEventListener("click", () => {
      this.captureOnboardingStep(), this.onboardingStep = Math.max(0, this.onboardingStep - 1), this.render();
    }), this.shadowRoot.querySelector("#btn-onboard-save")?.addEventListener("click", () => this.completeOnboarding(!0)), this.shadowRoot.querySelector("#btn-onboard-skip")?.addEventListener("click", () => this.completeOnboarding(!1)), this.shadowRoot.querySelector("#btn-onboard-close")?.addEventListener("click", () => this.completeOnboarding(!1));
    const $ = this.shadowRoot.querySelector("#chk-voice-master");
    $ && $.addEventListener("change", () => {
      if (this.accessibilityPrefs.voice_enabled = $.checked, this.savePreferences(), $.checked)
        this.initWakeWordDetection();
      else if (this.wakeWordRecognizer) {
        try {
          this.wakeWordRecognizer.stop();
        } catch {
        }
        this.wakeWordRecognizer = null;
      }
      this.announce($.checked ? "Voice accessibility enabled" : "Voice accessibility disabled");
    });
    const q = this.shadowRoot.querySelector("#chk-auto-welcome");
    q && q.addEventListener("change", () => {
      this.accessibilityPrefs.auto_welcome = q.checked, this.savePreferences();
    });
    const E = this.shadowRoot.querySelector("#chk-auto-tts");
    E && E.addEventListener("change", () => {
      this.accessibilityPrefs.auto_tts = E.checked, this.savePreferences();
    });
    const V = [
      { id: "#btn-rate-075", rate: 0.75 },
      { id: "#btn-rate-100", rate: 1 },
      { id: "#btn-rate-125", rate: 1.25 },
      { id: "#btn-rate-150", rate: 1.5 }
    ];
    V.forEach(({ id: d, rate: u }) => {
      this.shadowRoot?.querySelector(d)?.addEventListener("click", () => {
        this.accessibilityPrefs.speech_rate = u, this.activeAudio && (this.activeAudio.playbackRate = u, this.activeAudio.preservesPitch = !0, this.activeAudio.mozPreservesPitch = !0, this.activeAudio.webkitPreservesPitch = !0), this.savePreferences(), V.forEach((v) => {
          this.shadowRoot?.querySelector(v.id)?.setAttribute("aria-pressed", v.rate === u ? "true" : "false");
        }), this.announce(`Speech rate set to ${u}x`);
      });
    }), this.shadowRoot.querySelector("#btn-read-page")?.addEventListener("click", () => this.readPageAloud()), this.shadowRoot.querySelector("#btn-read-section")?.addEventListener("click", () => this.readSectionAloud()), this.shadowRoot.querySelector("#btn-test-voice")?.addEventListener("click", () => {
      this.speakText(this.t("voiceWelcomeAnnouncement"));
    });
    const P = this.shadowRoot.querySelector("#chk-screen-reader");
    P && P.addEventListener("change", () => {
      this.accessibilityPrefs.screen_reader_mode = P.checked, P.checked && (this.accessibilityPrefs.auto_tts = !1, this.autoReadSpeech = !1, localStorage.setItem("savanna_bridge_auto_read", "false"), this.stopSpeaking()), this.savePreferences(), this.announce(P.checked ? "Screen reader mode enabled" : "Screen reader mode disabled");
    });
    const _ = this.shadowRoot.querySelector("#chk-keyboard-nav");
    _ && _.addEventListener("change", () => {
      this.accessibilityPrefs.keyboard_navigation = _.checked, this.savePreferences(), _.checked ? this.classList.add("keyboard-focus-enhanced") : this.classList.remove("keyboard-focus-enhanced"), this.announce(_.checked ? "Enhanced keyboard navigation enabled" : "Enhanced keyboard navigation disabled");
    });
    const C = this.shadowRoot.querySelector("#chk-sync-prefs");
    C && C.addEventListener("change", () => {
      this.accessibilityPrefs.sync_enabled = C.checked, this.savePreferences(), C.checked ? (this.syncPreferencesToBackend(), this.announce("Cross-website synchronization enabled")) : this.announce("Cross-website synchronization disabled");
    }), this.shadowRoot.querySelector("#btn-replay-onboarding")?.addEventListener("click", () => {
      this.accessibilityPrefs.onboarded = !1, this.onboardingDismissed = !1, this.onboardingStep = 0, this.isSettingsOpen = !1, this.render();
    });
  }
  escapeHtml(e) {
    return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
  }
}
customElements.get("bridge-assistant") || customElements.define("bridge-assistant", D);
if (!customElements.get("db-assistant")) {
  class T extends D {
  }
  customElements.define("db-assistant", T);
}
export {
  D as BridgeAssistant,
  r as ICONS
};
//# sourceMappingURL=widget.js.map
