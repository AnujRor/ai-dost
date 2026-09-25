import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Pin, 
  Search, 
  FileText, 
  Sparkles, 
  Download,
  Check
} from 'lucide-react';
import { ChatSession, PersonaProfile } from '../types';
import { SAMPLE_DOCUMENTS } from '../data/dostPresets';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onTogglePinSession: (id: string) => void;
  onLoadSampleDoc: (text: string, title: string) => void;
  currentPersona: PersonaProfile;
  onExportChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onTogglePinSession,
  onLoadSampleDoc,
  currentPersona,
  onExportChat,
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'templates'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedSessions = filteredSessions.filter((s) => s.isPinned);
  const otherSessions = filteredSessions.filter((s) => !s.isPinned);

  const handleExport = () => {
    onExportChat();
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white/85 backdrop-blur-2xl h-full shadow-2xl flex flex-col z-10 border-r border-white/60 animate-slide-in">
        {/* Top Header */}
        <div className="p-4 border-b border-white/40 flex items-center justify-between bg-white/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-300/40 border border-white/60">
              {currentPersona.avatarEmoji}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 leading-none">Mera AI Dost</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Chat History & Tools</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-white/60 transition-all"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-white/40">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full py-2.5 px-3 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-300/40 hover:brightness-105 transition-all active:scale-98 border border-white/40"
          >
            <Plus className="w-4 h-4" />
            <span>Nayi Baat Shuru Karein (New Chat)</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-2 gap-1 border-b border-white/40 bg-white/30 backdrop-blur-xs">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'chats'
                ? 'bg-white/80 text-orange-950 shadow-xs border border-white/60'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Saved Chats ({sessions.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'templates'
                ? 'bg-white/80 text-orange-950 shadow-xs border border-white/60'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sample Scenarios
          </button>
        </div>

        {/* Search Bar for chats */}
        {activeTab === 'chats' && (
          <div className="p-3 pb-1">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 rounded-full border border-white/60 focus-within:border-orange-400 focus-within:bg-white/90 text-xs shadow-inner">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent border-none outline-hidden text-xs text-gray-800"
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {activeTab === 'chats' ? (
            <>
              {filteredSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-400 space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs font-medium">Koi chat history nahi hai abhi.</p>
                </div>
              ) : (
                <>
                  {/* Pinned Section */}
                  {pinnedSessions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">
                        Pinned Chats
                      </p>
                      {pinnedSessions.map((session) => (
                        <div
                          key={session.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group ${
                            session.id === currentSessionId
                              ? 'bg-orange-500/20 text-orange-950 border border-orange-300'
                              : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-white/60'
                          }`}
                        >
                          <button
                            onClick={() => {
                              onSelectSession(session.id);
                              onClose();
                            }}
                            className="flex-1 text-left truncate flex items-center gap-2"
                          >
                            <Pin className="w-3.5 h-3.5 text-orange-600 fill-orange-600 shrink-0" />
                            <span className="truncate">{session.title}</span>
                          </button>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => onTogglePinSession(session.id)}
                              className="p-1 text-gray-400 hover:text-orange-700 rounded-md"
                              title="Unpin"
                            >
                              <Pin className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteSession(session.id)}
                              className="p-1 text-gray-400 hover:text-rose-600 rounded-md"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* All chats */}
                  <div className="space-y-1">
                    {pinnedSessions.length > 0 && otherSessions.length > 0 && (
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 pt-2">
                        Recent Chats
                      </p>
                    )}
                    {otherSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all group ${
                          session.id === currentSessionId
                            ? 'bg-orange-500/20 text-orange-950 font-bold border border-orange-300'
                            : 'bg-white/50 hover:bg-white/80 text-gray-700 border border-white/50'
                        }`}
                      >
                        <button
                          onClick={() => {
                            onSelectSession(session.id);
                            onClose();
                          }}
                          className="flex-1 text-left truncate flex items-center gap-2"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{session.title}</span>
                        </button>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onTogglePinSession(session.id)}
                            className="p-1 text-gray-400 hover:text-orange-700 rounded-md"
                            title="Pin to top"
                          >
                            <Pin className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteSession(session.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 rounded-md"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                In sample scenarios ko 1-tap mein test karein:
              </p>
              {SAMPLE_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    onLoadSampleDoc(doc.text, doc.name);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-white/50 border border-white/60 hover:border-orange-300 hover:bg-white/80 transition-all cursor-pointer space-y-1 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                    <span>{doc.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer toolbar */}
        <div className="p-3 border-t border-white/40 bg-white/40 backdrop-blur-md flex items-center justify-between text-xs">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 border border-white/60 text-gray-700 hover:text-gray-900 font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-2xs"
            title="Download conversation backup"
          >
            {exported ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Saved TXT</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Export Chat</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-gray-500 font-medium">
            AI Dost v1.0
          </span>
        </div>
      </div>
    </div>
  );
};
