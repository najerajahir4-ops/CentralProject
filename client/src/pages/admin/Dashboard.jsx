import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Users, AlertTriangle, Clock, DollarSign, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalActiveStudents: 0,
    alDiaCount: 0,
    porVencerCount: 0,
    vencidoCount: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/students/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error al cargar estadisticas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock revenue chart data based on system
  const chartData = [
    { mes: 'Ene', ingresos: 1200 },
    { mes: 'Feb', ingresos: 1500 },
    { mes: 'Mar', ingresos: 1800 },
    { mes: 'Abr', ingresos: 1400 },
    { mes: 'May', ingresos: 2100 },
    { mes: 'Jun', ingresos: 2400 },
    { mes: 'Jul', ingresos: stats.totalRevenue || 2800 },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-carbon/10 pb-6">
        <div>
          <h1 className="text-3xl font-title text-carbon tracking-widest uppercase">
            Panel de Control
          </h1>
          <p className="text-sm font-medium text-carbon/60 mt-1 uppercase tracking-wider">
            Resumen estadístico de estudiantes e ingresos
          </p>
        </div>

        <Link
          to="/admin/estudiantes"
          className="px-6 py-3 bg-rojo-impacto hover:bg-carbon text-blanco-absoluto text-xs font-title tracking-widest uppercase transition-colors inline-flex items-center gap-3"
        >
          <Users size={16} />
          GESTIONAR ESTUDIANTES
        </Link>
      </div>

      {/* Metrics Roster Panel */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-carbon/20 border-t-rojo-impacto rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col border-precision bg-blanco-absoluto">
          {/* Header Row */}
          <div className="border-b border-carbon/10 px-6 py-3 bg-carbon/5">
            <h2 className="font-title text-sm tracking-widest uppercase text-carbon">ESTADO DEL DOJANG</h2>
          </div>
          
          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-carbon/10">
            {/* Activos */}
            <div className="p-6 flex flex-col justify-between">
              <span className="font-title text-xs tracking-wider uppercase text-carbon/60 mb-4">Plantilla Activa</span>
              <div className="flex items-end gap-3">
                <span className="font-title text-5xl leading-none text-carbon">{stats.totalActiveStudents}</span>
                <span className="text-xs font-bold text-carbon/50 uppercase pb-1 tracking-widest">ATLETAS</span>
              </div>
            </div>

            {/* Al Día */}
            <div className="p-6 flex flex-col justify-between">
              <span className="font-title text-xs tracking-wider uppercase text-carbon/60 mb-4">Cuotas Corrientes</span>
              <div className="flex items-end gap-3">
                <span className="font-title text-5xl leading-none text-carbon">{stats.alDiaCount}</span>
                <span className="text-xs font-bold text-carbon/50 uppercase pb-1 tracking-widest">AL DÍA</span>
              </div>
            </div>

            {/* Por Vencer */}
            <div className="p-6 flex flex-col justify-between">
              <span className="font-title text-xs tracking-wider uppercase text-carbon/60 mb-4">Próximos (7 días)</span>
              <div className="flex items-end gap-3">
                <span className="font-title text-5xl leading-none text-carbon">{stats.porVencerCount}</span>
                <span className="text-xs font-bold text-carbon/50 uppercase pb-1 tracking-widest">VENCEN</span>
              </div>
            </div>

            {/* Vencidos */}
            <div className="p-6 flex flex-col justify-between bg-rojo-impacto/5 group hover:bg-rojo-impacto/10 transition-colors">
              <span className="font-title text-xs tracking-wider uppercase text-rojo-impacto mb-4">Acción Requerida</span>
              <div className="flex items-end gap-3">
                <span className="font-title text-5xl leading-none text-rojo-impacto">{stats.vencidoCount}</span>
                <span className="text-xs font-bold text-rojo-impacto/70 uppercase pb-1 tracking-widest">VENCIDOS</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="border-precision bg-blanco-absoluto p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-carbon/10 pb-6">
          <div>
            <h3 className="text-xl font-bold text-carbon font-title uppercase tracking-widest">RENDIMIENTO FINANCIERO</h3>
            <p className="text-xs text-carbon/60 font-body uppercase tracking-wider mt-1">Histórico de recaudación acumulada 2026</p>
          </div>
          <div className="flex items-center gap-2 bg-carbon text-blanco-absoluto px-4 py-2">
            <DollarSign size={16} />
            <span className="font-title text-sm tracking-widest">{stats.totalRevenue.toFixed(2)} USD</span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,13,13,0.1)" />
              <XAxis dataKey="mes" stroke="rgba(13,13,13,0.5)" fontSize={12} fontFamily="Inter" />
              <YAxis stroke="rgba(13,13,13,0.5)" fontSize={12} fontFamily="Inter" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#0d0d0d', borderRadius: '0' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="ingresos" fill="#c8102e" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
