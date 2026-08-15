import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GiBlackBelt, GiBoxingGlove } from 'react-icons/gi';

const Home = () => {
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('manifesto-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col bg-blanco-absoluto w-full overflow-hidden">
      
      {/* HERO SECTION: INSTITUTIONAL BANNER */}
      <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center w-full px-4 sm:px-8 pt-10 pb-20 bg-blanco-absoluto overflow-hidden">
        
        {/* Subtle Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blanco-absoluto via-tatami-blanco to-gris-claro opacity-50"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 px-4">
          
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 w-full md:w-1/2 shrink-0 z-20">
            
            <h1 className="font-body font-black text-4xl sm:text-5xl lg:text-6xl text-carbon leading-[1.1] tracking-tight">
              Club Formativo<br/>
              <span className="text-rojo-impacto">Especializado Central</span>
            </h1>

            <p className="text-base sm:text-lg font-body text-carbon/70 leading-relaxed max-w-lg">
              Institución deportiva dedicada a la enseñanza, fomento y masificación del Taekwondo Olímpico en Santo Domingo de los Tsáchilas.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/contactos"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-rojo-impacto font-body font-bold text-sm tracking-wide text-blanco-absoluto rounded-full shadow-lg hover:shadow-xl hover:bg-carbon transition-all"
              >
                Inscribirse
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                to="/quienes-somos"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-blanco-absoluto font-body font-bold text-sm tracking-wide text-carbon border border-carbon/10 rounded-full hover:bg-gris-claro transition-all"
              >
                Conocer la Institución
              </Link>
            </div>
          </div>

          {/* Hero Visual Area */}
          <div className="w-full md:w-1/2 flex justify-center lg:justify-end relative mt-10 md:mt-0">
            {/* A decorative shape behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-rojo-impacto/5 rounded-full blur-3xl -z-10"></div>
            
            <img
              src="/logo.png"
              alt="Logo Club Central"
              className="w-full max-w-none lg:w-[125%] object-contain drop-shadow-2xl z-10 animate-fade-in transform md:translate-x-8 lg:translate-x-16"
            />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <button
            onClick={handleScrollDown}
            className={`transition-opacity duration-500 text-carbon/40 hover:text-rojo-impacto ${showScrollArrow ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronDown size={32} strokeWidth={2} />
          </button>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section id="manifesto-section" className="w-full bg-[#0A0B0E] py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-body text-white leading-tight mb-6 normal-case tracking-normal">
              Somos <span className="text-rojo-impacto">Club Central</span>
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-white/60 font-body mb-10 max-w-lg">
              Nuestra academia ofrece una infraestructura integral para la enseñanza marcial. Dirigidos por el Profesor Diego Pérez y el Profesor Mauricio Almeida, combinamos el arte marcial tradicional con la exigencia del deporte moderno.
            </p>
            
            <Link
              to="/quienes-somos"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-body font-medium rounded-lg transition-all border border-white/10"
            >
              Nuestra Historia 
              <ArrowRight size={18} className="text-white/40 group-hover:text-rojo-impacto group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col items-start group">
              <div className="w-12 h-12 rounded-full bg-rojo-impacto/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GiBlackBelt className="text-2xl text-rojo-impacto" />
              </div>
              <h3 className="text-xl font-bold font-body text-white mb-3 normal-case tracking-normal">Taekwondo Olímpico</h3>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed font-body">
                Velocidad, precisión y táctica. Formación desde cintas blancas hasta atletas de competencia nacional, avalados por WT.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col items-start group mt-0 sm:mt-12">
              <div className="w-12 h-12 rounded-full bg-rojo-impacto/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GiBoxingGlove className="text-2xl text-rojo-impacto" />
              </div>
              <h3 className="text-xl font-bold font-body text-white mb-3 normal-case tracking-normal">Kickboxing</h3>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed font-body">
                Poder, resistencia y acondicionamiento físico extremo. Técnica real para situaciones reales sobre el tatami.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
