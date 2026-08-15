import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contactos = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    mensaje: '',
  });
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = (location.state && location.state.scrollTarget) || 
                         (location.search.includes('scroll=true') ? 'contact-cards-section' : null);
    if (scrollTarget) {
      const targetElement = document.getElementById(scrollTarget);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Nueva Consulta - Club Central*\n\n` +
      `- *Nombre:* ${formData.nombre}\n` +
      `- *Asunto:* ${formData.asunto}\n\n` +
      `*Mensaje:* ${formData.mensaje}`;
      
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/593983244247?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-blanco-absoluto w-full overflow-hidden pb-24">
      
      {/* HEADER NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12 border-b-4 border-carbon mb-12">
        <h1 className="font-title text-4xl sm:text-5xl uppercase leading-none text-carbon m-0 p-0 break-words mix-blend-multiply">
          COMUNÍCATE <br/>
          CON <span className="text-rojo-impacto">NOSOTROS</span>
        </h1>
        <p className="font-body text-lg font-bold mt-4 max-w-2xl text-carbon leading-snug">
          Atención directa con los Profesores Diego Pérez y Mauricio Almeida.
        </p>
      </div>

      <div id="contact-cards-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* INFO Y MAPA */}
        <div className="flex flex-col space-y-12">
          
          <div className="border-brutal p-4 sm:p-6 bg-blanco-absoluto text-carbon">
            <h3 className="font-title text-xl uppercase mb-4">SEDE CENTRAL</h3>
            
            <div className="space-y-3 font-body text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={2.5} className="text-rojo-impacto flex-shrink-0 mt-1" />
                <span>Sector Bombolí, Santo Domingo, Ecuador<br/><span className="text-carbon/60 text-xs">Plus Code: QR27+62H</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} strokeWidth={2.5} className="text-rojo-impacto flex-shrink-0" />
                <span className="font-bold text-base tracking-wide">+593 98 324 4247</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} strokeWidth={2.5} className="text-rojo-impacto flex-shrink-0" />
                <span>contacto@clubcentral.com</span>
              </div>
            </div>
          </div>

          <div className="border-brutal h-[300px] w-full relative group bg-gris-claro">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-79.192382%2C-0.254442%2C-79.182382%2C-0.244442&amp;layer=mapnik&amp;marker=-0.249442%2C-79.187382"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
              title="Mapa Ubicación"
            ></iframe>
            <div className="absolute top-4 right-4 bg-carbon text-blanco-absoluto font-title px-3 py-1 text-sm uppercase tracking-widest">
              Dojang Central
            </div>
          </div>
        </div>

        {/* FORMULARIO BRUTALISTA */}
        <div className="border-brutal p-4 sm:p-6 bg-blanco-absoluto flex flex-col h-full">
          <h3 className="font-title text-2xl sm:text-3xl uppercase mb-6 text-carbon">MENSAJE DIRECTO</h3>
          
          {submitted ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12">
              <CheckCircle2 size={64} strokeWidth={2} className="text-rojo-impacto" />
              <h4 className="text-3xl font-title uppercase text-carbon">¡LISTO!</h4>
              <p className="text-xl font-body text-carbon font-medium">Te responderemos a la brevedad.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-3 border-2 border-carbon font-title text-lg tracking-widest text-carbon hover:bg-carbon hover:text-blanco-absoluto transition-all uppercase"
              >
                OTRO MENSAJE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div>
                  <label className="block font-title text-sm uppercase text-carbon mb-1">NOMBRE Y APELLIDO</label>
                  <input
                    type="text"
                    required
                    placeholder="Escribe tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full border-2 border-carbon bg-transparent px-3 py-2 text-base text-carbon font-body font-bold focus:outline-none focus:border-rojo-impacto transition-colors placeholder-carbon/30"
                  />
                </div>

                <div>
                  <label className="block font-title text-sm uppercase text-carbon mb-1">ASUNTO PRINCIPAL</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Informes de clases"
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    className="w-full border-2 border-carbon bg-transparent px-3 py-2 text-base text-carbon font-body font-bold focus:outline-none focus:border-rojo-impacto transition-colors placeholder-carbon/30"
                  />
                </div>

                <div>
                  <label className="block font-title text-sm uppercase text-carbon mb-1">TU MENSAJE</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="¿En qué te podemos ayudar?"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full border-2 border-carbon bg-transparent px-3 py-2 text-base text-carbon font-body font-bold focus:outline-none focus:border-rojo-impacto transition-colors resize-none placeholder-carbon/30"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-carbon text-blanco-absoluto font-title text-lg uppercase hover:bg-rojo-impacto transition-colors flex items-center justify-center gap-2 group"
              >
                ENVIAR
                <Send size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contactos;
