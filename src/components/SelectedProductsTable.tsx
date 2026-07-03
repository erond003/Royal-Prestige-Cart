/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { QuoteItem } from '../types';

interface SelectedProductsTableProps {
  activeItems: QuoteItem[];
  formatPrice: (val: number) => string;
}

export const SelectedProductsTable: React.FC<SelectedProductsTableProps> = ({
  activeItems,
  formatPrice,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Bloque 1: Productos Seleccionados
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Código</th>
              <th className="p-3 text-center">Cantidad</th>
              <th className="p-3">Descripción</th>
              <th className="p-3 text-right">Precio total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeItems.map((item) => (
              <tr key={item.product.id} className="hover:bg-slate-50/30">
                <td className="p-3 font-mono font-semibold text-slate-500">{item.product.code}</td>
                <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                <td className="p-3 font-semibold text-slate-800 leading-tight">{item.product.name}</td>
                <td className="p-3 text-right font-bold text-slate-900">
                  {formatPrice(item.product.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
