import React from 'react';
import ImageCard from './ImageCard';
import type { FavoriteItem, AspectRatio } from '../types';

interface FavoritesViewProps {
  favorites: FavoriteItem[];
  setFavorites: (favorites: FavoriteItem[]) => void;
  addToast: (message: string) => void;
  onPreview: (image: {src: string, aspectRatio: AspectRatio}) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ favorites, setFavorites, addToast, onPreview }) => {

  const handleToggleFavorite = (imageSrc: string) => {
    setFavorites(favorites.filter(fav => fav.src !== imageSrc));
    addToast("Removed from favorites.");
  };

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all your favorites?")) {
      setFavorites([]);
      addToast("All favorites cleared.");
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-slate-800/60 border-2 border-dashed border-slate-700/80 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-300">No Favorites Yet</h3>
        <p className="text-slate-500 mt-2">Click the heart icon on a wallpaper to save it here.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {favorites.length > 0 && (
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleClearFavorites}
            className="px-4 py-2 bg-red-900/60 text-red-300 rounded-full hover:bg-red-900/80 font-bold transition-colors text-sm"
          >
            Clear All Favorites
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {favorites.map((item, index) => (
            <ImageCard
              key={item.src}
              src={item.src}
              index={index}
              aspectRatio={item.aspectRatio}
              isFavorite={true}
              onToggleFavorite={() => handleToggleFavorite(item.src)}
              onPreview={() => onPreview({src: item.src, aspectRatio: item.aspectRatio})}
              style={{ animationDelay: `${index * 100}ms` }}
              className="opacity-0 animate-fade-in-up"
            />
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesView;