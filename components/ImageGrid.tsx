import React from 'react';
import type { AspectRatio } from '../types';
import ImageCard from './ImageCard';
import Spinner from './common/Spinner';
import DownloadIcon from './icons/DownloadIcon';

interface ImageGridProps {
  images: string[];
  isLoading: boolean;
  aspectRatio: AspectRatio;
  favorites: string[];
  onToggleFavorite: (imageSrc: string) => void;
  onPreview: (imageSrc: string) => void;
}

const LoadingSkeleton: React.FC<{ aspectRatio: AspectRatio }> = ({ aspectRatio }) => (
  <div className={`relative rounded-lg bg-slate-800/70 animate-pulse ${aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '9:16' ? 'aspect-[9/16]' : aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  </div>
);

const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, aspectRatio, favorites, onToggleFavorite, onPreview }) => {
  const handleDownloadAll = () => {
    images.forEach((src, index) => {
      downloadImage(src, `ai-wallpaper-${Date.now()}-${index + 1}.jpeg`);
    });
  };

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {[...Array(4)].map((_, i) => (
          <LoadingSkeleton key={i} aspectRatio={aspectRatio} />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
       <div className="mt-8 text-center py-16 px-6 bg-slate-800/60 border-2 border-dashed border-slate-700/80 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-300">Your generated wallpapers will appear here</h3>
        <p className="text-slate-500 mt-2">Fill out the form above to begin.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadAll}
          className="flex items-center bg-slate-700 text-slate-200 px-4 py-2 rounded-full hover:bg-slate-600 transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {images.map((src, index) => (
          <ImageCard 
            key={src} 
            src={src} 
            index={index} 
            aspectRatio={aspectRatio} 
            isFavorite={favorites.includes(src)}
            onToggleFavorite={() => onToggleFavorite(src)}
            onPreview={() => onPreview(src)}
            style={{ animationDelay: `${index * 100}ms` }}
            className="opacity-0 animate-fade-in-up"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;