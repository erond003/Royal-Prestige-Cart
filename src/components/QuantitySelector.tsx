/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  id: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  id,
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
      <button
        id={`float-qty-dec-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        className="p-1 rounded hover:bg-slate-700 text-slate-300 active:scale-90 transition-all"
        title="Restar 1"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-5 text-center text-xs font-black text-white">
        {quantity}
      </span>
      <button
        id={`float-qty-inc-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        className="p-1 rounded hover:bg-slate-700 text-slate-300 active:scale-90 transition-all"
        title="Sumar 1"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};
