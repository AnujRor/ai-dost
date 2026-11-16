import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translate, TranslateFn, TranslationKey } from './index';
import { DEFAULT_LOCALE, getLanguage, isSupportedLocale } from './languages';

const STORAGE_KEY = 'mera_ai_dost_language';

interface LanguageContextValue {
  locale: string;
  setLocale: (code: string) => void;
  t: TranslateFn;
  dir: 'ltr' | 'rtl';
  /** BCP-47 tag, handy for `toLocaleTimeString` and speech synthesis */
  htmlLang: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const HTML_LANG: Record<string, string> = {
  hi: 'hi-IN',
  en: 'en-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  ur: 'ur-PK',
  ar: 'ar-SA',
  es: 'es-ES',
  fr: 'fr-FR',
  zh: 'zh-CN',
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isSupportedLocale(saved)) return saved;
    } catch (e) {}
    return DEFAULT_LOCALE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {}
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const meta = getLanguage(locale);
    return {
      locale,
      setLocale: (code: string) => setLocaleState(isSupportedLocale(code) ? code : DEFAULT_LOCALE),
      t: (key: TranslationKey, vars) => translate(locale, key, vars),
      dir: meta.dir,
      htmlLang: HTML_LANG[locale] || locale,
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};
