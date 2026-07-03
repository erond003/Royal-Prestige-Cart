/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface PaymentTermSelectorProps {
  plazo: number;
  setPlazo: (plazo: number | ((prev: number) => number)) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export const PaymentTermSelector: React.FC<PaymentTermSelectorProps> = ({
  plazo,
  setPlazo,
  dropdownOpen,
  setDropdownOpen,
}) => {
  return (
    <div className="bg-white px-2 py-1.5 border border-slate-200/80 rounded-xl shadow-sm flex flex-col justify-center relative min-h-[48px]">
      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider text-center block">
        Plazo
      </span>
      <div className="relative mt-0.5 flex items-center justify-between gap-1">
        {/* Decrement Chevron */}
        <button
          id="btn-dec-plazo"
          onClick={() => {
            const plazos = [12, 18, 24, 30, 36];
            const currentIndex = plazos.indexOf(plazo);
            if (currentIndex > 0) {
              setPlazo(plazos[currentIndex - 1]);
            } else if (currentIndex === -1) {
              setPlazo((prev) => Math.max(12, Math.floor((prev - 1) / 6) * 6));
            }
          }}
          className="p-1 rounded-full hover:bg-slate-100 active:scale-90 transition-all text-slate-500 shrink-0"
          title="Restar 6 meses"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Custom Styled Dropdown Trigger */}
        <div className="relative flex-1">
          <button
            id="btn-dropdown-plazo-global"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-center gap-1 py-0.5 px-2 bg-slate-50 hover:bg-slate-100/80 active:scale-95 text-slate-800 rounded-lg transition-all text-xs font-black select-none border border-slate-200/40"
          >
            <span>{plazo}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Dropdown Menu Overlay */}
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-36 bg-white rounded-xl border border-slate-200/80 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {[12, 18, 24, 30, 36].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPlazo(p);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-center px-4 py-1.5 text-xs font-bold transition-colors ${
                      plazo === p 
                        ? 'bg-blue-900 text-white font-extrabold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Increment Chevron */}
        <button
          id="btn-inc-plazo"
          onClick={() => {
            const plazos = [12, 18, 24, 30, 36];
            const currentIndex = plazos.indexOf(plazo);
            if (currentIndex !== -1 && currentIndex < plazos.length - 1) {
              setPlazo(plazos[currentIndex + 1]);
            } else if (currentIndex === -1) {
              setPlazo((prev) => Math.min(36, Math.ceil((prev + 1) / 6) * 6));
            }
          }}
          className="p-1 rounded-full hover:bg-slate-100 active:scale-90 transition-all text-slate-500 shrink-0"
          title="Sumar 6 meses"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
