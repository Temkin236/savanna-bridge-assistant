var SavannaBridgeAssistant=(function(f){"use strict";var D=Object.defineProperty;var I=(f,n,u)=>n in f?D(f,n,{enumerable:!0,configurable:!0,writable:!0,value:u}):f[n]=u;var d=(f,n,u)=>I(f,typeof n!="symbol"?n+"":n,u);const n={launcher:'<svg class="icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 10h.01M12 10h.01M16 10h.01"></path></svg>',settings:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',close:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',mic:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',send:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',user:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',users:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',video:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',copy:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',check:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>',trash:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',key:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-3 3L8 9 5 12l3 3 4.5-4.5"></path><circle cx="7.5" cy="16.5" r="4.5"></circle></svg>',listen:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',pause:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',lightbulb:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>',book:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',arrowRight:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',spinner:'<svg class="icon-inline spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',celebrate:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',telegram:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',sliders:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>',heart:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',link:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',headphones:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',type:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',contrast:'<svg class="icon-inline" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 18a6 6 0 0 0 0-12v12z"></path></svg>',sound:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',volumeMute:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',play:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',stop:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect></svg>',speed:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',sync:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>',sparkles:'<svg class="icon-inline" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>'},u={en:{appTitle:"Savanna Bridge Assistant",appSubtitle:"Ask questions, adjust support, or connect with a mentor",closeLabel:"Close dialog",launcherLabel:"Help & Assistant",settingsLabel:"Settings",settingsTitle:"Assistant Settings",closeSettings:"Done",textSizeLabel:"Text Size",textSmaller:"Smaller",textNormal:"Normal",textLarger:"Larger",highContrastLabel:"High Contrast",simpleModeLabel:"Simple mode",simpleModeDesc:"Explain answers in shorter, simpler sentences",supportNeedsTitle:"Support Preferences",supportZeroProof:"No medical documentation or proof required. All preferences are private.",needExtraTime:"Extra response time for tests and questions",needScreenReader:"Screen reader friendly materials and alt text",needWritten:"Written questions and instructions",needOther:"Other support needs",otherPlaceholder:"Describe any other accommodations...",contactModeLabel:"Preferred contact mode for live help:",modeText:"Text chat",modeVoice:"Voice call",modeVideo:"Video call",modeTelegram:"Telegram message",saveSupportBtn:"Save Preferences",supportSavedNotice:"Preferences saved privately.",emptyWelcome:"Welcome! Ask any question about your course.",suggestedTitle:"Suggested questions:",suggestedQ1:"What does Module 2 teach?",suggestedQ2:"Explain customer service foundations",suggestedQ3:"How do I communicate with customers?",inputPlaceholder:"Ask a question about this course...",sendButton:"Send",micLabel:"Microphone (voice input)",recordingState:"Listening... tap to finish",transcribingState:"Transcribing audio...",voicePreviewNotice:"Voice transcribed. You can edit the text before sending.",micError:"Microphone unavailable. Please type your question.",lookingInCourse:"Looking in the course...",answerHeading:"Answer",listenButton:"Listen",pauseButton:"Pause",makeSimplerButton:"Make simpler",sourcesTitle:"Course sources:",talkToPersonButton:"Talk to a person",continueOnTelegram:"Continue on Telegram",continueOnTelegramAria:"Continue on Telegram (opens Telegram)",telegramPrivacyNotice:"Telegram will receive your questions and the answers.",telegramConnected:"Telegram connected",connectedToTelegram:"Connected to Telegram",disconnectTelegram:"Disconnect",tryAnotherQuestion:"Try another question",notVerifiedNotice:"I cannot verify this from the course materials. A human mentor can help you directly.",offlineBanner:"You are offline.",savedOnPhoneNotice:"Saved on this phone. It will send when you are online.",serverErrorNotice:"Could not connect to the assistant. Please check your connection and try again.",handoffReadyTitle:"Your Live Help Room is Ready",joinRoomButton:"Join Live Help Room ↗",leaveRoomButton:"Close Help Session",androidFallbackNote:"Android note: Browser screen sharing (getDisplayMedia) is not supported in Chrome on Android. Your mentor automatically sees your active lesson URL, section, and focused element.",chatTab:"Chat",generalTab:"Display & Audio",supportTab:"Support Needs",linkTab:"Link Account",handoffTab:"Live Help",clearChatBtn:"Clear conversation",generateCodeBtn:"Generate 6-digit code",yourCodeIs:"Your 6-digit code:",handoffConsentCheck:"I consent to connect with a human mentor",handoffReasonLabel:"What do you need help with? (optional)",handoffReasonPlaceholder:"e.g., I need help with Module 2 exercise...",requestMentorBtn:"Request Human Mentor",copyRoomBtn:"Copy Link",linkCodeCopied:"Link copied to clipboard!",voiceAccessibilityLabel:"Voice Accessibility",voiceAccessibilityDesc:"Spoken welcome, read-aloud responses, and voice navigation",autoWelcomeLabel:"Spoken Welcome Announcement",autoWelcomeDesc:"Announce assistant status when the page opens",autoTtsLabel:"Read AI Responses Aloud",autoTtsDesc:"Automatically speak responses as they arrive",speechRateLabel:"Speech Rate",voiceInputLabel:"Voice Input (Microphone)",screenReaderModeLabel:"Screen-Reader Optimized",screenReaderModeDesc:"Enhanced ARIA labels and live region announcements",keyboardNavLabel:"Enhanced Keyboard Focus",keyboardNavDesc:"High-visibility focus outlines and navigation hints",syncPrefsLabel:"Sync Across Integrated Sites",syncPrefsDesc:"Securely restore these preferences when you visit other learning portals",readPageBtn:"Read Page Aloud",readSectionBtn:"Read Active Section",pauseReading:"Pause Reading",resumeReading:"Resume Reading",stopReading:"Stop Reading",readingPageAnnouncement:"Reading page content aloud...",readingSectionAnnouncement:"Reading active section aloud...",testVoiceBtn:"Test Voice",testingVoiceMsg:"Hello! Voice accessibility is active and configured in English.",voiceNotAvailable:"Voice speech synthesis for this language is not installed in your browser. Text and screen-reader assistance remain fully active.",oneTapVoiceActivation:"Voice assistance is available. Tap to listen to spoken welcome.",voiceWelcomeAnnouncement:"Welcome to Savanna Bridge Assistant. Voice accessibility is enabled. You can ask questions or ask to read the page.",onboardingTitle:"Welcome to Savanna Bridge",onboardingSubtitle:"Configure your accessibility and voice preferences once, use everywhere.",onboardingLangPrompt:"Choose your preferred language:",onboardingVoiceQuestion:"Would you like spoken audio and voice assistance?",onboardingVoiceEnable:"Enable Voice Accessibility",onboardingVoiceDesc:"Spoken welcome, read-aloud responses, and voice navigation",onboardingMicExplain:"Privacy notice: The microphone is only active when you tap the mic button. We never capture background audio.",onboardingSave:"Save & Start",onboardingSkip:"Skip for now",onboardingReplay:"Setup Tour / Onboarding",voiceTab:"Voice & Audio"},am:{appTitle:"የሳቫና ብሪጅ ረዳት",appSubtitle:"ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",closeLabel:"መስኮቱን ዝጋ",launcherLabel:"እርዳታ እና ረዳት",settingsLabel:"ቅንብሮች",settingsTitle:"የረዳት ቅንብሮች",closeSettings:"ጨርስ",textSizeLabel:"የጽሑፍ መጠን",textSmaller:"አነስተኛ",textNormal:"መደበኛ",textLarger:"ትልቅ",highContrastLabel:"ከፍተኛ ንፅፅር",simpleModeLabel:"ቀላል ማብራሪያ",simpleModeDesc:"መልሶችን በአጫጭርና በቀላል ዓረፍተ ነገሮች አስረዳኝ",supportNeedsTitle:"የግል የድጋፍ ፍላጎቶች",supportZeroProof:"ምንም ዓይነት የህክምና ማስረጃ ወይም ማረጋገጫ አያስፈልግም።",needExtraTime:"ለፈተናዎች እና ጥያቄዎች ተጨማሪ ጊዜ",needScreenReader:"ለስክሪን አንባቢ ምቹ የሆነ አቀራረብ",needWritten:"የጽሑፍ ጥያቄዎች እና መመሪያዎች",needOther:"ሌሎች የድጋፍ ፍላጎቶች",otherPlaceholder:"የሚፈልጉትን ተጨማሪ ድጋፍ ይግለጹ...",contactModeLabel:"የቀጥታ ድጋፍ የሚፈልጉበት መንገድ፡",modeText:"የጽሑፍ መልእክት",modeVoice:"የድምጽ ጥሪ",modeVideo:"የቪዲዮ ጥሪ",modeTelegram:"የቴሌግራም መልእክት",saveSupportBtn:"ምርጫዎችን መዝግብ",supportSavedNotice:"ምርጫዎችዎ በሚስጥር ተቀምጠዋል።",emptyWelcome:"እንኳን ደህና መጡ! ስለ ኮርሱ ማንኛውንም ጥያቄ ይጠይቁ።",suggestedTitle:"የተጠቆሙ ጥያቄዎች፡",suggestedQ1:"ሞጁል 2 ምን ያስተምራል?",suggestedQ2:"የደንበኞች አገልግሎት መሰረቶችን አስረዳኝ",suggestedQ3:"ከደንበኞች ጋር እንዴት መገናኘት እችላለሁ?",inputPlaceholder:"ስለዚህ ኮርስ ጥያቄ ይጠይቁ...",sendButton:"ላክ",micLabel:"ማይክሮፎን (የድምጽ ግብዓት)",recordingState:"እያዳመጥኩ ነው... ለማጠናቀቅ ይጫኑ",transcribingState:"ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",voicePreviewNotice:"ድምጽዎ ወደ ጽሑፍ ተቀይሯል። ከመላክዎ በፊት ማስተካከል ይችላሉ።",micError:"ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",lookingInCourse:"በኮርሱ ውስጥ በመፈለግ ላይ...",answerHeading:"መልስ",listenButton:"አዳምጥ",pauseButton:"አቁም",makeSimplerButton:"ቀለል አድርግ",sourcesTitle:"የኮርስ ምንጮች፡",talkToPersonButton:"ከሰው ጋር ተነጋገር",continueOnTelegram:"በቴሌግራም ቀጥል",continueOnTelegramAria:"በቴሌግራም ቀጥል (ቴሌግራምን ይከፍታል)",telegramPrivacyNotice:"ቴሌግራም ጥያቄዎችዎን እና መልሶቹን ይቀበላል።",telegramConnected:"ቴሌግራም ተገናኝቷል",connectedToTelegram:"ከቴሌግራም ጋር ተገናኝቷል",disconnectTelegram:"ግንኙነት አቋርጥ",tryAnotherQuestion:"ሌላ ጥያቄ ሞክር",notVerifiedNotice:"ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። የሰው አማካሪ በቀጥታ ሊረዳዎት ይችላል።",offlineBanner:"ከመስመር ውጭ ነዎት።",savedOnPhoneNotice:"በዚህ ስልክ ላይ ተቀምጧል። መስመር ላይ ሲሆኑ ይላካል።",serverErrorNotice:"ከአገልጋዩ ጋር መገናኘት አልተቻለም። እባክዎ ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",handoffReadyTitle:"የቀጥታ ድጋፍ ክፍልዎ ዝግጁ ነው",joinRoomButton:"ወደ ስብሰባው ክፍል ግባ ↗",leaveRoomButton:"ክፍለ-ጊዜውን ዝጋ",androidFallbackNote:"የአንድሮይድ ማሳሰቢያ፡ በአንድሮይድ ክሮም ላይ የስክሪን ማጋራት አይደገፍም። አማካሪዎ እርስዎ ያሉበትን የትምህርት ገጽ እና ርዕስ በቀጥታ ይመለከታል።",chatTab:"ውይይት",generalTab:"እይታ እና ድምጽ",supportTab:"የድጋፍ ፍላጎቶች",linkTab:"መለያ አገናኝ",handoffTab:"የቀጥታ ድጋፍ",clearChatBtn:"ውይይቱን አጽዳ",generateCodeBtn:"ባለ 6 አሃዝ ኮድ ፍጠር",yourCodeIs:"የእርስዎ ባለ 6 አሃዝ ኮድ፡",handoffConsentCheck:"ከሰው አማካሪ ጋር ለመገናኘት እስማማለሁ",handoffReasonLabel:"በምን ላይ እርዳታ ይፈልጋሉ? (አማራጭ)",handoffReasonPlaceholder:"ምሳሌ፡ በሞጁል 2 መልመጃ ላይ እገዛ እፈልጋለሁ...",requestMentorBtn:"የሰው አማካሪ ጠይቅ",copyRoomBtn:"ሊንኩን ቅዳ",linkCodeCopied:"ሊንኩ ተቀድቷል!",voiceAccessibilityLabel:"የድምጽ አገልግሎት",voiceAccessibilityDesc:"የድምጽ ሰላምታ፣ መልሶችን ጮክ ብሎ ማንበብ፣ እና የድምጽ ዳሰሳ",autoWelcomeLabel:"ገጹ ሲከፈት የድምጽ ሰላምታ ይስጡ",autoWelcomeDesc:"ገጹ እንደተከፈተ ረዳቱ ዝግጁ መሆኑን በድምጽ ያስታውቃል",autoTtsLabel:"የአይአይ መልሶችን በድምጽ አንብብ",autoTtsDesc:"መልሶች ሲደርሱ ወዲያውኑ በድምጽ ያነባል",speechRateLabel:"የንግግር ፍጥነት",voiceInputLabel:"የድምጽ ግብዓት (ማይክሮፎን)",screenReaderModeLabel:"ለስክሪን አንባቢ ምቹ ሁነታ",screenReaderModeDesc:"የተሻሻለ የአሪያ ማብራሪያዎች እና ማስታወቂያዎች",keyboardNavLabel:"የተሻሻለ የኪቦርድ ትኩረት",keyboardNavDesc:"ግልጽ የትኩረት መስመሮች እና የዳሰሳ ጠቋሚዎች",syncPrefsLabel:"በሁሉም ድረ-ገጾች ላይ ምርጫዎችን አመሳስል",syncPrefsDesc:"ወደ ሌሎች የትምህርት ገጾች ሲሄዱ እነዚህን ምርጫዎች በራስ-ሰር ያግኙ",readPageBtn:"ገጹን በድምጽ አንብብ",readSectionBtn:"ወቅታዊውን ክፍል አንብብ",pauseReading:"ማንበብ አቁም",resumeReading:"ማንበብ ቀጥል",stopReading:"ማንበብ ጨርስ",readingPageAnnouncement:"የገጹን ይዘት በድምጽ እያነበበ ነው...",readingSectionAnnouncement:"ወቅታዊውን ክፍል በድምጽ እያነበበ ነው...",testVoiceBtn:"ድምጽን ፈትሽ",testingVoiceMsg:"ሰላም! የድምጽ አገልግሎት በአማርኛ ቋንቋ በትክክል እየሰራ ነው።",voiceNotAvailable:"ለዚህ ቋንቋ የድምጽ ንባብ በብራውዘርዎ ውስጥ አልተገኘም። የጽሑፍ እና የስክሪን አንባቢ አገልግሎት ሙሉ በሙሉ ይሰራል።",oneTapVoiceActivation:"የድምጽ አገልግሎት ዝግጁ ነው። የድምጽ ሰላምታውን ለማዳመጥ እዚህ ይጫኑ።",voiceWelcomeAnnouncement:"እንኳን ወደ ሳቫና ብሪጅ ረዳት በደህና መጡ። የድምጽ አገልግሎት በርቷል። ጥያቄዎችን መጠየቅ ወይም ገጹን እንዲያነብልዎ ማድረግ ይችላሉ።",onboardingTitle:"እንኳን ወደ ሳቫና ብሪጅ በደህና መጡ",onboardingSubtitle:"የእርስዎን የድምጽ እና የአጠቃቀም ምርጫዎች አንድ ጊዜ ያስተካክሉ፣ በሁሉም ቦታ ይጠቀሙ።",onboardingLangPrompt:"የሚመርጡትን ቋንቋ ይምረጡ፡",onboardingVoiceQuestion:"የድምጽ ድጋፍ እና ንባብ ይፈልጋሉ?",onboardingVoiceEnable:"የድምጽ አገልግሎትን አብራ",onboardingVoiceDesc:"የድምጽ ሰላምታ፣ መልሶችን ጮክ ብሎ ማንበብ፣ እና የድምጽ ዳሰሳ",onboardingMicExplain:"የግላዊነት ማሳሰቢያ፡ ማይክሮፎኑ የሚሰራው እርስዎ የማይክ ቁልፉን ሲጫኑ ብቻ ነው። ከበስተጀርባ ድምጽ አንቀዳም።",onboardingSave:"መዝግብና ጀምር",onboardingSkip:"ለጊዜው እለፈው",onboardingReplay:"የመጀመሪያ ቅንብር መመሪያ",voiceTab:"ድምጽ እና ማዳመጥ"},om:{appTitle:"Gargaaraa Savanna Bridge",appSubtitle:"Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",closeLabel:"Cufi",launcherLabel:"Gargaarsa",settingsLabel:"Qindaa'ina",settingsTitle:"Qindaa'ina Gargaaraa",closeSettings:"Xumuri",textSizeLabel:"Hamma Barruu",textSmaller:"Xiqqaa",textNormal:"Idilee",textLarger:"Guddaa",highContrastLabel:"Waliin-dhaabbii Olaanaa",simpleModeLabel:"Ibsa salphaa",simpleModeDesc:"Himoota gaggabaaboo fi salphaadhaan ibsi",supportNeedsTitle:"Filannoo Deeggarsaa",supportZeroProof:"Waraqaan yaalaa hin barbaachisu. Filannoon keessan dhuunfaadha.",needExtraTime:"Qorumsaaf yeroo dabalataa",needScreenReader:"Dubbisaa iskiriiniif kan mijate",needWritten:"Qajeelfama barruudhaan",needOther:"Deeggarsa biraa",otherPlaceholder:"Ibsaa...",contactModeLabel:"Mala qunnamtii filattan:",modeText:"Barruu",modeVoice:"Sagalee",modeVideo:"Viidiyoo",modeTelegram:"Telegiraamii",saveSupportBtn:"Galmeessi",supportSavedNotice:"Filannoon keessan galmaa'eera.",emptyWelcome:"Baga nagaan dhuftan! Gaaffii kamiyyuu gaafadhaa.",suggestedTitle:"Gaaffiiwwan filataman:",suggestedQ1:"Kutaan 2 maal barsiisa?",suggestedQ2:"Bu'uuraalee tajaajila maamiltootaa ibsi",suggestedQ3:"Maamiltoota waliin akkamittan qunnama?",inputPlaceholder:"Waa'ee barnoota kanaa gaafadhaa...",sendButton:"Ergi",micLabel:"Maaykirofoonii",recordingState:"Dhaggeeffachaa jira...",transcribingState:"Sagalee jijjiiraa jira...",voicePreviewNotice:"Sagaleen gara barruutti jijjiirameera.",micError:"Maaykirofooniin hin argamne.",lookingInCourse:"Barnoota keessaa barbaadaa jira...",answerHeading:"Deebii",listenButton:"Dhaggeeffadhu",pauseButton:"Dhaabi",makeSimplerButton:"Salphisi",sourcesTitle:"Madda barnootaa:",talkToPersonButton:"Nama waliin dubbadhu",continueOnTelegram:"Telegiraamiin Itti fufi",continueOnTelegramAria:"Telegiraamiin Itti fufi (Telegiraamii bana)",telegramPrivacyNotice:"Telegiraam gaaffii fi deebii keessan ni fudhata.",telegramConnected:"Telegiraam walqabateera",connectedToTelegram:"Telegiraamii waliin walqabateera",disconnectTelegram:"Gargar Baasi",tryAnotherQuestion:"Gaaffii biraa yaali",notVerifiedNotice:"Barnoota keessaa mirkaneessuu hin dandeenye.",offlineBanner:"Toora irraa ala jirtu.",savedOnPhoneNotice:"Bilbila kana irratti kuufameera. Toora irratti yemmuu dhuftan ergama.",serverErrorNotice:"Gargaaraa waliin walqunnamuu hin dandeenye.",handoffReadyTitle:"Kutaan gargaarsaa qophiidha",joinRoomButton:"Kutaa Seenaa ↗",leaveRoomButton:"Kutaa Dhiisaa",androidFallbackNote:"Iskiriinii qooduun Android irratti hin danda'amu.",chatTab:"Haasaa",generalTab:"Mul'ina",supportTab:"Deeggarsa",linkTab:"Herrega Walqabsiisi",handoffTab:"Gargaarsa Kallattii",clearChatBtn:"Haquu",generateCodeBtn:"Koodii uumi",yourCodeIs:"Koodii keessan:",handoffConsentCheck:"Gorsaa waliin walqunnamuuf walii galeera",handoffReasonLabel:"Waan gargaarsa barbaaddan:",handoffReasonPlaceholder:"fkn: Kutaa 2ffaa...",requestMentorBtn:"Gorsaa Gaafadhaa",copyRoomBtn:"Waraabi",linkCodeCopied:"Waraabameera!",voiceAccessibilityLabel:"Tajaajila Sagalee",voiceAccessibilityDesc:"Nagaa gaafachuu sagalee, deebii dubbisuu, fi sagaleen deemsisa",autoWelcomeLabel:"Banaamuu irratti nagaa sagaleen",autoWelcomeDesc:"Fuulli yemmuu banamu gargaaraan qophaa'uu isaa sagaleen beeksisa",autoTtsLabel:"Deebii AI sagaleen dubbisi",autoTtsDesc:"Deebiin yemmuu dhufu battalumatti sagaleen dubbisa",speechRateLabel:"Saffisa Dubbisuu",voiceInputLabel:"Galtee Sagalee (Maaykirofoonii)",screenReaderModeLabel:"Dubbisaa Iskiriiniif kan Mijate",screenReaderModeDesc:"Ibsa fi beeksisa ARIA fooyya'aa",keyboardNavLabel:"Xiyyeeffannoo Kiibordii Fooyya'aa",keyboardNavDesc:"Sarara xiyyeeffannoo ifa ta'e",syncPrefsLabel:"Marsariitiiwwan hundatti Qindaa'ina Walsimsiisi",syncPrefsDesc:"Marsariitiiwwan barnootaa biroo yemmuu daawwattan qindaa'ina kana argadhaa",readPageBtn:"Fuula Sagaleen Dubbisi",readSectionBtn:"Kutaa Ammaa Dubbisi",pauseReading:"Dhaabi",resumeReading:"Itti Fufi",stopReading:"Xumuri",readingPageAnnouncement:"Qabiyyee fuulaa sagaleen dubbisaa jira...",readingSectionAnnouncement:"Kutaa jiru sagaleen dubbisaa jira...",testVoiceBtn:"Sagalee Qori",testingVoiceMsg:"Akkam! Tajaajilli sagalee Afaan Oromootiin hojjetaa jira.",voiceNotAvailable:"Sagaleen dubbisuu Afaan Oromoo biraawzarii keessan keessatti hin argamne. Tajaajilli barruu fi dubbisaa iskiriinii guutuu dha.",oneTapVoiceActivation:"Tajaajilli sagalee qophiidha. Nagaa dhaggeeffachuuf as tuqaa.",voiceWelcomeAnnouncement:"Baga nagaan gara Gargaaraa Savanna Bridge dhuftan. Tajaajilli sagalee hojjetaa jira. Gaaffii gaafachuu ykn fuula akka dubbisu gochuu dandeessu.",onboardingTitle:"Baga Nagaan Gara Savanna Bridge Dhuftan",onboardingSubtitle:"Filannoo keessan al tokko qindeessaa, iddoo hundatti itti fayyadamaa.",onboardingLangPrompt:"Afaan filattan filadhaa:",onboardingVoiceQuestion:"Deeggarsa sagalee fi dubbisuu barbaadduu?",onboardingVoiceEnable:"Tajaajila Sagalee Bani",onboardingVoiceDesc:"Nagaa sagalee, deebii dubbisuu, fi sagaleen deemsisa",onboardingMicExplain:"Eegumsa dhuunfaa: Maaykirofooniin kan hojjetu yemmuu isin cuqaastan qofa. Sagalee duubaa hin waraabnu.",onboardingSave:"Galmeessi & Jalqabi",onboardingSkip:"Ammaaf darbi",onboardingReplay:"Daawwannaa Qindaa'inaa",voiceTab:"Sagalee & Dhaggeeffannaa"},ti:{appTitle:"ናይ ሳቫና ብሪጅ ሓጋዚ",appSubtitle:"ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",closeLabel:"ዕጾ",launcherLabel:"ሓገዝ",settingsLabel:"ቅጥዕታት",settingsTitle:"ናይ ሓጋዚ ቅጥዕታት",closeSettings:"ወዲአ",textSizeLabel:"መጠን ጽሑፍ",textSmaller:"ንእሽቶ",textNormal:"ስሩዕ",textLarger:"ዓቢ",highContrastLabel:"ላዕለዋይ ንጽጽር",simpleModeLabel:"ቀሊል መብርሂ",simpleModeDesc:"ብሓጸርቲ ሓረጋት ኣረድኣኒ",supportNeedsTitle:"ናይ ውልቂ ሓገዝ ምርጫታት",supportZeroProof:"ሕክምናዊ መርትዖ ኣየድልን እዩ። ምርጫታትኩም ምስጢራዊ እዩ።",needExtraTime:"ተወሳኺ ግዜ ንፈተናታት",needScreenReader:"ንስክሪን ኣንባቢ ምቹእ",needWritten:"ናይ ጽሑፍ መምርሒታት",needOther:"ካልእ ድሌታት",otherPlaceholder:"ግለጹ...",contactModeLabel:"ትመርጽዎ ናይ ርክብ መገዲ፡",modeText:"ጽሑፍ",modeVoice:"ድምጺ",modeVideo:"ቪድዮ",modeTelegram:"ቴሌግራም",saveSupportBtn:"ኣቐምጥ",supportSavedNotice:"ምርጫታትኩም ተቐሚጡ ኣሎ።",emptyWelcome:"እንቋዕ ብደሓን መጻእኩም! ዝኾነ ሕቶ ሕተቱ።",suggestedTitle:"ዝተመርጹ ሕቶታት፡",suggestedQ1:"ሞጁል 2 እንታይ ይምህር?",suggestedQ2:"መሰረታት ኣገልግሎት ዓማዊል ኣብርሃለይ",suggestedQ3:"ምስ ዓማዊል ብኸመይ ይራኸብ?",inputPlaceholder:"ብዛዕባዚ ኮርስ ሕቶ ሕተቱ...",sendButton:"ስደድ",micLabel:"ማይክሮፎን",recordingState:"ይሰምዕ ኣለኹ...",transcribingState:"ናብ ጽሑፍ ይቕየር ኣሎ...",voicePreviewNotice:"ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ።",micError:"ማይክሮፎን ክርከብ ኣይተኻእለን።",lookingInCourse:"ኣብ ኮርስ ይድለ ኣሎ...",answerHeading:"መልሲ",listenButton:"ስማዕ",pauseButton:"ኣዕርፍ",makeSimplerButton:"ቀሊል ግበሮ",sourcesTitle:"ምንጭታት ኮርስ፡",talkToPersonButton:"ምስ ሰብ ተዛረብ",continueOnTelegram:"ብቴሌግራም ቀጽል",continueOnTelegramAria:"ብቴሌግራም ቀጽል (ቴሌግራም ይኸፍት)",telegramPrivacyNotice:"ቴሌግራም ሕቶኹምን መልስኹምን ይቕበል እዩ።",telegramConnected:"ቴሌግራም ተላጊቡ ኣሎ",connectedToTelegram:"ምስ ቴሌግራም ተላጊቡ ኣሎ",disconnectTelegram:"ግንኙነት ኣቋርጽ",tryAnotherQuestion:"ካልእ ሕቶ ፈትን",notVerifiedNotice:"እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን።",offlineBanner:"መስመር ተቛሪጹ ኣሎ።",savedOnPhoneNotice:"ኣብዚ ስልኪ ተቐሚጡ ኣሎ። ኦንላይን ምስ ኮንኩም ክስደድ እዩ።",serverErrorNotice:"ምስ ሓጋዚ ክራኸብ ኣይተኻእለን።",handoffReadyTitle:"ናይ ሓገዝ ክፍሊ ድሉው እዩ",joinRoomButton:"ናብ ክፍሊ እቶ ↗",leaveRoomButton:"ክፍሊ ዕጾ",androidFallbackNote:"ኣብ አንድሮይድ ስክሪን ምክፋል ኣይድገፍን።",chatTab:"ዕላል",generalTab:"ምርኣይ",supportTab:"ሓገዝ",linkTab:"ሕሳብ ኣላግብ",handoffTab:"ቀጥታዊ ሓገዝ",clearChatBtn:"ኣጽርዮ",generateCodeBtn:"ኮድ ፍጠር",yourCodeIs:"ናይ ስድሽተ ኣሃዝ ኮድኩም፡",handoffConsentCheck:"ምስ መካሪ ንምርኻብ ተሰማሚዐ ኣለኹ",handoffReasonLabel:"እንታይ ሓገዝ የድልየኩም?",handoffReasonPlaceholder:"ንኣብነት፡ ኣብ ሞጁል 2...",requestMentorBtn:"ናይ ሰብ ሓገዝ ሕተት",copyRoomBtn:"ቅዳሕ",linkCodeCopied:"ተቐዲሑ ኣሎ!",voiceAccessibilityLabel:"ናይ ድምጺ ኣገልግሎት",voiceAccessibilityDesc:"ናይ ድምጺ ሰላምታ፡ መልስታት ዓው ኢልካ ምንባብ፡ ናይ ድምጺ ምንቅስቓስ",autoWelcomeLabel:"ገጽ ክኽፈት ከሎ ብድምጺ ሰላምታ ሃብ",autoWelcomeDesc:"ገጽ ምስ ተኸፍተ ሓጋዚ ድሉው ምዃኑ ብድምጺ ይሕብር",autoTtsLabel:"መልስታት ብድምጺ ኣንብብ",autoTtsDesc:"መልስታት ምስ መጹ ብኡንብኡ ብድምጺ የንብብ",speechRateLabel:"ናይ ድምጺ ፍጥነት",voiceInputLabel:"ናይ ድምጺ ምእታዊ (ማይክሮፎን)",screenReaderModeLabel:"ንስክሪን ኣንባቢ ዝተመዓራረየ",screenReaderModeDesc:"ዝተመሓየሸ ናይ ARIA መብርሂታትን መተሓሳሰብታትን",keyboardNavLabel:"ዝተመሓየሸ ናይ ኪቦርድ ትኹረት",keyboardNavDesc:"ግሉጽ ናይ ትኹረት መስመራት",syncPrefsLabel:"ኣብ ኩሎም መርበባት ሓበሬታ ኣመሳስል",syncPrefsDesc:"ናብ ካልኦት ናይ ትምህርቲ መርበባት ክትከዱ ከለኹም ነዚ ምርጫታት ርኸቡ",readPageBtn:"ገጽ ብድምጺ ኣንብብ",readSectionBtn:"ዘለኹሞ ክፍሊ ኣንብብ",pauseReading:"ኣዕርፍ",resumeReading:"ቀጽል",stopReading:"ወድእ",readingPageAnnouncement:"ትሕዝቶ ገጽ ብድምጺ የንብብ ኣሎ...",readingSectionAnnouncement:"ክፍሊ ብድምጺ የንብብ ኣሎ...",testVoiceBtn:"ድምጺ ፈትን",testingVoiceMsg:"ሰላም! ናይ ድምጺ ኣገልግሎት ብትግርኛ ይሰርሕ ኣሎ።",voiceNotAvailable:"ናይዚ ቋንቋ ናይ ድምጺ ምንባብ ኣብዚ ብራውዘር ኣይተረኽበን። ናይ ጽሑፍን ስክሪን ኣንባብን ኣገልግሎት ሙሉእ ብሙሉእ ይሰርሕ።",oneTapVoiceActivation:"ናይ ድምጺ ኣገልግሎት ድሉው እዩ። ንምስማዕ ኣብዚ ጠውቑ።",voiceWelcomeAnnouncement:"እንቋዕ ናብ ሳቫና ብሪጅ ረዳኢ ብደሓን መጻእኩም። ናይ ድምጺ ኣገልግሎት ነቒሑ ኣሎ። ሕቶታት ክትሓቱ ወይ ገጽ ከነብበልኩም ክትሓቱ ትኽእሉ።",onboardingTitle:"እንቋዕ ናብ ሳቫና ብሪጅ ብደሓን መጻእኩም",onboardingSubtitle:"ምርጫታትኩም ሓንሳብ ኣመዓራርዩ፡ ኣብ ኩሉ ተጠቐሙ።",onboardingLangPrompt:"ዝመረጽኩምዎ ቋንቋ ምረጹ፡",onboardingVoiceQuestion:"ናይ ድምጺ ሓገዝን ምንባብን ትደልዩ ዶ?",onboardingVoiceEnable:"ናይ ድምጺ ኣገልግሎት ኣብርህ",onboardingVoiceDesc:"ናይ ድምጺ ሰላምታ፡ መልስታት ዓው ኢልካ ምንባብ፡ ናይ ድምጺ ምንቅስቓስ",onboardingMicExplain:"ናይ ብሕትውና መተሓሳሰቢ፡ ማይክሮፎን ዝሰርሕ እቲ ምልክት ክትጠውቑ ከለኹም ጥራይ እዩ። ናይ ድሕሪት ድምጺ ኣይንቐድሕን ኢና።",onboardingSave:"መዝግብ & ጀምር",onboardingSkip:"ንሕጂ ሕለፎ",onboardingReplay:"ናይ መጀመርታ መምርሒ",voiceTab:"ድምጽን ምስማዕን"},ar:{appTitle:"مساعد سافانا بريدج",appSubtitle:"اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",closeLabel:"إغلاق النافذة",launcherLabel:"المساعدة والمساعد",settingsLabel:"الإعدادات",settingsTitle:"إعدادات المساعد",closeSettings:"تم",textSizeLabel:"حجم النص",textSmaller:"أصغر",textNormal:"عادي",textLarger:"أكبر",highContrastLabel:"تباين عالٍ",simpleModeLabel:"شرح مبسط",simpleModeDesc:"اشرح بجمل أقصر وأبسط",supportNeedsTitle:"تفضيلات الدعم",supportZeroProof:"لا يُطلب أي تشخيص أو وثائق طبية. جميع التفضيلات سرية.",needExtraTime:"وقت استجابة إضافي للاختبارات",needScreenReader:"مواد متوافقة مع قارئ الشاشة",needWritten:"أسئلة وتعليمات مكتوبة",needOther:"احتياجات دعم أخرى",otherPlaceholder:"حدد أي احتياجات أخرى...",contactModeLabel:"طريقة التواصل المفضلة للمساعدة:",modeText:"محادثة نصية",modeVoice:"مكالمة صوتية",modeVideo:"مكالمة فيديو",modeTelegram:"رسالة تيليجرام",saveSupportBtn:"حفظ التفضيلات",supportSavedNotice:"تم حفظ التفضيلات بسرية.",emptyWelcome:"مرحباً بك! اطرح أي سؤال حول الدورة التدريبية.",suggestedTitle:"أسئلة مقترحة:",suggestedQ1:"ماذا نتعلم في الوحدة الثانية؟",suggestedQ2:"اشرح أساسيات خدمة العملاء",suggestedQ3:"كيف أتواصل بفعالية مع العملاء؟",inputPlaceholder:"اطرح سؤالاً حول هذه الدورة...",sendButton:"إرسال",micLabel:"الميكروفون (إدخال صوتي)",recordingState:"جاري الاستماع... اضغط للإنهاء",transcribingState:"جاري تحويل الصوت إلى نص...",voicePreviewNotice:"تم تحويل الصوت إلى نص. يمكنك تعديله قبل الإرسال.",micError:"الميكروفون غير متوفر.",lookingInCourse:"جاري البحث في محتوى الدورة...",answerHeading:"الإجابة",listenButton:"استماع",pauseButton:"إيقاف مؤقت",makeSimplerButton:"تبسيط الشرح",sourcesTitle:"مصادر الدورة:",talkToPersonButton:"التحدث مع شخص",continueOnTelegram:"المتابعة عبر تيليجرام",continueOnTelegramAria:"المتابعة عبر تيليجرام (يفتح تيليجرام)",telegramPrivacyNotice:"سيتلقى تيليجرام أسئلتك وإجاباتها.",telegramConnected:"تم ربط تيليجرام",connectedToTelegram:"متصل عبر تيليجرام",disconnectTelegram:"قطع الاتصال",tryAnotherQuestion:"جرب سؤالاً آخر",notVerifiedNotice:"لا يمكنني التحقق من ذلك من محتوى الدورة. يمكن لمرشد بشري مساعدتك مباشرة.",offlineBanner:"أنت غير متصل بالإنترنت.",savedOnPhoneNotice:"تم الحفظ على الهاتف. سيتم الإرسال فور اتصالك بالإنترنت.",serverErrorNotice:"تعذر الاتصال بالمساعد. يرجى التحقق من اتصالك والمحاولة لاحقاً.",handoffReadyTitle:"غرفة المساعدة المباشرة جاهزة",joinRoomButton:"الانضمام للغرفة ↗",leaveRoomButton:"إغلاق الجلسة",androidFallbackNote:"ملاحظة أندرويد: مشاركة الشاشة عبر المتصفح غير مدعومة على متصفح Chrome لنظام أندرويد.",chatTab:"محادثة",generalTab:"العرض والصوت",supportTab:"احتياجات الدعم",linkTab:"ربط الحساب",handoffTab:"المساعدة المباشرة",clearChatBtn:"مسح المحادثة",generateCodeBtn:"توليد رمز مكون من 6 أرقام",yourCodeIs:"رمزك المكون من 6 أرقام:",handoffConsentCheck:"أوافق على التواصل مع مرشد بشري",handoffReasonLabel:"ما الذي تحتاج إلى مساعدة فيه؟ (اختياري)",handoffReasonPlaceholder:"مثال: أحتاج مساعدة في تمرين الوحدة 2...",requestMentorBtn:"طلب مساعدة بشرية",copyRoomBtn:"نسخ الرابط",linkCodeCopied:"تم نسخ الرابط بنجاح!",voiceAccessibilityLabel:"المساعدة الصوتية",voiceAccessibilityDesc:"ترحيب صوتي، قراءة الإجابات بصوت عالٍ، وملاحة صوتية",autoWelcomeLabel:"ترحيب صوتي تلقائي",autoWelcomeDesc:"الإعلان عن جاهزية المساعد عند فتح الصفحة",autoTtsLabel:"قراءة إجابات الذكاء الاصطناعي بصوت عالٍ",autoTtsDesc:"نطق الإجابات تلقائياً فور وصولها",speechRateLabel:"سرعة النطق",voiceInputLabel:"الإدخال الصوتي (الميكروفون)",screenReaderModeLabel:"محسّن لقارئات الشاشة",screenReaderModeDesc:"تسميات وإعلانات ARIA محسّنة ودقيقة",keyboardNavLabel:"تنقل محسّن بلوحة المفاتيح",keyboardNavDesc:"مؤشرات تركيز واضحة للمفاتيح",syncPrefsLabel:"مزامنة التفضيلات عبر جميع المواقع",syncPrefsDesc:"استعادة تفضيلاتك تلقائياً عند زيارة منصات تعليمية أخرى",readPageBtn:"قراءة الصفحة بصوت عالٍ",readSectionBtn:"قراءة القسم الحالي",pauseReading:"إيقاف مؤقت",resumeReading:"استئناف",stopReading:"إيقاف القراءة",readingPageAnnouncement:"جاري قراءة محتوى الصفحة بصوت عالٍ...",readingSectionAnnouncement:"جاري قراءة القسم الحالي بصوت عالٍ...",testVoiceBtn:"اختبار الصوت",testingVoiceMsg:"مرحباً! المساعدة الصوتية مفعلة وتعمل باللغة العربية.",voiceNotAvailable:"الصوت العربي غير مثبت في متصفحك. المساعدة النصية وتوافق قارئ الشاشة يعملان بشكل كامل.",oneTapVoiceActivation:"المساعدة الصوتية متاحة. اضغط هنا للاستماع للترحيب الصوتي.",voiceWelcomeAnnouncement:"مرحباً بكم في مساعد سافانا بريدج. تم تفعيل المساعدة الصوتية. يمكنك طرح الأسئلة أو طلب قراءة الصفحة.",onboardingTitle:"مرحباً بكم في سافانا بريدج",onboardingSubtitle:"اضبط تفضيلات إمكانية الوصول والصوت مرة واحدة، واستخدمها في كل مكان.",onboardingLangPrompt:"اختر لغتك المفضلة:",onboardingVoiceQuestion:"هل ترغب في تفعيل المساعدة الصوتية ونطق النصوص؟",onboardingVoiceEnable:"تفعيل المساعدة الصوتية",onboardingVoiceDesc:"ترحيب صوتي، قراءة الإجابات بصوت عالٍ، وملاحة صوتية",onboardingMicExplain:"إشعار الخصوصية: الميكروفون يعمل فقط عند الضغط على زر الميكروفون. لا نسجل أي صوت في الخلفية مطلقاً.",onboardingSave:"حفظ والبدء",onboardingSkip:"تخطي الآن",onboardingReplay:"دليل الإعداد الأولي",voiceTab:"الصوت والقراءة"}},N=`
  :host {
    --b-font: var(--bs-body-font-family, system-ui, -apple-system, "Noto Sans Ethiopic", "Nyala", sans-serif);
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

  :host([data-size="smaller"]) { font-size: 0.875rem; }
  :host([data-size="normal"]) { font-size: 1rem; }
  :host([data-size="larger"]) { font-size: 1.15rem; }

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

  /* Touch Targets: Min 44x44px (2.75rem) */
  button, .btn {
    min-height: 2.75rem;
    min-width: 2.75rem;
    padding: 0.5rem 0.875rem;
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

  .btn-danger {
    background: #dc2626;
    color: #ffffff;
    border-color: #dc2626;
  }

  /* Floating Launcher Button */
  .launcher {
    position: fixed;
    inset: auto 1.25rem 1.25rem auto;
    z-index: 2147483640;
    background: #b91c1c;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 2rem;
    padding: 0.625rem 1.25rem;
    box-shadow: var(--b-shadow);
    font-weight: 700;
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
    inset: auto 1.25rem 5.25rem auto;
    width: 410px;
    max-width: calc(100vw - 2rem);
    height: 620px;
    max-height: calc(100dvh - 6.5rem);
    display: flex;
    flex-direction: column;
    background: var(--b-bg);
    color: var(--b-text);
    border: 1px solid var(--b-border);
    border-radius: var(--b-radius);
    box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.05);
    z-index: 2147483640;
    overflow: hidden;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
  }

  .panel[hidden] {
    display: none !important;
  }

  /* Header */
  .header {
    padding: 0.625rem 0.875rem;
    border-bottom: 1px solid var(--b-border);
    background: var(--b-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .header-titles {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3125rem;
    font-size: 0.6875rem;
    color: #16a34a;
    font-weight: 600;
    background: #dcfce7;
    padding: 0.125rem 0.4375rem;
    border-radius: 1rem;
    flex-shrink: 0;
  }

  .status-dot {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    background-color: #22c55e;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .btn-icon-only {
    min-width: 2.25rem !important;
    min-height: 2.25rem !important;
    width: 2.25rem !important;
    height: 2.25rem !important;
    padding: 0 !important;
    border-radius: 0.5rem !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .icon-inline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spin-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes pulse-recording {
    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  .lang-group {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    background: var(--b-surface-alt);
    padding: 0.125rem;
    border-radius: 0.5rem;
    border: 1px solid var(--b-border);
  }

  .lang-toggle-btn {
    font-size: 0.6875rem;
    padding: 0.25rem 0.375rem;
    min-height: 2rem;
    min-width: 1.875rem;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: var(--b-text-muted);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .lang-toggle-btn:hover {
    color: var(--b-text);
  }

  .lang-toggle-btn[aria-pressed="true"] {
    background: var(--b-surface);
    color: var(--b-primary);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
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
    border-radius: 0.625rem;
    transition: all 0.15s ease;
  }
  .btn-suggested:hover {
    background: var(--b-surface);
    border-color: var(--b-primary);
    color: var(--b-primary);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
    border-radius: 1rem 1rem 0.25rem 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }

  .msg-assistant {
    align-self: flex-start;
    background: var(--b-surface);
    color: var(--b-text);
    padding: 0.75rem 0.875rem;
    border-radius: 1rem 1rem 1rem 0.25rem;
    border: 1px solid var(--b-border);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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
    border-radius: 0.5rem;
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
    padding: 0.5rem 0.75rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.625rem;
    color: #991b1b;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .live-status-indicator {
    padding: 0.5rem 0.875rem;
    font-style: italic;
    color: var(--b-text-muted);
    font-size: 0.875rem;
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
    min-width: 0;
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--b-border);
    border-radius: 0.625rem;
    font-family: inherit;
    font-size: 0.9375rem;
    background: var(--b-bg);
    color: var(--b-text);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .text-input:focus {
    border-color: var(--b-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  #send-btn {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
    min-width: max-content !important;
    padding: 0.5rem 1rem !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.375rem !important;
    font-weight: 600 !important;
    border-radius: 0.625rem !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08) !important;
    transition: all 0.15s ease !important;
    box-sizing: border-box !important;
    line-height: 1.2 !important;
  }
  #send-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12) !important;
  }
  #send-btn:active {
    transform: translateY(0);
  }

  :host([dir="rtl"]) #send-btn svg {
    transform: scaleX(-1);
  }

  .mic-btn.recording {
    background: #dc2626 !important;
    color: #ffffff !important;
    border-color: #b91c1c !important;
    animation: pulse-recording 1.5s infinite;
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
    border-radius: 0.5rem;
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

  /* Settings Modal Dialog (Redesigned & Responsive) */
  .settings-dialog {
    position: absolute;
    inset: 0;
    background: var(--b-bg);
    color: var(--b-text);
    z-index: 30;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
    scrollbar-width: thin;
    animation: fadeIn 0.15s ease-out;
  }

  .settings-dialog[hidden] {
    display: none !important;
  }

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    padding-bottom: 0.625rem;
    border-bottom: 1px solid var(--b-border);
    flex-shrink: 0;
  }

  .settings-title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .settings-heading {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--b-text);
  }

  /* Settings Segmented Tab Bar */
  .settings-tabs {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    background: var(--b-surface-alt);
    padding: 0.25rem;
    border-radius: 0.625rem;
    border: 1px solid var(--b-border);
    flex-shrink: 0;
  }

  .settings-tab-btn {
    flex: 1;
    font-size: 0.8125rem !important;
    min-height: 2.25rem !important;
    padding: 0.375rem 0.5rem !important;
    border-radius: 0.4375rem !important;
    border: none !important;
    font-weight: 600 !important;
    background: transparent !important;
    color: var(--b-text-muted) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.375rem !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }

  .settings-tab-btn:hover {
    color: var(--b-text) !important;
  }

  .settings-tab-btn[aria-selected="true"],
  .settings-tab-btn.btn-primary {
    background: var(--b-surface) !important;
    color: var(--b-primary) !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06) !important;
  }

  /* Settings Cards & Form Controls */
  .settings-card {
    background: var(--b-surface);
    border: 1px solid var(--b-border);
    border-radius: 0.75rem;
    padding: 0.875rem 1rem;
    margin-bottom: 0.75rem;
  }

  .settings-card-title {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--b-text);
  }

  .settings-card-desc {
    font-size: 0.8125rem;
    color: var(--b-text-muted);
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  .size-btn-group {
    display: flex;
    gap: 0.375rem;
    background: var(--b-surface-alt);
    padding: 0.25rem;
    border-radius: 0.5rem;
    border: 1px solid var(--b-border);
  }

  .size-btn-group button {
    flex: 1;
    min-height: 2.25rem;
    font-size: 0.875rem;
    border: none;
    background: transparent;
    border-radius: 0.375rem;
    color: var(--b-text);
    font-weight: 600;
    transition: all 0.15s ease;
  }

  .size-btn-group button[aria-pressed="true"] {
    background: var(--b-primary) !important;
    color: var(--b-primary-contrast) !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.375rem 0;
    cursor: pointer;
  }

  .toggle-info {
    flex: 1;
  }

  .toggle-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--b-text);
    display: block;
  }

  .toggle-desc {
    font-size: 0.75rem;
    color: var(--b-text-muted);
    line-height: 1.35;
    margin-top: 0.125rem;
    display: block;
  }

  .toggle-switch {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--b-primary);
    cursor: pointer;
    flex-shrink: 0;
  }

  .checkbox-card {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    padding: 0.625rem 0.75rem;
    background: var(--b-surface-alt);
    border: 1px solid var(--b-border);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .checkbox-card:hover {
    background: var(--b-surface);
    border-color: var(--b-primary);
  }

  .checkbox-card input[type="checkbox"] {
    width: 1.125rem;
    height: 1.125rem;
    margin-top: 0.125rem;
    accent-color: var(--b-primary);
    flex-shrink: 0;
  }

  .checkbox-card-content {
    flex: 1;
    font-size: 0.875rem;
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
`;class L extends HTMLElement{constructor(){super(...arguments);d(this,"isOpen",!1);d(this,"currentLang","en");d(this,"textSize","normal");d(this,"highContrast",!1);d(this,"simpleMode",!1);d(this,"isOffline",!navigator.onLine);d(this,"isThinking",!1);d(this,"isRecording",!1);d(this,"speechRecognition",null);d(this,"mediaRecorder",null);d(this,"audioChunks",[]);d(this,"activeAudio",null);d(this,"messages",[]);d(this,"sessionId",`sess_${Date.now()}_${Math.random().toString(36).substring(2,8)}`);d(this,"telegramToken",null);d(this,"telegramDeepLink","https://t.me/savannah_assistant3_bot");d(this,"isTelegramLinked",!1);d(this,"telegramPollTimer",null);d(this,"isSettingsOpen",!1);d(this,"activeHandoff",null);d(this,"supportNeeds",{needs:["written_instructions"],other_text:"",preferred_contact_mode:"text"});d(this,"activeTab","chat");d(this,"accessibilityPrefs",{language:"en",voice_enabled:!1,auto_welcome:!0,auto_tts:!1,speech_rate:1,voice_input_enabled:!0,screen_reader_mode:!1,keyboard_navigation:!1,high_contrast:!1,large_text:"normal",simple_mode:!1,sync_enabled:!0,onboarded:!1});d(this,"onboardingDismissed",!1);d(this,"isReadingPage",!1);d(this,"isReadingPaused",!1);d(this,"showAutoplayBanner",!1);d(this,"hasSpokenWelcomeThisSession",!1);d(this,"popstateListener",null);d(this,"previousFocus",null)}get apiBase(){return(this.getAttribute("api")||this.getAttribute("data-api")||this.getAttribute("api-base")||"http://localhost:8000").replace(/\/$/,"")}get courseId(){return this.getAttribute("content")||this.getAttribute("data-course")||this.getAttribute("course-id")||"course_demo"}static get observedAttributes(){return["lang","data-lang","api","data-api","api-base","content","data-course","course-id"]}attributeChangedCallback(e,a,t){a!==t&&(e==="lang"||e==="data-lang")&&t in u&&this.setLanguage(t)}connectedCallback(){if(this.shadowRoot)return;this.restoreState();const e=this.getAttribute("lang")||this.getAttribute("data-lang"),a=localStorage.getItem("savanna_bridge_preferred_lang"),t=sessionStorage.getItem("savanna_bridge_lang"),i=document.documentElement.lang?.slice(0,2);e&&e in u?this.currentLang=e:this.accessibilityPrefs.language&&this.accessibilityPrefs.language in u?this.currentLang=this.accessibilityPrefs.language:a&&a in u?this.currentLang=a:t&&t in u?this.currentLang=t:i&&i in u?this.currentLang=i:this.currentLang="en",this.accessibilityPrefs.keyboard_navigation&&this.classList.add("keyboard-focus-enhanced"),this.accessibilityPrefs.screen_reader_mode&&this.classList.add("screen-reader-mode"),this.attachShadow({mode:"open"}),this.render(),this.setupNetworkMonitor(),this.popstateListener=()=>{this.isReadingPage&&this.stopPageReading()},window.addEventListener("popstate",this.popstateListener),this.fetchTelegramStartLink(),this.fetchSupportNeeds(),this.accessibilityPrefs.sync_enabled&&this.syncPreferencesFromBackend(),this.accessibilityPrefs.voice_enabled&&this.accessibilityPrefs.auto_welcome&&!this.hasSpokenWelcomeThisSession&&setTimeout(()=>this.triggerSpokenWelcome(),500)}disconnectedCallback(){this.telegramPollTimer&&(window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null),this.popstateListener&&(window.removeEventListener("popstate",this.popstateListener),this.popstateListener=null),this.isReadingPage&&this.stopPageReading()}t(e){return(u[this.currentLang]||u.en)[e]||u.en[e]||e}announce(e){const a=this.shadowRoot?.querySelector("#live-announcer");a&&(a.textContent="",setTimeout(()=>{a.textContent=e},50))}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,this.accessibilityPrefs.language=e,this.savePreferences(),this.setAttribute("lang",e),this.setAttribute("dir",e==="ar"?"rtl":"ltr"),this.messages=[],sessionStorage.removeItem("savanna_bridge_chat_history"),this.render(),this.announce(this.t("appTitle")),this.accessibilityPrefs.voice_enabled&&this.speakText(this.t("voiceWelcomeAnnouncement")))}clearChat(){this.messages=[],sessionStorage.removeItem("savanna_bridge_chat_history"),this.renderMessages(),this.announce(this.t("emptyWelcome"))}async generateLinkCode(){try{const e=await fetch(`${this.apiBase}/api/v1/link/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"web",learner_reference:`learner_${this.sessionId}`})});if(e.ok){const a=await e.json(),t=this.shadowRoot?.querySelector("#code-display");t&&(t.textContent=a.code||a.token,t.style.display="block",this.announce(`${this.t("yourCodeIs")} ${a.code||a.token}`))}}catch(e){console.warn("Failed to generate link code",e)}}setupNetworkMonitor(){window.addEventListener("online",()=>{this.isOffline=!1,this.render(),this.flushOfflineQueue()}),window.addEventListener("offline",()=>{this.isOffline=!0,this.render()})}async flushOfflineQueue(){try{const e=localStorage.getItem("db_assistant_offline_queue");if(!e)return;const a=JSON.parse(e);localStorage.removeItem("db_assistant_offline_queue");for(const t of a)t&&t.question&&await this.askQuestion(t.question)}catch(e){console.warn("Could not flush offline queue",e)}}restoreState(){try{const e=sessionStorage.getItem("savanna_bridge_chat_history");e&&(this.messages=JSON.parse(e));const a=localStorage.getItem("savanna_voice_prefs");if(a)try{const c=JSON.parse(a);this.accessibilityPrefs={...this.accessibilityPrefs,...c}}catch{}const t=localStorage.getItem("savanna_bridge_preferred_lang");t&&t in u&&(this.currentLang=t,this.accessibilityPrefs.language=t);const i=localStorage.getItem("savanna_bridge_contrast");i&&(this.highContrast=i==="high",this.accessibilityPrefs.high_contrast=this.highContrast);const s=localStorage.getItem("savanna_bridge_text_size");s&&(this.textSize=s,this.accessibilityPrefs.large_text=s);const o=localStorage.getItem("savanna_bridge_simple_mode");o&&(this.simpleMode=o==="true",this.accessibilityPrefs.simple_mode=this.simpleMode)}catch{}}savePreferences(){try{this.accessibilityPrefs.language=this.currentLang,this.accessibilityPrefs.high_contrast=this.highContrast,this.accessibilityPrefs.large_text=this.textSize,this.accessibilityPrefs.simple_mode=this.simpleMode,localStorage.setItem("savanna_voice_prefs",JSON.stringify(this.accessibilityPrefs)),localStorage.setItem("savanna_bridge_preferred_lang",this.currentLang),localStorage.setItem("savanna_bridge_contrast",this.highContrast?"high":"normal"),localStorage.setItem("savanna_bridge_text_size",this.textSize),localStorage.setItem("savanna_bridge_simple_mode",this.simpleMode?"true":"false"),sessionStorage.setItem("savanna_bridge_lang",this.currentLang),this.accessibilityPrefs.sync_enabled&&this.syncPreferencesToBackend()}catch(e){console.warn("Could not save preferences to localStorage:",e)}}async syncPreferencesToBackend(){try{const e=this.getAttribute("learner-id")||`learner_${this.sessionId}`;await fetch(`${this.apiBase}/api/v1/accessibility-profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({learner_ref:e,language:this.currentLang,voice_enabled:this.accessibilityPrefs.voice_enabled,auto_welcome:this.accessibilityPrefs.auto_welcome,auto_tts:this.accessibilityPrefs.auto_tts,speech_rate:this.accessibilityPrefs.speech_rate,voice_input_enabled:this.accessibilityPrefs.voice_input_enabled,screen_reader_mode:this.accessibilityPrefs.screen_reader_mode,keyboard_navigation:this.accessibilityPrefs.keyboard_navigation,high_contrast:this.highContrast,large_text:this.textSize,simple_mode:this.simpleMode,sync_enabled:this.accessibilityPrefs.sync_enabled,onboarded:this.accessibilityPrefs.onboarded,needs:this.supportNeeds.needs,other_text:this.supportNeeds.other_text,preferred_contact_mode:this.supportNeeds.preferred_contact_mode})})}catch(e){console.warn("Could not sync accessibility profile to backend:",e)}}async syncPreferencesFromBackend(){try{const e=this.getAttribute("learner-id")||`learner_${this.sessionId}`,a=await fetch(`${this.apiBase}/api/v1/accessibility-profile?learner_ref=${encodeURIComponent(e)}`);if(a.ok){const t=await a.json();t&&t.updated_at&&(this.accessibilityPrefs.voice_enabled=!!t.voice_enabled,this.accessibilityPrefs.auto_welcome=!!t.auto_welcome,this.accessibilityPrefs.auto_tts=!!t.auto_tts,typeof t.speech_rate=="number"&&(this.accessibilityPrefs.speech_rate=t.speech_rate),t.language&&t.language in u&&(this.currentLang=t.language,this.accessibilityPrefs.language=t.language),t.large_text&&(this.textSize=t.large_text),typeof t.high_contrast=="boolean"&&(this.highContrast=t.high_contrast),typeof t.simple_mode=="boolean"&&(this.simpleMode=t.simple_mode),typeof t.onboarded=="boolean"&&(this.accessibilityPrefs.onboarded=t.onboarded),this.savePreferences(),this.render())}}catch(e){console.warn("Could not fetch accessibility profile from backend:",e)}}getBestVoice(e){if(!("speechSynthesis"in window))return null;const a=window.speechSynthesis.getVoices();if(!a||a.length===0)return null;const i={en:"en-US",am:"am-ET",om:"om-ET",ti:"ti-ET",ar:"ar-SA"}[e].toLowerCase(),s=e.toLowerCase();let o=a.find(b=>b.lang.toLowerCase()===i);if(o||(o=a.find(b=>b.lang.toLowerCase().startsWith(s)),o))return o;const g={en:"english",am:"amharic",om:"oromo",ti:"tigrinya",ar:"arabic"}[e];return o=a.find(b=>b.name.toLowerCase().includes(g)),o||null}speakText(e,a){if(!("speechSynthesis"in window))return a?.onError&&a.onError(),!1;try{window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e),i={en:"en-US",am:"am-ET",om:"om-ET",ti:"ti-ET",ar:"ar-SA"};t.lang=i[this.currentLang]||"en-US",t.rate=a?.rate||this.accessibilityPrefs.speech_rate||1;const s=this.getBestVoice(this.currentLang);return s&&(t.voice=s),t.onstart=()=>{a?.onStart&&a.onStart()},t.onend=()=>{a?.onEnd&&a.onEnd()},t.onerror=o=>{console.warn("Speech synthesis error or autoplay blocked:",o),a?.onError&&a.onError(o)},window.speechSynthesis.speak(t),!0}catch(t){return console.warn("Could not initiate speech synthesis:",t),a?.onError&&a.onError(t),!1}}triggerSpokenWelcome(){if(this.hasSpokenWelcomeThisSession)return;this.hasSpokenWelcomeThisSession=!0;const e=this.t("voiceWelcomeAnnouncement");this.speakText(e,{onError:()=>{this.showAutoplayBanner=!0,this.render(),this.announce(this.t("oneTapVoiceActivation"))}})||(this.showAutoplayBanner=!0,this.render(),this.announce(this.t("oneTapVoiceActivation")))}readPageAloud(){const e=this.extractPlatformContext();if(!e.page_content&&!e.page_title){this.announce("No readable content found on this page.");return}this.isReadingPage=!0,this.isReadingPaused=!1,this.render();const a=e.page_title?`${e.page_title}. `:"",t=e.section?`${e.section}. `:"",i=`${a}${t}${e.page_content}`.slice(0,1e4);this.announce(this.t("readingPageAnnouncement")),this.speakText(i,{onEnd:()=>{this.isReadingPage=!1,this.isReadingPaused=!1,this.render()},onError:()=>{this.isReadingPage=!1,this.isReadingPaused=!1,this.render()}})}readSectionAloud(){const e=this.extractPlatformContext(),a=e.section||e.page_title;if(!a){this.announce("No active section found.");return}this.isReadingPage=!0,this.isReadingPaused=!1,this.render(),this.announce(this.t("readingSectionAnnouncement")),this.speakText(`${a}. ${e.page_content.slice(0,2e3)}`,{onEnd:()=>{this.isReadingPage=!1,this.isReadingPaused=!1,this.render()},onError:()=>{this.isReadingPage=!1,this.isReadingPaused=!1,this.render()}})}pausePageReading(){"speechSynthesis"in window&&(window.speechSynthesis.pause(),this.isReadingPaused=!0,this.render(),this.announce(this.t("pauseReading")))}resumePageReading(){"speechSynthesis"in window&&(window.speechSynthesis.resume(),this.isReadingPaused=!1,this.render(),this.announce(this.t("resumeReading")))}stopPageReading(){"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.isReadingPage=!1,this.isReadingPaused=!1,this.render(),this.announce(this.t("stopReading"))}saveChatState(){try{sessionStorage.setItem("savanna_bridge_chat_history",JSON.stringify(this.messages.slice(-25)))}catch{}}async fetchTelegramStartLink(){try{const e=await fetch(`${this.apiBase}/api/v1/link/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"web",learner_reference:`learner_${this.sessionId}`})});if(e.ok){const a=await e.json();this.telegramToken=a.token,this.telegramDeepLink=a.deep_link,this.updateTelegramLinkUI()}}catch(e){console.warn("Could not fetch telegram link start:",e)}}onTelegramLinkClicked(){if(this.isTelegramLinked||!this.telegramToken)return;this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer);let e=0;const a=300;this.telegramPollTimer=window.setInterval(async()=>{if(e++,e>a){this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null;return}try{const t=await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken)}`);t.ok&&(await t.json()).linked&&(this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null,this.isTelegramLinked=!0,this.announce(this.t("telegramConnected")),this.updateTelegramLinkUI())}catch(t){console.warn("Telegram status polling error:",t)}},2e3)}async disconnectTelegram(){try{await fetch(`${this.apiBase}/api/v1/link/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"telegram"})})}catch{}this.isTelegramLinked=!1,await this.fetchTelegramStartLink(),this.updateTelegramLinkUI()}updateTelegramLinkUI(){const e=this.shadowRoot?.querySelector("#telegram-container");e&&(this.isTelegramLinked?(e.innerHTML=`
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1; display:inline-flex; align-items:center; gap:0.375rem;">
            ${n.check} <span>${this.t("connectedToTelegram")}</span>
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg" style="font-size:0.75rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
            ${this.t("disconnectTelegram")}
          </button>
        </div>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `,e.querySelector("#btn-disconnect-tg")?.addEventListener("click",()=>this.disconnectTelegram())):(e.innerHTML=`
        <a href="${this.telegramDeepLink}" target="_blank" rel="noopener noreferrer" 
           class="btn btn-secondary btn-footer" id="tg-deep-link" 
           aria-label="${this.t("continueOnTelegramAria")}"
           style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
          ${n.telegram}
          <span>${this.t("continueOnTelegram")}</span>
        </a>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `,e.querySelector("#tg-deep-link")?.addEventListener("click",()=>this.onTelegramLinkClicked())))}async fetchSupportNeeds(){try{const e=await fetch(`${this.apiBase}/api/v1/support-needs`);if(e.ok){const a=await e.json();this.supportNeeds={needs:a.needs||[],other_text:a.other_text||"",preferred_contact_mode:a.preferred_contact_mode||"text"}}}catch{}}async saveSupportNeeds(e,a,t){this.supportNeeds={needs:e,other_text:a,preferred_contact_mode:t};try{const i=await fetch(`${this.apiBase}/api/v1/support-needs`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.supportNeeds)}),s=this.shadowRoot?.querySelector("#support-saved-notice");s&&(s.removeAttribute("hidden"),setTimeout(()=>s.setAttribute("hidden","true"),3500)),i.ok||console.warn("PUT /support-needs failed",i.status)}catch(i){console.warn("Save support needs error:",i)}}async toggleVoiceInput(e){this.isRecording?this.stopVoiceRecording():await this.startVoiceRecording(e)}async startVoiceRecording(e){const a=window.SpeechRecognition||window.webkitSpeechRecognition;if(a)try{if(this.speechRecognition)try{this.speechRecognition.abort()}catch{}const t=new a;this.speechRecognition=t,t.continuous=!1,t.interimResults=!0;const i={en:"en-US",am:"am-ET",om:"om-ET",ti:"ti-ET",ar:"ar-SA"};t.lang=i[this.currentLang]||"en-US";let s="";t.onstart=()=>{this.isRecording=!0,this.updateMicButtonUI(),this.announce(this.t("recordingState"))},t.onresult=o=>{let c="";for(let b=o.resultIndex;b<o.results.length;++b)o.results[b].isFinal?s+=o.results[b][0].transcript:c+=o.results[b][0].transcript;const g=(s||c).trim();g&&(e.value=g)},t.onerror=async o=>{console.warn("Speech recognition error:",o.error),this.isRecording=!1,this.updateMicButtonUI(),o.error!=="no-speech"&&o.error!=="aborted"&&await this.startMediaRecorderFallback(e)},t.onend=()=>{this.isRecording=!1,this.updateMicButtonUI(),e.value&&(this.announce(this.t("voicePreviewNotice")),e.focus())},t.start();return}catch(t){console.warn("SpeechRecognition start failed, falling back to MediaRecorder:",t)}await this.startMediaRecorderFallback(e)}async startMediaRecorderFallback(e){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){alert(this.t("micError"));return}try{const a=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioChunks=[];const t=MediaRecorder.isTypeSupported("audio/webm")?"audio/webm":MediaRecorder.isTypeSupported("audio/ogg")?"audio/ogg":"audio/wav";this.mediaRecorder=new MediaRecorder(a),this.mediaRecorder.ondataavailable=i=>{i.data.size>0&&this.audioChunks.push(i.data)},this.mediaRecorder.onstop=async()=>{a.getTracks().forEach(s=>s.stop());const i=new Blob(this.audioChunks,{type:t});await this.sendAudioForTranscription(i,t,e)},this.mediaRecorder.start(),this.isRecording=!0,this.updateMicButtonUI(),this.announce(this.t("recordingState"))}catch{alert(this.t("micError"))}}stopVoiceRecording(){if(this.speechRecognition){try{this.speechRecognition.stop()}catch{}this.speechRecognition=null}this.mediaRecorder&&this.mediaRecorder.state!=="inactive"&&this.mediaRecorder.stop(),this.isRecording=!1,this.updateMicButtonUI()}updateMicButtonUI(){const e=this.shadowRoot?.querySelector("#mic-btn");e&&(this.isRecording?(e.classList.add("recording"),e.setAttribute("aria-pressed","true"),e.setAttribute("title",this.t("recordingState"))):(e.classList.remove("recording"),e.setAttribute("aria-pressed","false"),e.setAttribute("title",this.t("micLabel"))))}async sendAudioForTranscription(e,a,t){this.announce(this.t("transcribingState"));try{const i=new FileReader,s=new Promise((g,b)=>{i.onloadend=()=>{const y=i.result;g(y.split(",")[1]||"")},i.onerror=b});i.readAsDataURL(e);const o=await s,c=await fetch(`${this.apiBase}/api/v1/speech/transcribe`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audio_base64:o,media_type:a,language:this.currentLang,retain:!1})});if(c.ok){const g=await c.json();g.transcript&&(t.value=(t.value?t.value+" ":"")+g.transcript,t.focus(),this.announce(this.t("voicePreviewNotice")))}}catch{}}async handleListen(e){if(this.activeAudio&&!this.activeAudio.paused&&e.isAudioPlaying){this.activeAudio.pause(),e.isAudioPlaying=!1,this.renderMessages(),this.announce(this.t("pauseButton"));return}try{const a=await fetch(`${this.apiBase}/api/v1/speech/synthesize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e.text,language:this.currentLang,speed:1})});if(a.ok){const t=await a.json();this.activeAudio&&this.activeAudio.pause();const i=t.audio_url?.startsWith("http")?t.audio_url:`${this.apiBase}${t.audio_url||""}`;this.activeAudio=new Audio(i),this.activeAudio.onended=()=>{e.isAudioPlaying=!1,this.renderMessages()},this.activeAudio.play().catch(()=>this.fallbackTTS(e.text,e)),e.isAudioPlaying=!0,this.renderMessages(),this.announce(this.t("listenButton"))}else this.fallbackTTS(e.text,e)}catch{this.fallbackTTS(e.text,e)}}fallbackTTS(e,a){if("speechSynthesis"in window){window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e),i={en:"en-US",am:"am-ET",om:"om-ET",ti:"ti-ET",ar:"ar-SA"};t.lang=i[this.currentLang]||"en-US",t.onstart=()=>{a&&(a.isAudioPlaying=!0,this.renderMessages()),this.announce(this.t("listenButton"))},t.onend=()=>{a&&(a.isAudioPlaying=!1,this.renderMessages())},t.onerror=()=>{a&&(a.isAudioPlaying=!1,this.renderMessages())},window.speechSynthesis.speak(t)}}extractPlatformContext(){const e=typeof window<"u"?window.location.href:"",a=typeof document<"u"&&document.title||"Savanna Platform";let t="Current Lesson";if(typeof document<"u"){const s=document.querySelector("h1, h2, [aria-current='page'], .active-lesson, .module-title");s&&s.textContent&&(t=s.textContent.trim())}let i="";if(typeof document<"u"){const s=document.querySelector("main")||document.querySelector("article")||document.querySelector(".content")||document.body;if(s)try{const o=s.cloneNode(!0);o.querySelectorAll("script, style, db-assistant, bridge-assistant, noscript, nav, footer, header").forEach(c=>c.remove()),i=(o.textContent||"").replace(/\s+/g," ").trim().slice(0,15e3)}catch{i=""}}return{page_url:e,page_title:a,page_content:i,section:t}}async askQuestion(e,a=!1){const t=e.trim();if(!t||this.isThinking)return;this.dispatchEvent(new CustomEvent("db-assistant:question",{bubbles:!0,composed:!0,detail:{text:t,language:this.currentLang}}));const i={id:`msg_${Date.now()}_learner`,sender:"learner",text:t};this.messages.push(i),this.isThinking=!0,this.announce(this.t("lookingInCourse")),this.renderMessages();const s=this.extractPlatformContext();try{let o=await fetch(`${this.apiBase}/api/v1/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:t,language:this.currentLang,course_id:this.courseId,simple_mode:a||this.simpleMode,channel:"web",page_url:s.page_url,page_title:s.page_title,page_content:s.page_content,section:s.section})});if(!o.ok&&o.status===404&&(o=await fetch(`${this.apiBase}/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:t,language:this.currentLang,course_id:this.courseId,simple_mode:a||this.simpleMode,channel:"web",page_url:s.page_url,page_title:s.page_title,page_content:s.page_content,section:s.section})})),this.isThinking=!1,o.ok){const c=await o.json(),g=!!c.offer_human||c.reason==="low_confidence",b={id:`msg_${Date.now()}_assistant`,sender:"assistant",text:c.answer,heading:this.t("answerHeading"),citations:c.citations||[],offerHuman:c.offer_human,isRefusal:g,originalQuestion:t};this.messages.push(b),this.saveChatState(),this.accessibilityPrefs.voice_enabled&&this.accessibilityPrefs.auto_tts&&b.text&&this.speakText(b.text)}else this.messages.push({id:`msg_${Date.now()}_err`,sender:"assistant",text:this.t("serverErrorNotice"),offerHuman:!0})}catch{this.isThinking=!1;try{const o=JSON.parse(localStorage.getItem("db_assistant_offline_queue")||"[]");o.push({question:t,language:this.currentLang,timestamp:Date.now()}),localStorage.setItem("db_assistant_offline_queue",JSON.stringify(o))}catch{}this.messages.push({id:`msg_${Date.now()}_offline`,sender:"assistant",text:this.t("savedOnPhoneNotice"),offerHuman:!0})}this.renderMessages()}async requestHandoff(e){if(this.isOffline){alert(this.t("offlineBanner"));return}this.announce(this.t("lookingInCourse"));try{const a=await fetch(`${this.apiBase}/api/v1/escalations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consent:!0,learner_ref:`learner_${this.sessionId}`,card:{language:this.currentLang,context:e||"Learner requested a human mentor from web assistant.",support_needs:this.supportNeeds.needs,contact_mode:this.supportNeeds.preferred_contact_mode},channel:"web"})});if(a.ok){const t=await a.json(),i=t.ticketId||t.id||"ticket_01",s=t.room_url||t.roomUrl||"https://meet.jit.si/savanna-bridge-demo";this.activeHandoff={id:i,room_url:s},this.dispatchEvent(new CustomEvent("db-assistant:escalated",{bubbles:!0,composed:!0,detail:{ticketId:i,roomUrl:s}})),this.messages.push({id:`msg_${Date.now()}_handoff`,sender:"assistant",text:this.t("handoffReadyTitle"),heading:this.t("handoffReadyTitle"),isHandoff:!1,offerHuman:!1});const o=this.shadowRoot?.querySelector("#handoff-room-box");o&&(o.innerHTML=`
            <div style="padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; margin-top:0.75rem;">
              <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                ${n.celebrate} <span>${this.t("handoffReadyTitle")}</span>
              </p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${s}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${n.video} <span>${this.t("joinRoomButton")}</span>
                </a>
                <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(s)}" style="font-size:0.8125rem; min-height:2.25rem; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${n.copy} <span>${this.t("copyRoomBtn")}</span>
                </button>
              </div>
            </div>
          `),this.renderMessages()}else alert(this.t("serverErrorNotice"))}catch{alert(this.t("serverErrorNotice"))}}updateSizeButtons(){this.shadowRoot&&(this.shadowRoot.querySelectorAll(".size-btn-group button").forEach(e=>{e.setAttribute("aria-pressed","false")}),this.textSize==="smaller"?this.shadowRoot.querySelector("#btn-size-smaller")?.setAttribute("aria-pressed","true"):this.textSize==="larger"?this.shadowRoot.querySelector("#btn-size-larger")?.setAttribute("aria-pressed","true"):this.shadowRoot.querySelector("#btn-size-normal")?.setAttribute("aria-pressed","true"))}render(){this.shadowRoot&&(this.setAttribute("data-contrast",this.highContrast?"high":"normal"),this.setAttribute("data-size",this.textSize),this.setAttribute("dir",this.currentLang==="ar"?"rtl":"ltr"),this.setAttribute("lang",this.currentLang),this.accessibilityPrefs?.keyboard_navigation?this.classList.add("keyboard-focus-enhanced"):this.classList.remove("keyboard-focus-enhanced"),this.shadowRoot.innerHTML=`
      <style>${N}</style>

      <!-- Live Announcer for Screen Readers (TalkBack / NVDA) -->
      <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true" style="position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); border:0;"></div>

      <!-- Floating Launcher Button -->
      <button class="launcher" type="button" id="launcher-btn" 
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog"
              aria-label="${this.t("launcherLabel")}">
        ${n.launcher}
        <span>${this.t("launcherLabel")}</span>
      </button>

      <!-- Floating Autoplay Audio Permission Banner if closed -->
      ${!this.isOpen&&this.showAutoplayBanner?`
        <div class="voice-activation-banner" role="alert" style="position:fixed; bottom:5.5rem; right:1.5rem; max-width:320px; z-index:99999; box-shadow:0 8px 24px rgba(0,0,0,0.18);">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            ${n.sound}
            <span>${this.t("voiceActivationPrompt")}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.375rem; margin-top:0.375rem;">
            <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome-floating" style="padding:0.25rem 0.625rem; font-size:0.75rem; min-height:1.75rem;">
              ${this.t("voiceActivationBtn")}
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner-floating" style="min-height:1.75rem; width:1.75rem; padding:0;" aria-label="Dismiss">
              ${n.close}
            </button>
          </div>
        </div>
      `:""}

      <!-- Main Open Panel -->
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1" ${this.isOpen?"":"hidden"}>
        
        ${this.isOffline?`<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>`:""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles">
            <h2 id="dialog-title" class="title"><span id="bridge-title">${this.t("appTitle")}</span></h2>
            <span class="status-badge" aria-label="Online status">
              <span class="status-dot"></span>
              <span>Active</span>
            </span>
          </div>
          <div class="header-actions">
            <!-- Quick EN/AM Toggle for backward compatibility with integration tests -->
            <button class="lang-btn" type="button" id="btn-lang-toggle" 
                    aria-label="${this.currentLang==="am"?"English - Switch Language":"አማርኛ - ቋንቋ ቀይር"}" 
                    style="font-size:0.6875rem; font-weight:700; padding:0.25rem 0.5rem; min-height:1.75rem; border-radius:0.375rem; background:var(--b-surface-alt); border:1px solid var(--b-border); color:var(--b-text); cursor:pointer;">
              ${this.currentLang==="am"?"English":"አማርኛ"}
            </button>
            <!-- 5-Language Segmented Selector in Native Scripts with WCAG 2.5.3 Compliant Labels -->
            <div class="lang-group" role="group" aria-label="Language selection">
              <button type="button" class="lang-toggle-btn" id="btn-lang-en" 
                      aria-pressed="${this.currentLang==="en"}" 
                      aria-label="EN - English">EN</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-am" 
                      aria-pressed="${this.currentLang==="am"}" 
                      aria-label="አማ - አማርኛ (Amharic)">አማ</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-om" 
                      aria-pressed="${this.currentLang==="om"}" 
                      aria-label="OM - Afaan Oromoo">OM</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ti" 
                      aria-pressed="${this.currentLang==="ti"}" 
                      aria-label="ትግ - ትግርኛ (Tigrinya)">ትግ</button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ar" 
                      aria-pressed="${this.currentLang==="ar"}" 
                      aria-label="عربي - العربية (Arabic)">عربي</button>
            </div>
            <!-- Settings Button -->
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}">
              ${n.settings}
            </button>
            <!-- Close Button -->
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" title="${this.t("closeLabel")}">
              ${n.close}
            </button>
          </div>
        </header>

        <!-- Navigation Tabs on Main Assistant Dialog -->
        <nav class="nav-tabs" role="tablist" aria-label="Assistant sections">
          <button type="button" class="tab-btn" id="tab-chat" role="tab" aria-selected="${this.activeTab==="chat"}" aria-controls="pane-chat">
            ${n.launcher}
            <span>${this.t("chatTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-support" role="tab" aria-selected="${this.activeTab==="support"}" aria-controls="pane-support">
            ${n.heart}
            <span>${this.t("supportTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-link" role="tab" aria-selected="${this.activeTab==="link"}" aria-controls="pane-link">
            ${n.link}
            <span>${this.t("linkTab")}</span>
          </button>
          <button type="button" class="tab-btn" id="tab-handoff" role="tab" aria-selected="${this.activeTab==="handoff"}" aria-controls="pane-handoff">
            ${n.headphones}
            <span>${this.t("handoffTab")}</span>
          </button>
        </nav>

        <!-- Pane 1: Chat Message Stream & Footer -->
        <div id="pane-chat" class="tab-panel" role="tabpanel" ${this.activeTab==="chat"?"":"hidden"} style="${this.activeTab==="chat"?"display:flex; flex-direction:column; flex:1; overflow:hidden;":"display:none;"}">
          ${this.showAutoplayBanner?`
            <div class="voice-activation-banner" role="alert" style="margin:0.5rem 1rem; padding:0.625rem 0.875rem; background:#eff6ff; border:1px solid #bfdbfe; border-radius:0.5rem; display:flex; align-items:center; justify-content:space-between; gap:0.5rem; font-size:0.8125rem; color:#1e40af;">
              <div style="display:flex; align-items:center; gap:0.5rem;">
                ${n.sound}
                <span>${this.t("voiceActivationPrompt")}</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.375rem;">
                <button type="button" class="btn btn-primary" id="btn-activate-voice-welcome" style="padding:0.25rem 0.625rem; font-size:0.75rem; min-height:1.75rem;">
                  ${this.t("voiceActivationBtn")}
                </button>
                <button type="button" class="btn btn-secondary btn-icon-only" id="btn-dismiss-voice-banner" style="min-height:1.75rem; width:1.75rem; padding:0;" aria-label="Dismiss">
                  ${n.close}
                </button>
              </div>
            </div>
          `:""}

          ${this.isReadingPage?`
            <div class="reading-controls-bar" role="region" aria-label="${this.t("readingActive")}">
              <div class="reading-indicator">
                <span class="reading-pulse"></span>
                <span style="font-weight:600; font-size:0.8125rem; color:#065f46;">
                  ${this.isReadingPaused?this.t("readingPaused"):this.t("readingActive")}
                </span>
              </div>
              <div class="reading-btns">
                ${this.isReadingPaused?`<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-resume" aria-label="${this.t("resumeReading")}" title="${this.t("resumeReading")}">${n.play}</button>`:`<button type="button" class="btn btn-secondary btn-icon-only" id="btn-reading-pause" aria-label="${this.t("pauseReading")}" title="${this.t("pauseReading")}">${n.pause}</button>`}
                <button type="button" class="btn btn-danger btn-icon-only" id="btn-reading-stop" aria-label="${this.t("stopReading")}" title="${this.t("stopReading")}" style="background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;">
                  ${n.stop}
                </button>
              </div>
            </div>
          `:""}

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
                     required autocomplete="off">
              <button type="button" class="btn btn-secondary mic-btn btn-icon-only" id="mic-btn" 
                      aria-label="${this.t("micLabel")}" title="${this.t("micLabel")}">
                ${n.mic}
              </button>
              <button type="submit" class="btn btn-primary" id="send-btn" data-id="btn-send" style="display:inline-flex; align-items:center; gap:0.375rem;">
                <span>${this.t("sendButton")}</span>
                ${n.send}
              </button>
            </form>

            <!-- Bottom Row: Talk to a person & Continue on Telegram -->
            <div class="footer-actions-row">
              <button type="button" class="btn btn-secondary btn-footer btn-talk-person" id="btn-footer-handoff" style="display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${n.user}
                <span>${this.t("talkToPersonButton")}</span>
              </button>
              <div id="telegram-container" class="telegram-section">
                <!-- Rendered by updateTelegramLinkUI() -->
              </div>
            </div>
          </footer>
        </div>

        <!-- Pane 2: Support Preferences (Zero Proof Required) -->
        <div id="pane-support" class="tab-panel" role="tabpanel" ${this.activeTab==="support"?"":"hidden"} style="${this.activeTab==="support"?"display:block; overflow-y:auto; padding:1rem;":"display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${n.heart} <span>${this.t("supportNeedsTitle")}</span></div>
            <div class="settings-card-desc">
              ${this.t("supportZeroProof")}
            </div>

            <form id="support-form" style="display:flex; flex-direction:column; gap:0.625rem;">
              <label class="checkbox-card">
                <input type="checkbox" name="need" value="extra_time" 
                       ${this.supportNeeds.needs.includes("extra_time")?"checked":""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needExtraTime")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="screen_reader_help" 
                       ${this.supportNeeds.needs.includes("screen_reader_help")?"checked":""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needScreenReader")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="written_instructions" 
                       ${this.supportNeeds.needs.includes("written_instructions")?"checked":""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needWritten")}</span>
                </div>
              </label>

              <label class="checkbox-card">
                <input type="checkbox" name="need" value="other" 
                       ${this.supportNeeds.needs.includes("other")||this.supportNeeds.other_text?"checked":""}>
                <div class="checkbox-card-content">
                  <span style="font-weight:600; font-size:0.875rem;">${this.t("needOther")}</span>
                </div>
              </label>

              <textarea name="other_text" class="text-input" style="min-height:3.5rem; font-size:0.875rem;" 
                        placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text||""}</textarea>

              <label style="font-size:0.875rem; font-weight:600; margin-top:0.25rem;">
                ${this.t("contactModeLabel")}
                <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:2.625rem; font-size:0.875rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode==="text"?"selected":""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode==="voice"?"selected":""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode==="video"?"selected":""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode==="telegram"?"selected":""}>${this.t("modeTelegram")}</option>
                </select>
              </label>

              <div id="support-saved-notice" class="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600; display:inline-flex; align-items:center; gap:0.375rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; padding:0.5rem 0.75rem;">
                ${n.check} <span>${this.t("supportSavedNotice")}</span>
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top:0.25rem;">
                ${this.t("saveSupportBtn")}
              </button>
            </form>
          </div>
        </div>

        <!-- Pane 3: Barrier-Free Account Linking -->
        <div id="pane-link" class="tab-panel" role="tabpanel" ${this.activeTab==="link"?"":"hidden"} style="${this.activeTab==="link"?"display:block; overflow-y:auto; padding:1rem;":"display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${n.link} <span>${this.t("linkTab")}</span></div>
            <div class="settings-card-desc">
              ${this.t("supportZeroProof")}
            </div>
            <button type="button" class="btn btn-primary" id="btn-generate-code" style="width:100%; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
              ${n.key} <span>${this.t("generateCodeBtn")}</span>
            </button>
            <div class="code-display" id="code-display" style="display:none; font-size:1.75rem; font-weight:700; letter-spacing:0.25em; text-align:center; padding:1rem; background:var(--b-surface-alt); border:2px dashed var(--b-primary); border-radius:0.75rem; margin-top:0.875rem; color:var(--b-primary);">
            </div>
          </div>
        </div>

        <!-- Pane 4: Consented Live Help Handoff -->
        <div id="pane-handoff" class="tab-panel" role="tabpanel" ${this.activeTab==="handoff"?"":"hidden"} style="${this.activeTab==="handoff"?"display:block; overflow-y:auto; padding:1rem;":"display:none;"}">
          <div class="settings-card">
            <div class="settings-card-title">${n.headphones} <span>${this.t("handoffTab")}</span></div>
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
                ${n.users} <span>${this.t("requestMentorBtn")}</span>
              </button>
            </form>
            <div id="handoff-room-box" style="margin-top:0.5rem;"></div>
          </div>
        </div>

        <!-- Settings Modal Overlay (Region) -->
        <div id="settings-dialog" class="settings-dialog" ${this.isSettingsOpen?"":"hidden"} role="region" aria-labelledby="settings-dialog-title">
          <div class="settings-header">
            <div class="settings-title-group">
              ${n.settings}
              <h3 id="settings-dialog-title" class="settings-heading">${this.t("settingsTitle")}</h3>
            </div>
            <button type="button" class="btn btn-secondary btn-icon-only" id="btn-close-settings" aria-label="${this.t("closeSettings")}" title="${this.t("closeSettings")}">
              ${n.close}
            </button>
          </div>

          <!-- General Display & Voice Settings Pane -->
          <div id="pane-general" class="settings-pane" style="overflow-y:auto; flex:1; padding:0.5rem 0;">
            <!-- Text Size Card -->
            <div class="settings-card">
              <div class="settings-card-title">${n.type} <span>${this.t("textSizeLabel")}</span></div>
              <div class="size-btn-group">
                <button type="button" class="size-btn" id="btn-size-smaller" aria-pressed="${this.textSize==="smaller"}" aria-label="A- Smaller text">
                  A- <span>${this.t("textSmaller")}</span>
                </button>
                <button type="button" class="size-btn" id="btn-size-normal" aria-pressed="${this.textSize==="normal"}" aria-label="A Normal text">
                  A <span>${this.t("textNormal")}</span>
                </button>
                <button type="button" class="size-btn" id="btn-size-larger" aria-pressed="${this.textSize==="larger"}" aria-label="A+ Larger text">
                  A+ <span>${this.t("textLarger")}</span>
                </button>
              </div>
            </div>

            <!-- Accessibility Card -->
            <div class="settings-card">
              <div class="settings-card-title">${n.contrast} <span>Display & Accessibility</span></div>
              
              <!-- High Contrast -->
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("highContrastLabel")}</span>
                  <span class="toggle-desc">High contrast color theme for enhanced visibility</span>
                </div>
                <input type="checkbox" id="chk-contrast" class="toggle-switch" aria-label="${this.t("highContrastLabel")}" ${this.highContrast?"checked":""}>
              </label>

              <!-- Simple Mode -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("simpleModeLabel")}</span>
                  <span class="toggle-desc">${this.t("simpleModeDesc")}</span>
                </div>
                <input type="checkbox" id="chk-simple-mode" class="toggle-switch" aria-label="${this.t("simpleModeLabel")}" ${this.simpleMode?"checked":""}>
              </label>
            </div>

            <!-- Voice Accessibility & Screen Reader Suite -->
            <div class="settings-card">
              <div class="settings-card-title">${n.sound} <span>${this.t("voicePrefsTitle")}</span></div>

              <!-- Master Voice Toggle -->
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("voiceMasterLabel")}</span>
                  <span class="toggle-desc">${this.t("voiceMasterDesc")}</span>
                </div>
                <input type="checkbox" id="chk-voice-master" class="toggle-switch" aria-label="${this.t("voiceMasterLabel")}" ${this.accessibilityPrefs.voice_enabled?"checked":""}>
              </label>

              <!-- Spoken Welcome Announcement -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("autoWelcomeLabel")}</span>
                  <span class="toggle-desc">${this.t("autoWelcomeDesc")}</span>
                </div>
                <input type="checkbox" id="chk-auto-welcome" class="toggle-switch" aria-label="${this.t("autoWelcomeLabel")}" ${this.accessibilityPrefs.auto_welcome?"checked":""}>
              </label>

              <!-- Auto TTS for AI Responses -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("autoTtsLabel")}</span>
                  <span class="toggle-desc">${this.t("autoTtsDesc")}</span>
                </div>
                <input type="checkbox" id="chk-auto-tts" class="toggle-switch" aria-label="${this.t("autoTtsLabel")}" ${this.accessibilityPrefs.auto_tts?"checked":""}>
              </label>

              <!-- Speech Rate Selector -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="margin:0.25rem 0;">
                <label style="display:block; font-size:0.8125rem; font-weight:700; color:var(--b-text); margin-bottom:0.375rem;">
                  ${this.t("speechRateLabel")}
                </label>
                <div class="rate-btn-group" role="group" aria-label="${this.t("speechRateLabel")}">
                  <button type="button" class="rate-btn" id="btn-rate-075" aria-pressed="${this.accessibilityPrefs.speech_rate===.75}">0.75x</button>
                  <button type="button" class="rate-btn" id="btn-rate-100" aria-pressed="${this.accessibilityPrefs.speech_rate===1}">1.0x</button>
                  <button type="button" class="rate-btn" id="btn-rate-125" aria-pressed="${this.accessibilityPrefs.speech_rate===1.25}">1.25x</button>
                  <button type="button" class="rate-btn" id="btn-rate-150" aria-pressed="${this.accessibilityPrefs.speech_rate===1.5}">1.5x</button>
                </div>
              </div>

              <!-- Page Reading & Voice Test Buttons -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <div style="display:flex; flex-direction:column; gap:0.375rem; margin-top:0.25rem;">
                <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                  <button type="button" class="btn btn-secondary" id="btn-read-page" style="flex:1; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${n.sound} <span>${this.t("readPageBtn")}</span>
                  </button>
                  <button type="button" class="btn btn-secondary" id="btn-read-section" style="flex:1; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                    ${n.sound} <span>${this.t("readSectionBtn")}</span>
                  </button>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-test-voice" style="min-height:2rem; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                  ${n.play} <span>${this.t("testVoiceBtn")}</span>
                </button>
              </div>

              <!-- Screen Reader & Enhanced Keyboard Navigation -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("screenReaderLabel")}</span>
                  <span class="toggle-desc">${this.t("screenReaderDesc")}</span>
                </div>
                <input type="checkbox" id="chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderLabel")}" ${this.accessibilityPrefs.screen_reader_mode?"checked":""}>
              </label>

              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("keyboardNavLabel")}</span>
                  <span class="toggle-desc">${this.t("keyboardNavDesc")}</span>
                </div>
                <input type="checkbox" id="chk-keyboard-nav" class="toggle-switch" aria-label="${this.t("keyboardNavLabel")}" ${this.accessibilityPrefs.keyboard_navigation?"checked":""}>
              </label>

              <!-- Cross-Site Preference Synchronization -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <label class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">${this.t("crossSiteSyncLabel")}</span>
                  <span class="toggle-desc">${this.t("crossSiteSyncDesc")}</span>
                </div>
                <input type="checkbox" id="chk-sync-prefs" class="toggle-switch" aria-label="${this.t("crossSiteSyncLabel")}" ${this.accessibilityPrefs.sync_enabled?"checked":""}>
              </label>

              <!-- Replay Onboarding Wizard -->
              <div style="border-top:1px solid var(--b-border); margin:0.5rem 0;"></div>
              <button type="button" class="btn btn-secondary" id="btn-replay-onboarding" style="width:100%; min-height:2.25rem; font-size:0.8125rem; display:inline-flex; align-items:center; justify-content:center; gap:0.375rem;">
                ${n.sparkles} <span>${this.t("replayOnboardBtn")}</span>
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
                  ${n.trash} <span>${this.t("clearChatBtn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>
    `,this.renderMessages(),this.updateTelegramLinkUI(),this.bindEvents())}renderMessages(){const e=this.shadowRoot?.querySelector("#chat-log");if(!e)return;const t=!this.accessibilityPrefs.onboarded&&!this.onboardingDismissed?`
      <div class="onboarding-card" id="onboarding-card" role="region" aria-label="${this.t("onboardTitle")}" style="margin:0 0 1rem 0; padding:1rem; background:var(--b-surface); border:2px solid var(--b-primary); border-radius:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 id="onboard-title" style="margin:0; font-size:1rem; font-weight:700; color:var(--b-text); display:flex; align-items:center; gap:0.5rem;">
            ${n.sparkles} <span>${this.t("onboardTitle")}</span>
          </h3>
          <button type="button" class="btn btn-secondary btn-icon-only" id="btn-onboard-close" aria-label="${this.t("onboardSkipBtn")}" title="${this.t("onboardSkipBtn")}" style="min-height:2rem; width:2rem; padding:0;">
            ${n.close}
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
            <button type="button" class="lang-toggle-btn" id="onboard-lang-en" style="flex:1;" aria-pressed="${this.currentLang==="en"}" aria-label="EN - English">EN</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-am" style="flex:1;" aria-pressed="${this.currentLang==="am"}" aria-label="አማ - አማርኛ (Amharic)">አማ</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-om" style="flex:1;" aria-pressed="${this.currentLang==="om"}" aria-label="OM - Afaan Oromoo">OM</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-ti" style="flex:1;" aria-pressed="${this.currentLang==="ti"}" aria-label="ትግ - ትግርኛ (Tigrinya)">ትግ</button>
            <button type="button" class="lang-toggle-btn" id="onboard-lang-ar" style="flex:1;" aria-pressed="${this.currentLang==="ar"}" aria-label="عربي - العربية (Arabic)">عربي</button>
          </div>
        </div>

        <!-- Options -->
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:0.875rem;">
          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("onboardVoiceOpt")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardVoiceDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-voice" class="toggle-switch" aria-label="${this.t("onboardVoiceOpt")}" ${this.accessibilityPrefs.voice_enabled?"checked":""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("screenReaderLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardScreenReaderDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-screen-reader" class="toggle-switch" aria-label="${this.t("screenReaderLabel")}" ${this.accessibilityPrefs.screen_reader_mode?"checked":""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("keyboardNavLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardKeyboardNavDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-keyboard-nav" class="toggle-switch" aria-label="${this.t("keyboardNavLabel")}" ${this.accessibilityPrefs.keyboard_navigation?"checked":""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("highContrastLabel")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardHighContrastDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-contrast" class="toggle-switch" aria-label="${this.t("highContrastLabel")}" ${this.accessibilityPrefs.high_contrast?"checked":""}>
          </label>

          <label class="toggle-row" style="padding:0.375rem 0.5rem; background:var(--b-bg-subtle, #f8fafc); border-radius:0.375rem; border:1px solid var(--b-border);">
            <div class="toggle-info">
              <span class="toggle-title" style="font-size:0.8125rem;">${this.t("onboardLargeTextOpt")}</span>
              <span class="toggle-desc" style="font-size:0.6875rem;">${this.t("onboardLargeTextDesc")}</span>
            </div>
            <input type="checkbox" id="onboard-chk-large-text" class="toggle-switch" aria-label="${this.t("onboardLargeTextOpt")}" ${this.accessibilityPrefs.large_text==="larger"?"checked":""}>
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
    `:"";if(this.messages.length===0){e.innerHTML=`
        ${t}
        <div class="empty-state">
          <p style="margin:0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${n.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ1"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${n.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ2"))}</span>
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}" style="display:inline-flex; align-items:center; gap:0.5rem; text-align:left;">
              ${n.arrowRight} <span>${this.escapeHtml(this.t("suggestedQ3"))}</span>
            </button>
          </div>
        </div>
      `,e.querySelectorAll(".btn-suggested").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-q");s&&this.askQuestion(s)})});return}e.innerHTML=t+this.messages.map(i=>{if(i.sender==="learner")return`
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(i.text)}</p>
            </div>
          `;const s=i.citations&&i.citations.length>0,o=!!i.isRefusal,c=i.isHandoff?this.t("handoffReadyTitle"):this.t("answerHeading");return`
          <div class="msg-row msg-assistant" id="${i.id}">
            <h4 class="answer-heading">${this.escapeHtml(c)}</h4>
            <p class="answer-text">${this.escapeHtml(i.text)}</p>

            ${i.isHandoff?`
                <div class="handoff-card" style="margin-top:0.75rem; padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem;">
                  <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534; display:flex; align-items:center; gap:0.375rem;">
                    ${n.celebrate} <span>${this.t("handoffReadyTitle")}</span>
                  </p>
                  <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    <a href="${this.escapeHtml(i.roomUrl||this.activeHandoff?.room_url||"https://meet.jit.si/savanna-bridge-demo")}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="btn-join-room-card" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${n.video} <span>${this.t("joinRoomButton")}</span>
                    </a>
                    <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(i.roomUrl||this.activeHandoff?.room_url||"https://meet.jit.si/savanna-bridge-demo")}" style="font-size:0.8125rem; min-height:2.25rem; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${n.copy} <span>${this.t("copyRoomBtn")}</span>
                    </button>
                  </div>
                  <div style="font-size:0.75rem; color:#15803d; margin-top:0.5rem;">${this.t("androidFallbackNote")}</div>
                </div>
              `:""}

            ${o?`
                <div class="not-verified-box refusal-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap; margin-top:0.5rem;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${i.id}" style="font-size:0.8125rem; min-height:2.25rem; display:inline-flex; align-items:center; gap:0.375rem;">
                      ${n.user} <span>${this.t("talkToPersonButton")}</span>
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              `:""}

            <!-- Listen & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${i.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${i.isAudioPlaying?n.pause:n.listen}
                <span>${i.isAudioPlaying?this.t("pauseButton"):this.t("listenButton")}</span>
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${i.id}" style="display:inline-flex; align-items:center; gap:0.375rem;">
                ${n.lightbulb}
                <span>${this.t("makeSimplerButton")}</span>
              </button>
            </div>

            <!-- Citations / Sources with readable names -->
            ${s?`
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${i.citations.map(g=>`
                    <a href="${this.escapeHtml(g.url)}" target="_blank" rel="noopener noreferrer" class="source-link citation-link" style="display:inline-flex; align-items:center; gap:0.375rem;">
                      ${n.book} <span>${this.escapeHtml(g.title||g.heading)}</span>
                    </a>
                  `).join("")}
                </div>
              `:""}
          </div>
        `}).join(""),this.isThinking&&(e.innerHTML+=`
        <div class="live-status-indicator" style="display:inline-flex; align-items:center; gap:0.375rem;">
          ${n.spinner} <span>${this.t("lookingInCourse")}</span>
        </div>
      `),e.querySelectorAll(".btn-listen").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-msg-id"),o=this.messages.find(c=>c.id===s);o&&this.handleListen(o)})}),e.querySelectorAll(".btn-simpler").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-msg-id"),o=this.messages.find(c=>c.id===s);if(o){const c=o.originalQuestion||o.text;this.askQuestion(c,!0)}})}),e.querySelectorAll(".btn-talk-person").forEach(i=>{i.addEventListener("click",()=>{const s=i.getAttribute("data-msg-id"),o=this.messages.find(c=>c.id===s);this.requestHandoff(o?`Refusal regarding question: ${o.text}`:void 0)})}),e.querySelectorAll(".btn-try-another").forEach(i=>{i.addEventListener("click",()=>{const s=this.shadowRoot?.querySelector("#chat-text-input, #chat-input");s&&(s.value="",s.focus())})}),e.querySelectorAll(".btn-copy-room").forEach(i=>{i.addEventListener("click",async()=>{const s=i.getAttribute("data-url");s&&navigator.clipboard&&(await navigator.clipboard.writeText(s),this.announce(this.t("linkCodeCopied")))})}),e.scrollTop=e.scrollHeight}bindEvents(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("#launcher-btn"),a=this.shadowRoot.querySelector("#assistant-dialog"),t=this.shadowRoot.querySelector("#btn-close-dialog"),i=this.shadowRoot.querySelector("#btn-open-settings"),s=this.shadowRoot.querySelector("#btn-close-settings"),o=()=>{this.isOpen=!1,this.isSettingsOpen=!1,a.hidden=!0,a.setAttribute("hidden","true"),a.style.display="none";const r=this.shadowRoot?.querySelector("#settings-dialog");r&&(r.hidden=!0,r.setAttribute("hidden","true"),r.style.display="none"),e.setAttribute("aria-expanded","false"),this.announce("Savanna Bridge Assistant closed."),(this.previousFocus??e).focus()};e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.previousFocus=document.activeElement,this.isOpen=!0,a.hidden=!1,a.removeAttribute("hidden"),a.style.display="flex",e.setAttribute("aria-expanded","true"),this.announce("Savanna Bridge Assistant opened. Use Tab to navigate or Escape to close.");const l=this.shadowRoot?.querySelector("#chat-text-input");l?setTimeout(()=>l.focus(),60):a.focus()}),t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),o()});const c=()=>{this.isSettingsOpen=!1;const r=this.shadowRoot?.querySelector("#settings-dialog");r&&(r.hidden=!0,r.setAttribute("hidden","true"),r.style.display="none"),this.announce("Settings closed."),i.focus()};a.addEventListener("keydown",r=>{if(r.key==="Escape"){this.isSettingsOpen?c():o();return}if(r.key==="Tab"){const l=this.isSettingsOpen?this.shadowRoot?.querySelector("#settings-dialog"):a;if(!l)return;const h=Array.from(l.querySelectorAll('button:not([disabled]):not([hidden]), [href]:not([disabled]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])')).filter(j=>j.offsetParent!==null);if(h.length===0)return;const p=h[0],m=h[h.length-1],k=this.shadowRoot?.activeElement||document.activeElement;r.shiftKey&&k===p?(r.preventDefault(),m.focus()):!r.shiftKey&&k===m&&(r.preventDefault(),p.focus())}}),this.shadowRoot.querySelectorAll(".lang-toggle-btn").forEach(r=>{r.addEventListener("click",()=>{const l=r.id.replace("btn-lang-","");l&&this.setLanguage(l)})}),this.shadowRoot.querySelector(".lang-btn")?.addEventListener("click",()=>{this.setLanguage(this.currentLang==="en"?"am":"en")}),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.isSettingsOpen=!0;const l=this.shadowRoot?.querySelector("#settings-dialog");if(l){l.hidden=!1,l.removeAttribute("hidden"),l.style.display="flex",this.announce("Settings opened.");const h=l.querySelector("button, input");h&&h.focus()}}),s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),c()});const g=[{id:"chat",btn:this.shadowRoot.querySelector("#tab-chat"),pane:this.shadowRoot.querySelector("#pane-chat")},{id:"support",btn:this.shadowRoot.querySelector("#tab-support"),pane:this.shadowRoot.querySelector("#pane-support")},{id:"link",btn:this.shadowRoot.querySelector("#tab-link"),pane:this.shadowRoot.querySelector("#pane-link")},{id:"handoff",btn:this.shadowRoot.querySelector("#tab-handoff"),pane:this.shadowRoot.querySelector("#pane-handoff")}],b=r=>{this.activeTab=g[r].id,g.forEach((h,p)=>{const m=p===r;h.btn?.setAttribute("aria-selected",m?"true":"false"),h.pane&&(h.pane.hidden=!m,h.pane.style.display=m?h.id==="chat"?"flex":"block":"none")});const l=g[r].btn;l&&(l.focus(),this.announce(l.textContent?.trim()+" tab selected"))};g.forEach(({btn:r},l)=>{r?.addEventListener("click",()=>b(l)),r?.addEventListener("keydown",h=>{const p=h;p.key==="ArrowRight"?(p.preventDefault(),b((l+1)%g.length)):p.key==="ArrowLeft"&&(p.preventDefault(),b((l-1+g.length)%g.length))})}),this.shadowRoot.querySelectorAll(".btn-talk-person, #btn-footer-handoff").forEach(r=>{r.addEventListener("click",l=>{l.preventDefault();const h=g.findIndex(p=>p.id==="handoff");h>=0&&b(h)})}),this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click",()=>{this.textSize="smaller",this.setAttribute("data-size","smaller"),localStorage.setItem("savanna_bridge_text_size","smaller"),this.updateSizeButtons()}),this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click",()=>{this.textSize="normal",this.setAttribute("data-size","normal"),localStorage.setItem("savanna_bridge_text_size","normal"),this.updateSizeButtons()}),this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click",()=>{this.textSize="larger",this.setAttribute("data-size","larger"),localStorage.setItem("savanna_bridge_text_size","larger"),this.updateSizeButtons()});const y=this.shadowRoot.querySelector("#chk-contrast");y&&y.addEventListener("change",()=>{this.highContrast=y.checked,this.setAttribute("data-contrast",this.highContrast?"high":"normal"),localStorage.setItem("savanna_bridge_contrast",this.highContrast?"high":"normal")});const $=this.shadowRoot.querySelector("#chk-simple-mode");$&&$.addEventListener("change",()=>{this.simpleMode=$.checked,localStorage.setItem("savanna_bridge_simple_mode",this.simpleMode?"true":"false")}),this.shadowRoot.querySelector("#btn-clear-chat")?.addEventListener("click",()=>{this.clearChat()}),this.shadowRoot.querySelector("#btn-generate-code")?.addEventListener("click",()=>{this.generateLinkCode()});const B=this.shadowRoot.querySelector("#handoff-request-form");B&&B.addEventListener("submit",r=>{r.preventDefault();const l=this.shadowRoot?.querySelector("#handoff-reason");this.requestHandoff(l?.value||void 0)});const R=this.shadowRoot.querySelector("#support-form");R&&R.addEventListener("submit",r=>{r.preventDefault();const l=new FormData(R),h=l.getAll("need"),p=l.get("other_text")||"",m=l.get("contact_mode")||"text";this.saveSupportNeeds(h,p,m)});const C=this.shadowRoot.querySelector("#chat-form"),v=this.shadowRoot.querySelector("#chat-text-input, #chat-input"),M=this.shadowRoot.querySelector("#mic-btn");C&&v&&C.addEventListener("submit",r=>{r.preventDefault();const l=v.value;v.value="",this.askQuestion(l)}),M&&v&&M.addEventListener("click",()=>{this.toggleVoiceInput(v)});const z=()=>{this.showAutoplayBanner=!1,this.accessibilityPrefs.voice_enabled=!0,this.savePreferences(),this.announce(this.t("welcomeSpoken")),this.triggerSpokenWelcome(),this.render()};this.shadowRoot.querySelector("#btn-activate-voice-welcome")?.addEventListener("click",z),this.shadowRoot.querySelector("#btn-activate-voice-welcome-floating")?.addEventListener("click",z);const E=()=>{this.showAutoplayBanner=!1,this.render()};this.shadowRoot.querySelector("#btn-dismiss-voice-banner")?.addEventListener("click",E),this.shadowRoot.querySelector("#btn-dismiss-voice-banner-floating")?.addEventListener("click",E),this.shadowRoot.querySelector("#btn-reading-pause")?.addEventListener("click",()=>this.pausePageReading()),this.shadowRoot.querySelector("#btn-reading-resume")?.addEventListener("click",()=>this.resumePageReading()),this.shadowRoot.querySelector("#btn-reading-stop")?.addEventListener("click",()=>this.stopPageReading()),["en","am","om","ti","ar"].forEach(r=>{this.shadowRoot?.querySelector(`#onboard-lang-${r}`)?.addEventListener("click",()=>{this.setLanguage(r)})});const _=r=>{if(r){const l=this.shadowRoot?.querySelector("#onboard-chk-voice")?.checked??!0,h=this.shadowRoot?.querySelector("#onboard-chk-screen-reader")?.checked??!1,p=this.shadowRoot?.querySelector("#onboard-chk-keyboard-nav")?.checked??!1,m=this.shadowRoot?.querySelector("#onboard-chk-contrast")?.checked??!1,k=this.shadowRoot?.querySelector("#onboard-chk-large-text")?.checked??!1;this.accessibilityPrefs.voice_enabled=l,this.accessibilityPrefs.screen_reader_mode=h,this.accessibilityPrefs.keyboard_navigation=p,this.accessibilityPrefs.high_contrast=m,this.accessibilityPrefs.large_text=k?"larger":"normal",this.highContrast=m,k&&(this.textSize="larger",localStorage.setItem("savanna_bridge_text_size","larger"))}this.accessibilityPrefs.onboarded=!0,this.onboardingDismissed=!0,this.savePreferences(),this.render(),this.accessibilityPrefs.voice_enabled&&this.accessibilityPrefs.auto_welcome&&this.triggerSpokenWelcome()};this.shadowRoot.querySelector("#btn-onboard-save")?.addEventListener("click",()=>_(!0)),this.shadowRoot.querySelector("#btn-onboard-skip")?.addEventListener("click",()=>_(!1)),this.shadowRoot.querySelector("#btn-onboard-close")?.addEventListener("click",()=>_(!1));const w=this.shadowRoot.querySelector("#chk-voice-master");w&&w.addEventListener("change",()=>{this.accessibilityPrefs.voice_enabled=w.checked,this.savePreferences(),this.announce(w.checked?"Voice accessibility enabled":"Voice accessibility disabled")});const P=this.shadowRoot.querySelector("#chk-auto-welcome");P&&P.addEventListener("change",()=>{this.accessibilityPrefs.auto_welcome=P.checked,this.savePreferences()});const A=this.shadowRoot.querySelector("#chk-auto-tts");A&&A.addEventListener("change",()=>{this.accessibilityPrefs.auto_tts=A.checked,this.savePreferences()});const q=[{id:"#btn-rate-075",rate:.75},{id:"#btn-rate-100",rate:1},{id:"#btn-rate-125",rate:1.25},{id:"#btn-rate-150",rate:1.5}];q.forEach(({id:r,rate:l})=>{this.shadowRoot?.querySelector(r)?.addEventListener("click",()=>{this.accessibilityPrefs.speech_rate=l,this.savePreferences(),q.forEach(h=>{this.shadowRoot?.querySelector(h.id)?.setAttribute("aria-pressed",h.rate===l?"true":"false")}),this.announce(`Speech rate set to ${l}x`)})}),this.shadowRoot.querySelector("#btn-read-page")?.addEventListener("click",()=>this.readPageAloud()),this.shadowRoot.querySelector("#btn-read-section")?.addEventListener("click",()=>this.readSectionAloud()),this.shadowRoot.querySelector("#btn-test-voice")?.addEventListener("click",()=>{this.speakText(this.t("welcomeSpoken"))});const S=this.shadowRoot.querySelector("#chk-screen-reader");S&&S.addEventListener("change",()=>{this.accessibilityPrefs.screen_reader_mode=S.checked,this.savePreferences(),this.announce(S.checked?"Screen reader mode enabled":"Screen reader mode disabled")});const x=this.shadowRoot.querySelector("#chk-keyboard-nav");x&&x.addEventListener("change",()=>{this.accessibilityPrefs.keyboard_navigation=x.checked,this.savePreferences(),x.checked?this.classList.add("keyboard-focus-enhanced"):this.classList.remove("keyboard-focus-enhanced"),this.announce(x.checked?"Enhanced keyboard navigation enabled":"Enhanced keyboard navigation disabled")});const T=this.shadowRoot.querySelector("#chk-sync-prefs");T&&T.addEventListener("change",()=>{this.accessibilityPrefs.sync_enabled=T.checked,this.savePreferences(),T.checked?(this.syncPreferencesToBackend(),this.announce("Cross-website synchronization enabled")):this.announce("Cross-website synchronization disabled")}),this.shadowRoot.querySelector("#btn-replay-onboarding")?.addEventListener("click",()=>{this.accessibilityPrefs.onboarded=!1,this.onboardingDismissed=!1,this.isSettingsOpen=!1,this.render()})}escapeHtml(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}}return customElements.get("bridge-assistant")||customElements.define("bridge-assistant",L),customElements.get("db-assistant")||customElements.define("db-assistant",class extends L{}),f.BridgeAssistant=L,f.ICONS=n,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),f})({});
//# sourceMappingURL=widget.iife.js.map
