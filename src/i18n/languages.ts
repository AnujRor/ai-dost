// The languages the app can switch to. `code` matches the files in ./locales
export interface LanguageMeta {
  code: string;
  native: string; // name in the language itself
  english: string; // name in English (for the tooltip)
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'hi', native: 'हिंदी', english: 'Hindi', dir: 'ltr' },
  { code: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', dir: 'ltr' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', dir: 'ltr' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', dir: 'ltr' },
  { code: 'mr', native: 'मराठी', english: 'Marathi', dir: 'ltr' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', dir: 'ltr' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', dir: 'ltr' },
  { code: 'ur', native: 'اردو', english: 'Urdu', dir: 'rtl' },
  { code: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
  { code: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'zh', native: '中文', english: 'Chinese', dir: 'ltr' },
];

export const DEFAULT_LOCALE = 'hi';

export function isSupportedLocale(code: string): boolean {
  return LANGUAGES.some((l) => l.code === code);
}

export function getLanguage(code: string): LanguageMeta {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}
