import React from 'react';
import { DostCategory } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface CategoryBarProps {
  selectedCategory: DostCategory | 'auto';
  onSelectCategory: (cat: DostCategory | 'auto') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useLanguage();

  const categories: Array<{ id: DostCategory | 'auto'; label: string; emoji: string }> = [
    { id: 'auto', label: t('category.auto'), emoji: '✨' },
    { id: 'explain', label: t('category.explain'), emoji: '📚' },
    { id: 'emotional', label: t('category.emotional'), emoji: '❤️' },
    { id: 'advice', label: t('category.advice'), emoji: '💡' },
    { id: 'fun', label: t('category.fun'), emoji: '😄' },
  ];

  return (
    <div className="w-full py-2 px-3 sm:px-6 border-b border-white/30 bg-white/20 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="max-w-6xl mx-auto flex items-center gap-1.5 min-w-max">
        <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider pl-1 pr-1.5 select-none hidden sm:inline">
          {t('category.heading')}
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`btn-mode-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-300/40 border border-white/40'
                  : 'bg-white/40 hover:bg-white/70 text-gray-700 hover:text-gray-900 border border-white/50 backdrop-blur-xs'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
