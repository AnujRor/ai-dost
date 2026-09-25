import React from 'react';
import { 
  Sparkles, 
  FileText, 
  RotateCcw, 
  Info, 
  Menu, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal 
} from 'lucide-react';
import { PersonaProfile } from '../types';

interface HeaderProps {
  currentPersona: PersonaProfile;
  onOpenPersonaModal: () => void;
  onOpenDocModal: () => void;
  onOpenBoosterModal: () => void;
  onOpenAboutModal: () => void;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  hasMessages: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onOpenPersonaModal,
  onOpenDocModal,
  onOpenBoosterModal,
  onOpenAboutModal,
  onToggleSidebar,
  onNewChat,
  isAudioEnabled,
  onToggleAudio,
  hasMessages,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-xs px-3 sm:px-6 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Menu toggle + Logo & Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            id="btn-toggle-sidebar"
            onClick={onToggleSidebar}
            className="p-2 rounded-full bg-white/40 hover:bg-white/60 text-stone-700 hover:text-stone-900 border border-white/50 shadow-2xs active:scale-95 transition-all focus:outline-hidden"
            title="Saved Chats & Scenarios"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={onOpenAboutModal}>
            <div className="relative">
              <div className="w-11 h-11 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-300/50 border border-white/60">
                {currentPersona.avatarEmoji}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-xl font-bold text-gray-800 tracking-tight leading-none">
                  AI Dost
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-700 border border-orange-300/50 hidden sm:inline-block">
                  Hamesha Saath
                </span>
              </div>
              <p className="text-xs font-semibold text-orange-600 mt-0.5 truncate max-w-[140px] sm:max-w-xs">
                {currentPersona.name} • 4 Modes
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right: Quick Tool Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Persona flavor switch */}
          <button
            id="btn-persona-selector"
            onClick={onOpenPersonaModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/40 hover:bg-white/70 text-gray-700 hover:text-gray-900 border border-white/50 backdrop-blur-sm transition-all active:scale-95 shadow-2xs"
            title="Dost Style / Persona Change Karein"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden md:inline">Mode:</span>
            <span className="truncate max-w-[80px] sm:max-w-none font-semibold">{currentPersona.name.split(' ')[0]}</span>
          </button>

          {/* Doc / Bill Scanner Helper */}
          <button
            id="btn-header-doc-helper"
            onClick={onOpenDocModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/40 hover:bg-white/70 text-blue-900 border border-white/50 backdrop-blur-sm transition-all active:scale-95 shadow-2xs"
            title="Bill ya Document Samjhao"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Bill / Notice</span>
          </button>

          {/* Daily Booster / Mood Refresher */}
          <button
            id="btn-header-booster"
            onClick={onOpenBoosterModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/40 hover:bg-white/70 text-orange-950 border border-white/50 backdrop-blur-sm transition-all active:scale-95 shadow-2xs"
            title="Joke, Shayari, Daily Inspiration"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden sm:inline">Booster</span>
          </button>

          {/* Audio TTS toggle */}
          <button
            id="btn-toggle-audio"
            onClick={onToggleAudio}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 backdrop-blur-sm shadow-2xs ${
              isAudioEnabled
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-800'
                : 'bg-white/40 hover:bg-white/70 border-white/50 text-gray-600'
            }`}
            title={isAudioEnabled ? 'Dost Ki Aawaz: On' : 'Dost Ki Aawaz: Off (Mute)'}
            aria-label="Toggle voice output"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* New Chat Reset */}
          {hasMessages && (
            <button
              id="btn-header-new-chat"
              onClick={onNewChat}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/70 text-gray-700 border border-white/50 backdrop-blur-sm active:scale-95 transition-all shadow-2xs"
              title="Nayi Baat Shuru Karein (New Chat)"
              aria-label="New Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* About / Guide */}
          <button
            id="btn-header-about"
            onClick={onOpenAboutModal}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/70 text-gray-700 border border-white/50 backdrop-blur-sm active:scale-95 transition-all shadow-2xs"
            title="Mera AI Dost Ke Baare Mein"
            aria-label="About App"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
