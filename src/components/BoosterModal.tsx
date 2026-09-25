import React from 'react';
import { X, Laugh, Sun, Heart, Sparkles, Puzzle } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  if (!isOpen) return null;

  const boosters = [
    {
      id: 'joke',
      title: 'Desi Joke & Mazaak',
      desc: 'Fresh, clean aur funny joke sunkar chehre par muskaan layein.',
      icon: Laugh,
      emoji: '😂',
      color: 'from-amber-500/15 to-orange-500/15 border-amber-300 text-amber-950',
      action: 'joke' as const,
      confetti: true,
    },
    {
      id: 'shayari',
      title: 'Khoobsurat Shayari',
      desc: 'Zindagi, dosti ya hosle par dil ko chhu lene wali 2-4 lines.',
      icon: Heart,
      emoji: '✍️',
      color: 'from-rose-500/15 to-rose-600/15 border-rose-300 text-rose-950',
      action: 'shayari' as const,
      confetti: false,
    },
    {
      id: 'thought',
      title: 'Dost Ka Daily Sandesh',
      desc: 'Positive vibes aur energy ke saath din shuru karne ke liye.',
      icon: Sun,
      emoji: '🌞',
      color: 'from-yellow-500/15 to-amber-500/15 border-yellow-300 text-yellow-950',
      action: 'daily_thought' as const,
      confetti: true,
    },
    {
      id: 'paheli',
      title: 'Dimagi Paheli (Riddle)',
      desc: 'Ek chatpati paheli jisme dimag ki thodi kasrat ho!',
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
              <h3 className="text-base font-bold text-gray-800">Instant Mood Booster</h3>
              <p className="text-xs text-gray-500">1-Tap mein apne dost se suniye</p>
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

        <div className="pt-2 text-center text-xs text-gray-500">
          Aapka dost aapka din khushnuma banane ke liye hamesha taiyaar hai!
        </div>
      </div>
    </div>
  );
};
