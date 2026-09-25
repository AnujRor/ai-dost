import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ChatBubble } from './components/ChatBubble';
import { ChatInput } from './components/ChatInput';
import { WelcomeHero } from './components/WelcomeHero';
import { QuickActionToolbar } from './components/QuickActionToolbar';
import { Sidebar } from './components/Sidebar';
import { PersonaSelectorModal } from './components/PersonaSelectorModal';
import { DocumentHelperModal } from './components/DocumentHelperModal';
import { BoosterModal } from './components/BoosterModal';
import { AboutModal } from './components/AboutModal';

import { ChatMessage, ChatSession, DostCategory, PersonaProfile } from './types';
import { PERSONA_PROFILES } from './data/dostPresets';
import { speechManager } from './utils/speech';
import { Loader2 } from 'lucide-react';

const STORAGE_KEY_SESSIONS = 'mera_ai_dost_sessions';
const STORAGE_KEY_PERSONA = 'mera_ai_dost_persona';
const STORAGE_KEY_AUDIO = 'mera_ai_dost_audio';

export default function App() {
  // Current persona
  const [currentPersona, setCurrentPersona] = useState<PersonaProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PERSONA);
      if (saved) {
        const found = PERSONA_PROFILES.find((p) => p.id === saved);
        if (found) return found;
      }
    } catch (e) {}
    return PERSONA_PROFILES[0];
  });

  // Selected Category / Mode Filter
  const [selectedCategory, setSelectedCategory] = useState<DostCategory | 'auto'>('auto');

  // Audio speech enabled
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUDIO) === 'true';
    } catch (e) {
      return false;
    }
  });

  // Sessions
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    const initialId = 'session_' + Date.now();
    return [
      {
        id: initialId,
        title: 'Nayi Baatcheet',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return sessions[0]?.id || 'session_' + Date.now();
  });

  // Loading indicator for API
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isBoosterModalOpen, setIsBoosterModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Auto-scroll ref
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to save sessions to localStorage', e);
    }
  }, [sessions]);

  // Save persona preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PERSONA, currentPersona.id);
    } catch (e) {}
  }, [currentPersona]);

  // Save audio preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUDIO, isAudioEnabled ? 'true' : 'false');
    } catch (e) {}
  }, [isAudioEnabled]);

  // Get active session
  const currentSession = sessions.find((s) => s.id === currentSessionId) || sessions[0];
  const messages = currentSession?.messages || [];

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Send message handler
  const handleSendMessage = async (
    text: string,
    image?: { data: string; mimeType: string; name?: string; previewUrl?: string },
    forcedCategory?: DostCategory
  ) => {
    if ((!text.trim() && !image) || isLoading) return;

    const userMsgId = 'msg_' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now(),
      image,
    };

    // Calculate updated title if first message
    let sessionTitle = currentSession.title;
    if (messages.length === 0) {
      sessionTitle = text ? (text.length > 32 ? text.substring(0, 32) + '...' : text) : 'Photo Document';
    }

    // Append user message
    const updatedMessages = [...messages, newUserMessage];
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSession.id
          ? {
              ...s,
              title: sessionTitle,
              messages: updatedMessages,
              updatedAt: Date.now(),
            }
          : s
      )
    );

    setIsLoading(true);

    const assistantMsgId = 'msg_' + (Date.now() + 1);
    const initialAssistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      text: '',
      timestamp: Date.now(),
      category: 'general',
    };

    // Pre-mount assistant message for instant live streaming appearance
    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSession.id
          ? {
              ...s,
              messages: [...updatedMessages, initialAssistantMessage],
              updatedAt: Date.now(),
            }
          : s
      )
    );

    try {
      const modeToSend = forcedCategory || (selectedCategory === 'auto' ? undefined : selectedCategory);

      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          image: image ? { data: image.data, mimeType: image.mimeType } : undefined,
          history: updatedMessages.map((m) => ({
            role: m.role,
            text: m.text,
            image: m.image ? { data: m.image.data, mimeType: m.image.mimeType } : undefined,
          })),
          personaTone: currentPersona.id,
          mode: modeToSend,
        }),
      });

      if (!response.ok || !response.body) {
        // Fallback to non-streaming endpoint
        const fallbackRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            image: image ? { data: image.data, mimeType: image.mimeType } : undefined,
            history: updatedMessages.map((m) => ({
              role: m.role,
              text: m.text,
              image: m.image ? { data: m.image.data, mimeType: m.image.mimeType } : undefined,
            })),
            personaTone: currentPersona.id,
            mode: modeToSend,
          }),
        });

        if (!fallbackRes.ok) {
          const errorData = await fallbackRes.json().catch(() => ({}));
          throw new Error(errorData.error || 'Server error occurred');
        }

        const data = await fallbackRes.json();
        const isFallbackError = Boolean(data.isError);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSession.id
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === assistantMsgId
                      ? {
                          ...m,
                          text: data.text || 'Dost, jawab tayyar ho gaya!',
                          category: data.category || 'general',
                          suggestedFollowUps: data.suggestedFollowUps || [],
                          isError: isFallbackError,
                        }
                      : m
                  ),
                  updatedAt: Date.now(),
                }
              : s
          )
        );

        if (isAudioEnabled && data.text && !isFallbackError) {
          speechManager.speak(data.text);
        }
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let detectedCategory: DostCategory = 'general';
      let followUps: string[] = [];
      let isErrorOccurred = false;
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(trimmed.slice(6));
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.chunk) {
                accumulatedText += parsed.chunk;
                setSessions((prev) =>
                  prev.map((s) =>
                    s.id === currentSession.id
                      ? {
                          ...s,
                          messages: s.messages.map((m) =>
                            m.id === assistantMsgId ? { ...m, text: accumulatedText } : m
                          ),
                          updatedAt: Date.now(),
                        }
                      : s
                  )
                );
              }
              if (parsed.done) {
                if (parsed.category) detectedCategory = parsed.category;
                if (parsed.suggestedFollowUps) followUps = parsed.suggestedFollowUps;
                if (parsed.isError) isErrorOccurred = true;
              }
            } catch (e: any) {
              if (e.message && !e.message.includes('JSON')) {
                throw e;
              }
            }
          }
        }
      }

      // Final synchronization with metadata
      const finalText = accumulatedText.trim() || 'Dost, jawab tayyar ho gaya!';
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSession.id
            ? {
                ...s,
                messages: s.messages.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        text: finalText,
                        category: detectedCategory,
                        suggestedFollowUps: followUps,
                        isError: isErrorOccurred,
                      }
                    : m
                ),
                updatedAt: Date.now(),
              }
            : s
        )
      );

      // Speak aloud if enabled and not an error
      if (isAudioEnabled && finalText && !isErrorOccurred) {
        speechManager.speak(finalText);
      }
    } catch (err: any) {
      console.error('Send message error:', err);
      let errorMsgText = err.message || '';
      if (
        errorMsgText.includes('denied access') ||
        errorMsgText.includes('PERMISSION_DENIED') ||
        errorMsgText.includes('403')
      ) {
        errorMsgText = `⚠️ **Google AI Studio API Key Update Required**\n\nAapke current Gemini API Key ke project ko Google dwara access deny kiya gaya hai.\n\n**Isse theek karne ke aasan steps:**\n1. AI Studio ke top-right **Settings > Secrets** par click karein.\n2. Wahan ek naya aur active **GEMINI_API_KEY** update karein.\n3. Save karte hi aapka **AI Dost** dobara instantly normal reply dena shuru kar dega!`;
      } else {
        errorMsgText = `Dost, thoda sa network issue aa gaya: "${errorMsgText}". Ek baar dobara try karein.`;
      }

      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSession.id
            ? {
                ...s,
                messages: s.messages.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        text: errorMsgText,
                        isError: true,
                      }
                    : m
                ),
                updatedAt: Date.now(),
              }
            : s
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-tap booster handler
  const handleQuickAction = async (actionType: 'joke' | 'shayari' | 'daily_thought' | 'paheli') => {
    let promptTitle = 'Ek Mazedaar Joke';
    if (actionType === 'shayari') promptTitle = 'Ek Pyari Shayari';
    if (actionType === 'daily_thought') promptTitle = 'Daily Motivation';
    if (actionType === 'paheli') promptTitle = 'Ek Dimagi Paheli';

    handleSendMessage(`Dost, mujhe ${promptTitle} sunao!`, undefined, 'fun');
  };

  // Re-explain simpler
  const handleReExplain = (contextText: string) => {
    handleSendMessage(
      'Isko aur aasan bhasha mein ek real-life example ke sath samjhao dost.',
      undefined,
      'explain'
    );
  };

  // New Chat
  const handleNewChat = () => {
    speechManager.stop();
    const newSessionId = 'session_' + Date.now();
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'Nayi Baatcheet',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
  };

  // Delete session
  const handleDeleteSession = (id: string) => {
    speechManager.stop();
    const remaining = sessions.filter((s) => s.id !== id);
    if (remaining.length === 0) {
      const freshId = 'session_' + Date.now();
      const freshSession: ChatSession = {
        id: freshId,
        title: 'Nayi Baatcheet',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setSessions([freshSession]);
      setCurrentSessionId(freshId);
    } else {
      setSessions(remaining);
      if (currentSessionId === id) {
        setCurrentSessionId(remaining[0].id);
      }
    }
  };

  // Toggle Pin session
  const handleTogglePinSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  // Load sample document from template
  const handleLoadSampleDoc = (text: string, title: string) => {
    handleSendMessage(
      `Mera yeh document/scenario samjhao aur guidance do:\n\n${text}`,
      undefined,
      'explain'
    );
  };

  // Export Chat
  const handleExportChat = () => {
    const transcript = messages
      .map((m) => {
        const time = new Date(m.timestamp).toLocaleTimeString();
        const sender = m.role === 'user' ? 'Aap' : `Mera AI Dost (${currentPersona.name})`;
        return `[${time}] ${sender}:\n${m.text}\n`;
      })
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mera_AI_Dost_Chat_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleAudio = () => {
    if (isAudioEnabled) {
      speechManager.stop();
      setIsAudioEnabled(false);
    } else {
      setIsAudioEnabled(true);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-[#FFD1A4] via-[#FFE4E1] to-[#D8BFD8] text-stone-800 overflow-hidden relative selection:bg-orange-200">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-16 right-10 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Header */}
      <Header
        currentPersona={currentPersona}
        onOpenPersonaModal={() => setIsPersonaModalOpen(true)}
        onOpenDocModal={() => setIsDocModalOpen(true)}
        onOpenBoosterModal={() => setIsBoosterModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onNewChat={handleNewChat}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={handleToggleAudio}
        hasMessages={messages.length > 0}
      />

      {/* 4 Pillars Category Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Conversation Stream */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2 relative z-10">
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            <WelcomeHero
              currentPersona={currentPersona}
              onSelectPrompt={(prompt, category) => handleSendMessage(prompt, undefined, category)}
              onOpenDocModal={() => setIsDocModalOpen(true)}
            />
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  persona={currentPersona}
                  onSendFollowUp={(text) => handleSendMessage(text)}
                  onReExplain={handleReExplain}
                />
              ))}

              <div ref={chatBottomRef} />
            </div>
          )}
        </div>
      </main>

      {/* Quick Action Toolbar (1-Tap Boosters) */}
      <div className="bg-white/20 backdrop-blur-md border-t border-white/30 relative z-10">
        <QuickActionToolbar
          onTriggerQuickAction={handleQuickAction}
          isLoading={isLoading}
        />
      </div>

      {/* Bottom Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={(id) => setCurrentSessionId(id)}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onTogglePinSession={handleTogglePinSession}
        onLoadSampleDoc={handleLoadSampleDoc}
        currentPersona={currentPersona}
        onExportChat={handleExportChat}
      />

      {/* Persona Selection Modal */}
      <PersonaSelectorModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        currentPersona={currentPersona}
        onSelectPersona={setCurrentPersona}
      />

      {/* Document Helper Modal */}
      <DocumentHelperModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onSelectSample={handleLoadSampleDoc}
        onUploadImageFromModal={() => {
          const fileInput = document.getElementById('file-input-image') as HTMLInputElement;
          fileInput?.click();
        }}
      />

      {/* Daily Mood Booster Modal */}
      <BoosterModal
        isOpen={isBoosterModalOpen}
        onClose={() => setIsBoosterModalOpen(false)}
        onTriggerAction={handleQuickAction}
      />

      {/* About & Guide Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
