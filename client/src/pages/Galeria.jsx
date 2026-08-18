import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, AlertCircle, Loader, Filter, Camera } from 'lucide-react';
import API from '../services/api';
import { getBeltStyle } from '../utils/belt-colors';

const Galeria = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [rankFilter, setRankFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await API.get('/students/public');
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.nombres.toLowerCase().includes(search.toLowerCase()) ||
                          s.apellidos.toLowerCase().includes(search.toLowerCase());
    const matchesRank = rankFilter === '' || (s.grado && s.grado.toLowerCase().includes(rankFilter.toLowerCase()));
    
    return matchesSearch && matchesRank;
  });

  const availableRanks = ['Blanco', 'Amarillo', 'Naranja', 'Verde', 'Azul', 'Morado', 'Marrón', 'Rojo', 'Negro', 'Dan', 'Poom'];

  return (
    <div className="bg-blanco-absoluto w-full min-h-screen pb-24">
      
      {/* HEADER NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-8 mb-12 border-b border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-bold font-body normal-case tracking-normal text-carbon">
          Salón de <span className="text-rojo-impacto">Campeones</span>
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl">
          El registro oficial de nuestros artistas marciales. Disciplina, enfoque y legado.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* PANEL DE FILTROS */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 w-full md:w-1/2 relative">
            <Search className="text-gray-400 absolute left-3" size={18} />
            <input
              type="text"
              placeholder="Buscar nombre o cédula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-1/2">
            <div className="flex items-center gap-2 w-full relative">
              <Filter className="text-gray-400 absolute left-3" size={16} />
              <select 
                value={rankFilter}
                onChange={(e) => setRankFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todos los rangos</option>
                {availableRanks.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-carbon focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 focus:border-rojo-impacto transition-colors appearance-none cursor-pointer"
              >
                <option value="">Categoría</option>
                <option value="infantil">Infantil</option>
                <option value="juvenil">Juvenil</option>
                <option value="adulto">Adulto</option>
              </select>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader className="animate-spin text-rojo-impacto" size={64} strokeWidth={3} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full py-24 text-center border border-gray-200 bg-gray-50 rounded-xl flex flex-col items-center justify-center p-8 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <AlertCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sin Registros
                </h3>
                <p className="text-sm text-gray-500">
                  No se encontraron estudiantes con esos criterios de búsqueda.
                </p>
              </div>
            ) : (
              <>
                {/* Placa General */}
                {search === '' && rankFilter === '' && categoryFilter === '' && (
                  <Link 
                    to={`/galeria/generales`}
                    className="group flex flex-col border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[4/5] bg-gray-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat opacity-5 scale-150"></div>
                      
                      <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center mb-6 bg-white relative z-10 group-hover:bg-rojo-impacto group-hover:border-rojo-impacto transition-colors shadow-sm">
                        <Camera className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                      </div>
                      
                      <p className="font-body font-bold text-2xl text-carbon mb-1 relative z-10">
                        Fotos Generales
                      </p>
                      <p className="font-body text-sm font-medium text-rojo-impacto relative z-10 tracking-wide">
                        ÁLBUM OFICIAL
                      </p>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100">
                      <span className="font-body font-semibold text-xs text-gray-500 uppercase tracking-wider">Acceso Público</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rojo-impacto transition-colors" strokeWidth={2.5} />
                      </div>
                    </div>
                  </Link>
                )}

                {/* Placas de Estudiantes */}
                {filteredStudents.map((student) => {
                  const belt = getBeltStyle(student.grado || '');
                  return (
                    <Link 
                      key={student.id} 
                      to={`/galeria/${student.id}`}
                      className="group flex flex-col border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                        {student.foto ? (
                          <img 
                            src={student.foto} 
                            alt={student.nombres} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
                            <div className="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                              <span className="font-body font-bold text-3xl text-gray-400">
                                {student.nombres?.charAt(0)}{student.apellidos?.charAt(0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* INFO Y ANCLAJE DE RANGO */}
                      <div className="bg-white relative flex flex-col justify-between p-5 min-h-[140px]">
                        <div>
                          <p className="font-body font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2 group-hover:text-rojo-impacto transition-colors">
                            {student.nombres} {student.apellidos}
                          </p>
                          <p className="font-body font-medium text-gray-500 text-xs uppercase tracking-wider">
                            {student.grado || 'SIN GRADO'}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-3">
                          <span className="font-body font-semibold text-[11px] text-gray-400 uppercase tracking-widest">
                            VER REGISTRO
                          </span>
                          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                            <ChevronRight size={14} className="text-gray-400 group-hover:text-rojo-impacto transition-colors" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Línea de Cinturón Suave */}
                      <div className="relative border-t border-gray-100 h-2 w-full flex items-center justify-center overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
                        <div 
                          className="absolute inset-0"
                          style={{ backgroundColor: belt.backgroundColor }}
                        ></div>
                        {belt.isBlackBelt && (
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-red-600 z-20"></div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Galeria;
