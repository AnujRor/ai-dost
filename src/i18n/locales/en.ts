/**
 * The on-screen UI is English-only. This file is the single source of truth for
 * every visible string — `TranslationKey` is derived from these keys, so adding
 * or removing a key here immediately updates the type used across the app.
 */
export const en = {
  // ---------- common ----------
  'common.appName': 'AI Dost',
  'common.you': 'You',
  'common.assistant': 'My AI Dost',
  'common.newChat': 'New conversation',
  'common.photoDocument': 'Photo document',
  'common.back': 'Back',

  // ---------- header ----------
  'header.savedChatsTitle': 'Saved chats & scenarios',
  'header.openSidebar': 'Open sidebar',
  'header.alwaysWithYou': 'Always with you',
  'header.modesCount': '{name} • 4 modes',
  'header.changePersona': 'Change your friend’s style',
  'header.modeLabel': 'Mode:',
  'header.billDocTitle': 'Explain a bill or document',
  'header.billNoticeLabel': 'Bill / Notice',
  'header.boosterTitle': 'Jokes, shayari, daily motivation',
  'header.boosterLabel': 'Booster',
  'header.voiceOn': 'Friend’s voice: on',
  'header.voiceOff': 'Friend’s voice: off (mute)',
  'header.toggleVoice': 'Toggle voice output',
  'header.newChatTitle': 'Start a new conversation',
  'header.newChatAria': 'New chat',
  'header.aboutTitle': 'About My AI Dost',
  'header.aboutAria': 'About the app',

  // ---------- category bar ----------
  'category.heading': 'Category:',
  'category.auto': 'Auto (it figures it out)',
  'category.explain': '1. Explain',
  'category.emotional': '2. Heart talk',
  'category.advice': '3. Advice & replies',
  'category.fun': '4. Fun & laughs',

  // ---------- chat bubble ----------
  'bubble.me': 'Me',
  'bubble.photo': 'Photo',
  'bubble.photoNotSaved': '(photo could not be saved)',
  'bubble.uploadedAlt': 'Uploaded picture',
  'bubble.zoomTitle': 'Enlarge picture',
  'bubble.zoomedAlt': 'Enlarged picture',
  'bubble.typing': 'Writing the answer...',
  'bubble.stopVoice': 'Stop the voice',
  'bubble.listenVoice': 'Listen to your friend',
  'bubble.speaking': 'Speaking...',
  'bubble.listen': 'Listen',
  'bubble.copyTitle': 'Copy text',
  'bubble.copied': 'Copied!',
  'bubble.copy': 'Copy',
  'bubble.reexplainTitle': 'Explain it even more simply',
  'bubble.reexplain': 'Simpler words',

  // ---------- chat input ----------
  'input.onlyImages': 'Please upload images only (JPG, PNG, WebP).',
  'input.photoTooBig': 'That photo is too large (over 15MB). Please send a smaller photo.',
  'input.voiceError': 'Voice recording failed. Please try again.',
  'input.noSpeechRecognition': 'Speech recognition is not available in your browser.',
  'input.previewAlt': 'Uploaded preview',
  'input.photoAttached': 'Photo attached',
  'input.photoWillBeRead': 'The photo/document will be read and explained',
  'input.removeImage': 'Remove image',
  'input.listening': 'Your friend is listening... go ahead',
  'input.stop': 'Stop',
  'input.attachTitle': 'Upload a photo / bill / notice',
  'input.phImage': 'What would you like to know about this photo? (Enter to send)',
  'input.phExplain': 'Something to explain? Like “electricity bill” or “what is SIP”...',
  'input.phEmotional': 'Share what’s on your mind, your friend is listening...',
  'input.phAdvice': 'What do you need advice or a reply for?...',
  'input.phFun': 'Ask for a joke, a story or some shayari...',
  'input.phDefault': 'Write in any language or send a photo...',
  'input.listeningTitle': 'Listening... click to stop',
  'input.voiceInputTitle': 'Speak (voice input)',
  'input.sendTitle': 'Send message',
  'input.footer': 'My AI Dost • helps in any language',
  'input.shiftEnter': 'Shift + Enter for a new line',

  // ---------- welcome hero ----------
  'welcome.badge': 'Your friend who shows up in every mode',
  'welcome.greeting': 'Hello! I am',
  'welcome.brand': 'My AI Dost',
  'welcome.popular': 'Popular questions & topics',

  // ---------- quick actions toolbar ----------
  'qa.heading': 'Boosters:',
  'qa.joke': 'Desi joke',
  'qa.shayari': 'Beautiful shayari',
  'qa.motivation': 'Daily motivation',
  'qa.paheli': 'Ask me a riddle',

  // ---------- sidebar ----------
  'sidebar.title': 'My AI Dost',
  'sidebar.subtitle': 'Chat history & tools',
  'sidebar.close': 'Close sidebar',
  'sidebar.newChat': 'Start a new conversation',
  'sidebar.savedChats': 'Saved chats ({count})',
  'sidebar.samples': 'Sample scenarios',
  'sidebar.search': 'Search conversations...',
  'sidebar.noHistory': 'No chat history yet.',
  'sidebar.pinned': 'Pinned chats',
  'sidebar.unpin': 'Unpin',
  'sidebar.delete': 'Delete',
  'sidebar.recent': 'Recent chats',
  'sidebar.pinTop': 'Pin to top',
  'sidebar.trySamples': 'Try these sample scenarios with one tap:',
  'sidebar.downloadBackup': 'Download a backup of the conversation',
  'sidebar.savedTxt': 'TXT saved',
  'sidebar.export': 'Export chat',
  'sidebar.version': 'AI Dost v1.0',

  // ---------- persona modal ----------
  'persona.title': 'Your friend’s style (persona)',
  'persona.subtitle': 'Pick how your friend should talk to you',
  'persona.footer': 'You can change your favourite style at any time.',

  // ---------- document helper modal ----------
  'doc.title': 'Explain a bill or notice',
  'doc.subtitle': 'Send a photo or try a sample template',
  'doc.upload': 'Upload a photo of your bill or document',
  'doc.uploadHint': 'Electricity bill, bank notice, prescription or a confusing contract',
  'doc.samples': 'Or try these sample scenarios:',
  'doc.footer': 'My AI Dost explains it straight and simple, without any jargon.',

  // ---------- booster modal ----------
  'booster.title': 'Instant mood booster',
  'booster.subtitle': 'One tap with your friend',
  'booster.footer': 'Your friend is always ready to make your day better!',
  'booster.joke.title': 'Desi joke & laughs',
  'booster.joke.desc': 'Fresh, clean and funny jokes that put a smile on your face.',
  'booster.shayari.title': 'Beautiful shayari',
  'booster.shayari.desc': '2-4 heart-touching lines about life, friendship or courage.',
  'booster.thought.title': 'Your friend’s daily message',
  'booster.thought.desc': 'Start the day with positive vibes and energy.',
  'booster.paheli.title': 'Brain teaser (riddle)',
  'booster.paheli.desc': 'A clever riddle that gives your brain a little workout!',

  // ---------- about modal ----------
  'about.title': 'AI Dost — your all-in-one companion',
  'about.subtitle': 'Friendly, simple, warm and completely judgement-free',
  'about.intro':
    '“AI Dost” is a companion that helps every kind of person in every situation — whether you are a student, a homemaker, a businessperson or a senior. It talks to you like a close friend, in your own language — Hindi, English, Roman Hindi or any language in the world.',
  'about.tasks': 'The 4 main jobs of AI Dost:',
  'about.task1': '1. Explain (learning)',
  'about.task1desc':
    'Any topic, an electricity/water bill, a government notice, a medicine slip or a photo — explained in everyday simple words, without heavy jargon.',
  'about.task2': '2. Heart talk (motivation)',
  'about.task2desc':
    'Low mood, tension or plain tiredness — being heard like a real friend, without judgement, with emotional support and gentle encouragement.',
  'about.task3': '3. Advice & reply suggestions',
  'about.task3desc':
    'What to reply on WhatsApp, what to say in an awkward situation, or how to make a decision — 2-3 clear options ready to use.',
  'about.task4': '4. Fun & entertainment',
  'about.task4desc':
    'Desi jokes, relatable shayari, funny stories and riddles to lift your mood and put a smile on your face.',
  'about.values': 'Key values',
  'about.value1': 'Always respectful and friendly, never rude or robotic.',
  'about.value2': 'Straight, clear and useful answers, without dragging it out.',
  'about.value3': 'Easy chatting with voice input and voice output (Listen).',
  'about.close': 'Got it, let’s talk!',

  // ---------- app-level messages ----------
  'app.tooBig': 'That photo or chat is too big — send a smaller photo or start a new chat',
  'app.answerReady': 'Your friend is ready with an answer!',
  'app.networkError': 'Your friend hit a small network issue: “{error}”. Please try once more.',
  'app.geminiKeyError':
    '⚠️ **Google AI Studio API Key needs an update**\n\nGoogle has blocked access to the project behind your current Gemini API Key.\n\n**How to fix it:**\n1. Click **Settings > Secrets** at the top-right of AI Studio.\n2. Add a new, active **GEMINI_API_KEY**.\n3. As soon as you save, your **AI Dost** will start replying again instantly!',
  'app.jokeTitle': 'a funny joke',
  'app.shayariTitle': 'a lovely shayari',
  'app.motivationTitle': 'today’s motivation',
  'app.paheliTitle': 'a brain teaser',
  'app.playPrompt': 'Friend, please tell me {title}!',
  'app.reexplainPrompt': 'Friend, explain this in even simpler words with a real-life example.',
  'app.docPrompt': 'Please explain this document/situation and guide me:\n\n{text}',
  'app.exportAssistant': 'My AI Dost ({name})',

  // ---------- personas ----------
  'persona.default.name': 'AI Dost (default)',
  'persona.default.tagline': 'Warm, caring & understanding companion',
  'persona.default.desc':
    'A balanced, friendly and empathetic tone that chats naturally in the language you use. Always respectful, cheerful and helpful.',
  'persona.default.badge': 'Popular',
  'persona.desi.name': 'Desi Yaar / Jigri Dost',
  'persona.desi.tagline': 'Chill, funny & full of energy',
  'persona.desi.desc':
    'Casual, upbeat and conversational, with light-hearted humour and full desi warmth.',
  'persona.desi.badge': 'Fun & casual',
  'persona.bhai.name': 'Bada Bhai / Didi',
  'persona.bhai.tagline': 'Supportive mentor & honest guide',
  'persona.bhai.desc':
    'A wise, caring elder-sibling tone with grounded practical advice and deep emotional support.',
  'persona.bhai.badge': 'Wise & guiding',
  'persona.pro.name': 'Smart Advisor / Coach',
  'persona.pro.tagline': 'Polished, structured & solution-driven',
  'persona.pro.desc':
    'A polished yet friendly professional companion who crafts perfect emails, replies and clear summaries.',
  'persona.pro.badge': 'Professional',

  // ---------- category info ----------
  'cat.explain.name': 'Explain',
  'cat.explain.desc':
    'Bills, notices, tricky concepts, prescriptions or photos explained in super simple words, without heavy jargon.',
  'cat.emotional.name': 'Heart talk / Motivation',
  'cat.emotional.desc':
    'Share your feelings, stress, low mood or daily wins. A non-judgemental friend who genuinely listens and lifts you up.',
  'cat.advice.name': 'Advice / Reply suggestions',
  'cat.advice.desc':
    'Unsure what to reply or which decision to make? Get 2-3 tailored, practical options to choose from.',
  'cat.fun.name': 'Fun & entertainment',
  'cat.fun.desc':
    'Desi jokes, relatable funny stories, shayari, riddles and light banter to brighten your day.',
  'cat.general.name': 'All-in-one friend',
  'cat.general.desc': 'Ask anything, share anything — your own friend is always ready.',

  // ---------- quick prompts ----------
  'prompt.bill.title': 'Explain a phone/electricity bill',
  'prompt.bill.subtitle': 'What are fixed charge, units and subsidy?',
  'prompt.bill.prompt':
    'My electricity bill is higher than usual this time. Explain in simple words what the fixed charge, energy charge and unit rate in the bill mean.',
  'prompt.sip.title': 'What are SIP & mutual funds?',
  'prompt.sip.subtitle': 'A beginner guide in very simple words',
  'prompt.sip.prompt':
    'What are mutual funds and SIP? Explain it to me as simply as you would to a 10-year-old.',
  'prompt.tired.title': 'I am exhausted / low today',
  'prompt.tired.subtitle': 'I want to lighten my heart...',
  'prompt.tired.prompt':
    'Friend, today has been a really hectic and stressful day. My mind is tired, I just want to hear something positive.',
  'prompt.overthink.title': 'Anxiety & overthinking about the future',
  'prompt.overthink.subtitle': 'How to calm the mind',
  'prompt.overthink.prompt':
    'I overthink a lot about my future and career. Explain how I can keep my mind on the present.',
  'prompt.leave.title': 'How to ask my boss for urgent leave?',
  'prompt.leave.subtitle': '2-3 ready WhatsApp/email options',
  'prompt.leave.prompt':
    'I need leave tomorrow for something urgent. Give me 2-3 practical WhatsApp message options to send my boss (polite, direct and professional).',
  'prompt.money.title': 'How to ask a friend for money back?',
  'prompt.money.subtitle': 'Gentle reminders without spoiling the relation',
  'prompt.money.prompt':
    'I lent some money to a friend a few months ago. Without being awkward or angry, give me 3 good options to remind them lovingly.',
  'prompt.joke.title': 'Tell me a fun desi joke',
  'prompt.joke.subtitle': 'A dose of laughter',
  'prompt.joke.prompt': 'Friend, tell me a really fresh and funny desi joke that makes me laugh!',
  'prompt.shayari.title': 'A lovely shayari about life',
  'prompt.shayari.subtitle': 'Lines that touch the heart',
  'prompt.shayari.prompt': 'Tell me a beautiful, relatable shayari about life, friendship or hard work.',

  // ---------- sample documents ----------
  'doc.bill.name': 'Electricity bill (sample)',
  'doc.bill.desc': 'Sample text showing power usage, tariff slabs and arrears.',
  'doc.kyc.name': 'Bank KYC notice (sample)',
  'doc.kyc.desc': 'Sample bank letter about pending re-KYC and an account suspension warning.',
  'doc.awkward.name': 'Awkward WhatsApp chat (reply scenario)',
  'doc.awkward.desc': 'An acquaintance asks for a big favour for free over the weekend.',
} as const;

export type TranslationKey = keyof typeof en;

export default en;
