/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User } from 'lucide-react';
import { SelectedProductsTable } from '../components/SelectedProductsTable';
import { FinancialBreakdown } from '../components/FinancialBreakdown';
import { DistributorInformation } from '../components/DistributorInformation';
import { CopyOrderButton } from '../components/CopyOrderButton';

export const PrepareOrderScreen: React.FC = () => {
  const {
    cartItems,
    totalPrice,
    initialAmount,
    financedAmount,
    cuotaMensual,
    shippingAmount,
    ivaAmount,
    rawPurchasePrice,
    plazo,
    annualInterestRate,
    monthlyInterestRate,
    distributorInfo,
    addRecentQuote,
    setScreen,
    clientName,
    distributorConfig,
  } = useCart();

  const [copied, setCopied] = useState(false);

  const rawLogoUrl = distributorConfig?.logoUrl || '';
  const cleanLogoUrl = typeof rawLogoUrl === 'string'
    ? rawLogoUrl.replace('[', '').replace(']', '').trim()
    : '';

  const activeItems = cartItems.filter((item) => item.isSelected);
  const fmt = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-CO');
  };

  const handleCopyOrder = () => {
    // Generate clean plain text summary matching prompt exactly
    let productsText = '';
    activeItems.forEach((item) => {
      productsText += `${item.product.code} x ${item.quantity}\n${item.product.name}\n`;
    });

    const summaryText = `ROYAL PRESTIGE CART

Productos
${productsText.trim()}

Precio total: ${fmt(totalPrice)}
Inicial: ${fmt(initialAmount)}
Saldo a financiar: ${fmt(financedAmount)}
Número de cuotas: ${plazo}
Pago mensual: ${fmt(cuotaMensual)}`;

    navigator.clipboard.writeText(summaryText)
      .then(() => {
        setCopied(true);
        addRecentQuote(clientName); // Add to local history list for higher-fidelity demonstration!
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => {
        console.error('Error al copiar pedido: ', err);
      });
  };

  if (activeItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-slate-400">
        <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
        <p className="text-sm font-semibold">No has seleccionado ningún producto</p>
        <p className="text-xs mt-1">Por favor ve al Cotizador y selecciona al menos un producto para preparar su desglose.</p>
        <button
          id="btn-return-cotizador"
          onClick={() => setScreen('quote')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg shadow-sm"
        >
          Ir al Cotizador
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6 font-sans">
      {/* Company Header with logo from distributorConfig */}
      {distributorConfig?.companyName && (
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            {cleanLogoUrl && (
              <img
                src={cleanLogoUrl}
                alt={distributorConfig.companyName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 object-contain rounded-lg border border-slate-100 p-1 bg-white shrink-0"
              />
            )}
            <div>
              <h2 className="text-base font-black text-slate-950 uppercase tracking-wide">
                {distributorConfig.companyName}
              </h2>
              {distributorConfig.address && (
                <p className="text-xs text-slate-500 font-medium">
                  {distributorConfig.address} {distributorConfig.city ? `• ${distributorConfig.city}` : ''}
                </p>
              )}
              {distributorConfig.phone && (
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Tel: {distributorConfig.phone}
                </p>
              )}
            </div>
          </div>
          <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/40 font-mono shrink-0">
            COTIZACIÓN OFICIAL
          </div>
        </div>
      )}

      {/* Cliente Info Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Cliente
          </span>
          <p className="text-sm font-black text-slate-900">{clientName}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <User className="w-4 h-4" />
        </div>
      </div>

      {/* BLOQUE 1: PRODUCTOS */}
      <SelectedProductsTable
        activeItems={activeItems}
        formatPrice={fmt}
      />

      {/* BLOQUE 2: DESGLOSE */}
      <FinancialBreakdown
        rawPurchasePrice={rawPurchasePrice}
        shippingAmount={shippingAmount}
        ivaAmount={ivaAmount}
        totalPrice={totalPrice}
        initialAmount={initialAmount}
        financedAmount={financedAmount}
        annualInterestRate={annualInterestRate}
        monthlyInterestRate={monthlyInterestRate}
        plazo={plazo}
        cuotaMensual={cuotaMensual}
        formatPrice={fmt}
      />

      {/* BLOQUE 3: DATOS DEL DISTRIBUIDOR */}
      <DistributorInformation
        distributorInfo={distributorInfo}
      />

      {/* BLOQUE 4: BOTÓN COPIAR PEDIDO & REGRESAR */}
      <div className="space-y-3">
        <CopyOrderButton
          copied={copied}
          onCopy={handleCopyOrder}
        />

        <button
          id="btn-back-to-quote"
          onClick={() => setScreen('quote')}
          className="w-full py-3.5 bg-slate-100 hover:bg-slate-200/80 active:scale-95 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200/50"
        >
          Regresar al Cotizador
        </button>
      </div>
    </div>
  );
};
