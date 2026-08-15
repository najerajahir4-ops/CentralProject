import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Star, Video, Image as ImageIcon, MapPin, Menu, X, Lock, LogOut, ChevronDown, Calendar, Award, Facebook, Instagram } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Inicio', path: '/', icon: <Home size={16} /> },
    { name: 'Institución', path: '/quienes-somos', icon: <Info size={16} /> },
    { 
      name: 'Área Técnica', 
      icon: <Star size={16} />,
      subItems: [
        { name: 'Alumnos Destacados', path: '/alumnos-destacados', icon: <Star size={14} /> },
        { name: 'Horarios Oficiales', path: '/horarios', icon: <Calendar size={14} /> },
        { name: 'Sistema de Grados', path: '/grados', icon: <Award size={14} /> },
      ]
    },
    { 
      name: 'Multimedia', 
      icon: <Video size={16} />,
      subItems: [
        { name: 'Galería Fotográfica', path: '/galeria', icon: <ImageIcon size={14} /> },
        { name: 'Contenido Digital', path: '/contenido', icon: <Video size={14} /> },
      ]
    },
    { name: 'Contactos', path: '/contactos', icon: <MapPin size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md flex flex-col font-body">
      {/* Top Bar - White (Institutional) */}
      <div className="bg-blanco-absoluto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0">
          <div className="w-14 h-14 flex items-center justify-center">
            <img src="/admin_logo.png" alt="Club Central Logo" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="font-title text-2xl tracking-wide text-rojo-impacto leading-none mt-1">
              CLUB CENTRAL
            </span>
            <span className="text-xs text-carbon/70 font-bold tracking-widest uppercase mt-0.5">
              Taekwondo Olímpico
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Redes Sociales */}
          <div className="hidden sm:flex items-center gap-5 mr-2">
            <a href="https://www.facebook.com/share/18FkzEFAzH/" target="_blank" rel="noreferrer" className="text-carbon/60 hover:text-[#1877F2] transition-colors" title="Facebook">
              <Facebook size={18} strokeWidth={2.5} />
            </a>
            <a href="https://www.instagram.com/wt.taekwondo_sdcentral?igsh=bDZ2cjRxaTEyenA5" target="_blank" rel="noreferrer" className="text-carbon/60 hover:text-[#E4405F] transition-colors" title="Instagram">
              <Instagram size={18} strokeWidth={2.5} />
            </a>
            <a href="https://www.tiktok.com/@clubcentral_santodomingo?_r=1&_t=ZS-98t6bPDDSfl" target="_blank" rel="noreferrer" className="text-carbon/60 hover:text-black transition-colors" title="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
            </a>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin/estudiantes"
                className="hidden sm:flex items-center gap-2 px-5 py-2 bg-carbon hover:bg-carbon/80 text-blanco-absoluto text-sm font-semibold rounded-full transition-colors"
              >
                <Lock size={16} />
                <span>Panel Admin</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-carbon hover:text-rojo-impacto text-sm font-semibold transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-5 py-2 bg-carbon hover:bg-carbon/80 text-blanco-absoluto text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              <Lock size={16} />
              <span className="hidden sm:inline">Ingresar</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-carbon p-2 -mr-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Strip - Red */}
      <div className="hidden lg:flex bg-rojo-impacto w-full px-4 sm:px-6 lg:px-8 shadow-inner relative z-40">
        <nav className="max-w-7xl mx-auto flex items-center justify-center gap-1 w-full">
          {navItems.map((item) => (
            item.subItems ? (
              <div key={item.name} className="relative group">
                <button className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${item.subItems.some(sub => isActive(sub.path)) ? 'bg-black/20 text-blanco-absoluto' : 'text-blanco-absoluto/90 hover:text-blanco-absoluto hover:bg-black/10'}`}>
                  <span className="opacity-80">{item.icon}</span>
                  {item.name}
                  <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-0 w-56 bg-blanco-absoluto shadow-xl border-t-2 border-rojo-impacto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col py-2">
                    {item.subItems.map(sub => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isActive(sub.path) ? 'bg-gris-claro text-rojo-impacto' : 'text-carbon hover:bg-gris-claro hover:text-rojo-impacto'}`}
                      >
                        <span className="opacity-60">{sub.icon}</span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blanco-absoluto bg-black/20'
                    : 'text-blanco-absoluto/90 hover:text-blanco-absoluto hover:bg-black/10'
                }`}
              >
                <span className="opacity-80">{item.icon}</span>
                {item.name}
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-blanco-absoluto border-t border-carbon/10 px-4 py-2 flex flex-col shadow-lg overflow-y-auto max-h-[70vh]">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.subItems ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 py-4 text-sm font-semibold border-b border-carbon/10 text-carbon/60">
                    <span className="text-carbon/40">{item.icon}</span>
                    {item.name}
                  </div>
                  <div className="flex flex-col pl-6 border-b border-carbon/10 bg-gris-claro/30">
                    {item.subItems.map(sub => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 py-3 text-sm font-medium border-b border-carbon/5 last:border-0 ${
                          isActive(sub.path) ? 'text-rojo-impacto' : 'text-carbon/80'
                        }`}
                      >
                        <span className={isActive(sub.path) ? 'text-rojo-impacto' : 'text-carbon/40'}>{sub.icon}</span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-4 text-sm font-semibold border-b border-carbon/10 ${
                    isActive(item.path) ? 'text-rojo-impacto' : 'text-carbon/80'
                  }`}
                >
                  <span className={isActive(item.path) ? 'text-rojo-impacto' : 'text-carbon/40'}>{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
          {!isAuthenticated && (
             <Link
             to="/admin/login"
             onClick={() => setMobileOpen(false)}
             className="flex items-center gap-3 py-4 text-sm font-semibold text-carbon/80"
           >
             <span className="text-carbon/40"><Lock size={16} /></span>
             Ingresar como Admin
           </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
