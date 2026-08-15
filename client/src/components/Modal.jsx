import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div class="bg-blanco-absoluto dark:bg-[#0A0B0E] border-4 border-carbon dark:border-white/10 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden transition-colors">
        {/* Header */}
        <div class="px-6 py-4 border-b-4 border-carbon dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-carbon/60 transition-colors">
          <h3 class="text-xl font-black text-carbon dark:text-white font-body uppercase tracking-widest">{title}</h3>
          <button
            onClick={onClose}
            class="text-carbon dark:text-gray-400 hover:text-rojo-impacto dark:hover:text-white transition-colors p-1"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div class="p-6 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
