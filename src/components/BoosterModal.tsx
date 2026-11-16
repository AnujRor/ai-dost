import React from 'react';
import { X, Laugh, Sun, Heart, Sparkles, Puzzle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface BoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAction: (type: 'joke' | 'shayari' | 'daily_thought' | 'paheli') => void;
}

export const BoosterModal: React.FC<BoosterModalProps> = ({
  isOpen,
  onClose,
  onTriggerAction,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const boosters = [
    {
      id: 'joke',
      title: t('booster.joke.title'),
      desc: t('booster.joke.desc'),
      icon: Laugh,
      emoji: '😂',
      color: 'from-amber-500/15 to-orange-500/15 border-amber-300 text-amber-950',
      action: 'joke' as const,
      confetti: true,
    },
    {
      id: 'shayari',
      title: t('booster.shayari.title'),
      desc: t('booster.shayari.desc'),
      icon: Heart,
      emoji: '✍️',
      color: 'from-rose-500/15 to-rose-600/15 border-rose-300 text-rose-950',
      action: 'shayari' as const,
      confetti: false,
    },
    {
      id: 'thought',
      title: t('booster.thought.title'),
      desc: t('booster.thought.desc'),
      icon: Sun,
      emoji: '🌞',
      color: 'from-yellow-500/15 to-amber-500/15 border-yellow-300 text-yellow-950',
      action: 'daily_thought' as const,
      confetti: true,
    },
    {
      id: 'paheli',
      title: t('booster.paheli.title'),
      desc: t('booster.paheli.desc'),
      icon: Puzzle,
      emoji: '🧩',
      color: 'from-purple-500/15 to-purple-600/15 border-purple-300 text-purple-950',
      action: 'paheli' as const,
      confetti: false,
    },
  ];

  const handleSelect = (type: 'joke' | 'shayari' | 'daily_thought' | 'paheli', doConfetti: boolean) => {
    if (doConfetti) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
      });
    }
    onTriggerAction(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <div className="bg-white/85 backdrop-blur-2xl rounded-[32px] max-w-md w-full p-5 sm:p-6 shadow-2xl border border-white/60 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-orange-500/15 text-orange-900">
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">{t('booster.title')}</h3>
              <p className="text-xs text-gray-500">{t('booster.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Booster Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {boosters.map((b) => {
            const Icon = b.icon;
            return (
              <button
                key={b.id}
                onClick={() => handleSelect(b.action, b.confetti)}
                className="p-3.5 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 hover:border-orange-300 hover:bg-white/80 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{b.emoji}</span>
                  <Icon className="w-4 h-4 text-orange-500/80" />
                </div>
                <h4 className="text-xs font-bold text-gray-900">{b.title}</h4>
                <p className="text-[11px] text-gray-600 leading-snug">{b.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-center text-xs text-gray-500">{t('booster.footer')}</div>
      </div>
    </div>
  );
};
