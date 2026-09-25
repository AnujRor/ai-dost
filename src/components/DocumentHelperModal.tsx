import React, { useState } from 'react';
import { X, FileText, Upload, ArrowRight, Sparkles } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/dostPresets';

interface DocumentHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (text: string, title: string) => void;
  onUploadImageFromModal: () => void;
}

export const DocumentHelperModal: React.FC<DocumentHelperModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  onUploadImageFromModal,
}) => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md">
      <div className="bg-white/85 backdrop-blur-2xl rounded-[32px] max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-white/60 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-blue-500/15 text-blue-900">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Bill ya Notice Samjhao</h3>
              <p className="text-xs text-gray-500">Photo bhejein ya sample template se samjhein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-white/70 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Card */}
        <div
          onClick={() => {
            onClose();
            onUploadImageFromModal();
          }}
          className="p-4 rounded-2xl border-2 border-dashed border-orange-300/80 bg-white/50 backdrop-blur-xs hover:bg-white/80 transition-all cursor-pointer text-center space-y-1 group"
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-orange-400/20 text-orange-900 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-xs font-bold text-gray-900">
            Apne Bill ya Document Ki Photo Upload Karein
          </p>
          <p className="text-[11px] text-gray-500">
            Bijli ka bill, Bank notice, Prescription, ya confusing contract photo
          </p>
        </div>

        {/* Pre-built Sample Cases */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Ya In Sample Scenarios Ko Test Karein:</span>
          </p>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {SAMPLE_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectSample(doc.text, doc.name);
                  onClose();
                }}
                className="p-3 rounded-2xl border border-white/50 bg-white/45 backdrop-blur-xs hover:border-blue-300 hover:bg-white/80 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-900">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                    {doc.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-gray-500">
          Mera AI Dost bina kisi jargon ke seedhi aur aasan bhasha mein samjhayega.
        </div>
      </div>
    </div>
  );
};
