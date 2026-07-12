/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCart } from '../context/CartContext';
import { FileText, PlusCircle, Settings, ShieldCheck, BarChart3, TrendingUp, Sparkles, Award } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setScreen, distributorInfo, distributorConfig } = useCart();

  return (
    <div className="space-y-3.5 px-1 sm:px-2">
      {/* Visual Identity Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-xl shadow-sm border border-slate-700/30 relative overflow-hidden">
        {/* Subtle geometric circles in background */}
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-slate-700/20 blur-lg" />
        <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full bg-blue-900/10 blur-md" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="bg-blue-800/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-700/50 flex items-center gap-1">
                <Award className="w-2.5 h-2.5" /> Royal Elite
              </span>
              <span className="text-slate-400 text-[10px] font-mono">{distributorInfo.code}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold tracking-tight bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/40">
              Royal Prestige® Cart
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Royal Prestige®</h2>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">
              Herramienta de simulación de pedidos de <strong className="text-white">{distributorConfig?.companyName || "Witman Group SAS"}</strong>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
            <span>Cod. Vendedor: <strong className="text-slate-200">{distributorInfo.sellerCode}</strong></span>
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Sincronizado
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Actions - Compact 3-column Grid */}
      <div className="grid grid-cols-3 gap-2">
        <button
          id="btn-nueva-cotizacion"
          onClick={() => setScreen('quote')}
          className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 shadow-sm active:scale-95 transition-all text-center group"
        >
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 text-blue-800 group-hover:bg-blue-100 transition-colors mb-1 shrink-0">
            <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-none group-hover:text-blue-900 transition-colors">Nueva</span>
          <span className="hidden sm:inline text-[9px] text-slate-400 mt-0.5 leading-none">Cotización</span>
        </button>

        <button
          id="btn-cotizaciones-recientes"
          onClick={() => setScreen('recent_quotes')}
          className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 shadow-sm active:scale-95 transition-all text-center group"
        >
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 text-blue-800 group-hover:bg-blue-100 transition-colors mb-1 shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-none group-hover:text-blue-900 transition-colors">Recientes</span>
          <span className="hidden sm:inline text-[9px] text-slate-400 mt-0.5 leading-none">Simulaciones</span>
        </button>

        <button
          id="btn-configuracion"
          onClick={() => setScreen('config')}
          className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 shadow-sm active:scale-95 transition-all text-center group"
        >
          <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 text-blue-800 group-hover:bg-blue-100 transition-colors mb-1 shrink-0">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-slate-800 leading-none group-hover:text-blue-900 transition-colors">Ajustes</span>
          <span className="hidden sm:inline text-[9px] text-slate-400 mt-0.5 leading-none">Configuración</span>
        </button>
      </div>

      {/* KPIs Placeholder Area - Compact & Elegant */}
      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100/80">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              KPIs de Ventas (Fase 2)
            </h3>
          </div>
          <span className="text-[8px] font-bold text-slate-300 font-mono bg-slate-50 px-1.5 py-0.5 rounded uppercase">
            Próximamente
          </span>
        </div>

        {/* Beautiful non-interactive simulated KPI metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 opacity-50 relative select-none">
          {/* Locked Badge Overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center pointer-events-none">
            <div className="bg-slate-900/80 text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md text-center">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" /> Sincronización Inactiva
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/40 text-center sm:text-left">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Ventas</span>
            <div className="text-sm font-black text-slate-800 mt-0.5">$45.8M</div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/40 text-center sm:text-left">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Cotizaciones</span>
            <div className="text-sm font-black text-slate-800 mt-0.5">42</div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/40 text-center sm:text-left">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Conversión</span>
            <div className="text-sm font-black text-slate-800 mt-0.5">42.8%</div>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/40 text-center sm:text-left">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Meta</span>
            <div className="text-sm font-black text-slate-800 mt-0.5">78%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
