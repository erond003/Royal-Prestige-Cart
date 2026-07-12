/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User } from 'lucide-react';
import { DistributorInfo } from '../types';
import { useCart } from '../context/CartContext';

interface DistributorInformationProps {
  distributorInfo: DistributorInfo;
}

export const DistributorInformation: React.FC<DistributorInformationProps> = ({
  distributorInfo,
}) => {
  const { distributorConfig } = useCart();

  const name = distributorConfig?.companyName || distributorInfo.name;
  const address = distributorConfig?.address || distributorInfo.address;
  const phone = distributorConfig?.phone || distributorInfo.phone;
  const code = distributorInfo.code;
  const sellerCode = distributorInfo.sellerCode;

  const rawLogoUrl = distributorConfig?.logoUrl || '';
  const cleanLogoUrl = typeof rawLogoUrl === 'string'
    ? rawLogoUrl.replace('[', '').replace(']', '').trim()
    : '';

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Bloque 3: Datos del Distribuidor
          </h3>
        </div>
        {cleanLogoUrl && (
          <img
            src={cleanLogoUrl}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 object-contain rounded border border-slate-100 bg-white"
          />
        )}
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Nombre del distribuidor</span>
          <p className="text-slate-800 font-bold">{name}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Código del distribuidor</span>
          <p className="text-slate-800 font-mono font-semibold">{code}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Dirección</span>
          <p className="text-slate-800 font-semibold">{address}{distributorConfig?.city ? ` (${distributorConfig.city})` : ''}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Teléfono</span>
          <p className="text-slate-800 font-semibold">{phone}</p>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Código del vendedor</span>
          <p className="text-blue-900 font-bold font-mono text-sm">{sellerCode}</p>
        </div>
      </div>
    </div>
  );
};
