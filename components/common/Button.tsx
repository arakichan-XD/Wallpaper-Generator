import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = `
    flex items-center justify-center px-6 py-2 
    font-bold rounded-lg shadow-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200 ease-in-out transform active:scale-[0.98]
  `;

  const variants = {
    primary: `
      text-white 
      bg-gradient-to-r from-cyan-500 to-blue-500
      hover:from-cyan-400 hover:to-blue-400
      focus:ring-cyan-500
      disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400
    `,
    secondary: `
      text-slate-200
      bg-slate-700
      hover:bg-slate-600
      focus:ring-slate-500
      disabled:bg-slate-800 disabled:text-slate-500
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;