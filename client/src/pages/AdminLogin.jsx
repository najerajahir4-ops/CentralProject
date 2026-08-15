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
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 transition-colors">
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-carbon transition-colors font-body font-medium text-sm">
          <ArrowLeft size={16} strokeWidth={2.5} /> Volver a la Web
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md space-y-8 transition-colors">
        
        <div className="text-center space-y-2">
          <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4">
            <img src="/admin_logo.png" alt="Club Central Admin" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-carbon font-body normal-case tracking-normal">
            Panel de Administración
          </h2>
          <p className="text-sm text-gray-500 font-body leading-relaxed px-4">
            Gestión técnica de Taekwondo y Kickboxing.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2 text-sm text-rojo-impacto font-medium">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold font-body text-carbon normal-case tracking-normal">Usuario</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-carbon font-medium focus:outline-none focus:border-rojo-impacto focus:ring-4 focus:ring-rojo-impacto/10 transition-all placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold font-body text-carbon normal-case tracking-normal">Contraseña</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-carbon font-medium focus:outline-none focus:border-rojo-impacto focus:ring-4 focus:ring-rojo-impacto/10 transition-all placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 mt-2 bg-rojo-impacto hover:bg-carbon text-white text-sm font-bold font-body normal-case tracking-normal rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md"
          >
            {submitting ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
