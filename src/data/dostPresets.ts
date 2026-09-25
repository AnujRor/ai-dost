import { DostCategory, PersonaProfile, QuickPromptItem } from '../types';

export const PERSONA_PROFILES: PersonaProfile[] = [
  {
    id: 'samajhdar_dost',
    name: 'AI Dost (Default)',
    tagline: 'Warm, caring & samajhdar saathi',
    avatarEmoji: '🤝',
    toneDescription: 'A balanced, friendly, empathetic tone mixing natural Hindi & English. Always respectful, cheerful, and helpful.',
    badge: 'Popular',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'desi_yaar',
    name: 'Desi Yaar / Jigri Dost',
    tagline: 'Chill, mazedaar & full of masti',
    avatarEmoji: '😎',
    toneDescription: 'Casual, upbeat, fun and conversational with light-hearted humor and full desi warmth.',
    badge: 'Fun & Casual',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'bada_bhai_didi',
    name: 'Bada Bhai / Didi',
    tagline: 'Supportive mentor & honest guide',
    avatarEmoji: '🌟',
    toneDescription: 'Wise, caring elder sibling tone with grounded practical advice and deep emotional support.',
    badge: 'Wise & Guiding',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'career_pro',
    name: 'Smart Advisor / Coach',
    tagline: 'Polished, structured & solution-driven',
    avatarEmoji: '💼',
    toneDescription: 'Polished yet friendly professional companion who crafts perfect emails, replies, and clear summaries.',
    badge: 'Professional',
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
    name: 'Explain / Samjhao',
    hindiName: 'सरल भाषा में समझो',
    emoji: '📚',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50/80 hover:bg-blue-100/90 text-blue-900 border-blue-200',
    borderColor: 'border-blue-300',
    description: 'Bills, notices, complex concepts, prescriptions, or photos explained in super simple words without heavy jargon.',
  },
  emotional: {
    name: 'Dil Ki Baat / Motivation',
    hindiName: 'दिल की बात और हौसला',
    emoji: '❤️',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-50/80 hover:bg-rose-100/90 text-rose-900 border-rose-200',
    borderColor: 'border-rose-300',
    description: 'Share your feelings, stress, low mood or daily wins. A non-judgmental friend who genuinely listens and uplifts you.',
  },
  advice: {
    name: 'Salah / Reply Suggestions',
    hindiName: 'सलाह और रिप्लाई आइडियाज',
    emoji: '💡',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border-amber-200',
    borderColor: 'border-amber-300',
    description: 'Confused what to reply or what decision to make? Get 2-3 tailored, practical options to choose from.',
  },
  fun: {
    name: 'Masti & Entertainment',
    hindiName: 'हंसी-मज़ाक और टाइमपास',
    emoji: '😄',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50/80 hover:bg-purple-100/90 text-purple-900 border-purple-200',
    borderColor: 'border-purple-300',
    description: 'Desi jokes, relatable funny stories, shayaris, riddles (paheliyan), and light banter to brighten your day.',
  },
  general: {
    name: 'All-in-One Dost',
    hindiName: 'ऑल-इन-वन दोस्त',
    emoji: '🤝',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200',
    borderColor: 'border-stone-300',
    description: 'Ask anything, share anything — aapka apna dost har waqt taiyaar hai.',
  },
};

export const QUICK_PROMPTS: QuickPromptItem[] = [
  {
    id: 'exp-bill',
    title: 'Bijli / Mobile Bill Samjhao',
    subtitle: 'Fixed charge, units, subsidy kya hai?',
    prompt: 'Mera bijli ka bill is baar zyada aaya hai. Mujhe simple bhasha mein samjhao ki bill mein fixed charge, energy charge aur unit rate ka kya matlab hota hai?',
    category: 'explain',
    emoji: '⚡',
  },
  {
    id: 'exp-mutual-funds',
    title: 'SIP & Mutual Funds Kya Hai?',
    subtitle: 'Beginner guide bilkul aasan zuban mein',
    prompt: 'Mutual Funds aur SIP kya hote hain? Mujhe kisi 10 saal ke bachche ki tarah aasan bhasha mein samjhao.',
    category: 'explain',
    emoji: '💰',
  },
  {
    id: 'emo-stress',
    title: 'Aaj Thoda Exhausted / Low Hoon',
    subtitle: 'Dil halka karna chahta hoon...',
    prompt: 'Dost, aaj ka din bahut bhaag-daud aur stress bhara raha. Dimag thaka hua hai, bas thodi positive baat sunna chahta hoon.',
    category: 'emotional',
    emoji: '☕',
  },
  {
    id: 'emo-overthinking',
    title: 'Future Ki Tension & Overthinking',
    subtitle: 'Man shaant karne ka tarika',
    prompt: 'Main bohot zyada overthink kar raha hoon apne future aur career ko lekar. Mujhe samjhao main apna dhyan present par kaise lagaoon?',
    category: 'emotional',
    emoji: '🌱',
  },
  {
    id: 'adv-boss-leave',
    title: 'Boss Se Urgent Leave Kaise Maangoon?',
    subtitle: '2-3 ready WhatsApp/Email options',
    prompt: 'Mujhe kal achanak urgent kaam se chutti chahiye. Boss ko bhejne ke liye 2-3 practical WhatsApp message options bana kar do (polite, direct aur professional).',
    category: 'advice',
    emoji: '📩',
  },
  {
    id: 'adv-money-back',
    title: 'Dost Se Udhar Diye Paise Kaise Maangoon?',
    subtitle: 'Bina rishta kharab kiye gentle reminders',
    prompt: 'Maine apne dost ko kuch mahine pehle paise udhar diye the. Bina awkwardly ya gussa kiye, pyaar se yaad dilane ke 3 ache options do.',
    category: 'advice',
    emoji: '🤝',
  },
  {
    id: 'fun-joke',
    title: 'Ek Mast Desi Joke Sunao',
    subtitle: 'Hansi ka dosage',
    prompt: 'Dost, ek ekdum fresh aur mazedaar desi joke sunao jo sunke hansi aa jaye!',
    category: 'fun',
    emoji: '😂',
  },
  {
    id: 'fun-shayari',
    title: 'Zindagi Par Ek Pyari Shayari',
    subtitle: 'Dil ko chhu lene wali lines',
    prompt: 'Zindagi, dosti ya mehnat par ek khoobsurat aur relatable shayari sunao.',
    category: 'fun',
    emoji: '✍️',
  },
];

export const SAMPLE_DOCUMENTS = [
  {
    id: 'sample_bill',
    name: 'Bijli Ka Bill (Electricity Bill Sample)',
    description: 'Sample image/text illustrating power consumption, tariff slab & arrear charges.',
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
    name: 'Bank KYC Notice (Notice Sample)',
    description: 'Sample bank letter regarding pending re-KYC and account suspension warning.',
    text: `APEX NATIONAL BANK - NOTICE TO ACCOUNT HOLDER
Ref: KYC/REM/2026/0891
Dear Customer,
As per RBI periodic update mandate, your Savings A/c no. XXXX4910 is due for Re-KYC verification.
Kindly submit updated Proof of Identity (Aadhaar/Passport/Voter ID) and Proof of Address within 30 days.
Failure to complete verification may result in temporary debit freeze as per regulatory guidelines. You can also complete this via Video-KYC on the mobile banking app without visiting the branch.`,
  },
  {
    id: 'sample_chat_awkward',
    name: 'Awkward WhatsApp Chat (Reply Scenario)',
    description: 'An acquaintance asks to do a big favor for free on the weekend.',
    text: `Acquaintance: "Hey brother! Sunna, tu to graphic design / coding jaanta hai na? Mujhe meri nayi company ka logo aur website banana hai urgently kal tak. Tu free mein bana dega na bhai dost samajh ke? Please!"`,
  },
];
