import React, { useState, useEffect } from 'react';
import { Activity, User, ShieldAlert, FileText, CheckCircle2, Clock } from 'lucide-react';
import API from '../../services/api';

const AuditoriaAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/audit?limit=100');
      setLogs(res.data.logs);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (accion) => {
    switch (accion) {
      case 'CREAR': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'ELIMINAR': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'EDITAR': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'LOGIN': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getActionIcon = (accion) => {
    switch (accion) {
      case 'CREAR': return <CheckCircle2 size={16} />;
      case 'ELIMINAR': return <ShieldAlert size={16} />;
      case 'EDITAR': return <FileText size={16} />;
      case 'LOGIN': return <User size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-carbon dark:text-white font-body tracking-tight">
          Auditoría y Registro de Actividad
        </h1>
        <p className="text-xs text-carbon dark:text-white font-bold tracking-widest uppercase mt-1">
          Historial inmutable de acciones realizadas por los administradores.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-rojo-impacto mx-auto rounded-full"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0A0B0E] border-4 border-carbon dark:border-white/10 p-6 sm:p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-8 opacity-[0.05] dark:opacity-[0.08] pointer-events-none">
            <Activity size={60} />
          </div>
          
          <div className="relative z-10 border-l-2 border-carbon/20 dark:border-white/20 ml-4 space-y-8 pb-4">
            {logs.length === 0 ? (
              <p className="pl-6 text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">No hay registros de actividad aún.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="relative pl-8 group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[17px] top-1 p-1.5 bg-white dark:bg-[#0A0B0E] border-2 rounded-none transition-transform group-hover:scale-110 ${getActionColor(log.accion).split(' ')[2].replace('border', 'border')}`}>
                    <div className={getActionColor(log.accion).split(' ')[0]}>
                      {getActionIcon(log.accion)}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-gray-50 dark:bg-[#1C1C21] border-2 border-carbon/20 dark:border-white/10 p-4 hover:border-carbon dark:hover:border-white/30 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border ${getActionColor(log.accion)}`}>
                          {log.accion}
                        </span>
                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-0.5 border border-carbon/10 dark:border-white/10">
                          {log.entidad}
                        </span>
                        {log.entidadId && (
                          <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-500">
                            ID: {log.entidadId}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                        <Clock size={12} />
                        {new Date(log.createdAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                      </div>
                    </div>
                    
                    <p className="text-sm font-bold text-carbon dark:text-white mb-2">
                      {log.detalles || 'Acción registrada sin detalles adicionales.'}
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 font-bold bg-black/5 dark:bg-white/5 inline-flex px-2 py-1 border border-carbon/10 dark:border-white/10">
                      <User size={12} />
                      Por: {log.admin ? log.admin.usuario : 'Sistema / Desconocido'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditoriaAdmin;
