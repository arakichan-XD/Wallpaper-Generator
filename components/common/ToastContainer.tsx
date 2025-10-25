import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

type ToastMessage = { id: number; message: string; type: 'success' | 'info' };

interface ToastContainerProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const portalRoot = document.getElementById('toast-root');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </div>,
    portalRoot
  );
};

export default ToastContainer;