import React from 'react';
import { X, BookOpen, Heart, Lightbulb, Laugh, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <div className="bg-white/85 backdrop-blur-2xl rounded-[32px] max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-white/60 max-h-[88vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center text-xl shadow-md shadow-orange-300/40 border border-white/60">
              🤝
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                AI Dost — Aapka All-in-One Saathi
              </h3>
              <p className="text-xs text-gray-500">Friendly, simple, warm aur bina kisi judgement ke</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-white/50 backdrop-blur-xs p-3.5 rounded-2xl border border-white/60">
          <strong>"AI Dost"</strong> ek aisa companion hai jo har tarah ke user ki har situation mein madad karta hai — chahe aap student hon, housewife, businessman, ya bujurg. Yeh aapse bilkul apno ki tarah Hinglish, Hindi ya English mein baat karta hai.
        </p>

        {/* 4 Pillars */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>AI Dost Ke 4 Mukhya Kaam:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>1. Explain Karna (Educational)</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Koi bhi topic, bijli/paani ka bill, sarkari notice, medicine slip ya photo ko bina kisi technical jargon ke roz-marra ki aasan bhasha mein samjhana.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>2. Dil Ki Baat (Motivation)</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Mood low ho, tension ho ya thakan — bina judge kiye sachche dost ki tarah sunna, emotional support aur pyara hosla dena.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span>3. Salah & Reply Suggestions</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                WhatsApp pe kya reply karein, awkward situation mein kya bolein ya decision kaise lein — 2-3 clear options ready karke dena.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
                <Laugh className="w-4 h-4 text-purple-600" />
                <span>4. Masti & Entertainment</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Desi jokes, relatable shayaris, chatpati kahaniyan aur paheliyon (riddles) ke sath mann behlana aur chehre par muskaan lana.
              </p>
            </div>
          </div>
        </div>

        {/* Rules & Trust */}
        <div className="p-3.5 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Khaas Niyam (Key Values)</span>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Hamesha respectful aur friendly rehna, kabhi rude ya robotic na banna.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Seedha, saaf aur kaam ka jawab dena bina faltu lamba kiye.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Voice input aur Voice output (Suno) ke sath aasan baatcheet.</span>
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-300/40 hover:brightness-105 transition-all border border-white/40"
        >
          Samajh Gaya, Chalo Baat Karein!
        </button>
      </div>
    </div>
  );
};
