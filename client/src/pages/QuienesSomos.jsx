import React from 'react';
import { Target, Eye } from 'lucide-react';

const QuienesSomos = () => {
  const pilares = [
    {
      titulo: 'Taekwondo Olímpico',
      desc: 'No somos solo una academia, somos una familia marcial dedicada al desarrollo integral de nuestros deportistas bajo los más altos estándares.',
    },
    {
      titulo: 'Metodología WT',
      desc: 'Nuestro enfoque técnico está alineado con la World Taekwondo, garantizando que el estudiante aprenda el arte marcial genuino y actualizado.',
    },
    {
      titulo: 'Formando Campeones',
      desc: 'Un campeón no solo levanta medallas en el tatami, aplica la disciplina y fuerza en su estudio, trabajo y vida.',
    },
    {
      titulo: 'Garantía del Fundador',
      desc: 'Liderazgo, responsabilidad y acompañamiento pedagógico absoluto con cada alumno, sin excepciones.',
    },
    {
      titulo: 'Formativo Especializado',
      desc: 'Enfoque pedagógico y profesional para todas las edades. Enseñanza segura, estructurada y metodológica.',
    },
    {
      titulo: 'Simbolismo Institucional',
      desc: 'Rojo vibrante (Poder y Acción), Negro carbón (Disciplina técnica), y Blanco absoluto (Pureza y lienzo en blanco).',
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);
  const logoRef = React.useRef(null);
  
  const [pilaresVisible, setPilaresVisible] = React.useState(false);
  const pilaresRef = React.useRef(null);
  
  const [misionVisible, setMisionVisible] = React.useState(false);
  const misionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === logoRef.current) setIsVisible(true);
            if (entry.target === pilaresRef.current) setPilaresVisible(true);
            if (entry.target === misionRef.current) setMisionVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (logoRef.current) observer.observe(logoRef.current);
    if (pilaresRef.current) observer.observe(pilaresRef.current);
    if (misionRef.current) observer.observe(misionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-blanco-absoluto w-full overflow-hidden pb-24">
      
      {/* HEADER GIGANTE -> NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12 border-b-4 border-carbon mb-12 flex justify-center">
        <h1 className="font-title text-[clamp(4rem,12vw,9rem)] uppercase leading-[0.85] tracking-tight text-carbon m-0 p-0 text-center mix-blend-multiply">
          NUESTRA <br/>
          <span className="text-rojo-impacto">HISTORIA</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mb-12">
        <p className="font-body text-lg font-bold max-w-4xl text-carbon leading-snug">
          "Formando campeones en el tatami con disciplina, fuerza y humildad"
        </p>
      </div>

      {/* ESCUDO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div ref={logoRef} className="w-full flex items-center justify-center relative">
            <img 
              src="/logo.png" 
              alt="Escudo Oficial Club Central" 
              className={`w-[110%] max-w-none lg:w-[130%] object-contain relative z-10 filter transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-2xl ${isVisible ? 'scale-100' : 'scale-90'}`} 
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-8 shrink-0">
          <h2 className="text-3xl sm:text-4xl font-bold font-body normal-case tracking-normal text-carbon">
            La Esencia de <br/><span className="text-rojo-impacto">Nuestro Escudo</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Representa la marcialidad pura, la agilidad en el combate y el dominio absoluto de la técnica del Taekwondo Olímpico.
          </p>
          
          <div className="border-l-2 border-gray-200 pl-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold font-body normal-case tracking-normal text-carbon mb-1">Poder & Maestría</h3>
              <p className="text-base text-gray-600">Fuerza bruta bajo control absoluto y agilidad técnica extrema.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold font-body normal-case tracking-normal text-carbon mb-1">Sabiduría & Protección</h3>
              <p className="text-base text-gray-600">Un entorno seguro donde el verdadero poder no necesita tiranía sino humildad.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEPARADOR VISUAL */}
      <div className="w-full h-px bg-gray-200 my-8 sm:my-16 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16"></div>

      {/* LOS 6 PILARES - SIMPLE & INSTITUCIONAL */}
      <div className="bg-gray-50 border-y border-gray-200 w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold font-body normal-case tracking-normal text-carbon mb-4">
              Nuestros <span className="text-rojo-impacto">6 Pilares</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Los fundamentos que guían nuestra academia y nuestra filosofía de enseñanza.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" ref={pilaresRef}>
            {pilares.map((p, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-700 ease-out transform hover:shadow-md ${
                  pilaresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-red-50 text-rojo-impacto font-body font-bold flex items-center justify-center mb-6">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold font-body normal-case tracking-normal text-carbon mb-3">{p.titulo}</h4>
                <p className="text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISIÓN Y VISIÓN - SIMPLE & INSTITUCIONAL */}
      <div 
        ref={misionRef}
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 overflow-hidden"
      >
        
        <div className={`p-8 sm:p-10 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center md:items-start text-center md:text-left transition-all duration-1000 ease-out transform ${
          misionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
        }`}>
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <Target size={28} className="text-rojo-impacto" />
          </div>
          <h3 className="text-2xl font-bold font-body normal-case tracking-normal mb-3 text-carbon">Misión Formativa</h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            Formar campeones dentro y fuera del tatami mediante una metodología estructurada, pedagógica y segura que combina el Taekwondo Olímpico y el Kickboxing.
          </p>
        </div>

        <div className={`p-8 sm:p-10 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center md:items-start text-center md:text-left transition-all duration-1000 ease-out transform ${
          misionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6">
            <Eye size={28} className="text-carbon" />
          </div>
          <h3 className="text-2xl font-bold font-body normal-case tracking-normal mb-3 text-carbon">Visión de Excelencia</h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">
            Consolidar a Club Central como la sede marcial de élite en el país, referente en formación integral, organización de eventos y preparación de atletas de selección.
          </p>
        </div>
      </div>

    </div>
  );
};

export default QuienesSomos;
