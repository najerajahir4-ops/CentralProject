import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-carbon text-blanco-absoluto pt-12 pb-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-blanco-absoluto p-1.5">
              <img src="/admin_logo.png" alt="Club Central Logo" className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-title text-xl text-blanco-absoluto uppercase leading-none group-hover:text-rojo-impacto transition-colors">
                CLUB CENTRAL
              </span>
            </div>
          </div>
          <p className="font-body text-sm font-medium text-blanco-absoluto/80 leading-snug">
            Formación integral en Taekwondo Olímpico y Kickboxing de alto rendimiento con estricta disciplina marcial.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://www.facebook.com/share/18FkzEFAzH/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-blanco-absoluto flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto transition-colors">
              <Facebook size={18} strokeWidth={2.5} />
            </a>
            <a href="https://www.instagram.com/wt.taekwondo_sdcentral?igsh=bDZ2cjRxaTEyenA5" target="_blank" rel="noreferrer" className="w-10 h-10 bg-blanco-absoluto flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto transition-colors">
              <Instagram size={18} strokeWidth={2.5} />
            </a>
            <a href="https://www.tiktok.com/@clubcentral_santodomingo?_r=1&_t=ZS-98t6bPDDSfl" target="_blank" rel="noreferrer" className="w-10 h-10 bg-blanco-absoluto flex items-center justify-center text-carbon hover:bg-rojo-impacto hover:text-blanco-absoluto transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h4 className="font-title text-xl uppercase text-blanco-absoluto border-b-2 border-rojo-impacto pb-1.5 inline-block">
            HORARIOS
          </h4>
          
          <div className="space-y-3 font-body text-sm">
            <div>
              <p className="font-title text-base text-rojo-impacto uppercase mb-0.5">MAÑANA (MAR - JUE)</p>
              <p className="font-medium text-blanco-absoluto/90">8:30 a.m. - 10:00 a.m. <span className="block sm:inline text-xs text-blanco-absoluto/50 uppercase mt-1 sm:mt-0">(Todas las edades)</span></p>
            </div>
            <div>
              <p className="font-title text-base text-rojo-impacto uppercase mb-0.5">TARDE (LUN - VIE)</p>
              <ul className="font-medium text-blanco-absoluto/90 space-y-1.5">
                <li>3:00 p.m. - 4:00 p.m. <span className="block sm:inline text-xs text-blanco-absoluto/50 uppercase mt-1 sm:mt-0">(4 a 6 años)</span></li>
                <li>4:00 p.m. - 5:00 p.m. <span className="block sm:inline text-xs text-blanco-absoluto/50 uppercase mt-1 sm:mt-0">(7 a 10 años)</span></li>
                <li>5:00 p.m. - 6:20 p.m. <span className="block sm:inline text-xs text-blanco-absoluto/50 uppercase mt-1 sm:mt-0">(11+ años)</span></li>
              </ul>
            </div>
            <div>
              <p className="font-title text-base text-rojo-impacto uppercase mb-0.5">SÁBADO INTENSIVO</p>
              <p className="font-medium text-blanco-absoluto/90">10:30 a.m. - 12:30 p.m. <span className="block sm:inline text-xs text-blanco-absoluto/50 uppercase mt-1 sm:mt-0">(Desde 7 años)</span></p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-title text-xl uppercase text-blanco-absoluto border-b-2 border-rojo-impacto pb-1.5 inline-block">
            SITIO
          </h4>
          
          <ul className="space-y-1 font-title text-base uppercase">
            <li><Link to="/" className="block py-1.5 text-blanco-absoluto hover:text-rojo-impacto transition-colors">INICIO</Link></li>
            <li><Link to="/quienes-somos" className="block py-1.5 text-blanco-absoluto hover:text-rojo-impacto transition-colors">HISTORIA</Link></li>
            <li><Link to="/alumnos-destacados" className="block py-1.5 text-blanco-absoluto hover:text-rojo-impacto transition-colors">ATLETAS</Link></li>
            <li><Link to="/contactos" className="block py-1.5 text-blanco-absoluto hover:text-rojo-impacto transition-colors">CONTACTO</Link></li>
            <li><Link to="/admin/login" className="block py-2 mt-2 text-blanco-absoluto hover:text-rojo-impacto transition-colors">ÁREA TÉCNICA</Link></li>
          </ul>
        </div>

        {/* Location Contact */}
        <div className="space-y-4">
          <h4 className="font-title text-xl uppercase text-blanco-absoluto border-b-2 border-rojo-impacto pb-1.5 inline-block">
            SEDE CENTRAL
          </h4>
          
          <ul className="space-y-3 font-body text-sm font-medium text-blanco-absoluto/90">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-rojo-impacto flex-shrink-0 mt-0.5" />
              <span>Santo Domingo, Ecuador<br/><span className="block text-xs text-blanco-absoluto/50 uppercase mt-1">Sector Bombolí</span></span>
            </li>
            <li className="flex items-center gap-3 py-1">
              <Phone size={20} className="text-rojo-impacto flex-shrink-0" />
              <span className="font-bold text-lg tracking-tight">+593 98 324 4247</span>
            </li>
            <li className="flex items-center gap-3 py-1">
              <Mail size={20} className="text-rojo-impacto flex-shrink-0" />
              <span className="truncate">contacto@clubcentral.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-12 pt-6 border-t-2 border-blanco-absoluto/10 flex flex-col md:flex-row items-center justify-between gap-4 font-title text-xs md:text-sm text-blanco-absoluto/50 uppercase text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} CLUB CENTRAL.</p>
        <p>SISTEMA DE GESTIÓN MARCIAL</p>
      </div>
    </footer>
  );
};

export default Footer;
