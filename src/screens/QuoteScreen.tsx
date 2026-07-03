/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PlusCircle, CheckSquare, Square, ShoppingBag } from 'lucide-react';
import { calculateProductFinancials } from '../lib/financialEngine';
import { InitialSelector } from '../components/InitialSelector';
import { PaymentTermSelector } from '../components/PaymentTermSelector';
import { ProductRow } from '../components/ProductRow';
import { SummaryBar } from '../components/SummaryBar';

export const QuoteScreen: React.FC = () => {
  const {
    cartItems,
    addQuoteItem,
    removeQuoteItem,
    updateQuantity,
    toggleSelect,
    selectAll,
    initialPercentage,
    setInitialPercentage,
    plazo,
    setPlazo,
    setSearchOpen,
    setScreen,
    updateProductInitial,
    clearAllCustomInitials,
    
    // Computed totals
    totalPrice,
    initialAmount,
    financedAmount,
    cuotaMensual,
  } = useCart();

  // Custom modern dropdown states
  const [initialDropdownOpen, setInitialDropdownOpen] = useState(false);
  const [plazoDropdownOpen, setPlazoDropdownOpen] = useState(false);

  // Manual initial states
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualModalType, setManualModalType] = useState<'global' | 'product'>('global');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [modalTab, setModalTab] = useState<'value' | 'percentage'>('value');
  const [modalValueInput, setModalValueInput] = useState(''); // In thousands of pesos (e.g. 500 = $500,000 COP)
  const [modalPctInput, setModalPctInput] = useState('');     // Percentage exact value (e.g. 12 = 12%)

  // Product custom initial contextual menu state
  const [activeContextProductId, setActiveContextProductId] = useState<string | null>(null);

  // Scroll detection to collapse upper controls automatically
  const [isScrolled, setIsScrolled] = useState(false);

  // Hold-to-edit feature states for compact list rows
  const [activeControlsId, setActiveControlsId] = useState<string | null>(null);
  const [holdingId, setHoldingId] = useState<string | null>(null);
  const holdTimerRef = React.useRef<any>(null);

  const startHold = (id: string) => {
    if (activeControlsId === id) return;
    setHoldingId(id);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      setActiveControlsId(id);
      setHoldingId(null);
      // Optional slight haptic feedback
      if (navigator.vibrate) {
        try {
          navigator.vibrate(50);
        } catch (e) {}
      }
    }, 650); // Elegant hold delay
  };

  const endHold = (id: string) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
      // If we finished before the timer and were holding, toggle select
      if (holdingId === id) {
        toggleSelect(id);
      }
    }
    setHoldingId(null);
  };

  const cancelHoldOnly = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldingId(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      // If scroll is past 40px, hide top controls to save space, else show
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const anySelected = cartItems.some((item) => item.isSelected);
  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.isSelected);

  const handleToggleSelectAll = () => {
    selectAll(!allSelected);
  };

  // Helper to compute individual values for rows using our decoupled FinancialEngine
  const getProductRowValues = (item: any) => {
    const financials = calculateProductFinancials(
      item.product.price,
      item.quantity,
      initialPercentage,
      plazo,
      item.customInitial
    );
    return {
      total: financials.totalPrice,
      initial: financials.initialAmount,
      cuota: financials.monthlyPayment,
    };
  };

  // Helper to format values: no currency symbol, formatted as raw thousands, no dots/commas
  const formatQuotePrice = (val: number) => {
    return Math.round(val / 1000).toString();
  };

  const getCustomInitialDescription = (item: any) => {
    if (!item.customInitial) return '';
    if (item.customInitial.type === 'percentage') {
      return `${item.customInitial.value}%`;
    } else {
      return `${formatQuotePrice(item.customInitial.value)}`;
    }
  };

  const standardPercentages = Array.from({ length: 12 }, (_, i) => (i + 1) * 5); // 5% to 60%

  const handleSelectInitialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'manual') {
      setManualModalType('global');
      setEditingProductId(null);
      setModalTab('value');
      
      setModalPctInput(initialPercentage.toString());
      const currentGlobalValueInThousands = Math.round((totalPrice * (initialPercentage / 100)) / 1000);
      setModalValueInput(currentGlobalValueInThousands > 0 ? currentGlobalValueInThousands.toString() : '');
      
      setManualModalOpen(true);
    } else {
      setInitialPercentage(parseInt(val));
    }
  };

  const handleOpenProductManualInitial = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    if (!item) return;

    setManualModalType('product');
    setEditingProductId(productId);
    setModalTab('value');

    const currentPct = item.customInitial && item.customInitial.type === 'percentage' 
      ? item.customInitial.value 
      : initialPercentage;
    setModalPctInput(currentPct.toString());

    const itemTotal = item.product.price * item.quantity;
    let currentValueInThousands = 0;
    if (item.customInitial) {
      if (item.customInitial.type === 'value') {
        currentValueInThousands = Math.round(item.customInitial.value / 1000);
      } else {
        currentValueInThousands = Math.round((itemTotal * (item.customInitial.value / 100)) / 1000);
      }
    } else {
      currentValueInThousands = Math.round((itemTotal * (initialPercentage / 100)) / 1000);
    }
    setModalValueInput(currentValueInThousands > 0 ? currentValueInThousands.toString() : '');

    setManualModalOpen(true);
    setActiveContextProductId(null);
  };

  const handleConfirmManualInitial = () => {
    if (manualModalType === 'global') {
      if (modalTab === 'value') {
        const valInThousands = parseFloat(modalValueInput) || 0;
        const rawValue = valInThousands * 1000;
        if (totalPrice > 0) {
          const computedPct = Math.round((rawValue / totalPrice) * 100);
          setInitialPercentage(computedPct);
        }
      } else {
        const pct = parseFloat(modalPctInput) || 0;
        setInitialPercentage(pct);
      }
    } else if (manualModalType === 'product' && editingProductId) {
      if (modalTab === 'value') {
        const valInThousands = parseFloat(modalValueInput) || 0;
        const rawValue = valInThousands * 1000;
        updateProductInitial(editingProductId, {
          type: 'value',
          value: rawValue,
        });
      } else {
        const pct = parseFloat(modalPctInput) || 0;
        updateProductInitial(editingProductId, {
          type: 'percentage',
          value: pct,
        });
      }
    }
    setManualModalOpen(false);
  };

  const handleInitialClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (activeContextProductId === productId) {
      setActiveContextProductId(null);
    } else {
      setActiveContextProductId(productId);
    }
  };

  return (
    <div className="pb-32 relative font-sans">
      {/* Scroll-Hiding Top Control Panel */}
      <div
        className={`sticky top-[54px] sm:top-[68px] z-30 bg-slate-50 border-b border-slate-200/60 p-1.5 sm:p-2.5 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'max-h-0 opacity-0 py-0 border-transparent -translate-y-2 pointer-events-none overflow-hidden' 
            : 'max-h-[220px] opacity-100 py-1.5 sm:py-2.5 shadow-sm overflow-visible'
        }`}
      >
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2 sm:gap-2.5 items-stretch">
          {/* Left half/column: Compact Stacked Actions */}
          <div className="flex flex-col justify-between gap-1.5">
            <button
              id="btn-open-search"
              onClick={() => setSearchOpen(true)}
              className="w-full flex-1 flex items-center justify-center gap-1 px-1.5 py-2.5 sm:py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-950 active:scale-95 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm transition-all min-h-[40px]"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200 shrink-0" />
              Agregar producto
            </button>

            <button
              id="btn-toggle-select-all"
              onClick={handleToggleSelectAll}
              className="w-full py-1.5 sm:py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-700 transition-all active:scale-95 shadow-sm"
            >
              {allSelected ? (
                <>
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  Deseleccionar todo
                </>
              ) : (
                <>
                  <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Seleccionar todo
                </>
              )}
            </button>
          </div>

          {/* Right half/column: Compact Stacked Controls */}
          <div className="flex flex-col gap-1.5">
            {/* Inicial (%) Picker Selector */}
            <InitialSelector
              initialPercentage={initialPercentage}
              setInitialPercentage={setInitialPercentage}
              dropdownOpen={initialDropdownOpen}
              setDropdownOpen={setInitialDropdownOpen}
              onOpenManualInitial={() => {
                setManualModalType('global');
                setEditingProductId(null);
                setModalTab('value');
                setModalPctInput(initialPercentage.toString());
                const currentGlobalValueInThousands = Math.round((totalPrice * (initialPercentage / 100)) / 1000);
                setModalValueInput(currentGlobalValueInThousands > 0 ? currentGlobalValueInThousands.toString() : '');
                setManualModalOpen(true);
              }}
            />

            {/* Plazo Control */}
            <PaymentTermSelector
              plazo={plazo}
              setPlazo={setPlazo}
              dropdownOpen={plazoDropdownOpen}
              setDropdownOpen={setPlazoDropdownOpen}
            />
          </div>
        </div>
      </div>

      {/* Floating alert if top controls are hidden */}
      {isScrolled && (
        <div className="sticky top-[62px] sm:top-[76px] z-20 max-w-2xl mx-auto px-4 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between pointer-events-auto transition-all animate-fade-in w-max mx-auto border border-slate-700/50">
            <span>Inicial: <strong>{initialPercentage}%</strong> • Plazo: <strong>{plazo} meses</strong></span>
            <button
              id="scroll-to-top-indicator-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-blue-400 hover:text-blue-300 ml-3 font-semibold hover:underline"
            >
              Editar
            </button>
          </div>
        </div>
      )}

      {/* Product Table Header */}
      {cartItems.length > 0 && (
        <div className="max-w-2xl mx-auto px-2 sm:px-4 mt-2 sm:mt-3">
          <div className="grid grid-cols-12 gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider select-none pb-2 border-b border-slate-100/40">
            <div className="col-span-6 sm:col-span-4 flex items-center gap-1">
              <span>Producto</span>
            </div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 sm:col-span-3 text-right">Inicial</div>
            <div className="col-span-2 sm:col-span-3 text-right text-blue-800">Cuota</div>
          </div>
        </div>
      )}

      {/* Product List Table Rows */}
      <div className="max-w-2xl mx-auto px-2 sm:px-4 mt-1 divide-y divide-slate-100/20">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const { total, initial, cuota } = getProductRowValues(item);
            const isHolding = holdingId === item.product.id;
            const isEditing = activeControlsId === item.product.id;

            return (
              <ProductRow
                key={item.product.id}
                item={item}
                total={total}
                initial={initial}
                cuota={cuota}
                isHolding={isHolding}
                isEditing={isEditing}
                activeContextProductId={activeContextProductId}
                initialPercentage={initialPercentage}
                toggleSelect={toggleSelect}
                updateQuantity={updateQuantity}
                removeQuoteItem={removeQuoteItem}
                updateProductInitial={updateProductInitial}
                setActiveContextProductId={setActiveContextProductId}
                formatQuotePrice={formatQuotePrice}
                getCustomInitialDescription={getCustomInitialDescription}
                handleOpenProductManualInitial={handleOpenProductManualInitial}
                startHold={startHold}
                endHold={endHold}
                cancelHoldOnly={cancelHoldOnly}
                setActiveControlsId={setActiveControlsId}
              />
            );
          })
        ) : (
          <div className="bg-white py-12 rounded-xl border border-slate-100 text-center text-slate-400">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">Tu cotización está vacía</p>
            <p className="text-xs mt-1">Busca productos premium y agrégalos para simular pagos.</p>
            <button
              id="btn-empty-add-first"
              onClick={() => setSearchOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" /> Agregar primer producto
            </button>
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary Bar */}
      {anySelected && (
        <SummaryBar
          totalPrice={totalPrice}
          initialPercentage={initialPercentage}
          initialAmount={initialAmount}
          plazo={plazo}
          cuotaMensual={cuotaMensual}
          formatPrice={formatQuotePrice}
        />
      )}
      {/* Centered Modal Dialog for Manual Initial (Global or Product Exception) */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with fade-in */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setManualModalOpen(false)}
          />
          
          {/* Centered card content with pop-up transition */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-50 transform scale-100 transition-all duration-200 animate-in zoom-in-95 ease-out">
            {/* Header */}
            <div className="bg-slate-900 px-5 py-4 text-white">
              <h3 className="text-sm font-black uppercase tracking-wider">
                {manualModalType === 'global' ? 'Inicial Global Manual' : 'Excepción de Inicial'}
              </h3>
              <p className="text-[10px] text-slate-300 font-medium mt-0.5">
                {manualModalType === 'global' 
                  ? 'Configurar inicial personalizada para toda la cotización' 
                  : 'Configurar excepción para este producto'}
              </p>
            </div>

            {/* Tab Toggles */}
            <div className="flex border-b border-slate-100 bg-slate-50">
              <button
                id="tab-manual-value"
                onClick={() => setModalTab('value')}
                className={`flex-1 py-3 text-center text-xs font-bold transition-colors border-b-2 ${
                  modalTab === 'value' 
                    ? 'text-blue-900 border-blue-900 bg-white font-extrabold' 
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                Valor ($)
              </button>
              <button
                id="tab-manual-pct"
                onClick={() => setModalTab('percentage')}
                className={`flex-1 py-3 text-center text-xs font-bold transition-colors border-b-2 ${
                  modalTab === 'percentage' 
                    ? 'text-blue-900 border-blue-900 bg-white font-extrabold' 
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                Porcentaje (%)
              </button>
            </div>

            {/* Inputs and Help Text */}
            <div className="p-5">
              {modalTab === 'value' ? (
                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Valor en Miles de Pesos
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      $
                    </span>
                    <input
                      id="input-modal-value"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={modalValueInput}
                      onChange={(e) => setModalValueInput(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Ej. 500 para $500.000"
                      className="w-full pl-8 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      .000
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      💡 <strong>Ingrese la inicial en miles de pesos:</strong>
                      <br />• 500 = $500.000 COP
                      <br />• 1250 = $1.250.000 COP
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Porcentaje Exacto
                  </label>
                  <div className="relative">
                    <input
                      id="input-modal-pct"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={modalPctInput}
                      onChange={(e) => setModalPctInput(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Ej. 17 para 17%"
                      className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      %
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      💡 Permite escribir cualquier porcentaje directamente:
                      <br />• Ejemplos: 8%, 12%, 17%, 33%
                      <br />• No se limita a múltiplos de cinco
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="bg-slate-50 px-5 py-3.5 flex justify-end gap-2.5 border-t border-slate-100">
              <button
                id="btn-modal-cancel"
                onClick={() => setManualModalOpen(false)}
                className="px-4 py-2 text-xs font-extrabold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                id="btn-modal-confirm"
                onClick={handleConfirmManualInitial}
                className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-black rounded-xl shadow-sm hover:shadow active:scale-95 transition-all uppercase tracking-wider"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
