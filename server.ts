import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = getEnvKey('GEMINI_API_KEY');
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const LANGUAGE_RULE = `भाषा नियम (सबसे पहले और सबसे ज़रूरी — हर जवाब पर लागू):
- ऐप की भाषा (नीचे "ऐप की भाषा" लिखी हुई) आपकी डिफ़ॉल्ट भाषा है — जवाब उसी भाषा और उसी लिपि में दें। बातचीत पहले किसी और भाषा में हुई हो, तब भी नए जवाब ऐप की चुनी हुई भाषा में ही दें।
- अगर यूज़र साफ़ किसी दूसरी भाषा में लिखे (जैसे English, বাংলা, தமிழ், العربية), तो उसी भाषा और उसी लिपि में जवाब दें — आप किसी भी भाषा में जवाब दे सकते हैं।
- लिपि भी मेल खाए: यूज़र रोमन हिंदी में लिखे तो रोमन में लिखें, देवनागरी में लिखे तो देवनागरी में।
- यूज़र दो भाषाएँ मिलाए (जैसे Hinglish), तो आप भी ऐसे ही स्वाभाविक मिश्रण में जवाब दें।
- अगर नया मैसेज सिर्फ़ छोटा फ़ॉलो-अप है (जैसे "और आसान करो", "उदाहरण दो", या ऐप का शॉर्टकट बटन), तो बातचीत की पिछली भाषा ही जारी रखें।
- अगर यूज़र सिर्फ़ फ़ोटो/डॉक्यूमेंट भेजे बिना किसी टेक्स्ट के, तो बातचीत की पिछली भाषा में समझाएँ; पिछली बात न हो तो ऐप की चुनी हुई भाषा में।
- टेक्निकल शब्द, नाम, नंबर और रोज़मर्रा के English शब्द ज़बरदस्ती अनुवाद मत करें — बस जवाब की भाषा वही रखें जो ऊपर तय हुई।
- Follow-up chips भी उसी भाषा और लिपि में बनाएँ जिसमें जवाब दिया।`;

const BASE_SYSTEM_INSTRUCTION = `आप "AI दोस्त" हैं — एक बहुत प्यारा, गर्मजोशी भरा, समझदार और सब कुछ एक जैसा AI साथी।
आपका तौर-तरीका सरल, गर्म और अपनेपन वाला है, जैसे कोई सच्चा और समझदार दोस्त बात कर रहा हो।

${LANGUAGE_RULE}

Aapke 4 MAIN KAAM hain, aur user ke message ko dekh kar aapko khud samajhna hai ki abhi kya chahiye:

1. समझाना (Educational / सीखना):
- अगर यूज़र कोई topic, शब्द, concept, बिल (बिजली, पानी, क्रेडिट कार्ड), नोटिस (बैंक, कोर्ट, सरकार), डॉक्टर की प्रिस्क्रिप्शन, contract या डॉक्यूमेंट (टेक्स्ट या फ़ोटो) समझना हो, तो उसे बिल्कुल आसान, रोज़मर्रा की सरल भाषा में समझाएँ।
- मुश्किल technical/official jargon को आसान उदाहरणों के साथ साफ़ करें।
- अगर फ़ोटो/इमेज आई हो, तो उसमें लिखे मुख्य बिंदु पढ़कर एक-एक करके सीधी भाषा में समझाएँ।

2. हौसला / भावनात्मक सहारा (दिल की बात):
- अगर यूज़र अपना मूड, परेशानी, तन्हाई, तनाव या भावनाएँ बाँटे, तो एक सच्चे दोस्त की तरह सुनें।
- कभी जज मत करें। उन्हें समझ, अपनेपन और सकारात्मक सहारा दें।
- ज़रूरत हो तो हल्का हौसला और प्यारी तस्वीरी दें।

3. सलाह / जवाब के सुझाव (Salah aur Messages):
- अगर यूज़र को कोई confusion, decision या awkward situation बताए (जैसे किसी को क्या जवाब दें, WhatsApp/Email क्या भेजें, क्या करना है):
- हमेशा 2-3 साफ़ और व्यावहारिक विकल्प दें (जैसे: विकल्प 1: नरम और प्यारा, विकल्प 2: सीधा और साफ़, विकल्प 3: हल्का-फुल्का/मज़ेदार)।
- फ़ॉर्मेट साफ़ रखें ताकि वो सीधे copy-paste कर सके या खुद फ़ैसला कर सके।

4. मस्ती और मज़ाक (Fun aur Entertainment):
- अगर यूज़र सिर्फ़ टाइम-पैस, मज़ाक, शायरी, पहेली या छोटी चटपटी कहानी चाहता हो, तो रोचक और मज़ेदार तरीके से उनका मन भटकाएँ।

ज़रूरी नियम:
- हमेशा मित्रवत और सम्मानजनक tone रखें, कभी rude, robotic या boring न लगें।
- जवाब ज़्यादा लंबा मत करो — सीधा, साफ़, तयशीदा और काम का जवाब दो बिना किसी फालतू देर के।
- अगर यूज़र की बात में कोई ambiguity हो या जानकारी कम हो, तो एक छोटा सा प्यारा सवाल पूछ लो।
- कभी भी नकली या ग़लत जानकारी मत दो — पक्का न हो तो सीधा और विनम्रता से बता दो।
- हर यूज़र को ऐसे ट्रीट करें जैसे वो आपका कोई ख़ास दोस्त हो — चाहे छात्र हो, गृहिणी हो, कामकाजी हो या बुज़ुर्ग हो।
- जवाब का अंत स्वाभाविक रखें; अलग से "follow-up options" की लिस्ट खुद मत लिखो — ऐप वह अलग दिखाता है।`;

function detectCategory(message?: string, image?: any): 'explain' | 'emotional' | 'advice' | 'fun' | 'general' {
  const lowerMessage = (message || '').toLowerCase();
  if (
    image ||
    lowerMessage.includes('samjhao') ||
    lowerMessage.includes('explain') ||
    lowerMessage.includes('kya hota hai') ||
    lowerMessage.includes('bill') ||
    lowerMessage.includes('notice') ||
    lowerMessage.includes('meaning') ||
    lowerMessage.includes('matlab') ||
    lowerMessage.includes('समझाओ') ||
    lowerMessage.includes('समझाना') ||
    lowerMessage.includes('समझाएँ') ||
    lowerMessage.includes('क्या होता है') ||
    lowerMessage.includes('मतलब') ||
    lowerMessage.includes('बिल') ||
    lowerMessage.includes('नोटिस') ||
    lowerMessage.includes('परिभाषा')
  ) {
    return 'explain';
  } else if (
    lowerMessage.includes('sad') ||
    lowerMessage.includes('low') ||
    lowerMessage.includes('mood') ||
    lowerMessage.includes('tension') ||
    lowerMessage.includes('stress') ||
    lowerMessage.includes('tired') ||
    lowerMessage.includes('feel') ||
    lowerMessage.includes('rona') ||
    lowerMessage.includes('dil') ||
    lowerMessage.includes('pareshan') ||
    lowerMessage.includes('दुखी') ||
    lowerMessage.includes('उदास') ||
    lowerMessage.includes('तनाव') ||
    lowerMessage.includes('थका') ||
    lowerMessage.includes('थकान') ||
    lowerMessage.includes('मन खराब') ||
    lowerMessage.includes('परेशान') ||
    lowerMessage.includes('रोना') ||
    lowerMessage.includes('दिल') ||
    lowerMessage.includes('अकेला')
  ) {
    return 'emotional';
  } else if (
    lowerMessage.includes('reply') ||
    lowerMessage.includes('kya bolu') ||
    lowerMessage.includes('kya karu') ||
    lowerMessage.includes('option') ||
    lowerMessage.includes('advice') ||
    lowerMessage.includes('salah') ||
    lowerMessage.includes('message') ||
    lowerMessage.includes('decision') ||
    lowerMessage.includes('जवाब') ||
    lowerMessage.includes('क्या बोलूं') ||
    lowerMessage.includes('क्या करूं') ||
    lowerMessage.includes('विकल्प') ||
    lowerMessage.includes('सलाह') ||
    lowerMessage.includes('संदेश') ||
    lowerMessage.includes('फ़ैसला') ||
    lowerMessage.includes('सुझाव')
  ) {
    return 'advice';
  } else if (
    lowerMessage.includes('joke') ||
    lowerMessage.includes('masti') ||
    lowerMessage.includes('shayari') ||
    lowerMessage.includes('mazaak') ||
    lowerMessage.includes('paheli') ||
    lowerMessage.includes('kahani') ||
    lowerMessage.includes('boring') ||
    lowerMessage.includes('जोक') ||
    lowerMessage.includes('मस्ती') ||
    lowerMessage.includes('शायरी') ||
    lowerMessage.includes('मज़ाक') ||
    lowerMessage.includes('पहेली') ||
    lowerMessage.includes('कहानी')
  ) {
    return 'fun';
  }
  return 'general';
}

function getFollowUps(category: 'explain' | 'emotional' | 'advice' | 'fun' | 'general'): string[] {
  if (category === 'explain') {
    return ['और आसान भाषा में समझाओ', 'इसका एक असली उदाहरण दो', 'अगला कदम क्या होना चाहिए?'];
  } else if (category === 'emotional') {
    return ['एक प्यारी सी सकारात्मक बात सुनाओ', 'मन शांत करने का कोई तेज़ उपाय?', 'शुक्रिया दोस्त, थोड़ा बेहतर लग रहा है ❤️'];
  } else if (category === 'advice') {
    return ['विकल्प 1 को और सहज बनाओ', 'अगर सामने वाले का जवाब नकारात्मक आए तो?', 'एक छोटा WhatsApp वर्शन दे दो'];
  } else if (category === 'fun') {
    return ['एक और मज़ेदार जोक सुनाओ 😂', 'एक नई पहेली पूछो', 'कोई दोस्ती वाली शायरी सुनाओ'];
  }
  return ['कुछ मज़ेदार बताओ', 'मेरा कोई topic समझाओगे?', 'आज का एक सकारात्मक विचार दो'];
}

const FOLLOWUP_MARKER = '<<<FOLLOWUPS>>>';
// Tolerant match so `<<< followups >>>` or a different case still gets stripped
const FOLLOWUP_MARKER_RE = /<<<\s*followups\s*>>>/i;
// Anything longer than this after the marker means the marker was not the last line
const MAX_CHIP_TAIL_LENGTH = 300;

// Languages the UI can be switched to (see src/i18n/languages.ts)
const APP_LANGUAGE_NAMES: Record<string, { native: string; english: string }> = {
  hi: { native: 'हिंदी', english: 'Hindi' },
  en: { native: 'English', english: 'English' },
  bn: { native: 'বাংলা', english: 'Bengali' },
  ta: { native: 'தமிழ்', english: 'Tamil' },
  te: { native: 'తెలుగు', english: 'Telugu' },
  mr: { native: 'मराठी', english: 'Marathi' },
  gu: { native: 'ગુજરાતી', english: 'Gujarati' },
  pa: { native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  ur: { native: 'اردو', english: 'Urdu' },
  ar: { native: 'العربية', english: 'Arabic' },
  es: { native: 'Español', english: 'Spanish' },
  fr: { native: 'Français', english: 'French' },
  zh: { native: '中文', english: 'Chinese' },
};

function appLanguageInstruction(locale?: string): string {
  if (!locale || !APP_LANGUAGE_NAMES[locale]) return '';
  const lang = APP_LANGUAGE_NAMES[locale];
  return `
ऐप की भाषा: ${lang.native} / ${lang.english} (कोड: ${locale})। यह भाषा यूज़र ने ऐप के भाषा-चयन (language picker) से चुनी है, इसलिए आपके सभी जवाब, फ़ॉलो-अप chips और अंदाज़ — सब कुछ इसी भाषा और इसी लिपि में होने चाहिए।
- सिर्फ़ तब किसी दूसरी भाषा में जाएँ जब यूज़र खुद उस भाषा में लिखे (जैसे English, বাংলা, தமிழ்) या साफ़ कहे कि उसे दूसरी भाषा में जवाब चाहिए।
- बातचीत पहले किसी और भाषा (जैसे हिंदी) में हुई हो, तब भी नया जवाब इसी चुनी हुई भाषा में दें।
- Write your replies, suggestions and follow-up chips in ${lang.english} unless the user clearly writes in another language.`;
}


const FOLLOW_UP_CHIP_INSTRUCTION = `
फ़ॉलो-अप चिप्स (ऐप के टैप-योग्य सुझाव):
- जवाब के बिल्कुल अंत में, एक नई लाइन पर ठीक यह फ़ॉर्मेट लिखें (और उस लाइन के बाद कुछ नहीं):
${FOLLOWUP_MARKER} सुझाव 1 || सुझाव 2 || सुझाव 3
- ठीक 3 सुझाव, हर एक 3-8 शब्दों का, यूज़र की ही भाषा और लिपि में, और ऐसा हो कि यूज़र टैप करके अगला सवाल बना सके।
- यह मार्कर लाइन सिर्फ़ तब लिखें जब सुझाव सार्थक हों; वरना छोड़ दें। मार्कर के अलावा कोई अतिरिक्त नोट/लेबल मत लिखें।`;

export function buildSystemInstruction(personaTone?: string, mode?: string, locale?: string): string {
  let personaAddition = '';
  if (personaTone === 'desi_yaar') {
    personaAddition = `\nPersona Flavor: देसी यार / ज़िगरी दोस्त। Tone high-energy, cheerful, भाषा रोज़मर्रा की, भरपूर मस्ती और भाई-भाई वाली दोस्ती वाला हो।`;
  } else if (personaTone === 'bada_bhai_didi') {
    personaAddition = `\nPersona Flavor: बड़ा भाई / दीदी। Tone gentle, protective, wise, mature और गहरा हौसला देने वाला हो।`;
  } else if (personaTone === 'career_pro') {
    personaAddition = `\nPersona Flavor: स्मार्ट सलाहकार / कोच। Tone structured, crisp, solution-oriented, पर गर्मजोशी भरा भी।`;
  }

  let modeInstruction = '';
  if (mode === 'explain') {
    modeInstruction = `\nFocus Mode: समझाना। Concept/document/bill को simple bullet points, रोज़मर्रा के उदाहरणों और काम के निष्कर्षों में तोड़कर समझाओ।`;
  } else if (mode === 'emotional') {
    modeInstruction = `\nFocus Mode: हौसला और भावनात्मक सहारा। गहराई से सुनें, सच्ची समझ दें, भावनाओं को वैध मानें और ऊपर उठाने वाले शब्द दें।`;
  } else if (mode === 'advice') {
    modeInstruction = `\nFocus Mode: सलाह और जवाब के विकल्प। 2-3 तयशीदा, इस्तेमाल-के-लिए-तैयार संदेश विकल्प या कदम-दर-कदम व्यावहारिक चुनाव दें।`;
  } else if (mode === 'fun') {
    modeInstruction = `\nFocus Mode: मस्ती और मज़ाक। हास्य, देसी वज़, शायरी, पहेली या मनोरंजक बातचीत से मन खुश करें।`;
  }

  // The language instruction goes LAST so it wins over the older "reply in the user's
  // language" rule when the user has picked a language in the app.
  return `${BASE_SYSTEM_INSTRUCTION}${personaAddition}${modeInstruction}${FOLLOW_UP_CHIP_INSTRUCTION}${appLanguageInstruction(locale)}`;
}

const MISSING_KEY_MESSAGE = `⚠️ **AI की API Key सेट नहीं है**

AI Dost को जवाब देने के लिए एक **मुफ़्त** API key चाहिए।

**मुफ़्त Groq key लेने के आसान तरीके:**
1. [console.groq.com/keys](https://console.groq.com/keys) खोलिए और लॉगिन कीजिए।
2. **Create API Key** पर क्लिक करके key कॉपी कीजिए।
3. Project folder में \`.env\` file खोलिए और लिखिए: \`GROQ_API_KEY=aapki_key\`
4. Server को बंद करके दोबारा \`npm run dev\` चलाइए।

_(OpenRouter key भी चलेगी: \`OPENROUTER_API_KEY=...\` — [openrouter.ai/keys](https://openrouter.ai/keys) | Gemini key: [aistudio.google.com/apikey](https://aistudio.google.com/apikey))_`;

// Vercel/env values sometimes arrive with stray whitespace or newlines (e.g. the same
// key pasted more than once). HTTP headers reject newlines, so keep only the first token.
function getEnvKey(name: string): string {
  return (process.env[name] || '').trim().split(/\s+/)[0] || '';
}

function isRealKey(key?: string): boolean {
  return Boolean(key && key.trim() && !key.startsWith('MY_'));
}

function hasGroqKey(): boolean {
  return isRealKey(getEnvKey('GROQ_API_KEY'));
}

function hasOpenRouterKey(): boolean {
  return isRealKey(getEnvKey('OPENROUTER_API_KEY'));
}

function hasGeminiKey(): boolean {
  return isRealKey(getEnvKey('GEMINI_API_KEY'));
}

function hasApiKey(): boolean {
  return hasGroqKey() || hasOpenRouterKey() || hasGeminiKey();
}

// Format errors into friendly, instructive messages
function formatErrorMessage(error: any): string {
  const errMsg = String(error?.message || error || '');
  if (!hasApiKey()) {
    return MISSING_KEY_MESSAGE;
  }
  if (error?.provider === 'groq') {
    if (error.status === 401) {
      return `⚠️ **Groq API Key ग़लत है**\n\n\`.env\` file में जो \`GROQ_API_KEY\` लिखा है वो सही नहीं है। [console.groq.com/keys](https://console.groq.com/keys) से नई मुफ़्त key बनाकर \`.env\` में डालिए और server restart कीजिए।`;
    }
    if (error.status === 429) {
      return `⚠️ **फ़्री लिमिट ख़तम**\n\nGroq की मुफ़्त लिमिट अभी पूरी हो गई है। कृपया थोड़ी देर बाद दोबारा कोशिश कीजिए।`;
    }
  }
  if (error?.provider === 'openrouter') {
    if (error.status === 401) {
      return `⚠️ **OpenRouter API Key ग़लत है**\n\n\`.env\` file में जो \`OPENROUTER_API_KEY\` लिखा है वो सही नहीं है। [openrouter.ai/keys](https://openrouter.ai/keys) से नई मुफ़्त key बनाकर \`.env\` में डालिए और server restart कीजिए।`;
    }
    if (errMsg.includes('data policy') || errMsg.includes('privacy')) {
      return `⚠️ **OpenRouter सेटिंग बदलनी होगी**\n\nमुफ़्त models के लिए [openrouter.ai/settings/privacy](https://openrouter.ai/settings/privacy) पर जाकर free model वाली सेटिंग **ON** कीजिए, फिर दोबारा कोशिश कीजिए।`;
    }
    if (error.status === 429) {
      return `⚠️ **फ़्री लिमिट ख़तम**\n\nOpenRouter की मुफ़्त लिमिट (हर मिनट/दिन की) अभी पूरी हो गई है। कृपया थोड़ी देर बाद दोबारा कोशिश कीजिए।`;
    }
  }
  if (errMsg.includes('API key not valid') || errMsg.includes('API_KEY_INVALID') || errMsg.includes('UNAUTHENTICATED')) {
    return `⚠️ **Gemini API Key ग़लत है**\n\n\`.env\` file में जो \`GEMINI_API_KEY\` लिखा है वो सही नहीं है। [aistudio.google.com/apikey](https://aistudio.google.com/apikey) से नई मुफ़्त key बनाकर \`.env\` में डालिए और server restart कीजिए।`;
  }
  if (errMsg.includes('denied access') || errMsg.includes('PERMISSION_DENIED') || error?.status === 403 || error?.code === 403) {
    return `⚠️ **Gemini API Key अपडेट करना ज़रूरी है**\n\nGoogle ने आपके Gemini project को access देने से मना कर दिया है (\`PERMISSION_DENIED\`).\n\n**इसे ठीक करने के आसान तरीके:**\n1. [openrouter.ai/keys](https://openrouter.ai/keys) से मुफ़्त key बनाकर \`.env\` में \`OPENROUTER_API_KEY=...\` लिखिए, **या**\n2. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) पर **नया project** बनाकर Gemini key लीजिए।\n3. Server restart करते ही आपका **AI दोस्त** फिर से जवाब देने लगेगा!`;
  }
  if (errMsg.includes('quota') || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
    return `⚠️ **API कोटा लिमिट ख़तम**\n\nमुफ़्त कोटा अभी ख़तम हो गया है। कृपया 1-2 मिनट बाद दोबारा कोशिश कीजिए।`;
  }
  return `दोस्त, server से जुड़ने में थोड़ी तकलीफ़ हुई: ${errMsg || 'कनेक्शन समस्या'}। कृपया एक बार दोबारा कोशिश कीजिए।`;
}

function withPreferred(preferred: string | undefined, defaults: string[]): string[] {
  const p = preferred?.trim();
  return p ? [p, ...defaults.filter((m) => m !== p)] : defaults;
}

// Groq models, tried in order. gpt-oss models are text-only, so image requests go to qwen first.
function getGroqModels(hasImage: boolean): string[] {
  const vision = 'qwen/qwen3.8-27b';
  const text = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
  return withPreferred(process.env.GROQ_MODEL, hasImage ? [vision, ...text] : [...text, vision]);
}

// Free OpenRouter models, tried in order. `openrouter/free` auto-picks any currently free model.
function getOpenRouterModels(): string[] {
  return withPreferred(process.env.OPENROUTER_MODEL, [
    'openrouter/free',
    'google/gemma-4-31b-it:free',
    'qwen/qwen3.8-27b:free',
  ]);
}

// Free-tier Gemini models (gemini-2.x is no longer available to new API keys)
function getGeminiModels(): string[] {
  return withPreferred(process.env.GEMINI_MODEL, [
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
  ]);
}

// Errors that no other model of the same provider can fix (bad/blocked key)
function isProviderFatal(error: any): boolean {
  const errMsg = String(error?.message || error || '');
  if (error?.provider === 'openrouter' || error?.provider === 'groq') return error.status === 401 || error.status === 402;
  return (
    errMsg.includes('API key not valid') ||
    errMsg.includes('API_KEY_INVALID') ||
    errMsg.includes('PERMISSION_DENIED') ||
    errMsg.includes('UNAUTHENTICATED') ||
    error?.status === 401 ||
    error?.status === 403
  );
}

// Gemini-style `contents` -> OpenAI-style chat messages (used by OpenRouter)
function toOpenAIMessages(contents: any[], systemInstruction: string): any[] {
  const messages: any[] = [{ role: 'system', content: systemInstruction }];
  for (const c of contents) {
    const role = c.role === 'model' ? 'assistant' : 'user';
    const hasImage = c.parts.some((p: any) => p.inlineData);
    if (!hasImage) {
      messages.push({ role, content: c.parts.map((p: any) => p.text || '').join('\n') });
    } else {
      messages.push({
        role,
        content: c.parts.map((p: any) =>
          p.inlineData
            ? { type: 'image_url', image_url: { url: `data:${p.inlineData.mimeType};base64,${p.inlineData.data}` } }
            : { type: 'text', text: p.text || '' }
        ),
      });
    }
  }
  return messages;
}

type OpenAICompatibleProvider = 'groq' | 'openrouter';

const PROVIDER_NAMES: Record<OpenAICompatibleProvider, string> = { groq: 'Groq', openrouter: 'OpenRouter' };

function providerRequest(provider: OpenAICompatibleProvider): { url: string; headers: Record<string, string> } {
  if (provider === 'groq') {
    return {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: { Authorization: `Bearer ${getEnvKey('GROQ_API_KEY')}`, 'Content-Type': 'application/json' },
    };
  }
  return {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    headers: {
      Authorization: `Bearer ${getEnvKey('OPENROUTER_API_KEY')}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': isRealKey(process.env.APP_URL) ? process.env.APP_URL! : 'http://localhost',
      'X-Title': 'AI Dost',
    },
  };
}

// Groq and OpenRouter both speak the OpenAI chat-completions streaming format
async function streamOpenAICompatible(
  provider: OpenAICompatibleProvider,
  model: string,
  contents: any[],
  systemInstruction: string,
  onText: (t: string) => void
) {
  const { url, headers } = providerRequest(provider);
  const name = PROVIDER_NAMES[provider];
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages: toOpenAIMessages(contents, systemInstruction),
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    const raw = await response.text().catch(() => '');
    let msg = raw;
    try {
      msg = JSON.parse(raw)?.error?.message || raw;
    } catch {}
    const err: any = new Error(`${name} ${response.status}: ${msg || response.statusText}`);
    err.status = response.status;
    err.provider = provider;
    throw err;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue; // skips ": OPENROUTER PROCESSING" keep-alives
      const payload = trimmed.slice(5).trim();
      if (payload === '[DONE]') return;
      let json: any;
      try {
        json = JSON.parse(payload);
      } catch {
        continue;
      }
      if (json.error) {
        const err: any = new Error(`${name}: ${json.error.message || 'stream error'}`);
        err.status = json.error.code;
        err.provider = provider;
        throw err;
      }
      const text = json.choices?.[0]?.delta?.content;
      if (text) onText(text);
    }
  }
}

async function streamGemini(ai: GoogleGenAI, model: string, contents: any[], systemInstruction: string, onText: (t: string) => void) {
  const responseStream = await ai.models.generateContentStream({
    model,
    contents,
    config: { systemInstruction, temperature: 0.7 },
  });
  for await (const chunk of responseStream) {
    if (chunk.text) onText(chunk.text);
  }
}

type Attempt = {
  provider: OpenAICompatibleProvider | 'gemini';
  model: string;
  run: (onText: (t: string) => void) => Promise<void>;
};

// Groq first, then OpenRouter and Gemini as backups (each only if its key is set)
function getAttempts(ai: GoogleGenAI, contents: any[], systemInstruction: string): Attempt[] {
  const attempts: Attempt[] = [];
  if (hasGroqKey()) {
    const hasImage = contents.some((c) => c.parts.some((p: any) => p.inlineData));
    for (const model of getGroqModels(hasImage)) {
      attempts.push({ provider: 'groq', model, run: (onText) => streamOpenAICompatible('groq', model, contents, systemInstruction, onText) });
    }
  }
  if (hasOpenRouterKey()) {
    for (const model of getOpenRouterModels()) {
      attempts.push({ provider: 'openrouter', model, run: (onText) => streamOpenAICompatible('openrouter', model, contents, systemInstruction, onText) });
    }
  }
  if (hasGeminiKey()) {
    for (const model of getGeminiModels()) {
      attempts.push({ provider: 'gemini', model, run: (onText) => streamGemini(ai, model, contents, systemInstruction, onText) });
    }
  }
  return attempts;
}

// Runs attempts in order until one produces text. Only falls back while nothing has been
// emitted, so the user never sees duplicated partial text.
async function runWithFallback(
  ai: GoogleGenAI,
  contents: any[],
  systemInstruction: string,
  onText: (t: string) => void,
  isCancelled: () => boolean = () => false
): Promise<{ isError: boolean; errorText?: string; interrupted?: boolean }> {
  if (!hasApiKey()) return { isError: true, errorText: MISSING_KEY_MESSAGE };

  let lastError: any = null;
  let firstFatalError: any = null; // a bad key on the main provider is the most useful thing to report
  const blockedProviders = new Set<string>();
  for (const attempt of getAttempts(ai, contents, systemInstruction)) {
    if (blockedProviders.has(attempt.provider)) continue;
    let wroteAnything = false;
    try {
      await attempt.run((text) => {
        if (isCancelled()) return;
        wroteAnything = true;
        onText(text);
      });
      if (wroteAnything || isCancelled()) return { isError: false };
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI Dost] ${attempt.provider}/${attempt.model} failed:`, err?.message || err);
      if (wroteAnything) return { isError: false, interrupted: true };
      if (isProviderFatal(err)) {
        blockedProviders.add(attempt.provider);
        firstFatalError ??= err;
      }
    }
  }
  return { isError: true, errorText: formatErrorMessage(firstFatalError ?? lastError) };
}

// Turns the raw `<<<FOLLOWUPS>>> a || b || c` tail into clean chip labels
export function parseFollowUps(raw: string): string[] {
  const chips = raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[*_`#>~]/g, '')
    .split(/\|\||\n|•|·/)
    .map((s) => s.replace(/^\s*(?:[-–—]|\d+[.)])\s*/, '').replace(/["'“”‘’]/g, '').trim())
    .filter((s) => s.length > 1 && s.length <= 90);
  return Array.from(new Set(chips)).slice(0, 3);
}

// Streams answer text live while holding back the trailing marker + chip line,
// so the user never sees raw `<<<FOLLOWUPS>>>` in the chat bubble.
export class FollowUpStreamFilter {
  private pending = '';
  private chips = '';
  private markerFound = false;

  feed(text: string): string {
    if (this.markerFound) {
      this.chips += text;
      return '';
    }
    this.pending += text;
    const markerMatch = FOLLOWUP_MARKER_RE.exec(this.pending);
    if (markerMatch) {
      this.markerFound = true;
      this.chips = this.pending.slice(markerMatch.index + markerMatch[0].length);
      const visible = this.pending.slice(0, markerMatch.index);
      this.pending = '';
      return visible;
    }
    // Only hold back a tail that could still grow into the marker
    const hold = this.holdBackLength();
    if (!hold) {
      const visible = this.pending;
      this.pending = '';
      return visible;
    }
    const visible = this.pending.slice(0, -hold);
    this.pending = this.pending.slice(-hold);
    return visible;
  }

  finish(): string {
    if (this.markerFound) return '';
    const rest = this.pending;
    this.pending = '';
    return rest;
  }

  followUps(): string[] {
    return this.markerFound ? parseFollowUps(this.chips) : [];
  }

  // Everything that came after the marker (used to recover content if the model
  // put the marker in the middle of its answer instead of at the end)
  rawTail(): string {
    return this.chips;
  }

  private holdBackLength(): number {
    // Keep a possible marker start (e.g. "<<<FOLLOWUPS ") in the buffer until we know it
    // is not one, so a spaced/lowercase variant is still recognised.
    const p = this.pending;
    let runStart = p.length;
    while (runStart > 0 && p[runStart - 1] === '<') runStart--;
    const trailing = p.slice(runStart);
    // A marker can be split across chunks ("<<", "<", "<<<FOLL")
    if (trailing === '<' || trailing === '<<') return trailing.length;
    const partial = /<<<[\sA-Za-z0-9_>]*$/.exec(p);
    if (partial && partial[0].length <= 32) return partial[0].length;
    return 0;
  }
}

// Non-streaming equivalent of FollowUpStreamFilter
export function splitFollowUps(raw: string): { text: string; followUps: string[] } {
  const markerMatch = FOLLOWUP_MARKER_RE.exec(raw);
  if (!markerMatch) return { text: raw.trim(), followUps: [] };
  const tail = raw.slice(markerMatch.index + markerMatch[0].length);
  // A very long tail means the marker was not at the end — keep the full text
  if (tail.length > MAX_CHIP_TAIL_LENGTH) return { text: raw.trim(), followUps: [] };
  return {
    text: raw.slice(0, markerMatch.index).trim(),
    followUps: parseFollowUps(tail),
  };
}

async function streamWithFallback(
  ai: GoogleGenAI,
  contents: any[],
  systemInstruction: string,
  res: Response,
  transform: (text: string) => string = (text) => text
): Promise<{ isError: boolean }> {
  const result = await runWithFallback(
    ai,
    contents,
    systemInstruction,
    (text) => {
      const visible = transform(text);
      if (visible) res.write(`data: ${JSON.stringify({ chunk: visible })}\n\n`);
    },
    () => res.destroyed
  );
  if (result.interrupted) {
    res.write(`data: ${JSON.stringify({ chunk: '\n\n_(जवाब बीच में रुक गया, कृपया दोबारा पूछिए।)_' })}\n\n`);
  }
  if (result.errorText) {
    res.write(`data: ${JSON.stringify({ chunk: result.errorText })}\n\n`);
  }
  return { isError: result.isError };
}

async function generateWithFallback(ai: GoogleGenAI, contents: any[] | string, systemInstruction: string): Promise<{ text: string; isError: boolean }> {
  const normalized = typeof contents === 'string' ? [{ role: 'user', parts: [{ text: contents }] }] : contents;
  let text = '';
  const result = await runWithFallback(ai, normalized, systemInstruction, (t) => {
    text += t;
  });
  return result.isError ? { text: result.errorText || '', isError: true } : { text, isError: false };
}


const IMAGE_ONLY_PROMPT =
  'इस फ़ोटो/डॉक्यूमेंट को ध्यान से देखिए और आसान भाषा में समझाइए कि इसमें क्या लिखा है और मेरे लिए क्या ज़रूरी है।';

// Turn the client's previous messages + the new message into Gemini `contents`
function buildContents(history: any, message?: string, image?: any): any[] {
  const contents: any[] = [];
  const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
  for (const item of recentHistory) {
    if (!item || item.isError) continue;
    if (item.role === 'user') {
      const parts: any[] = [];
      if (item.image?.data && item.image?.mimeType) {
        parts.push({ inlineData: { data: item.image.data, mimeType: item.image.mimeType } });
      }
      parts.push({ text: item.text || IMAGE_ONLY_PROMPT });
      contents.push({ role: 'user', parts });
    } else if (item.role === 'assistant' && item.text) {
      contents.push({ role: 'model', parts: [{ text: item.text }] });
    }
  }
  // Conversation must start with a user turn
  while (contents.length && contents[0].role !== 'user') contents.shift();

  const currentParts: any[] = [];
  if (image?.data && image?.mimeType) {
    currentParts.push({ inlineData: { data: image.data, mimeType: image.mimeType } });
  }
  currentParts.push({ text: message || IMAGE_ONLY_PROMPT });
  contents.push({ role: 'user', parts: currentParts });
  return contents;
}

function resolveCategory(mode: string | undefined, message?: string, image?: any) {
  if (mode === 'explain' || mode === 'emotional' || mode === 'advice' || mode === 'fun') return mode;
  return detectCategory(message, image);
}

// API routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: hasApiKey(),
    time: new Date().toISOString(),
  });
});

// Fast SSE Streaming Chat endpoint (words appear as they are generated)
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto', locale } = req.body || {};

  if (!message && !image) {
    return res.status(400).json({ error: 'संदेश या फ़ोटो दीजिए।' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  try {
    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode, locale);
    const contents = buildContents(history, message, image);
    const followUpFilter = new FollowUpStreamFilter();

    const streamResult = await streamWithFallback(ai, contents, systemInstruction, res, (text) => followUpFilter.feed(text));
    const leftover = followUpFilter.finish();
    if (leftover) {
      res.write(`data: ${JSON.stringify({ chunk: leftover })}\n\n`);
    }

    const detectedCategory = resolveCategory(mode, message, image);
    const rawTail = followUpFilter.rawTail();
    const markerWasMidAnswer = rawTail.length > MAX_CHIP_TAIL_LENGTH;
    if (markerWasMidAnswer && rawTail.trim()) {
      res.write(`data: ${JSON.stringify({ chunk: '\n\n' + rawTail.trim() })}\n\n`);
    }
    const modelFollowUps = markerWasMidAnswer ? [] : followUpFilter.followUps();
    const followUps = streamResult.isError
      ? ['दोबारा कोशिश करें']
      : modelFollowUps.length
        ? modelFollowUps
        : getFollowUps(detectedCategory);

    res.write(`data: ${JSON.stringify({ done: true, isError: streamResult.isError, category: detectedCategory, suggestedFollowUps: followUps })}\n\n`);
    res.end();
  } catch (error: any) {
    console.error('Streaming Chat API Error:', error);
    res.write(`data: ${JSON.stringify({ chunk: formatErrorMessage(error) })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true, isError: true, category: 'general', suggestedFollowUps: ['दोबारा कोशिश करें'] })}\n\n`);
    res.end();
  }
});

// Standard non-streaming chat endpoint (client falls back to this if streaming fails)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto', locale } = req.body || {};

    if (!message && !image) {
      return res.status(400).json({ error: 'संदेश या फ़ोटो दीजिए।' });
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode, locale);
    const contents = buildContents(history, message, image);

    const { text: rawText, isError } = await generateWithFallback(ai, contents, systemInstruction);
    const { text, followUps: modelFollowUps } = splitFollowUps(rawText);
    const detectedCategory = resolveCategory(mode, message, image);

    res.json({
      text: text || 'दोस्त, जवाब तैयार है!',
      category: detectedCategory,
      suggestedFollowUps: isError
        ? ['दोबारा कोशिश करें']
        : modelFollowUps.length
          ? modelFollowUps
          : getFollowUps(detectedCategory),
      isError,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: formatErrorMessage(error) });
  }
});

// Quick booster generator
app.post('/api/quick-action', async (req: Request, res: Response) => {
  try {
    const { actionType } = req.body || {};
    const ai = getGeminiClient();

    let prompt = '';
    if (actionType === 'joke') {
      prompt = 'दोस्त, मुझे एक बिल्कुल ताज़ा, परिवार-फ्रेंडली, दिल को छूने वाला और मज़ेदार देसी जोक सुनाइए जो सुनकर दिल खुश हो जाए!';
    } else if (actionType === 'shayari') {
      prompt = 'दोस्त, ज़िंदगी, दोस्ती या हौसले पर 2-4 पंक्तियों की खूबसूरत, गहरी और सकारात्मक शायरी सुनाइए।';
    } else if (actionType === 'daily_thought') {
      prompt = 'आज के दिन के लिए एक प्यारा, ऊर्जावान और प्रेरणादायक "दोस्त का संदेश / रोज़ का हौसला" दीजिए (2-3 पंक्तियाँ) गर्मजोशी के साथ।';
    } else if (actionType === 'paheli') {
      prompt = 'एक मज़ेदार देसी पहेली (riddle) पूछिए। पहेली और उसका संकेत दीजिए, और जवाब सबसे नीचे "जवाब:" के साथ दीजिए।';
    } else {
      prompt = 'एक मित्रवत दोस्त की तरह 2 पंक्तियों में पूछिए कि आज मैं किस चीज़ में मदद कर सकता हूँ।';
    }

    const { text, isError } = await generateWithFallback(ai, prompt, BASE_SYSTEM_INSTRUCTION);
    res.json({ text, isError });
  } catch (error: any) {
    console.error('Quick action error:', error);
    res.status(500).json({ error: formatErrorMessage(error) });
  }
});

// Unknown API routes return JSON instead of the SPA page
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: 'यह API route नहीं मिला।' });
});

async function startServer() {
  // `npm start` runs the bundled dist/server.cjs, so treat that as production too
  const isProduction = process.env.NODE_ENV === 'production' || /\.cjs$/.test(process.argv[1] || '');

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0');
  server.on('error', (err: any) => {
    if (err?.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} pehle se kisi aur app ke paas hai. Dusra port use karein, jaise .env mein PORT=3001 likhein.`);
      process.exit(1);
    }
    throw err;
  });
  server.on('listening', () => {
    console.log(`AI Dost server running on http://localhost:${PORT}`);
    if (!hasApiKey()) {
      console.warn('API key set nahi hai. Free key: https://openrouter.ai/keys  ->  phir .env file mein OPENROUTER_API_KEY=... likhein');
    }
  });
}

// On Vercel the app runs as a serverless function (api/index.ts), so don't start a listener
if (!process.env.VERCEL) {
  startServer();
}

export default app;
