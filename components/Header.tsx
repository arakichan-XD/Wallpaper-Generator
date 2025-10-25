import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-sm">
        AI Wallpaper Generator
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-3xl mx-auto">
        Craft stunning wallpapers for your devices. Describe your vision, select a style, and let AI bring it to life.
      </p>
    </header>
  );
};

export default Header;