import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import HistoryIcon from './icons/HistoryIcon';
import HeartIcon from './icons/HeartIcon';
import InspirationIcon from './icons/InspirationIcon';

type View = 'generator' | 'history' | 'favorites' | 'inspiration';

interface NavigationProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center p-3 sm:p-4 rounded-lg font-bold transition-all duration-300 ease-in-out transform hover:bg-slate-700/80 relative ${
      isActive
        ? 'bg-slate-700/70 text-cyan-400'
        : 'text-slate-400 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="hidden sm:inline ml-2">{label}</span>
    {isActive && <div className="absolute -bottom-1.5 h-1 w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />}
  </button>
);

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="flex space-x-2 sm:space-x-4 p-1.5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 rounded-xl shadow-lg">
      <NavButton
        label="Create"
        icon={<SparklesIcon className="w-5 h-5" />}
        isActive={activeView === 'generator'}
        onClick={() => setActiveView('generator')}
      />
      <NavButton
        label="Ideas"
        icon={<InspirationIcon className="w-5 h-5" />}
        isActive={activeView === 'inspiration'}
        onClick={() => setActiveView('inspiration')}
      />
      <NavButton
        label="History"
        icon={<HistoryIcon className="w-5 h-5" />}
        isActive={activeView === 'history'}
        onClick={() => setActiveView('history')}
      />
      <NavButton
        label="Favorites"
        icon={<HeartIcon className={`w-5 h-5 ${activeView === 'favorites' ? 'text-fuchsia-400' : ''}`} isFilled={activeView === 'favorites'} />}
        isActive={activeView === 'favorites'}
        onClick={() => setActiveView('favorites')}
      />
    </nav>
  );
};

export default Navigation;