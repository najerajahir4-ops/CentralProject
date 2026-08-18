import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Sí, Eliminar" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center space-y-4 py-2">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-500 mb-2">
          <AlertTriangle size={32} />
        </div>
        <p className="text-carbon dark:text-white font-medium text-lg">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 sm:gap-4 w-full mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-white bg-rojo-impacto hover:bg-red-700 shadow-lg shadow-red-500/30 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
