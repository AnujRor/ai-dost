import React from 'react';
import { 
  BookOpen, 
  Heart, 
  Lightbulb, 
  Laugh, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { PersonaProfile, DostCategory } from '../types';
import { QUICK_PROMPTS } from '../data/dostPresets';

interface WelcomeHeroProps {
  currentPersona: PersonaProfile;
  onSelectPrompt: (prompt: string, category?: DostCategory) => void;
  onOpenDocModal: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  currentPersona,
  onSelectPrompt,
  onOpenDocModal,
}) => {
  const pillars = [
    {
      id: 'explain',
      category: 'explain' as DostCategory,
      title: '1. EXPLAIN KARNA',
      sub: 'Educational & Documents',
      desc: 'Bills, complex topics, government notices, prescriptions ya confusing text ko aasan bhasha mein samjho.',
      icon: BookOpen,
      emoji: '📚',
      color: 'from-blue-500/10 to-blue-600/10 border-blue-200/80 hover:border-blue-400 text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-800',
      sample: 'Bijli ka bill aur subsidy explain karo',
    },
    {
      id: 'emotional',
      category: 'emotional' as DostCategory,
      title: '2. DIL KI BAAT',
      sub: 'Motivation & Support',
      desc: 'Mood low ho, stress ho ya baat karni ho — bina judge kiye ek sachche dost ki tarah sunega aur hosla dega.',
      icon: Heart,
      emoji: '❤️',
      color: 'from-rose-500/10 to-rose-600/10 border-rose-200/80 hover:border-rose-400 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-800',
      sample: 'Aaj thoda tired aur stressed hoon, baat karo',
    },
    {
      id: 'advice',
      category: 'advice' as DostCategory,
      title: '3. SALAH & REPLIES',
      sub: 'Decisions & Messages',
      desc: 'WhatsApp pe kya reply karein, boss se leave kaise maangein ya kya faisla lein — 2-3 ready options payein.',
      icon: Lightbulb,
      emoji: '💡',
      color: 'from-amber-500/10 to-amber-600/10 border-amber-200/80 hover:border-amber-400 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-800',
      sample: 'Boss ko leave mangne ke 3 ready messages do',
    },
    {
      id: 'fun',
      category: 'fun' as DostCategory,
      title: '4. MASTI & FUN',
      sub: 'Jokes, Shayari & Stories',
      desc: 'Mazedaar desi jokes, relatable shayaris, paheliyan ya chatpati kahaniyon se din ka mood banayein.',
      icon: Laugh,
      emoji: '😄',
      color: 'from-purple-500/10 to-purple-600/10 border-purple-200/80 hover:border-purple-400 text-purple-950',
      badgeColor: 'bg-purple-100 text-purple-800',
      sample: 'Ek mast fresh desi joke sunao',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 p-6 sm:p-8 text-center shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-orange-950 text-xs font-bold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Aapka Har Mod Par Saath Nibhane Wala Dost</span>
        </div>

        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-orange-400 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-orange-300/50 border-2 border-white mb-3.5">
          {currentPersona.avatarEmoji}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
          Namaste! Main hoon <span className="text-orange-600">Mera AI Dost</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-700 font-medium max-w-xl mx-auto mt-2 leading-relaxed">
          Chahe koi topic samajhna ho, dil halka karna ho, WhatsApp reply ki salah chahiye ho, ya bas thodi masti karni ho — main hamesha aapke saath hoon.
        </p>

        {/* Mini Trust Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-semibold text-gray-700">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-xs border border-white/60 shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-orange-500" />
            <span>Hinglish, Hindi aur English</span>
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-xs border border-white/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Judgement & Full Privacy</span>
          </span>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>Mere 4 Main Kaam</span>
          </h3>
          <span className="text-xs text-gray-600 font-medium">Kisi par bhi tap karein</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                id={`card-pillar-${p.id}`}
                onClick={() => onSelectPrompt(p.sample, p.category)}
                className="p-4 rounded-2xl bg-white/40 hover:bg-white/65 backdrop-blur-md border border-white/50 hover:border-white/80 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/60 border border-white/60 text-gray-700 backdrop-blur-xs">
                      {p.sub}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-orange-950 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/40 flex items-center justify-between text-xs font-semibold text-orange-900 group-hover:text-orange-950">
                  <span className="truncate max-w-[200px] text-[11px] font-normal text-gray-600 italic">
                    "{p.sample}"
                  </span>
                  <span className="flex items-center gap-1 text-xs shrink-0 ml-1 font-bold text-orange-600">
                    Try <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Starter Prompts Grid */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider px-1">
          Popular Questions & Topics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {QUICK_PROMPTS.map((item) => (
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
