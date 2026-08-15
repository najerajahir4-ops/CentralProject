import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Moon, Sun, Users, Settings, ShieldCheck, FileText, Star, CalendarDays, LogOut } from 'lucide-react';
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
import Horarios from './pages/Horarios';
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
    { path: '/admin/estudiantes', label: 'Fichas & Pagos', icon: Users },
    { path: '/admin/perfiles', label: 'Perfiles', icon: User },
    { path: '/admin/asistencia', label: 'Asistencia', icon: CalendarDays },
    { path: '/admin/contenido', label: 'Contenido', icon: FileText },
    { path: '/admin/alumnos-destacados', label: 'Destacados', icon: Star },
    { path: '/admin/modulos', label: 'Configuración', icon: Settings },
    { path: '/admin/auditoria', label: 'Auditoría', icon: ShieldCheck },
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname.startsWith(path);
    return `flex items-center gap-3 py-2.5 px-4 transition-all font-body text-sm font-medium border-l-2 ${
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blanco-absoluto dark:bg-[#0A0B0E] border-r border-carbon/10 dark:border-white/10 shadow-lg transform transition-transform duration-300 flex flex-col justify-between ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Top Section: Logo & Nav */}
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-carbon/10 dark:border-white/10 flex items-center justify-between lg:justify-center transition-colors">
            <Link to="/admin/estudiantes" onClick={() => setMobileOpen(false)} className="font-body font-semibold text-carbon dark:text-white text-lg flex items-center gap-2 tracking-wide text-center w-full justify-center">
              <span className="w-3 h-3 rounded-full bg-rojo-impacto"></span>
              Panel Admin
            </Link>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400 hover:text-carbon dark:hover:text-white p-3 -mr-3" aria-label="Cerrar panel">
              <X size={20} />
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
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section: User Info & Logout */}
        <div className="p-4 border-t border-carbon/10 dark:border-white/10 space-y-3 transition-colors">
          <button 
            onClick={toggleTheme}
            className="w-full py-2 bg-gray-50 dark:bg-black/30 hover:bg-gray-100 dark:hover:bg-white/5 border border-carbon/20 dark:border-white/20 flex items-center justify-center gap-2 text-xs font-medium font-body rounded-md transition-colors text-carbon dark:text-gray-300"
          >
            {theme === 'light' ? (
              <><Moon size={14} /> Modo Noche</>
            ) : (
              <><Sun size={14} /> Modo Día</>
            )}
          </button>

          <div className="flex items-center justify-between bg-gray-50 dark:bg-black/40 p-3 border border-carbon/20 dark:border-white/20 rounded-md">
            <div className="flex items-center gap-2 text-xs font-body font-medium text-carbon dark:text-white">
              <User size={14} className="text-rojo-impacto" />
              <span className="truncate max-w-[100px]">{user?.usuario}</span>
            </div>
            <Link 
              to="/" 
              onClick={() => setMobileOpen(false)} 
              className="text-[10px] text-gray-500 hover:text-rojo-impacto underline"
            >
              Ver Web
            </Link>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-rojo-impacto/10 hover:bg-rojo-impacto text-rojo-impacto hover:text-white font-body text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

const PublicLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main key={location.pathname} className="flex-grow animate-slide-up" style={{ animationDuration: '0.3s' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B0E] text-carbon dark:text-white flex flex-col lg:flex-row transition-colors">
      <AdminSidebar />
      {/* Contenedor principal que deja margen izquierdo equivalente al ancho del sidebar en lg */}
      <div className="flex-grow lg:ml-64 w-full relative min-w-0 bg-[#F4F4F4] dark:bg-[#060709] transition-colors">
        <main key={location.pathname} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up" style={{ animationDuration: '0.3s' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas Públicas */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/quienes-somos" element={<PublicLayout><QuienesSomos /></PublicLayout>} />
      <Route path="/alumnos-destacados" element={<PublicLayout><AlumnosDestacados /></PublicLayout>} />
      <Route path="/horarios" element={<PublicLayout><Horarios /></PublicLayout>} />
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
