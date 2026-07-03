/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCart } from '../context/CartContext';
import { FileText, Calendar, User, ArrowRight, PlusCircle } from 'lucide-react';

export const RecentQuotesScreen: React.FC = () => {
  const { recentQuotes, setScreen } = useCart();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Historial</h2>
          <p className="text-xs text-slate-500">Últimas cotizaciones preparadas en el dispositivo</p>
        </div>
        <button
          id="btn-recents-new-quote"
          onClick={() => setScreen('quote')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors text-xs font-bold"
        >
          <PlusCircle className="w-4 h-4" /> Nuevo
        </button>
      </div>

      <div className="space-y-3">
        {recentQuotes.length > 0 ? (
          recentQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{quote.clientName}</span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {quote.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {quote.itemsCount} {quote.itemsCount === 1 ? 'producto' : 'productos'} • Plazo: {quote.months} meses
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t border-slate-50 sm:border-0">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Cotizado</div>
                  <div className="text-base font-bold text-slate-900">{Math.round(quote.total / 1000)}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cuota Estimada</div>
                  <div className="text-sm font-bold text-blue-800">{Math.round(quote.cuota / 1000)}/mes</div>
                </div>

                <button
                  id={`btn-open-quote-${quote.id}`}
                  onClick={() => setScreen('quote')}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Ver cotizador"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white py-12 rounded-xl border border-slate-100 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">No hay cotizaciones recientes</p>
            <p className="text-xs mt-1">Las cotizaciones preparadas aparecerán aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
};
