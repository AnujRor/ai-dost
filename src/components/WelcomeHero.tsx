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
      title: '1. समझाना',
      sub: 'सीखना और डॉक्यूमेंट',
      desc: 'बिल, मुश्किल विषय, सरकारी नोटिस, प्रिस्क्रिप्शन या उलझा टेक्स्ट — सब कुछ आसान भाषा में समझाएँ।',
      icon: BookOpen,
      emoji: '📚',
      color: 'from-blue-500/10 to-blue-600/10 border-blue-200/80 hover:border-blue-400 text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-800',
      sample: 'बिजली का बिल और सब्सिडी समझाओ',
    },
    {
      id: 'emotional',
      category: 'emotional' as DostCategory,
      title: '2. दिल की बात',
      sub: 'हौसला और सहारा',
      desc: 'मन खराब हो, तनाव हो या बस बात करनी हो — बिना जजमेंट किए एक सच्चे दोस्त की तरह सुनेगा और हौसला देगा।',
      icon: Heart,
      emoji: '❤️',
      color: 'from-rose-500/10 to-rose-600/10 border-rose-200/80 hover:border-rose-400 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-800',
      sample: 'आज थोड़ा थका हुआ और तनाव में हूँ, बात करो',
    },
    {
      id: 'advice',
      category: 'advice' as DostCategory,
      title: '3. सलाह और जवाब',
      sub: 'फ़ैसले और संदेश',
      desc: 'WhatsApp पर क्या जवाब दें, बॉस से छुट्टी कैसे माँगें या क्या फ़ैसला लें — 2-3 तैयार विकल्प मिलेंगे।',
      icon: Lightbulb,
      emoji: '💡',
      color: 'from-amber-500/10 to-amber-600/10 border-amber-200/80 hover:border-amber-400 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-800',
      sample: 'बॉस को छुट्टी माँगने के 3 तैयार संदेश दो',
    },
    {
      id: 'fun',
      category: 'fun' as DostCategory,
      title: '4. मस्ती और मज़ा',
      sub: 'जोक, शायरी और कहानियाँ',
      desc: 'मज़ेदार देसी जोक, दिल को छूने वाली शायरियाँ, पहेलियाँ या मज़ेदार कहानियों से दिन का मन हल्का करें।',
      icon: Laugh,
      emoji: '😄',
      color: 'from-purple-500/10 to-purple-600/10 border-purple-200/80 hover:border-purple-400 text-purple-950',
      badgeColor: 'bg-purple-100 text-purple-800',
      sample: 'एक मस्त ताज़ा देसी जोक सुनाओ',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 space-y-6 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 p-6 sm:p-8 text-center shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-orange-950 text-xs font-bold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>हर मोड में साथ निभाने वाला आपका दोस्त</span>
        </div>

        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-orange-400 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-orange-300/50 border-2 border-white mb-3.5">
          {currentPersona.avatarEmoji}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
          नमस्ते! मैं हूँ <span className="text-orange-600">मेरा AI दोस्त</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-700 font-medium max-w-xl mx-auto mt-2 leading-relaxed">
          चाहे कोई विषय समझना हो, दिल हल्का करना हो, WhatsApp जवाब की सलाह चाहिए हो, या बस थोड़ी मस्ती करनी हो — मैं हमेशा आपके साथ हूँ।
        </p>

        {/* Mini Trust Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-semibold text-gray-700">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-xs border border-white/60 shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-orange-500" />
            <span>किसी भी भाषा में बात करें</span>
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/50 backdrop-blur-xs border border-white/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>बिना जजमेंट के और पूरी गोपनीयता</span>
          </span>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>मेरे 4 मुख्य काम</span>
          </h3>
          <span className="text-xs text-gray-600 font-medium">किसी पर भी टैप करें</span>
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
                    आज़माएँ <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
          लोकप्रिय सवाल और विषय
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
