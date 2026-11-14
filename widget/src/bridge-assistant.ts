/**
 * Savanna Bridge Assistant (<bridge-assistant>)
 * Multilingual accessible learning and live help web component.
 *
 * Implements Milestones B-M1, B-M2, B-M3, B-M4:
 * - Accessible Dialog & polite live region
 * - Bilingual Amharic (አማርኛ) / English (with Oromo & Tigrinya support)
 * - Grounded retrieval Q&A with clickable citation links
 * - Low-confidence refusal with human handoff recommendation
 * - Voice input via Speech API / MediaRecorder with editable preview
 * - Read-aloud TTS on every answer with Play/Pause/Speed controls
 * - Sound-off equivalence (text always visible)
 * - Simple-mode explanation toggle
 * - Private support-needs self-declaration (Zero proof / ID required)
 * - Barrier-free account linking (Zero proof / ID required)
 * - Human mentor handoff with explicit learner consent
 * - Strict learner-controlled screen sharing
 * - High accessibility (WCAG 2.2 AA, >=44px touch targets, forced-colors, reduced-motion, 200% zoom)
 * - Offline resilience with sessionStorage caching
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
  citations?: Citation[];
  offerHuman?: boolean;
  reason?: "grounded" | "low_confidence" | "no_content" | "provider_unavailable";
  confidence?: number;
  audioUrl?: string;
  isAudioPlaying?: boolean;
}

export interface SupportNeedsData {
  needs: string[];
  other_text: string;
  preferred_contact_mode: "text" | "voice" | "video" | "telegram";
}

// Complete UI strings for English, Amharic, Afaan Oromo, and Tigrinya
const I18N: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appTitle: "Savanna Bridge Assistant",
    appSubtitle: "Ask questions, adjust support, or connect with a mentor",
    launcherLabel: "Help & Assistant",
    closeLabel: "Close dialog",
    chatTab: "Chat",
    supportTab: "Support Needs",
    linkTab: "Link Account",
    handoffTab: "Talk to a Person",
    inputPlaceholder: "Ask a question about this course...",
    sendButton: "Send",
    simpleModeLabel: "Simple explanation",
    simpleModeTitle: "Explain in shorter, simpler sentences",
    voiceInputLabel: "Voice input",
    recordingState: "Listening... click to finish",
    transcribingState: "Transcribing audio...",
    voicePreviewNotice: "Voice transcribed! You can edit the text before sending.",
    micError: "Microphone unavailable or permission denied. Please type your question.",
    readAloud: "Read Aloud",
    pause: "Pause",
    resume: "Resume",
    speed: "Speed",
    thinking: "Finding verified answer...",
    sourcesTitle: "Sources & Citations:",
    talkToPersonButton: "Talk to a person",
    refusalNotice: "I cannot verify this from the course materials. A human mentor can help you directly.",
    offlineNotice: "You are offline. Showing cached answers where available.",
    offlineUnavailable: "This action requires an internet connection. Please reconnect and try again.",
    supportTitle: "Private Support Preferences",
    supportZeroProofBanner: "No medical documentation, diagnosis, or proof required. All preferences are private and self-declared.",
    needExtraTime: "Extra response time for tests and questions",
    needScreenReader: "Screen reader friendly materials and alt text",
    needWritten: "Written questions and instructions",
    needStepFree: "Step-free wheelchair access / ground-floor space",
    needQuiet: "Quiet space with low sensory distractions",
    needOther: "Other support needs",
    otherPlaceholder: "Specify any other accommodations you need...",
    contactModeTitle: "Preferred contact mode for live help:",
    modeText: "Text chat",
    modeVoice: "Voice call",
    modeVideo: "Video call",
    modeTelegram: "Telegram message",
    saveSupportButton: "Save Support Preferences",
    supportSavedNotice: "Support preferences saved privately.",
    linkTitle: "Barrier-Free Account Linking",
    linkZeroProofBanner: "No national ID, phone number, or proof required. Link across devices using a temporary code.",
    generateCodeButton: "Generate One-Time Code",
    yourCodeIs: "Your 6-digit code:",
    codeExpiresNote: "Enter this code in Telegram bot with /confirm within 10 minutes.",
    orEnterCode: "Or enter code from Telegram:",
    codePlaceholder: "6-digit code (e.g. 123456)",
    confirmCodeButton: "Confirm Code",
    linkSuccessNotice: "Account linked successfully! Your preferences are now synchronized.",
    handoffTitle: "Connect with a Human Mentor",
    handoffConsentBanner: "You are connecting to a human mentor via a Jitsi Meet audio/video room. Screen sharing is completely optional and can only be started, viewed, or stopped by you from inside the meeting controls. The assistant will never start screen sharing automatically.",
    handoffConsentCheck: "I consent to connect with a human mentor",
    handoffReasonLabel: "What do you need help with? (Optional)",
    handoffReasonPlaceholder: "e.g., I'm stuck on Module 2 exercise...",
    requestMentorButton: "Request Human Help",
    requestingMentor: "Connecting with mentor...",
    mentorReadyTitle: "Your Live Help Room is Ready!",
    joinRoomButton: "Join Jitsi Meeting Room ↗",
    screenShareReminder: "Reminder: You are in full control of screen sharing. You can leave the room at any time.",
    leaveRoomButton: "Leave / Close Help Request",
    requestClosedNotice: "Live help request closed.",
  },
  am: {
    appTitle: "የሳቫና ብሪጅ ረዳት",
    appSubtitle: "ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",
    launcherLabel: "እርዳታ እና ረዳት",
    closeLabel: "መስኮቱን ዝጋ",
    chatTab: "ውይይት",
    supportTab: "የድጋፍ ፍላጎቶች",
    linkTab: "መለያ ማገናኘት",
    handoffTab: "ከሰው ጋር ተነጋገር",
    inputPlaceholder: "ስለዚህ ኮርስ ጥያቄ ይጠይቁ...",
    sendButton: "ላክ",
    simpleModeLabel: "ቀላል ማብራሪያ",
    simpleModeTitle: "በቀላል እና አጫጭር ዓረፍተ ነገሮች አስረዳኝ",
    voiceInputLabel: "በድምጽ ይጠይቁ",
    recordingState: "እያዳመጥኩ ነው... ለማጠናቀቅ ይጫኑ",
    transcribingState: "ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",
    voicePreviewNotice: "ድምጽዎ ወደ ጽሑፍ ተቀይሯል! ከመላክዎ በፊት ማስተካከል ይችላሉ።",
    micError: "ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",
    readAloud: "አንብብልኝ",
    pause: "አቁም",
    resume: "ቀጥል",
    speed: "ፍጥነት",
    thinking: "የተረጋገጠ መልስ በመፈለግ ላይ...",
    sourcesTitle: "ማጣቀሻዎች እና ምንጮች፡",
    talkToPersonButton: "ከሰው ጋር ተነጋገር",
    refusalNotice: "ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። የሰው አማካሪ በቀጥታ ሊረዳዎት ይችላል።",
    offlineNotice: "አሁን ከመስመር ውጭ ነዎት። የቀደሙ መልሶች እዚህ ይታያሉ።",
    offlineUnavailable: "ይህ እርምጃ የበይነመረብ ግንኙነት ይፈልጋል። እባክዎ እንደገና ይገናኙ።",
    supportTitle: "የግል የድጋፍ ፍላጎቶች",
    supportZeroProofBanner: "ምንም ዓይነት የህክምና ማስረጃ ወይም ማረጋገጫ አያስፈልግም። ምርጫዎችዎ ሚስጥራዊ ናቸው።",
    needExtraTime: "ለፈተናዎች እና ጥያቄዎች ተጨማሪ ጊዜ",
    needScreenReader: "ለስክሪን አንባቢ ምቹ የሆነ አቀራረብ",
    needWritten: "የጽሑፍ ጥያቄዎች እና መመሪያዎች",
    needStepFree: "ደረጃ የሌለው የመንኮራኩር ወንበር መዳረሻ / ምድር ቤት",
    needQuiet: "ጸጥ ያለ እና ረብሻ የሌለበት ቦታ",
    needOther: "ሌሎች የድጋፍ ፍላጎቶች",
    otherPlaceholder: "ሌላ የሚፈልጉትን ማስተናገጃ ይግለጹ...",
    contactModeTitle: "ለቀጥታ እርዳታ የሚመርጡት የመገናኛ ዘዴ፡",
    modeText: "የጽሑፍ ውይይት",
    modeVoice: "የድምጽ ጥሪ",
    modeVideo: "የቪዲዮ ጥሪ",
    modeTelegram: "የቴሌግራም መልእክት",
    saveSupportButton: "የድጋፍ ምርጫዎችን አስቀምጥ",
    supportSavedNotice: "የድጋፍ ምርጫዎችዎ በሚስጥር ተቀምጠዋል።",
    linkTitle: "ያለ ገደብ መለያ ማገናኘት",
    linkZeroProofBanner: "መታወቂያ ወይም ስልክ ቁጥር አያስፈልግም። በጊዜያዊ ኮድ በየትኛውም መሣሪያ ያገናኙ።",
    generateCodeButton: "ባለ 6-አሃዝ ኮድ አውጣ",
    yourCodeIs: "የእርስዎ ኮድ፡",
    codeExpiresNote: "ይህን ኮድ በቴሌግራም ቦት ውስጥ በ /confirm በ10 ደቂቃ ውስጥ ያስገቡ።",
    orEnterCode: "ወይም ከቴሌግራም የተቀበሉትን ኮድ ያስገቡ፡",
    codePlaceholder: "ባለ 6-አሃዝ ኮድ (ለምሳሌ 123456)",
    confirmCodeButton: "ኮዱን አረጋግጥ",
    linkSuccessNotice: "መለያዎ በተሳካ ሁኔታ ተገናኝቷል! ምርጫዎችዎ ተመሳስለዋል።",
    handoffTitle: "ከሰው አማካሪ ጋር ይገናኙ",
    handoffConsentBanner: "በ Jitsi Meet የድምጽ/ቪዲዮ ክፍል ከአማካሪ ጋር ይገናኛሉ። የስክሪን ማጋራት ሙሉ በሙሉ በእርስዎ ምርጫ ላይ የተመሰረተ ሲሆን፣ እርስዎ ብቻ ከስብሰባው ውስጥ ሆነው ሊጀምሩ ወይም ሊያቆሙ ይችላሉ። ረዳቱ በራሱ ስክሪንዎን አያጋራም።",
    handoffConsentCheck: "ከሰው አማካሪ ጋር ለመገናኘት ተስማምቻለሁ",
    handoffReasonLabel: "ምን እንዲረዳዎት ይፈልጋሉ? (አማራጭ)",
    handoffReasonPlaceholder: "ለምሳሌ፡ በሞጁል 2 መልመጃ ላይ ተቸግሬ ነው...",
    requestMentorButton: "የሰው እርዳታ ጠይቅ",
    requestingMentor: "ከአማካሪ ጋር በማገናኘት ላይ...",
    mentorReadyTitle: "የቀጥታ እርዳታ ክፍልዎ ዝግጁ ነው!",
    joinRoomButton: "ወደ Jitsi ስብሰባ ክፍል ግባ ↗",
    screenShareReminder: "ማሳሰቢያ፡ የስክሪን ማጋራት ሙሉ በሙሉ በእርስዎ ቁጥጥር ስር ነው። በማንኛውም ጊዜ ክፍሉን መልቀቅ ይችላሉ።",
    leaveRoomButton: "ክፍሉን ልቀቅ / ጥያቄውን ዝጋ",
    requestClosedNotice: "የእርዳታ ጥያቄው ተዘግቷል።",
  },
  om: {
    appTitle: "Gargaaraa Saavaanaa Biriijii",
    appSubtitle: "Gaaffii gaafadhaa, deeggarsa barbaaddan filadhaa, ykn nama waliin haasa'aa",
    launcherLabel: "Gargaarsa",
    closeLabel: "Cufi",
    chatTab: "Haasaa",
    supportTab: "Fedhii Deeggarsaa",
    linkTab: "Herrega Walqabsiisi",
    handoffTab: "Nama Waliin Dubbadhu",
    inputPlaceholder: "Waa'ee barnoota kanaa gaaffii gaafadhaa...",
    sendButton: "Ergi",
    simpleModeLabel: "Ibsa salphaa",
    simpleModeTitle: "Hima gabaabaa fi salphaan naaf ibsi",
    voiceInputLabel: "Sagaleedhaan gaafadhu",
    recordingState: "Dhaggeeffachaa jira... xumuruuf cuqaasaa",
    transcribingState: "Sagalee gara barruutti jijjiiraa jira...",
    voicePreviewNotice: "Sagaleen gara barruutti jijjiirameera! Erguun dura sirreessuu dandeessu.",
    micError: "Maaykirofooniin hin argamne. Barruudhaan barreessaa.",
    readAloud: "Naaf dubbisi",
    pause: "Dhaabi",
    resume: "Itti fufi",
    speed: "Saffisa",
    thinking: "Deebii mirkanaa'e barbaadaa jira...",
    sourcesTitle: "Madda Deebii:",
    talkToPersonButton: "Nama waliin dubbadhu",
    refusalNotice: "Qabiyyee barnootaa keessaa mirkaneessuu hin dandeenye. Gargaarsi namaa ni barbaachisaa?",
    offlineNotice: "Tajaajila toora irraa ala jirtu.",
    offlineUnavailable: "Kuni intarneetii barbaada.",
    supportTitle: "Fedhii Deeggarsaa Dhuunfaa",
    supportZeroProofBanner: "Waraqaan fayyaa ykn ragaan kamiyyuu hin barbaachisu. Filannoon keessan dhuunfaadha.",
    needExtraTime: "Qorumsaaf yeroo dabalataa",
    needScreenReader: "Dubbisaa iskiriiniif kan mijate",
    needWritten: "Qajeelfama fi gaaffiiwwan barruudhaan",
    needStepFree: "Bakka sadarkaa hin qabne / lafa irra",
    needQuiet: "Bakka callisaa",
    needOther: "Deeggarsa biraa",
    otherPlaceholder: "Fedhii biraa qabdan ibsaa...",
    contactModeTitle: "Mala qunnamtii filattan:",
    modeText: "Barruu",
    modeVoice: "Sagalee",
    modeVideo: "Viidiyoo",
    modeTelegram: "Telegiraamii",
    saveSupportButton: "Fedhii Deeggarsaa Galmeessi",
    supportSavedNotice: "Fedhiin deeggarsaa galmaa'eera.",
    linkTitle: "Herrega Walqabsiisuu",
    linkZeroProofBanner: "Waraqaan eenyummaa hin barbaachisu.",
    generateCodeButton: "Koodii Baasi",
    yourCodeIs: "Koodiin keessan:",
    codeExpiresNote: "Koodii kana daqiiqaa 10 keessatti Telegiraamii irratti galchaa.",
    orEnterCode: "Ykn koodii Telegiraamii irraa dhufe galchaa:",
    codePlaceholder: "Koodii lakkoofsa 6",
    confirmCodeButton: "Koodii Mirkaneessi",
    linkSuccessNotice: "Milkaa'inaan walqabateera!",
    handoffTitle: "Gorsaa Waliin Walqunnamaa",
    handoffConsentBanner: "Kutaa Jitsi Meet keessatti gorsaa waliin walqunnamtu. Iskiriinii qooduun fedhii keessan qofaan ta'a.",
    handoffConsentCheck: "Gorsaa waliin walqunnamuuf walii galeera",
    handoffReasonLabel: "Maal irratti gargaarsa barbaaddu?",
    handoffReasonPlaceholder: "Ibsaa...",
    requestMentorButton: "Gargaarsa Namaa Gaafadhu",
    requestingMentor: "Walqunnamsiisaa jira...",
    mentorReadyTitle: "Kutaan keessan qophiidha!",
    joinRoomButton: "Kutaa Jitsi Seenaa ↗",
    screenShareReminder: "Iskiriinii qooduun to'annoo keessan jala jira.",
    leaveRoomButton: "Kutaa Dhiisaa",
    requestClosedNotice: "Gaaffiin cufameera.",
  },
  ti: {
    appTitle: "ናይ ሳቫና ብሪጅ ሓጋዚ",
    appSubtitle: "ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",
    launcherLabel: "ሓገዝ",
    closeLabel: "ዕጾ",
    chatTab: "ዕላል",
    supportTab: "ናይ ሓገዝ ድሌታት",
    linkTab: "ኣካውንት ኣተኣሳስር",
    handoffTab: "ምስ ሰብ ተዛረብ",
    inputPlaceholder: "ብዛዕባዚ ኮርስ ሕቶ ሕተቱ...",
    sendButton: "ስደድ",
    simpleModeLabel: "ቀሊል መብርሂ",
    simpleModeTitle: "ብሓጸርቲ ሓረጋት ኣረድኣኒ",
    voiceInputLabel: "ብድምጺ ሕተቱ",
    recordingState: "ይሰምዕ ኣለኹ... ንምውዳእ ጠውቑ",
    transcribingState: "ናብ ጽሑፍ ይቕየር ኣሎ...",
    voicePreviewNotice: "ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ! ቅድሚ ምስዳድኩም ከተዐርይዎ ትኽእሉ ኢኹም።",
    micError: "ማይክሮፎን ክርከብ ኣይተኻእለን። ብጽሑፍ ሕተቱ።",
    readAloud: "ኣንብበለይ",
    pause: "ኣዕርፍ",
    resume: "ቀጽል",
    speed: "ቅልጣፈ",
    thinking: "መልሲ ይድለ ኣሎ...",
    sourcesTitle: "ምንጭታት፡",
    talkToPersonButton: "ምስ ሰብ ተዛረብ",
    refusalNotice: "እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን። ናይ ሰብ ሓገዝ ይድለ ዶ?",
    offlineNotice: "መስመር ተቛሪጹ ኣሎ።",
    offlineUnavailable: "እዚ ኢንተርነት ይደሊ እዩ።",
    supportTitle: "ናይ ውልቂ ሓገዝ ምርጫታት",
    supportZeroProofBanner: "ሕክምናዊ መርትዖ ወይ ምስክር ወረቐት ኣየድልን እዩ። ምርጫታትኩም ምስጢራዊ እዩ።",
    needExtraTime: "ተወሳኺ ግዜ ንፈተናታትን ሕቶታትን",
    needScreenReader: "ንስክሪን ኣንባቢ ምቹእ",
    needWritten: "ናይ ጽሑፍ መምርሒታትን ሕቶታትን",
    needStepFree: "ደረጃ ዘይብሉ ምቹእ መእተዊ",
    needQuiet: "ህዱእ ቦታ",
    needOther: "ካልእ ድሌታት",
    otherPlaceholder: "ካልእ ድሌትኩም ግለጹ...",
    contactModeTitle: "ትመርጽዎ ናይ ርክብ መገዲ፡",
    modeText: "ጽሑፍ",
    modeVoice: "ድምጺ",
    modeVideo: "ቪድዮ",
    modeTelegram: "ቴሌግራም",
    saveSupportButton: "ምርጫታት ኣቐምጥ",
    supportSavedNotice: "ምርጫታትኩም ተቐሚጡ ኣሎ።",
    linkTitle: "ኣካውንት ምትእስሳር",
    linkZeroProofBanner: "መታወቂያ ኣየድልን። ብግዚያዊ ኮድ ኣተኣሳስሩ።",
    generateCodeButton: "ኮድ ኣውጽእ",
    yourCodeIs: "ኮድኩም፡",
    codeExpiresNote: "ኣብ ቴሌግራም ብ /confirm ኣብ ውሽጢ 10 ደቒቕ የእትውዎ።",
    orEnterCode: "ካብ ቴሌግራም ዝመጸ ኮድ የእትዉ፡",
    codePlaceholder: "ናይ 6-ኣሃዝ ኮድ",
    confirmCodeButton: "ኮድ ኣረጋግጽ",
    linkSuccessNotice: "ብዓወት ተተሓሒዙ ኣሎ!",
    handoffTitle: "ምስ ሰብ መካሪ ተራኸቡ",
    handoffConsentBanner: "ኣብ Jitsi Meet ምስ መካሪ ትራኸቡ። ስክሪን ምክፋል ብፍቓድኩም ጥራይ እዩ።",
    handoffConsentCheck: "ምስ መካሪ ንምርኻብ ተሰማሚዐ ኣለኹ",
    handoffReasonLabel: "እንታይ ሓገዝ ትደልዩ?",
    handoffReasonPlaceholder: "ግለጹ...",
    requestMentorButton: "ናይ ሰብ ሓገዝ ሕተት",
    requestingMentor: "ይራኸብ ኣሎ...",
    mentorReadyTitle: "ክፍልኹም ድሉው እዩ!",
    joinRoomButton: "ናብ Jitsi ክፍል እቶ ↗",
    screenShareReminder: "ስክሪን ምክፋል ኣብ ትሕቲ ቁጽጽርኩም እዩ።",
    leaveRoomButton: "ክፍሊ ሕደጉ",
    requestClosedNotice: "ሕቶ ተዓጽዩ ኣሎ።",
  },
  ar: {
    appTitle: "مساعد سافانا بريدج",
    appSubtitle: "اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",
    launcherLabel: "المساعدة والمساعد",
    closeLabel: "إغلاق النافذة",
    chatTab: "المحادثة",
    supportTab: "احتياجات الدعم",
    linkTab: "ربط الحساب",
    handoffTab: "التحدث مع شخص",
    inputPlaceholder: "اطرح سؤالاً حول هذه الدورة التدريبية...",
    sendButton: "إرسال",
    simpleModeLabel: "شرح مبسط",
    simpleModeTitle: "اشرح بجمل أقصر وأبسط",
    voiceInputLabel: "الإدخال الصوتي",
    recordingState: "جاري الاستماع... اضغط للإنهاء",
    transcribingState: "جاري تحويل الصوت إلى نص...",
    voicePreviewNotice: "تم تفريغ الصوت! يمكنك تعديل النص قبل الإرسال.",
    micError: "الميكروفون غير متوفر أو تم رفض الإذن. يرجى كتابة سؤالك.",
    readAloud: "قراءة بصوت عالٍ",
    pause: "إيقاف مؤقت",
    resume: "استئناف",
    speed: "السرعة",
    thinking: "جاري البحث عن إجابة موثقة...",
    sourcesTitle: "المصادر والمراجع:",
    talkToPersonButton: "التحدث مع شخص",
    refusalNotice: "لا يمكنني التحقق من ذلك من محتوى الدورة. يمكن لمرشد بشري مساعدتك مباشرة.",
    offlineNotice: "أنت غير متصل بالإنترنت. يتم عرض الإجابات المحفوظة.",
    offlineUnavailable: "يتطلب هذا الإجراء اتصالاً بالإنترنت. يرجى إعادة الاتصال والمحاولة.",
    supportTitle: "تفضيلات الدعم الخاصة",
    supportZeroProofBanner: "لا يُطلب أي تشخيص أو وثائق طبية أو إثبات هوية. جميع التفضيلات سرية ومصرح بها ذاتياً.",
    needExtraTime: "وقت استجابة إضافي للاختبارات والأسئلة",
    needScreenReader: "مواد متوافقة مع قارئ الشاشة ونصوص بديلة",
    needWritten: "أسئلة وتعليمات مكتوبة",
    needStepFree: "تسهيلات الوصول للكراسي المتحركة",
    needQuiet: "مساحة هادئة مع مشتتات حسية منخفضة",
    needOther: "احتياجات دعم أخرى",
    otherPlaceholder: "حدد أي تسهيلات وصول أخرى تحتاجها...",
    contactModeTitle: "طريقة التواصل المفضلة للمساعدة المباشرة:",
    modeText: "محادثة نصية",
    modeVoice: "مكالمة صوتية",
    modeVideo: "مكالمة فيديو",
    modeTelegram: "رسالة تيليجرام",
    saveSupportButton: "حفظ تفضيلات الدعم",
    supportSavedNotice: "تم حفظ تفضيلات الدعم بسرية.",
    linkTitle: "ربط الحساب بدون عوائق",
    linkZeroProofBanner: "لا يلزم رقم هوية وطنية أو رقم هاتف. اربط عبر الأجهزة باستخدام رمز مؤقت.",
    generateCodeButton: "توليد رمز لمرة واحدة",
    yourCodeIs: "الرمز الخاص بك المكون من 6 أرقام:",
    codeExpiresNote: "أدخل هذا الرمز في بوت التيليجرام باستخدام /confirm خلال 10 دقائق.",
    orEnterCode: "أو أدخل الرمز من تيليجرام:",
    codePlaceholder: "رمز من 6 أرقام (مثال 123456)",
    confirmCodeButton: "تأكيد الرمز",
    linkSuccessNotice: "تم ربط الحساب بنجاح! تفضيلاتك متزامنة الآن.",
    handoffTitle: "التواصل مع مرشد بشري",
    handoffConsentBanner: "أنت تتصل بمرشد بشري عبر غرفة صوت وفيديو في Jitsi Meet. مشاركة الشاشة اختيارية بالكامل ولا يمكن بدؤها أو إيقافها إلا بواسطتك. المساعد لن يبدأ مشاركة الشاشة تلقائياً أبداً.",
    handoffConsentCheck: "أوافق على التواصل مع مرشد بشري",
    handoffReasonLabel: "ما الذي تحتاج إلى مساعدة فيه؟ (اختياري)",
    handoffReasonPlaceholder: "مثال: أحتاج مساعدة في تمرين الوحدة الثانية...",
    requestMentorButton: "طلب مساعدة بشرية",
    requestingMentor: "جاري الاتصال بالمرشد...",
    mentorReadyTitle: "غرفة المساعدة المباشرة جاهزة!",
    joinRoomButton: "الانضمام لغرفة Jitsi ↗",
    screenShareReminder: "تذكير: أنت تتحكم بالكامل في مشاركة الشاشة. يمكنك مغادرة الغرفة في أي وقت.",
    leaveRoomButton: "مغادرة / إغلاق طلب المساعدة",
    requestClosedNotice: "تم إغلاق طلب المساعدة المباشرة.",
  },
};

const STYLES = `
  :host {
    --b-font: system-ui, -apple-system, "Noto Sans Ethiopic", "Nyala", "Abyssinica SIL", sans-serif;
    --b-bg: #ffffff;
    --b-text: #0f172a;
    --b-text-muted: #475569;
    --b-border: #cbd5e1;
    --b-primary: #1d4ed8;
    --b-primary-hover: #1e40af;
    --b-primary-contrast: #ffffff;
    --b-surface: #f8fafc;
    --b-surface-alt: #f1f5f9;
    --b-accent: #0284c7;
    --b-focus: #2563eb;
    --b-radius: 0.75rem;
    --b-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    font-family: var(--b-font);
    font-size: 1rem;
    line-height: 1.5;
    box-sizing: border-box;
    color: var(--b-text);
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* High-Contrast / Forced-Colors Mode (WCAG 2.2 AA) */
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
    button, input, textarea, select {
      border: 2px solid ButtonText !important;
    }
  }

  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }

  [hidden] {
    display: none !important;
  }

  /* Target Size: Min 44x44px for touch targets */
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

  .btn-danger {
    background: #dc2626;
    color: #ffffff;
    border-color: #dc2626;
  }

  .btn-danger:hover {
    background: #b91c1c;
  }

  /* Launcher Floating Button */
  .launcher {
    position: fixed;
    inset: auto 1.25rem 1.25rem auto;
    z-index: 2147483647;
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border: 2px solid var(--b-primary-contrast);
    border-radius: 2rem;
    padding: 0.625rem 1.25rem;
    box-shadow: var(--b-shadow);
    font-size: 1rem;
    font-weight: 700;
    min-height: 3rem;
  }

  /* Dialog Panel - 200% Zoom safe: uses min() and responsive padding */
  .panel {
    position: fixed;
    inset: auto 1rem 5rem auto;
    width: min(28rem, calc(100vw - 2rem));
    height: min(42rem, calc(100vh - 6.5rem));
    max-height: calc(100vh - 6.5rem);
    display: flex;
    flex-direction: column;
    background: var(--b-bg);
    color: var(--b-text);
    border: 2px solid var(--b-border);
    border-radius: var(--b-radius);
    box-shadow: var(--b-shadow);
    z-index: 2147483647;
    overflow: hidden;
  }

  /* Dialog Header */
  .header {
    padding: 0.75rem 1rem;
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
    font-size: 1.125rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    margin: 0;
    font-size: 0.75rem;
    color: var(--b-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
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
    min-height: 2.75rem;
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 0;
    background: transparent;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.5rem 0.25rem;
    white-space: nowrap;
    color: var(--b-text-muted);
  }

  .tab-btn[aria-selected="true"] {
    border-bottom-color: var(--b-primary);
    color: var(--b-primary);
    background: var(--b-bg);
    font-weight: 700;
  }

  /* Tab Panels */
  .tab-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
  }

  /* Chat Log - polite live region */
  .chat-log {
    flex: 1;
    overflow-y: auto;
    padding: 0.875rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--b-bg);
  }

  .message {
    max-width: 88%;
    padding: 0.625rem 0.875rem;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    line-height: 1.45;
    word-break: break-word;
  }

  .message-learner {
    align-self: flex-end;
    background: var(--b-primary);
    color: var(--b-primary-contrast);
    border-bottom-right-radius: 0.125rem;
  }

  .message-assistant {
    align-self: flex-start;
    background: var(--b-surface-alt);
    color: var(--b-text);
    border: 1px solid var(--b-border);
    border-bottom-left-radius: 0.125rem;
  }

  .message-text {
    margin: 0 0 0.5rem 0;
  }
  .message-text:last-child {
    margin-bottom: 0;
  }

  /* Citations */
  .citations {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--b-border);
    font-size: 0.8125rem;
  }

  .citations-title {
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--b-text-muted);
  }

  .citation-link {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--b-primary);
    text-decoration: underline;
    word-break: break-all;
  }

  /* Confidence / Refusal Box */
  .refusal-box {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #991b1b;
  }

  /* Audio Controls Row */
  .audio-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--b-border);
    flex-wrap: wrap;
  }

  .speed-select {
    font-size: 0.8125rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid var(--b-border);
    background: var(--b-surface);
    color: var(--b-text);
    min-height: 2rem;
  }

  /* Chat Input Area */
  .chat-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--b-border);
    background: var(--b-surface);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .simple-mode-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: var(--b-text-muted);
  }

  .chat-input-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .chat-input {
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
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }

  /* Form & Settings Panels */
  .scroll-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .banner {
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.4;
    border: 1px solid var(--b-border);
    background: var(--b-surface-alt);
  }

  .banner-info {
    border-color: #bfdbfe;
    background: #eff6ff;
    color: #1e40af;
  }

  .banner-warning {
    border-color: #fef08a;
    background: #fefce8;
    color: #854d0e;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    font-size: 0.9375rem;
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"],
  .checkbox-label input[type="radio"] {
    margin-top: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    accent-color: var(--b-primary);
  }

  .code-display {
    font-family: monospace;
    font-size: 2rem;
    letter-spacing: 0.35rem;
    text-align: center;
    padding: 1rem;
    background: var(--b-surface-alt);
    border: 2px dashed var(--b-primary);
    border-radius: 0.5rem;
    font-weight: 700;
    color: var(--b-primary);
  }

  .status-announcement {
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  /* Offline indicator */
  .offline-bar {
    background: #78350f;
    color: #fef3c7;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    text-align: center;
    flex-shrink: 0;
  }
`;

export class BridgeAssistant extends HTMLElement {
  private activeTab: "chat" | "support" | "link" | "handoff" = "chat";
  private previousFocus: HTMLElement | null = null;
  private currentLang: SupportedLanguage = "en";
  private simpleMode = false;
  private isRecording = false;
  private isOpen = false;

  private isThinking = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private activeAudio: HTMLAudioElement | null = null;
  private messages: ChatMessage[] = [];
  private isOffline = !navigator.onLine;

  private supportNeeds: SupportNeedsData = {
    needs: ["written_instructions"],
    other_text: "",
    preferred_contact_mode: "text",
  };

  private activeHandoff: { id: string; room_url: string; status: string } | null = null;
  private currentLinkCode: { code: string; expires_at: string } | null = null;

  // Attributes
  get apiBase(): string {
    return this.getAttribute("data-api") || "http://localhost:8000";
  }

  get courseId(): string {
    return this.getAttribute("data-course") || "course_demo";
  }

  get widgetToken(): string | null {
    return this.getAttribute("data-token");
  }

  connectedCallback(): void {
    if (this.shadowRoot) return;

    // Restore cached language or respect data-lang
    const attrLang = this.getAttribute("data-lang") as SupportedLanguage | null;
    const cachedLang = sessionStorage.getItem("savanna_bridge_lang") as SupportedLanguage | null;
    if (attrLang && (attrLang in I18N)) {
      this.currentLang = attrLang;
    } else if (cachedLang && (cachedLang in I18N)) {
      this.currentLang = cachedLang;
    }

    // Restore chat history from sessionStorage
    this.restoreCachedChat();

    this.attachShadow({ mode: "open" });
    this.render();
    this.setupListeners();
    this.setupNetworkMonitor();

    // Fetch initial support needs in background
    this.fetchSupportNeeds();
  }

  private t(key: string): string {
    const langDict = I18N[this.currentLang] || I18N.en;
    return langDict[key] || I18N.en[key] || key;
  }

  private setLanguage(lang: SupportedLanguage): void {
    this.currentLang = lang;
    sessionStorage.setItem("savanna_bridge_lang", lang);
    this.render();
    this.setupListeners();
    const dialog = this.shadowRoot?.querySelector<HTMLElement>("[role=dialog]");
    if (dialog && this.isOpen) {
      dialog.focus();
    }
  }

  private setupNetworkMonitor(): void {
    window.addEventListener("online", () => {
      this.isOffline = false;
      this.render();
    });
    window.addEventListener("offline", () => {
      this.isOffline = true;
      this.render();
    });
  }

  private restoreCachedChat(): void {
    try {
      const saved = sessionStorage.getItem("savanna_bridge_chat_cache");
      if (saved) {
        this.messages = JSON.parse(saved);
      }
    } catch {
      this.messages = [];
    }
  }

  private saveChatCache(): void {
    try {
      sessionStorage.setItem("savanna_bridge_chat_cache", JSON.stringify(this.messages.slice(-20)));
    } catch {
      // Ignore sessionStorage quotas
    }
  }

  private getAuthHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.widgetToken) {
      headers["X-Widget-Token"] = this.widgetToken;
    }
    return headers;
  }

  private async fetchSupportNeeds(): Promise<void> {
    try {
      const res = await fetch(`${this.apiBase}/support-needs`, {
        headers: this.getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        this.supportNeeds = {
          needs: data.needs || [],
          other_text: data.other_text || "",
          preferred_contact_mode: data.preferred_contact_mode || "text",
        };
      }
    } catch {
      // Use defaults if API is unavailable
    }
  }

  // Voice Input Implementation
  private async toggleVoiceInput(inputEl: HTMLInputElement): Promise<void> {
    if (this.isRecording) {
      this.stopVoiceRecording(inputEl);
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

      this.mediaRecorder = new MediaRecorder(stream, { credentials: false } as MediaRecorderOptions);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });
        await this.sendAudioForTranscription(audioBlob, mimeType, inputEl);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.updateVoiceButtonUI();
    } catch (err) {
      console.warn("Microphone access error:", err);
      alert(this.t("micError"));
    }
  }

  private stopVoiceRecording(_inputEl: HTMLInputElement): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
    this.isRecording = false;
    this.updateVoiceButtonUI();
  }

  private updateVoiceButtonUI(): void {
    const micBtn = this.shadowRoot?.querySelector<HTMLButtonElement>(".mic-btn");
    if (!micBtn) return;
    if (this.isRecording) {
      micBtn.classList.add("recording");
      micBtn.setAttribute("aria-pressed", "true");
      micBtn.setAttribute("title", this.t("recordingState"));
    } else {
      micBtn.classList.remove("recording");
      micBtn.setAttribute("aria-pressed", "false");
      micBtn.setAttribute("title", this.t("voiceInputLabel"));
    }
  }

  private async sendAudioForTranscription(
    blob: Blob,
    mediaType: string,
    inputEl: HTMLInputElement
  ): Promise<void> {
    const statusEl = this.shadowRoot?.querySelector<HTMLElement>(".transcription-status");
    if (statusEl) statusEl.textContent = this.t("transcribingState");

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const res = reader.result as string;
          const base64 = res.split(",")[1] || "";
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(blob);
      const audioBase64 = await base64Promise;

      const res = await fetch(`${this.apiBase}/speech/transcribe`, {
        method: "POST",
        headers: this.getAuthHeaders(),
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
          // Editable preview: populate input field so the learner can edit before sending!
          inputEl.value = (inputEl.value ? inputEl.value + " " : "") + data.transcript;
          inputEl.focus();
          if (statusEl) statusEl.textContent = this.t("voicePreviewNotice");
        }
      } else {
        if (statusEl) statusEl.textContent = "";
      }
    } catch {
      if (statusEl) statusEl.textContent = "";
    }
  }

  // Read-Aloud TTS Implementation
  private async handleReadAloud(msg: ChatMessage, speed = 1): Promise<void> {
    if (this.activeAudio && !this.activeAudio.paused && msg.isAudioPlaying) {
      this.activeAudio.pause();
      msg.isAudioPlaying = false;
      this.renderChatMessages();
      return;
    }

    // Call /speech/synthesize
    try {
      const res = await fetch(`${this.apiBase}/speech/synthesize`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          text: msg.text,
          language: this.currentLang,
          speed: speed,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (this.activeAudio) {
          this.activeAudio.pause();
        }
        this.activeAudio = new Audio(data.audio_url);
        this.activeAudio.playbackRate = speed;
        this.activeAudio.onended = () => {
          msg.isAudioPlaying = false;
          this.renderChatMessages();
        };
        this.activeAudio.play().catch(() => {
          // Fallback to Web Speech API
          this.fallbackSpeechSynthesis(msg.text, speed);
        });
        msg.isAudioPlaying = true;
        this.renderChatMessages();
      } else {
        this.fallbackSpeechSynthesis(msg.text, speed);
      }
    } catch {
      this.fallbackSpeechSynthesis(msg.text, speed);
    }
  }

  private fallbackSpeechSynthesis(text: string, speed = 1): void {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      utterance.lang = this.currentLang === "am" ? "am-ET" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  }

  // Q&A with /ask
  private async askQuestion(questionText: string): Promise<void> {
    const q = questionText.trim();
    if (!q || this.isThinking) return;

    const learnerMsg: ChatMessage = {
      id: `m_${Date.now()}_learner`,
      sender: "learner",
      text: q,
    };
    this.messages.push(learnerMsg);
    this.isThinking = true;
    this.renderChatMessages();

    // Scroll chat to bottom
    const chatLog = this.shadowRoot?.querySelector(".chat-log");
    if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;

    try {
      const res = await fetch(`${this.apiBase}/ask`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          question: q,
          language: this.currentLang,
          course_id: this.courseId,
          simple_mode: this.simpleMode,
          channel: "web",
        }),
      });

      this.isThinking = false;

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: `m_${Date.now()}_assistant`,
          sender: "assistant",
          text: data.answer,
          citations: data.citations || [],
          offerHuman: data.offer_human,
          reason: data.reason,
          confidence: data.confidence,
        };
        this.messages.push(assistantMsg);
        this.saveChatCache();
      } else {
        const errData = await res.json().catch(() => ({}));
        const errMsg = errData.error?.message || "An error occurred while fetching the answer.";
        this.messages.push({
          id: `m_${Date.now()}_err`,
          sender: "assistant",
          text: errMsg,
          offerHuman: true,
        });
      }
    } catch {
      this.isThinking = false;
      this.messages.push({
        id: `m_${Date.now()}_err`,
        sender: "assistant",
        text: this.t("offlineNotice"),
        offerHuman: true,
      });
    }

    this.renderChatMessages();
    if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Account Linking Methods
  private async startAccountLink(): Promise<void> {
    try {
      const res = await fetch(`${this.apiBase}/link/start`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          session_id: `web_${Date.now()}`,
          channel: "web",
          learner_reference: "web_learner",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        this.currentLinkCode = {
          code: data.code,
          expires_at: data.expires_at,
        };
        this.renderTabContent();
      }
    } catch {
      alert(this.t("offlineUnavailable"));
    }
  }

  private async confirmAccountLink(code: string): Promise<void> {
    try {
      const res = await fetch(`${this.apiBase}/link/confirm`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          link_id: "link_web_user",
          code: code.trim(),
        }),
      });
      if (res.ok) {
        const statusBox = this.shadowRoot?.querySelector(".link-status");
        if (statusBox) {
          statusBox.textContent = this.t("linkSuccessNotice");
          statusBox.classList.remove("hidden");
        }
      } else {
        alert("Invalid or expired code. Please verify and try again.");
      }
    } catch {
      alert(this.t("offlineUnavailable"));
    }
  }

  // Handoff & Human Mentor Methods
  private async requestHandoff(contextReason?: string): Promise<void> {
    if (this.isOffline) {
      alert(this.t("offlineUnavailable"));
      return;
    }

    const consentBox = this.shadowRoot?.querySelector<HTMLInputElement>("#handoff-consent");
    if (consentBox && !consentBox.checked) {
      alert("Please check the consent box to proceed.");
      return;
    }

    const statusEl = this.shadowRoot?.querySelector(".handoff-status");
    if (statusEl) statusEl.textContent = this.t("requestingMentor");

    try {
      const res = await fetch(`${this.apiBase}/handoff`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          consent: true,
          learner_ref: "learner_web_user",
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
        this.activeHandoff = {
          id: data.id,
          room_url: data.room_url,
          status: data.status,
        };
        this.renderTabContent();
      } else {
        alert("Could not create handoff request. Please try again.");
      }
    } catch {
      alert(this.t("offlineUnavailable"));
    }
  }

  private async closeHandoff(): Promise<void> {
    if (!this.activeHandoff) return;
    try {
      await fetch(`${this.apiBase}/handoff/${this.activeHandoff.id}/close`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({}),
      });
    } catch {
      // Ignore
    }
    this.activeHandoff = null;
    this.renderTabContent();
  }

  // Support Needs Save
  private async saveSupportNeeds(needs: string[], otherText: string, contactMode: "text" | "voice" | "video" | "telegram"): Promise<void> {
    this.supportNeeds = {
      needs: needs,
      other_text: otherText,
      preferred_contact_mode: contactMode,
    };

    try {
      const res = await fetch(`${this.apiBase}/support-needs`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(this.supportNeeds),
      });

      const noticeEl = this.shadowRoot?.querySelector(".support-saved-notice");
      if (noticeEl) {
        noticeEl.removeAttribute("hidden");
        setTimeout(() => noticeEl.setAttribute("hidden", "true"), 4000);
      }
      if (!res.ok) {
        console.warn("PUT /support-needs returned status:", res.status);
      }
    } catch (err) {
      console.warn("Failed saving support needs:", err);
    }
  }

  // Render Methods
  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>

      <!-- Floating Launcher Button -->
      <button class="launcher" type="button" aria-expanded="${this.isOpen}" aria-controls="bridge-dialog" aria-haspopup="dialog">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>${this.t("launcherLabel")}</span>
      </button>

      <!-- Accessible Dialog -->
      <section id="bridge-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="bridge-title" tabindex="-1" ${this.isOpen ? "" : "hidden"}>
        
        <!-- Offline Warning Bar -->
        ${this.isOffline ? `<div class="offline-bar" role="alert">${this.t("offlineNotice")}</div>` : ""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles">
            <h2 id="bridge-title" class="title">${this.t("appTitle")}</h2>
            <p class="subtitle">${this.t("appSubtitle")}</p>
          </div>
          <div class="header-actions">
            <!-- Language Toggle Button -->
            <button class="lang-btn" type="button" aria-label="Switch Language / ቋንቋ ቀይር">
              ${this.currentLang === "am" ? "English" : "አማርኛ"}
            </button>
            <!-- Close Button -->
            <button class="close-btn" type="button" aria-label="${this.t("closeLabel")}">
              ✕
            </button>
          </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="nav-tabs" role="tablist" aria-label="Assistant Sections">
          <button class="tab-btn" id="tab-chat" role="tab" aria-selected="${this.activeTab === "chat"}" aria-controls="panel-chat" type="button">
            ${this.t("chatTab")}
          </button>
          <button class="tab-btn" id="tab-support" role="tab" aria-selected="${this.activeTab === "support"}" aria-controls="panel-support" type="button">
            ${this.t("supportTab")}
          </button>
          <button class="tab-btn" id="tab-link" role="tab" aria-selected="${this.activeTab === "link"}" aria-controls="panel-link" type="button">
            ${this.t("linkTab")}
          </button>
          <button class="tab-btn" id="tab-handoff" role="tab" aria-selected="${this.activeTab === "handoff"}" aria-controls="panel-handoff" type="button">
            ${this.t("handoffTab")}
          </button>
        </nav>

        <!-- Tab Panel Content Container -->
        <div class="tab-panel-container" style="flex:1; display:flex; flex-direction:column; min-height:0;">
          <!-- Dynamically populated by renderTabContent() -->
        </div>

      </section>
    `;

    this.renderTabContent();
  }

  private renderTabContent(): void {
    const container = this.shadowRoot?.querySelector(".tab-panel-container");
    if (!container) return;

    if (this.activeTab === "chat") {
      container.innerHTML = `
        <div id="panel-chat" class="tab-panel" role="tabpanel" aria-labelledby="tab-chat">
          <!-- Chat Messages Live Region -->
          <div class="chat-log" role="log" aria-live="polite" aria-relevant="additions text">
            <!-- Populated by renderChatMessages() -->
          </div>

          <!-- Chat Input Footer -->
          <footer class="chat-footer">
            <div class="simple-mode-row">
              <label style="display:flex; align-items:center; gap:0.375rem; cursor:pointer;" title="${this.t("simpleModeTitle")}">
                <input type="checkbox" id="simple-mode-check" ${this.simpleMode ? "checked" : ""}>
                <span>${this.t("simpleModeLabel")}</span>
              </label>
              <span class="transcription-status" style="margin-left:auto; font-size:0.75rem; color:var(--b-primary);" aria-live="polite"></span>
            </div>

            <form class="chat-input-row" id="chat-form">
              <input type="text" class="chat-input" id="chat-text-input" 
                placeholder="${this.t("inputPlaceholder")}" 
                aria-label="${this.t("inputPlaceholder")}" 
                required autocomplete="off">
              
              <!-- Voice Input Button (Mic) -->
              <button type="button" class="mic-btn" id="mic-btn" 
                aria-label="${this.t("voiceInputLabel")}" 
                aria-pressed="${this.isRecording}" 
                title="${this.t("voiceInputLabel")}">
                🎤
              </button>

              <!-- Send Button -->
              <button type="submit" class="btn btn-primary" id="send-btn" aria-label="${this.t("sendButton")}">
                ${this.t("sendButton")}
              </button>
            </form>
          </footer>
        </div>
      `;
      this.renderChatMessages();
      this.setupChatTabListeners();
    } else if (this.activeTab === "support") {
      container.innerHTML = `
        <div id="panel-support" class="tab-panel" role="tabpanel" aria-labelledby="tab-support">
          <div class="scroll-body">
            <h3 style="margin:0; font-size:1.125rem;">${this.t("supportTitle")}</h3>
            
            <!-- Zero Proof Banner -->
            <div class="banner banner-info" role="note">
              🛡️ <strong>${this.t("supportZeroProofBanner")}</strong>
            </div>

            <form id="support-form" class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" name="need" value="extra_time" 
                  ${this.supportNeeds.needs.includes("extra_time") ? "checked" : ""}>
                <span>${this.t("needExtraTime")}</span>
              </label>

              <label class="checkbox-label">
                <input type="checkbox" name="need" value="screen_reader_help" 
                  ${this.supportNeeds.needs.includes("screen_reader_help") ? "checked" : ""}>
                <span>${this.t("needScreenReader")}</span>
              </label>

              <label class="checkbox-label">
                <input type="checkbox" name="need" value="written_instructions" 
                  ${this.supportNeeds.needs.includes("written_instructions") ? "checked" : ""}>
                <span>${this.t("needWritten")}</span>
              </label>

              <label class="checkbox-label">
                <input type="checkbox" name="need" value="other" 
                  ${this.supportNeeds.needs.includes("other") || !!this.supportNeeds.other_text ? "checked" : ""}>
                <span>${this.t("needOther")}</span>
              </label>

              <textarea name="other_text" class="chat-input" style="min-height:4rem; margin-top:0.25rem;" 
                placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text || ""}</textarea>

              <div style="margin-top:0.5rem;">
                <label style="display:block; font-weight:600; margin-bottom:0.375rem;">
                  ${this.t("contactModeTitle")}
                </label>
                <select name="contact_mode" class="chat-input" style="min-height:2.75rem;">
                  <option value="text" ${this.supportNeeds.preferred_contact_mode === "text" ? "selected" : ""}>${this.t("modeText")}</option>
                  <option value="voice" ${this.supportNeeds.preferred_contact_mode === "voice" ? "selected" : ""}>${this.t("modeVoice")}</option>
                  <option value="video" ${this.supportNeeds.preferred_contact_mode === "video" ? "selected" : ""}>${this.t("modeVideo")}</option>
                  <option value="telegram" ${this.supportNeeds.preferred_contact_mode === "telegram" ? "selected" : ""}>${this.t("modeTelegram")}</option>
                </select>
              </div>

              <div class="support-saved-notice status-announcement" hidden role="status">
                ✓ ${this.t("supportSavedNotice")}
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top:0.5rem;">
                ${this.t("saveSupportButton")}
              </button>
            </form>
          </div>
        </div>
      `;
      this.setupSupportTabListeners();
    } else if (this.activeTab === "link") {
      container.innerHTML = `
        <div id="panel-link" class="tab-panel" role="tabpanel" aria-labelledby="tab-link">
          <div class="scroll-body">
            <h3 style="margin:0; font-size:1.125rem;">${this.t("linkTitle")}</h3>

            <!-- Zero Proof Banner -->
            <div class="banner banner-info" role="note">
              🛡️ <strong>${this.t("linkZeroProofBanner")}</strong>
            </div>

            <!-- Mode 1: Generate Code -->
            <div style="display:flex; flex-direction:column; gap:0.5rem; border:1px solid var(--b-border); padding:0.875rem; border-radius:0.5rem;">
              <h4 style="margin:0;">1. ${this.t("generateCodeButton")}</h4>
              <p style="margin:0; font-size:0.875rem; color:var(--b-text-muted);">${this.t("codeExpiresNote")}</p>
              
              ${
                this.currentLinkCode
                  ? `<div class="code-display" aria-label="Your linking code is ${this.currentLinkCode.code}">${this.currentLinkCode.code}</div>`
                  : `<button type="button" class="btn btn-primary" id="btn-generate-code">${this.t("generateCodeButton")}</button>`
              }
            </div>

            <!-- Mode 2: Confirm Code from Telegram -->
            <form id="link-confirm-form" style="display:flex; flex-direction:column; gap:0.5rem; border:1px solid var(--b-border); padding:0.875rem; border-radius:0.5rem;">
              <h4 style="margin:0;">2. ${this.t("orEnterCode")}</h4>
              <input type="text" id="confirm-code-input" class="chat-input" placeholder="${this.t("codePlaceholder")}" required pattern="[0-9]{6}" maxlength="6">
              <button type="submit" class="btn btn-primary">${this.t("confirmCodeButton")}</button>
            </form>

            <div class="link-status status-announcement hidden" role="status"></div>
          </div>
        </div>
      `;
      this.setupLinkTabListeners();
    } else if (this.activeTab === "handoff") {
      container.innerHTML = `
        <div id="panel-handoff" class="tab-panel" role="tabpanel" aria-labelledby="tab-handoff">
          <div class="scroll-body">
            <h3 style="margin:0; font-size:1.125rem;">${this.t("handoffTitle")}</h3>

            ${
              this.activeHandoff
                ? `
                <!-- Active Room Ready -->
                <div class="banner banner-info" role="status">
                  <h4 style="margin:0 0 0.5rem 0;">🎉 ${this.t("mentorReadyTitle")}</h4>
                  <p style="margin:0 0 0.75rem 0; font-size:0.875rem;">${this.t("screenShareReminder")}</p>
                  <a href="${this.activeHandoff.room_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display:inline-flex; width:100%; text-align:center; justify-content:center;">
                    ${this.t("joinRoomButton")}
                  </a>
                </div>

                <div style="margin-top:1rem;">
                  <button type="button" class="btn btn-danger" id="btn-leave-room" style="width:100%;">
                    ${this.t("leaveRoomButton")}
                  </button>
                </div>
              `
                : `
                <!-- Consent Explanation Banner -->
                <div class="banner banner-warning" role="note">
                  🔒 ${this.t("handoffConsentBanner")}
                </div>

                <form id="handoff-request-form" style="display:flex; flex-direction:column; gap:0.875rem;">
                  <label class="checkbox-label" style="font-weight:600;">
                    <input type="checkbox" id="handoff-consent" required>
                    <span>${this.t("handoffConsentCheck")}</span>
                  </label>

                  <div>
                    <label for="handoff-reason" style="display:block; font-size:0.875rem; margin-bottom:0.25rem; font-weight:600;">
                      ${this.t("handoffReasonLabel")}
                    </label>
                    <textarea id="handoff-reason" class="chat-input" style="min-height:4.5rem;" placeholder="${this.t("handoffReasonPlaceholder")}"></textarea>
                  </div>

                  <div class="handoff-status" style="font-size:0.875rem; color:var(--b-primary);" aria-live="polite"></div>

                  <button type="submit" class="btn btn-primary" style="min-height:3rem;">
                    ${this.t("requestMentorButton")}
                  </button>
                </form>
              `
            }
          </div>
        </div>
      `;
      this.setupHandoffTabListeners();
    }
  }

  private renderChatMessages(): void {
    const chatLog = this.shadowRoot?.querySelector(".chat-log");
    if (!chatLog) return;

    if (this.messages.length === 0) {
      chatLog.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; color:var(--b-text-muted);">
          <div style="font-size:2rem; margin-bottom:0.5rem;">👋</div>
          <p style="margin:0; font-weight:600;">${this.t("appSubtitle")}</p>
        </div>
      `;
      return;
    }

    chatLog.innerHTML = this.messages
      .map((msg) => {
        if (msg.sender === "learner") {
          return `
            <div class="message message-learner" id="${msg.id}">
              <p class="message-text">${this.escapeHtml(msg.text)}</p>
            </div>
          `;
        }

        // Assistant Message
        const hasCitations = msg.citations && msg.citations.length > 0;
        const isRefusal = msg.offerHuman || msg.reason === "low_confidence";

        return `
          <div class="message message-assistant" id="${msg.id}">
            <p class="message-text">${this.escapeHtml(msg.text)}</p>

            ${
              hasCitations
                ? `
                <div class="citations">
                  <div class="citations-title">${this.t("sourcesTitle")}</div>
                  ${msg.citations!
                    .map(
                      (c) => `
                    <a href="${this.escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="citation-link">
                      🔗 ${this.escapeHtml(c.title)} - ${this.escapeHtml(c.heading)}
                    </a>
                  `
                    )
                    .join("")}
                </div>
              `
                : ""
            }

            ${
              isRefusal
                ? `
                <div class="refusal-box" style="margin-top:0.5rem; padding:0.5rem; border-radius:0.5rem; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.2);">
                  <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${msg.id}" style="font-size:0.8125rem; min-height:2.25rem; width:100%;">
                    👤 ${this.t("talkToPersonButton")}
                  </button>
                </div>
              `
                : ""
            }

            <!-- Read-Aloud Toolbar (Sound-off equivalence: text is always visible above) -->
            <div class="audio-controls">
              <button type="button" class="btn btn-audio-play" data-msg-id="${msg.id}" aria-label="${this.t("readAloud")}" style="min-height:2.25rem; font-size:0.8125rem;">
                ${msg.isAudioPlaying ? `⏸️ ${this.t("pause")}` : `🔊 ${this.t("readAloud")}`}
              </button>
              <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.25rem;">
                <span>${this.t("speed")}:</span>
                <select class="speed-select" data-msg-id="${msg.id}">
                  <option value="0.75">0.75x</option>
                  <option value="1" selected>1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
              </label>
            </div>

          </div>
        `;
      })
      .join("");

    if (this.isThinking) {
      chatLog.innerHTML += `
        <div class="message message-assistant" style="font-style:italic; color:var(--b-text-muted);">
          ⏳ ${this.t("thinking")}
        </div>
      `;
    }

    // Attach listeners for dynamic elements inside chat log
    chatLog.querySelectorAll<HTMLButtonElement>(".btn-audio-play").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        if (!msg) return;
        const select = chatLog.querySelector<HTMLSelectElement>(`.speed-select[data-msg-id="${msgId}"]`);
        const speed = select ? parseFloat(select.value) : 1;
        this.handleReadAloud(msg, speed);
      });
    });

    chatLog.querySelectorAll<HTMLButtonElement>(".btn-talk-person").forEach((btn) => {
      btn.addEventListener("click", () => {
        const msgId = btn.getAttribute("data-msg-id");
        const msg = this.messages.find((m) => m.id === msgId);
        this.activeTab = "handoff";
        this.render();
        if (msg) {
          const reasonInput = this.shadowRoot?.querySelector<HTMLTextAreaElement>("#handoff-reason");
          if (reasonInput) reasonInput.value = `Regarding question: ${msg.text}`;
        }
      });
    });
  }

  private setupListeners(): void {
    if (!this.shadowRoot) return;

    const launcher = this.shadowRoot.querySelector<HTMLButtonElement>(".launcher")!;
    const dialog = this.shadowRoot.querySelector<HTMLElement>("[role=dialog]")!;
    const closeBtn = this.shadowRoot.querySelector<HTMLButtonElement>(".close-btn")!;
    const langBtn = this.shadowRoot.querySelector<HTMLButtonElement>(".lang-btn")!;

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

    // Escape Key
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDialog();
    });

    // Language Toggle
    langBtn.addEventListener("click", () => {
      const nextLang: SupportedLanguage = this.currentLang === "am" ? "en" : "am";
      this.setLanguage(nextLang);
    });

    // Navigation Tabs
    this.shadowRoot.querySelectorAll<HTMLButtonElement>(".tab-btn").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        const targetTab = tabBtn.id.replace("tab-", "") as "chat" | "support" | "link" | "handoff";
        this.activeTab = targetTab;
        this.shadowRoot?.querySelectorAll(".tab-btn").forEach((b) => b.setAttribute("aria-selected", "false"));
        tabBtn.setAttribute("aria-selected", "true");
        this.renderTabContent();
      });
    });
  }

  private setupChatTabListeners(): void {
    const chatForm = this.shadowRoot?.querySelector<HTMLFormElement>("#chat-form");
    const textInput = this.shadowRoot?.querySelector<HTMLInputElement>("#chat-text-input");
    const micBtn = this.shadowRoot?.querySelector<HTMLButtonElement>("#mic-btn");
    const simpleCheck = this.shadowRoot?.querySelector<HTMLInputElement>("#simple-mode-check");

    if (simpleCheck) {
      simpleCheck.addEventListener("change", () => {
        this.simpleMode = simpleCheck.checked;
      });
    }

    if (chatForm && textInput) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = textInput.value;
        textInput.value = "";
        this.askQuestion(text);
      });
    }

    if (micBtn && textInput) {
      micBtn.addEventListener("click", () => {
        this.toggleVoiceInput(textInput);
      });
    }
  }

  private setupSupportTabListeners(): void {
    const form = this.shadowRoot?.querySelector<HTMLFormElement>("#support-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const selectedNeeds = formData.getAll("need") as string[];
      const otherText = (formData.get("other_text") as string) || "";
      const contactMode = (formData.get("contact_mode") as "text" | "voice" | "video" | "telegram") || "text";

      this.saveSupportNeeds(selectedNeeds, otherText, contactMode);
    });
  }

  private setupLinkTabListeners(): void {
    const genBtn = this.shadowRoot?.querySelector<HTMLButtonElement>("#btn-generate-code");
    if (genBtn) {
      genBtn.addEventListener("click", () => {
        this.startAccountLink();
      });
    }

    const confirmForm = this.shadowRoot?.querySelector<HTMLFormElement>("#link-confirm-form");
    if (confirmForm) {
      confirmForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const codeInput = this.shadowRoot?.querySelector<HTMLInputElement>("#confirm-code-input");
        if (codeInput && codeInput.value) {
          this.confirmAccountLink(codeInput.value);
        }
      });
    }
  }

  private setupHandoffTabListeners(): void {
    const form = this.shadowRoot?.querySelector<HTMLFormElement>("#handoff-request-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const reasonInput = this.shadowRoot?.querySelector<HTMLTextAreaElement>("#handoff-reason");
        const reason = reasonInput?.value || "";
        this.requestHandoff(reason);
      });
    }

    const leaveBtn = this.shadowRoot?.querySelector<HTMLButtonElement>("#btn-leave-room");
    if (leaveBtn) {
      leaveBtn.addEventListener("click", () => {
        this.closeHandoff();
      });
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

if (!customElements.get("bridge-assistant")) {
  customElements.define("bridge-assistant", BridgeAssistant);
}
