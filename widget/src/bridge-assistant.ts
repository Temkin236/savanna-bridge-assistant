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
  heading?: string;
  citations?: Citation[];
  offerHuman?: boolean;
  isRefusal?: boolean;
  audioUrl?: string;
  isAudioPlaying?: boolean;
}

export interface SupportNeedsData {
  needs: string[];
  other_text: string;
  preferred_contact_mode: "text" | "voice" | "video" | "telegram";
}

const I18N: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: "Savanna Bridge Assistant",
    appSubtitle: "Ask questions, adjust support, or connect with a mentor",
    closeLabel: "Close dialog",
    launcherLabel: "Help & Assistant",
    wakeHint: "Say \"Help\" or tap to open",
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
  },
  am: {
    appTitle: "የሳቫና ብሪጅ ረዳት",
    appSubtitle: "ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",
    closeLabel: "መስኮቱን ዝጋ",
    launcherLabel: "እርዳታ እና ረዳት",
    wakeHint: "\"እርዳታ\" ይበሉ ወይም ይንኩ",
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
  },
  om: {
    appTitle: "Gargaaraa Savanna Bridge",
    appSubtitle: "Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",
    closeLabel: "Cufi",
    launcherLabel: "Gargaarsa & Deeggarsa",
    wakeHint: "\"Gargaarsa\" jedhaa ykn tuqaa",
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
  },
  ti: {
    appTitle: "ናይ ሳቫና ብሪጅ ሓጋዚ",
    appSubtitle: "ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",
    closeLabel: "ዕጾ",
    launcherLabel: "ሓገዝ & ሓጋዚ",
    wakeHint: "\"ሓገዝ\" በሉ ወይ ንከፉ",
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
  },
  ar: {
    appTitle: "مساعد سافانا بريدج",
    appSubtitle: "اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",
    closeLabel: "إغلاق النافذة",
    launcherLabel: "المساعدة والمساعد",
    wakeHint: "قل \"مساعدة\" أو اضغط للفتح",
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
  },
};

const STYLES = `
  :host {
    --b-font: var(--bs-body-font-family, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Ethiopic", "Noto Sans Arabic", "Nyala", sans-serif);
    --b-bg: var(--bs-body-bg, #ffffff);
    --b-text: var(--bs-body-color, #0f172a);
    --b-text-muted: #475569;
    --b-border: #cbd5e1;
    --b-primary: var(--bs-primary, #1d4ed8);
    --b-primary-hover: #1e40af;
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

  /* Floating Launcher Button */
  .launcher {
    position: fixed;
    inset: auto 1.25rem 1.25rem auto;
    z-index: 2147483640;
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border: 2px solid var(--b-primary-contrast);
    border-radius: 2rem;
    padding: 0.5rem 1.25rem;
    box-shadow: var(--b-shadow);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
  }
  .launcher:hover {
    background: var(--b-primary-hover);
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
`;

export class BridgeAssistant extends HTMLElement {
  private isOpen = false;
  private currentLang: SupportedLanguage = "en";
  private textSize: "smaller" | "normal" | "larger" = "normal";
  private highContrast = false;
  private simpleMode = false;
  private autoReadSpeech = true;
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
  private activeAudio: HTMLAudioElement | null = null;

  private messages: ChatMessage[] = [];
  private sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // Telegram link state
  private telegramToken: string | null = null;
  private telegramDeepLink: string = "https://t.me/savannah_assistant3_bot";
  private isTelegramLinked = false;
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

  private previousFocus: HTMLElement | null = null;

  // Attributes: supports both guide plain attributes (lang, api, content) and data-*
  get apiBase(): string {
    return this.getAttribute("api") || this.getAttribute("data-api") || "http://localhost:8000";
  }

  get courseId(): string {
    return this.getAttribute("content") || this.getAttribute("data-course") || "course_demo";
  }

  static get observedAttributes(): string[] {
    return ["lang", "data-lang", "api", "data-api", "content", "data-course"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    if ((name === "lang" || name === "data-lang") && newValue in I18N) {
      this.currentLang = newValue as SupportedLanguage;
      if (this.shadowRoot) {
        this.render();
      }
    }
  }

  connectedCallback(): void {
    if (this.shadowRoot) return;

    const attrLang = (this.getAttribute("lang") || this.getAttribute("data-lang")) as SupportedLanguage | null;
    const cachedLang = sessionStorage.getItem("savanna_bridge_lang") as SupportedLanguage | null;
    if (attrLang && attrLang in I18N) {
      this.currentLang = attrLang;
    } else if (cachedLang && cachedLang in I18N) {
      this.currentLang = cachedLang;
    }

    this.restoreState();

    this.attachShadow({ mode: "open" });
    this.render();
    this.setupNetworkMonitor();

    // Fetch initial Telegram start link and support needs
    this.fetchTelegramStartLink();
    this.fetchSupportNeeds();

    // Initialize wake-word listener and global keyboard shortcuts
    this.initWakeWordDetection();
    this.initGlobalKeyboardShortcuts();
  }

  disconnectedCallback(): void {
    if (this.telegramPollTimer) {
      window.clearInterval(this.telegramPollTimer);
      this.telegramPollTimer = null;
    }
    if (this.wakeWordRecognizer) {
      try { this.wakeWordRecognizer.stop(); } catch {}
      this.wakeWordRecognizer = null;
    }
    this.stopSpeaking();
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
    this.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (fullRender) {
      this.render();
    } else {
      this.updateHeaderLanguageButtons();
      this.updateVoiceStatusUI();
    }
  }

  private updateHeaderLanguageButtons(): void {
    const root = this.shadowRoot;
    if (!root) return;
    const langs: SupportedLanguage[] = ["en", "am", "om", "ar"];
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

      const savedContrast = localStorage.getItem("savanna_bridge_contrast");
      if (savedContrast) this.highContrast = savedContrast === "high";

      const savedSize = localStorage.getItem("savanna_bridge_text_size") as "smaller" | "normal" | "larger" | null;
      if (savedSize) this.textSize = savedSize;

      const savedAutoRead = localStorage.getItem("savanna_bridge_auto_read");
      if (savedAutoRead !== null) this.autoReadSpeech = savedAutoRead === "true";
    } catch {
      // Ignore storage errors
    }
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
      // Alt + Shift + V or Alt + Shift + A toggles voice assistant listening
      if (e.altKey && e.shiftKey && (e.key === "V" || e.key === "v" || e.key === "A" || e.key === "a")) {
        e.preventDefault();
        if (!this.isOpen) {
          this.openAssistant();
        }
        const inputEl = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (inputEl) {
          this.toggleVoiceInput(inputEl);
        }
      }
    });
  }

  public openAssistant(): void {
    this.isOpen = true;
    const dialog = this.shadowRoot?.querySelector<HTMLElement>("#assistant-dialog");
    const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
    if (dialog && launcher) {
      dialog.removeAttribute("hidden");
      launcher.setAttribute("aria-expanded", "true");
      dialog.focus();
    }
  }

  public closeAssistant(): void {
    this.isOpen = false;
    const dialog = this.shadowRoot?.querySelector<HTMLElement>("#assistant-dialog");
    const launcher = this.shadowRoot?.querySelector<HTMLButtonElement>("#launcher-btn");
    if (dialog && launcher) {
      dialog.setAttribute("hidden", "true");
      launcher.setAttribute("aria-expanded", "false");
      (this.previousFocus ?? launcher).focus();
    }
    this.stopSpeaking();
    if (this.isRecording) {
      this.stopVoiceRecording();
    }
  }

  // --- Telegram Link Methods ---

  private async fetchTelegramStartLink(): Promise<void> {
    try {
      const res = await fetch(`${this.apiBase}/api/v1/link/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: this.sessionId,
          channel: "web",
          learner_reference: `learner_${this.sessionId}`,
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
          session_id: this.sessionId,
          channel: "telegram",
        }),
      });
    } catch {
      // Ignore
    }
    this.isTelegramLinked = false;
    await this.fetchTelegramStartLink();
    this.updateTelegramLinkUI();
  }

  private updateTelegramLinkUI(): void {
    const container = this.shadowRoot?.querySelector("#telegram-container");
    if (!container) return;

    if (this.isTelegramLinked) {
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ✓ ${this.t("connectedToTelegram")}
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg" style="font-size:0.75rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
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
            speechRecDeliveredText = true;
            const detected = this.detectLanguage(text);
            if (detected !== this.currentLang) {
              this.setLanguage(detected, false);
            }
            inputEl.value = text;
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
          language: this.currentLang,
          retain: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.transcript) {
          const detected = this.detectLanguage(data.transcript);
          if (detected !== this.currentLang) {
            this.setLanguage(detected, false);
          }
          inputEl.value = (inputEl.value ? inputEl.value + " " : "") + data.transcript;
          inputEl.focus();
          this.playEarcon("transcribed");
          this.announce(this.t("voicePreviewNotice"));
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
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-voice" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
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
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-speech" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
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
      .replace(/\s+/g, " ")
      .trim();
  }

  public async speakResponse(msg: ChatMessage): Promise<void> {
    this.stopSpeaking();

    const cleanText = this.cleanTextForSpeech(msg.text);
    if (!cleanText) return;

    this.isSpeaking = true;
    msg.isAudioPlaying = true;
    this.renderMessages();
    this.updateVoiceStatusUI();

    // 1. Web Speech API SpeechSynthesis
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      const voiceLangMap: Record<SupportedLanguage, string[]> = {
        en: ["en-US", "en-GB", "en"],
        am: ["am-ET", "am"],
        om: ["om-ET", "om", "en-US"],
        ar: ["ar-SA", "ar-EG", "ar-AE", "ar"],
        ti: ["ti-ET", "ti", "am-ET"],
      };

      const targetPrefixes = voiceLangMap[this.currentLang] || ["en"];
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) =>
        targetPrefixes.some((p) => v.lang.toLowerCase().startsWith(p.toLowerCase()))
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      } else {
        utterance.lang = targetPrefixes[0];
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        this.isSpeaking = false;
        msg.isAudioPlaying = false;
        this.renderMessages();
        this.updateVoiceStatusUI();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        msg.isAudioPlaying = false;
        this.renderMessages();
        this.updateVoiceStatusUI();
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // 2. Server-side TTS synthesis fallback
    try {
      const res = await fetch(`${this.apiBase}/api/v1/speech/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          language: this.currentLang,
          speed: 1.0,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const audioUrl = data.audio_url?.startsWith("http")
          ? data.audio_url
          : `${this.apiBase}${data.audio_url || ""}`;
        this.activeAudio = new Audio(audioUrl);
        this.activeAudio.onended = () => {
          this.isSpeaking = false;
          msg.isAudioPlaying = false;
          this.renderMessages();
          this.updateVoiceStatusUI();
        };
        await this.activeAudio.play();
      }
    } catch {
      this.isSpeaking = false;
      msg.isAudioPlaying = false;
      this.renderMessages();
      this.updateVoiceStatusUI();
    }
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

  // --- Q&A / Ask ---

  public async askQuestion(questionText: string, forceSimple = false): Promise<void> {
    const q = questionText.trim();
    if (!q || this.isThinking) return;

    this.stopSpeaking();

    // Auto-detect language of question if different from current selection
    const detectedLang = this.detectLanguage(q);
    if (detectedLang !== this.currentLang) {
      this.setLanguage(detectedLang, false);
    }

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

    try {
      let res = await fetch(`${this.apiBase}/api/v1/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: forceSimple || this.simpleMode,
          channel: "web",
        }),
      });

      if (!res.ok && res.status === 404) {
        res = await fetch(`${this.apiBase}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: q,
            language: this.currentLang,
            course_id: this.courseId,
            simple_mode: forceSimple || this.simpleMode,
            channel: "web",
          }),
        });
      }

      this.isThinking = false;

      if (res.ok) {
        const data = await res.json();
        const isRefusal = !!data.offer_human || data.reason === "low_confidence";
        const assistantMsg: ChatMessage = {
          id: `msg_${Date.now()}_assistant`,
          sender: "assistant",
          text: data.answer,
          heading: this.t("answerHeading"),
          citations: data.citations || [],
          offerHuman: data.offer_human,
          isRefusal: isRefusal,
        };
        this.messages.push(assistantMsg);
        this.saveChatState();
        this.renderMessages();

        // Automatically read response aloud in appropriate language
        if (this.autoReadSpeech) {
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
      this.isThinking = false;
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
      };
      this.messages.push(offlineMsg);
      this.renderMessages();
    }
  }

  // --- Human Handoff ---

  private async requestHandoff(contextReason?: string): Promise<void> {
    if (this.isOffline) {
      alert(this.t("offlineBanner"));
      return;
    }

    this.announce(this.t("lookingInCourse"));

    try {
      const res = await fetch(`${this.apiBase}/api/v1/escalations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consent: true,
          learner_ref: `learner_${this.sessionId}`,
          card: {
            language: this.currentLang,
            context: contextReason || "Learner requested a human mentor from web assistant.",
            support_needs: this.supportNeeds.needs,
            contact_mode: this.supportNeeds.preferred_contact_mode,
          },
          channel: "web",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const ticketId = data.ticketId || data.id || "ticket_01";
        this.activeHandoff = {
          id: ticketId,
          room_url: data.room_url || "https://meet.jit.si/savanna-bridge-demo",
        };

        this.dispatchEvent(
          new CustomEvent("db-assistant:escalated", {
            bubbles: true,
            composed: true,
            detail: { ticketId },
          })
        );

        this.messages.push({
          id: `msg_${Date.now()}_handoff`,
          sender: "assistant",
          text: `${this.t("handoffReadyTitle")}: ${this.activeHandoff.room_url}`,
          heading: this.t("handoffReadyTitle"),
          offerHuman: false,
        });
        this.renderMessages();
      } else {
        alert(this.t("serverErrorNotice"));
      }
    } catch {
      alert(this.t("serverErrorNotice"));
    }
  }

  // --- Rendering ---

  private render(): void {
    if (!this.shadowRoot) return;

    this.setAttribute("data-contrast", this.highContrast ? "high" : "normal");
    this.setAttribute("data-size", this.textSize);
    this.setAttribute("dir", this.currentLang === "ar" ? "rtl" : "ltr");

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>

      <!-- Live Announcer -->
      <div id="live-announcer" class="sr-only" aria-live="polite" aria-atomic="true" style="position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0,0,0,0); border:0;"></div>

      <!-- Floating Launcher Button with Wake Word Hint -->
      <button class="launcher" type="button" id="launcher-btn" 
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M12 7v4M12 15h.01"></path>
        </svg>
        <div style="display:flex; flex-direction:column; align-items:flex-start; text-align:left; line-height:1.15;">
          <span>${this.t("launcherLabel")}</span>
          <span style="font-size:0.6875rem; font-weight:normal; opacity:0.9;">${this.t("wakeHint")}</span>
        </div>
      </button>

      <!-- Main Open Panel -->
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1" ${this.isOpen ? "" : "hidden"}>
        
        ${this.isOffline ? `<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>` : ""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles">
            <h2 id="dialog-title" class="title">${this.t("appTitle")}</h2>
          </div>
          <div class="header-actions">
            <!-- 4-Language Switcher in Native Scripts -->
            <div class="lang-bar" role="group" aria-label="Language selection">
              <button type="button" class="lang-toggle-btn" id="btn-lang-en" 
                      aria-pressed="${this.currentLang === "en"}" aria-label="English">
                EN
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-am" 
                      aria-pressed="${this.currentLang === "am"}" aria-label="አማርኛ">
                አማርኛ
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-om" 
                      aria-pressed="${this.currentLang === "om"}" aria-label="Afaan Oromoo">
                Oromoo
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ar" 
                      aria-pressed="${this.currentLang === "ar"}" aria-label="العربية">
                العربية
              </button>
            </div>

            <!-- Settings Button -->
            <button type="button" class="btn btn-secondary" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}" style="padding:0.4rem 0.6rem;">
              ⚙️
            </button>
            <!-- Close Button -->
            <button type="button" class="btn btn-secondary" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" style="padding:0.4rem 0.6rem;">
              ✕
            </button>
          </div>
        </header>

        <!-- Voice Status Bar (Listening / Processing / Speaking) -->
        <div id="voice-status-container" aria-live="polite"></div>

        <!-- Body: Message List -->
        <div class="chat-log" id="chat-log" role="log" aria-live="polite">
          <!-- Populated by renderMessages() -->
        </div>

        <!-- Footer (Always Visible) -->
        <footer class="footer">
          <!-- Top Row: Input, Mic, Send -->
          <form class="input-row" id="chat-form">
            <input type="text" class="text-input" id="chat-input" 
                   placeholder="${this.t("inputPlaceholder")}" 
                   aria-label="${this.t("inputPlaceholder")}" 
                   dir="${this.currentLang === "ar" ? "rtl" : "ltr"}"
                   required autocomplete="off">
            <button type="button" class="btn btn-secondary mic-btn" id="mic-btn" 
                    aria-label="${this.t("micLabel")}" title="${this.t("micLabel")}">
              🎤
            </button>
            <button type="submit" class="btn btn-primary" id="btn-send">
              ${this.t("sendButton")}
            </button>
          </form>

          <!-- Bottom Row: Talk to a person & Continue on Telegram -->
          <div class="footer-actions-row">
            <button type="button" class="btn btn-secondary btn-footer" id="btn-footer-handoff">
              👤 ${this.t("talkToPersonButton")}
            </button>
            <div id="telegram-container" class="telegram-section">
              <!-- Rendered by updateTelegramLinkUI() -->
            </div>
          </div>
        </footer>

        <!-- Settings Dialog Modal Overlay -->
        <div id="settings-dialog" class="settings-dialog" ${this.isSettingsOpen ? "" : "hidden"} role="region" aria-labelledby="settings-dialog-title">
          <div class="settings-header">
            <h3 id="settings-dialog-title" style="margin:0; font-size:1.125rem;">${this.t("settingsTitle")}</h3>
            <button type="button" class="btn btn-secondary" id="btn-close-settings">
              ${this.t("closeSettings")}
            </button>
          </div>

          <!-- Text Size -->
          <div class="settings-section">
            <span class="settings-label">${this.t("textSizeLabel")}</span>
            <div class="size-btn-group">
              <button type="button" class="btn btn-secondary" id="btn-size-smaller" aria-pressed="${this.textSize === "smaller"}">
                ${this.t("textSmaller")}
              </button>
              <button type="button" class="btn btn-secondary" id="btn-size-normal" aria-pressed="${this.textSize === "normal"}">
                ${this.t("textNormal")}
              </button>
              <button type="button" class="btn btn-secondary" id="btn-size-larger" aria-pressed="${this.textSize === "larger"}">
                ${this.t("textLarger")}
              </button>
            </div>
          </div>

          <!-- High Contrast -->
          <div class="settings-section">
            <label class="checkbox-row">
              <input type="checkbox" id="chk-contrast" ${this.highContrast ? "checked" : ""}>
              <span class="settings-label">${this.t("highContrastLabel")}</span>
            </label>
          </div>

          <!-- Simple Mode -->
          <div class="settings-section">
            <label class="checkbox-row">
              <input type="checkbox" id="chk-simple-mode" ${this.simpleMode ? "checked" : ""}>
              <div>
                <span class="settings-label">${this.t("simpleModeLabel")}</span>
                <div style="font-size:0.75rem; color:var(--b-text-muted);">${this.t("simpleModeDesc")}</div>
              </div>
            </label>
          </div>

          <!-- Auto-read Speech Toggle -->
          <div class="settings-section">
            <label class="checkbox-row">
              <input type="checkbox" id="chk-auto-read" ${this.autoReadSpeech ? "checked" : ""}>
              <div>
                <span class="settings-label">${this.t("autoReadSpeechLabel")}</span>
                <div style="font-size:0.75rem; color:var(--b-text-muted);">${this.t("autoReadSpeechDesc")}</div>
              </div>
            </label>
          </div>

          <!-- Support Needs -->
          <div class="settings-section" style="border-top:1px solid var(--b-border); padding-top:0.75rem;">
            <span class="settings-label">${this.t("supportNeedsTitle")}</span>
            <div style="font-size:0.75rem; color:var(--b-text-muted); margin-bottom:0.5rem;">
              ${this.t("supportZeroProof")}
            </div>

            <form id="support-form" style="display:flex; flex-direction:column; gap:0.5rem;">
              <label class="checkbox-row">
                <input type="checkbox" name="need" value="extra_time" 
                       ${this.supportNeeds.needs.includes("extra_time") ? "checked" : ""}>
                <span style="font-size:0.875rem;">${this.t("needExtraTime")}</span>
              </label>

              <label class="checkbox-row">
                <input type="checkbox" name="need" value="screen_reader_help" 
                       ${this.supportNeeds.needs.includes("screen_reader_help") ? "checked" : ""}>
                <span style="font-size:0.875rem;">${this.t("needScreenReader")}</span>
              </label>

              <label class="checkbox-row">
                <input type="checkbox" name="need" value="written_instructions" 
                       ${this.supportNeeds.needs.includes("written_instructions") ? "checked" : ""}>
                <span style="font-size:0.875rem;">${this.t("needWritten")}</span>
              </label>

              <label class="checkbox-row">
                <input type="checkbox" name="need" value="other" 
                       ${this.supportNeeds.needs.includes("other") || !!this.supportNeeds.other_text ? "checked" : ""}>
                <span style="font-size:0.875rem;">${this.t("needOther")}</span>
              </label>

              <textarea name="other_text" class="text-input" style="min-height:3.5rem;" 
                        placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text || ""}</textarea>

              <label style="font-size:0.875rem; font-weight:600; margin-top:0.25rem;">
                ${this.t("contactModeLabel")}
                <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:2.5rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode === "text" ? "selected" : ""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode === "voice" ? "selected" : ""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode === "video" ? "selected" : ""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode === "telegram" ? "selected" : ""}>${this.t("modeTelegram")}</option>
                </select>
              </label>

              <div id="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600;">
                ✓ ${this.t("supportSavedNotice")}
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top:0.25rem;">
                ${this.t("saveSupportBtn")}
              </button>
            </form>
          </div>

        </div>

      </section>
    `;

    this.renderMessages();
    this.updateTelegramLinkUI();
    this.updateVoiceStatusUI();
    this.bindEvents();
  }

  private renderMessages(): void {
    const chatLog = this.shadowRoot?.querySelector("#chat-log");
    if (!chatLog) return;

    if (this.messages.length === 0) {
      chatLog.innerHTML = `
        <div class="empty-state">
          <p style="margin:0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}">
              👉 ${this.escapeHtml(this.t("suggestedQ1"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}">
              👉 ${this.escapeHtml(this.t("suggestedQ2"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}">
              👉 ${this.escapeHtml(this.t("suggestedQ3"))}
            </button>
          </div>
        </div>
      `;

      chatLog.querySelectorAll<HTMLButtonElement>(".btn-suggested").forEach((btn) => {
        btn.addEventListener("click", () => {
          const q = btn.getAttribute("data-q");
          if (q) this.askQuestion(q);
        });
      });
      return;
    }

    chatLog.innerHTML = this.messages
      .map((msg) => {
        if (msg.sender === "learner") {
          return `
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(msg.text)}</p>
            </div>
          `;
        }

        // Assistant Message Card
        const hasCitations = msg.citations && msg.citations.length > 0;
        const isRefusal = !!msg.isRefusal;

        return `
          <div class="msg-row msg-assistant" id="${msg.id}">
            <h4 class="answer-heading">${this.escapeHtml(msg.heading || this.t("answerHeading"))}</h4>
            <p class="answer-text">${this.escapeHtml(msg.text)}</p>

            ${isRefusal
            ? `
                <div class="not-verified-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${msg.id}" style="font-size:0.8125rem; min-height:2.25rem;">
                      👤 ${this.t("talkToPersonButton")}
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              `
            : ""
          }

            <!-- Listen & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${msg.id}">
                ${msg.isAudioPlaying ? `⏸️ ${this.t("pauseButton")}` : `🔊 ${this.t("listenButton")}`}
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${msg.id}">
                💡 ${this.t("makeSimplerButton")}
              </button>
            </div>

            <!-- Citations / Sources with readable names -->
            ${hasCitations
            ? `
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${msg.citations!
              .map(
                (c) => `
                    <a href="${this.escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="source-link">
                      📖 ${this.escapeHtml(c.title || c.heading)}
                    </a>
                  `
              )
              .join("")}
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
          ⏳ ${this.t("lookingInCourse")}
        </div>
      `;
    }

    // Attach listeners for dynamic answer buttons
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

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-simpler").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (msg) this.askQuestion(`Explain simpler: ${msg.text}`, true);
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
        this.previousFocus = document.activeElement as HTMLElement | null;
        this.openAssistant();
      }
    });

    closeBtn.addEventListener("click", () => this.closeAssistant());

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
    });

    // 4-Language Switcher
    this.shadowRoot.querySelector("#btn-lang-en")?.addEventListener("click", () => this.setLanguage("en"));
    this.shadowRoot.querySelector("#btn-lang-am")?.addEventListener("click", () => this.setLanguage("am"));
    this.shadowRoot.querySelector("#btn-lang-om")?.addEventListener("click", () => this.setLanguage("om"));
    this.shadowRoot.querySelector("#btn-lang-ar")?.addEventListener("click", () => this.setLanguage("ar"));

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

    // Footer Talk to a Person Button
    this.shadowRoot.querySelector("#btn-footer-handoff")?.addEventListener("click", () => {
      this.requestHandoff();
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Register both custom elements for full compatibility across systems
if (!customElements.get("bridge-assistant")) {
  customElements.define("bridge-assistant", BridgeAssistant);
}
if (!customElements.get("db-assistant")) {
  customElements.define("db-assistant", BridgeAssistant);
}
