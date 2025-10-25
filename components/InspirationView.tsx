import React from 'react';
import type { InspirationItem } from '../types';
import { INSPIRATION_EXAMPLES } from '../constants';
import InspirationIcon from './icons/InspirationIcon';

interface InspirationViewProps {
  onInspirationClick: (inspiration: InspirationItem) => void;
}

const InspirationCard: React.FC<{
  item: InspirationItem;
  onClick: () => void;
  index: number;
}> = ({ item, onClick, index }) => (
  <div
    className="p-6 rounded-xl cursor-pointer shadow-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 transition-all duration-300 hover:border-cyan-500/50 hover:scale-105 hover:bg-slate-800/80 opacity-0 animate-fade-in-up"
    onClick={onClick}
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <p className="font-semibold text-slate-200 leading-tight">{item.prompt}</p>
    <p className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-bold mt-3 uppercase tracking-wider">{item.style}</p>
  </div>
);

const InspirationView: React.FC<InspirationViewProps> = ({ onInspirationClick }) => {
  return (
    <div className="animate-fade-in-up">
       <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-200 flex items-center justify-center">
          <InspirationIcon className="w-6 h-6 mr-3" />
          Looking for Ideas?
        </h3>
        <p className="text-slate-500 mt-2">Click any of these prompts to get started.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {INSPIRATION_EXAMPLES.map((item, index) => (
          <InspirationCard key={item.id} item={item} onClick={() => onInspirationClick(item)} index={index} />
        ))}
      </div>
    </div>
  );
};

export default InspirationView;