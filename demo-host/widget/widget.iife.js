var SavannaBridgeAssistant=(function(g){"use strict";var w=Object.defineProperty;var x=(g,c,p)=>c in g?w(g,c,{enumerable:!0,configurable:!0,writable:!0,value:p}):g[c]=p;var o=(g,c,p)=>x(g,typeof c!="symbol"?c+"":c,p);const c={en:{appTitle:"Savanna Bridge Assistant",appSubtitle:"Ask questions, adjust support, or connect with a mentor",closeLabel:"Close dialog",launcherLabel:"Help & Assistant",wakeHint:'Say "Help" or tap to open',settingsLabel:"Settings",settingsTitle:"Assistant Settings",closeSettings:"Done",textSizeLabel:"Text Size",textSmaller:"Smaller",textNormal:"Normal",textLarger:"Larger",highContrastLabel:"High Contrast",simpleModeLabel:"Simple mode",simpleModeDesc:"Explain answers in shorter, simpler sentences",autoReadSpeechLabel:"Read responses aloud automatically",autoReadSpeechDesc:"Assistant will speak answers when they arrive",supportNeedsTitle:"Support Preferences",supportZeroProof:"No medical documentation or proof required. All preferences are private.",needExtraTime:"Extra response time for tests and questions",needScreenReader:"Screen reader friendly materials and alt text",needWritten:"Written questions and instructions",needOther:"Other support needs",otherPlaceholder:"Describe any other accommodations...",contactModeLabel:"Preferred contact mode for live help:",modeText:"Text chat",modeVoice:"Voice call",modeVideo:"Video call",modeTelegram:"Telegram message",saveSupportBtn:"Save Preferences",supportSavedNotice:"Preferences saved privately.",emptyWelcome:"Welcome! Ask any question about your course.",suggestedTitle:"Suggested questions:",suggestedQ1:"What does Module 2 teach?",suggestedQ2:"Explain customer service foundations",suggestedQ3:"How do I communicate with customers?",inputPlaceholder:"Ask a question about this course...",sendButton:"Send",micLabel:"Microphone (voice input)",recordingState:"Listening... speak now",transcribingState:"Processing speech...",voicePreviewNotice:"Voice transcribed. You can edit the text before sending.",micError:"Microphone unavailable. Please check microphone permissions or type your question.",lookingInCourse:"Looking in the course...",answerHeading:"Answer",listenButton:"Listen",pauseButton:"Stop",replayButton:"Replay",makeSimplerButton:"Make simpler",sourcesTitle:"Course sources:",talkToPersonButton:"Talk to a person",continueOnTelegram:"Continue on Telegram",continueOnTelegramAria:"Continue on Telegram (opens Telegram)",telegramPrivacyNotice:"Telegram will receive your questions and the answers.",telegramConnected:"Telegram connected",connectedToTelegram:"Connected to Telegram",disconnectTelegram:"Disconnect",tryAnotherQuestion:"Try another question",notVerifiedNotice:"I cannot verify this from the course materials. A human mentor can help you directly.",offlineBanner:"You are offline.",savedOnPhoneNotice:"Saved on this phone. It will send when you are online.",serverErrorNotice:"Could not connect to the assistant. Please check your connection and try again.",handoffReadyTitle:"Your Live Help Room is Ready",joinRoomButton:"Join Live Help Room ↗",leaveRoomButton:"Close Help Session",androidFallbackNote:"Android note: Browser screen sharing (getDisplayMedia) is not supported in Chrome on Android. Your mentor automatically sees your active lesson URL, section, and focused element.",voiceListening:"Listening... Speak now",voiceProcessing:"Processing speech...",voiceSpeaking:"Reading response aloud...",stopAudio:"Stop"},am:{appTitle:"የሳቫና ብሪጅ ረዳት",appSubtitle:"ጥያቄዎችን ይጠይቁ፣ ድጋፍዎን ያስተካክሉ፣ ወይም ከአማካሪ ጋር ይገናኙ",closeLabel:"መስኮቱን ዝጋ",launcherLabel:"እርዳታ እና ረዳት",wakeHint:'"እርዳታ" ይበሉ ወይም ይንኩ',settingsLabel:"ቅንብሮች",settingsTitle:"የረዳት ቅንብሮች",closeSettings:"ጨርስ",textSizeLabel:"የጽሑፍ መጠን",textSmaller:"አነስተኛ",textNormal:"መደበኛ",textLarger:"ትልቅ",highContrastLabel:"ከፍተኛ ንፅፅር",simpleModeLabel:"ቀላል ማብራሪያ",simpleModeDesc:"መልሶችን በአጫጭርና በቀላል ዓረፍተ ነገሮች አስረዳኝ",autoReadSpeechLabel:"መልሶችን በድምጽ በራስ-ሰር አንብብ",autoReadSpeechDesc:"መልሶች እንደደረሱ ረዳቱ በድምጽ ያነበዋል",supportNeedsTitle:"የግል የድጋፍ ፍላጎቶች",supportZeroProof:"ምንም ዓይነት የህክምና ማስረጃ ወይም ማረጋገጫ አያስፈልግም።",needExtraTime:"ለፈተናዎች እና ጥያቄዎች ተጨማሪ ጊዜ",needScreenReader:"ለስክሪን አንባቢ ምቹ የሆነ አቀራረብ",needWritten:"የጽሑፍ ጥያቄዎች እና መመሪያዎች",needOther:"ሌሎች የድጋፍ ፍላጎቶች",otherPlaceholder:"የሚፈልጉትን ተጨማሪ ድጋፍ ይግለጹ...",contactModeLabel:"የቀጥታ ድጋፍ የሚፈልጉበት መንገድ፡",modeText:"የጽሑፍ መልእክት",modeVoice:"የድምጽ ጥሪ",modeVideo:"የቪዲዮ ጥሪ",modeTelegram:"የቴሌግራም መልእክት",saveSupportBtn:"ምርጫዎችን መዝግብ",supportSavedNotice:"ምርጫዎችዎ በሚስጥር ተቀምጠዋል።",emptyWelcome:"እንኳን ደህና መጡ! ስለ ኮርሱ ማንኛውንም ጥያቄ ይጠይቁ።",suggestedTitle:"የተጠቆሙ ጥያቄዎች፡",suggestedQ1:"ሞጁል 2 ምን ያስተምራል?",suggestedQ2:"የደንበኞች አገልግሎት መሰረቶችን አስረዳኝ",suggestedQ3:"ከደንበኞች ጋር እንዴት መገናኘት እችላለሁ?",inputPlaceholder:"ስለዚህ ኮርስ ጥያቄ ይጠይቁ...",sendButton:"ላክ",micLabel:"ማይክሮፎን (የድምጽ ግብዓት)",recordingState:"እያዳመጥኩ ነው... አሁን ይናገሩ",transcribingState:"ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",voicePreviewNotice:"ድምጽዎ ወደ ጽሑፍ ተቀይሯል። ከመላክዎ በፊት ማስተካከል ይችላሉ።",micError:"ማይክሮፎን ማግኘት አልተቻለም። እባክዎ ጥያቄዎን በጽሑፍ ያስገቡ።",lookingInCourse:"በኮርሱ ውስጥ በመፈለግ ላይ...",answerHeading:"መልስ",listenButton:"አዳምጥ",pauseButton:"አቁም",replayButton:"እንደገና አጫውት",makeSimplerButton:"ቀለል አድርግ",sourcesTitle:"የኮርስ ምንጮች፡",talkToPersonButton:"ከሰው ጋር ተነጋገር",continueOnTelegram:"በቴሌግራም ቀጥል",continueOnTelegramAria:"በቴሌግራም ቀጥል (ቴሌግራምን ይከፍታል)",telegramPrivacyNotice:"ቴሌግራም ጥያቄዎችዎን እና መልሶቹን ይቀበላል።",telegramConnected:"ቴሌግራም ተገናኝቷል",connectedToTelegram:"ከቴሌግራም ጋር ተገናኝቷል",disconnectTelegram:"ግንኙነት አቋርጥ",tryAnotherQuestion:"ሌላ ጥያቄ ሞክር",notVerifiedNotice:"ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። የሰው አማካሪ በቀጥታ ሊረዳዎት ይችላል።",offlineBanner:"ከመስመር ውጭ ነዎት።",savedOnPhoneNotice:"በዚህ ስልክ ላይ ተቀምጧል። መስመር ላይ ሲሆኑ ይላካል።",serverErrorNotice:"ከአገልጋዩ ጋር መገናኘት አልተቻለም። እባክዎ ግንኙነትዎን ያረጋግጡና እንደገና ይሞክሩ።",handoffReadyTitle:"የቀጥታ ድጋፍ ክፍልዎ ዝግጁ ነው",joinRoomButton:"ወደ ስብሰባው ክፍል ግባ ↗",leaveRoomButton:"ክፍለ-ጊዜውን ዝጋ",androidFallbackNote:"የአንድሮይድ ማሳሰቢያ፡ በአንድሮይድ ክሮም ላይ የስክሪን ማጋራት አይደገፍም። አማካሪዎ እርስዎ ያሉበትን የትምህርት ገጽ እና ርዕስ በቀጥታ ይመለከታል።",voiceListening:"እያዳመጥኩ ነው... አሁን ይናገሩ",voiceProcessing:"ድምጹን ወደ ጽሑፍ በመቀየር ላይ...",voiceSpeaking:"ረዳቱ መልሱን እያነበበ ነው...",stopAudio:"አቁም"},om:{appTitle:"Gargaaraa Savanna Bridge",appSubtitle:"Gaaffii gaafadhaa, deeggarsa madaalsisaa, ykn gorsaa waliin walqunnamaa",closeLabel:"Cufi",launcherLabel:"Gargaarsa & Deeggarsa",wakeHint:'"Gargaarsa" jedhaa ykn tuqaa',settingsLabel:"Qindaa'ina",settingsTitle:"Qindaa'ina Gargaaraa",closeSettings:"Xumuri",textSizeLabel:"Hamma Barruu",textSmaller:"Xiqqaa",textNormal:"Idilee",textLarger:"Guddaa",highContrastLabel:"Waliin-dhaabbii Olaanaa",simpleModeLabel:"Ibsa salphaa",simpleModeDesc:"Himoota gaggabaaboo fi salphaadhaan ibsi",autoReadSpeechLabel:"Deebii ofumaan sagaleedhaan dubbisi",autoReadSpeechDesc:"Deebiin akkuma dhufeen gargaaraan sagaleedhaan dubbisa",supportNeedsTitle:"Filannoo Deeggarsaa",supportZeroProof:"Waraqaan yaalaa hin barbaachisu. Filannoon keessan dhuunfaadha.",needExtraTime:"Qorumsaaf yeroo dabalataa",needScreenReader:"Dubbisaa iskiriiniif kan mijate",needWritten:"Qajeelfama barruudhaan",needOther:"Deeggarsa biraa",otherPlaceholder:"Ibsaa...",contactModeLabel:"Mala qunnamtii filattan:",modeText:"Barruu",modeVoice:"Sagalee",modeVideo:"Viidiyoo",modeTelegram:"Telegiraamii",saveSupportBtn:"Galmeessi",supportSavedNotice:"Filannoon keessan galmaa'eera.",emptyWelcome:"Baga nagaan dhuftan! Gaaffii kamiyyuu gaafadhaa.",suggestedTitle:"Gaaffiiwwan filataman:",suggestedQ1:"Kutaan 2 maal barsiisa?",suggestedQ2:"Bu'uuraalee tajaajila maamiltootaa ibsi",suggestedQ3:"Maamiltoota waliin akkamittan qunnama?",inputPlaceholder:"Waa'ee barnoota kanaa gaafadhaa...",sendButton:"Ergi",micLabel:"Maaykirofoonii",recordingState:"Dhaggeeffachaa jira... dubbadhaa",transcribingState:"Sagalee jijjiiraa jira...",voicePreviewNotice:"Sagaleen gara barruutti jijjiirameera. Ergisaa dura sirreessuu dandeessu.",micError:"Maaykirofooniin hin argamne.",lookingInCourse:"Barnoota keessaa barbaadaa jira...",answerHeading:"Deebii",listenButton:"Dhaggeeffadhu",pauseButton:"Dhaabi",replayButton:"Irra deebi'i",makeSimplerButton:"Salphisi",sourcesTitle:"Madda barnootaa:",talkToPersonButton:"Nama waliin dubbadhu",continueOnTelegram:"Telegiraamiin Itti fufi",continueOnTelegramAria:"Telegiraamiin Itti fufi (Telegiraamii bana)",telegramPrivacyNotice:"Telegiraam gaaffii fi deebii keessan ni fudhata.",telegramConnected:"Telegiraam walqabateera",connectedToTelegram:"Telegiraamii waliin walqabateera",disconnectTelegram:"Gargar Baasi",tryAnotherQuestion:"Gaaffii biraa yaali",notVerifiedNotice:"Barnoota keessaa mirkaneessuu hin dandeenye.",offlineBanner:"Toora irraa ala jirtu.",savedOnPhoneNotice:"Bilbila kana irratti kuufameera. Toora irratti yemmuu dhuftan ergama.",serverErrorNotice:"Gargaaraa waliin walqunnamuu hin dandeenye.",handoffReadyTitle:"Kutaan gargaarsaa qophiidha",joinRoomButton:"Kutaa Seenaa ↗",leaveRoomButton:"Kutaa Dhiisaa",androidFallbackNote:"Iskiriinii qooduun Android irratti hin danda'amu.",voiceListening:"Dhaggeeffachaa jira... Amma dubbadhaa",voiceProcessing:"Sagalee gara barruutti jijjiiraa jira...",voiceSpeaking:"Gargaaraan deebii dubbisaa jira...",stopAudio:"Dhaabi"},ti:{appTitle:"ናይ ሳቫና ብሪጅ ሓጋዚ",appSubtitle:"ሕቶታት ሕተቱ፡ ድሌትኩም ኣመዓራርዩ፡ ወይ ምስ መካሪ ተራኸቡ",closeLabel:"ዕጾ",launcherLabel:"ሓገዝ & ሓጋዚ",wakeHint:'"ሓገዝ" በሉ ወይ ንከፉ',settingsLabel:"ቅጥዕታት",settingsTitle:"ናይ ሓጋዚ ቅጥዕታት",closeSettings:"ወዲአ",textSizeLabel:"መጠን ጽሑፍ",textSmaller:"ንእሽቶ",textNormal:"ስሩዕ",textLarger:"ዓቢ",highContrastLabel:"ላዕለዋይ ንጽጽር",simpleModeLabel:"ቀሊል መብርሂ",simpleModeDesc:"ብሓጸርቲ ሓረጋት ኣረድኣኒ",autoReadSpeechLabel:"መልስታት ብድምጺ ብቐጥታ ኣንብብ",autoReadSpeechDesc:"መልሲ ምስ መጸ ብድምጺ ይንበብ",supportNeedsTitle:"ናይ ውልቂ ሓገዝ ምርጫታት",supportZeroProof:"ሕክምናዊ መርትዖ ኣየድልን እዩ። ምርጫታትኩም ምስጢራዊ እዩ።",needExtraTime:"ተወሳኺ ግዜ ንፈተናታት",needScreenReader:"ንስክሪን ኣንባቢ ምቹእ",needWritten:"ናይ ጽሑፍ መምርሒታት",needOther:"ካልእ ድሌታት",otherPlaceholder:"ግለጹ...",contactModeLabel:"ትመርጽዎ ናይ ርክብ መገዲ፡",modeText:"ጽሑፍ",modeVoice:"ድምጺ",modeVideo:"ቪድዮ",modeTelegram:"ቴሌግራም",saveSupportBtn:"ኣቐምጥ",supportSavedNotice:"ምርጫታትኩም ተቐሚጡ ኣሎ።",emptyWelcome:"እንቋዕ ብደሓን መጻእኩም! ዝኾነ ሕቶ ሕተቱ።",suggestedTitle:"ዝተመርጹ ሕቶታት፡",suggestedQ1:"ሞጁል 2 እንታይ ይምህር?",suggestedQ2:"መሰረታት ኣገልግሎት ዓማዊል ኣብርሃለይ",suggestedQ3:"ምስ ዓማዊል ብኸመይ ይራኸብ?",inputPlaceholder:"ብዛዕባዚ ኮርስ ሕቶ ሕተቱ...",sendButton:"ስደድ",micLabel:"ማይክሮፎን",recordingState:"ይሰምዕ ኣለኹ... ሕጂ ተዛረቡ",transcribingState:"ናብ ጽሑፍ ይቕየር ኣሎ...",voicePreviewNotice:"ድምጽኹም ናብ ጽሑፍ ተቐዪሩ ኣሎ።",micError:"ማይክሮፎን ክርከብ ኣይተኻእለን።",lookingInCourse:"ኣብ ኮርስ ይድለ ኣሎ...",answerHeading:"መልሲ",listenButton:"ስማዕ",pauseButton:"ኣዕርፍ",replayButton:"ደጊምካ ስማዕ",makeSimplerButton:"ቀሊል ግበሮ",sourcesTitle:"ምንጭታት ኮርስ፡",talkToPersonButton:"ምስ ሰብ ተዛረብ",continueOnTelegram:"ብቴሌግራም ቀጽል",continueOnTelegramAria:"ብቴሌግራም ቀጽል (ቴሌግራም ይኸፍት)",telegramPrivacyNotice:"ቴሌግራም ሕቶኹምን መልስኹምን ይቕበል እዩ።",telegramConnected:"ቴሌግራም ተላጊቡ ኣሎ",connectedToTelegram:"ምስ ቴሌግራም ተላጊቡ ኣሎ",disconnectTelegram:"ግንኙነት ኣቋርጽ",tryAnotherQuestion:"ካልእ ሕቶ ፈትን",notVerifiedNotice:"እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን።",offlineBanner:"መስመር ተቛሪጹ ኣሎ።",savedOnPhoneNotice:"ኣብዚ ስልኪ ተቐሚጡ ኣሎ። ኦንላይን ምስ ኮንኩም ክስደድ እዩ።",serverErrorNotice:"ምስ ሓጋዚ ክራኸብ ኣይተኻእለን።",handoffReadyTitle:"ናይ ሓገዝ ክፍሊ ድሉው እዩ",joinRoomButton:"ናብ ክፍሊ እቶ ↗",leaveRoomButton:"ክፍሊ ዕጾ",androidFallbackNote:"ኣብ አንድሮይድ ስክሪን ምክፋል ኣይድገፍን።",voiceListening:"ይሰምዕ ኣለኹ... ሕጂ ተዛረቡ",voiceProcessing:"ናብ ጽሑፍ ይቕየር ኣሎ...",voiceSpeaking:"ሓጋዚ መልሲ የንብብ ኣሎ...",stopAudio:"ኣቁም"},ar:{appTitle:"مساعد سافانا بريدج",appSubtitle:"اطرح أسئلة، خصص دعمك، أو تواصل مع مرشد",closeLabel:"إغلاق النافذة",launcherLabel:"المساعدة والمساعد",wakeHint:'قل "مساعدة" أو اضغط للفتح',settingsLabel:"الإعدادات",settingsTitle:"إعدادات المساعد",closeSettings:"تم",textSizeLabel:"حجم النص",textSmaller:"أصغر",textNormal:"عادي",textLarger:"أكبر",highContrastLabel:"تباين عالٍ",simpleModeLabel:"شرح مبسط",simpleModeDesc:"اشرح بجمل أقصر وأبسط",autoReadSpeechLabel:"قراءة الإجابات تلقائياً بصوت عالٍ",autoReadSpeechDesc:"سيقوم المساعد بقراءة الإجابة فور وصولها",supportNeedsTitle:"تفضيلات الدعم",supportZeroProof:"لا يُطلب أي تشخيص أو وثائق طبية. جميع التفضيلات سرية.",needExtraTime:"وقت استجابة إضافي للاختبارات",needScreenReader:"مواد متوافقة مع قارئ الشاشة",needWritten:"أسئلة وتعليمات مكتوبة",needOther:"احتياجات دعم أخرى",otherPlaceholder:"حدد أي احتياجات أخرى...",contactModeLabel:"طريقة التواصل المفضلة للمساعدة:",modeText:"محادثة نصية",modeVoice:"مكالمة صوتية",modeVideo:"مكالمة فيديو",modeTelegram:"رسالة تيليجرام",saveSupportBtn:"حفظ التفضيلات",supportSavedNotice:"تم حفظ التفضيلات بسرية.",emptyWelcome:"مرحباً بك! اطرح أي سؤال حول الدورة التدريبية.",suggestedTitle:"أسئلة مقترحة:",suggestedQ1:"ماذا نتعلم في الوحدة الثانية؟",suggestedQ2:"اشرح أساسيات خدمة العملاء",suggestedQ3:"كيف أتواصل بفعالية مع العملاء؟",inputPlaceholder:"اطرح سؤالاً حول هذه الدورة...",sendButton:"إرسال",micLabel:"الميكروفون (إدخال صوتي)",recordingState:"جاري الاستماع... تحدث الآن",transcribingState:"جاري تحويل الصوت إلى نص...",voicePreviewNotice:"تم تحويل الصوت إلى نص. يمكنك تعديله قبل الإرسال.",micError:"الميكروفون غير متوفر. يرجى التحقق من أذونات الميكروفون.",lookingInCourse:"جاري البحث في محتوى الدورة...",answerHeading:"الإجابة",listenButton:"استماع",pauseButton:"إيقاف",replayButton:"إعادة",makeSimplerButton:"تبسيط الشرح",sourcesTitle:"مصادر الدورة:",talkToPersonButton:"التحدث مع شخص",continueOnTelegram:"المتابعة عبر تيليجرام",continueOnTelegramAria:"المتابعة عبر تيليجرام (يفتح تيليجرام)",telegramPrivacyNotice:"سيتلقى تيليجرام أسئلتك وإجاباتها.",telegramConnected:"تم ربط تيليجرام",connectedToTelegram:"متصل عبر تيليجرام",disconnectTelegram:"قطع الاتصال",tryAnotherQuestion:"جرب سؤالاً آخر",notVerifiedNotice:"لا يمكنني التحقق من ذلك من محتوى الدورة. يمكن لمرشد بشري مساعدتك مباشرة.",offlineBanner:"أنت غير متصل بالإنترنت.",savedOnPhoneNotice:"تم الحفظ على الهاتف. سيتم الإرسال فور اتصالك بالإنترنت.",serverErrorNotice:"تعذر الاتصال بالمساعد. يرجى التحقق من اتصالك والمحاولة لاحقاً.",handoffReadyTitle:"غرفة المساعدة المباشرة جاهزة",joinRoomButton:"الانضمام للغرفة ↗",leaveRoomButton:"إغلاق الجلسة",androidFallbackNote:"ملاحظة أندرويد: مشاركة الشاشة عبر المتصفح غير مدعومة على متصفح Chrome لنظام أندرويد.",voiceListening:"جاري الاستماع... تحدث الآن",voiceProcessing:"جاري معالجة الصوت وتحويله إلى نص...",voiceSpeaking:"المساعد يقرأ الإجابة بصوت عالٍ...",stopAudio:"إيقاف"}},p=`
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
`;class f extends HTMLElement{constructor(){super(...arguments);o(this,"isOpen",!1);o(this,"currentLang","en");o(this,"textSize","normal");o(this,"highContrast",!1);o(this,"simpleMode",!1);o(this,"autoReadSpeech",!0);o(this,"isOffline",!navigator.onLine);o(this,"isThinking",!1);o(this,"isRecording",!1);o(this,"isProcessingSpeech",!1);o(this,"isSpeaking",!1);o(this,"mediaRecorder",null);o(this,"audioChunks",[]);o(this,"activeRecognition",null);o(this,"wakeWordRecognizer",null);o(this,"activeAudio",null);o(this,"messages",[]);o(this,"sessionId",`sess_${Date.now()}_${Math.random().toString(36).substring(2,8)}`);o(this,"telegramToken",null);o(this,"telegramDeepLink","https://t.me/savannah_assistant3_bot");o(this,"isTelegramLinked",!1);o(this,"telegramPollTimer",null);o(this,"isSettingsOpen",!1);o(this,"activeHandoff",null);o(this,"supportNeeds",{needs:["written_instructions"],other_text:"",preferred_contact_mode:"text"});o(this,"previousFocus",null)}get apiBase(){return this.getAttribute("api")||this.getAttribute("data-api")||"http://localhost:8000"}get courseId(){return this.getAttribute("content")||this.getAttribute("data-course")||"course_demo"}static get observedAttributes(){return["lang","data-lang","api","data-api","content","data-course"]}attributeChangedCallback(e,t,i){t!==i&&(e==="lang"||e==="data-lang")&&i in c&&(this.currentLang=i,this.shadowRoot&&this.render())}connectedCallback(){if(this.shadowRoot)return;const e=this.getAttribute("lang")||this.getAttribute("data-lang"),t=sessionStorage.getItem("savanna_bridge_lang");e&&e in c?this.currentLang=e:t&&t in c&&(this.currentLang=t),this.restoreState(),this.attachShadow({mode:"open"}),this.render(),this.setupNetworkMonitor(),this.fetchTelegramStartLink(),this.fetchSupportNeeds(),this.initWakeWordDetection(),this.initGlobalKeyboardShortcuts()}disconnectedCallback(){if(this.telegramPollTimer&&(window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null),this.wakeWordRecognizer){try{this.wakeWordRecognizer.stop()}catch{}this.wakeWordRecognizer=null}this.stopSpeaking()}t(e){return(c[this.currentLang]||c.en)[e]||c.en[e]||e}announce(e){const t=this.shadowRoot?.querySelector("#live-announcer");t&&(t.textContent="",setTimeout(()=>{t.textContent=e},50))}getLangDisplayName(e=this.currentLang){switch(e){case"am":return"አማርኛ";case"om":return"Afaan Oromoo";case"ti":return"ትግርኛ";case"ar":return"العربية";default:return"English"}}setLanguage(e,t=!0){this.currentLang=e,sessionStorage.setItem("savanna_bridge_lang",e),this.setAttribute("dir",e==="ar"?"rtl":"ltr"),t?this.render():(this.updateHeaderLanguageButtons(),this.updateVoiceStatusUI())}updateHeaderLanguageButtons(){const e=this.shadowRoot;if(!e)return;["en","am","om","ar"].forEach(i=>{const a=e.querySelector(`#btn-lang-${i}`);a&&a.setAttribute("aria-pressed",i===this.currentLang?"true":"false")})}setupNetworkMonitor(){window.addEventListener("online",()=>{this.isOffline=!1,this.render(),this.flushOfflineQueue()}),window.addEventListener("offline",()=>{this.isOffline=!0,this.render()})}async flushOfflineQueue(){try{const e=localStorage.getItem("db_assistant_offline_queue");if(!e)return;const t=JSON.parse(e);localStorage.removeItem("db_assistant_offline_queue");for(const i of t)i&&i.question&&await this.askQuestion(i.question)}catch(e){console.warn("Could not flush offline queue",e)}}restoreState(){try{const e=sessionStorage.getItem("savanna_bridge_chat_history");e&&(this.messages=JSON.parse(e));const t=localStorage.getItem("savanna_bridge_contrast");t&&(this.highContrast=t==="high");const i=localStorage.getItem("savanna_bridge_text_size");i&&(this.textSize=i);const a=localStorage.getItem("savanna_bridge_auto_read");a!==null&&(this.autoReadSpeech=a==="true")}catch{}}saveChatState(){try{sessionStorage.setItem("savanna_bridge_chat_history",JSON.stringify(this.messages.slice(-25)))}catch{}}playEarcon(e){try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const i=new t,a=i.createOscillator(),s=i.createGain();a.connect(s),s.connect(i.destination);const n=i.currentTime;e==="wake"||e==="start"?(a.type="sine",a.frequency.setValueAtTime(440,n),a.frequency.exponentialRampToValueAtTime(880,n+.15),s.gain.setValueAtTime(.12,n),s.gain.exponentialRampToValueAtTime(.001,n+.22),a.start(n),a.stop(n+.22)):e==="stop"?(a.type="sine",a.frequency.setValueAtTime(880,n),a.frequency.exponentialRampToValueAtTime(440,n+.15),s.gain.setValueAtTime(.12,n),s.gain.exponentialRampToValueAtTime(.001,n+.22),a.start(n),a.stop(n+.22)):e==="transcribed"&&(a.type="triangle",a.frequency.setValueAtTime(587.33,n),a.frequency.setValueAtTime(880,n+.08),s.gain.setValueAtTime(.12,n),s.gain.exponentialRampToValueAtTime(.001,n+.2),a.start(n),a.stop(n+.2))}catch{}}initWakeWordDetection(){const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(e)try{const t=new e;t.continuous=!0,t.interimResults=!0,t.lang="en-US",t.onresult=i=>{if(!this.isRecording)for(let a=i.resultIndex;a<i.results.length;a++){const s=(i.results[a][0]?.transcript||"").toLowerCase();if(s.includes("help")||s.includes("እርዳታ")||s.includes("እርዳኝ")||s.includes("gargaarsa")||s.includes("مساعدة")||s.includes("ساعدني")){this.onWakeWordTriggered();break}}},t.onerror=()=>{},t.onend=()=>{if(!this.isRecording&&!this.isSpeaking&&this.wakeWordRecognizer)try{t.start()}catch{}},t.start(),this.wakeWordRecognizer=t}catch(t){console.warn("Wake word background recognition notice:",t)}}onWakeWordTriggered(){this.openAssistant(),this.playEarcon("wake"),this.announce(this.t("voiceListening"));const e=this.shadowRoot?.querySelector("#chat-input");e&&this.startVoiceRecording(e)}initGlobalKeyboardShortcuts(){window.addEventListener("keydown",e=>{if(e.altKey&&e.shiftKey&&(e.key==="V"||e.key==="v"||e.key==="A"||e.key==="a")){e.preventDefault(),this.isOpen||this.openAssistant();const t=this.shadowRoot?.querySelector("#chat-input");t&&this.toggleVoiceInput(t)}})}openAssistant(){this.isOpen=!0;const e=this.shadowRoot?.querySelector("#assistant-dialog"),t=this.shadowRoot?.querySelector("#launcher-btn");e&&t&&(e.removeAttribute("hidden"),t.setAttribute("aria-expanded","true"),e.focus())}closeAssistant(){this.isOpen=!1;const e=this.shadowRoot?.querySelector("#assistant-dialog"),t=this.shadowRoot?.querySelector("#launcher-btn");e&&t&&(e.setAttribute("hidden","true"),t.setAttribute("aria-expanded","false"),(this.previousFocus??t).focus()),this.stopSpeaking(),this.isRecording&&this.stopVoiceRecording()}async fetchTelegramStartLink(){try{const e=await fetch(`${this.apiBase}/api/v1/link/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"web",learner_reference:`learner_${this.sessionId}`})});if(e.ok){const t=await e.json();this.telegramToken=t.token,this.telegramDeepLink=t.deep_link,this.updateTelegramLinkUI()}}catch(e){console.warn("Could not fetch telegram link start:",e)}}onTelegramLinkClicked(){if(this.isTelegramLinked||!this.telegramToken)return;this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer);let e=0;const t=300;this.telegramPollTimer=window.setInterval(async()=>{if(e++,e>t){this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null;return}try{const i=await fetch(`${this.apiBase}/api/v1/link/status?token=${encodeURIComponent(this.telegramToken)}`);i.ok&&(await i.json()).linked&&(this.telegramPollTimer&&window.clearInterval(this.telegramPollTimer),this.telegramPollTimer=null,this.isTelegramLinked=!0,this.announce(this.t("telegramConnected")),this.updateTelegramLinkUI())}catch(i){console.warn("Telegram status polling error:",i)}},2e3)}async disconnectTelegram(){try{await fetch(`${this.apiBase}/api/v1/link/disconnect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:this.sessionId,channel:"telegram"})})}catch{}this.isTelegramLinked=!1,await this.fetchTelegramStartLink(),this.updateTelegramLinkUI()}updateTelegramLinkUI(){const e=this.shadowRoot?.querySelector("#telegram-container");e&&(this.isTelegramLinked?(e.innerHTML=`
        <div style="display:flex; align-items:center; gap:0.375rem; width:100%;">
          <span style="font-size:0.8125rem; font-weight:600; color:#166534; flex:1;">
            ✓ ${this.t("connectedToTelegram")}
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
      `,e.querySelector("#tg-deep-link")?.addEventListener("click",()=>this.onTelegramLinkClicked())))}async fetchSupportNeeds(){try{const e=await fetch(`${this.apiBase}/api/v1/support-needs`);if(e.ok){const t=await e.json();this.supportNeeds={needs:t.needs||[],other_text:t.other_text||"",preferred_contact_mode:t.preferred_contact_mode||"text"}}}catch{}}async saveSupportNeeds(e,t,i){this.supportNeeds={needs:e,other_text:t,preferred_contact_mode:i};try{const a=await fetch(`${this.apiBase}/api/v1/support-needs`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.supportNeeds)}),s=this.shadowRoot?.querySelector("#support-saved-notice");s&&(s.removeAttribute("hidden"),setTimeout(()=>s.setAttribute("hidden","true"),3500)),a.ok||console.warn("PUT /support-needs failed",a.status)}catch(a){console.warn("Save support needs error:",a)}}detectLanguage(e){return/[\u1200-\u137F]/.test(e)?"am":/[\u0600-\u06FF]/.test(e)?"ar":/\b(waa'ee|moojulii|akkam|maal|hojii|barnoota|gaaffii|deebii|galatoomi|akkamitti|eessa|barataa|barumsa)\b/i.test(e)||/\b[A-Za-z]+'[A-Za-z]+\b/.test(e)?"om":"en"}async toggleVoiceInput(e){this.isRecording?this.stopVoiceRecording():await this.startVoiceRecording(e)}async startVoiceRecording(e){if(this.isSpeaking&&this.stopSpeaking(),this.wakeWordRecognizer)try{this.wakeWordRecognizer.stop()}catch{}this.isRecording=!0,this.isProcessingSpeech=!1,this.playEarcon("start"),this.announce(this.t("voiceListening")),this.updateVoiceStatusUI(),this.updateMicButtonUI();let t=!1;const i=window.SpeechRecognition||window.webkitSpeechRecognition;if(i)try{this.activeRecognition=new i,this.activeRecognition.continuous=!1,this.activeRecognition.interimResults=!0;const a={en:"en-US",am:"am-ET",om:"om-ET",ar:"ar-SA",ti:"ti-ET"};this.activeRecognition.lang=a[this.currentLang]||"en-US",this.activeRecognition.onresult=s=>{let n="";for(let l=0;l<s.results.length;l++)n+=s.results[l][0]?.transcript||"";const r=n.trim();if(r){t=!0;const l=this.detectLanguage(r);l!==this.currentLang&&this.setLanguage(l,!1),e.value=r}},this.activeRecognition.onend=()=>{this.isRecording&&this.stopVoiceRecording(t)},this.activeRecognition.onerror=s=>{console.warn("Active speech recognition error:",s.error)},this.activeRecognition.start()}catch(a){console.warn("Active recognition init error, falling back to MediaRecorder",a)}if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)try{const a=await navigator.mediaDevices.getUserMedia({audio:!0});this.audioChunks=[];const s=MediaRecorder.isTypeSupported("audio/webm")?"audio/webm":MediaRecorder.isTypeSupported("audio/ogg")?"audio/ogg":"audio/wav";this.mediaRecorder=new MediaRecorder(a),this.mediaRecorder.ondataavailable=n=>{n.data.size>0&&this.audioChunks.push(n.data)},this.mediaRecorder.onstop=async()=>{if(a.getTracks().forEach(n=>n.stop()),!t&&this.audioChunks.length>0){const n=new Blob(this.audioChunks,{type:s});await this.sendAudioForTranscription(n,s,e)}},this.mediaRecorder.start()}catch(a){console.warn("MediaRecorder permission/init notice:",a),i||(alert(this.t("micError")),this.isRecording=!1,this.updateMicButtonUI(),this.updateVoiceStatusUI())}}stopVoiceRecording(e=!1){if(this.isRecording=!1,this.playEarcon("stop"),this.activeRecognition){try{this.activeRecognition.stop()}catch{}this.activeRecognition=null}if(this.mediaRecorder&&this.mediaRecorder.state!=="inactive"?(e||(this.isProcessingSpeech=!0,this.announce(this.t("voiceProcessing")),this.updateVoiceStatusUI()),this.mediaRecorder.stop()):(this.isProcessingSpeech=!1,this.updateVoiceStatusUI()),this.updateMicButtonUI(),e){this.playEarcon("transcribed"),this.announce(this.t("voicePreviewNotice"));const t=this.shadowRoot?.querySelector("#chat-input");t&&t.focus()}setTimeout(()=>{if(!this.isRecording&&!this.isSpeaking&&this.wakeWordRecognizer)try{this.wakeWordRecognizer.start()}catch{}},1200)}async sendAudioForTranscription(e,t,i){this.isProcessingSpeech=!0,this.updateVoiceStatusUI(),this.announce(this.t("voiceProcessing"));try{const a=new FileReader,s=new Promise((l,d)=>{a.onloadend=()=>{const b=a.result;l(b.split(",")[1]||"")},a.onerror=d});a.readAsDataURL(e);const n=await s,r=await fetch(`${this.apiBase}/api/v1/speech/transcribe`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({audio_base64:n,media_type:t,language:this.currentLang,retain:!1})});if(r.ok){const l=await r.json();if(l.transcript){const d=this.detectLanguage(l.transcript);d!==this.currentLang&&this.setLanguage(d,!1),i.value=(i.value?i.value+" ":"")+l.transcript,i.focus(),this.playEarcon("transcribed"),this.announce(this.t("voicePreviewNotice"))}}}catch(a){console.warn("Transcription fallback notice:",a)}finally{this.isProcessingSpeech=!1,this.updateVoiceStatusUI()}}updateMicButtonUI(){const e=this.shadowRoot?.querySelector("#mic-btn");e&&(this.isRecording?(e.classList.add("recording"),e.setAttribute("aria-pressed","true"),e.setAttribute("title",this.t("recordingState"))):(e.classList.remove("recording"),e.setAttribute("aria-pressed","false"),e.setAttribute("title",this.t("micLabel"))))}updateVoiceStatusUI(){const e=this.shadowRoot?.querySelector("#voice-status-container");e&&(this.isRecording?(e.innerHTML=`
        <div class="voice-status-bar listening" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot"></span>
            <span>${this.t("voiceListening")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-voice" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
            ${this.t("stopAudio")}
          </button>
        </div>
      `,e.querySelector("#btn-stop-voice")?.addEventListener("click",()=>this.stopVoiceRecording())):this.isProcessingSpeech?e.innerHTML=`
        <div class="voice-status-bar processing" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="pulse-dot" style="background:#2563eb;"></span>
            <span>${this.t("voiceProcessing")} (${this.getLangDisplayName()})</span>
          </div>
        </div>
      `:this.isSpeaking?(e.innerHTML=`
        <div class="voice-status-bar speaking" role="status">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="sound-bars"><span></span><span></span><span></span></span>
            <span>${this.t("voiceSpeaking")} (${this.getLangDisplayName()})</span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-stop-speech" style="min-height:2rem; padding:0.2rem 0.5rem; font-size:0.75rem;">
            ${this.t("stopAudio")}
          </button>
        </div>
      `,e.querySelector("#btn-stop-speech")?.addEventListener("click",()=>this.stopSpeaking())):e.innerHTML="")}cleanTextForSpeech(e){return e.replace(/\[\d+\]/g,"").replace(/\bhttps?:\/\/\S+/gi,"").replace(/[#*_`~>]/g,"").replace(/\s+/g," ").trim()}async speakResponse(e){this.stopSpeaking();const t=this.cleanTextForSpeech(e.text);if(t){if(this.isSpeaking=!0,e.isAudioPlaying=!0,this.renderMessages(),this.updateVoiceStatusUI(),"speechSynthesis"in window){window.speechSynthesis.cancel();const i=new SpeechSynthesisUtterance(t),s={en:["en-US","en-GB","en"],am:["am-ET","am"],om:["om-ET","om","en-US"],ar:["ar-SA","ar-EG","ar-AE","ar"],ti:["ti-ET","ti","am-ET"]}[this.currentLang]||["en"],r=window.speechSynthesis.getVoices().find(l=>s.some(d=>l.lang.toLowerCase().startsWith(d.toLowerCase())));r?(i.voice=r,i.lang=r.lang):i.lang=s[0],i.rate=1,i.pitch=1,i.onend=()=>{this.isSpeaking=!1,e.isAudioPlaying=!1,this.renderMessages(),this.updateVoiceStatusUI()},i.onerror=()=>{this.isSpeaking=!1,e.isAudioPlaying=!1,this.renderMessages(),this.updateVoiceStatusUI()},window.speechSynthesis.speak(i);return}try{const i=await fetch(`${this.apiBase}/api/v1/speech/synthesize`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,language:this.currentLang,speed:1})});if(i.ok){const a=await i.json(),s=a.audio_url?.startsWith("http")?a.audio_url:`${this.apiBase}${a.audio_url||""}`;this.activeAudio=new Audio(s),this.activeAudio.onended=()=>{this.isSpeaking=!1,e.isAudioPlaying=!1,this.renderMessages(),this.updateVoiceStatusUI()},await this.activeAudio.play()}}catch{this.isSpeaking=!1,e.isAudioPlaying=!1,this.renderMessages(),this.updateVoiceStatusUI()}}}stopSpeaking(){"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.activeAudio&&(this.activeAudio.pause(),this.activeAudio=null),this.isSpeaking=!1,this.messages.forEach(e=>e.isAudioPlaying=!1),this.renderMessages(),this.updateVoiceStatusUI()}async askQuestion(e,t=!1){const i=e.trim();if(!i||this.isThinking)return;this.stopSpeaking();const a=this.detectLanguage(i);a!==this.currentLang&&this.setLanguage(a,!1),this.dispatchEvent(new CustomEvent("db-assistant:question",{bubbles:!0,composed:!0,detail:{text:i,language:this.currentLang}}));const s={id:`msg_${Date.now()}_learner`,sender:"learner",text:i};this.messages.push(s),this.isThinking=!0,this.announce(this.t("lookingInCourse")),this.renderMessages();try{let n=await fetch(`${this.apiBase}/api/v1/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:i,language:this.currentLang,course_id:this.courseId,simple_mode:t||this.simpleMode,channel:"web"})});if(!n.ok&&n.status===404&&(n=await fetch(`${this.apiBase}/ask`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:i,language:this.currentLang,course_id:this.courseId,simple_mode:t||this.simpleMode,channel:"web"})})),this.isThinking=!1,n.ok){const r=await n.json(),l=!!r.offer_human||r.reason==="low_confidence",d={id:`msg_${Date.now()}_assistant`,sender:"assistant",text:r.answer,heading:this.t("answerHeading"),citations:r.citations||[],offerHuman:r.offer_human,isRefusal:l};this.messages.push(d),this.saveChatState(),this.renderMessages(),this.autoReadSpeech&&this.speakResponse(d)}else{const r={id:`msg_${Date.now()}_err`,sender:"assistant",text:this.t("serverErrorNotice"),offerHuman:!0};this.messages.push(r),this.renderMessages()}}catch{this.isThinking=!1;try{const r=JSON.parse(localStorage.getItem("db_assistant_offline_queue")||"[]");r.push({question:i,language:this.currentLang,timestamp:Date.now()}),localStorage.setItem("db_assistant_offline_queue",JSON.stringify(r))}catch{}const n={id:`msg_${Date.now()}_offline`,sender:"assistant",text:this.t("savedOnPhoneNotice"),offerHuman:!0};this.messages.push(n),this.renderMessages()}}async requestHandoff(e){if(this.isOffline){alert(this.t("offlineBanner"));return}this.announce(this.t("lookingInCourse"));try{const t=await fetch(`${this.apiBase}/api/v1/escalations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({consent:!0,learner_ref:`learner_${this.sessionId}`,card:{language:this.currentLang,context:e||"Learner requested a human mentor from web assistant.",support_needs:this.supportNeeds.needs,contact_mode:this.supportNeeds.preferred_contact_mode},channel:"web"})});if(t.ok){const i=await t.json(),a=i.ticketId||i.id||"ticket_01";this.activeHandoff={id:a,room_url:i.room_url||"https://meet.jit.si/savanna-bridge-demo"},this.dispatchEvent(new CustomEvent("db-assistant:escalated",{bubbles:!0,composed:!0,detail:{ticketId:a}})),this.messages.push({id:`msg_${Date.now()}_handoff`,sender:"assistant",text:`${this.t("handoffReadyTitle")}: ${this.activeHandoff.room_url}`,heading:this.t("handoffReadyTitle"),offerHuman:!1}),this.renderMessages()}else alert(this.t("serverErrorNotice"))}catch{alert(this.t("serverErrorNotice"))}}render(){this.shadowRoot&&(this.setAttribute("data-contrast",this.highContrast?"high":"normal"),this.setAttribute("data-size",this.textSize),this.setAttribute("dir",this.currentLang==="ar"?"rtl":"ltr"),this.shadowRoot.innerHTML=`
      <style>${p}</style>

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
      <section id="assistant-dialog" class="panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1" ${this.isOpen?"":"hidden"}>
        
        ${this.isOffline?`<div class="offline-bar" role="alert">${this.t("offlineBanner")}</div>`:""}

        <!-- Header -->
        <header class="header">
          <div class="header-titles">
            <h2 id="dialog-title" class="title">${this.t("appTitle")}</h2>
          </div>
          <div class="header-actions">
            <!-- 4-Language Switcher in Native Scripts -->
            <div class="lang-bar" role="group" aria-label="Language selection">
              <button type="button" class="lang-toggle-btn" id="btn-lang-en" 
                      aria-pressed="${this.currentLang==="en"}" aria-label="English">
                EN
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-am" 
                      aria-pressed="${this.currentLang==="am"}" aria-label="አማርኛ">
                አማርኛ
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-om" 
                      aria-pressed="${this.currentLang==="om"}" aria-label="Afaan Oromoo">
                Oromoo
              </button>
              <button type="button" class="lang-toggle-btn" id="btn-lang-ar" 
                      aria-pressed="${this.currentLang==="ar"}" aria-label="العربية">
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
                   dir="${this.currentLang==="ar"?"rtl":"ltr"}"
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
        <div id="settings-dialog" class="settings-dialog" ${this.isSettingsOpen?"":"hidden"} role="region" aria-labelledby="settings-dialog-title">
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

          <!-- Auto-read Speech Toggle -->
          <div class="settings-section">
            <label class="checkbox-row">
              <input type="checkbox" id="chk-auto-read" ${this.autoReadSpeech?"checked":""}>
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
    `,this.renderMessages(),this.updateTelegramLinkUI(),this.updateVoiceStatusUI(),this.bindEvents())}renderMessages(){const e=this.shadowRoot?.querySelector("#chat-log");if(e){if(this.messages.length===0){e.innerHTML=`
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
      `,e.querySelectorAll(".btn-suggested").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-q");i&&this.askQuestion(i)})});return}e.innerHTML=this.messages.map(t=>{if(t.sender==="learner")return`
            <div class="msg-row msg-learner">
              <p class="answer-text" style="margin:0;">${this.escapeHtml(t.text)}</p>
            </div>
          `;const i=t.citations&&t.citations.length>0,a=!!t.isRefusal;return`
          <div class="msg-row msg-assistant" id="${t.id}">
            <h4 class="answer-heading">${this.escapeHtml(t.heading||this.t("answerHeading"))}</h4>
            <p class="answer-text">${this.escapeHtml(t.text)}</p>

            ${a?`
                <div class="not-verified-box" role="alert">
                  <div>${this.t("notVerifiedNotice")}</div>
                  <div style="display:flex; gap:0.375rem; flex-wrap:wrap;">
                    <button type="button" class="btn btn-primary btn-talk-person" data-msg-id="${t.id}" style="font-size:0.8125rem; min-height:2.25rem;">
                      👤 ${this.t("talkToPersonButton")}
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
                ${t.isAudioPlaying?`⏸️ ${this.t("pauseButton")}`:`🔊 ${this.t("listenButton")}`}
              </button>
              <button type="button" class="btn btn-secondary btn-simpler" data-msg-id="${t.id}">
                💡 ${this.t("makeSimplerButton")}
              </button>
            </div>

            <!-- Citations / Sources with readable names -->
            ${i?`
                <div class="sources-box">
                  <div class="sources-title">${this.t("sourcesTitle")}</div>
                  ${t.citations.map(s=>`
                    <a href="${this.escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="source-link">
                      📖 ${this.escapeHtml(s.title||s.heading)}
                    </a>
                  `).join("")}
                </div>
              `:""}
          </div>
        `}).join(""),this.isThinking&&(e.innerHTML+=`
        <div class="live-status-indicator">
          ⏳ ${this.t("lookingInCourse")}
        </div>
      `),e.querySelectorAll(".btn-listen").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-msg-id"),a=this.messages.find(s=>s.id===i);a&&(a.isAudioPlaying?this.stopSpeaking():this.speakResponse(a))})}),e.querySelectorAll(".btn-simpler").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-msg-id"),a=this.messages.find(s=>s.id===i);a&&this.askQuestion(`Explain simpler: ${a.text}`,!0)})}),e.querySelectorAll(".btn-talk-person").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-msg-id"),a=this.messages.find(s=>s.id===i);this.requestHandoff(a?`Refusal regarding question: ${a.text}`:void 0)})}),e.querySelectorAll(".btn-try-another").forEach(t=>{t.addEventListener("click",()=>{const i=this.shadowRoot?.querySelector("#chat-input");i&&(i.value="",i.focus())})}),e.scrollTop=e.scrollHeight}}bindEvents(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("#launcher-btn"),t=this.shadowRoot.querySelector("#assistant-dialog"),i=this.shadowRoot.querySelector("#btn-close-dialog"),a=this.shadowRoot.querySelector("#btn-open-settings"),s=this.shadowRoot.querySelector("#btn-close-settings");e.addEventListener("click",()=>{this.isOpen?this.closeAssistant():(this.previousFocus=document.activeElement,this.openAssistant())}),i.addEventListener("click",()=>this.closeAssistant()),t.addEventListener("keydown",u=>{if(u.key==="Escape")if(this.isSettingsOpen){this.isSettingsOpen=!1;const h=this.shadowRoot?.querySelector("#settings-dialog");h&&h.setAttribute("hidden","true")}else this.closeAssistant()}),this.shadowRoot.querySelector("#btn-lang-en")?.addEventListener("click",()=>this.setLanguage("en")),this.shadowRoot.querySelector("#btn-lang-am")?.addEventListener("click",()=>this.setLanguage("am")),this.shadowRoot.querySelector("#btn-lang-om")?.addEventListener("click",()=>this.setLanguage("om")),this.shadowRoot.querySelector("#btn-lang-ar")?.addEventListener("click",()=>this.setLanguage("ar")),a.addEventListener("click",()=>{this.isSettingsOpen=!0;const u=this.shadowRoot?.querySelector("#settings-dialog");if(u){u.removeAttribute("hidden");const h=u.querySelector("button, input");h&&h.focus()}}),s.addEventListener("click",()=>{this.isSettingsOpen=!1;const u=this.shadowRoot?.querySelector("#settings-dialog");u&&u.setAttribute("hidden","true"),a.focus()}),this.shadowRoot.querySelector("#btn-size-smaller")?.addEventListener("click",()=>{this.textSize="smaller",localStorage.setItem("savanna_bridge_text_size","smaller"),this.render()}),this.shadowRoot.querySelector("#btn-size-normal")?.addEventListener("click",()=>{this.textSize="normal",localStorage.setItem("savanna_bridge_text_size","normal"),this.render()}),this.shadowRoot.querySelector("#btn-size-larger")?.addEventListener("click",()=>{this.textSize="larger",localStorage.setItem("savanna_bridge_text_size","larger"),this.render()});const n=this.shadowRoot.querySelector("#chk-contrast");n&&n.addEventListener("change",()=>{this.highContrast=n.checked,localStorage.setItem("savanna_bridge_contrast",this.highContrast?"high":"normal"),this.render()});const r=this.shadowRoot.querySelector("#chk-simple-mode");r&&r.addEventListener("change",()=>{this.simpleMode=r.checked});const l=this.shadowRoot.querySelector("#chk-auto-read");l&&l.addEventListener("change",()=>{this.autoReadSpeech=l.checked,localStorage.setItem("savanna_bridge_auto_read",this.autoReadSpeech?"true":"false"),!this.autoReadSpeech&&this.isSpeaking&&this.stopSpeaking()});const d=this.shadowRoot.querySelector("#support-form");d&&d.addEventListener("submit",u=>{u.preventDefault();const h=new FormData(d),y=h.getAll("need"),S=h.get("other_text")||"",k=h.get("contact_mode")||"text";this.saveSupportNeeds(y,S,k)});const b=this.shadowRoot.querySelector("#chat-form"),m=this.shadowRoot.querySelector("#chat-input"),v=this.shadowRoot.querySelector("#mic-btn");b&&m&&b.addEventListener("submit",u=>{u.preventDefault();const h=m.value;m.value="",this.askQuestion(h)}),v&&m&&v.addEventListener("click",()=>{this.toggleVoiceInput(m)}),this.shadowRoot.querySelector("#btn-footer-handoff")?.addEventListener("click",()=>{this.requestHandoff()})}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}}return customElements.get("bridge-assistant")||customElements.define("bridge-assistant",f),customElements.get("db-assistant")||customElements.define("db-assistant",f),g.BridgeAssistant=f,Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}),g})({});
//# sourceMappingURL=widget.iife.js.map
