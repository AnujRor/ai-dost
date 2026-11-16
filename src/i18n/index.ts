import hi, { TranslationKey } from './locales/hi';
import en from './locales/en';
import bn from './locales/bn';
import ta from './locales/ta';
import te from './locales/te';
import mr from './locales/mr';
import gu from './locales/gu';
import pa from './locales/pa';
import ur from './locales/ur';
import ar from './locales/ar';
import es from './locales/es';
import fr from './locales/fr';
import zh from './locales/zh';
import { DEFAULT_LOCALE } from './languages';

type Dictionary = Record<TranslationKey, string>;

const dictionaries: Record<string, Dictionary> = {
  hi,
  en,
  bn,
  ta,
  te,
  mr,
  gu,
  pa,
  ur,
  ar,
  es,
  fr,
  zh,
};

export type TranslateVars = Record<string, string | number>;

export type TranslateFn = (key: TranslationKey, vars?: TranslateVars) => string;

/**
 * Looks up a key in the given locale and falls back to English (and then to the
 * key itself) so a missing translation can never blank out the screen.
 */
export function translate(locale: string, key: TranslationKey, vars?: TranslateVars): string {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  let text = dict?.[key] ?? dictionaries.en[key] ?? hi[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** Locale codes that have a full dictionary. */
export const SUPPORTED_LOCALES = Object.keys(dictionaries);

export type { TranslationKey };
export { DEFAULT_LOCALE };
