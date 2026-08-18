import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toastContainer = (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(toastContainer, document.body)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
