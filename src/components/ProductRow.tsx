/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckSquare, Square, Trash2 } from 'lucide-react';
import { QuoteItem } from '../types';
import { QuantitySelector } from './QuantitySelector';

interface ProductRowProps {
  item: QuoteItem;
  total: number;
  initial: number;
  cuota: number;
  isHolding: boolean;
  isEditing: boolean;
  activeContextProductId: string | null;
  initialPercentage: number;
  toggleSelect: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  removeQuoteItem: (id: string) => void;
  updateProductInitial: (id: string, custom?: any) => void;
  setActiveContextProductId: (id: string | null) => void;
  formatQuotePrice: (val: number) => string;
  getCustomInitialDescription: (item: QuoteItem) => string;
  handleOpenProductManualInitial: (id: string) => void;
  startHold: (id: string) => void;
  endHold: (id: string) => void;
  cancelHoldOnly: () => void;
  setActiveControlsId: (id: string | null) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  item,
  total,
  initial,
  cuota,
  isHolding,
  isEditing,
  activeContextProductId,
  initialPercentage,
  toggleSelect,
  updateQuantity,
  removeQuoteItem,
  updateProductInitial,
  setActiveContextProductId,
  formatQuotePrice,
  getCustomInitialDescription,
  handleOpenProductManualInitial,
  startHold,
  endHold,
  cancelHoldOnly,
  setActiveControlsId,
}) => {
  const handleInitialClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (activeContextProductId === productId) {
      setActiveContextProductId(null);
    } else {
      setActiveContextProductId(productId);
    }
  };

  return (
    <div
      id={`cart-row-${item.product.id}`}
      onMouseDown={() => startHold(item.product.id)}
      onMouseUp={() => endHold(item.product.id)}
      onMouseLeave={cancelHoldOnly}
      onTouchStart={() => startHold(item.product.id)}
      onTouchEnd={() => endHold(item.product.id)}
      onTouchMove={cancelHoldOnly}
      className={`grid grid-cols-12 gap-2 py-2 items-center transition-all duration-200 select-none relative bg-white/80 ${
        isHolding ? 'bg-blue-50/50 scale-[0.99] transition-all' : ''
      }`}
    >
      {/* Col 1: PRODUCT (Checkbox + Full Name Wrapping) */}
      <div className="col-span-6 sm:col-span-4 flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        {/* Checkbox */}
        <button
          id={`cb-toggle-${item.product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect(item.product.id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="shrink-0 p-1 -m-1 rounded-md hover:bg-slate-100 transition-colors z-10"
        >
          {item.isSelected ? (
            <CheckSquare className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-blue-800" />
          ) : (
            <Square className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-300" />
          )}
        </button>

        {/* Info block */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1 flex-wrap">
            {item.quantity > 1 && (
              <span className="text-[9px] font-bold text-blue-900 bg-blue-50 px-1 py-0.2 rounded font-mono">
                {item.quantity} uds
              </span>
            )}
          </div>
          <h4 className="text-[11px] sm:text-[13px] font-bold text-slate-900 leading-tight mt-0.5 break-words whitespace-normal">
            {item.product.name}
          </h4>
        </div>
      </div>

      {/* Col 2: TOTAL */}
      <div className="col-span-2 text-right">
        <span className="text-[13px] sm:text-[16px] font-black text-slate-900 tracking-tight block">
          {formatQuotePrice(total)}
        </span>
      </div>

      {/* Col 3: INICIAL with Context Menu Exception Trigger */}
      <div className="col-span-2 sm:col-span-3 text-right relative">
        <button
          id={`btn-product-initial-${item.product.id}`}
          onClick={(e) => handleInitialClick(e, item.product.id)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="text-[13px] sm:text-[16px] font-black text-slate-800 tracking-tight text-right hover:bg-slate-100 px-1.5 py-1 rounded-lg transition-colors border border-transparent hover:border-slate-200/40 relative active:scale-95 z-20"
          title="Configuración de inicial"
        >
          <span>{formatQuotePrice(initial)}</span>
          {item.customInitial && (
            <span className="text-[11px] text-slate-400 font-normal ml-0.5" title="Inicial personalizada"> ●</span>
          )}
        </button>

        {/* Context Menu Popover */}
        {activeContextProductId === item.product.id && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={(e) => {
                e.stopPropagation();
                setActiveContextProductId(null);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl border border-slate-200/80 shadow-xl py-1 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
              {!item.customInitial ? (
                <>
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Configuración
                  </div>
                  <div className="w-full text-left px-3.5 py-1.5 text-[11px] font-bold text-slate-800 bg-slate-50 flex items-center justify-between">
                    <span>Global ({initialPercentage}%)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <button
                    id="context-btn-manual-initial"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProductManualInitial(item.product.id);
                    }}
                    className="w-full text-left px-3.5 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    ✏ Definir inicial manual
                  </button>
                </>
              ) : (
                <>
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Configuración Producto
                  </div>
                  <div className="px-3.5 py-1 text-[11px] text-slate-500 font-medium">
                    Configuración actual: <span className="font-extrabold text-slate-800">{getCustomInitialDescription(item)}</span>
                  </div>
                  <button
                    id="context-btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProductManualInitial(item.product.id);
                    }}
                    className="w-full text-left px-3.5 py-2 text-[11px] font-bold text-blue-900 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    ✏ Editar excepción
                  </button>
                  <button
                    id="context-btn-global"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProductInitial(item.product.id, undefined);
                      setActiveContextProductId(null);
                    }}
                    className="w-full text-left px-3.5 py-2 text-[11px] font-bold text-rose-800 hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    ↺ Volver a global
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Col 4: CUOTA */}
      <div className="col-span-2 sm:col-span-3 text-right">
        <span className="text-[13px] sm:text-[16px] font-black tracking-tight block text-blue-900">
          {formatQuotePrice(cuota)}
        </span>
      </div>

      {/* Floating Edit Capsule (active controls overlay) */}
      {isEditing && (
        <div
          className="absolute inset-y-1 left-2 right-2 bg-slate-900/95 backdrop-blur-md rounded-xl flex items-center justify-between px-3 z-30 shadow-lg border border-slate-800 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-bold text-white truncate max-w-[120px] sm:max-w-[200px]">
              {item.product.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <QuantitySelector
              id={item.product.id}
              quantity={item.quantity}
              onDecrease={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
              onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
            />

            {/* Trash */}
            <button
              id={`float-remove-${item.product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                removeQuoteItem(item.product.id);
                setActiveControlsId(null);
              }}
              className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-950/40 transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-800" />

            {/* Done button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveControlsId(null);
              }}
              className="px-2.5 py-1 bg-blue-900 text-white hover:bg-blue-950 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Listo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
