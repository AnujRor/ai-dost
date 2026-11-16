import type { TranslationKey } from './hi';

const bn: Record<TranslationKey, string> = {
  // ---------- common ----------
  'common.appName': 'AI দোস্ত',
  'common.you': 'আপনি',
  'common.assistant': 'আমার AI দোস্ত',
  'common.newChat': 'নতুন কথোপকথন',
  'common.photoDocument': 'ছবির নথি',
  'common.back': 'ফিরে যান',

  // ---------- language picker ----------
  'lang.label': 'ভাষা',
  'lang.title': 'অ্যাপের ভাষা বদলান',
  'lang.aria': 'ভাষা বেছে নিন',
  'lang.hint': 'পুরো স্ক্রিন এই ভাষাতেই বদলে যাবে।',

  // ---------- header ----------
  'header.savedChatsTitle': 'সংরক্ষিত চ্যাট ও পরিস্থিতি',
  'header.openSidebar': 'সাইডবার খুলুন',
  'header.alwaysWithYou': 'সবসময় আপনার পাশে',
  'header.modesCount': '{name} • ৪টি মোড',
  'header.changePersona': 'আপনার দোস্তের ধরন বদলান',
  'header.modeLabel': 'মোড:',
  'header.billDocTitle': 'বিল বা নথি বুঝিয়ে দিন',
  'header.billNoticeLabel': 'বিল / নোটিশ',
  'header.boosterTitle': 'জোক, শায়রি, দৈনিক উৎসাহ',
  'header.boosterLabel': 'বুস্টার',
  'header.voiceOn': 'দোস্তের কণ্ঠ: চালু',
  'header.voiceOff': 'দোস্তের কণ্ঠ: বন্ধ (মিউট)',
  'header.toggleVoice': 'কণ্ঠ চালু/বন্ধ করুন',
  'header.newChatTitle': 'নতুন কথা শুরু করুন',
  'header.newChatAria': 'নতুন চ্যাট',
  'header.aboutTitle': 'আমার AI দোস্ত সম্পর্কে',
  'header.aboutAria': 'অ্যাপ সম্পর্কে',

  // ---------- category bar ----------
  'category.heading': 'বিভাগ:',
  'category.auto': 'অটো (নিজেই বুঝবে)',
  'category.explain': '১. বুঝিয়ে বলুন',
  'category.emotional': '২. মনের কথা',
  'category.advice': '৩. পরামর্শ ও উত্তর',
  'category.fun': '৪. মজা ও হাসি',

  // ---------- chat bubble ----------
  'bubble.me': 'আমি',
  'bubble.photo': 'ছবি',
  'bubble.photoNotSaved': '(ছবি সেভ হয়নি)',
  'bubble.uploadedAlt': 'আপলোড করা ছবি',
  'bubble.zoomTitle': 'ছবি বড় করুন',
  'bubble.zoomedAlt': 'বড় করা ছবি',
  'bubble.typing': 'উত্তর লিখছি...',
  'bubble.stopVoice': 'কণ্ঠ থামান',
  'bubble.listenVoice': 'দোস্তের কণ্ঠ শুনুন',
  'bubble.speaking': 'বলছে...',
  'bubble.listen': 'শুনুন',
  'bubble.copyTitle': 'টেক্সট কপি করুন',
  'bubble.copied': 'কপি হয়েছে!',
  'bubble.copy': 'কপি',
  'bubble.reexplainTitle': 'আরও সহজ ভাষায় বুঝিয়ে বলুন',
  'bubble.reexplain': 'আরও সহজ ভাষা',

  // ---------- chat input ----------
  'input.onlyImages': 'অনুগ্রহ করে শুধু ছবি (JPG, PNG, WebP) আপলোড করুন।',
  'input.photoTooBig': 'ছবিটি খুব বড় (১৫MB-এর বেশি)। ছোট ছবি পাঠান।',
  'input.voiceError': 'ভয়েস রেকর্ডিং-এ সমস্যা হয়েছে। আবার চেষ্টা করুন।',
  'input.noSpeechRecognition': 'আপনার ব্রাউজারে স্পিচ রিকগনিশন নেই।',
  'input.previewAlt': 'আপলোডের প্রিভিউ',
  'input.photoAttached': 'ছবি যুক্ত হয়েছে',
  'input.photoWillBeRead': 'ছবি/নথি পড়ে বুঝিয়ে দেওয়া হবে',
  'input.removeImage': 'ছবি সরান',
  'input.listening': 'দোস্ত শুনছে... বলুন',
  'input.stop': 'থামান',
  'input.attachTitle': 'ছবি / বিল / নোটিশ আপলোড করুন',
  'input.phImage': 'এই ছবি নিয়ে কী জানতে চান? (পাঠাতে Enter)',
  'input.phExplain': 'কিছু বুঝতে চান? যেমন “বিদ্যুৎ বিল” বা “SIP কী”...',
  'input.phEmotional': 'মনের কথা শেয়ার করুন, দোস্ত শুনছে...',
  'input.phAdvice': 'কোন বিষয়ে পরামর্শ বা মেসেজের উত্তর চান?...',
  'input.phFun': 'জোক, গল্প বা শায়রি চাইুন...',
  'input.phDefault': 'যেকোনো ভাষায় লিখুন বা ছবি পাঠান...',
  'input.listeningTitle': 'শুনছি... থামাতে ক্লিক করুন',
  'input.voiceInputTitle': 'বলুন (ভয়েস ইনপুট)',
  'input.sendTitle': 'মেসেজ পাঠান',
  'input.footer': 'আমার AI দোস্ত • যেকোনো ভাষায় সাহায্য',
  'input.shiftEnter': 'নতুন লাইনের জন্য Shift + Enter',

  // ---------- welcome hero ----------
  'welcome.badge': 'প্রতিটি মোডে আপনার পাশে থাকা বন্ধু',
  'welcome.greeting': 'নমস্কার! আমি',
  'welcome.brand': 'আমার AI দোস্ত',
  'welcome.intro':
    'কোনো বিষয় বুঝতে চান, মন হালকা করতে চান, WhatsApp-এর উত্তরের পরামর্শ দরকার, বা শুধু মজা করতে চান — আমি সবসময় আপনার পাশে।',
  'welcome.tagAnyLanguage': 'যেকোনো ভাষায় কথা বলুন',
  'welcome.tagPrivacy': 'কোনো বিচার নেই, সম্পূর্ণ গোপনীয়তা',
  'welcome.myTasks': 'আমার ৪টি প্রধান কাজ',
  'welcome.tapAny': 'যেকোনোটিতে ট্যাপ করুন',
  'welcome.try': 'চেষ্টা করুন',
  'welcome.popular': 'জনপ্রিয় প্রশ্ন ও বিষয়',
  'welcome.p1.title': '১. বুঝিয়ে বলা',
  'welcome.p1.sub': 'শেখা ও নথি',
  'welcome.p1.desc':
    'বিল, কঠিন বিষয়, সরকারি নোটিশ, প্রেসক্রিপশন বা গোলমাল লেখা — সব কিছু সহজ ভাষায় বুঝিয়ে দেওয়া হবে।',
  'welcome.p1.sample': 'বিদ্যুৎ বিল ও সাবসিডি বুঝিয়ে দাও',
  'welcome.p2.title': '২. মনের কথা',
  'welcome.p2.sub': 'উৎসাহ ও সমর্থন',
  'welcome.p2.desc':
    'মন খারাপ, মানসিক চাপ, কিংবা শুধু কথা বলার মন — কোনো বিচার ছাড়া এক সত্যিকারের বন্ধুর মতো শুনবে ও উৎসাহ দেবে।',
  'welcome.p2.sample': 'আজ খুব ক্লান্ত ও চাপে আছি, একটু কথা বলি',
  'welcome.p3.title': '৩. পরামর্শ ও উত্তর',
  'welcome.p3.sub': 'সিদ্ধান্ত ও বার্তা',
  'welcome.p3.desc':
    'WhatsApp-এ কী উত্তর দেবেন, বসকে ছুটি কীভাবে চাইবেন, বা কোন সিদ্ধান্ত নেবেন — ২-৩টি প্রস্তুত বিকল্প পাবেন।',
  'welcome.p3.sample': 'বসকে ছুটি চাওয়ার ৩টি প্রস্তুত বার্তা দাও',
  'welcome.p4.title': '৪. মজা ও হাসি',
  'welcome.p4.sub': 'জোক, শায়রি ও গল্প',
  'welcome.p4.desc':
    'মজার দেশি জোক, হৃদয় ছোঁয়া শায়রি, পাঁচালি বা মজার গল্প দিয়ে দিনটা হালকা করুন।',
  'welcome.p4.sample': 'একটা মজার নতুন দেশি জোক বলো',

  // ---------- quick actions toolbar ----------
  'qa.heading': 'বুস্টার:',
  'qa.joke': 'দেশি জোক',
  'qa.shayari': 'সুন্দর শায়রি',
  'qa.motivation': 'দৈনিক উৎসাহ',
  'qa.paheli': 'একটি পাঁচালি করো',

  // ---------- sidebar ----------
  'sidebar.title': 'আমার AI দোস্ত',
  'sidebar.subtitle': 'চ্যাট ইতিহাস ও টুলস',
  'sidebar.close': 'সাইডবার বন্ধ করুন',
  'sidebar.newChat': 'নতুন কথা শুরু করুন',
  'sidebar.savedChats': 'সংরক্ষিত চ্যাট ({count})',
  'sidebar.samples': 'নমুনা পরিস্থিতি',
  'sidebar.search': 'কথোপকথন খুঁজুন...',
  'sidebar.noHistory': 'এখনও কোনো চ্যাট ইতিহাস নেই।',
  'sidebar.pinned': 'পিন করা চ্যাট',
  'sidebar.unpin': 'পিন সরান',
  'sidebar.delete': 'মুছুন',
  'sidebar.recent': 'সাম্প্রতিক চ্যাট',
  'sidebar.pinTop': 'উপরে পিন করুন',
  'sidebar.trySamples': 'এক ট্যাপেই এই নমুনা পরিস্থিতিগুলো দেখুন:',
  'sidebar.downloadBackup': 'কথোপকথনের ব্যাকআপ ফাইল ডাউনলোড করুন',
  'sidebar.savedTxt': 'TXT সেভ হয়েছে',
  'sidebar.export': 'চ্যাট এক্সপোর্ট করুন',
  'sidebar.version': 'AI দোস্ত v1.0',

  // ---------- persona modal ----------
  'persona.title': 'আপনার দোস্তের ধরন (পার্সোনা)',
  'persona.subtitle': 'বেছে নিন আপনার দোস্ত কীভাবে কথা বলবে',
  'persona.footer': 'আপনি যেকোনো সময় আপনার পছন্দের ধরন বদলাতে পারেন।',

  // ---------- document helper modal ----------
  'doc.title': 'বিল বা নোটিশ বুঝিয়ে দিন',
  'doc.subtitle': 'ছবি পাঠান বা নমুনা টেমপ্লেট দেখুন',
  'doc.upload': 'আপনার বিল বা নথির ছবি আপলোড করুন',
  'doc.uploadHint': 'বিদ্যুৎ বিল, ব্যাংক নোটিশ, প্রেসক্রিপশন বা জটিল কন্ট্রাক্টের ছবি',
  'doc.samples': 'অথবা এই নমুনা পরিস্থিতিগুলো দেখুন:',
  'doc.footer': 'আমার AI দোস্ত কোনো জটিল শব্দ ছাড়াই সোজা ও সহজ ভাষায় বুঝিয়ে দেবে।',

  // ---------- booster modal ----------
  'booster.title': 'সঙ্গে সঙ্গে মুড বুস্টার',
  'booster.subtitle': 'এক ট্যাপেই আপনার দোস্তের কাছ থেকে',
  'booster.footer': 'আপনার দিনটা খুশি করতে আপনার দোস্ত সবসময় প্রস্তুত!',
  'booster.joke.title': 'দেশি জোক ও মজা',
  'booster.joke.desc': 'তাজা, পরিষ্কার ও মজার জোক শুনে মুখে হাসি ফুটবে।',
  'booster.shayari.title': 'সুন্দর শায়রি',
  'booster.shayari.desc': 'জীবন, বন্ধুত্ব বা সাহস নিয়ে হৃদয় ছোঁয়া ২-৪ লাইন।',
  'booster.thought.title': 'দোস্তের দৈনিক বার্তা',
  'booster.thought.desc': 'ইতিবাচক শক্তি নিয়ে দিন শুরু করার জন্য।',
  'booster.paheli.title': 'বুদ্ধির পাঁচালি (Riddle)',
  'booster.paheli.desc': 'একটি চতুর পাঁচালি যেখানে মাথা নড়বে!',

  // ---------- about modal ----------
  'about.title': 'AI দোস্ত — আপনার সবকিছুর একসাথে সঙ্গী',
  'about.subtitle': 'বন্ধুত্বপূর্ণ, সহজ, উষ্ণ এবং সম্পূর্ণ বিচারহীন',
  'about.intro':
    '“AI দোস্ত” এমন এক সঙ্গী যা সব ধরনের মানুষের সব পরিস্থিতিতে সাহায্য করে — আপনি শিক্ষার্থী হন, গৃহিণী, ব্যবসায়ী বা প্রবীণ — যেই হন না কেন। এটি আপনার নিজের মতো বন্ধুর মতো, ঠিক আপনার ভাষাতেই কথা বলে — হিন্দি, English, রোমান হিন্দি বা পৃথিবীর যেকোনো ভাষা।',
  'about.tasks': 'AI দোস্তের ৪টি প্রধান কাজ:',
  'about.task1': '১. বুঝিয়ে বলা (শেখা)',
  'about.task1desc':
    'যেকোনো বিষয়, বিদ্যুৎ/পানির বিল, সরকারি নোটিশ, ওষুধের প্রেসক্রিপশন বা ছবি — কোনো ভারী কারিগরি জটিল শব্দ ছাড়াই রোজনের সহজ ভাষায় বোঝানো।',
  'about.task2': '২. মনের কথা (উৎসাহ)',
  'about.task2desc':
    'মন খারাপ, মানসিক চাপ বা ক্লান্তি — কোনো বিচার ছাড়া সত্যিকারের বন্ধুর মতো শোনা, আবেগের সমর্থন এবং মৃদু উৎসাহ দেওয়া।',
  'about.task3': '৩. পরামর্শ ও উত্তরের সুপারিশ',
  'about.task3desc':
    'WhatsApp-এ কী উত্তর দেবেন, অদ্ভুত পরিস্থিতিতে কী বলবেন বা সিদ্ধান্ত কীভাবে নেবেন — ২-৩টি স্পষ্ট বিকল্প তৈরি করে দেওয়া।',
  'about.task4': '৪. মজা ও বিনোদন',
  'about.task4desc':
    'দেশি জোক, মন ছোঁয়া শায়রি, মজার গল্প ও পাঁচালি নিয়ে মন ভরানো ও মুখে হাসি ফোটানো।',
  'about.values': 'বিশেষ নিয়ম (মূল কথা)',
  'about.value1': 'সবসময় সম্মানজনক ও বন্ধুত্বপূর্ণ থাকা, কখনো rude বা robotic না হওয়া।',
  'about.value2': 'সোজা, পরিষ্কার ও কাজের উত্তর দেওয়া, অপ্রয়োজনীয়ভাবে লম্বা না করে।',
  'about.value3': 'ভয়েস ইনপুট ও ভয়েস আউটপুট (শুনুন) সহ সহজ কথোপকথন।',
  'about.close': 'বুঝেছি, চলুন কথা বলি!',

  // ---------- app-level messages ----------
  'app.tooBig': 'ছবি বা চ্যাট খুব বড়, ছোট ছবি পাঠান বা নতুন চ্যাট শুরু করুন',
  'app.answerReady': 'দোস্ত, উত্তর প্রস্তুত!',
  'app.networkError': 'দোস্ত, একটু নেটওয়ার্ক সমস্যা হয়েছে: “{error}”। একবার আবার চেষ্টা করুন।',
  'app.geminiKeyError':
    '⚠️ **Google AI Studio API Key আপডেট করা জরুরি**\n\nআপনার বর্তমান Gemini API Key-এর প্রজেক্টে Google অ্যাক্সেস দিতে অস্বীকার করেছে।\n\n**ঠিক করার সহজ উপায়:**\n1. AI Studio-র উপরে-ডানে **Settings > Secrets**-এ ক্লিক করুন।\n2. সেখানে একটি নতুন ও সক্রিয় **GEMINI_API_KEY** দিন।\n3. সেভ করলেই আপনার **AI দোস্ত** আবার সঙ্গে সঙ্গে উত্তর দিতে শুরু করবে!',
  'app.jokeTitle': 'একটা মজার জোক',
  'app.shayariTitle': 'একটি প্রিয় শায়রি',
  'app.motivationTitle': 'আজকের উৎসাহ',
  'app.paheliTitle': 'একটি বুদ্ধির পাঁচালি',
  'app.playPrompt': 'দোস্ত, আমাকে {title} বলো!',
  'app.reexplainPrompt': 'দোস্ত, এটাকে আরও সহজ ভাষায় একটি বাস্তব উদাহরণ দিয়ে বুঝিয়ে দাও।',
  'app.docPrompt': 'আমার এই নথি/পরিস্থিতিটি বুঝিয়ে দাও এবং পথনির্দেশনা দাও:\n\n{text}',
  'app.exportAssistant': 'আমার AI দোস্ত ({name})',

  // ---------- personas ----------
  'persona.default.name': 'AI দোস্ত (ডিফল্ট)',
  'persona.default.tagline': 'উষ্ণ, দয়ালু ও বোধগম্য সঙ্গী',
  'persona.default.desc':
    'ভারসাম্যপূর্ণ, বন্ধুত্বপূর্ণ ও সহানুভূতিশীল ধরন — আপনার ভাষাতেই স্বাভাবিক কথা বলে। সবসময় সম্মানজনক, প্রাণবন্ত ও সহায়ক।',
  'persona.default.badge': 'জনপ্রিয়',
  'persona.desi.name': 'দেশি ভাই / জিগ্রি দোস্ত',
  'persona.desi.tagline': 'ঠান্ডা মেজাজ, মজা আর হাসির ভিড়',
  'persona.desi.desc':
    'আনন্দময়, প্রাণবন্ত, মজার ও কথোপকথনমূলক ধরন — হালকা মজা আর পুরো দেশি আবহ।',
  'persona.desi.badge': 'মজা ও আরাম',
  'persona.bhai.name': 'বড় ভাই / দিদি',
  'persona.bhai.tagline': 'সহায়ক গুরু ও সৎ পথনির্দেশক',
  'persona.bhai.desc':
    'বিচারশীল, দয়ালু বড় ভাই-দিদির মতো ধরন — মজার ও বাস্তব পরামর্শ এবং গভীর আবেগিক সমর্থন।',
  'persona.bhai.badge': 'বিচারশীল ও পথনির্দেশক',
  'persona.pro.name': 'স্মার্ট উপদেষ্টা / কোচ',
  'persona.pro.tagline': 'ঝকঝকে, সুশৃঙ্খল ও সমাধান-কেন্দ্রিক',
  'persona.pro.desc':
    'ঝকঝকে কিন্তু বন্ধুত্বপূর্ণ পেশাদার সঙ্গী — নিখুঁত ইমেইল, উত্তর ও পরিষ্কার সারসংক্ষেপ তৈরি করে।',
  'persona.pro.badge': 'পেশাদার',

  // ---------- category info ----------
  'cat.explain.name': 'বুঝিয়ে বলুন',
  'cat.explain.desc':
    'বিল, নোটিশ, কঠিন বিষয়, প্রেসক্রিপশন বা ছবি — ভারী জটিল শব্দ ছাড়াই একদম সহজ শব্দে ব্যাখ্যা।',
  'cat.emotional.name': 'মনের কথা / উৎসাহ',
  'cat.emotional.desc':
    'নিজের কথা, মানসিক চাপ, খারাপ মন বা দিনের খুশি ভাগ করে নিন। বিচারহীন এক বন্ধু, যিনি সত্যিই শোনেন ও উৎসাহ দেন।',
  'cat.advice.name': 'পরামর্শ / উত্তরের সুপারিশ',
  'cat.advice.desc':
    'কী উত্তর দেবেন বা কোন সিদ্ধান্ত নেবেন — সমস্যা অনুযায়ী ২-৩টি ব্যবহারিক বিকল্প পাবেন।',
  'cat.fun.name': 'মজা ও বিনোদন',
  'cat.fun.desc':
    'দেশি জোক, মন ছোঁয়া মজার গল্প, শায়রি, পাঁচালি আর হালকা-ফুলকা আলাপ দিয়ে দিনটা হালকা করুন।',
  'cat.general.name': 'সবকিছুর এক বন্ধু',
  'cat.general.desc': 'যা খুশি জিজ্ঞাসা করুন, যা খুশি শেয়ার করুন — আপনার নিজের দোস্ত সবসময় প্রস্তুত।',

  // ---------- quick prompts ----------
  'prompt.bill.title': 'বিদ্যুৎ / মোবাইল বিল বুঝিয়ে দিন',
  'prompt.bill.subtitle': 'ফিক্সড চার্জ, ইউনিট ও সাবসিডি কী?',
  'prompt.bill.prompt':
    'এবার আমার বিদ্যুৎ বিল বেশি এসেছে। সহজ ভাষায় বুঝিয়ে দাও যে বিলে ফিক্সড চার্জ, এনার্জি চার্জ ও ইউনিট রেটের কী অর্থ।',
  'prompt.sip.title': 'SIP ও মিউচুয়াল ফান্ড কী?',
  'prompt.sip.subtitle': 'নতুনদের জন্য একদম সহজ ভাষায় গাইড',
  'prompt.sip.prompt':
    'মিউচুয়াল ফান্ড ও SIP কী? আমাকে ১০ বছরের শিশুর মতো সহজ ভাষায় বুঝিয়ে দাও।',
  'prompt.tired.title': 'আজ একটু ক্লান্ত / মন খারাপ',
  'prompt.tired.subtitle': 'মন হালকা করতে চাই...',
  'prompt.tired.prompt':
    'দোস্ত, আজকের দিন খুব দৌড়ঝাঁপ ও মানসিক চাপে কেটেছে। মাথা ক্লান্ত, শুধু একটু ইতিবাচক কথা শুনতে চাই।',
  'prompt.overthink.title': 'ভবিষ্যতের চিন্তা ও অতি-ভাবনা',
  'prompt.overthink.subtitle': 'মন শান্ত করার উপায়',
  'prompt.overthink.prompt':
    'আমি নিজের ভবিষ্যৎ ও ক্যারিয়ার নিয়ে অনেক বেশি অতি-ভাবনা করি। বুঝিয়ে দাও যে বর্তমানে মন কীভাবে নিবিলাস করব।',
  'prompt.leave.title': 'বসের কাছে জরুরি ছুটি কীভাবে চাইব?',
  'prompt.leave.subtitle': '২-৩টি প্রস্তুত WhatsApp/ইমেইল বিকল্প',
  'prompt.leave.prompt':
    'আগামীকাল হঠাৎ জরুরি কাজে ছুটি দরকার। বসকে পাঠানোর জন্য ২-৩টি বাস্তবসম্মত WhatsApp বার্তার বিকল্প বানিয়ে দাও (নরম, সরাসরি ও পেশাদার)।',
  'prompt.money.title': 'দোস্তের কাছ থেকে ধার করা টাকা ফেরত চাইব কীভাবে?',
  'prompt.money.subtitle': 'সম্পর্ক নষ্ট না করে সহজে মনে করানোর উপায়',
  'prompt.money.prompt':
    'কয়েক মাস আগে আমার এক বন্ধুকে কিছু টাকা ধার দিয়েছিলাম। অদ্ভুত না করে, রাগ না করে ভালোবাসে মনে করানোর ৩টি ভালো বিকল্প দাও।',
  'prompt.joke.title': 'একটা মজার দেশি জোক বলো',
  'prompt.joke.subtitle': 'হাসির ডোজ',
  'prompt.joke.prompt': 'দোস্ত, একদম তাজা ও মজার দেশি জোক বলো যেটা শুনে হাসি পায়!',
  'prompt.shayari.title': 'জীবন নিয়ে একটি প্রিয় শায়রি',
  'prompt.shayari.subtitle': 'মন ছোঁয়া লাইন',
  'prompt.shayari.prompt': 'জীবন, বন্ধুত্ব বা পরিশ্রম নিয়ে একটি সুন্দর ও মন ছোঁয়া শায়রি বলো।',

  // ---------- sample documents ----------
  'doc.bill.name': 'বিদ্যুৎ বিল (নমুনা বিল)',
  'doc.bill.desc': 'বিদ্যুৎ ব্যবহার, স্ল্যাব ও বকেয়া দেখানো একটি নমুনা লেখা।',
  'doc.kyc.name': 'ব্যাংক KYC নোটিশ (নমুনা নোটিশ)',
  'doc.kyc.desc': 'অসম্পূর্ণ KYC ও অ্যাকাউন্ট স্থগিতের সতর্কতা সম্পর্কিত ব্যাংকের নমুনা চিঠি।',
  'doc.awkward.name': 'অদ্ভুত WhatsApp চ্যাট (উত্তরের পরিস্থিতি)',
  'doc.awkward.desc': 'একজন পরিচিত মানুষ সপ্তাহান্তে বিনা পারিশ্বামিকে বড় কাজ করতে বলছেন।',
};

export default bn;
