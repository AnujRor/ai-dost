import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

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

// Format errors into friendly, instructive messages
function formatErrorMessage(error: any): string {
  const errMsg = String(error?.message || error || '');
  if (errMsg.includes('denied access') || errMsg.includes('PERMISSION_DENIED') || error?.status === 403 || error?.code === 403) {
    return `⚠️ **Google AI Studio API Key Update Required**\n\nAapke current Gemini API Key ke project ko Google dwara access deny kiya gaya hai (\`PERMISSION_DENIED - Your project has been denied access\`).\n\n**Isse theek karne ke aasan steps:**\n1. AI Studio ke top-right **Settings > Secrets** par click karein.\n2. Wahan ek naya aur active **GEMINI_API_KEY** daalein ya select karein (aap [aistudio.google.com](https://aistudio.google.com) se naya key create kar sakte hain).\n3. Naya key save hote hi aapka **AI Dost** turant normal reply dena shuru kar dega!`;
  }
  if (errMsg.includes('quota') || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
    return `⚠️ **API Quota Limit Reach**\n\nGoogle Gemini API ka temporary quota limit reach ho gaya hai. Kripya thodi der baad dobara try karein ya **Settings > Secrets** se naya API key jodein.`;
  }
  return `Dost, server se connect karne mein thodi takneeki dikkat aayi hai: ${errMsg || 'Connection issue'}. Kripya ek baar dobara koshish karein.`;
}

// Helper function for ultra-fast streaming with auto-fallback to guarantee zero errors
async function streamWithFallback(ai: any, contents: any[], systemInstruction: string, res: Response): Promise<{ success: boolean; isError?: boolean }> {
  let lastError: any = null;

  // Attempt 1: gemini-3.8-flash with ThinkingLevel.LOW (Recommended for low latency)
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
      }
    }
    return { success: true };
  } catch (err1: any) {
    lastError = err1;
  }

  // Attempt 2: gemini-3.8-flash with standard config
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
      }
    }
    return { success: true };
  } catch (err2: any) {
    lastError = err2;
  }

  // Attempt 3: gemini-flash-latest fallback
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-flash-latest',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
      }
    }
    return { success: true };
  } catch (err3: any) {
    lastError = err3;
  }

  // If all attempts failed, gracefully write the helpful friendly error explanation into the stream
  const helpfulMessage = formatErrorMessage(lastError);
  res.write(`data: ${JSON.stringify({ chunk: helpfulMessage })}\n\n`);
  return { success: false, isError: true };
}

// Helper function for ultra-fast non-streaming generation with fallback
async function generateWithFallback(ai: any, contents: any[] | string, systemInstruction: string): Promise<string> {
  let lastError: any = null;

  // Attempt 1: gemini-3.8-flash with ThinkingLevel.LOW
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });
    if (response.text) return response.text;
  } catch (err1: any) {
    lastError = err1;
  }

  // Attempt 2: gemini-3.8-flash standard
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    if (response.text) return response.text;
  } catch (err2: any) {
    lastError = err2;
  }

  // Attempt 3: gemini-flash-latest
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    if (response.text) return response.text;
  } catch (err3: any) {
    lastError = err3;
  }

  // Return clean, user-friendly markdown explanation
  return formatErrorMessage(lastError);
}

// API routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Fast SSE Streaming Chat endpoint (Ultra-low latency, words appear instantaneously)
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  try {
    const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto' } = req.body;

    if (!message && !image) {
      return res.status(400).json({ error: 'Message ya image provide karein.' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode);

    const contents: any[] = [];
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    for (const item of recentHistory) {
      if (item.role === 'user') {
        const parts: any[] = [{ text: item.text || '' }];
        if (item.image?.data && item.image?.mimeType) {
          parts.push({
            inlineData: {
              data: item.image.data,
              mimeType: item.image.mimeType,
            },
          });
        }
        contents.push({ role: 'user', parts });
      } else if (item.role === 'assistant') {
        contents.push({
          role: 'model',
          parts: [{ text: item.text || '' }],
        });
      }
    }

    const currentParts: any[] = [];
    if (image?.data && image?.mimeType) {
      currentParts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType,
        },
      });
    }
    if (message) {
      currentParts.push({ text: message });
    } else if (image) {
      currentParts.push({ text: 'Kripya is photo/document ko dhyan se dekho aur aasan Hinglish bhasha mein samjhao ki isme kya likha hai aur mere liye kya important hai.' });
    }

    contents.push({ role: 'user', parts: currentParts });

    const streamResult = await streamWithFallback(ai, contents, systemInstruction, res);

    const detectedCategory = detectCategory(message, image);
    const followUps = streamResult.isError
      ? ['Settings > Secrets check karein', 'Dobara try karein']
      : getFollowUps(detectedCategory);

    res.write(`data: ${JSON.stringify({ done: true, isError: Boolean(streamResult.isError), category: detectedCategory, suggestedFollowUps: followUps })}\n\n`);
    res.end();
  } catch (error: any) {
    console.error('Streaming Chat API Error:', error);
    const friendlyError = formatErrorMessage(error);
    res.write(`data: ${JSON.stringify({ chunk: friendlyError })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true, isError: true, category: 'general', suggestedFollowUps: ['Settings > Secrets check karein'] })}\n\n`);
    res.end();
  }
});

// Standard non-streaming chat endpoint (Fast with multi-tier fallback)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], image, personaTone = 'samajhdar_dost', mode = 'auto' } = req.body;

    if (!message && !image) {
      return res.status(400).json({ error: 'Message ya image provide karein.' });
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(personaTone, mode);

    const contents: any[] = [];
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    for (const item of recentHistory) {
      if (item.role === 'user') {
        const parts: any[] = [{ text: item.text || '' }];
        if (item.image?.data && item.image?.mimeType) {
          parts.push({
            inlineData: {
              data: item.image.data,
              mimeType: item.image.mimeType,
            },
          });
        }
        contents.push({ role: 'user', parts });
      } else if (item.role === 'assistant') {
        contents.push({
          role: 'model',
          parts: [{ text: item.text || '' }],
        });
      }
    }

    const currentParts: any[] = [];
    if (image?.data && image?.mimeType) {
      currentParts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType,
        },
      });
    }
    if (message) {
      currentParts.push({ text: message });
    } else if (image) {
      currentParts.push({ text: 'Kripya is photo/document ko dhyan se dekho aur aasan Hinglish bhasha mein samjhao ki isme kya likha hai aur mere liye kya important hai.' });
    }

    contents.push({ role: 'user', parts: currentParts });

    const replyText = await generateWithFallback(ai, contents, systemInstruction);
    const finalText = replyText || 'Dost, jawab taiyaar ho gaya!';
    const isError = finalText.includes('Google AI Studio API Key Update Required') || finalText.includes('API Quota Limit Reach');
    const detectedCategory = detectCategory(message, image);
    const followUps = isError
      ? ['Settings > Secrets check karein', 'Dobara try karein']
      : getFollowUps(detectedCategory);

    res.json({
      text: finalText,
      category: detectedCategory,
      suggestedFollowUps: followUps,
      isError,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: formatErrorMessage(error),
    });
  }
});

// Quick booster generator (Ultra fast with multi-tier fallback)
app.post('/api/quick-action', async (req: Request, res: Response) => {
  try {
    const { actionType } = req.body;
    const ai = getGeminiClient();

    let prompt = '';
    if (actionType === 'joke') {
      prompt = 'Mujhe ek ekdum fresh, family-friendly, relatable aur mazedaar desi joke sunao Hinglish mein jo sunkar dil khush ho jaye!';
    } else if (actionType === 'shayari') {
      prompt = 'Dosti, hosla ya zindagi par 2-4 lines ki khoobsurat, deep aur positive shayari sunao Hinglish mein.';
    } else if (actionType === 'daily_thought') {
      prompt = 'Aaj ke din ke liye ek pyara, energetic aur inspiring "Dost Ka Sandesh / Daily Motivation" do (2-3 lines) with warm vibes.';
    } else if (actionType === 'paheli') {
      prompt = 'Ek mazedaar desi paheli (riddle) poochho jiska jawab agle message mein pooch sako. Paheli aur uska hint do, par answer spoiler mein chhipa kar do.';
    } else {
      prompt = 'Ek friendly dost ki tarah 2 lines mein poochho ki aaj main kis cheez mein madad karoon.';
    }

    const replyText = await generateWithFallback(ai, prompt, BASE_SYSTEM_INSTRUCTION);

    res.json({
      text: replyText || '',
    });
  } catch (error: any) {
    console.error('Quick action error:', error);
    res.status(500).json({ error: error.message || 'Error executing quick action' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Dost server running on http://localhost:${PORT}`);
  });
}

startServer();
