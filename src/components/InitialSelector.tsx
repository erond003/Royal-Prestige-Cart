/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface InitialSelectorProps {
  initialPercentage: number;
  setInitialPercentage: (pct: number) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  onOpenManualInitial: () => void;
}

export const InitialSelector: React.FC<InitialSelectorProps> = ({
  initialPercentage,
  setInitialPercentage,
  dropdownOpen,
  setDropdownOpen,
  onOpenManualInitial,
}) => {
  const standardPercentages = Array.from({ length: 12 }, (_, i) => (i + 1) * 5); // 5% to 60%

  return (
    <div className="bg-white px-2 py-1.5 border border-slate-200/80 rounded-xl shadow-sm flex flex-col justify-center relative min-h-[48px]">
      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider text-center block">
        Inicial Global
      </span>
      <div className="relative mt-0.5 flex items-center justify-between gap-1">
        {/* Decrement Chevron */}
        <button
          id="btn-dec-pct"
          onClick={() => setInitialPercentage(Math.max(5, initialPercentage - 5))}
          className="p-1 rounded-full hover:bg-slate-100 active:scale-90 transition-all text-slate-500 shrink-0"
          title="Restar 5%"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Custom Styled Dropdown Trigger */}
        <div className="relative flex-1">
          <button
            id="btn-dropdown-initial-global"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-center gap-1 py-0.5 px-2 bg-slate-50 hover:bg-slate-100/80 active:scale-95 text-slate-800 rounded-lg transition-all text-xs font-black select-none border border-slate-200/40"
          >
            <span>{initialPercentage}%</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Dropdown Menu Overlay */}
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-40 max-h-48 overflow-y-auto bg-white rounded-xl border border-slate-200/80 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {standardPercentages.map((pct) => (
                  <button
                    key={pct}
                    onClick={() => {
                      setInitialPercentage(pct);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-center px-4 py-1.5 text-xs font-bold transition-colors ${
                      initialPercentage === pct 
                        ? 'bg-blue-900 text-white font-extrabold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  id="btn-manual-initial-dropdown"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenManualInitial();
                  }}
                  className="w-full text-center px-4 py-2 text-[10px] font-black text-blue-900 border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  ✏ Inicial manual
                </button>
              </div>
            </>
          )}
        </div>

        {/* Increment Chevron */}
        <button
          id="btn-inc-pct"
          onClick={() => setInitialPercentage(Math.min(100, initialPercentage + 5))}
          className="p-1 rounded-full hover:bg-slate-100 active:scale-90 transition-all text-slate-500 shrink-0"
          title="Sumar 5%"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
