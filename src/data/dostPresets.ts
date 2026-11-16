import { DostCategory, PersonaProfile, QuickPromptItem } from '../types';

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: 'samajhdar_dost',
    name: 'AI दोस्त (डिफ़ॉल्ट)',
    tagline: 'गर्मजोशी भरा, दयालु और समझदार साथी',
    avatarEmoji: '🤝',
    toneDescription: 'संतुलित, मित्रवत और सहानुभूतिशील अंदाज़ — हिंदी में स्वाभाविक बातचीत। हमेशा सम्मानजनक, खुशमिज़ाज और मददगार।',
    badge: 'लोकप्रिय',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'desi_yaar',
    name: 'देसी यार / ज़िगरी दोस्त',
    tagline: 'आरामदायक, मज़ेदार और मस्ती से भरपूर',
    avatarEmoji: '😎',
    toneDescription: 'कैज़ा, खुशमिज़ाज, मज़ेदार और बातचीत वाला अंदाज़ — हल्का-फुल्का मज़ाक और पूरा देसीपन।',
    badge: 'मस्ती और आराम',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'bada_bhai_didi',
    name: 'बड़ा भाई / दीदी',
    tagline: 'सहायक गुरु और ईमानदार मार्गदर्शक',
    avatarEmoji: '🌟',
    toneDescription: 'समझदार, दयालु बड़े भाई-दीदी वाला अंदाज़ — ठोस व्यावहारिक सलाह और गहरा भावनात्मक सहारा।',
    badge: 'समझदार और मार्गदर्शक',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'career_pro',
    name: 'स्मार्ट सलाहकार / कोच',
    tagline: 'सुसंगठित, साफ़-सुथरा और समाधान-केंद्रित',
    avatarEmoji: '💼',
    toneDescription: 'सुसंगठित पर दोस्ताना पेशेवर साथी — जो परफेक्ट ईमेल, जवाब और साफ़ सारांश बनाता है।',
    badge: 'पेशेवर',
    color: 'from-blue-500 to-indigo-700',
  },
];

export const CATEGORY_INFO: Record<DostCategory, {
  name: string;
  hindiName: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  explain: {
    name: 'समझाओ',
    hindiName: 'सरल भाषा में समझो',
    emoji: '📚',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50/80 hover:bg-blue-100/90 text-blue-900 border-blue-200',
    borderColor: 'border-blue-300',
    description: 'बिल, नोटिस, मुश्किल विषय, प्रिस्क्रिप्शन या फ़ोटो — बिना भारी jargon के बिल्कुल आसान शब्दों में समझाना।',
  },
  emotional: {
    name: 'दिल की बात / हौसला',
    hindiName: 'दिल की बात और हौसला',
    emoji: '❤️',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-50/80 hover:bg-rose-100/90 text-rose-900 border-rose-200',
    borderColor: 'border-rose-300',
    description: 'अपनी बात, तनाव, खराब मन या दिन की खुशियाँ साझा कीजिए। एक ऐसा दोस्त जो बिना जजमेंट किए सच्चे दिल से सुनता है और हौसला देता है।',
  },
  advice: {
    name: 'सलाह / जवाब के सुझाव',
    hindiName: 'सलाह और रिप्लाई आइडियाज',
    emoji: '💡',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border-amber-200',
    borderColor: 'border-amber-300',
    description: 'जवाब क्या दें या कौन-सा फ़ैसला लें — मनचाहा मिलने वाले 2-3 व्यावहारिक विकल्प पाएँ।',
  },
  fun: {
    name: 'मस्ती और मज़ाक',
    hindiName: 'हंसी-मज़ाक और टाइमपास',
    emoji: '😄',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50/80 hover:bg-purple-100/90 text-purple-900 border-purple-200',
    borderColor: 'border-purple-300',
    description: 'देसी जोक, दिल को छूने वाली मज़ेदार कहानियाँ, शायरियाँ, पहेलियाँ और हल्की-फुल्की बातचीत से दिन हल्का करें।',
  },
  general: {
    name: 'सब कुछ एक दोस्त',
    hindiName: 'ऑल-इन-वन दोस्त',
    emoji: '🤝',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200',
    borderColor: 'border-stone-300',
    description: 'कुछ भी पूछिए, कुछ भी साझा कीजिए — आपका अपना दोस्त हर वक्त तैयार है।',
  },
};

export const QUICK_PROMPTS: QuickPromptItem[] = [
  {
    id: 'exp-bill',
    title: 'बिजली / मोबाइल बिल समझाओ',
    subtitle: 'फिक्स्ड चार्ज, यूनिट और सब्सिडी क्या है?',
    prompt: 'मेरे बिजली का बिल इस बार ज़्यादा आया है। मुझे आसान भाषा में समझाओ कि बिल में फिक्स्ड चार्ज, एनर्जी चार्ज और यूनिट रेट का क्या मतलब होता है?',
    category: 'explain',
    emoji: '⚡',
  },
  {
    id: 'exp-mutual-funds',
    title: 'SIP और म्यूचुअल फ़ंड क्या हैं?',
    subtitle: 'शुरुआती लोगों के लिए बिल्कुल आसान भाषा में',
    prompt: 'म्यूचुअल फ़ंड और SIP क्या होते हैं? मुझे किसी 10 साल के बच्चे की तरह आसान भाषा में समझाओ।',
    category: 'explain',
    emoji: '💰',
  },
  {
    id: 'emo-stress',
    title: 'आज थोड़ा थका हुआ / मन खराब है',
    subtitle: 'दिल हल्का करना चाहता हूँ...',
    prompt: 'दोस्त, आज का दिन बहुत भाग-दौड़ और तनाव भरा रहा। दिमाग थका हुआ है, बस थोड़ी सकारात्मक बात सुनना चाहता हूँ।',
    category: 'emotional',
    emoji: '☕',
  },
  {
    id: 'emo-overthinking',
    title: 'भविष्य की चिंता और ओवर-थिंकिंग',
    subtitle: 'मन शांत करने का तरीका',
    prompt: 'मैं अपने भविष्य और करियर को लेकर बहुत ज़्यादा overthink करता हूँ। मुझे समझाओ कि अपना ध्यान वर्तमान पर कैसे लगाऊँ?',
    category: 'emotional',
    emoji: '🌱',
  },
  {
    id: 'adv-boss-leave',
    title: 'बॉस से जल्दी छुट्टी कैसे माँगें?',
    subtitle: '2-3 तैयार WhatsApp/ईमेल विकल्प',
    prompt: 'मुझे कल अचानक ज़रूरी काम से छुट्टी चाहिए। बॉस को भेजने के लिए 2-3 व्यावहारिक WhatsApp संदेश विकल्प बना कर दो (नरम, सीधा और पेशेवर)।',
    category: 'advice',
    emoji: '📩',
  },
  {
    id: 'adv-money-back',
    title: 'दोस्त से उधार दिए पैसे कैसे माँगें?',
    subtitle: 'रिश्ता खराब किए बिना प्यारी याद दिलाने के तरीके',
    prompt: 'मैंने कुछ महीने पहले अपने दोस्त को पैसे उधार दिए थे। बिना अजीब या गुस्से के, प्यार से याद दिलाने के 3 अच्छे विकल्प दो।',
    category: 'advice',
    emoji: '🤝',
  },
  {
    id: 'fun-joke',
    title: 'एक मस्त देसी जोक सुनाओ',
    subtitle: 'हंसी का डोज़',
    prompt: 'दोस्त, एक बिल्कुल ताज़ा और मज़ेदार देसी जोक सुनाओ जो सुनकर हंसी आ जाए!',
    category: 'fun',
    emoji: '😂',
  },
  {
    id: 'fun-shayari',
    title: 'ज़िंदगी पर एक प्यारी शायरी',
    subtitle: 'दिल को छू लेने वाली पंक्तियाँ',
    prompt: 'ज़िंदगी, दोस्ती या मेहनत पर एक खूबसूरत और दिल को छूने वाली शायरी सुनाओ।',
    category: 'fun',
    emoji: '✍️',
  },
];

export const SAMPLE_DOCUMENTS = [
  {
    id: 'sample_bill',
    name: 'बिजली का बिल (नमूना बिल)',
    description: 'बिजली की खपत, स्लैब और बकाया राशि दिखाने वाला नमूना टेक्स्ट।',
    text: `UTILITY ELECTRICITY DISTRIBUTION CORP - INVOICE
Consumer No: 9823471029 | Billing Date: 15-AUG
Total Units Consumed: 342 kWh
Energy Charges: Rs 1,881.00 (Slab: 0-100 @ Rs 4.5, 101-300 @ Rs 6.0, 300+ @ Rs 7.5)
Fixed Demand Charges: Rs 220.00
Fuel Surcharge Adjustment (FSA): Rs 136.80
State Govt Electricity Duty (6%): Rs 134.26
Green Energy Cess: Rs 15.00
Past Due / Arrear: Rs 0.00
Prompt Payment Subsidy: -Rs 75.00
TOTAL AMOUNT PAYABLE: Rs 2,312.00 (Due Date: 28-AUG)`,
  },
  {
    id: 'sample_notice',
    name: 'बैंक KYC नोटिस (नमूना नोटिस)',
    description: 'लंबित KYC और खाता निलंबन की चेतावनी पर बैंक का नमूना पत्र।',
    text: `APEX NATIONAL BANK - NOTICE TO ACCOUNT HOLDER
Ref: KYC/REM/2026/0891
Dear Customer,
As per RBI periodic update mandate, your Savings A/c no. XXXX4910 is due for Re-KYC verification.
Kindly submit updated Proof of Identity (Aadhaar/Passport/Voter ID) and Proof of Address within 30 days.
Failure to complete verification may result in temporary debit freeze as per regulatory guidelines. You can also complete this via Video-KYC on the mobile banking app without visiting the branch.`,
  },
  {
    id: 'sample_chat_awkward',
    name: 'अटकली WhatsApp चैट (जवाब की परिस्थिति)',
    description: 'एक जान-पहचान वाला इंसान सप्ताहांत में मुफ़्त में बड़ा काम करने को कह रहा है।',
    text: `Acquaintance: "Hey brother! Sunna, tu to graphic design / coding jaanta hai na? Mujhe meri nayi company ka logo aur website banana hai urgently kal tak. Tu free mein bana dega na bhai dost samajh ke? Please!"`,
  },
];
