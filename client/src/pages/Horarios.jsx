import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { GiSunrise, GiHighKick, GiTrophyCup } from 'react-icons/gi';
import { FaChildReaching, FaDumbbell } from 'react-icons/fa6';

const Horarios = () => {
  const schedules = [
    {
      title: 'Mañana',
      days: 'Martes y Jueves',
      time: '8:30 a.m. - 10:00 a.m.',
      target: 'Todas las edades',
      icon: GiSunrise,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      title: 'Infantil',
      days: 'Lunes, Miércoles y Viernes',
      time: '4:00 p.m. - 5:00 p.m.',
      target: 'Niños principiantes e intermedios',
      icon: FaChildReaching,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Juvenil',
      days: 'Lunes, Miércoles y Viernes',
      time: '5:00 p.m. - 6:00 p.m.',
      target: 'Adolescentes',
      icon: GiHighKick,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Adultos',
      days: 'Lunes, Miércoles y Viernes',
      time: '6:00 p.m. - 7:00 p.m.',
      target: 'Adultos en general',
      icon: FaDumbbell,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      title: 'Selección',
      days: 'Lunes, Miércoles y Viernes',
      time: '7:00 p.m. - 8:30 p.m.',
      target: 'Equipo de élite',
      icon: GiTrophyCup,
      color: 'text-rojo-impacto',
      bg: 'bg-red-50'
    }
  ];

  return (
    <div className="bg-blanco-absoluto w-full min-h-screen pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-8 mb-12 border-b border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-bold text-carbon font-body normal-case tracking-normal">
          Horarios <span className="text-rojo-impacto">Oficiales</span>
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl leading-relaxed">
          Nuestros horarios de entrenamiento están diseñados para adaptarse a diferentes edades y niveles de experiencia.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-full ${schedule.bg} flex items-center justify-center mb-6`}>
                <schedule.icon size={24} className={schedule.color} />
              </div>
              
              <h3 className="text-xl font-bold text-carbon mb-2 font-body normal-case tracking-normal">{schedule.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{schedule.target}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{schedule.days}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-carbon">
                  <Clock size={16} className="text-rojo-impacto" />
                  <span>{schedule.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner de contacto */}
        <div className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-carbon mb-1 font-body normal-case tracking-normal">¿Deseas una clase de prueba?</h4>
            <p className="text-sm text-gray-600">Comunícate con nosotros para agendar tu primera clase gratis y conocer nuestras instalaciones.</p>
          </div>
          <a href="/contactos" className="px-6 py-2.5 bg-rojo-impacto text-white font-medium rounded-full hover:bg-red-700 transition-colors whitespace-nowrap shadow-sm">
            Contactar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Horarios;
