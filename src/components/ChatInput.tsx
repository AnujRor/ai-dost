import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  X, 
  Paperclip,
  Sparkles,
  Loader2
} from 'lucide-react';
import { DostCategory } from '../types';
import { createSpeechRecognizer } from '../utils/speech';

interface ChatInputProps {
  onSendMessage: (text: string, image?: { data: string; mimeType: string; name?: string; previewUrl?: string }) => void;
  isLoading: boolean;
  selectedCategory: DostCategory | 'auto';
  onCategoryChange: (cat: DostCategory | 'auto') => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  selectedCategory,
  onCategoryChange,
}) => {
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<{
    data: string;
    mimeType: string;
    name?: string;
    previewUrl?: string;
  } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognizerRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [inputText]);

  // Handle paste image directly from clipboard
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setSpeechError('Kripya sirf images (JPG, PNG, WebP) upload karein.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setSpeechError('Photo bahut badi hai (15MB se zyada). Chhoti photo bhejein.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64Data = result.split(',')[1];
      setAttachedImage({
        data: base64Data,
        mimeType: file.type,
        name: file.name,
        previewUrl: result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    // Reset so choosing the same photo again still triggers onChange
    e.target.value = '';
  };

  const handleToggleListening = () => {
    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
    } else {
      setSpeechError(null);
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        },
        (error) => {
          setSpeechError('Voice recording error. Kripya dobara try karein.');
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        try {
          recognizer.start();
          setIsListening(true);
        } catch (e) {
          console.warn('Speech recognizer start error', e);
          setIsListening(false);
        }
      } else {
        setSpeechError('Aapke browser mein speech recognition available nahi hai.');
        setTimeout(() => setSpeechError(null), 3000);
      }
    }
  };

  const handleSend = () => {
    if ((!inputText.trim() && !attachedImage) || isLoading) return;

    onSendMessage(inputText.trim(), attachedImage || undefined);
    setInputText('');
    setAttachedImage(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-white/20 backdrop-blur-xl border-t border-white/30 p-2.5 sm:p-4 shadow-lg relative z-20">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Attached image preview pill */}
        {attachedImage && (
          <div className="flex items-center gap-2 p-2 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 max-w-sm shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-300">
              <img
                src={attachedImage.previewUrl}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">
                {attachedImage.name || 'Photo Attached'}
              </p>
              <p className="text-[11px] text-orange-700">
                Photo/Document padhkar samjhaya jayega
              </p>
            </div>
            <button
              id="btn-remove-attached-image"
              onClick={() => setAttachedImage(null)}
              className="p-1.5 rounded-full text-stone-600 hover:bg-stone-200/70 transition-all"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Speech error toast */}
        {speechError && (
          <div className="text-xs font-medium text-rose-700 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-300 flex items-center justify-between shadow-xs">
            <span>{speechError}</span>
            <button onClick={() => setSpeechError(null)} className="text-rose-600 hover:text-rose-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Listening banner */}
        {isListening && (
          <div className="flex items-center justify-between px-3.5 py-2 bg-orange-500/15 border border-orange-300 backdrop-blur-md rounded-2xl text-orange-950 text-xs font-semibold animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>Dost sun raha hai... boliye (Hindi/English)</span>
            </div>
            <button
              onClick={handleToggleListening}
              className="text-xs font-bold text-orange-800 underline hover:text-orange-950"
            >
              Stop
            </button>
          </div>
        )}

        {/* Main Input Box */}
        <div className="flex items-end gap-1.5 sm:gap-2 bg-white/60 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/60 focus-within:border-orange-400 focus-within:bg-white/80 focus-within:ring-2 focus-within:ring-orange-400/20 transition-all p-1.5 shadow-inner">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-input-image"
          />

          {/* Attachment button */}
          <button
            id="btn-attach-image"
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-full text-stone-500 hover:text-orange-800 hover:bg-white/80 transition-all active:scale-95 shrink-0"
            title="Photo / Bill / Notice upload karein"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Textarea */}
          <textarea
            id="chat-textarea"
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={
              attachedImage
                ? "Is photo ke baare mein kya poochna chahte hain? (Enter to send)"
                : selectedCategory === 'explain'
                ? "Kuch samjhna hai? Jaise 'Bijli bill' ya 'SIP kya hota hai'..."
                : selectedCategory === 'emotional'
                ? "Dil ki baat share karein, dost sun raha hai..."
                : selectedCategory === 'advice'
                ? "Kis cheez par salah ya message reply chahiye?..."
                : selectedCategory === 'fun'
                ? "Joke, kahani ya shayari maangein..."
                : "Apne dost se baat karein ya photo bhejein... (Hinglish/Hindi)"
            }
            rows={1}
            disabled={isLoading}
            className="w-full max-h-36 py-2 px-2 bg-transparent resize-none border-none outline-hidden text-gray-800 text-[15px] placeholder:text-gray-400 leading-normal font-sans"
          />

          {/* Speech Mic Button */}
          <button
            id="btn-voice-input"
            type="button"
            onClick={handleToggleListening}
            className={`p-2.5 rounded-full transition-all active:scale-95 shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white animate-bounce shadow-md'
                : 'text-stone-500 hover:text-orange-800 hover:bg-white/80'
            }`}
            title={isListening ? "Listening... Click to stop" : "Bolein (Voice Input)"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            id="btn-send-message"
            type="button"
            onClick={handleSend}
            disabled={(!inputText.trim() && !attachedImage) || isLoading}
            className={`p-2.5 rounded-full font-bold transition-all active:scale-95 shrink-0 flex items-center justify-center ${
              (inputText.trim() || attachedImage) && !isLoading
                ? 'bg-orange-500 text-white shadow-md shadow-orange-300/50 hover:brightness-105 cursor-pointer border border-white/40'
                : 'bg-white/40 text-stone-400 cursor-not-allowed border border-white/40'
            }`}
            title="Message bhejein"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-orange-700" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Small footer caption */}
        <div className="flex items-center justify-between text-[11px] text-gray-600 px-3 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>Mera AI Dost • Hinglish, Hindi aur English support</span>
          </span>
          <span className="hidden sm:inline text-gray-500">
            Shift + Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
};
