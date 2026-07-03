/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyOrderButtonProps {
  copied: boolean;
  onCopy: () => void;
}

export const CopyOrderButton: React.FC<CopyOrderButtonProps> = ({
  copied,
  onCopy,
}) => {
  return (
    <div className="space-y-3">
      <button
        id="btn-copiar-pedido"
        onClick={onCopy}
        className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 ${
          copied
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-900 hover:bg-slate-950 text-white'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-200" />
            Pedido Copiado con Éxito
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-400" />
            Copiar pedido
          </>
        )}
      </button>

      {copied && (
        <p className="text-[11px] text-emerald-600 font-semibold text-center animate-pulse">
          El pedido estructurado se copió al portapapeles y se agregó al historial de cotizaciones.
        </p>
      )}
    </div>
  );
};
