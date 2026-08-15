import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, AlertCircle, Loader, Filter } from 'lucide-react';
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
        const { data } = await API.get('/students');
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
                          s.apellidos.toLowerCase().includes(search.toLowerCase()) ||
                          s.cedula.includes(search);
    const matchesRank = rankFilter === '' || (s.grado && s.grado.toLowerCase().includes(rankFilter.toLowerCase()));
    
    return matchesSearch && matchesRank;
  });

  const availableRanks = ['Blanco', 'Amarillo', 'Naranja', 'Verde', 'Azul', 'Morado', 'Marrón', 'Rojo', 'Negro', 'Dan', 'Poom'];

  return (
    <div className="bg-blanco-absoluto w-full min-h-screen pb-24">
      
      {/* HEADER NORMALIZADO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-12 border-b-4 border-carbon mb-12">
        <h1 className="font-title text-4xl sm:text-5xl uppercase leading-none text-carbon m-0 p-0 break-words mix-blend-multiply">
          SALÓN DE <br/>
          <span className="text-rojo-impacto">CAMPEONES</span>
        </h1>
        <p className="font-body text-lg font-bold mt-4 max-w-2xl text-carbon leading-snug">
          El registro oficial de nuestros artistas marciales. Disciplina, enfoque y legado.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* PANEL DE FILTROS BRUTALISTA */}
        <div className="border-brutal p-3 mb-10 flex flex-col md:flex-row gap-3 items-center bg-gris-claro">
          <div className="flex items-center gap-2 w-full md:w-1/2 bg-blanco-absoluto border-2 border-carbon px-3 py-2">
            <Search className="text-carbon flex-shrink-0" size={18} strokeWidth={2.5} />
            <input
              type="text"
              placeholder="BUSCAR NOMBRE O CÉDULA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-sm text-carbon font-title uppercase placeholder-carbon/40 focus:outline-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-1/2">
            <div className="flex items-center gap-2 w-full border-2 border-carbon bg-blanco-absoluto px-3 py-2">
              <Filter className="text-carbon flex-shrink-0" size={16} strokeWidth={2.5} />
              <select 
                value={rankFilter}
                onChange={(e) => setRankFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-carbon font-title uppercase cursor-pointer focus:outline-none appearance-none"
              >
                <option value="">TODOS LOS RANGOS</option>
                {availableRanks.map(r => (
                  <option key={r} value={r}>{r.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full border-2 border-carbon bg-blanco-absoluto px-3 py-2">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-carbon font-title uppercase cursor-pointer focus:outline-none appearance-none"
              >
                <option value="">CATEGORÍA</option>
                <option value="infantil">INFANTIL</option>
                <option value="juvenil">JUVENIL</option>
                <option value="adulto">ADULTO</option>
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
              <div className="col-span-full py-24 text-center border-4 border-carbon border-dashed flex flex-col items-center justify-center p-8">
                <AlertCircle size={64} strokeWidth={2} className="text-carbon mb-6" />
                <p className="font-title text-4xl text-carbon uppercase mb-4">
                  SIN REGISTROS
                </p>
                <p className="font-body text-lg font-medium text-carbon/60">
                  No se encontraron estudiantes con esos criterios de búsqueda.
                </p>
              </div>
            ) : (
              <>
                {/* Placa General */}
                {search === '' && rankFilter === '' && categoryFilter === '' && (
                  <Link 
                    to={`/galeria/generales`}
                    className="group flex flex-col border-brutal bg-blanco-absoluto transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]"
                  >
                    <div className="aspect-[4/5] bg-gris-claro border-b-2 border-carbon flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat opacity-5 scale-150"></div>
                      <div className="w-20 h-20 border-4 border-carbon flex items-center justify-center mb-6 bg-blanco-absoluto relative z-10 group-hover:bg-rojo-impacto group-hover:text-blanco-absoluto transition-colors">
                        <span className="text-4xl">📸</span>
                      </div>
                      <p className="font-title text-3xl text-carbon uppercase leading-none mb-2 relative z-10">
                        FOTOS GENERALES
                      </p>
                      <p className="font-body font-bold text-sm uppercase tracking-widest text-rojo-impacto relative z-10">
                        ÁLBUM OFICIAL
                      </p>
                    </div>
                    
                    <div className="h-4 w-full bg-carbon"></div>
                    
                    <div className="p-4 flex justify-between items-center bg-blanco-absoluto border-t-2 border-carbon">
                      <span className="font-body font-bold text-xs text-carbon uppercase tracking-widest">ACCESO PÚBLICO</span>
                      <ChevronRight className="w-6 h-6 text-carbon group-hover:text-rojo-impacto group-hover:translate-x-1 transition-all" strokeWidth={3} />
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
                      className="group flex flex-col border-brutal bg-blanco-absoluto transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(13,13,13,1)]"
                    >
                      <div className="aspect-[4/5] bg-gris-claro border-b-2 border-carbon relative overflow-hidden">
                        {student.foto ? (
                          <img 
                            src={student.foto} 
                            alt={student.nombres} 
                            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col justify-center items-center bg-gris-claro">
                            <div className="w-24 h-24 border-4 border-carbon flex items-center justify-center bg-blanco-absoluto">
                              <span className="font-title text-5xl text-carbon">
                                {student.nombres?.charAt(0)}{student.apellidos?.charAt(0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* INFO Y ANCLAJE DE RANGO */}
                      <div className="bg-blanco-absoluto relative flex flex-col justify-between p-5 min-h-[140px]">
                        <div>
                          <p className="font-title text-carbon text-2xl uppercase leading-none mb-2 line-clamp-2 group-hover:text-rojo-impacto transition-colors">
                            {student.nombres} {student.apellidos}
                          </p>
                          <p className="font-body font-bold text-carbon/60 text-sm uppercase tracking-widest">
                            {student.grado || 'SIN GRADO'}
                          </p>
                        </div>
                        
                        <p className="font-body font-bold text-[10px] text-carbon uppercase tracking-widest mt-4">
                          VER REGISTRO <ChevronRight size={14} className="inline group-hover:translate-x-1 transition-transform" />
                        </p>
                      </div>
                      
                      {/* Línea de Cinturón Brutalista */}
                      <div className="relative border-t-2 border-carbon h-6 w-full flex items-center justify-center bg-carbon overflow-hidden">
                        <div 
                          className="absolute inset-0"
                          style={{ backgroundColor: belt.backgroundColor }}
                        ></div>
                        {belt.isBlackBelt && (
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] bg-rojo-impacto z-20"></div>
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
