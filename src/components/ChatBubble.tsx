import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Volume2, 
  Square, 
  Sparkles, 
  CornerDownRight, 
  Maximize2, 
  X,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, PersonaProfile } from '../types';
import { CATEGORY_INFO } from '../data/dostPresets';
import { MarkdownRenderer } from './MarkdownRenderer';
import { speechManager } from '../utils/speech';

interface ChatBubbleProps {
  message: ChatMessage;
  persona: PersonaProfile;
  onSendFollowUp: (text: string) => void;
  onReExplain?: (messageText: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  persona,
  onSendFollowUp,
  onReExplain,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);

  const isUser = message.role === 'user';
  const categoryInfo = message.category ? CATEGORY_INFO[message.category] : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechManager.speak(
        message.text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-3.5 group`}>
      <div className={`flex items-start gap-2.5 max-w-[94%] sm:max-w-[85%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-[10px] shadow-sm shadow-indigo-200 border border-white/60">
              ME
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs shadow-sm shadow-orange-200 border border-white/60">
              {categoryInfo ? categoryInfo.emoji : (persona.avatarEmoji || 'AI')}
            </div>
          )}
        </div>

        {/* Message Container */}
        <div className="flex flex-col space-y-1.5 w-full">
          {/* Header row for assistant (category + timestamp) */}
          {!isUser && (
            <div className="flex items-center gap-2 pl-1 text-[11px] text-gray-600 font-medium">
              <span className="font-bold text-gray-800">{persona.name}</span>
              {categoryInfo && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border border-white/50 bg-white/50 backdrop-blur-xs text-gray-700`}>
                  {categoryInfo.name}
                </span>
              )}
              <span>•</span>
              <span>{formatTime(message.timestamp)}</span>
            </div>
          )}

          {/* Bubble Box */}
          <div
            className={`rounded-2xl px-5 py-4 shadow-md backdrop-blur-md transition-all relative border ${
              isUser
                ? 'bg-indigo-500/80 text-white border-indigo-400/40 rounded-tr-none'
                : 'bg-white/60 text-gray-800 border-white/60 rounded-tl-none'
            } ${message.isError ? 'border-rose-300 bg-rose-50/80 text-rose-900' : ''}`}
          >
            {/* Attached Image if any */}
            {message.image && (
              <div className="mb-2.5">
                <div className="relative inline-block overflow-hidden rounded-xl border border-white/60 bg-stone-900/5 group/img">
                  <img
                    src={message.image.previewUrl || `data:${message.image.mimeType};base64,${message.image.data}`}
                    alt="Uploaded attachment"
                    className="max-h-60 max-w-full rounded-xl object-contain cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setShowImageZoom(true)}
                  />
                  <button
                    onClick={() => setShowImageZoom(true)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/80"
                    title="Zoom Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {message.image.name && (
                  <p className="text-[11px] text-stone-500 mt-1 truncate">
                    📎 {message.image.name}
                  </p>
                )}
              </div>
            )}

            {/* Message Content */}
            {isUser ? (
              <div className="whitespace-pre-wrap text-base leading-relaxed text-white font-normal break-words">
                {message.text}
              </div>
            ) : !message.text && !message.isError ? (
              <div className="flex items-center gap-2 py-1.5 text-gray-600 text-sm">
                <span className="inline-flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
                </span>
                <span className="text-xs text-gray-500 font-medium ml-1">Jawab likh raha hoon...</span>
              </div>
            ) : (
              <div className="markdown-content text-base leading-relaxed text-gray-800">
                <MarkdownRenderer content={message.text} />
              </div>
            )}

            {/* User time row */}
            {isUser && (
              <div className="text-[10px] text-indigo-100 text-right mt-1 font-medium">
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>

          {/* Action Bar for Assistant Responses */}
          {!isUser && !message.isError && (
            <div className="flex flex-wrap items-center gap-1.5 pl-1 pt-0.5">
              {/* Audio Listen */}
              <button
                id={`btn-tts-${message.id}`}
                onClick={handleToggleSpeak}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  isSpeaking
                    ? 'bg-orange-500 text-white border-orange-600 animate-pulse shadow-sm'
                    : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:text-gray-900 border-white/60 backdrop-blur-xs'
                }`}
                title={isSpeaking ? 'Aawaz Rokein' : 'Dost Ki Aawaz Suno'}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-3 h-3 fill-current" />
                    <span>Bol Raha Hai...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-orange-500" />
                    <span>Suno</span>
                  </>
                )}
              </button>

              {/* Copy */}
              <button
                id={`btn-copy-${message.id}`}
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/50 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/60 backdrop-blur-xs transition-all"
                title="Copy text"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Re-explain simpler button for explain category */}
              {message.category === 'explain' && onReExplain && (
                <button
                  onClick={() => onReExplain(message.text)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/50 hover:bg-white/80 text-blue-900 border border-white/60 backdrop-blur-xs transition-all"
                  title="Thoda aur aasan bhasha mein samjhao"
                >
                  <RefreshCw className="w-3 h-3 text-blue-600" />
                  <span>Aur Aasan Bhasha</span>
                </button>
              )}
            </div>
          )}

          {/* Follow-up suggestion pills */}
          {!isUser && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-1 pt-1">
              {message.suggestedFollowUps.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendFollowUp(prompt)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium bg-white/50 hover:bg-white/80 text-gray-800 border border-white/60 backdrop-blur-sm shadow-2xs hover:shadow-xs transition-all active:scale-95 text-left"
                >
                  <Sparkles className="w-3 h-3 text-orange-500 shrink-0" />
                  <span>{prompt}</span>
                  <CornerDownRight className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Full-screen Zoom Modal */}
      {showImageZoom && message.image && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowImageZoom(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setShowImageZoom(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={message.image.previewUrl || `data:${message.image.mimeType};base64,${message.image.data}`}
              alt="Zoomed Attachment"
              className="max-h-[85vh] max-w-full object-contain mx-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
