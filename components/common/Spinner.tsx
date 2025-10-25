import React from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <svg 
      className={`animate-spin h-6 w-6 text-cyan-400 ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(34 211 238)" />
          <stop offset="100%" stopColor="rgb(96 165 250)" />
        </linearGradient>
      </defs>
      <path 
        className="opacity-25" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
        fill="currentColor"
      ></path>
      <path 
        d="M12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4z" 
        fill="url(#spinner-gradient)"
      ></path>
    </svg>
  );
};

export default Spinner;