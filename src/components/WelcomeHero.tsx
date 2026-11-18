import React, { useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PersonaProfile, DostCategory } from '../types';
import { getQuickPrompts } from '../data/dostPresets';
import { useLanguage } from '../i18n/LanguageContext';

interface WelcomeHeroProps {
  currentPersona: PersonaProfile;
  onSelectPrompt: (prompt: string, category?: DostCategory) => void;
  onOpenDocModal: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  currentPersona,
  onSelectPrompt,
}) => {
  const { t } = useLanguage();
  const quickPrompts = useMemo(() => getQuickPrompts(t), [t]);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 p-6 sm:p-8 text-center shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-orange-950 text-xs font-bold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>{t('welcome.badge')}</span>
        </div>

        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-orange-400 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-orange-300/50 border-2 border-white mb-3.5">
          {currentPersona.avatarEmoji}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
          {t('welcome.greeting')} <span className="text-orange-600">{t('welcome.brand')}</span>
        </h2>
      </div>

      {/* Suggested Starter Prompts Grid */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider px-1">
          {t('welcome.popular')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quickPrompts.map((item) => (
            <button
              key={item.id}
              id={`btn-prompt-${item.id}`}
              onClick={() => onSelectPrompt(item.prompt, item.category)}
              className="p-3 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-sm border border-white/50 hover:border-white/80 text-left transition-all active:scale-98 shadow-2xs hover:shadow-sm group flex items-start gap-3"
            >
              <span className="text-2xl mt-0.5 shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 group-hover:text-orange-950 truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-gray-600 font-medium truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
