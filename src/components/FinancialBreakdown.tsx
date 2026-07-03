/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Percent } from 'lucide-react';

interface FinancialBreakdownProps {
  rawPurchasePrice: number;
  shippingAmount: number;
  ivaAmount: number;
  totalPrice: number;
  initialAmount: number;
  financedAmount: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  plazo: number;
  cuotaMensual: number;
  formatPrice: (val: number) => string;
}

export const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({
  rawPurchasePrice,
  shippingAmount,
  ivaAmount,
  totalPrice,
  initialAmount,
  financedAmount,
  annualInterestRate,
  monthlyInterestRate,
  plazo,
  cuotaMensual,
  formatPrice,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
        <Percent className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Bloque 2: Desglose Financiero
        </h3>
      </div>

      <div className="p-4 divide-y divide-slate-100/60 space-y-3">
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-1">
          <span>Precio de compra</span>
          <span className="font-semibold text-slate-900">{formatPrice(rawPurchasePrice)}</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Envío</span>
          <span className="font-semibold text-slate-900">{formatPrice(shippingAmount)}</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>IVA</span>
          <span className="font-semibold text-slate-900">{formatPrice(ivaAmount)}</span>
        </div>

        <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-3">
          <span>Precio total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Depósito pagado hoy</span>
          <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
            {formatPrice(initialAmount)}
          </span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Saldo a financiar</span>
          <span className="font-bold text-slate-900">{formatPrice(financedAmount)}</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Tasa de interés efectiva anual</span>
          <span className="font-semibold text-slate-900">{(annualInterestRate * 100).toFixed(2)}%</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Tasa de interés mensual vigente</span>
          <span className="font-semibold text-slate-900">{(monthlyInterestRate * 100).toFixed(2)}%</span>
        </div>

        <div className="flex justify-between items-center text-xs font-medium text-slate-600 pt-3">
          <span>Número de cuotas</span>
          <span className="font-bold text-slate-900">{plazo}</span>
        </div>

        <div className="flex justify-between items-center text-sm font-extrabold text-blue-900 pt-3">
          <span>Pago mínimo mensual</span>
          <span className="text-base font-black">{formatPrice(cuotaMensual)}</span>
        </div>
      </div>
    </div>
  );
};
