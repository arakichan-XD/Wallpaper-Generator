import React from 'react';
import { WALLPAPER_STYLES } from '../constants';

interface StyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
  disabled: boolean;
}

const styleCardDesigns: { [key: string]: string } = {
  'Kawaii': 'from-pink-500 to-red-500',
  'Anime': 'from-blue-500 to-purple-500',
  'Chibi': 'from-yellow-500 to-orange-500',
  'Pastel Academia': 'from-stone-500 to-rose-500',
  'Watercolor': 'from-sky-500 to-lime-500',
  'Magical Girl': 'from-fuchsia-500 to-amber-500',
  'Cottagecore': 'from-green-500 to-yellow-500',
  'Fantasy': 'from-indigo-500 to-teal-500',
  'Ghibli Inspired': 'from-emerald-500 to-sky-500',
  'Pixel Art': 'from-gray-600 to-slate-700',
  '3D Render': 'from-cyan-500 to-blue-600',
  'Abstract': 'from-rose-600 to-violet-600',
};

const StyleCard: React.FC<{
  style: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ style, isSelected, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`
      p-3 rounded-lg text-white font-bold text-sm w-full h-12 text-center
      transition-all duration-300 ease-in-out transform
      flex items-center justify-center border-2 border-transparent
      bg-gradient-to-br ${styleCardDesigns[style] || 'from-gray-600 to-gray-700'}
      ${isSelected ? 'ring-4 ring-offset-2 ring-offset-slate-800 ring-cyan-400 scale-105 shadow-lg' : 'hover:scale-105 opacity-80 hover:opacity-100'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {style}
  </button>
);

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle, disabled }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {WALLPAPER_STYLES.map((style) => (
        <StyleCard
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={() => onSelectStyle(style)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default StyleSelector;