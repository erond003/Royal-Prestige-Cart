/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronLeft, User, ShieldCheck, Check, MoreVertical, AlertTriangle } from 'lucide-react';
import { CustomerNameDialog } from './CustomerNameDialog';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    setScreen, 
    goBack, 
    activeProfile, 
    cartItems, 
    clearAllCustomInitials,
    initialPercentage,
    plazo,
    validationError,
    setValidationError,
    clientName,
    setClientName
  } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Name modal state
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [tempClientName, setTempClientName] = useState('');
  const [nameInputError, setNameInputError] = useState<string | null>(null);

  const getTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Royal Prestige®';
      case 'quote':
        return 'Cotizador';
      case 'prepare':
        return 'Preparar Pedido';
      case 'config':
        return 'Configuración';
      case 'recent_quotes':
        return 'Cotizaciones Recientes';
      default:
        return 'Royal Prestige®';
    }
  };

  const getSubtitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Distribuidor Autorizado';
      case 'quote':
        return 'Simulador Financiero';
      case 'prepare':
        return 'Desglose y Resumen';
      case 'config':
        return 'Configuración del Perfil';
      case 'recent_quotes':
        return 'Historial de Cotizaciones';
      default:
        return 'Distribuidor Autorizado';
    }
  };

  const handlePrepareClick = () => {
    // 1. Products Validation: At least one selected
    const selectedItems = cartItems.filter(item => item.isSelected);
    if (selectedItems.length === 0) {
      setValidationError('Debe seleccionar al menos un producto en el cotizador antes de preparar el pedido.');
      return;
    }

    // 2. Initial Validation: At least 5% of individual product price
    for (const item of selectedItems) {
      const itemTotal = item.product.price * item.quantity;
      let itemInitial = 0;
      if (item.customInitial) {
        if (item.customInitial.type === 'percentage') {
          itemInitial = Math.round(itemTotal * (item.customInitial.value / 100));
        } else {
          itemInitial = item.customInitial.value;
        }
      } else {
        itemInitial = Math.round(itemTotal * (initialPercentage / 100));
      }

      // Check if under 5% of itemTotal
      const minRequired = itemTotal * 0.05;
      if (itemInitial < minRequired) {
        setValidationError(
          `La inicial para "${item.product.name}" es inferior al 5% requerido ($${Math.round(minRequired).toLocaleString()} COP). Por favor, define una inicial mayor para este producto.`
        );
        return;
      }
    }

    // 3. Plazo Validation: Valid term
    if (!plazo || plazo <= 0) {
      setValidationError('Debe seleccionar un plazo válido para financiar el saldo restante.');
      return;
    }

    // If all valid, trigger name input dialog
    setTempClientName(clientName);
    setNameInputError(null);
    setNameModalOpen(true);
  };

  const handleConfirmName = () => {
    if (!tempClientName || !tempClientName.trim()) {
      setNameInputError('El nombre del cliente es obligatorio.');
      return;
    }
    setClientName(tempClientName.trim());
    setNameInputError(null);
    setNameModalOpen(false);
    setScreen('prepare');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 sm:py-3.5 transition-all duration-200">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' && (
            <button
              id="header-back-btn"
              onClick={goBack}
              className="p-2 -ml-2 rounded-full hover:bg-slate-200/60 active:scale-95 transition-all text-slate-700"
              aria-label="Volver"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              {currentScreen === 'home' && (
                <ShieldCheck className="w-5 h-5 text-blue-800" />
              )}
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                {getTitle()}
              </h1>
            </div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-1">
              {getSubtitle()}
            </p>
          </div>
          {currentScreen === 'quote' && (
            <button
              id="btn-header-prepare"
              onClick={handlePrepareClick}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm active:scale-90 hover:bg-blue-700 transition-all ml-1 shrink-0"
              title="Preparar pedido"
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {currentScreen === 'quote' && (
            <div className="relative">
              <button
                id="header-more-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 rounded-full hover:bg-slate-200/60 active:scale-95 transition-all text-slate-700"
                aria-label="Más opciones"
              >
                <MoreVertical className="w-4.5 h-4.5" />
              </button>
              
              {menuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-slate-200/80 shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      id="btn-apply-global-config"
                      onClick={() => {
                        clearAllCustomInitials();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Aplicar configuración global
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Distributor Active Profile Header Badge */}
          <button
            id="header-profile-badge"
            onClick={() => setScreen('config')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-700 transition-all text-xs font-medium border border-slate-200/50"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline max-w-[120px] truncate">{activeProfile}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Premium Validation Error Modal */}
      {validationError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with fade-in and blur */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setValidationError(null)}
          />
          
          {/* Centered card content with pop-up transition */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-50 transform scale-100 transition-all duration-200 animate-in zoom-in-95 ease-out p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Requisito no cumplido
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                {validationError}
              </p>
            </div>

            <button
              id="btn-close-validation-error"
              onClick={() => setValidationError(null)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-950 text-white text-xs font-black rounded-xl shadow-sm hover:shadow active:scale-95 transition-all uppercase tracking-wider"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Client Name Input Modal */}
      <CustomerNameDialog
        isOpen={nameModalOpen}
        tempClientName={tempClientName}
        setTempClientName={setTempClientName}
        nameInputError={nameInputError}
        setNameInputError={setNameInputError}
        onCancel={() => setNameModalOpen(false)}
        onConfirm={handleConfirmName}
      />
    </header>
  );
};
