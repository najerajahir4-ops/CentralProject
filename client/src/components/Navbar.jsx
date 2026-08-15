import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { name: 'INICIO', path: '/' },
    { name: 'QUIÉNES SOMOS', path: '/quienes-somos' },
    { name: 'ALUMNOS DESTACADOS', path: '/alumnos-destacados' },
    { name: 'CONTENIDO', path: '/contenido' },
    { name: 'GALERÍA', path: '/galeria' },
    { name: 'CONTACTOS', path: '/contactos' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-blanco-absoluto border-b-2 border-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Emblem */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/admin_logo.png" alt="Club Central Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-title text-xl tracking-tight text-carbon leading-none mt-1 group-hover:text-rojo-impacto transition-colors">
              CLUB CENTRAL
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-title text-sm tracking-wide uppercase px-3 py-1.5 transition-colors border-2 ${
                isActive(link.path)
                  ? 'border-carbon bg-carbon text-blanco-absoluto'
                  : 'border-transparent text-carbon hover:border-carbon hover:bg-carbon hover:text-blanco-absoluto'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons & Admin Button */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/share/18FkzEFAzH/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto transition-colors"
              title="Facebook"
            >
              <Facebook size={16} strokeWidth={2.5} />
            </a>
            <a
              href="https://www.instagram.com/wt.taekwondo_sdcentral?igsh=bDZ2cjRxaTEyenA5"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto transition-colors"
              title="Instagram"
            >
              <Instagram size={16} strokeWidth={2.5} />
            </a>
            <a
              href="https://www.tiktok.com/@clubcentral_santodomingo?_r=1&_t=ZS-98t6bPDDSfl"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto transition-colors"
              title="TikTok"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-4 border-l-2 border-carbon pl-4">
              <Link
                to="/admin/estudiantes"
                className="px-3 py-1.5 font-title text-sm tracking-wide bg-carbon text-blanco-absoluto hover:bg-rojo-impacto hover:text-blanco-absoluto transition-colors uppercase"
              >
                ÁREA TÉCNICA
              </Link>
              <button
                onClick={logout}
                className="font-title text-xs tracking-wide text-carbon hover:text-rojo-impacto uppercase transition-colors"
              >
                SALIR
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-carbon p-3 -mr-2"
          aria-label="Alternar menú móvil"
        >
          {mobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-blanco-absoluto border-b-4 border-carbon px-4 py-4 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 font-title text-lg tracking-wide uppercase border-b-2 ${
                isActive(link.path) ? 'text-rojo-impacto border-rojo-impacto' : 'text-carbon border-carbon'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 pb-2 flex items-center justify-between">
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/18FkzEFAzH/" target="_blank" rel="noreferrer" className="w-12 h-12 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto"><Facebook size={20} strokeWidth={2.5} /></a>
              <a href="https://www.instagram.com/wt.taekwondo_sdcentral?igsh=bDZ2cjRxaTEyenA5" target="_blank" rel="noreferrer" className="w-12 h-12 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto"><Instagram size={20} strokeWidth={2.5} /></a>
              <a href="https://www.tiktok.com/@clubcentral_santodomingo?_r=1&_t=ZS-98t6bPDDSfl" target="_blank" rel="noreferrer" className="w-12 h-12 border-2 border-carbon flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto hover:border-rojo-impacto">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="px-6 py-3 font-title text-base tracking-wide bg-rojo-impacto text-blanco-absoluto uppercase"
              >
                SALIR
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
