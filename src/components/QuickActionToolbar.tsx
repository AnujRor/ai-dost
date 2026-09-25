import React from 'react';
import { Laugh, HeartHandshake, Sun, Puzzle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickActionToolbarProps {
  onTriggerQuickAction: (actionType: 'joke' | 'shayari' | 'daily_thought' | 'paheli') => void;
  isLoading: boolean;
}

export const QuickActionToolbar: React.FC<QuickActionToolbarProps> = ({
  onTriggerQuickAction,
  isLoading,
}) => {
  const actions = [
    {
      id: 'joke',
      label: 'Desi Joke',
      icon: Laugh,
      emoji: '😂',
      color: 'bg-white/40 hover:bg-white/70 text-amber-950 border-white/50 backdrop-blur-xs',
      action: 'joke' as const,
      confetti: true,
    },
    {
      id: 'shayari',
      label: 'Khoobsurat Shayari',
      icon: HeartHandshake,
      emoji: '✍️',
      color: 'bg-white/40 hover:bg-white/70 text-rose-950 border-white/50 backdrop-blur-xs',
      action: 'shayari' as const,
      confetti: false,
    },
    {
      id: 'thought',
      label: 'Daily Motivation',
      icon: Sun,
      emoji: '🌞',
      color: 'bg-white/40 hover:bg-white/70 text-orange-950 border-white/50 backdrop-blur-xs',
      action: 'daily_thought' as const,
      confetti: true,
    },
    {
      id: 'paheli',
      label: 'Ek Paheli Poochho',
      icon: Puzzle,
      emoji: '🧩',
      color: 'bg-white/40 hover:bg-white/70 text-purple-950 border-white/50 backdrop-blur-xs',
      action: 'paheli' as const,
      confetti: false,
    },
  ];

  const handleClick = (actionType: 'joke' | 'shayari' | 'daily_thought' | 'paheli', shouldConfetti: boolean) => {
    if (isLoading) return;
    if (shouldConfetti) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
      });
    }
    onTriggerQuickAction(actionType);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
      <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider pl-1 shrink-0 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-orange-500" />
        <span>Boosters:</span>
      </span>
      {actions.map((act) => {
        return (
          <button
            key={act.id}
            id={`btn-booster-${act.id}`}
            onClick={() => handleClick(act.action, act.confetti)}
            disabled={isLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all active:scale-95 shrink-0 shadow-2xs ${act.color} ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span>{act.emoji}</span>
            <span>{act.label}</span>
          </button>
        );
      })}
    </div>
  );
};
