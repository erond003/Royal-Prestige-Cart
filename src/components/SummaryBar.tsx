/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SummaryBarProps {
  totalPrice: number;
  initialPercentage: number;
  initialAmount: number;
  plazo: number;
  cuotaMensual: number;
  formatPrice: (val: number) => string;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({
  totalPrice,
  initialPercentage,
  initialAmount,
  plazo,
  cuotaMensual,
  formatPrice,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl z-40 transition-all duration-300 animate-slide-up">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="flex flex-col justify-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
              PRECIO TOTAL
            </span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mt-1">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <div className="flex flex-col justify-center border-l border-slate-100 pl-3">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
              INICIAL ({initialPercentage}%)
            </span>
            <span className="text-sm sm:text-base font-extrabold text-slate-700 tracking-tight mt-1">
              {formatPrice(initialAmount)}
            </span>
          </div>
          <div className="flex flex-col justify-center bg-blue-900 text-white px-3 py-2 rounded-xl text-center shadow-sm">
            <span className="text-[8px] uppercase font-bold text-blue-200 block tracking-wider">
              CUOTA ({plazo}M)
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight leading-none mt-1">
              {formatPrice(cuotaMensual)}/mes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
