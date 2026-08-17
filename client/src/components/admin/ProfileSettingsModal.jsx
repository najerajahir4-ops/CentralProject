import React, { useState } from 'react';
import { X, User, Save, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileSettingsModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [nuevoUsuario, setNuevoUsuario] = useState(user?.usuario || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(nuevoUsuario);
      setSuccess('Perfil actualizado correctamente.');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-blanco-absoluto dark:bg-[#0A0B0E] w-full max-w-sm rounded-xl shadow-2xl border border-carbon/10 dark:border-white/10 overflow-hidden animate-slide-up" style={{ animationDuration: '0.2s' }}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-carbon/10 dark:border-white/10 bg-gray-50 dark:bg-black/20">
          <h2 className="text-sm font-bold text-carbon dark:text-white uppercase tracking-widest flex items-center gap-2">
            <User size={16} className="text-rojo-impacto" />
            Configuración de Perfil
          </h2>
          <button onClick={onClose} className="text-carbon/50 hover:text-carbon dark:text-white/50 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded flex items-center gap-2">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold rounded">
              {success}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-carbon/70 dark:text-white/70 uppercase mb-1">
              Nombre Visible (Autor)
            </label>
            <input
              type="text"
              required
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-carbon/20 dark:border-white/20 rounded focus:border-rojo-impacto focus:outline-none focus:ring-1 focus:ring-rojo-impacto text-sm text-carbon dark:text-white transition-colors"
              placeholder="Ej. Sabonim Carlos"
            />
            <p className="text-[10px] text-carbon/50 dark:text-white/40 mt-1">
              Este nombre aparecerá en las publicaciones y en el registro de auditoría.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || nuevoUsuario === user?.usuario}
            className="w-full mt-4 py-2 bg-rojo-impacto hover:bg-carbon text-white text-xs font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Save size={14} />
                Guardar Cambios
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ProfileSettingsModal;
