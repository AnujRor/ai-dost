import React from 'react';
import { Sparkles } from 'lucide-react';
import { PersonaProfile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface WelcomeHeroProps {
  currentPersona: PersonaProfile;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ currentPersona }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 animate-fade-in">
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
    </div>
  );
};
