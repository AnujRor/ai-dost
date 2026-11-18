import { en, TranslationKey } from './locales/en';

export type TranslateVars = Record<string, string | number>;

export type TranslateFn = (key: TranslationKey, vars?: TranslateVars) => string;

/**
 * The app UI ships in English only. `translate` exists as a thin lookup layer so
 * components can keep using `t('some.key')` and stay decoupled from the
 * dictionary's shape.
 */
export function translate(key: TranslationKey, vars?: TranslateVars): string {
  let text: string = en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** The UI locale. Kept as a constant so language-aware helpers have one source. */
export const DEFAULT_LOCALE = 'en';

export type { TranslationKey };
