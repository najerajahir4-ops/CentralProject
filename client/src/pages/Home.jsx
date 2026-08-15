import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

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
      
      {/* HERO SECTION: BRUTALIST MANIFESTO */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between w-full px-4 sm:px-8 lg:px-16 pt-10 pb-20 overflow-hidden">
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center order-2 lg:order-1 mt-6 lg:mt-0">
          <div className="flex flex-col items-start gap-6 lg:gap-8 max-w-3xl">
            
            {/* The Kicker */}
            <div className="flex items-start gap-4">
              <div className="h-1 w-12 sm:w-16 bg-rojo-impacto shrink-0 mt-2.5 sm:mt-3"></div>
              <span className="font-title text-base sm:text-xl tracking-widest uppercase text-carbon leading-snug">
                ACADEMIA FORMATIVA DE ALTO RENDIMIENTO
              </span>
            </div>

            {/* Mobile Logo (Between Kicker and Headline) */}
            <div className="w-[80vw] max-w-[350px] sm:w-[50vw] self-center flex lg:hidden animate-float my-2 pointer-events-none">
              <img
                src="/admin_logo.png"
                alt=""
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Massive Bleeding Headline */}
            <h1 className="text-bleed font-title text-carbon uppercase m-0 p-0 break-words drop-shadow-sm">
              DISCIPLINA<br/>
              SIN<br/>
              EXCUSAS.
            </h1>

            {/* Paragraph */}
            <p className="text-lg sm:text-xl font-body text-carbon/80 leading-relaxed font-medium border-l-4 border-rojo-impacto pl-5">
              Entrenamiento especializado en Taekwondo Olímpico y Kickboxing. No vendemos cinturones, forjamos el carácter.
            </p>
            
            {/* Action Button */}
            <div className="pt-2 w-full sm:w-auto relative z-20">
              <Link
                to="/contactos"
                className="group relative flex w-full sm:inline-flex items-center justify-center gap-4 px-6 py-4 sm:px-10 sm:py-5 bg-rojo-impacto font-title text-lg sm:text-xl tracking-widest text-blanco-absoluto uppercase transition-all hover:bg-carbon hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] sm:shadow-[6px_6px_0px_0px_rgba(13,13,13,1)] hover:shadow-[6px_6px_0px_0px_rgba(13,13,13,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]"
              >
                <span className="relative z-10">UNIRSE AHORA</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" size={24} strokeWidth={2.5} />
              </Link>
            </div>

          </div>
        </div>

        {/* Desktop Background Logo */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] opacity-100 pointer-events-none z-0 animate-float">
          <img
            src="/admin_logo.png"
            alt=""
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Scroll Indicator */}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <button
            onClick={handleScrollDown}
            className={`transition-opacity duration-500 text-carbon hover:text-rojo-impacto animate-bounce ${showScrollArrow ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronDown size={36} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section id="manifesto-section" className="w-full bg-carbon text-blanco-absoluto py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="font-title text-4xl sm:text-5xl lg:text-7xl leading-none uppercase">
              SOMOS<br/>
              <span className="text-rojo-impacto">CLUB CENTRAL</span>
            </h2>
            <p className="font-body text-base sm:text-lg lg:text-xl mt-6 leading-relaxed font-light">
              Nuestra academia ofrece una infraestructura integral para la enseñanza marcial. Dirigidos por el Profesor Diego Pérez y el Profesor Mauricio Almeida, combinamos el arte marcial tradicional con la exigencia del deporte moderno.
            </p>
            <Link
              to="/quienes-somos"
              className="inline-flex items-center gap-3 mt-8 font-title text-xl sm:text-2xl tracking-wide uppercase text-blanco-absoluto hover:text-rojo-impacto transition-colors border-b-2 border-rojo-impacto pb-1"
            >
              NUESTRA HISTORIA <ArrowRight size={24} strokeWidth={2.5} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="border-2 border-blanco-absoluto p-6 hover:bg-blanco-absoluto hover:text-carbon transition-colors group">
              <h3 className="font-title text-2xl uppercase mb-2">TAEKWONDO OLÍMPICO</h3>
              <p className="font-body text-base group-hover:font-medium">Velocidad, precisión y táctica. Formación desde cintas blancas hasta atletas de competencia nacional.</p>
            </div>
            <div className="border-2 border-blanco-absoluto p-6 hover:bg-blanco-absoluto hover:text-carbon transition-colors group">
              <h3 className="font-title text-2xl uppercase mb-2">KICKBOXING</h3>
              <p className="font-body text-base group-hover:font-medium">Poder, resistencia y acondicionamiento físico extremo. Técnica real para situaciones reales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION (NO CONTAINERS) */}
      <section className="w-full bg-blanco-absoluto py-16 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-10 border-b-4 border-carbon pb-4">
            <h2 className="font-title text-4xl sm:text-6xl leading-none uppercase text-carbon m-0">
              ACCESO<br/>RÁPIDO
            </h2>
            <p className="font-body text-lg font-bold text-carbon max-w-sm mb-1 lg:text-right">
              GESTIÓN TÉCNICA Y RECURSOS PARA ALUMNOS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
            <Link to="/alumnos-destacados" className="group flex flex-col">
              <div className="text-rojo-impacto font-title text-6xl mb-2 group-hover:-translate-y-2 transition-transform duration-300">01</div>
              <h3 className="font-title text-2xl uppercase text-carbon mb-2 border-b-2 border-transparent group-hover:border-carbon inline-block self-start transition-all">ALUMNOS DESTACADOS</h3>
              <p className="font-body text-base font-medium text-carbon/70">Conoce a nuestros atletas de élite y sus logros en competencia.</p>
            </Link>
            
            <Link to="/campeonatos" className="group flex flex-col">
              <div className="text-rojo-impacto font-title text-6xl mb-2 group-hover:-translate-y-2 transition-transform duration-300">02</div>
              <h3 className="font-title text-2xl uppercase text-carbon mb-2 border-b-2 border-transparent group-hover:border-carbon inline-block self-start transition-all">CAMPEONATOS</h3>
              <p className="font-body text-base font-medium text-carbon/70">Calendario de torneos, seminarios y eventos oficiales.</p>
            </Link>

            <Link to="/grados" className="group flex flex-col">
              <div className="text-rojo-impacto font-title text-6xl mb-2 group-hover:-translate-y-2 transition-transform duration-300">03</div>
              <h3 className="font-title text-2xl uppercase text-carbon mb-2 border-b-2 border-transparent group-hover:border-carbon inline-block self-start transition-all">SISTEMA DE GRADOS</h3>
              <p className="font-body text-base font-medium text-carbon/70">Requisitos de examinación y programa técnico por cinturón.</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
