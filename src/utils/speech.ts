// Speech synthesis and recognition utilities for AI Dost.
//
// The on-screen UI is English-only, but the AI answers in the language the user
// wrote in. The spoken voice therefore follows the *reply text*: we detect the
// script (Devanagari -> Hindi, Bengali -> Bengali, Arabic -> Urdu/Arabic, ...)
// and pick a matching system voice instead of a fixed app language.

interface ScriptLanguage {
  pattern: RegExp;
  lang: string;
}

// Ordered: first match wins.
const SCRIPT_LANGUAGES: ScriptLanguage[] = [
  { pattern: /[\u0900-\u097F]/, lang: 'hi-IN' }, // Devanagari
  { pattern: /[\u0980-\u09FF]/, lang: 'bn-IN' }, // Bengali
  { pattern: /[\u0A00-\u0A7F]/, lang: 'pa-IN' }, // Gurmukhi
  { pattern: /[\u0A80-\u0AFF]/, lang: 'gu-IN' }, // Gujarati
  { pattern: /[\u0B80-\u0BFF]/, lang: 'ta-IN' }, // Tamil
  { pattern: /[\u0C00-\u0C7F]/, lang: 'te-IN' }, // Telugu
  { pattern: /[\u0C80-\u0CFF]/, lang: 'kn-IN' }, // Kannada
  { pattern: /[\u0D00-\u0D7F]/, lang: 'ml-IN' }, // Malayalam
  { pattern: /[\u0E00-\u0E7F]/, lang: 'th-TH' }, // Thai
  { pattern: /[\u3040-\u30FF]/, lang: 'ja-JP' }, // Japanese kana
  { pattern: /[\uAC00-\uD7AF]/, lang: 'ko-KR' }, // Korean Hangul
  { pattern: /[\u4E00-\u9FFF\u3400-\u4DBF]/, lang: 'zh-CN' }, // Han
  { pattern: /[\u0400-\u04FF]/, lang: 'ru-RU' }, // Cyrillic
  { pattern: /[\u0590-\u05FF]/, lang: 'he-IL' }, // Hebrew
];

// Arabic script: Urdu-specific letters help tell Urdu apart from Arabic.
const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const URDU_LETTERS = /[\u0679\u0688\u0691\u06BA\u06BE\u06C1\u06D2\u06C3]/;

// Latin-script languages we are happy to trust from the browser locale.
const LATIN_SCRIPT_LANGUAGES = new Set([
  'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'tr', 'id', 'ms', 'vi', 'tl',
  'fil', 'sv', 'da', 'nb', 'no', 'fi', 'cs', 'sk', 'hu', 'ro', 'hr', 'sl', 'ca',
  'eu', 'gl', 'sq', 'af', 'sw', 'et', 'lv', 'lt',
]);

/**
 * Works out which language a piece of text should be spoken in, based on the
 * script it is written in. Latin-script text falls back to the browser locale
 * (English for most users), which covers English, Hinglish and other
 * Latin-script languages reasonably well.
 */
export function detectSpeechLang(text: string): string {
  const sample = text.slice(0, 4000);

  for (const { pattern, lang } of SCRIPT_LANGUAGES) {
    if (pattern.test(sample)) return lang;
  }

  if (ARABIC_SCRIPT.test(sample)) {
    return URDU_LETTERS.test(sample) ? 'ur-PK' : 'ar-SA';
  }

  const browserLang =
    typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
  const base = browserLang.split('-')[0];
  if (base && LATIN_SCRIPT_LANGUAGES.has(base)) return browserLang;

  return 'en-IN';
}

const normalizeLang = (lang: string) => lang.replace('_', '-').toLowerCase();

// If the system has no voice for a script, these are the least jarring options.
const VOICE_FALLBACKS: Record<string, string[]> = {
  ur: ['ar', 'hi', 'en'],
  ar: ['ur', 'en'],
  bn: ['hi', 'en'],
  pa: ['hi', 'en'],
  gu: ['hi', 'en'],
  ta: ['hi', 'en'],
  te: ['hi', 'en'],
  kn: ['hi', 'en'],
  ml: ['hi', 'en'],
};

function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const target = normalizeLang(lang);
  const base = target.split('-')[0];

  const exact = voices.find((v) => normalizeLang(v.lang) === target);
  if (exact) return exact;

  const sameLanguage = voices.find((v) => normalizeLang(v.lang).split('-')[0] === base);
  if (sameLanguage) return sameLanguage;

  for (const fallback of VOICE_FALLBACKS[base] || ['en']) {
    const voice = voices.find((v) => normalizeLang(v.lang).split('-')[0] === fallback);
    if (voice) return voice;
  }

  return undefined;
}

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Chrome loads voices asynchronously; ask early so they're ready on first speak()
      this.synth.getVoices();
      this.synth.addEventListener?.('voiceschanged', () => this.synth?.getVoices());
    }
  }

  public speak(text: string, onStart?: () => void, onEnd?: () => void, onError?: (err: any) => void) {
    if (!this.synth) {
      onError?.(new Error('Speech synthesis is not available in this browser.'));
      return;
    }

    this.stop();

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/[#*_`~>\[\]\(\)]/g, ' ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Speak in the language the reply is written in, not the (English) UI language
    const lang = detectSpeechLang(cleanText);
    const voice = pickVoice(this.synth.getVoices(), lang);
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : lang;

    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      this.isSpeakingState = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      onError?.(e);
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState && (this.synth?.speaking || false);
  }
}

export const speechManager = new SpeechManager();

// Speech Recognition helper
export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onError?: (err: string) => void,
  onEnd?: () => void,
  lang?: string
) {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  // Dictate in the user's own language: the browser locale is the best guess,
  // because the UI language is always English.
  const browserLang = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-IN';
  recognition.lang = lang || browserLang;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error', event.error);
    onError?.(event.error);
  };

  recognition.onend = () => {
    onEnd?.();
  };

  return recognition;
}
