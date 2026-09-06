import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Search, User, ChevronRight, AlertCircle, Loader } from 'lucide-react';
import { optimizeCloudinary, CLOUDINARY_PRESETS } from '../../utils/cloudinary';

const PerfilesAdmin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('TAEKWONDO');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/students');
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const countTKD = students.filter(s => (s.modalidad || 'TAEKWONDO') === 'TAEKWONDO' || s.modalidad === 'AMBAS').length;
  const countKB = students.filter(s => s.modalidad === 'KICKBOXING' || s.modalidad === 'AMBAS').length;
  const countTodos = students.length;

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.nombres?.toLowerCase().includes(search.toLowerCase()) ||
      s.apellidos?.toLowerCase().includes(search.toLowerCase()) ||
      s.cedula?.includes(search);
    
    if (!matchesSearch) return false;

    const mod = s.modalidad || 'TAEKWONDO';
    if (selectedTab === 'TAEKWONDO') {
      return mod === 'TAEKWONDO' || mod === 'AMBAS';
    }
    if (selectedTab === 'KICKBOXING') {
      return mod === 'KICKBOXING' || mod === 'AMBAS';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Tabs / Secciones de Disciplina (idéntico a Fichas & Pagos) */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-white/10 mb-6">
        <button
          onClick={() => setSelectedTab('TAEKWONDO')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            selectedTab === 'TAEKWONDO'
              ? 'border-rojo-impacto text-rojo-impacto'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Taekwondo ({countTKD})
        </button>
        <button
          onClick={() => setSelectedTab('KICKBOXING')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            selectedTab === 'KICKBOXING'
              ? 'border-rojo-impacto text-rojo-impacto'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Kickboxing ({countKB})
        </button>
        <button
          onClick={() => setSelectedTab('TODOS')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            selectedTab === 'TODOS'
              ? 'border-rojo-impacto text-rojo-impacto'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Todos ({countTodos})
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-carbon dark:text-white uppercase tracking-tight flex items-center gap-2 font-body">
            <User className="text-rojo-impacto" size={28} />
            Perfiles de Estudiantes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Selecciona un estudiante para ver su perfil completo y su galería de progreso.</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 p-4 rounded-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-carbon dark:text-white absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre o cédula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm pl-9 pr-4 py-2 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20"
          />
        </div>
      </div>

      {loading ? (
        <div class="flex justify-center items-center py-20">
          <Loader class="animate-spin text-carbon dark:text-white" size={40} />
        </div>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.length === 0 ? (
            <div class="col-span-full py-12 text-center text-gray-600 dark:text-gray-400 flex flex-col items-center">
              <AlertCircle size={40} class="mb-4 text-gray-500" />
              <p>No se encontraron estudiantes con esa búsqueda.</p>
            </div>
          ) : (
            <>
              {/* Tarjeta Admin Fotos Generales */}
              {search === '' && (
                <Link 
                  to="/admin/perfiles/generales"
                  class="bg-gray-50 dark:bg-[#1C1C21] border border-carbon/30 dark:border-white/20 rounded-lg overflow-hidden hover:border-carbon dark:border-white/20/80 transition-all hover:-translate-y-1 group relative shadow-lg shadow-dorado-campeon/5"
                >
                  <div class="h-56 sm:h-64 bg-gradient-to-br from-[#0B1550] to-[#1C1C21] relative overflow-hidden flex justify-center items-center">
                    <User size={60} class="text-carbon dark:text-white opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div class="p-4">
                    <p class="font-body font-bold text-carbon dark:text-white uppercase text-sm truncate">Fotos Generales</p>
                    <p class="text-[10px] text-gray-600 dark:text-gray-400 font-mono mt-1">Álbum del Dojang</p>
                    
                    <div class="mt-4 flex items-center justify-between text-[11px] border-t border-carbon/10 dark:border-white/5 pt-3">
                      <div>
                        <span class="block text-gray-500 uppercase tracking-wider text-[9px]">Gestor</span>
                        <span class="text-carbon dark:text-white font-bold">Público</span>
                      </div>
                      <ChevronRight size={16} class="text-carbon dark:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
              )}

              {filteredStudents.map((student) => {
                const isAmbas = student.modalidad === 'AMBAS';
                const currentBelt = isAmbas && selectedTab === 'KICKBOXING'
                  ? (student.grado?.split(' / ')[1] || student.grado?.split(' / ')[0] || 'N/A')
                  : (student.grado?.split(' / ')[0] || 'N/A');

                const modLabel = isAmbas 
                  ? 'TKD & Kickboxing' 
                  : (student.modalidad === 'KICKBOXING' ? 'Kickboxing' : 'Taekwondo');

                return (
                  <Link 
                    key={student.id} 
                    to={`/admin/perfiles/${student.id}`}
                    className="bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-lg overflow-hidden hover:border-rojo-impacto/50 dark:hover:border-rojo-impacto/50 transition-all hover:transform hover:-translate-y-1 group shadow-xs"
                  >
                    <div className="h-56 sm:h-64 bg-white dark:bg-[#0A0B0E] relative overflow-hidden flex justify-center items-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C21]/90 via-[#1C1C21]/20 to-transparent z-10"></div>
                      {student.foto ? (
                        <img 
                          src={optimizeCloudinary(student.foto, CLOUDINARY_PRESETS.CARD)} 
                          alt={student.nombres} 
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" 
                        />
                      ) : (
                        <User size={60} className="text-gray-400 dark:text-gray-600 opacity-40" />
                      )}
                      
                      {/* Badges de Estado y Disciplina */}
                      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                          student.estado === 'ACTIVO' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {student.estado}
                        </span>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                          isAmbas 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : student.modalidad === 'KICKBOXING'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {isAmbas ? 'TKD & KB' : (student.modalidad || 'TKD')}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-body font-bold text-carbon dark:text-white uppercase text-sm truncate">
                        {student.nombres} {student.apellidos}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                        {modLabel}
                      </p>
                      
                      <div className="mt-3 flex items-center justify-between text-[11px] border-t border-carbon/10 dark:border-white/5 pt-3">
                        <div>
                          <span className="block text-gray-500 uppercase tracking-wider text-[9px]">Grado</span>
                          <span className="text-carbon dark:text-white font-bold">{currentBelt}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-rojo-impacto transition-colors" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PerfilesAdmin;
