import React from 'react';
import type { HistoryItem, AspectRatio } from '../types';
import ExportIcon from './icons/ExportIcon';
import CopyIcon from './icons/CopyIcon';

interface HistoryViewProps {
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  addToast: (message: string, type: 'success' | 'info') => void;
}

const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
  '16:9': 'PC',
  '9:16': 'Phone',
  '1:1': 'Icon',
  '4:3': 'Tablet',
  '3:4': 'Poster',
};

const HistoryView: React.FC<HistoryViewProps> = ({ history, setHistory, addToast }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-slate-800/60 border-2 border-dashed border-slate-700/80 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-300">No History Found</h3>
        <p className="text-slate-500 mt-2">Your generated wallpapers will be saved here for future reference.</p>
      </div>
    );
  }
  
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire history? This action cannot be undone.")) {
      setHistory([]);
    }
  };

  const handleExportHistory = () => {
    if (history.length === 0) return;
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-wallpaper-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    addToast('Prompt copied to clipboard.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-end space-x-2">
         <button 
          onClick={handleExportHistory}
          disabled={history.length === 0}
          className="flex items-center px-4 py-2 bg-slate-700 text-slate-200 rounded-full hover:bg-slate-600 font-bold transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ExportIcon className="w-4 h-4 mr-2" />
          Export
        </button>
        <button 
          onClick={handleClearHistory}
          className="px-4 py-2 bg-red-900/60 text-red-300 rounded-full hover:bg-red-900/80 font-bold transition-colors text-sm"
        >
          Clear History
        </button>
      </div>
      {history.map((item) => (
        <div key={item.id} className="p-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 rounded-xl shadow-md flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
          <img 
            src={item.images[0]} 
            alt="Wallpaper preview" 
            className={`w-full sm:w-24 md:w-32 rounded-md object-cover bg-slate-700 ${item.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16]'}`}
            loading="lazy"
          />
          <div className="flex-1">
            <p className="font-semibold text-slate-200 line-clamp-2" title={item.prompt}>{item.prompt}</p>
            <div className="mt-2 text-sm text-slate-400 flex items-center flex-wrap gap-x-3 gap-y-1">
              <span className="px-2 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-md font-semibold text-xs">{item.style}</span>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md font-semibold text-xs">{ASPECT_RATIO_LABELS[item.aspectRatio]}</span>
               <span className="text-slate-500 hidden md:inline text-xs">{new Date(item.timestamp).toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={() => handleCopyPrompt(item.prompt)}
            className="sm:ml-auto p-2.5 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-colors"
            title="Copy prompt"
            aria-label="Copy prompt"
          >
            <CopyIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryView;