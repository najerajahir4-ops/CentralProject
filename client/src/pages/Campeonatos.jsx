import React from 'react';
import { GitMerge, Calendar, Trophy, MapPin } from 'lucide-react';

const Campeonatos = () => {
  const events = [
    {
      id: 1,
      name: 'Copa Nacional Abierta de Taekwondo WT 2026',
      date: '2026-08-15',
      place: 'Coliseo Polideportivo Central',
      disciplina: 'TAEKWONDO',
      bracketStatus: 'Llaves Publicadas',
    },
    {
      id: 2,
      name: 'Torneo Abierto de Kickboxing Striking Championship',
      date: '2026-09-20',
      place: 'Arena Marcial Metropolitana',
      disciplina: 'KICKBOXING',
      bracketStatus: 'Inscripciones Abiertas',
    },
  ];

  return (
    <div className="bg-blanco-absoluto w-full min-h-screen pb-24">
      
      {/* HEADER NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12 border-b-4 border-carbon mb-12">
        <h1 className="font-title text-4xl sm:text-5xl uppercase leading-none text-carbon m-0 p-0 break-words mix-blend-multiply">
          CAMPEONATOS <br/>
          & <span className="text-rojo-impacto">LLAVES</span>
        </h1>
        <p className="font-body text-lg font-bold mt-4 max-w-2xl text-carbon leading-snug">
          Consulta las próximas fechas oficiales, brackets y resultados de nuestros atletas.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {events.map((event) => (
            <div key={event.id} className="border-4 border-carbon bg-blanco-absoluto flex flex-col group transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)] relative overflow-hidden">
              
              {/* Cabecera de la Placa */}
              <div className="p-4 border-b-4 border-carbon flex flex-wrap items-center justify-between bg-gris-claro gap-4">
                <span className="px-4 py-1.5 text-sm font-title uppercase bg-carbon text-blanco-absoluto tracking-widest">
                  {event.disciplina}
                </span>
                <span className="px-4 py-1.5 text-sm font-title uppercase border-2 border-carbon text-carbon tracking-widest bg-blanco-absoluto">
                  {event.bracketStatus}
                </span>
              </div>

              {/* Info Principal */}
              <div className="p-8 space-y-6 flex-grow bg-blanco-absoluto">
                <h3 className="text-3xl font-title text-carbon uppercase leading-tight group-hover:text-rojo-impacto transition-colors">
                  {event.name}
                </h3>

                <div className="space-y-4 font-body text-base font-bold text-carbon/80 uppercase tracking-widest">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-carbon text-carbon bg-gris-claro">
                      <Calendar size={20} />
                    </div>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-carbon text-carbon bg-gris-claro">
                      <MapPin size={20} />
                    </div>
                    <span className="leading-tight">{event.place}</span>
                  </div>
                </div>
              </div>

              {/* Footer de Acción */}
              <div className="p-6 border-t-4 border-carbon flex flex-col sm:flex-row items-center justify-between bg-blanco-absoluto gap-4">
                <div className="flex items-center gap-2 text-sm font-title font-bold text-carbon uppercase tracking-widest">
                  <GitMerge size={20} className="text-rojo-impacto" />
                  <span>Bracket Disponible</span>
                </div>
                <button className="w-full sm:w-auto px-8 py-3 bg-rojo-impacto border-2 border-carbon text-blanco-absoluto font-title text-base tracking-widest uppercase hover:bg-carbon transition-colors">
                  VER LLAVES
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Campeonatos;
