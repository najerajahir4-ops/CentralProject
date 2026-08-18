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
        <h1 className="text-2xl sm:text-3xl font-bold font-body normal-case tracking-normal text-carbon dark:text-white">
          Auditoría y Registro de Actividad
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-body mt-1">
          Historial inmutable de acciones realizadas por los administradores.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-rojo-impacto mx-auto rounded-full"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0A0B0E] border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <Activity size={120} />
          </div>
          
          <div className="relative z-10 ml-2 sm:ml-4 max-h-[600px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
            <div className="border-l-2 border-gray-100 dark:border-white/5 ml-2 space-y-8 pb-4">
              {logs.length === 0 ? (
                <p className="pl-6 text-sm text-gray-500 dark:text-gray-400 font-body normal-case tracking-normal">No hay registros de actividad aún.</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="relative pl-8 group">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[17px] top-1 p-1.5 bg-white dark:bg-[#0A0B0E] border-2 rounded-full transition-transform group-hover:scale-110 ${getActionColor(log.accion).split(' ')[2]}`}>
                      <div className={getActionColor(log.accion).split(' ')[0]}>
                        {getActionIcon(log.accion)}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white dark:bg-[#1C1C21] border border-gray-100 dark:border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getActionColor(log.accion)}`}>
                            {log.accion}
                          </span>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10">
                            {log.entidad}
                          </span>
                          {log.entidadId && (
                            <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                              ID: {log.entidadId}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
                          <Clock size={14} />
                          {new Date(log.createdAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                        </div>
                      </div>
                      
                      <p className="text-sm text-carbon dark:text-white mb-4 font-medium leading-relaxed">
                        {log.detalles || 'Acción registrada sin detalles adicionales.'}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                          <User size={12} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <span>Por: <span className="font-semibold text-carbon dark:text-gray-300">{log.admin ? log.admin.usuario : 'Sistema / Desconocido'}</span></span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditoriaAdmin;
