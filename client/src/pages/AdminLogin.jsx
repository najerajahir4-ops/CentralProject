import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/estudiantes');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(usuario, password);
      navigate('/admin/estudiantes');
    } catch (err) {
      const errorData = err.response?.data?.error;
      const errorMessage = typeof errorData === 'string' 
        ? errorData 
        : (errorData?.message || 'Error del servidor (500). Verifica las variables de entorno en Vercel.');
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="relative min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-[#0A0B0E] transition-colors">
      <div class="absolute top-6 left-6 sm:top-10 sm:left-10">
        <Link to="/" class="flex items-center gap-2 text-carbon dark:text-gray-400 hover:text-rojo-impacto dark:hover:text-white transition-colors font-title text-sm tracking-widest uppercase">
          <ArrowLeft size={16} strokeWidth={3} /> VOLVER A LA WEB
        </Link>
      </div>
      <div class="bg-blanco-absoluto dark:bg-carbon border-4 border-carbon dark:border-white/10 p-8 sm:p-10 shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-2xl w-full max-w-md space-y-6 transition-colors">
        
        <div class="text-center space-y-4">
          <div class="w-40 h-40 flex items-center justify-center mx-auto mb-2">
            <img src="/admin_logo.png" alt="Club Central Admin" class="w-full h-full object-contain drop-shadow-md" />
          </div>
          <h2 class="text-2xl font-black text-carbon dark:text-white font-display tracking-widest uppercase">
            CLUB CENTRAL - ADMIN
          </h2>
          <p class="text-xs text-gray-600 dark:text-gray-400 font-body">
            Panel de gestión técnica para Taekwondo y Kickboxing Formativo Especializado.
          </p>
        </div>

        {error && (
          <div class="bg-red-50 border-2 border-rojo-impacto p-3 flex items-center gap-2 text-xs text-rojo-impacto font-bold">
            <AlertCircle size={16} class="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-xs font-black text-carbon dark:text-gray-300 uppercase mb-1">Usuario</label>
            <div class="relative">
              <User class="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder=""
                class="w-full bg-white dark:bg-black/40 border-2 border-carbon dark:border-white/10 pl-10 pr-4 py-2.5 text-xs text-carbon dark:text-white font-bold focus:outline-none focus:border-rojo-impacto shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-black text-carbon dark:text-gray-300 uppercase mb-1">Contraseña</label>
            <div class="relative">
              <Lock class="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                class="w-full bg-white dark:bg-black/40 border-2 border-carbon dark:border-white/10 pl-10 pr-4 py-2.5 text-xs text-carbon dark:text-white font-bold focus:outline-none focus:border-rojo-impacto shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            class="w-full py-3 bg-rojo-impacto hover:bg-carbon text-white text-xs font-black tracking-widest font-display uppercase border-2 border-carbon transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[0_0_15px_rgba(214,40,57,0.3)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
          >
            {submitting ? 'Verificando...' : 'INICIAR SESIÓN'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
