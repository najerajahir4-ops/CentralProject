import React from 'react';
import { Target, Eye } from 'lucide-react';

const QuienesSomos = () => {
  const pilares = [
    {
      titulo: 'El Sello Circular',
      desc: 'No somos solo una academia, somos una familia marcial. El formato circular simboliza el ciclo continuo de aprendizaje, unidad y perfección.',
    },
    {
      titulo: 'El Dragón Guardián',
      desc: 'El dragón oriental enroscado representa el flujo perfecto entre la fluidez del Taekwondo y el poder destructivo del Kickboxing.',
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
      titulo: 'Simbolismo del Color',
      desc: 'Rojo vibrante (Poder y Acción), Negro carbón (Disciplina técnica), y Blanco absoluto (Pureza y lienzo en blanco).',
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-blanco-absoluto w-full overflow-hidden pb-24">
      
      {/* HEADER GIGANTE -> NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12 border-b-4 border-carbon mb-12">
        <h1 className="font-title text-4xl sm:text-5xl uppercase leading-none text-carbon m-0 p-0 break-words mix-blend-multiply">
          NUESTRA <br/>
          <span className="text-rojo-impacto">HISTORIA</span>
        </h1>
        <p className="font-body text-lg font-bold mt-4 max-w-4xl text-carbon leading-snug">
          "Formando campeones en el tatami con disciplina, fuerza y humildad"
        </p>
      </div>

      {/* EL DRAGÓN - ASIMETRÍA BRUTAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-12 items-center">
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <div ref={logoRef} className="w-full max-w-sm aspect-square flex items-center justify-center relative">
            <img 
              src="/admin_logo.png" 
              alt="Escudo Club Central" 
              className={`w-full h-full object-contain relative z-10 filter transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-2xl ${isVisible ? 'scale-100' : 'scale-90'}`} 
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-title uppercase leading-tight text-carbon">
            EL DRAGÓN EN <br/>NUESTRO ESCUDO
          </h2>
          <p className="text-lg font-body font-medium text-carbon leading-relaxed">
            Representa la fuerza elemental controlada, la agilidad y el dominio absoluto de la técnica.
          </p>
          
          <div className="border-l-4 border-carbon pl-6 space-y-6">
            <div>
              <h3 className="font-title text-xl uppercase text-carbon mb-1">PODER & MAESTRÍA</h3>
              <p className="font-body text-base text-carbon/80 font-medium">Fuerza bruta bajo control absoluto y agilidad técnica extrema.</p>
            </div>
            <div>
              <h3 className="font-title text-xl uppercase text-carbon mb-1">SABIDURÍA & PROTECCIÓN</h3>
              <p className="font-body text-base text-carbon/80 font-medium">Un entorno seguro donde el verdadero poder no necesita tiranía sino humildad.</p>
            </div>
          </div>
        </div>
      </div>

      {/* LOS 6 PILARES - GRID MASIVO */}
      <div className="bg-carbon text-blanco-absoluto w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-16 mt-8 sm:mt-16 border-y-4 border-carbon shadow-[0_4px_0px_0px_rgba(220,38,38,1)] sm:shadow-[0_8px_0px_0px_rgba(220,38,38,1)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-title text-4xl sm:text-5xl lg:text-6xl uppercase leading-none mb-10 sm:mb-16">
            LOS 6 <span className="text-rojo-impacto">PILARES</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {pilares.map((p, idx) => (
              <div key={idx} className="border-2 border-blanco-absoluto p-5 sm:p-8 hover:bg-blanco-absoluto hover:text-carbon transition-colors group flex flex-col">
                <div className="font-title text-5xl sm:text-6xl text-rojo-impacto mb-2 sm:mb-4 group-hover:-translate-y-1 transition-transform">0{idx + 1}</div>
                <h4 className="text-xl sm:text-2xl font-title uppercase mb-2 sm:mb-3">{p.titulo}</h4>
                <p className="text-sm sm:text-base font-body font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISIÓN Y VISIÓN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        <div className="border-4 p-6 sm:p-10 bg-rojo-impacto text-blanco-absoluto border-carbon hover:-translate-y-2 transition-transform shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] sm:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]">
          <Target size={40} strokeWidth={2.5} className="mb-4 sm:mb-6 text-carbon sm:w-12 sm:h-12" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-title uppercase mb-3 sm:mb-6 text-carbon">MISIÓN FORMATIVA</h3>
          <p className="font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
            Formar campeones dentro y fuera del tatami mediante una metodología estructurada, pedagógica y segura que combina el Taekwondo Olímpico y el Kickboxing.
          </p>
        </div>

        <div className="border-4 p-6 sm:p-10 bg-blanco-absoluto text-carbon hover:-translate-y-2 transition-transform shadow-[4px_4px_0px_0px_rgba(13,13,13,1)] sm:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]">
          <Eye size={40} strokeWidth={2.5} className="mb-4 sm:mb-6 text-rojo-impacto sm:w-12 sm:h-12" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-title uppercase mb-3 sm:mb-6">VISIÓN DE EXCELENCIA</h3>
          <p className="font-body text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
            Consolidar a Club Central como la sede marcial de élite en el país, referente en formación integral, organización de eventos y preparación de atletas de selección.
          </p>
        </div>
      </div>

    </div>
  );
};

export default QuienesSomos;
