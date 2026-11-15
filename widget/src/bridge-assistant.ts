/**
 * Savanna Bridge Assistant (<bridge-assistant> & <db-assistant>)
 * Multilingual, accessible learning and live help web component.
 *
 * Implements:
 * - Simple production-ready layout:
 *   1. Header: title, language switch with native scripts (አማርኛ / English), Settings, Close.
 *   2. Body: message list. Empty state shows welcome + 3 suggested course questions.
 *   3. Footer: text input with Send, Mic, Talk to a person, and Continue on Telegram.
 *   4. Settings dialog: text size (smaller, normal, larger), high contrast, simple mode, support needs.
 * - One primary action per screen, plain words, no jargon, no icon-only buttons.
 * - Answer format: heading, text, Listen, Make simpler, source links with readable names.
 * - Loading: 'Looking in the course' announced once in aria-live.
 * - Not found: clear notice, offer Talk to a person & Try another question buttons.
 * - Offline: banner + 'Saved on this phone. It will send when you are online.' (localStorage queue).
 * - Telegram: deep_link <a> tag, polls status every 2s for 10m, announces 'Telegram connected', shows Disconnect.
 * - Visual: 44px touch targets, 4.5:1 contrast, rem units, visible focus, host CSS variable adoption.
 * - Events: db-assistant:question and db-assistant:escalated (CustomEvents).
 * - Aliased as <db-assistant> and <bridge-assistant>.
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
    recordingState: "Listening... tap to finish",
    transcribingState: "Transcribing audio...",
    voicePreviewNotice: "Voice transcribed. You can edit the text before sending.",
    micError: "Microphone unavailable. Please type your question.",
    lookingInCourse: "Looking in the course...",
    answerHeading: "Answer",
    listenButton: "Listen",
    pauseButton: "Pause",
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
  },
  am: {
    appTitle: "የሳቫና ብሪጅ ረዳት",
    appSubtitle: "ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",
    closeLabel: "መስኮቱን ዝጋ",
    launcherLabel: "እርዳታ እና ረዳት",
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
    recordingState: "እያዳመጥኩ ነው... ለማጠናቀቅ ይጫኑ",
    transcribingState: "ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",
    voicePreviewNotice: "ድምጽዎ ወደ ጽሑፍ ተቀይሯል። ከመላክዎ በፊት ማስተካከል ይችላሉ።",
    micError: "ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",
    lookingInCourse: "በኮርሱ ውስጥ በመፈለግ ላይ...",
    answerHeading: "መልስ",
    listenButton: "አዳምጥ",
    pauseButton: "አቁም",
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
  },
  om: {
    appTitle: "Gargaaraa Savanna Bridge",
    appSubtitle: "Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",
    closeLabel: "Cufi",
    launcherLabel: "Gargaarsa",
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
    recordingState: "Dhaggeeffachaa jira...",
    transcribingState: "Sagalee jijjiiraa jira...",
    voicePreviewNotice: "Sagaleen gara barruutti jijjiirameera.",
    micError: "Maaykirofooniin hin argamne.",
    lookingInCourse: "Barnoota keessaa barbaadaa jira...",
    answerHeading: "Deebii",
    listenButton: "Dhaggeeffadhu",
    pauseButton: "Dhaabi",
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
  },
  ti: {
    appTitle: "ናይ ሳቫና ብሪጅ ሓጋዚ",
    appSubtitle: "ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",
    closeLabel: "ዕጾ",
    launcherLabel: "ሓገዝ",
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
    recordingState: "ይሰምዕ ኣለኹ...",
    transcribingState: "ናብ ጽሑፍ ይቕየር ኣሎ...",
    voicePreviewNotice: "ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ።",
    micError: "ማይክሮፎን ክርከብ ኣይተኻእለን።",
    lookingInCourse: "ኣብ ኮርስ ይድለ ኣሎ...",
    answerHeading: "መልሲ",
    listenButton: "ስማዕ",
    pauseButton: "ኣዕርፍ",
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
  },
  ar: {
    appTitle: "مساعد سافانا بريدج",
    appSubtitle: "اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",
    closeLabel: "إغلاق النافذة",
    launcherLabel: "المساعدة والمساعد",
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
    recordingState: "جاري الاستماع... اضغط للإنهاء",
    transcribingState: "جاري تحويل الصوت إلى نص...",
    voicePreviewNotice: "تم تحويل الصوت إلى نص. يمكنك تعديله قبل الإرسال.",
    micError: "الميكروفون غير متوفر.",
    lookingInCourse: "جاري البحث في محتوى الدورة...",
    answerHeading: "الإجابة",
    listenButton: "استماع",
    pauseButton: "إيقاف مؤقت",
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
  },
};

const STYLES = `
  :host {
    --b-font: var(--bs-body-font-family, system-ui, -apple-system, "Noto Sans Ethiopic", "Nyala", sans-serif);
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
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border: 2px solid var(--b-primary-contrast);
    border-radius: 2rem;
    padding: 0.625rem 1.25rem;
    box-shadow: var(--b-shadow);
    font-weight: 700;
  }
  .launcher:hover {
    background: var(--b-primary-hover);
  }

  /* Open Panel */
  .panel {
    position: fixed;
    inset: auto 1rem 5rem auto;
    width: min(28rem, calc(100vw - 1.5rem));
    height: min(44rem, calc(100vh - 6.5rem));
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
  }

  .title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .lang-toggle-btn {
    font-size: 0.875rem;
    padding: 0.375rem 0.625rem;
    min-height: 2.75rem;
  }

  .lang-toggle-btn[aria-pressed="true"] {
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-color: var(--b-primary);
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
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
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
`;

export class BridgeAssistant extends HTMLElement {
  private isOpen = false;
  private currentLang: SupportedLanguage = "en";
  private textSize: "smaller" | "normal" | "larger" = "normal";
  private highContrast = false;
  private simpleMode = false;
  private isOffline = !navigator.onLine;

  private isThinking = false;
  private isRecording = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
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
  }

  disconnectedCallback(): void {
    if (this.telegramPollTimer) {
      window.clearInterval(this.telegramPollTimer);
      this.telegramPollTimer = null;
    }
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

  private setLanguage(lang: SupportedLanguage): void {
    this.currentLang = lang;
    sessionStorage.setItem("savanna_bridge_lang", lang);
    this.render();
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

  // --- Voice Input ---

  private async toggleVoiceInput(inputEl: HTMLInputElement): Promise<void> {
    if (this.isRecording) {
      this.stopVoiceRecording();
    } else {
      await this.startVoiceRecording(inputEl);
    }
  }

  private async startVoiceRecording(inputEl: HTMLInputElement): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(this.t("micError"));
      return;
    }
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
        const blob = new Blob(this.audioChunks, { type: mimeType });
        await this.sendAudioForTranscription(blob, mimeType, inputEl);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.updateMicButtonUI();
    } catch {
      alert(this.t("micError"));
    }
  }

  private stopVoiceRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
    this.isRecording = false;
    this.updateMicButtonUI();
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

  private async sendAudioForTranscription(blob: Blob, mediaType: string, inputEl: HTMLInputElement): Promise<void> {
    this.announce(this.t("transcribingState"));
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
          inputEl.value = (inputEl.value ? inputEl.value + " " : "") + data.transcript;
          inputEl.focus();
          this.announce(this.t("voicePreviewNotice"));
        }
      }
    } catch {
      // Transcription fallback
    }
  }

  // --- TTS Audio ---

  private async handleListen(msg: ChatMessage): Promise<void> {
    if (this.activeAudio && !this.activeAudio.paused && msg.isAudioPlaying) {
      this.activeAudio.pause();
      msg.isAudioPlaying = false;
      this.renderMessages();
      return;
    }

    try {
      const res = await fetch(`${this.apiBase}/api/v1/speech/synthesize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: msg.text,
          language: this.currentLang,
          speed: 1.0,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (this.activeAudio) this.activeAudio.pause();
        const audioUrl = data.audio_url?.startsWith("http") ? data.audio_url : `${this.apiBase}${data.audio_url || ""}`;
        this.activeAudio = new Audio(audioUrl);
        this.activeAudio.onended = () => {
          msg.isAudioPlaying = false;
          this.renderMessages();
        };
        this.activeAudio.play().catch(() => this.fallbackTTS(msg.text));
        msg.isAudioPlaying = true;
        this.renderMessages();
      } else {
        this.fallbackTTS(msg.text);
      }
    } catch {
      this.fallbackTTS(msg.text);
    }
  }

  private fallbackTTS(text: string): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.currentLang === "am" ? "am-ET" : "en-US";
      window.speechSynthesis.speak(u);
    }
  }

  // --- Q&A / Ask ---

  public async askQuestion(questionText: string, forceSimple = false): Promise<void> {
    const q = questionText.trim();
    if (!q || this.isThinking) return;

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
      } else {
        this.messages.push({
          id: `msg_${Date.now()}_err`,
          sender: "assistant",
          text: this.t("serverErrorNotice"),
          offerHuman: true,
        });
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
      this.messages.push({
        id: `msg_${Date.now()}_offline`,
        sender: "assistant",
        text: this.t("savedOnPhoneNotice"),
        offerHuman: true,
      });
    }

    this.renderMessages();
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

      <!-- Floating Launcher Button -->
      <button class="launcher" type="button" id="launcher-btn" 
              aria-expanded="${this.isOpen}" aria-controls="assistant-dialog" aria-haspopup="dialog">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>${this.t("launcherLabel")}</span>
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
            <!-- Language Switcher in native script -->
            <button type="button" class="lang-toggle-btn" id="btn-lang-am" 
                    aria-pressed="${this.currentLang === "am"}" aria-label="ቋንቋ ወደ አማርኛ ቀይር">
              አማርኛ
            </button>
            <button type="button" class="lang-toggle-btn" id="btn-lang-en" 
                    aria-pressed="${this.currentLang === "en"}" aria-label="Switch to English">
              English
            </button>
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

            ${
              isRefusal
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
            ${
              hasCitations
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
        if (msg) this.handleListen(msg);
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
    const langAm = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-lang-am")!;
    const langEn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-lang-en")!;
    const openSettingsBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-open-settings")!;
    const closeSettingsBtn = this.shadowRoot.querySelector<HTMLButtonElement>("#btn-close-settings")!;

    // Open/Close Dialog
    const closeDialog = (): void => {
      this.isOpen = false;
      dialog.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      (this.previousFocus ?? launcher).focus();
    };

    launcher.addEventListener("click", () => {
      this.previousFocus = document.activeElement as HTMLElement | null;
      this.isOpen = true;
      dialog.hidden = false;
      launcher.setAttribute("aria-expanded", "true");
      dialog.focus();
    });

    closeBtn.addEventListener("click", closeDialog);

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.isSettingsOpen) {
          this.isSettingsOpen = false;
          const settingsDialog = this.shadowRoot?.querySelector("#settings-dialog");
          if (settingsDialog) settingsDialog.setAttribute("hidden", "true");
        } else {
          closeDialog();
        }
      }
    });

    // Native Script Language Buttons
    langAm.addEventListener("click", () => this.setLanguage("am"));
    langEn.addEventListener("click", () => this.setLanguage("en"));

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

// Register both custom elements for full compatibility
if (!customElements.get("bridge-assistant")) {
  customElements.define("bridge-assistant", BridgeAssistant);
}
if (!customElements.get("db-assistant")) {
  customElements.define("db-assistant", class extends BridgeAssistant {});
}

