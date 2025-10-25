import React, { useState, useEffect } from 'react';
import CheckIcon from '../icons/CheckIcon';
import HeartIcon from '../icons/HeartIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger enter animation
    const timer = setTimeout(() => {
      setVisible(false); // Trigger exit animation
    }, 2700); // Start fade out before it's removed from parent
    return () => clearTimeout(timer);
  }, []);

  const iconMap = {
    success: <CheckIcon className="w-6 h-6 text-green-400" />,
    info: <HeartIcon className="w-5 h-5 text-fuchsia-400" />,
  };
  
  const colorMap = {
      success: 'bg-green-900/70 ring-green-500/50',
      info: 'bg-fuchsia-900/70 ring-fuchsia-500/50',
  }

  return (
    <div
      role="status"
      className={`
        max-w-sm w-full backdrop-blur-sm shadow-lg rounded-xl pointer-events-auto ring-1 overflow-hidden
        transition-all duration-300 ease-in-out
        ${colorMap[type]}
        ${visible ? 'transform opacity-100 translate-y-0 sm:translate-x-0' : 'transform opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2'}
      `}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {iconMap[type]}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-semibold text-slate-200">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;