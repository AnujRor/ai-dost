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
                AI दोस्त — आपका सब कुछ एक साथी
              </h3>
              <p className="text-xs text-gray-500">मित्रवत, सरल, गर्मजोशी भरा और बिना किसी जजमेंट के</p>
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
          <strong>"AI दोस्त"</strong> एक ऐसा साथी है जो हर तरह के इंसान की हर हालत में मदद करता है — चाहे आप छात्र हों, गृहिणी हों, व्यवसायी हों या बुज़ुर्ग। यह आपसे बिल्कुल अपने जैसे दोस्त की तरह, आपकी ही भाषा में बात करता है — हिंदी, English, रोमन हिंदी या दुनिया की कोई भी भाषा।
        </p>

        {/* 4 Pillars */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>AI दोस्त के 4 मुख्य काम:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>1. समझाना (सीखना)</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                कोई भी विषय, बिजली/पानी का बिल, सरकारी नोटिस, दवा की पर्ची या फ़ोटो — बिना किसी तकनीकी jargon के रोज़मर्रा की आसान भाषा में समझाना।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>2. दिल की बात (हौसला)</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                मन खराब हो, तनाव हो या थकान — बिना जजमेंट किए सच्चे दोस्त की तरह सुनना, भावनात्मक सहारा और प्यारा हौसला देना।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span>3. सलाह और जवाब के सुझाव</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                WhatsApp पर क्या जवाब दें, अजीब स्थिति में क्या बोलें या फ़ैसला कैसे लें — 2-3 साफ़ विकल्प तैयार करके देना।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
                <Laugh className="w-4 h-4 text-purple-600" />
                <span>4. मस्ती और मज़ाक</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                देसी जोक, दिल को छूने वाली शायरियाँ, मज़ेदार कहानियाँ और पहेलियों (riddles) के साथ मन भटकाना और चेहरे पर मुस्कान लाना।
              </p>
            </div>
          </div>
        </div>

        {/* Rules & Trust */}
        <div className="p-3.5 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/60 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ख़ास नियम (मुख्य बातें)</span>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>हमेशा सम्मानजनक और मित्रवत रहना, कभी rude या robotic न बनना।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>सीधा, साफ़ और काम का जवाब देना, बिना फालतू लंबा किए।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>आवाज़ से लिखने (Voice input) और आवाज़ में सुनने (सुनें) के साथ आसान बातचीत।</span>
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-300/40 hover:brightness-105 transition-all border border-white/40"
        >
          समझ गया, चलिए बात करें!
        </button>
      </div>
    </div>
  );
};
