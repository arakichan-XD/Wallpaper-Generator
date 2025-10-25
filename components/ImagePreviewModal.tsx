import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { AspectRatio } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import HeartIcon from './icons/HeartIcon';
import CloseIcon from './icons/CloseIcon';

interface ImagePreviewModalProps {
  src: string;
  aspectRatio: AspectRatio;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ src, aspectRatio, isFavorite, onClose, onToggleFavorite }) => {
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // match animation duration
  };

  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch(ratio) {
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '1:1': return 'aspect-square';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      default: return 'aspect-video';
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = src;
    link.download = `ai-wallpaper-${Date.now()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" />
      
      <div 
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative max-w-[90vw] max-h-[90vh] flex flex-col items-center`}>
            <img
                src={src}
                alt="Wallpaper preview"
                className={`w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl ${getAspectRatioClass(aspectRatio)}`}
            />
            <div className="absolute -bottom-16 flex items-center space-x-4">
               <button
                  onClick={handleDownload}
                  className="flex items-center bg-slate-100 text-slate-800 px-5 py-3 rounded-full hover:bg-white transition-colors text-base font-bold shadow-lg"
                  aria-label="Download image"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Save
                </button>
                <button
                  onClick={onToggleFavorite}
                  className="p-4 rounded-full text-white bg-black/30 backdrop-blur-sm hover:text-fuchsia-400 hover:scale-110 transition-all duration-200"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <HeartIcon className={`w-7 h-7 ${isFavorite ? 'text-fuchsia-400' : 'text-white/80'}`} isFilled={isFavorite} />
                </button>
            </div>
        </div>

        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="Close preview"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
  
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default ImagePreviewModal;