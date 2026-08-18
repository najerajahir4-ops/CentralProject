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
    const whatsappUrl = `https://wa.me/593984522651?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-blanco-absoluto w-full overflow-hidden pb-24">
      
      {/* HEADER NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-8 mb-12 border-b border-gray-200">
        <h1 className="font-title text-4xl sm:text-5xl uppercase leading-none text-carbon m-0 p-0 break-words mix-blend-multiply">
          Comunícate <br/>
          con <span className="text-rojo-impacto">nosotros</span>
        </h1>
        <p className="font-body text-lg text-gray-600 mt-4 max-w-2xl leading-relaxed">
          Atención directa con los Profesores Diego Pérez y Mauricio Almeida.
        </p>
      </div>

      <div id="contact-cards-section" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* INFO Y MAPA */}
        <div className="flex flex-col space-y-8">
          
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm text-carbon">
            <h3 className="font-body font-bold text-lg mb-6 text-carbon">Sede Central</h3>
            
            <div className="space-y-4 font-body text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-rojo-impacto flex-shrink-0 mt-0.5" />
                <span>Federico Páez y Av. Jacinto Cortez<br/><span className="text-gray-400 text-xs mt-1 block">Santo Domingo, Ecuador</span></span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-rojo-impacto flex-shrink-0" />
                <span className="font-medium text-carbon text-base">+593 98 452 2651</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-rojo-impacto flex-shrink-0" />
                <span>clubsociedaddeportivacentralwt@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden h-[300px] w-full relative group bg-white shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=-0.249442,-79.187382&z=16&output=embed"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
              title="Mapa Ubicación"
              loading="lazy"
            ></iframe>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-carbon font-body font-semibold px-4 py-1.5 rounded-full text-xs shadow-sm">
              Dojang Central
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col h-full">
          <h3 className="font-body font-bold text-xl mb-6 text-carbon">Envíanos un Mensaje</h3>
          
          {submitted ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-carbon">¡Mensaje Enviado!</h4>
              <p className="text-gray-500">Te responderemos a la brevedad posible.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col h-full">
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    placeholder="Escribe tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded-md bg-white px-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Asunto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Informes de clases"
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    className="w-full border border-gray-300 rounded-md bg-white px-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="¿En qué te podemos ayudar?"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full border border-gray-300 rounded-md bg-white px-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors resize-none placeholder-gray-400"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-2.5 rounded-md bg-rojo-impacto text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group shadow-sm"
              >
                Enviar Mensaje
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contactos;
