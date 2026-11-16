import React, { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/languages';

export const LanguagePicker: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close the dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        id="btn-language-picker"
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-white/40 hover:bg-white/70 text-gray-700 hover:text-gray-900 border border-white/50 backdrop-blur-sm transition-all active:scale-95 shadow-2xs"
        title={t('lang.title')}
        aria-label={t('lang.aria')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5 text-orange-500" />
        <span className="max-w-[80px] sm:max-w-none truncate">{current.native}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-60 max-h-[65vh] overflow-y-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl z-50 p-1.5"
        >
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {t('lang.label')}
          </div>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                l.code === locale
                  ? 'bg-orange-500/15 text-orange-950 font-bold'
                  : 'text-gray-700 hover:bg-white/80'
              }`}
            >
              <span className="truncate flex-1">{l.native}</span>
              <span className="text-[10px] text-gray-400">{l.english}</span>
              {l.code === locale && <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />}
            </button>
          ))}
          <div className="px-3 py-2 text-[10px] text-gray-500 border-t border-white/60 mt-1 leading-snug">
            {t('lang.hint')}
          </div>
        </div>
      )}
    </div>
  );
};
