import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import HeartIcon from './icons/HeartIcon';
import type { AspectRatio } from '../types';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  index: number;
  aspectRatio: AspectRatio;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onPreview: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, index, aspectRatio, isFavorite, onToggleFavorite, onPreview, ...props }) => {
  
  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch(ratio) {
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '1:1': return 'aspect-square';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      default: return 'aspect-video';
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    const link = document.createElement('a');
    link.href = src;
    link.download = `ai-wallpaper-${Date.now()}-${index + 1}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onToggleFavorite(e);
  };

  return (
    <div 
      {...props}
      onClick={onPreview}
      className={`relative group overflow-hidden rounded-lg shadow-lg bg-slate-800 transition-all duration-300 ring-2 ring-transparent hover:ring-cyan-500 hover:scale-[1.03] cursor-pointer
        ${getAspectRatioClass(aspectRatio)} ${props.className}`}>
      <img
        src={src}
        alt={`Generated wallpaper ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 ease-out">
         <button
          onClick={handleDownload}
          className="flex items-center bg-slate-100 text-slate-800 px-4 py-2 rounded-full hover:bg-white transition-colors text-sm font-bold shadow-md"
          aria-label="Download image"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          Save
        </button>
        <button
          onClick={handleToggleFavorite}
          className="p-3 rounded-full text-white bg-black/30 backdrop-blur-sm hover:text-fuchsia-400 hover:scale-110 transition-all duration-200"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-fuchsia-400' : 'text-white/80'}`} isFilled={isFavorite} />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;