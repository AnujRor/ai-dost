import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { PersonaProfile } from '../types';
import { PERSONA_PROFILES } from '../data/dostPresets';

interface PersonaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: PersonaProfile;
  onSelectPersona: (persona: PersonaProfile) => void;
}

export const PersonaSelectorModal: React.FC<PersonaSelectorModalProps> = ({
  isOpen,
  onClose,
  currentPersona,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <div className="bg-white/85 backdrop-blur-2xl rounded-[32px] max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-white/60 animate-scale-up space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-orange-500/15 text-orange-800">
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Dost Ka Andaaz (Persona Style)</h3>
              <p className="text-xs text-gray-500">Chuniye ki aapka dost aapse kis style mein baat kare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona list */}
        <div className="grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {PERSONA_PROFILES.map((p) => {
            const isSelected = p.id === currentPersona.id;
            return (
              <div
                key={p.id}
                id={`persona-card-${p.id}`}
                onClick={() => {
                  onSelectPersona(p);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-300 ring-2 ring-orange-400/30 shadow-xs'
                    : 'bg-white/50 hover:bg-white/80 border-white/50 backdrop-blur-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${p.color} text-white flex items-center justify-center text-2xl shrink-0 shadow-md shadow-orange-300/30 border border-white/60`}>
                  {p.avatarEmoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-900">{p.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 text-gray-700 border border-white/50">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-orange-800 font-semibold mt-0.5">{p.tagline}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{p.toneDescription}</p>
                </div>

                <div className="shrink-0 mt-1">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-white/70" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center text-xs text-gray-500">
          Aap kabhi bhi apna pasandida andaaz badal sakte hain.
        </div>
      </div>
    </div>
  );
};
