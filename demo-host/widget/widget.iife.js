var SavannaBridgeAssistant=(function(c){"use strict";var q=Object.defineProperty;var M=(c,h,o)=>h in c?q(c,h,{enumerable:!0,configurable:!0,writable:!0,value:o}):c[h]=o;var r=(c,h,o)=>M(c,typeof h!="symbol"?h+"":h,o);const h={settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V20.3h-3v-.08a1.7 1.7 0 0 0-1.04-1.56A1.7 1.7 0 0 0 8.78 19l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.56-1.04H5.3v-3h.14A1.7 1.7 0 0 0 7 9.92a1.7 1.7 0 0 0-.34-1.88L6.6 7.98l2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.7v-.1h3v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.04v3h-.04A1.7 1.7 0 0 0 19.4 15Z"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',microphone:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/>',person:'<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',volume:'<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/>',pause:'<path d="M9 5H6v14h3V5ZM18 5h-3v14h3V5Z"/>',simplify:'<path d="M9 18h6M10 22h4M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',check:'<path d="m5 12 4 4L19 6"/>',trash:'<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M15 8l2 2M17 6l2 2"/>',video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/>'};function o(T){return`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${h[T]}</svg>`}const m={en:{appTitle:"Savanna Bridge Assistant",appSubtitle:"Ask questions, adjust support, or connect with a mentor",closeLabel:"Close dialog",launcherLabel:"Help & Assistant",settingsLabel:"Settings",languageLabel:"Assistant language",settingsTitle:"Assistant Settings",closeSettings:"Done",textSizeLabel:"Text Size",textSmaller:"Smaller",textNormal:"Normal",textLarger:"Larger",highContrastLabel:"High Contrast",simpleModeLabel:"Simple mode",simpleModeDesc:"Explain answers in shorter, simpler sentences",supportNeedsTitle:"Support Preferences",supportZeroProof:"No medical documentation or proof required. All preferences are private.",needExtraTime:"Extra response time for tests and questions",needScreenReader:"Screen reader friendly materials and alt text",needWritten:"Written questions and instructions",needOther:"Other support needs",otherPlaceholder:"Describe any other accommodations...",contactModeLabel:"Preferred contact mode for live help:",modeText:"Text chat",modeVoice:"Voice call",modeVideo:"Video call",modeTelegram:"Telegram message",saveSupportBtn:"Save Preferences",supportSavedNotice:"Preferences saved privately.",emptyWelcome:"Welcome! Ask any question about your course.",suggestedTitle:"Suggested questions:",suggestedQ1:"What does Module 2 teach?",suggestedQ2:"Explain customer service foundations",suggestedQ3:"How do I communicate with customers?",inputPlaceholder:"Ask a question about this course...",sendButton:"Send",micLabel:"Microphone (voice input)",recordingState:"Listening... tap to finish",transcribingState:"Transcribing audio...",voicePreviewNotice:"Voice transcribed. You can edit the text before sending.",micError:"Microphone unavailable. Please type your question.",lookingInCourse:"Looking in the course...",answerHeading:"Answer",listenButton:"Listen",pauseButton:"Pause",makeSimplerButton:"Make simpler",sourcesTitle:"Course sources:",talkToPersonButton:"Talk to a person",continueOnTelegram:"Continue on Telegram",continueOnTelegramAria:"Continue on Telegram (opens Telegram)",telegramPrivacyNotice:"Telegram will receive your questions and the answers.",telegramConnected:"Telegram connected",connectedToTelegram:"Connected to Telegram",disconnectTelegram:"Disconnect",tryAnotherQuestion:"Try another question",notVerifiedNotice:"I cannot verify this from the course materials. A human mentor can help you directly.",offlineBanner:"You are offline.",savedOnPhoneNotice:"Saved on this phone. It will send when you are online.",serverErrorNotice:"Could not connect to the assistant. Please check your connection and try again.",handoffConsentPrompt:"Share a short summary of your question and support preferences with a human mentor?",handoffReadyTitle:"Your Live Help Room is Ready",joinRoomButton:"Join Live Help Room",leaveRoomButton:"Close Help Session",androidFallbackNote:"Android note: Browser screen sharing (getDisplayMedia) is not supported in Chrome on Android. Your mentor automatically sees your active lesson URL, section, and focused element.",generalTab:"Display & Audio",supportTab:"Support Needs",linkTab:"Link Account",handoffTab:"Live Help",clearChatBtn:"Clear conversation",generateCodeBtn:"Generate 6-digit code",yourCodeIs:"Your 6-digit code:",handoffConsentCheck:"I consent to connect with a human mentor",handoffReasonLabel:"What do you need help with? (optional)",handoffReasonPlaceholder:"e.g., I need help with Module 2 exercise...",requestMentorBtn:"Request Human Mentor",copyRoomBtn:"Copy Link",linkCodeCopied:"Link copied to clipboard!"},am:{appTitle:"የሳቫና ብሪጅ ረዳት",appSubtitle:"ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",closeLabel:"መስኮቱን ዝጋ",launcherLabel:"እርዳታ እና ረዳት",settingsLabel:"ቅንብሮች",settingsTitle:"የረዳት ቅንብሮች",closeSettings:"ጨርስ",textSizeLabel:"የጽሑፍ መጠን",textSmaller:"አነስተኛ",textNormal:"መደበኛ",textLarger:"ትልቅ",highContrastLabel:"ከፍተኛ ንፅፅር",simpleModeLabel:"ቀላል ማብራሪያ",simpleModeDesc:"መልሶችን በአጫጭርና በቀላል ዓረፍተ ነገሮች አስረዳኝ",supportNeedsTitle:"የግል የድጋፍ ፍላጎቶች",supportZeroProof:"ምንም ዓይነት የህክምና ማስረጃ ወይም ማረጋገጫ አያስፈልግም።",needExtraTime:"ለፈተናዎች እና ጥያቄዎች ተጨማሪ ጊዜ",needScreenReader:"ለስክሪን አንባቢ ምቹ የሆነ አቀራረብ",needWritten:"የጽሑፍ ጥያቄዎች እና መመሪያዎች",needOther:"ሌሎች የድጋፍ ፍላጎቶች",otherPlaceholder:"የሚፈልጉትን ተጨማሪ ድጋፍ ይግለጹ...",contactModeLabel:"የቀጥታ ድጋፍ የሚፈልጉበት መንገድ፡",modeText:"የጽሑፍ መልእክት",modeVoice:"የድምጽ ጥሪ",modeVideo:"የቪዲዮ ጥሪ",modeTelegram:"የቴሌግራም መልእክት",saveSupportBtn:"ምርጫዎችን መዝግብ",supportSavedNotice:"ምርጫዎችዎ በሚስጥር ተቀምጠዋል።",emptyWelcome:"እንኳን ደህና መጡ! ስለ ኮርሱ ማንኛውንም ጥያቄ ይጠይቁ።",suggestedTitle:"የተጠቆሙ ጥያቄዎች፡",suggestedQ1:"ሞጁል 2 ምን ያስተምራል?",suggestedQ2:"የደንበኞች አገልግሎት መሰረቶችን አስረዳኝ",suggestedQ3:"ከደንበኞች ጋር እንዴት መገናኘት እችላለሁ?",inputPlaceholder:"ስለዚህ ኮርስ ጥያቄ ይጠይቁ...",sendButton:"ላክ",micLabel:"ማይክሮፎን (የድምጽ ግብዓት)",recordingState:"እያዳመጥኩ ነው... ለማጠናቀቅ ይጫኑ",transcribingState:"ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",voicePreviewNotice:"ድምጽዎ ወደ ጽሑፍ ተቀይሯል። ከመላክዎ በፊት ማስተካከል ይችላሉ።",micError:"ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",lookingInCourse:"በኮርሱ ውስጥ በመፈለግ ላይ...",answerHeading:"መልስ",listenButton:"አዳምጥ",pauseButton:"አቁም",makeSimplerButton:"ቀለል አድርግ",sourcesTitle:"የኮርስ ምንጮች፡",talkToPersonButton:"ከሰው ጋር ተነጋገር",continueOnTelegram:"በቴሌግራም ቀጥል",continueOnTelegramAria:"በቴሌግራም ቀጥል (ቴሌግራምን ይከፍታል)",telegramPrivacyNotice:"ቴሌግራም ጥያቄዎችዎን እና መልሶቹን ይቀበላል።",telegramConnected:"ቴሌግራም ተገናኝቷል",connectedToTelegram:"ከቴሌግራም ጋር ተገናኝቷል",disconnectTelegram:"ግንኙነት አቋርጥ",tryAnotherQuestion:"ሌላ ጥያቄ ሞክር",notVerifiedNotice:"ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። የሰው አማካሪ በቀጥታ ሊረዳዎት ይችላል።",offlineBanner:"ከመስመር ውጭ ነዎት።",savedOnPhoneNotice:"በዚህ ስልክ ላይ ተቀምጧል። መስመር ላይ ሲሆኑ ይላካል።",serverErrorNotice:"ከአገልጋዩ ጋር መገናኘት አልተቻለም። እባክዎ ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",handoffConsentPrompt:"የጥያቄዎን አጭር መግለጫ እና የድጋፍ ምርጫዎችዎን ለአማካሪ ለማጋራት ይስማማሉ?",handoffReadyTitle:"የቀጥታ ድጋፍ ክፍልዎ ዝግጁ ነው",joinRoomButton:"ወደ ስብሰባው ክፍል ግባ",leaveRoomButton:"ክፍለ-ጊዜውን ዝጋ",androidFallbackNote:"የአንድሮይድ ማሳሰቢያ፡ በአንድሮይድ ክሮም ላይ የስክሪን ማጋራት አይደገፍም። አማካሪዎ እርስዎ ያሉበትን የትምህርት ገጽ እና ርዕስ በቀጥታ ይመለከታል።",generalTab:"እይታ እና ድምጽ",supportTab:"የድጋፍ ፍላጎቶች",linkTab:"መለያ አገናኝ",handoffTab:"የቀጥታ ድጋፍ",clearChatBtn:"ውይይቱን አጽዳ",generateCodeBtn:"ባለ 6 አሃዝ ኮድ ፍጠር",yourCodeIs:"የእርስዎ ባለ 6 አሃዝ ኮድ፡",handoffConsentCheck:"ከሰው አማካሪ ጋር ለመገናኘት እስማማለሁ",handoffReasonLabel:"በምን ላይ እርዳታ ይፈልጋሉ? (አማራጭ)",handoffReasonPlaceholder:"ምሳሌ፡ በሞጁል 2 መልመጃ ላይ እገዛ እፈልጋለሁ...",requestMentorBtn:"የሰው አማካሪ ጠይቅ",copyRoomBtn:"ሊንኩን ቅዳ",linkCodeCopied:"ሊንኩ ተቀድቷል!"},om:{appTitle:"Gargaaraa Savanna Bridge",appSubtitle:"Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",closeLabel:"Cufi",launcherLabel:"Gargaarsa",settingsLabel:"Qindaa'ina",settingsTitle:"Qindaa'ina Gargaaraa",closeSettings:"Xumuri",textSizeLabel:"Hamma Barruu",textSmaller:"Xiqqaa",textNormal:"Idilee",textLarger:"Guddaa",highContrastLabel:"Waliin-dhaabbii Olaanaa",simpleModeLabel:"Ibsa salphaa",simpleModeDesc:"Himoota gaggabaaboo fi salphaadhaan ibsi",supportNeedsTitle:"Filannoo Deeggarsaa",supportZeroProof:"Waraqaan yaalaa hin barbaachisu. Filannoon keessan dhuunfaadha.",needExtraTime:"Qorumsaaf yeroo dabalataa",needScreenReader:"Dubbisaa iskiriiniif kan mijate",needWritten:"Qajeelfama barruudhaan",needOther:"Deeggarsa biraa",otherPlaceholder:"Ibsaa...",contactModeLabel:"Mala qunnamtii filattan:",modeText:"Barruu",modeVoice:"Sagalee",modeVideo:"Viidiyoo",modeTelegram:"Telegiraamii",saveSupportBtn:"Galmeessi",supportSavedNotice:"Filannoon keessan galmaa'eera.",emptyWelcome:"Baga nagaan dhuftan! Gaaffii kamiyyuu gaafadhaa.",suggestedTitle:"Gaaffiiwwan filataman:",suggestedQ1:"Kutaan 2 maal barsiisa?",suggestedQ2:"Bu'uuraalee tajaajila maamiltootaa ibsi",suggestedQ3:"Maamiltoota waliin akkamittan qunnama?",inputPlaceholder:"Waa'ee barnoota kanaa gaafadhaa...",sendButton:"Ergi",micLabel:"Maaykirofoonii",recordingState:"Dhaggeeffachaa jira...",transcribingState:"Sagalee jijjiiraa jira...",voicePreviewNotice:"Sagaleen gara barruutti jijjiirameera.",micError:"Maaykirofooniin hin argamne.",lookingInCourse:"Barnoota keessaa barbaadaa jira...",answerHeading:"Deebii",listenButton:"Dhaggeeffadhu",pauseButton:"Dhaabi",makeSimplerButton:"Salphisi",sourcesTitle:"Madda barnootaa:",talkToPersonButton:"Nama waliin dubbadhu",continueOnTelegram:"Telegiraamiin Itti fufi",continueOnTelegramAria:"Telegiraamiin Itti fufi (Telegiraamii bana)",telegramPrivacyNotice:"Telegiraam gaaffii fi deebii keessan ni fudhata.",telegramConnected:"Telegiraam walqabateera",connectedToTelegram:"Telegiraamii waliin walqabateera",disconnectTelegram:"Gargar Baasi",tryAnotherQuestion:"Gaaffii biraa yaali",notVerifiedNotice:"Barnoota keessaa mirkaneessuu hin dandeenye.",offlineBanner:"Toora irraa ala jirtu.",savedOnPhoneNotice:"Bilbila kana irratti kuufameera. Toora irratti yemmuu dhuftan ergama.",serverErrorNotice:"Gargaaraa waliin walqunnamuu hin dandeenye.",handoffConsentPrompt:"Gaaffii keessanii fi filannoo deeggarsaa gorsaa waliin qooduun ni eeyyamtu?",handoffReadyTitle:"Kutaan gargaarsaa qophiidha",joinRoomButton:"Kutaa Seenaa",leaveRoomButton:"Kutaa Dhiisaa",androidFallbackNote:"Iskiriinii qooduun Android irratti hin danda'amu.",generalTab:"Mul'ina",supportTab:"Deeggarsa",linkTab:"Herrega Walqabsiisi",handoffTab:"Gargaarsa Kallattii",clearChatBtn:"Haquu",generateCodeBtn:"Koodii uumi",yourCodeIs:"Koodii keessan:",handoffConsentCheck:"Gorsaa waliin walqunnamuuf walii galeera",handoffReasonLabel:"Waan gargaarsa barbaaddan:",handoffReasonPlaceholder:"fkn: Kutaa 2ffaa...",requestMentorBtn:"Gorsaa Gaafadhaa",copyRoomBtn:"Waraabi",linkCodeCopied:"Waraabameera!"},ti:{appTitle:"ናይ ሳቫና ብሪጅ ሓጋዚ",appSubtitle:"ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",closeLabel:"ዕጾ",launcherLabel:"ሓገዝ",settingsLabel:"ቅጥዕታት",settingsTitle:"ናይ ሓጋዚ ቅጥዕታት",closeSettings:"ወዲአ",textSizeLabel:"መጠን ጽሑፍ",textSmaller:"ንእሽቶ",textNormal:"ስሩዕ",textLarger:"ዓቢ",highContrastLabel:"ላዕለዋይ ንጽጽር",simpleModeLabel:"ቀሊል መብርሂ",simpleModeDesc:"ብሓጸርቲ ሓረጋት ኣረድኣኒ",supportNeedsTitle:"ናይ ውልቂ ሓገዝ ምርጫታት",supportZeroProof:"ሕክምናዊ መርትዖ ኣየድልን እዩ። ምርጫታትኩም ምስጢራዊ እዩ።",needExtraTime:"ተወሳኺ ግዜ ንፈተናታት",needScreenReader:"ንስክሪን ኣንባቢ ምቹእ",needWritten:"ናይ ጽሑፍ መምርሒታት",needOther:"ካልእ ድሌታት",otherPlaceholder:"ግለጹ...",contactModeLabel:"ትመርጽዎ ናይ ርክብ መገዲ፡",modeText:"ጽሑፍ",modeVoice:"ድምጺ",modeVideo:"ቪድዮ",modeTelegram:"ቴሌግራም",saveSupportBtn:"ኣቐምጥ",supportSavedNotice:"ምርጫታትኩም ተቐሚጡ ኣሎ።",emptyWelcome:"እንቋዕ ብደሓን መጻእኩም! ዝኾነ ሕቶ ሕተቱ።",suggestedTitle:"ዝተመርጹ ሕቶታት፡",suggestedQ1:"ሞጁል 2 እንታይ ይምህር?",suggestedQ2:"መሰረታት ኣገልግሎት ዓማዊል ኣብርሃለይ",suggestedQ3:"ምስ ዓማዊል ብኸመይ ይራኸብ?",inputPlaceholder:"ብዛዕባዚ ኮርስ ሕቶ ሕተቱ...",sendButton:"ስደድ",micLabel:"ማይክሮፎን",recordingState:"ይሰምዕ ኣለኹ...",transcribingState:"ናብ ጽሑፍ ይቕየር ኣሎ...",voicePreviewNotice:"ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ።",micError:"ማይክሮፎን ክርከብ ኣይተኻእለን።",lookingInCourse:"ኣብ ኮርስ ይድለ ኣሎ...",answerHeading:"መልሲ",listenButton:"ስማዕ",pauseButton:"ኣዕርፍ",makeSimplerButton:"ቀሊል ግበሮ",sourcesTitle:"ምንጭታት ኮርስ፡",talkToPersonButton:"ምስ ሰብ ተዛረብ",continueOnTelegram:"ብቴሌግራም ቀጽል",continueOnTelegramAria:"ብቴሌግራም ቀጽል (ቴሌግራም ይኸፍት)",telegramPrivacyNotice:"ቴሌግራም ሕቶኹምን መልስኹምን ይቕበል እዩ።",telegramConnected:"ቴሌግራም ተላጊቡ ኣሎ",connectedToTelegram:"ምስ ቴሌግራም ተላጊቡ ኣሎ",disconnectTelegram:"ግንኙነት ኣቋርጽ",tryAnotherQuestion:"ካልእ ሕቶ ፈትን",notVerifiedNotice:"እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን።",offlineBanner:"መስመር ተቛሪጹ ኣሎ።",savedOnPhoneNotice:"ኣብዚ ስልኪ ተቐሚጡ ኣሎ። ኦንላይን ምስ ኮንኩም ክስደድ እዩ።",serverErrorNotice:"ምስ ሓጋዚ ክራኸብ ኣይተኻእለን።",handoffConsentPrompt:"ሕቶኹምን ምርጫታት ደገፍኩምን ምስ ኣማኻሪ ክካፈል ትሰማምዑ ዶ?",handoffReadyTitle:"ናይ ሓገዝ ክፍሊ ድሉው እዩ",joinRoomButton:"ናብ ክፍሊ እቶ",leaveRoomButton:"ክፍሊ ዕጾ",androidFallbackNote:"ኣብ አንድሮይድ ስክሪን ምክፋል ኣይድገፍን።",generalTab:"ምርኣይ",supportTab:"ሓገዝ",linkTab:"ሕሳብ ኣላግብ",handoffTab:"ቀጥታዊ ሓገዝ",clearChatBtn:"ኣጽርዮ",generateCodeBtn:"ኮድ ፍጠር",yourCodeIs:"ናይ ስድሽተ ኣሃዝ ኮድኩም፡",handoffConsentCheck:"ምስ መካሪ ንምርኻብ ተሰማሚዐ ኣለኹ",handoffReasonLabel:"እንታይ ሓገዝ የድልየኩም?",handoffReasonPlaceholder:"ንኣብነት፡ ኣብ ሞጁል 2...",requestMentorBtn:"ናይ ሰብ ሓገዝ ሕተት",copyRoomBtn:"ቅዳሕ",linkCodeCopied:"ተቐዲሑ ኣሎ!"},ar:{appTitle:"مساعد سافانا بريدج",appSubtitle:"اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",closeLabel:"إغلاق النافذة",launcherLabel:"المساعدة والمساعد",settingsLabel:"الإعدادات",settingsTitle:"إعدادات المساعد",closeSettings:"تم",textSizeLabel:"حجم النص",textSmaller:"أصغر",textNormal:"عادي",textLarger:"أكبر",highContrastLabel:"تباين عالٍ",simpleModeLabel:"شرح مبسط",simpleModeDesc:"اشرح بجمل أقصر وأبسط",supportNeedsTitle:"تفضيلات الدعم",supportZeroProof:"لا يُطلب أي تشخيص أو وثائق طبية. جميع التفضيلات سرية.",needExtraTime:"وقت استجابة إضافي للاختبارات",needScreenReader:"مواد متوافقة مع قارئ الشاشة",needWritten:"أسئلة وتعليمات مكتوبة",needOther:"احتياجات دعم أخرى",otherPlaceholder:"حدد أي احتياجات أخرى...",contactModeLabel:"طريقة التواصل المفضلة للمساعدة:",modeText:"محادثة نصية",modeVoice:"مكالمة صوتية",modeVideo:"مكالمة فيديو",modeTelegram:"رسالة تيليجرام",saveSupportBtn:"حفظ التفضيلات",supportSavedNotice:"تم حفظ التفضيلات بسرية.",emptyWelcome:"مرحباً بك! اطرح أي سؤال حول الدورة التدريبية.",suggestedTitle:"أسئلة مقترحة:",suggestedQ1:"ماذا نتعلم في الوحدة الثانية؟",suggestedQ2:"اشرح أساسيات خدمة العملاء",suggestedQ3:"كيف أتواصل بفعالية مع العملاء؟",inputPlaceholder:"اطرح سؤالاً حول هذه الدورة...",sendButton:"إرسال",micLabel:"الميكروفون (إدخال صوتي)",recordingState:"جاري الاستماع... اضغط للإنهاء",transcribingState:"جاري تحويل الصوت إلى نص...",voicePreviewNotice:"تم تحويل الصوت إلى نص. يمكنك تعديله قبل الإرسال.",micError:"الميكروفون غير متوفر.",lookingInCourse:"جاري البحث في محتوى الدورة...",answerHeading:"الإجابة",listenButton:"استماع",pauseButton:"إيقاف مؤقت",makeSimplerButton:"تبسيط الشرح",sourcesTitle:"مصادر الدورة:",talkToPersonButton:"التحدث مع شخص",continueOnTelegram:"المتابعة عبر تيليجرام",continueOnTelegramAria:"المتابعة عبر تيليجرام (يفتح تيليجرام)",telegramPrivacyNotice:"سيتلقى تيليجرام أسئلتك وإجاباتها.",telegramConnected:"تم ربط تيليجرام",connectedToTelegram:"متصل عبر تيليجرام",disconnectTelegram:"قطع الاتصال",tryAnotherQuestion:"جرب سؤالاً آخر",notVerifiedNotice:"لا يمكنني التحقق من ذلك من محتوى الدورة. يمكن لمرشد بشري مساعدتك مباشرة.",offlineBanner:"أنت غير متصل بالإنترنت.",savedOnPhoneNotice:"تم الحفظ على الهاتف. سيتم الإرسال فور اتصالك بالإنترنت.",serverErrorNotice:"تعذر الاتصال بالمساعد. يرجى التحقق من اتصالك والمحاولة لاحقاً.",handoffConsentPrompt:"هل توافق على مشاركة ملخص سؤالك وتفضيلات الدعم مع المرشد؟",handoffReadyTitle:"غرفة المساعدة المباشرة جاهزة",joinRoomButton:"الانضمام للغرفة",leaveRoomButton:"إغلاق الجلسة",androidFallbackNote:"ملاحظة أندرويد: مشاركة الشاشة عبر المتصفح غير مدعومة على متصفح Chrome لنظام أندرويد.",generalTab:"العرض والصوت",supportTab:"احتياجات الدعم",linkTab:"ربط الحساب",handoffTab:"المساعدة المباشرة",clearChatBtn:"مسح المحادثة",generateCodeBtn:"توليد رمز مكون من 6 أرقام",yourCodeIs:"رمزك المكون من 6 أرقام:",handoffConsentCheck:"أوافق على التواصل مع مرشد بشري",handoffReasonLabel:"ما الذي تحتاج إلى مساعدة فيه؟ (اختياري)",handoffReasonPlaceholder:"مثال: أحتاج مساعدة في تمرين الوحدة 2...",requestMentorBtn:"طلب مساعدة بشرية",copyRoomBtn:"نسخ الرابط",linkCodeCopied:"تم نسخ الرابط بنجاح!"}},R=`
  :host {
    --b-font: var(--bs-body-font-family, system-ui, -apple-system, "Noto Sans Ethiopic", "Nyala", sans-serif);
    --b-bg: var(--bs-body-bg, #ffffff);
    --b-text: var(--bs-body-color, #0f172a);
    --b-text-muted: #475569;
    --b-border: #cbd5e1;
    /* Host pages may opt in with an accessible brand colour. Do not inherit
       Bootstrap's primary value because its contrast is not guaranteed. */
    --b-primary: var(--bridge-assistant-primary, #b42318);
    --b-primary-hover: var(--bridge-assistant-primary-hover, #8f1d14);
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

  .icon {
    width: 1.125rem;
    height: 1.125rem;
    flex: 0 0 auto;
    pointer-events: none;
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
`;class k extends HTMLElement{constructor(){super(...arguments);r(this,"isOpen",!1);r(this,"currentLang","en");r(this,"textSize","normal");r(this,"highContrast",!1);r(this,"simpleMode",!1);r(this,"isOffline",!navigator.onLine);r(this,"isThinking",!1);r(this,"isRecording",!1);r(this,"mediaRecorder",null);r(this,"audioChunks",[]);r(this,"activeAudio",null);r(this,"messages",[]);r(this,"sessionId",`sess_${Date.now()}_${Math.random().toString(36).substring(2,8)}`);r(this,"telegramToken",null);r(this,"telegramDeepLink","https://t.me/savannah_assistant3_bot");r(this,"isTelegramLinked",!1);r(this,"telegramPollTimer",null);r(this,"isSettingsOpen",!1);r(this,"activeHandoff",null);r(this,"supportNeeds",{needs:["written_instructions"],other_text:"",preferred_contact_mode:"text"});r(this,"previousFocus",null)}get apiBase(){return(this.getAttribute("api")||this.getAttribute("data-api")||this.getAttribute("api-base")||"http://localhost:8000").replace(/\/$/,"")}get courseId(){return this.getAttribute("content")||this.getAttribute("data-course")||this.getAttribute("course-id")||"course_demo"}static get observedAttributes(){return["lang","data-lang","api","data-api","api-base","content","data-course","course-id"]}attributeChangedCallback(e,t,a){t!==a&&(e==="lang"||e==="data-lang")&&a in m&&this.setLanguage(a)}connectedCallback(){if(this.shadowRoot)return;const e=this.getAttribute("lang")||this.getAttribute("data-lang"),t=sessionStorage.getItem("savanna_bridge_lang"),a=document.documentElement.lang?.slice(0,2);e&&e in m?this.currentLang=e:t&&t in m?this.currentLang=t:a&&a in m?this.currentLang=a:this.currentLang="en",this.restoreState(),this.attachShadow({mode:"open"}),this.render(),this.setupNetworkMonitor(),this.fetchTelegramStartLink(),this.fetchSupportNeeds()}disconnectedCallback(){this.telegramPollTimer&&(window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null)}t(e){return(m[this.currentLang]||m.en)[e]||m.en[e]||e}announce(e){const t=this.shadowRoot?.querySelector("#live-announcer");t&&(t.textContent="",setTimeout(()=>{t.textContent=e},50))}setLanguage(e){this.currentLang!==e&&(this.currentLang=e,sessionStorage.setItem("savanna_bridge_lang",e),this.setAttribute("lang",e),this.setAttribute("dir",e==="ar"?"rtl":"ltr"),this.messages=[],sessionStorage.removeItem("savanna_bridge_chat_history"),this.render(),this.announce(this.t("appTitle")))}clearChat(){this.messages=[],sessionStorage.removeItem("savanna_bridge_chat_history"),this.renderMessages(),this.announce(this.t("emptyWelcome"))}async generateLinkCode(){try{const e=await fetch(`${this.apiBase}/api/v1/link/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"web",learner_reference:`learner_${this.sessionId}`})});if(e.ok){const t=await e.json(),a=this.shadowRoot?.querySelector("#code-display");a&&(a.textContent=t.token,a.style.display="block",this.announce(`${this.t("yourCodeIs")} ${t.token}`))}}catch(e){console.warn("Failed to generate link code",e)}}setupNetworkMonitor(){window.addEventListener("online",()=>{this.isOffline=!1,this.render(),this.flushOfflineQueue()}),window.addEventListener("offline",()=>{this.isOffline=!0,this.render()})}async flushOfflineQueue(){try{const e=localStorage.getItem("db_assistant_offline_queue");if(!e)return;const t=JSON.parse(e);localStorage.removeItem("db_assistant_offline_queue");for(const a of t)a&&a.question&&await this.askQuestion(a.question)}catch(e){console.warn("Could not flush offline queue",e)}}restoreState(){try{const e=sessionStorage.getItem("savanna_bridge_chat_history");e&&(this.messages=JSON.parse(e));const t=localStorage.getItem("savanna_bridge_contrast");t&&(this.highContrast=t==="high");const a=localStorage.getItem("savanna_bridge_text_size");a&&(this.textSize=a);const i=localStorage.getItem("savanna_bridge_simple_mode");i&&(this.simpleMode=i==="true")}catch{}}saveChatState(){try{sessionStorage.setItem("savanna_bridge_chat_history",JSON.stringify(this.messages.slice(-25)))}catch{}}async fetchTelegramStartLink(){try{const e=await fetch(`${this.apiBase}/api/v1/link/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"web",learner_reference:`learner_${this.sessionId}`})});if(e.ok){const t=await e.json();this.telegramToken=t.token,this.telegramDeepLink=t.deep_link,this.updateTelegramLinkUI()}}catch(e){console.warn("Could not fetch telegram link start:",e)}}onTelegramLinkClicked(){if(this.isTelegramLinked||!this.telegramToken)return;this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer);let e=0;const t=300;this.telegramPollTimer=window.setInterval(async()=>{if(e++,e>t){this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null;return}try{const a=await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken)}`);a.ok&&(await a.json()).linked&&(this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null,this.isTelegramLinked=!0,this.announce(this.t("telegramConnected")),this.updateTelegramLinkUI())}catch(a){console.warn("Telegram status polling error:",a)}},2e3)}async disconnectTelegram(){try{await fetch(`${this.apiBase}/api/v1/link/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"telegram"})})}catch{}this.isTelegramLinked=!1,await this.fetchTelegramStartLink(),this.updateTelegramLinkUI()}updateTelegramLinkUI(){const e=this.shadowRoot?.querySelector("#telegram-container");e&&(this.isTelegramLinked?(e.innerHTML=`
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ${o("check")} ${this.t("connectedToTelegram")}
          </span>
          <button type="button" class="btn btn-secondary" id="btn-disconnect-tg" style="font-size:0.75rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
            ${this.t("disconnectTelegram")}
          </button>
        </div>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `,e.querySelector("#btn-disconnect-tg")?.addEventListener("click",()=>this.disconnectTelegram())):(e.innerHTML=`
        <a href="${this.telegramDeepLink}" target="_blank" rel="noopener noreferrer" 
           class="btn btn-secondary btn-footer" id="tg-deep-link" 
           aria-label="${this.t("continueOnTelegramAria")}">
          ${this.t("continueOnTelegram")}
        </a>
        <div class="telegram-privacy-note">${this.t("telegramPrivacyNotice")}</div>
      `,e.querySelector("#tg-deep-link")?.addEventListener("click",()=>this.onTelegramLinkClicked())))}async fetchSupportNeeds(){try{const e=await fetch(`${this.apiBase}/api/v1/support-needs`);if(e.ok){const t=await e.json();this.supportNeeds={needs:t.needs||[],other_text:t.other_text||"",preferred_contact_mode:t.preferred_contact_mode||"text"}}}catch{}}async saveSupportNeeds(e,t,a){this.supportNeeds={needs:e,other_text:t,preferred_contact_mode:a};try{const i=await fetch(`${this.apiBase}/api/v1/support-needs`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.supportNeeds)}),s=this.shadowRoot?.querySelector("#support-saved-notice");s&&(s.removeAttribute("hidden"),setTimeout(()=>s.setAttribute("hidden","true"),3500)),i.ok||console.warn("PUT /support-needs failed",i.status)}catch(i){console.warn("Save support needs error:",i)}}async toggleVoiceInput(e){this.isRecording?this.stopVoiceRecording():await this.startVoiceRecording(e)}async startVoiceRecording(e){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){alert(this.t("micError"));return}try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioChunks=[];const a=MediaRecorder.isTypeSupported("audio/webm")?"audio/webm":MediaRecorder.isTypeSupported("audio/ogg")?"audio/ogg":"audio/wav";this.mediaRecorder=new MediaRecorder(t),this.mediaRecorder.ondataavailable=i=>{i.data.size>0&&this.audioChunks.push(i.data)},this.mediaRecorder.onstop=async()=>{t.getTracks().forEach(s=>s.stop());const i=new Blob(this.audioChunks,{type:a});await this.sendAudioForTranscription(i,a,e)},this.mediaRecorder.start(),this.isRecording=!0,this.updateMicButtonUI()}catch{alert(this.t("micError"))}}stopVoiceRecording(){this.mediaRecorder&&this.mediaRecorder.state!=="inactive"&&this.mediaRecorder.stop(),this.isRecording=!1,this.updateMicButtonUI()}updateMicButtonUI(){const e=this.shadowRoot?.querySelector("#mic-btn");e&&(this.isRecording?(e.classList.add("recording"),e.setAttribute("aria-pressed","true"),e.setAttribute("title",this.t("recordingState"))):(e.classList.remove("recording"),e.setAttribute("aria-pressed","false"),e.setAttribute("title",this.t("micLabel"))))}async sendAudioForTranscription(e,t,a){this.announce(this.t("transcribingState"));try{const i=new FileReader,s=new Promise((u,f)=>{i.onloadend=()=>{const y=i.result;u(y.split(",")[1]||"")},i.onerror=f});i.readAsDataURL(e);const d=await s,g=await fetch(`${this.apiBase}/api/v1/speech/transcribe`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audio_base64:d,media_type:t,language:this.currentLang,retain:!1})});if(g.ok){const u=await g.json();u.transcript&&(a.value=(a.value?a.value+" ":"")+u.transcript,a.focus(),this.announce(this.t("voicePreviewNotice")))}}catch{}}async handleListen(e){if(this.activeAudio&&!this.activeAudio.paused&&e.isAudioPlaying){this.activeAudio.pause(),e.isAudioPlaying=!1,this.renderMessages();return}try{const t=await fetch(`${this.apiBase}/api/v1/speech/synthesize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e.text,language:this.currentLang,speed:1})});if(t.ok){const a=await t.json();if(a.mocked||!a.audio_url){this.fallbackTTS(e.text);return}this.activeAudio&&this.activeAudio.pause();const i=String(a.audio_url),s=/^(https?:|data:|blob:)/.test(i)?i:`${this.apiBase}${i}`;this.activeAudio=new Audio(s),this.activeAudio.onended=()=>{e.isAudioPlaying=!1,this.renderMessages()},this.activeAudio.play().catch(()=>this.fallbackTTS(e.text)),e.isAudioPlaying=!0,this.renderMessages()}else this.fallbackTTS(e.text)}catch{this.fallbackTTS(e.text)}}fallbackTTS(e){if("speechSynthesis"in window){window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.lang={am:"am-ET",en:"en-US",om:"om-ET",ti:"ti-ET",ar:"ar-XA"}[this.currentLang],window.speechSynthesis.speak(t)}}async askQuestion(e,t=!1){const a=e.trim();if(!a||this.isThinking)return;this.dispatchEvent(new CustomEvent("db-assistant:question",{bubbles:!0,composed:!0,detail:{text:a,language:this.currentLang}}));const i={id:`msg_${Date.now()}_learner`,sender:"learner",text:a};this.messages.push(i),this.isThinking=!0,this.announce(this.t("lookingInCourse")),this.renderMessages();try{let s=await fetch(`${this.apiBase}/api/v1/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:a,language:this.currentLang,course_id:this.courseId,simple_mode:t||this.simpleMode,channel:"web"})});if(!s.ok&&s.status===404&&(s=await fetch(`${this.apiBase}/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:a,language:this.currentLang,course_id:this.courseId,simple_mode:t||this.simpleMode,channel:"web"})})),this.isThinking=!1,s.ok){const d=await s.json(),g=!!d.offer_human||d.reason==="low_confidence",u={id:`msg_${Date.now()}_assistant`,sender:"assistant",text:d.answer,heading:this.t("answerHeading"),citations:d.citations||[],offerHuman:d.offer_human,isRefusal:g,originalQuestion:a};this.messages.push(u),this.saveChatState()}else this.messages.push({id:`msg_${Date.now()}_err`,sender:"assistant",text:this.t("serverErrorNotice"),offerHuman:!0})}catch{this.isThinking=!1;try{const s=JSON.parse(localStorage.getItem("db_assistant_offline_queue")||"[]");s.push({question:a,language:this.currentLang,timestamp:Date.now()}),localStorage.setItem("db_assistant_offline_queue",JSON.stringify(s))}catch{}this.messages.push({id:`msg_${Date.now()}_offline`,sender:"assistant",text:this.t("savedOnPhoneNotice"),offerHuman:!0})}this.renderMessages()}async requestHandoff(e){if(this.isOffline){alert(this.t("offlineBanner"));return}if(window.confirm(this.t("handoffConsentPrompt"))){this.announce(this.t("lookingInCourse"));try{const t=await fetch(`${this.apiBase}/api/v1/escalations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consent:!0,learner_ref:`learner_${this.sessionId}`,card:{language:this.currentLang,context:e||"Learner requested a human mentor from web assistant.",support_needs:this.supportNeeds.needs,contact_mode:this.supportNeeds.preferred_contact_mode},channel:"web"})});if(t.ok){const a=await t.json(),i=a.ticketId||a.id||"ticket_01",s=a.room_url||a.roomUrl||"https://meet.jit.si/savanna-bridge-demo";this.activeHandoff={id:i,room_url:s},this.dispatchEvent(new CustomEvent("db-assistant:escalated",{bubbles:!0,composed:!0,detail:{ticketId:i,roomUrl:s}})),this.messages.push({id:`msg_${Date.now()}_handoff`,sender:"assistant",text:this.t("handoffReadyTitle"),heading:this.t("handoffReadyTitle"),isHandoff:!0,roomUrl:s,offerHuman:!1}),this.saveChatState();const d=this.shadowRoot?.querySelector("#handoff-room-box");d&&(d.innerHTML=`
            <div style="padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem; margin-top:0.75rem;">
              <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534;">${o("check")} ${this.t("handoffReadyTitle")}</p>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <a href="${this.escapeHtml(s)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary room-link" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.375rem;">
                  ${o("video")} ${this.t("joinRoomButton")}
                </a>
                <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(s)}" style="font-size:0.8125rem; min-height:2.25rem;">
                  ${o("copy")} ${this.t("copyRoomBtn")}
                </button>
              </div>
            </div>
          `,d.querySelector(".btn-copy-room")?.addEventListener("click",async()=>{navigator.clipboard&&(await navigator.clipboard.writeText(s),this.announce(this.t("linkCodeCopied")))})),this.renderMessages()}else alert(this.t("serverErrorNotice"))}catch{alert(this.t("serverErrorNotice"))}}}updateSizeButtons(){this.shadowRoot&&(this.shadowRoot.querySelectorAll(".size-btn-group button").forEach(e=>{e.setAttribute("aria-pressed","false")}),this.textSize==="smaller"?this.shadowRoot.querySelector("#btn-size-smaller")?.setAttribute("aria-pressed","true"):this.textSize==="larger"?this.shadowRoot.querySelector("#btn-size-larger")?.setAttribute("aria-pressed","true"):this.shadowRoot.querySelector("#btn-size-normal")?.setAttribute("aria-pressed","true"))}render(){this.shadowRoot&&(this.setAttribute("data-contrast",this.highContrast?"high":"normal"),this.setAttribute("data-size",this.textSize),this.setAttribute("dir",this.currentLang==="ar"?"rtl":"ltr"),this.setAttribute("lang",this.currentLang),this.shadowRoot.innerHTML=`
      <style>${R}</style>

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
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" lang="${this.currentLang}" dir="${this.currentLang==="ar"?"rtl":"ltr"}" tabindex="-1" ${this.isOpen?"":"hidden"}>
        
        ${this.isOffline?`<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>`:""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles">
            <h2 id="dialog-title" class="title"><span id="bridge-title">${this.t("appTitle")}</span></h2>
          </div>
          <div class="header-actions">
            <label class="sr-only" for="language-select">${this.t("languageLabel")}</label>
            <select class="text-input" id="language-select" aria-label="${this.t("languageLabel")}" style="width:auto; min-height:2.75rem;">
              <option value="en" ${this.currentLang==="en"?"selected":""}>English</option>
              <option value="am" ${this.currentLang==="am"?"selected":""}>አማርኛ</option>
              <option value="om" ${this.currentLang==="om"?"selected":""}>Afaan Oromoo</option>
              <option value="ti" ${this.currentLang==="ti"?"selected":""}>ትግርኛ</option>
              <option value="ar" ${this.currentLang==="ar"?"selected":""}>العربية</option>
            </select>
            <!-- Settings Button -->
            <button type="button" class="btn btn-secondary" id="btn-open-settings" aria-label="${this.t("settingsLabel")}" title="${this.t("settingsLabel")}" style="padding:0.4rem 0.6rem;">
              ${o("settings")}
            </button>
            <!-- Close Button -->
            <button type="button" class="btn btn-secondary" id="btn-close-dialog" aria-label="${this.t("closeLabel")}" style="padding:0.4rem 0.6rem;">
              ${o("close")}
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
            <input type="text" class="text-input" id="chat-text-input" data-id="chat-input"
                   placeholder="${this.t("inputPlaceholder")}" 
                   aria-label="${this.t("inputPlaceholder")}" 
                   required autocomplete="off">
            <button type="button" class="btn btn-secondary mic-btn" id="mic-btn" 
                    aria-label="${this.t("micLabel")}" title="${this.t("micLabel")}">
              ${o("microphone")}
            </button>
            <button type="submit" class="btn btn-primary" id="send-btn" data-id="btn-send">
              ${this.t("sendButton")}
            </button>
          </form>

          <!-- Bottom Row: Talk to a person & Continue on Telegram -->
          <div class="footer-actions-row">
            <button type="button" class="btn btn-secondary btn-footer btn-talk-person" id="btn-footer-handoff">
              ${o("person")} ${this.t("talkToPersonButton")}
            </button>
            <div id="telegram-container" class="telegram-section">
              <!-- Rendered by updateTelegramLinkUI() -->
            </div>
          </div>
        </footer>

        <!-- Settings Dialog Modal Overlay with Full Tabbed Support -->
        <div id="settings-dialog" class="settings-dialog" ${this.isSettingsOpen?"":"hidden"} role="region" aria-labelledby="settings-dialog-title">
          <div class="settings-header">
            <h3 id="settings-dialog-title" style="margin:0; font-size:1.125rem;">${this.t("settingsTitle")}</h3>
            <button type="button" class="btn btn-secondary" id="btn-close-settings">
              ${this.t("closeSettings")}
            </button>
          </div>

          <!-- Settings Tab Buttons -->
          <div class="settings-tabs" role="tablist" style="display:flex; gap:0.25rem; margin-bottom:1rem; border-bottom:1px solid var(--b-border); padding-bottom:0.5rem; overflow-x:auto;">
            <button type="button" class="btn btn-primary settings-tab-btn" id="tab-general" role="tab" aria-selected="true" style="font-size:0.8125rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
              ${this.t("generalTab")}
            </button>
            <button type="button" class="btn btn-secondary settings-tab-btn" id="tab-support" role="tab" aria-selected="false" style="font-size:0.8125rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
              ${this.t("supportTab")}
            </button>
            <button type="button" class="btn btn-secondary settings-tab-btn" id="tab-link" role="tab" aria-selected="false" style="font-size:0.8125rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
              ${this.t("linkTab")}
            </button>
            <button type="button" class="btn btn-secondary settings-tab-btn" id="tab-handoff" role="tab" aria-selected="false" style="font-size:0.8125rem; min-height:2.25rem; padding:0.25rem 0.5rem;">
              ${this.t("handoffTab")}
            </button>
          </div>

          <!-- Tab Content 1: General (Display, Font, Contrast, Mode, Clear) -->
          <div id="pane-general" class="settings-pane">
            <!-- Text Size -->
            <div class="settings-section">
              <span class="settings-label">${this.t("textSizeLabel")}</span>
              <div class="size-btn-group">
                <button type="button" class="btn btn-secondary" id="btn-size-smaller" aria-pressed="${this.textSize==="smaller"}">
                  ${this.t("textSmaller")}
                </button>
                <button type="button" class="btn btn-secondary" id="btn-size-normal" aria-pressed="${this.textSize==="normal"}">
                  ${this.t("textNormal")}
                </button>
                <button type="button" class="btn btn-secondary" id="btn-size-larger" aria-pressed="${this.textSize==="larger"}">
                  ${this.t("textLarger")}
                </button>
              </div>
            </div>

            <!-- High Contrast -->
            <div class="settings-section">
              <label class="checkbox-row">
                <input type="checkbox" id="chk-contrast" ${this.highContrast?"checked":""}>
                <span class="settings-label">${this.t("highContrastLabel")}</span>
              </label>
            </div>

            <!-- Simple Mode -->
            <div class="settings-section">
              <label class="checkbox-row">
                <input type="checkbox" id="chk-simple-mode" ${this.simpleMode?"checked":""}>
                <div>
                  <span class="settings-label">${this.t("simpleModeLabel")}</span>
                  <div style="font-size:0.75rem; color:var(--b-text-muted);">${this.t("simpleModeDesc")}</div>
                </div>
              </label>
            </div>

            <!-- Clear Chat -->
            <div class="settings-section" style="border-top:1px solid var(--b-border); padding-top:0.75rem;">
              <button type="button" class="btn btn-secondary" id="btn-clear-chat" style="font-size:0.875rem; width:100%;">
                ${o("trash")} ${this.t("clearChatBtn")}
              </button>
            </div>
          </div>

          <!-- Tab Content 2: Support Preferences -->
          <div id="pane-support" class="settings-pane" style="display:none;">
            <div class="settings-section">
              <span class="settings-label">${this.t("supportNeedsTitle")}</span>
              <div style="font-size:0.75rem; color:var(--b-text-muted); margin-bottom:0.5rem;">
                ${this.t("supportZeroProof")}
              </div>

              <form id="support-form" style="display:flex; flex-direction:column; gap:0.5rem;">
                <label class="checkbox-row">
                  <input type="checkbox" name="need" value="extra_time" 
                         ${this.supportNeeds.needs.includes("extra_time")?"checked":""}>
                  <span style="font-size:0.875rem;">${this.t("needExtraTime")}</span>
                </label>

                <label class="checkbox-row">
                  <input type="checkbox" name="need" value="screen_reader_help" 
                         ${this.supportNeeds.needs.includes("screen_reader_help")?"checked":""}>
                  <span style="font-size:0.875rem;">${this.t("needScreenReader")}</span>
                </label>

                <label class="checkbox-row">
                  <input type="checkbox" name="need" value="written_instructions" 
                         ${this.supportNeeds.needs.includes("written_instructions")?"checked":""}>
                  <span style="font-size:0.875rem;">${this.t("needWritten")}</span>
                </label>

                <label class="checkbox-row">
                  <input type="checkbox" name="need" value="other" 
                         ${this.supportNeeds.needs.includes("other")||this.supportNeeds.other_text?"checked":""}>
                  <span style="font-size:0.875rem;">${this.t("needOther")}</span>
                </label>

                <textarea name="other_text" class="text-input" style="min-height:3.5rem;" 
                          placeholder="${this.t("otherPlaceholder")}">${this.supportNeeds.other_text||""}</textarea>

                <label style="font-size:0.875rem; font-weight:600; margin-top:0.25rem;">
                  ${this.t("contactModeLabel")}
                  <select name="contact_mode" class="text-input" style="margin-top:0.25rem; min-height:2.5rem;">
                    <option value="text" ${this.supportNeeds.preferred_contact_mode==="text"?"selected":""}>${this.t("modeText")}</option>
                    <option value="voice" ${this.supportNeeds.preferred_contact_mode==="voice"?"selected":""}>${this.t("modeVoice")}</option>
                    <option value="video" ${this.supportNeeds.preferred_contact_mode==="video"?"selected":""}>${this.t("modeVideo")}</option>
                    <option value="telegram" ${this.supportNeeds.preferred_contact_mode==="telegram"?"selected":""}>${this.t("modeTelegram")}</option>
                  </select>
                </label>

                <div id="support-saved-notice" class="support-saved-notice" hidden style="color:#166534; font-size:0.8125rem; font-weight:600;">
                  ${o("check")} ${this.t("supportSavedNotice")}
                </div>

                <button type="submit" class="btn btn-primary" style="margin-top:0.25rem;">
                  ${this.t("saveSupportBtn")}
                </button>
              </form>
            </div>
          </div>

          <!-- Tab Content 3: Account Linking -->
          <div id="pane-link" class="settings-pane" style="display:none;">
            <div class="settings-section">
              <span class="settings-label">${this.t("linkTab")}</span>
              <p style="font-size:0.8125rem; color:var(--b-text-muted); margin:0.25rem 0 0.75rem 0;">
                ${this.t("supportZeroProof")}
              </p>
              <button type="button" class="btn btn-primary" id="btn-generate-code" style="width:100%;">
                ${o("key")} ${this.t("generateCodeBtn")}
              </button>
              <div class="code-display" id="code-display" style="display:none; font-size:1.5rem; font-weight:700; letter-spacing:0.25em; text-align:center; padding:0.75rem; background:#f8fafc; border:1px solid #cbd5e1; border-radius:0.5rem; margin-top:0.75rem;">
              </div>
            </div>
          </div>

          <!-- Tab Content 4: Live Help Handoff -->
          <div id="pane-handoff" class="settings-pane" style="display:none;">
            <div class="settings-section">
              <span class="settings-label">${this.t("handoffTab")}</span>
              <p style="font-size:0.8125rem; color:var(--b-text-muted); margin:0.25rem 0 0.75rem 0;">
                ${this.t("appSubtitle")}
              </p>
              <form id="handoff-request-form" style="display:flex; flex-direction:column; gap:0.5rem;">
                <label class="checkbox-row">
                  <input type="checkbox" id="handoff-consent" required checked>
                  <span style="font-size:0.8125rem;">${this.t("handoffConsentCheck")}</span>
                </label>
                <label style="font-size:0.8125rem; font-weight:600;">
                  ${this.t("handoffReasonLabel")}
                  <input type="text" id="handoff-reason" class="text-input" style="margin-top:0.25rem;" 
                         placeholder="${this.t("handoffReasonPlaceholder")}">
                </label>
                <button type="submit" class="btn btn-primary" id="btn-submit-handoff">
                  ${o("person")} ${this.t("requestMentorBtn")}
                </button>
              </form>
              <div id="handoff-room-box" style="margin-top:0.5rem;"></div>
            </div>
          </div>

        </div>

      </section>
    `,this.renderMessages(),this.updateTelegramLinkUI(),this.bindEvents())}renderMessages(){const e=this.shadowRoot?.querySelector("#chat-log");if(e){if(this.messages.length===0){e.innerHTML=`
        <div class="empty-state">
          <p style="margin:0; font-size:1rem; font-weight:600;">${this.t("emptyWelcome")}</p>
          <div class="suggested-questions">
            <span style="font-size:0.8125rem; font-weight:700; color:var(--b-text-muted);">${this.t("suggestedTitle")}</span>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ1"))}">
              ${o("arrow")} ${this.escapeHtml(this.t("suggestedQ1"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ2"))}">
              ${o("arrow")} ${this.escapeHtml(this.t("suggestedQ2"))}
            </button>
            <button type="button" class="btn btn-suggested" data-q="${this.escapeHtml(this.t("suggestedQ3"))}">
              ${o("arrow")} ${this.escapeHtml(this.t("suggestedQ3"))}
            </button>
          </div>
        </div>
      `,e.querySelectorAll(".btn-suggested").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-q");a&&this.askQuestion(a)})});return}e.innerHTML=this.messages.map(t=>{if(t.sender==="learner")return`
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(t.text)}</p>
            </div>
          `;const a=t.citations&&t.citations.length>0,i=!!t.isRefusal,s=t.isHandoff?this.t("handoffReadyTitle"):this.t("answerHeading");return`
          <div class="msg-row msg-assistant" id="${t.id}">
            <h4 class="answer-heading">${this.escapeHtml(s)}</h4>
            <p class="answer-text">${this.escapeHtml(t.text)}</p>
            ${t.roomUrl?`<div class="handoff-card" style="margin-top:0.75rem; padding:0.75rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:0.5rem;">
                    <p style="margin:0 0 0.5rem 0; font-size:0.875rem; font-weight:600; color:#166534;">${o("check")} ${this.t("handoffReadyTitle")}</p>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                      <a class="btn btn-primary room-link" href="${this.escapeHtml(t.roomUrl)}" target="_blank" rel="noopener noreferrer">${o("video")} ${this.t("joinRoomButton")}</a>
                      <button type="button" class="btn btn-secondary btn-copy-room" data-url="${this.escapeHtml(t.roomUrl)}" style="font-size:0.8125rem; min-height:2.25rem;">${o("copy")} ${this.t("copyRoomBtn")}</button>
                    </div>
                    <div style="font-size:0.75rem; color:#15803d; margin-top:0.5rem;">${this.t("androidFallbackNote")}</div>
                  </div>`:""}

            ${i?`
                <div class="not-verified-box refusal-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap; margin-top:0.5rem;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${t.id}" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${o("person")} ${this.t("talkToPersonButton")}
                    </button>
                    <button type="button" class="btn btn-secondary btn-try-another" style="font-size:0.8125rem; min-height:2.25rem;">
                      ${this.t("tryAnotherQuestion")}
                    </button>
                  </div>
                </div>
              `:""}

            <!-- Listen & Make Simpler action buttons -->
            <div class="answer-actions">
              <button type="button" class="btn btn-secondary btn-listen" data-msg-id="${t.id}">
                ${t.isAudioPlaying?`${o("pause")} ${this.t("pauseButton")}`:`${o("volume")} ${this.t("listenButton")}`}
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${t.id}">
                ${o("simplify")} ${this.t("makeSimplerButton")}
              </button>
            </div>

            <!-- Citations / Sources with readable names -->
            ${a?`
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${t.citations.map(d=>`
                    <a href="${this.escapeHtml(d.url)}" target="_blank" rel="noopener noreferrer" class="source-link citation-link">
                      ${o("book")} ${this.escapeHtml(d.title||d.heading)}
                    </a>
                  `).join("")}
                </div>
              `:""}
          </div>
        `}).join(""),this.isThinking&&(e.innerHTML+=`
        <div class="live-status-indicator">
          ${o("clock")} ${this.t("lookingInCourse")}
        </div>
      `),e.querySelectorAll(".btn-listen").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-msg-id"),i=this.messages.find(s=>s.id===a);i&&this.handleListen(i)})}),e.querySelectorAll(".btn-simpler").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-msg-id"),i=this.messages.find(s=>s.id===a);if(i){const s=i.originalQuestion||i.text;this.askQuestion(s,!0)}})}),e.querySelectorAll(".btn-talk-person").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-msg-id"),i=this.messages.find(s=>s.id===a);this.requestHandoff(i?`Refusal regarding question: ${i.text}`:void 0)})}),e.querySelectorAll(".btn-try-another").forEach(t=>{t.addEventListener("click",()=>{const a=this.shadowRoot?.querySelector("#chat-text-input, #chat-input");a&&(a.value="",a.focus())})}),e.querySelectorAll(".btn-copy-room").forEach(t=>{t.addEventListener("click",async()=>{const a=t.getAttribute("data-url");a&&navigator.clipboard&&(await navigator.clipboard.writeText(a),this.announce(this.t("linkCodeCopied")))})}),e.scrollTop=e.scrollHeight}}bindEvents(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("#launcher-btn"),t=this.shadowRoot.querySelector("#assistant-dialog"),a=this.shadowRoot.querySelector("#btn-close-dialog"),i=this.shadowRoot.querySelector("#language-select"),s=this.shadowRoot.querySelector("#btn-open-settings"),d=this.shadowRoot.querySelector("#btn-close-settings"),g=()=>{this.isOpen=!1,t.hidden=!0,e.setAttribute("aria-expanded","false"),(this.previousFocus??e).focus()};e.addEventListener("click",()=>{this.previousFocus=e,this.isOpen=!0,t.hidden=!1,e.setAttribute("aria-expanded","true"),this.shadowRoot?.querySelector("#chat-input")?.focus()}),a.addEventListener("click",g),t.addEventListener("keydown",n=>{if(n.key==="Escape"){if(this.isSettingsOpen){this.isSettingsOpen=!1;const l=this.shadowRoot?.querySelector("#settings-dialog");l&&l.setAttribute("hidden","true")}else g();n.preventDefault();return}if(n.key==="Tab"){const l=this.shadowRoot?.querySelector("#settings-dialog"),p=this.isSettingsOpen&&l?l:t,b=Array.from(p.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(_=>!_.closest("[hidden]"));if(!b.length)return;const x=b[0],C=b[b.length-1],B=this.shadowRoot?.activeElement;n.shiftKey&&B===x?(C.focus(),n.preventDefault()):!n.shiftKey&&B===C&&(x.focus(),n.preventDefault())}}),i.addEventListener("change",()=>{this.setLanguage(i.value)}),s.addEventListener("click",()=>{this.isSettingsOpen=!0;const n=this.shadowRoot?.querySelector("#settings-dialog");if(n){n.removeAttribute("hidden");const l=n.querySelector("button, input");l&&l.focus()}}),d.addEventListener("click",()=>{this.isSettingsOpen=!1;const n=this.shadowRoot?.querySelector("#settings-dialog");n&&n.setAttribute("hidden","true"),s.focus()});const u=[{btn:this.shadowRoot.querySelector("#tab-general"),pane:this.shadowRoot.querySelector("#pane-general")},{btn:this.shadowRoot.querySelector("#tab-support"),pane:this.shadowRoot.querySelector("#pane-support")},{btn:this.shadowRoot.querySelector("#tab-link"),pane:this.shadowRoot.querySelector("#pane-link")},{btn:this.shadowRoot.querySelector("#tab-handoff"),pane:this.shadowRoot.querySelector("#pane-handoff")}];u.forEach(({btn:n,pane:l})=>{n?.addEventListener("click",()=>{u.forEach(p=>{p.btn?.setAttribute("aria-selected","false"),p.btn?.classList.remove("btn-primary"),p.btn?.classList.add("btn-secondary"),p.pane&&(p.pane.style.display="none")}),n.setAttribute("aria-selected","true"),n.classList.remove("btn-secondary"),n.classList.add("btn-primary"),l&&(l.style.display="block")})}),this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click",()=>{this.textSize="smaller",this.setAttribute("data-size","smaller"),localStorage.setItem("savanna_bridge_text_size","smaller"),this.updateSizeButtons()}),this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click",()=>{this.textSize="normal",this.setAttribute("data-size","normal"),localStorage.setItem("savanna_bridge_text_size","normal"),this.updateSizeButtons()}),this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click",()=>{this.textSize="larger",this.setAttribute("data-size","larger"),localStorage.setItem("savanna_bridge_text_size","larger"),this.updateSizeButtons()});const f=this.shadowRoot.querySelector("#chk-contrast");f&&f.addEventListener("change",()=>{this.highContrast=f.checked,this.setAttribute("data-contrast",this.highContrast?"high":"normal"),localStorage.setItem("savanna_bridge_contrast",this.highContrast?"high":"normal")});const y=this.shadowRoot.querySelector("#chk-simple-mode");y&&y.addEventListener("change",()=>{this.simpleMode=y.checked,localStorage.setItem("savanna_bridge_simple_mode",this.simpleMode?"true":"false")}),this.shadowRoot.querySelector("#btn-clear-chat")?.addEventListener("click",()=>{this.clearChat()}),this.shadowRoot.querySelector("#btn-generate-code")?.addEventListener("click",()=>{this.generateLinkCode()});const S=this.shadowRoot.querySelector("#handoff-request-form");S&&S.addEventListener("submit",n=>{n.preventDefault();const l=this.shadowRoot?.querySelector("#handoff-reason");this.requestHandoff(l?.value||void 0)});const w=this.shadowRoot.querySelector("#support-form");w&&w.addEventListener("submit",n=>{n.preventDefault();const l=new FormData(w),p=l.getAll("need"),b=l.get("other_text")||"",x=l.get("contact_mode")||"text";this.saveSupportNeeds(p,b,x)});const L=this.shadowRoot.querySelector("#chat-form"),v=this.shadowRoot.querySelector("#chat-text-input, #chat-input"),$=this.shadowRoot.querySelector("#mic-btn");L&&v&&L.addEventListener("submit",n=>{n.preventDefault();const l=v.value;v.value="",this.askQuestion(l)}),$&&v&&$.addEventListener("click",()=>{this.toggleVoiceInput(v)}),this.shadowRoot.querySelector("#btn-footer-handoff")?.addEventListener("click",()=>{this.requestHandoff()})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}return customElements.get("bridge-assistant")||customElements.define("bridge-assistant",k),customElements.get("db-assistant")||customElements.define("db-assistant",class extends k{}),c.BridgeAssistant=k,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),c})({});
//# sourceMappingURL=widget.iife.js.map
