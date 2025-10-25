import React from 'react';
import type { AspectRatio, Quality } from '../types';
import Button from './common/Button';
import Spinner from './common/Spinner';
import LandscapeIcon from './icons/LandscapeIcon';
import PortraitIcon from './icons/PortraitIcon';
import SquareIcon from './icons/SquareIcon';
import StyleSelector from './StyleSelector';
import ShuffleIcon from './icons/ShuffleIcon';

interface WallpaperFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  customStyle: string;
  setCustomStyle: (value: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
  quality: Quality;
  setQuality: (value: Quality) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onSurpriseMe: () => void;
}

const AspectRatioButton: React.FC<{
  label: string;
  value: AspectRatio;
  currentValue: AspectRatio;
  onClick: (value: AspectRatio) => void;
  disabled: boolean;
  icon: React.ReactNode;
}> = ({ label, value, currentValue, onClick, disabled, icon }) => (
  <button
    type="button"
    onClick={() => onClick(value)}
    disabled={disabled}
    className={`w-full flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 group relative ${
      currentValue === value
        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
    }`}
  >
    {icon}
    <span className="text-xs mt-1.5 font-semibold text-slate-300">{label}</span>
  </button>
);

const WallpaperForm: React.FC<WallpaperFormProps> = ({
  prompt, setPrompt, style, setStyle, customStyle, setCustomStyle,
  aspectRatio, setAspectRatio, quality, setQuality, isLoading, onSubmit, onSurpriseMe
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-6 bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 rounded-2xl shadow-lg space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-md font-bold text-slate-300 mb-2">
          1. Describe Your Wallpaper
        </label>
        <textarea
          id="prompt"
          rows={3}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
          placeholder="e.g., A majestic dragon flying over a medieval castle surrounded by mountains"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-md font-bold text-slate-300 mb-2">
          2. Choose a Style
        </label>
        <StyleSelector 
          selectedStyle={style} 
          onSelectStyle={(s) => { setStyle(s); setCustomStyle(''); }} 
          disabled={isLoading} 
        />
      </div>
       <div>
          <label htmlFor="custom-style" className="block text-md font-bold text-slate-300 mb-2">
            Or Create Your Own
          </label>
          <input
            id="custom-style"
            type="text"
            className="w-full bg-slate-900/70 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
            placeholder="e.g., steampunk, synthwave, dark fantasy"
            value={customStyle}
            onChange={(e) => { setCustomStyle(e.target.value); setStyle(''); }}
            disabled={isLoading}
          />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-md font-bold text-slate-300 mb-2">
            3. Pick a Size
          </label>
          <div className="grid grid-cols-5 gap-2">
            <AspectRatioButton label="PC" value="16:9" currentValue={aspectRatio} onClick={setAspectRatio} disabled={isLoading} icon={<LandscapeIcon className="w-7 h-7" />} />
            <AspectRatioButton label="Phone" value="9:16" currentValue={aspectRatio} onClick={setAspectRatio} disabled={isLoading} icon={<PortraitIcon className="w-7 h-7" />} />
            <AspectRatioButton label="Icon" value="1:1" currentValue={aspectRatio} onClick={setAspectRatio} disabled={isLoading} icon={<SquareIcon className="w-7 h-7" />} />
            <AspectRatioButton label="Tablet" value="4:3" currentValue={aspectRatio} onClick={setAspectRatio} disabled={isLoading} icon={<LandscapeIcon className="w-7 h-7 transform scale-x-90" />} />
            <AspectRatioButton label="Poster" value="3:4" currentValue={aspectRatio} onClick={setAspectRatio} disabled={isLoading} icon={<PortraitIcon className="w-7 h-7 transform scale-y-90" />} />
          </div>
        </div>
        <div>
          <label className="block text-md font-bold text-slate-300 mb-2">
            4. Choose Quality
          </label>
          <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
            <button type="button" onClick={() => setQuality('standard')} disabled={isLoading} className={`flex items-center justify-center p-3 rounded-lg border font-semibold transition-all duration-200 ${quality === 'standard' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'}`}>Standard</button>
            <button type="button" onClick={() => setQuality('enhanced')} disabled={isLoading} className={`flex items-center justify-center p-3 rounded-lg border font-semibold transition-all duration-200 ${quality === 'enhanced' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'}`}>Enhanced</button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-700/80">
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-3">
          {isLoading ? (
            <>
              <Spinner className="mr-3" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
        <Button type="button" disabled={isLoading} onClick={onSurpriseMe} variant="secondary">
           <ShuffleIcon className="w-5 h-5 mr-2" />
          Surprise Me
        </Button>
      </div>
    </form>
  );
};

export default WallpaperForm;