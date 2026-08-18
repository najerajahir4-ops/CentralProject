import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ id, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));
    
    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for exit animation
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const Icon = type === 'success' ? CheckCircle : XCircle;
  const bgColor = type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
  const iconColor = type === 'success' ? 'text-emerald-500' : 'text-rojo-impacto';

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-xl shadow-lg border backdrop-blur-sm pointer-events-auto transition-all duration-300 transform ${bgColor} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      <p className="text-sm font-medium text-carbon dark:text-gray-200 flex-grow pr-4">
        {message}
      </p>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
