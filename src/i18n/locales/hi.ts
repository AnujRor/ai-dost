// Hindi is the base dictionary: the key set is defined here.
// Every other locale file must provide a value for every key (enforced by TypeScript).
export const hi = {
  // ---------- common ----------
  'common.appName': 'AI दोस्त',
  'common.you': 'आप',
  'common.assistant': 'मेरा AI दोस्त',
  'common.newChat': 'नई बातचीत',
  'common.photoDocument': 'फ़ोटो डॉक्यूमेंट',
  'common.back': 'वापस',

  // ---------- language picker ----------
  'lang.label': 'भाषा',
  'lang.title': 'ऐप की भाषा बदलें',
  'lang.aria': 'भाषा चुनें',
  'lang.hint': 'पूरा स्क्रीन इसी भाषा में बदल जाएगा।',

  // ---------- header ----------
  'header.savedChatsTitle': 'सहेजी गई चैट और परिस्थितियाँ',
  'header.openSidebar': 'साइडबार खोलें',
  'header.alwaysWithYou': 'हमेशा साथ',
  'header.modesCount': '{name} • 4 मोड',
  'header.changePersona': 'दोस्त का अंदाज़ बदलें',
  'header.modeLabel': 'मोड:',
  'header.billDocTitle': 'बिल या डॉक्यूमेंट समझाएँ',
  'header.billNoticeLabel': 'बिल / नोटिस',
  'header.boosterTitle': 'जोक, शायरी, रोज़ का हौसला',
  'header.boosterLabel': 'बूस्टर',
  'header.voiceOn': 'दोस्त की आवाज़: चालू',
  'header.voiceOff': 'दोस्त की आवाज़: बंद (म्यूट)',
  'header.toggleVoice': 'आवाज़ चालू/बंद करें',
  'header.newChatTitle': 'नई बात शुरू करें',
  'header.newChatAria': 'नई चैट',
  'header.aboutTitle': 'मेरे AI दोस्त के बारे में',
  'header.aboutAria': 'ऐप के बारे में',

  // ---------- category bar ----------
  'category.heading': 'श्रेणी:',
  'category.auto': 'ऑटो (खुद समझेगा)',
  'category.explain': '1. समझाओ',
  'category.emotional': '2. दिल की बात',
  'category.advice': '3. सलाह और जवाब',
  'category.fun': '4. मस्ती और मज़ा',

  // ---------- chat bubble ----------
  'bubble.me': 'मैं',
  'bubble.photo': 'फ़ोटो',
  'bubble.photoNotSaved': '(फ़ोटो सेव नहीं हो सकी)',
  'bubble.uploadedAlt': 'अपलोड की गई तस्वीर',
  'bubble.zoomTitle': 'तस्वीर बड़ी करें',
  'bubble.zoomedAlt': 'बड़ी की गई तस्वीर',
  'bubble.typing': 'जवाब लिख रहा हूँ...',
  'bubble.stopVoice': 'आवाज़ रोकें',
  'bubble.listenVoice': 'दोस्त की आवाज़ सुनें',
  'bubble.speaking': 'बोल रहा है...',
  'bubble.listen': 'सुनें',
  'bubble.copyTitle': 'टेक्स्ट कॉपी करें',
  'bubble.copied': 'कॉपी हो गया!',
  'bubble.copy': 'कॉपी',
  'bubble.reexplainTitle': 'और आसान भाषा में समझाएँ',
  'bubble.reexplain': 'और आसान भाषा',

  // ---------- chat input ----------
  'input.onlyImages': 'कृपया केवल इमेज (JPG, PNG, WebP) अपलोड करें।',
  'input.photoTooBig': 'फ़ोटो बहुत बड़ी है (15MB से ज़्यादा)। छोटी फ़ोटो भेजें।',
  'input.voiceError': 'वॉइस रिकॉर्डिंग में त्रुटि। कृपया दोबारा कोशिश करें।',
  'input.noSpeechRecognition': 'आपके ब्राउज़र में स्पीच रिकॉग्निशन उपलब्ध नहीं है।',
  'input.previewAlt': 'अपलोड की गई झलक',
  'input.photoAttached': 'फ़ोटो जुड़ी है',
  'input.photoWillBeRead': 'फ़ोटो/डॉक्यूमेंट पढ़कर समझाया जाएगा',
  'input.removeImage': 'इमेज हटाएँ',
  'input.listening': 'दोस्त सुन रहा है... बोलिए',
  'input.stop': 'रोकें',
  'input.attachTitle': 'फ़ोटो / बिल / नोटिस अपलोड करें',
  'input.phImage': 'इस फ़ोटो के बारे में क्या जानना चाहते हैं? (भेजने के लिए Enter)',
  'input.phExplain': "कुछ समझना है? जैसे 'बिजली का बिल' या 'SIP क्या होता है'...",
  'input.phEmotional': 'दिल की बात साझा कीजिए, दोस्त सुन रहा है...',
  'input.phAdvice': 'किस बात पर सलाह या संदेश का जवाब चाहिए?...',
  'input.phFun': 'जोक, कहानी या शायरी माँगिए...',
  'input.phDefault': 'किसी भी भाषा में लिखिए या फ़ोटो भेजिए...',
  'input.listeningTitle': 'सुन रहा है... रोकने के लिए क्लिक करें',
  'input.voiceInputTitle': 'बोलिए (आवाज़ से लिखें)',
  'input.sendTitle': 'संदेश भेजें',
  'input.footer': 'मेरा AI दोस्त • किसी भी भाषा में सहायता',
  'input.shiftEnter': 'नई लाइन के लिए Shift + Enter',

  // ---------- welcome hero ----------
  'welcome.badge': 'हर मोड में साथ निभाने वाला आपका दोस्त',
  'welcome.greeting': 'नमस्ते! मैं हूँ',
  'welcome.brand': 'मेरा AI दोस्त',
  'welcome.intro':
    'चाहे कोई विषय समझना हो, दिल हल्का करना हो, WhatsApp जवाब की सलाह चाहिए हो, या बस थोड़ी मस्ती करनी हो — मैं हमेशा आपके साथ हूँ।',
  'welcome.tagAnyLanguage': 'किसी भी भाषा में बात करें',
  'welcome.tagPrivacy': 'बिना जजमेंट के और पूरी गोपनीयता',
  'welcome.myTasks': 'मेरे 4 मुख्य काम',
  'welcome.tapAny': 'किसी पर भी टैप करें',
  'welcome.try': 'आज़माएँ',
  'welcome.popular': 'लोकप्रिय सवाल और विषय',
  'welcome.p1.title': '1. समझाना',
  'welcome.p1.sub': 'सीखना और डॉक्यूमेंट',
  'welcome.p1.desc':
    'बिल, मुश्किल विषय, सरकारी नोटिस, प्रिस्क्रिप्शन या उलझा टेक्स्ट — सब कुछ आसान भाषा में समझाएँ।',
  'welcome.p1.sample': 'बिजली का बिल और सब्सिडी समझाओ',
  'welcome.p2.title': '2. दिल की बात',
  'welcome.p2.sub': 'हौसला और सहारा',
  'welcome.p2.desc':
    'मन खराब हो, तनाव हो या बस बात करनी हो — बिना जजमेंट किए एक सच्चे दोस्त की तरह सुनेगा और हौसला देगा।',
  'welcome.p2.sample': 'आज थोड़ा थका हुआ और तनाव में हूँ, बात करो',
  'welcome.p3.title': '3. सलाह और जवाब',
  'welcome.p3.sub': 'फ़ैसले और संदेश',
  'welcome.p3.desc':
    'WhatsApp पर क्या जवाब दें, बॉस से छुट्टी कैसे माँगें या क्या फ़ैसला लें — 2-3 तैयार विकल्प मिलेंगे।',
  'welcome.p3.sample': 'बॉस को छुट्टी माँगने के 3 तैयार संदेश दो',
  'welcome.p4.title': '4. मस्ती और मज़ा',
  'welcome.p4.sub': 'जोक, शायरी और कहानियाँ',
  'welcome.p4.desc':
    'मज़ेदार देसी जोक, दिल को छूने वाली शायरियाँ, पहेलियाँ या मज़ेदार कहानियों से दिन का मन हल्का करें।',
  'welcome.p4.sample': 'एक मस्त ताज़ा देसी जोक सुनाओ',

  // ---------- quick actions toolbar ----------
  'qa.heading': 'बूस्टर:',
  'qa.joke': 'देसी जोक',
  'qa.shayari': 'खूबसूरत शायरी',
  'qa.motivation': 'रोज़ का हौसला',
  'qa.paheli': 'एक पहेली पूछो',

  // ---------- sidebar ----------
  'sidebar.title': 'मेरा AI दोस्त',
  'sidebar.subtitle': 'चैट इतिहास और टूल्स',
  'sidebar.close': 'साइडबार बंद करें',
  'sidebar.newChat': 'नई बात शुरू करें',
  'sidebar.savedChats': 'सहेजी गई चैट ({count})',
  'sidebar.samples': 'सैंपल परिस्थितियाँ',
  'sidebar.search': 'बातचीत खोजें...',
  'sidebar.noHistory': 'अभी कोई चैट इतिहास नहीं है।',
  'sidebar.pinned': 'पिन की गई चैट',
  'sidebar.unpin': 'पिन हटाएँ',
  'sidebar.delete': 'मिटाएँ',
  'sidebar.recent': 'हाल की चैट',
  'sidebar.pinTop': 'ऊपर पिन करें',
  'sidebar.trySamples': 'इन सैंपल परिस्थितियों को 1-टैप में आज़माएँ:',
  'sidebar.downloadBackup': 'बातचीत की बैकअप फ़ाइल डाउनलोड करें',
  'sidebar.savedTxt': 'TXT सेव हो गया',
  'sidebar.export': 'चैट एक्सपोर्ट करें',
  'sidebar.version': 'AI दोस्त v1.0',

  // ---------- persona modal ----------
  'persona.title': 'दोस्त का अंदाज़ (पर्सोना स्टाइल)',
  'persona.subtitle': 'चुनिए कि आपका दोस्त आपसे किस अंदाज़ में बात करे',
  'persona.footer': 'आप कभी भी अपना पसंदीदा अंदाज़ बदल सकते हैं।',

  // ---------- document helper modal ----------
  'doc.title': 'बिल या नोटिस समझाएँ',
  'doc.subtitle': 'फ़ोटो भेजिए या सैंपल टेम्पलेट से समझिए',
  'doc.upload': 'अपने बिल या डॉक्यूमेंट की फ़ोटो अपलोड करें',
  'doc.uploadHint': 'बिजली का बिल, बैंक नोटिस, प्रिस्क्रिप्शन या उलझा हुआ कॉन्ट्रैक्ट की फ़ोटो',
  'doc.samples': 'या इन सैंपल परिस्थितियों को आज़माएँ:',
  'doc.footer': 'मेरा AI दोस्त बिना किसी jargon के सीधी और आसान भाषा में समझाएगा।',

  // ---------- booster modal ----------
  'booster.title': 'तुरंत मूड बूस्टर',
  'booster.subtitle': '1-टैप में अपने दोस्त से सुनिए',
  'booster.footer': 'आपका दोस्त आपका दिन खुशनुमा बनाने के लिए हमेशा तैयार है!',
  'booster.joke.title': 'देसी जोक और मज़ाक',
  'booster.joke.desc': 'ताज़ा, साफ़ और मज़ेदार जोक सुनकर चेहरे पर मुस्कान लाएँ।',
  'booster.shayari.title': 'खूबसूरत शायरी',
  'booster.shayari.desc': 'ज़िंदगी, दोस्ती या हौसले पर दिल को छू लेने वाली 2-4 पंक्तियाँ।',
  'booster.thought.title': 'दोस्त का रोज़ का संदेश',
  'booster.thought.desc': 'सकारात्मक ऊर्जा के साथ दिन शुरू करने के लिए।',
  'booster.paheli.title': 'दिमागी पहेली (Riddle)',
  'booster.paheli.desc': 'एक चतुर पहेली जिसमें दिमाग की थोड़ी कसरत हो!',

  // ---------- about modal ----------
  'about.title': 'AI दोस्त — आपका सब कुछ एक साथी',
  'about.subtitle': 'मित्रवत, सरल, गर्मजोशी भरा और बिना किसी जजमेंट के',
  'about.intro':
    '"AI दोस्त" एक ऐसा साथी है जो हर तरह के इंसान की हर हालत में मदद करता है — चाहे आप छात्र हों, गृहिणी हों, व्यवसायी हों या बुज़ुर्ग। यह आपसे बिल्कुल अपने जैसे दोस्त की तरह, आपकी ही भाषा में बात करता है — हिंदी, English, रोमन हिंदी या दुनिया की कोई भी भाषा।',
  'about.tasks': 'AI दोस्त के 4 मुख्य काम:',
  'about.task1': '1. समझाना (सीखना)',
  'about.task1desc':
    'कोई भी विषय, बिजली/पानी का बिल, सरकारी नोटिस, दवा की पर्ची या फ़ोटो — बिना किसी तकनीकी jargon के रोज़मर्रा की आसान भाषा में समझाना।',
  'about.task2': '2. दिल की बात (हौसला)',
  'about.task2desc':
    'मन खराब हो, तनाव हो या थकान — बिना जजमेंट किए सच्चे दोस्त की तरह सुनना, भावनात्मक सहारा और प्यारा हौसला देना।',
  'about.task3': '3. सलाह और जवाब के सुझाव',
  'about.task3desc':
    'WhatsApp पर क्या जवाब दें, अजीब स्थिति में क्या बोलें या फ़ैसला कैसे लें — 2-3 साफ़ विकल्प तैयार करके देना।',
  'about.task4': '4. मस्ती और मज़ाक',
  'about.task4desc':
    'देसी जोक, दिल को छूने वाली शायरियाँ, मज़ेदार कहानियाँ और पहेलियों (riddles) के साथ मन भटकाना और चेहरे पर मुस्कान लाना।',
  'about.values': 'ख़ास नियम (मुख्य बातें)',
  'about.value1': 'हमेशा सम्मानजनक और मित्रवत रहना, कभी rude या robotic न बनना।',
  'about.value2': 'सीधा, साफ़ और काम का जवाब देना, बिना फालतू लंबा किए।',
  'about.value3': 'आवाज़ से लिखने (Voice input) और आवाज़ में सुनने (सुनें) के साथ आसान बातचीत।',
  'about.close': 'समझ गया, चलिए बात करें!',

  // ---------- app-level messages ----------
  'app.tooBig': 'फ़ोटो या चैट बहुत बड़ी है, छोटी फ़ोटो भेजें या नई चैट शुरू करें',
  'app.answerReady': 'दोस्त, जवाब तैयार है!',
  'app.networkError': 'दोस्त, थोड़ा नेटवर्क issue आ गया: "{error}"। एक बार दोबारा कोशिश करें।',
  'app.geminiKeyError':
    '⚠️ **Google AI Studio API Key अपडेट करना ज़रूरी है**\n\nआपके मौजूदा Gemini API Key के प्रोजेक्ट को Google ने एक्सेस देने से मना कर दिया है।\n\n**इसे ठीक करने के आसान तरीके:**\n1. AI Studio में ऊपर-दाएँ तरफ **Settings > Secrets** पर क्लिक करें।\n2. वहाँ एक नया और चालू **GEMINI_API_KEY** डालें।\n3. Save करते ही आपका **AI दोस्त** फिर से तुरंत जवाब देने लगेगा!',
  'app.jokeTitle': 'एक मज़ेदार जोक',
  'app.shayariTitle': 'एक प्यारी शायरी',
  'app.motivationTitle': 'रोज़ का हौसला',
  'app.paheliTitle': 'एक दिमागी पहेली',
  'app.playPrompt': 'दोस्त, मुझे {title} सुनाओ!',
  'app.reexplainPrompt': 'दोस्त, इसे और आसान भाषा में एक असली उदाहरण के साथ समझाओ।',
  'app.docPrompt': 'मेरा यह डॉक्यूमेंट/परिस्थिति समझाओ और मार्गदर्शन दो:\n\n{text}',
  'app.exportAssistant': 'मेरा AI दोस्त ({name})',

  // ---------- personas ----------
  'persona.default.name': 'AI दोस्त (डिफ़ॉल्ट)',
  'persona.default.tagline': 'गर्मजोशी भरा, दयालु और समझदार साथी',
  'persona.default.desc':
    'संतुलित, मित्रवत और सहानुभूतिशील अंदाज़ — हिंदी में स्वाभाविक बातचीत। हमेशा सम्मानजनक, खुशमिज़ाज और मददगार।',
  'persona.default.badge': 'लोकप्रिय',
  'persona.desi.name': 'देसी यार / ज़िगरी दोस्त',
  'persona.desi.tagline': 'आरामदायक, मज़ेदार और मस्ती से भरपूर',
  'persona.desi.desc':
    'कैज़ा, खुशमिज़ाज, मज़ेदार और बातचीत वाला अंदाज़ — हल्का-फुल्का मज़ाक और पूरा देसीपन।',
  'persona.desi.badge': 'मस्ती और आराम',
  'persona.bhai.name': 'बड़ा भाई / दीदी',
  'persona.bhai.tagline': 'सहायक गुरु और ईमानदार मार्गदर्शक',
  'persona.bhai.desc':
    'समझदार, दयालु बड़े भाई-दीदी वाला अंदाज़ — ठोस व्यावहारिक सलाह और गहरा भावनात्मक सहारा।',
  'persona.bhai.badge': 'समझदार और मार्गदर्शक',
  'persona.pro.name': 'स्मार्ट सलाहकार / कोच',
  'persona.pro.tagline': 'सुसंगठित, साफ़-सुथरा और समाधान-केंद्रित',
  'persona.pro.desc':
    'सुसंगठित पर दोस्ताना पेशेवर साथी — जो परफेक्ट ईमेल, जवाब और साफ़ सारांश बनाता है।',
  'persona.pro.badge': 'पेशेवर',

  // ---------- category info ----------
  'cat.explain.name': 'समझाओ',
  'cat.explain.desc':
    'बिल, नोटिस, मुश्किल विषय, प्रिस्क्रिप्शन या फ़ोटो — बिना भारी jargon के बिल्कुल आसान शब्दों में समझाना।',
  'cat.emotional.name': 'दिल की बात / हौसला',
  'cat.emotional.desc':
    'अपनी बात, तनाव, खराब मन या दिन की खुशियाँ साझा कीजिए। एक ऐसा दोस्त जो बिना जजमेंट किए सच्चे दिल से सुनता है और हौसला देता है।',
  'cat.advice.name': 'सलाह / जवाब के सुझाव',
  'cat.advice.desc':
    'जवाब क्या दें या कौन-सा फ़ैसला लें — मनचाहा मिलने वाले 2-3 व्यावहारिक विकल्प पाएँ।',
  'cat.fun.name': 'मस्ती और मज़ाक',
  'cat.fun.desc':
    'देसी जोक, दिल को छूने वाली मज़ेदार कहानियाँ, शायरियाँ, पहेलियाँ और हल्की-फुल्की बातचीत से दिन हल्का करें।',
  'cat.general.name': 'सब कुछ एक दोस्त',
  'cat.general.desc': 'कुछ भी पूछिए, कुछ भी साझा कीजिए — आपका अपना दोस्त हर वक्त तैयार है।',

  // ---------- quick prompts ----------
  'prompt.bill.title': 'बिजली / मोबाइल बिल समझाओ',
  'prompt.bill.subtitle': 'फिक्स्ड चार्ज, यूनिट और सब्सिडी क्या है?',
  'prompt.bill.prompt':
    'मेरे बिजली का बिल इस बार ज़्यादा आया है। मुझे आसान भाषा में समझाओ कि बिल में फिक्स्ड चार्ज, एनर्जी चार्ज और यूनिट रेट का क्या मतलब होता है?',
  'prompt.sip.title': 'SIP और म्यूचुअल फ़ंड क्या हैं?',
  'prompt.sip.subtitle': 'शुरुआती लोगों के लिए बिल्कुल आसान भाषा में',
  'prompt.sip.prompt':
    'म्यूचुअल फ़ंड और SIP क्या होते हैं? मुझे किसी 10 साल के बच्चे की तरह आसान भाषा में समझाओ।',
  'prompt.tired.title': 'आज थोड़ा थका हुआ / मन खराब है',
  'prompt.tired.subtitle': 'दिल हल्का करना चाहता हूँ...',
  'prompt.tired.prompt':
    'दोस्त, आज का दिन बहुत भाग-दौड़ और तनाव भरा रहा। दिमाग थका हुआ है, बस थोड़ी सकारात्मक बात सुनना चाहता हूँ।',
  'prompt.overthink.title': 'भविष्य की चिंता और ओवर-थिंकिंग',
  'prompt.overthink.subtitle': 'मन शांत करने का तरीका',
  'prompt.overthink.prompt':
    'मैं अपने भविष्य और करियर को लेकर बहुत ज़्यादा overthink करता हूँ। मुझे समझाओ कि अपना ध्यान वर्तमान पर कैसे लगाऊँ?',
  'prompt.leave.title': 'बॉस से जल्दी छुट्टी कैसे माँगें?',
  'prompt.leave.subtitle': '2-3 तैयार WhatsApp/ईमेल विकल्प',
  'prompt.leave.prompt':
    'मुझे कल अचानक ज़रूरी काम से छुट्टी चाहिए। बॉस को भेजने के लिए 2-3 व्यावहारिक WhatsApp संदेश विकल्प बना कर दो (नरम, सीधा और पेशेवर)।',
  'prompt.money.title': 'दोस्त से उधार दिए पैसे कैसे माँगें?',
  'prompt.money.subtitle': 'रिश्ता खराब किए बिना प्यारी याद दिलाने के तरीके',
  'prompt.money.prompt':
    'मैंने कुछ महीने पहले अपने दोस्त को पैसे उधार दिए थे। बिना अजीब या गुस्से के, प्यार से याद दिलाने के 3 अच्छे विकल्प दो।',
  'prompt.joke.title': 'एक मस्त देसी जोक सुनाओ',
  'prompt.joke.subtitle': 'हंसी का डोज़',
  'prompt.joke.prompt':
    'दोस्त, एक बिल्कुल ताज़ा और मज़ेदार देसी जोक सुनाओ जो सुनकर हंसी आ जाए!',
  'prompt.shayari.title': 'ज़िंदगी पर एक प्यारी शायरी',
  'prompt.shayari.subtitle': 'दिल को छू लेने वाली पंक्तियाँ',
  'prompt.shayari.prompt':
    'ज़िंदगी, दोस्ती या मेहनत पर एक खूबसूरत और दिल को छूने वाली शायरी सुनाओ।',

  // ---------- sample documents ----------
  'doc.bill.name': 'बिजली का बिल (नमूना बिल)',
  'doc.bill.desc': 'बिजली की खपत, स्लैब और बकाया राशि दिखाने वाला नमूना टेक्स्ट।',
  'doc.kyc.name': 'बैंक KYC नोटिस (नमूना नोटिस)',
  'doc.kyc.desc': 'लंबित KYC और खाता निलंबन की चेतावनी पर बैंक का नमूना पत्र।',
  'doc.awkward.name': 'अटकली WhatsApp चैट (जवाब की परिस्थिति)',
  'doc.awkward.desc': 'एक जान-पहचान वाला इंसान सप्ताहांत में मुफ़्त में बड़ा काम करने को कह रहा है।',
} as const;

export type TranslationKey = keyof typeof hi;
export default hi;
