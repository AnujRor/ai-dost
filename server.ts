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
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables.');
    }
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

const BASE_SYSTEM_INSTRUCTION = `Aap "AI Dost" ho — ek bahut friendly, warm, samajhdar aur all-in-one AI companion.
Aapka style simple, warm aur apnepan wala hai, jaise koi saccha aur samajhdar dost baat kar raha ho.
Aap Hindi-English mix (Hinglish) mein baat karte ho jaisa user karta hai, ya jis bhasha (Hindi, English, Hinglish) mein user baat kare usi mein reply karte ho.

Aapke 4 MAIN KAAM hain, aur user ke message ko dekh kar aapko khud samajhna hai ki abhi kya chahiye:

1. EXPLAIN KARNA (Educational / Samjhana):
- Agar user koi topic, word, concept, bill (bijli, paani, credit card), notice (bank, court, government), doctor ki prescription, contract ya document (text ya photo) samajhna chahta hai, to use bilkul simple, roz-marra ki aasan bhasha mein samjhao.
- Mushkil technical/official jargon ko aasan examples ke saath clear karo.
- Agar photo/image aayi ho, to usme likhe important points padhkar point-by-point seedhi bhasha mein samjhao.

2. MOTIVATION / EMOTIONAL SUPPORT (Dil Ki Baat):
- Agar user apna mood, problem, loneliness, stress ya feelings share kare, to ek sachche dost ki tarah suno.
- Kabhi judge mat karo. Unhe empathy, apnapan aur positive support do.
- Zaroorat ho to halka hosla aur pyara encouragement do.

3. ADVICE / REPLY SUGGESTIONS (Salah aur Messages):
- Agar user koi confusion, decision, ya awkward situation bataye (jaise kisi ko kya reply karein, WhatsApp/Email message kya bhejein, kya karna chahiye):
- Unhe hamesha 2-3 clear aur practical options do (jaise: Option 1: Polite & Sweet, Option 2: Direct & Clear, Option 3: Chill/Fun).
- Format clean rakho taaki wo seedha copy-paste kar sakein ya khud decide kar sakein.

4. FUN / ENTERTAINMENT (Masti aur Mazaak):
- Agar user sirf time-pass, mazaak, shayari, paheli (riddle), ya chhoti chatpati kahani chahta hai, to creative aur mazedaar tarike se unka mann behlao.

IMPORTANT RULES:
- Hamesha friendly aur respectful tone rakho, kabhi bhi rude, robotic ya boring mat lagna.
- Jawab zyada lamba mat karo — seedha, saaf, formatted aur kaam ka jawab do bina kisi faltu intzaar ke.
- Agar user ki baat mein koi ambiguity ho ya details missing hon, to ek chhota sa pyara sawaal pooch lo.
- Kabhi bhi fake ya galat jaankari mat do — agar confirm na ho to seedha aur vinamrata se bata do.
- Har user ko treat karo jaise wo aapka koi khaas dost ho — chahe wo student ho, housewife ho, working professional ho, ya bujurg ho.
- End mein 2-3 helpful follow-up options ya agla step naturally suggest karo jab relevant ho.`;

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
    lowerMessage.includes('matlab')
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
    lowerMessage.includes('pareshan')
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
    lowerMessage.includes('decision')
  ) {
    return 'advice';
  } else if (
    lowerMessage.includes('joke') ||
    lowerMessage.includes('masti') ||
    lowerMessage.includes('shayari') ||
    lowerMessage.includes('mazaak') ||
    lowerMessage.includes('paheli') ||
    lowerMessage.includes('kahani') ||
    lowerMessage.includes('boring')
  ) {
    return 'fun';
  }
  return 'general';
}

function getFollowUps(category: 'explain' | 'emotional' | 'advice' | 'fun' | 'general'): string[] {
  if (category === 'explain') {
    return ['Thoda aur aasan bhasha mein samjhao', 'Iska ek real-life example do', 'Ab agla step kya hona chahiye?'];
  } else if (category === 'emotional') {
    return ['Ek pyari si positive baat sunao', 'Man ko shaant karne ka koi quick tip?', 'Shukriya dost, thoda better lag raha hai ❤️'];
  } else if (category === 'advice') {
    return ['Option 1 ko thoda aur casual banao', 'Agar samne wale ka reply negative aaye to?', 'Ek short WhatsApp version de do'];
  } else if (category === 'fun') {
    return ['Ek aur mazedaar joke sunao 😂', 'Ek nayi paheli poochho', 'Koi dosti wali shayari sunao'];
  }
  return ['Kuch mazedaar batao', 'Mera ek topic explain karoge?', 'Aaj ka ek positive thought do'];
}

function buildSystemInstruction(personaTone?: string, mode?: string): string {
  let personaAddition = '';
  if (personaTone === 'desi_yaar') {
    personaAddition = `\nPersona Flavor: Desi Yaar / Jigri Dost. Tone should be high-energy, cheerful, colloquial, full of warmth, masti, and brotherly camaraderie.`;
  } else if (personaTone === 'bada_bhai_didi') {
    personaAddition = `\nPersona Flavor: Bada Bhai / Didi. Tone should be gentle, protective, wise, mature, and deeply encouraging.`;
  } else if (personaTone === 'career_pro') {
    personaAddition = `\nPersona Flavor: Smart Advisor / Career Coach. Tone should be structured, crisp, solution-oriented, yet warm and accessible.`;
  }

  let modeInstruction = '';
  if (mode === 'explain') {
    modeInstruction = `\nFocus Mode: EXPLAIN. Focus on breaking down the concept/document/bill into simple bullet points, everyday analogies, and actionable takeaways.`;
  } else if (mode === 'emotional') {
    modeInstruction = `\nFocus Mode: MOTIVATION & EMOTIONAL SUPPORT. Focus on deep listening, genuine empathy, validating their feelings, and giving comforting, uplifting words.`;
  } else if (mode === 'advice') {
    modeInstruction = `\nFocus Mode: ADVICE & REPLY OPTIONS. Provide 2-3 structured ready-to-use message options or step-by-step practical choices.`;
  } else if (mode === 'fun') {
    modeInstruction = `\nFocus Mode: FUN & ENTERTAINMENT. Make the user smile with humor, desi wit, shayari, riddles, or entertaining banter.`;
  }

  return `${BASE_SYSTEM_INSTRUCTION}${personaAddition}${modeInstruction}`;
}

const MISSING_KEY_MESSAGE = `⚠️ **Gemini API Key set nahi hai**

AI Dost ko jawab dene ke liye ek **free** Gemini API key chahiye.

**Free key lene ke aasan steps:**
1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) kholein aur apne Google account se login karein.
2. **Create API key** par click karke key copy karein.
3. Project folder mein \`.env\` file kholein aur likhein: \`GEMINI_API_KEY=aapki_key\`
4. Server ko band karke dobara \`npm run dev\` chalayein.`;

function hasApiKey(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim() && key !== 'MY_GEMINI_API_KEY');
}

// Format errors into friendly, instructive messages
function formatErrorMessage(error: any): string {
  const errMsg = String(error?.message || error || '');
  if (!hasApiKey()) {
    return MISSING_KEY_MESSAGE;
  }
  if (errMsg.includes('API key not valid') || errMsg.includes('API_KEY_INVALID')) {
    return `⚠️ **Gemini API Key galat hai**\n\n\`.env\` file mein jo \`GEMINI_API_KEY\` hai wo valid nahi hai. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) se nayi free key banakar \`.env\` mein daalein aur server restart karein.`;
  }
  if (errMsg.includes('denied access') || errMsg.includes('PERMISSION_DENIED') || error?.status === 403 || error?.code === 403) {
    return `⚠️ **Gemini API Key Update Required**\n\nAapke current Gemini API Key ke project ko Google dwara access deny kiya gaya hai (\`PERMISSION_DENIED\`).\n\n**Isse theek karne ke aasan steps:**\n1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) se ek nayi free key banayein.\n2. \`.env\` file mein \`GEMINI_API_KEY\` update karein (AI Studio mein: **Settings > Secrets**).\n3. Server restart karte hi aapka **AI Dost** normal reply dena shuru kar dega!`;
  }
  if (errMsg.includes('quota') || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
    return `⚠️ **API Quota Limit Reach**\n\nGoogle Gemini API ka free quota abhi khatam ho gaya hai. Kripya 1-2 minute baad dobara try karein.`;
  }
  return `Dost, server se connect karne mein thodi takneeki dikkat aayi hai: ${errMsg || 'Connection issue'}. Kripya ek baar dobara koshish karein.`;
}

// Free-tier models, tried in order. GEMINI_MODEL (optional) is tried first.
function getModelCandidates(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  // gemini-2.x models are no longer available to new API keys
  const defaults = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  return preferred ? [preferred, ...defaults.filter((m) => m !== preferred)] : defaults;
}

// Errors that switching to another model can't fix — stop retrying
function isFatalError(error: any): boolean {
  const errMsg = String(error?.message || error || '');
  return (
    errMsg.includes('API key not valid') ||
    errMsg.includes('API_KEY_INVALID') ||
    errMsg.includes('PERMISSION_DENIED') ||
    error?.status === 403
  );
}

// Streaming with auto-fallback across models. Only falls back while nothing has been sent,
// so the user never sees duplicated partial text.
async function streamWithFallback(ai: GoogleGenAI, contents: any[], systemInstruction: string, res: Response): Promise<{ isError: boolean }> {
  if (!hasApiKey()) {
    res.write(`data: ${JSON.stringify({ chunk: MISSING_KEY_MESSAGE })}\n\n`);
    return { isError: true };
  }

  let lastError: any = null;
  for (const model of getModelCandidates()) {
    let wroteAnything = false;
    try {
      const responseStream = await ai.models.generateContentStream({
        model,
        contents,
        config: { systemInstruction, temperature: 0.7 },
      });

      for await (const chunk of responseStream) {
        if (res.destroyed) return { isError: false };
        if (chunk.text) {
          wroteAnything = true;
          res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
        }
      }
      if (wroteAnything) return { isError: false };
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI Dost] Model ${model} failed:`, err?.message || err);
      if (wroteAnything) {
        res.write(`data: ${JSON.stringify({ chunk: '\n\n_(Jawab beech mein ruk gaya, kripya dobara poochhein.)_' })}\n\n`);
        return { isError: false };
      }
      if (isFatalError(err)) break;
    }
  }

  res.write(`data: ${JSON.stringify({ chunk: formatErrorMessage(lastError) })}\n\n`);
  return { isError: true };
}

// Non-streaming generation with the same model fallback
async function generateWithFallback(ai: GoogleGenAI, contents: any[] | string, systemInstruction: string): Promise<{ text: string; isError: boolean }> {
  if (!hasApiKey()) return { text: MISSING_KEY_MESSAGE, isError: true };

  let lastError: any = null;
  for (const model of getModelCandidates()) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction, temperature: 0.7 },
      });
      if (response.text) return { text: response.text, isError: false };
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI Dost] Model ${model} failed:`, err?.message || err);
      if (isFatalError(err)) break;
    }
  }
  return { text: formatErrorMessage(lastError), isError: true };
}

const IMAGE_ONLY_PROMPT =
  'Kripya is photo/document ko dhyan se dekho aur aasan Hinglish bhasha mein samjhao ki isme kya likha hai aur mere liye kya important hai.';

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
  const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto' } = req.body || {};

  if (!message && !image) {
    return res.status(400).json({ error: 'Message ya image provide karein.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  try {
    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode);
    const contents = buildContents(history, message, image);

    const streamResult = await streamWithFallback(ai, contents, systemInstruction, res);

    const detectedCategory = resolveCategory(mode, message, image);
    const followUps = streamResult.isError ? ['Dobara try karein'] : getFollowUps(detectedCategory);

    res.write(`data: ${JSON.stringify({ done: true, isError: streamResult.isError, category: detectedCategory, suggestedFollowUps: followUps })}\n\n`);
    res.end();
  } catch (error: any) {
    console.error('Streaming Chat API Error:', error);
    res.write(`data: ${JSON.stringify({ chunk: formatErrorMessage(error) })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true, isError: true, category: 'general', suggestedFollowUps: ['Dobara try karein'] })}\n\n`);
    res.end();
  }
});

// Standard non-streaming chat endpoint (client falls back to this if streaming fails)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto' } = req.body || {};

    if (!message && !image) {
      return res.status(400).json({ error: 'Message ya image provide karein.' });
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode);
    const contents = buildContents(history, message, image);

    const { text, isError } = await generateWithFallback(ai, contents, systemInstruction);
    const detectedCategory = resolveCategory(mode, message, image);

    res.json({
      text: text || 'Dost, jawab taiyaar ho gaya!',
      category: detectedCategory,
      suggestedFollowUps: isError ? ['Dobara try karein'] : getFollowUps(detectedCategory),
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
      prompt = 'Mujhe ek ekdum fresh, family-friendly, relatable aur mazedaar desi joke sunao Hinglish mein jo sunkar dil khush ho jaye!';
    } else if (actionType === 'shayari') {
      prompt = 'Dosti, hosla ya zindagi par 2-4 lines ki khoobsurat, deep aur positive shayari sunao Hinglish mein.';
    } else if (actionType === 'daily_thought') {
      prompt = 'Aaj ke din ke liye ek pyara, energetic aur inspiring "Dost Ka Sandesh / Daily Motivation" do (2-3 lines) with warm vibes.';
    } else if (actionType === 'paheli') {
      prompt = 'Ek mazedaar desi paheli (riddle) poochho. Paheli aur uska hint do, aur answer sabse neeche "Jawab:" ke saath do.';
    } else {
      prompt = 'Ek friendly dost ki tarah 2 lines mein poochho ki aaj main kis cheez mein madad karoon.';
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
  res.status(404).json({ error: 'API route nahi mila.' });
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
      console.warn('GEMINI_API_KEY set nahi hai. Free key yahan se lein: https://aistudio.google.com/apikey  ->  phir .env file mein GEMINI_API_KEY=... likhein');
    }
  });
}

startServer();
