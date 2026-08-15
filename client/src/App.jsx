import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Moon, Sun } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

// Public Pages
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import AlumnosDestacados from './pages/AlumnosDestacados';
import Contenido from './pages/Contenido';
import ContenidoDetalle from './pages/ContenidoDetalle';
import Galeria from './pages/Galeria';
import GaleriaDetalle from './pages/GaleriaDetalle';
import GeneralGallery from './pages/GeneralGallery';
import Contactos from './pages/Contactos';
import AdminLogin from './pages/AdminLogin';
import Campeonatos from './pages/Campeonatos';
import Grados from './pages/Grados';

// Admin Pages
import EstudiantesAdmin from './pages/admin/EstudiantesAdmin';
import AsistenciaAdmin from './pages/admin/AsistenciaAdmin';
import ContenidoAdmin from './pages/admin/ContenidoAdmin';
import AlumnosDestacadosAdmin from './pages/admin/AlumnosDestacadosAdmin';
import ModulosAdmin from './pages/admin/ModulosAdmin';
import PerfilesAdmin from './pages/admin/PerfilesAdmin';
import PerfilDetalleAdmin from './pages/admin/PerfilDetalleAdmin';
import GeneralPhotosAdmin from './pages/admin/GeneralPhotosAdmin';
import AuditoriaAdmin from './pages/admin/AuditoriaAdmin';

// Sidebar Navigation for Admin
const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/admin/estudiantes', label: 'Fichas & Pagos' },
    { path: '/admin/perfiles', label: 'Perfiles' },
    { path: '/admin/asistencia', label: 'Asistencia' },
    { path: '/admin/contenido', label: 'Contenido' },
    { path: '/admin/alumnos-destacados', label: 'Destacados' },
    { path: '/admin/modulos', label: 'Configuración' },
    { path: '/admin/auditoria', label: 'Auditoría' },
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname.startsWith(path);
    return `flex items-center gap-3 py-3 px-4 transition-all uppercase tracking-widest font-body text-xs font-bold border-l-4 ${
      isActive 
        ? 'border-rojo-impacto bg-rojo-impacto/5 text-rojo-impacto' 
        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-carbon dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
    }`;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Topbar (only visible on mobile to open sidebar) */}
      <div className="lg:hidden bg-blanco-absoluto dark:bg-[#0A0B0E] border-b border-carbon dark:border-white/10 p-4 flex items-center justify-between sticky top-0 z-40 transition-colors">
        <span className="font-body font-bold text-carbon dark:text-white text-lg flex items-center gap-2 tracking-widest uppercase">
          <span className="w-3 h-3 bg-rojo-impacto"></span>
          PANEL ADMIN
        </span>
        <button onClick={() => setMobileOpen(true)} className="text-carbon dark:text-white p-3 -mr-2" aria-label="Abrir panel de administración">
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blanco-absoluto dark:bg-[#0A0B0E] border-r-4 border-carbon dark:border-white/10 shadow-[5px_0_15px_rgba(0,0,0,0.1)] dark:shadow-[5px_0_15px_rgba(0,0,0,0.5)] transform transition-transform duration-300 flex flex-col justify-between ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Top Section: Logo & Nav */}
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b-4 border-carbon dark:border-white/10 flex items-center justify-between lg:justify-center transition-colors">
            <Link to="/admin/estudiantes" onClick={() => setMobileOpen(false)} className="font-body font-black text-carbon dark:text-white text-xl flex items-center gap-2 tracking-widest uppercase text-center w-full justify-center">
              <span className="w-4 h-4 bg-rojo-impacto shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[0_0_10px_rgba(214,40,57,0.5)]"></span>
              PANEL ADMIN
            </Link>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400 hover:text-carbon dark:hover:text-white p-3 -mr-3" aria-label="Cerrar panel">
              <X size={24} />
            </button>
          </div>
          
          {/* Main Navigation Links */}
          <nav className="py-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setMobileOpen(false)}
                className={getLinkClass(link.path)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section: User Info & Logout */}
        <div className="p-4 border-t-4 border-carbon dark:border-white/10 space-y-4 transition-colors">
          <button 
            onClick={toggleTheme}
            className="w-full py-2 bg-gray-100 dark:bg-black/30 hover:bg-gray-200 dark:hover:bg-white/5 border-2 border-carbon dark:border-white/20 flex items-center justify-center gap-2 text-xs font-bold font-body uppercase tracking-widest shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none transition-colors text-carbon dark:text-gray-300"
          >
            {theme === 'light' ? (
              <><Moon size={14} /> Modo Noche</>
            ) : (
              <><Sun size={14} /> Modo Día</>
            )}
          </button>

          <Link 
            to="/" 
            onClick={() => setMobileOpen(false)} 
            className="block text-center text-[10px] text-gray-500 dark:text-gray-400 hover:text-rojo-impacto dark:hover:text-white font-body uppercase tracking-widest font-bold underline"
          >
            Ver Web Pública
          </Link>
          
          <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-black/40 p-3 border-2 border-carbon dark:border-white/20 text-[10px] font-body font-bold text-carbon dark:text-white uppercase tracking-widest shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none">
            <User size={14} className="text-rojo-impacto" />
            {user?.usuario}
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-rojo-impacto hover:bg-carbon dark:hover:bg-white dark:hover:text-carbon text-white font-body text-xs font-black tracking-widest uppercase transition-colors flex items-center justify-center border-2 border-carbon dark:border-rojo-impacto shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[0_0_15px_rgba(214,40,57,0.3)] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
          >
            CERRAR SESIÓN
          </button>
        </div>
      </aside>
    </>
  );
};

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col justify-between">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-white dark:bg-[#0A0B0E] text-carbon dark:text-white flex flex-col lg:flex-row transition-colors">
    <AdminSidebar />
    {/* Contenedor principal que deja margen izquierdo equivalente al ancho del sidebar en lg */}
    <div className="flex-grow lg:ml-64 w-full relative min-w-0 bg-[#F4F4F4] dark:bg-[#060709] transition-colors">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas Públicas */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/quienes-somos" element={<PublicLayout><QuienesSomos /></PublicLayout>} />
      <Route path="/alumnos-destacados" element={<PublicLayout><AlumnosDestacados /></PublicLayout>} />
      <Route path="/campeonatos" element={<PublicLayout><Campeonatos /></PublicLayout>} />
      <Route path="/grados" element={<PublicLayout><Grados /></PublicLayout>} />
      <Route path="/contenido" element={<PublicLayout><Contenido /></PublicLayout>} />
      <Route path="/contenido/:id" element={<PublicLayout><ContenidoDetalle /></PublicLayout>} />
      <Route path="/galeria" element={<PublicLayout><Galeria /></PublicLayout>} />
      <Route path="/galeria/generales" element={<PublicLayout><GeneralGallery /></PublicLayout>} />
      <Route path="/galeria/:id" element={<PublicLayout><GaleriaDetalle /></PublicLayout>} />
      <Route path="/contactos" element={<PublicLayout><Contactos /></PublicLayout>} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Rutas de Administración Protegidas */}
      <Route
        path="/admin/estudiantes"
        element={<ProtectedRoute><AdminLayout><EstudiantesAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/asistencia"
        element={<ProtectedRoute><AdminLayout><AsistenciaAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/contenido"
        element={<ProtectedRoute><AdminLayout><ContenidoAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/alumnos-destacados"
        element={<ProtectedRoute><AdminLayout><AlumnosDestacadosAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/modulos"
        element={<ProtectedRoute><AdminLayout><ModulosAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/perfiles"
        element={<ProtectedRoute><AdminLayout><PerfilesAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/perfiles/:id"
        element={<ProtectedRoute><AdminLayout><PerfilDetalleAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/perfiles/generales"
        element={<ProtectedRoute><AdminLayout><GeneralPhotosAdmin /></AdminLayout></ProtectedRoute>}
      />
      <Route
        path="/admin/auditoria"
        element={<ProtectedRoute><AdminLayout><AuditoriaAdmin /></AdminLayout></ProtectedRoute>}
      />
      </Routes>
    </>
  );
}

export default App;
