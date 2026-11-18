import React, { createContext, useContext, useMemo } from 'react';
import { translate, TranslateFn, TranslationKey } from './index';

interface LanguageContextValue {
  /** The UI is English-only; this stays constant. */
  locale: 'en';
  t: TranslateFn;
  dir: 'ltr';
  /** BCP-47 tag for timestamps and other locale-aware formatting. */
  htmlLang: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const UI_LOCALE = 'en';
const UI_HTML_LANG = 'en-IN';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo<LanguageContextValue>(
    () => ({
      locale: UI_LOCALE,
      t: (key: TranslationKey, vars) => translate(key, vars),
      dir: 'ltr',
      htmlLang: UI_HTML_LANG,
    }),
    []
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};
