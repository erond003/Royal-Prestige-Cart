/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User } from 'lucide-react';
import { DistributorInfo } from '../types';

interface DistributorInformationProps {
  distributorInfo: DistributorInfo;
}

export const DistributorInformation: React.FC<DistributorInformationProps> = ({
  distributorInfo,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
        <User className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Bloque 3: Datos del Distribuidor
        </h3>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Nombre del distribuidor</span>
          <p className="text-slate-800 font-bold">{distributorInfo.name}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Código del distribuidor</span>
          <p className="text-slate-800 font-mono font-semibold">{distributorInfo.code}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Dirección</span>
          <p className="text-slate-800 font-semibold">{distributorInfo.address}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Teléfono</span>
          <p className="text-slate-800 font-semibold">{distributorInfo.phone}</p>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Código del vendedor</span>
          <p className="text-blue-900 font-bold font-mono text-sm">{distributorInfo.sellerCode}</p>
        </div>
      </div>
    </div>
  );
};
