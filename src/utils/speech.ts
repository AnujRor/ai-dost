// Speech synthesis and recognition utilities for Mera AI Dost

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

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void,
    lang?: string
  ) {
    if (!this.synth) {
      onError?.(new Error('इस ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।'));
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

    // Prefer a voice that matches the app language, fall back to Hindi/Indian English
    const voices = this.synth.getVoices();
    const prefix = (lang || 'hi').split('-')[0].toLowerCase();
    const matchingVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    const hindiVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      voices.find((v) => v.lang.toLowerCase() === 'en-in' || v.lang.toLowerCase() === 'en_in') ||
      voices.find((v) => /india|hindi/i.test(v.name));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    } else if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.lang = matchingVoice ? matchingVoice.lang : lang || 'hi-IN';

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
  // Recognise in the app language (Hindi by default)
  recognition.lang = lang || 'hi-IN';

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
