import React, { useState, useCallback } from 'react';
import type { AspectRatio, HistoryItem, FavoriteItem, InspirationItem, Quality } from './types';
import { WALLPAPER_STYLES, INSPIRATION_EXAMPLES } from './constants';
import { generateWallpapers } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import WallpaperForm from './components/WallpaperForm';
import ImageGrid from './components/ImageGrid';
import Navigation from './components/Navigation';
import HistoryView from './components/HistoryView';
import FavoritesView from './components/FavoritesView';
import InspirationView from './components/InspirationView';
import Footer from './components/Footer';
import ToastContainer from './components/common/ToastContainer';
import ImagePreviewModal from './components/ImagePreviewModal';

type View = 'generator' | 'history' | 'favorites' | 'inspiration';
type ToastMessage = { id: number; message: string; type: 'success' | 'info' };
type PreviewImage = { src: string; aspectRatio: AspectRatio };

function App() {
  const [prompt, setPrompt] = useState<string>('Bioluminescent mushrooms in a misty enchanted forest');
  const [style, setStyle] = useState<string>(WALLPAPER_STYLES[7]); // Default to Fantasy
  const [customStyle, setCustomStyle] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [quality, setQuality] = useState<Quality>('standard');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeView, setActiveView] = useState<View>('generator');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('wallpaperHistory', []);
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>('wallpaperFavorites', []);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
  
  const [viewVisible, setViewVisible] = useState(true);

  const changeView = (view: View) => {
    setViewVisible(false);
    setTimeout(() => {
      setActiveView(view);
      setViewVisible(true);
    }, 300); // Corresponds with transition duration
  };

  const addToast = (message: string, type: 'success' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleToggleFavorite = (imageSrc: string) => {
    const currentAspectRatio = previewImage?.aspectRatio || aspectRatio;
    const isFavorite = favorites.some(fav => fav.src === imageSrc);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.src !== imageSrc));
      addToast("Removed from favorites.");
    } else {
      const newFavorite: FavoriteItem = { src: imageSrc, aspectRatio: currentAspectRatio };
      setFavorites([newFavorite, ...favorites]);
      addToast("Added to favorites.", "success");
    }
  };

  const handleInspirationClick = (inspiration: InspirationItem) => {
    setPrompt(inspiration.prompt);
    setStyle(inspiration.style);
    setCustomStyle('');
    changeView('generator');
  };

  const handleSurpriseMe = () => {
    const randomInspiration = INSPIRATION_EXAMPLES[Math.floor(Math.random() * INSPIRATION_EXAMPLES.length)];
    setPrompt(randomInspiration.prompt);
    setStyle(randomInspiration.style);
    setCustomStyle('');
    addToast("New random prompt loaded.");
  };

  const handleGenerate = useCallback(async () => {
    const finalStyle = customStyle.trim() || style;
    if (!prompt.trim()) {
      setError("Please provide a prompt.");
      return;
    }
     if (!finalStyle) {
      setError("Please select a style.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateWallpapers(prompt, finalStyle, aspectRatio, quality);
      setImages(generatedImages);
      const newHistoryItem: HistoryItem = {
        id: `gen-${Date.now()}`,
        prompt,
        style: finalStyle,
        aspectRatio,
        images: generatedImages,
        timestamp: Date.now(),
      };
      setHistory([newHistoryItem, ...history]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style, customStyle, aspectRatio, quality, history, setHistory]);
  
  const renderContent = () => {
    switch (activeView) {
      case 'history':
        return <HistoryView history={history} setHistory={setHistory} addToast={addToast} />;
      case 'favorites':
        return <FavoritesView favorites={favorites} setFavorites={setFavorites} addToast={addToast} onPreview={setPreviewImage} />;
      case 'inspiration':
        return <InspirationView onInspirationClick={handleInspirationClick} />;
      case 'generator':
      default:
        return (
          <>
            <WallpaperForm
              prompt={prompt}
              setPrompt={setPrompt}
              style={style}
              setStyle={setStyle}
              customStyle={customStyle}
              setCustomStyle={setCustomStyle}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              quality={quality}
              setQuality={setQuality}
              isLoading={isLoading}
              onSubmit={handleGenerate}
              onSurpriseMe={handleSurpriseMe}
            />
            
            {error && (
              <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-xl text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <ImageGrid
              images={images}
              isLoading={isLoading}
              aspectRatio={aspectRatio}
              favorites={favorites.map(f => f.src)}
              onToggleFavorite={handleToggleFavorite}
              onPreview={(src) => setPreviewImage({ src, aspectRatio })}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <ToastContainer toasts={toasts} />
      {previewImage && (
        <ImagePreviewModal 
            src={previewImage.src}
            aspectRatio={previewImage.aspectRatio}
            isFavorite={favorites.some(fav => fav.src === previewImage.src)}
            onClose={() => setPreviewImage(null)}
            onToggleFavorite={() => handleToggleFavorite(previewImage.src)}
        />
      )}
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8">
          <Navigation activeView={activeView} setActiveView={changeView} />
          <div className={`mt-6 transition-opacity duration-300 ease-in-out ${viewVisible ? 'opacity-100' : 'opacity-0'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;