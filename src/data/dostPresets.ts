import { DostCategory, PersonaProfile } from '../types';
import { TranslateFn } from '../i18n';

export interface CategoryInfo {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const getPersonaProfiles = (t: TranslateFn): PersonaProfile[] => [
  {
    id: 'samajhdar_dost',
    name: t('persona.default.name'),
    tagline: t('persona.default.tagline'),
    avatarEmoji: '🤝',
    toneDescription: t('persona.default.desc'),
    badge: t('persona.default.badge'),
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'desi_yaar',
    name: t('persona.desi.name'),
    tagline: t('persona.desi.tagline'),
    avatarEmoji: '😎',
    toneDescription: t('persona.desi.desc'),
    badge: t('persona.desi.badge'),
    color: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'bada_bhai_didi',
    name: t('persona.bhai.name'),
    tagline: t('persona.bhai.tagline'),
    avatarEmoji: '🌟',
    toneDescription: t('persona.bhai.desc'),
    badge: t('persona.bhai.badge'),
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'career_pro',
    name: t('persona.pro.name'),
    tagline: t('persona.pro.tagline'),
    avatarEmoji: '💼',
    toneDescription: t('persona.pro.desc'),
    badge: t('persona.pro.badge'),
    color: 'from-blue-500 to-indigo-700',
  },
];

export const getCategoryInfo = (t: TranslateFn): Record<DostCategory, CategoryInfo> => ({
  explain: {
    name: t('cat.explain.name'),
    emoji: '📚',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50/80 hover:bg-blue-100/90 text-blue-900 border-blue-200',
    borderColor: 'border-blue-300',
    description: t('cat.explain.desc'),
  },
  emotional: {
    name: t('cat.emotional.name'),
    emoji: '❤️',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-50/80 hover:bg-rose-100/90 text-rose-900 border-rose-200',
    borderColor: 'border-rose-300',
    description: t('cat.emotional.desc'),
  },
  advice: {
    name: t('cat.advice.name'),
    emoji: '💡',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border-amber-200',
    borderColor: 'border-amber-300',
    description: t('cat.advice.desc'),
  },
  fun: {
    name: t('cat.fun.name'),
    emoji: '😄',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50/80 hover:bg-purple-100/90 text-purple-900 border-purple-200',
    borderColor: 'border-purple-300',
    description: t('cat.fun.desc'),
  },
  general: {
    name: t('cat.general.name'),
    emoji: '🤝',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200',
    borderColor: 'border-stone-300',
    description: t('cat.general.desc'),
  },
});

export const getSampleDocuments = (t: TranslateFn) => [
  {
    id: 'sample_bill',
    name: t('doc.bill.name'),
    description: t('doc.bill.desc'),
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
    name: t('doc.kyc.name'),
    description: t('doc.kyc.desc'),
    text: `APEX NATIONAL BANK - NOTICE TO ACCOUNT HOLDER
Ref: KYC/REM/2026/0891
Dear Customer,
As per RBI periodic update mandate, your Savings A/c no. XXXX4910 is due for Re-KYC verification.
Kindly submit updated Proof of Identity (Aadhaar/Passport/Voter ID) and Proof of Address within 30 days.
Failure to complete verification may result in temporary debit freeze as per regulatory guidelines. You can also complete this via Video-KYC on the mobile banking app without visiting the branch.`,
  },
  {
    id: 'sample_chat_awkward',
    name: t('doc.awkward.name'),
    description: t('doc.awkward.desc'),
    text: `Acquaintance: "Hey brother! Sunna, tu to graphic design / coding jaanta hai na? Mujhe meri nayi company ka logo aur website banana hai urgently kal tak. Tu free mein bana dega na bhai dost samajh ke? Please!"`,
  },
];
