/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCart } from '../context/CartContext';
import { DistributorRepository } from '../repositories';
import { MOCK_COMPANY_PROFILES } from '../mockData';
import { ShieldCheck, FileSpreadsheet, Check, LogOut, User as UserIcon } from 'lucide-react';

export const ConfigScreen: React.FC = () => {
  const {
    activeProfile,
    setActiveProfile,
    setDistributorInfo,
    currentUser,
    logout,
  } = useCart();

  const PROFILES = [
    { name: 'Witman Group', region: 'Principal - Antioquia', sheetName: 'Witman_Group_Sales_v1' },
    { name: 'Equipo Norte', region: 'Costa Atlántica', sheetName: 'Equipo_Norte_Sales_v2' },
    { name: 'Equipo Medellín', region: 'Valle de Aburrá', sheetName: 'Medellin_Team_Sheets' },
    { name: 'Equipo Cali', region: 'Valle del Cauca', sheetName: 'Cali_Team_Sheets_2026' },
  ];

  const handleSelectProfile = (profileName: string) => {
    setActiveProfile(profileName);
    const profileObj = MOCK_COMPANY_PROFILES.find((p) => p.companyName === profileName) || MOCK_COMPANY_PROFILES[0];
    const dist = DistributorRepository.getDistributor(profileObj);
    setDistributorInfo(dist);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Configuración de Perfil</h2>
        <p className="text-xs text-slate-500">Selecciona el equipo o territorio activo para administrar cotizaciones</p>
      </div>

      {/* User Session Card */}
      {currentUser && (
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-800 truncate">
                {currentUser.nombre || (currentUser.user && currentUser.user.nombre) || "Vendedor Autorizado"}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5 truncate">
                Código: {currentUser.codigoVendedor || (currentUser.user && currentUser.user.codigoVendedor) || "N/A"} • {currentUser.distributor || "Distribuidor"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-600 border border-slate-200/60 transition-all text-xs font-bold active:scale-95 shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Salir</span>
          </button>
        </div>
      )}

      {/* Profile Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
          Perfiles de Distribución Disponibles
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PROFILES.map((p) => {
            const isActive = activeProfile === p.name;
            return (
              <button
                key={p.name}
                id={`btn-profile-select-${p.name.replace(' ', '-')}`}
                onClick={() => handleSelectProfile(p.name)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-blue-50/50 border-blue-800/80 shadow-sm'
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-slate-800 group-hover:text-blue-950 transition-colors">
                    {p.name}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                    {p.region}
                  </span>
                </div>

                {isActive ? (
                  <div className="p-1 rounded-full bg-blue-800 text-white shadow-sm shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-200 group-hover:border-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Google Sheets Sync Explainer & Mock Settings */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Enlace con Google Sheets (Próximamente)
            </h3>
          </div>
          <span className="text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200/50 rounded-full px-2 py-0.5 uppercase">
            Fase 2
          </span>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            En la próxima fase, cada uno de los perfiles mostrados arriba podrá vincularse a una hoja de cálculo de Google Sheets independiente. Esto permitirá sincronizar el catálogo de productos, actualizar las tasas de interés oficiales en tiempo real y registrar cada cotización de forma centralizada sin necesidad de bases de datos tradicionales.
          </p>

          <div className="space-y-3 opacity-60 pointer-events-none select-none">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                URL de Google Sheet Vinculada
              </label>
              <input
                type="text"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={`https://docs.google.com/spreadsheets/d/${PROFILES.find(p => p.name === activeProfile)?.sheetName || 'sheets-id'}`}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Pestaña de Pedidos
                </label>
                <input
                  type="text"
                  value="Registro_Pedidos_2026"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-500 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Pestaña de Productos
                </label>
                <input
                  type="text"
                  value="Catalogo_Productos_Vigente"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-500 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Application Context details */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-700">Modo Demo Sólido Activo</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Puedes cambiar entre perfiles para ver cómo el cotizador y la preparación de pedidos alteran automáticamente los datos del distribuidor. Todos los cambios se calculan localmente de manera segura en el dispositivo.
          </p>
        </div>
      </div>
    </div>
  );
};
