/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CustomerNameDialogProps {
  isOpen: boolean;
  tempClientName: string;
  setTempClientName: (name: string) => void;
  nameInputError: string | null;
  setNameInputError: (error: string | null) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const CustomerNameDialog: React.FC<CustomerNameDialogProps> = ({
  isOpen,
  tempClientName,
  setTempClientName,
  nameInputError,
  setNameInputError,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with fade-in and blur */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onCancel}
      />
      
      {/* Centered card content with pop-up transition */}
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-50 transform scale-100 transition-all duration-200 p-6 space-y-4 animate-in zoom-in-95 ease-out">
        <div className="space-y-1 text-center">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
            Nombre del cliente
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            Ingrese el nombre del cliente para guardar esta cotización.
          </p>
        </div>

        <div className="space-y-1.5">
          <input
            id="modal-input-client-name"
            type="text"
            placeholder="Ejemplo: Juan Pérez"
            value={tempClientName}
            onChange={(e) => {
              setTempClientName(e.target.value);
              if (nameInputError) setNameInputError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onConfirm();
              }
            }}
            className={`w-full bg-slate-50 border ${
              nameInputError ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200/60 focus:border-blue-800'
            } rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-semibold`}
            autoFocus
          />
          {nameInputError && (
            <p className="text-[10px] text-rose-600 font-bold ml-1">
              {nameInputError}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            id="btn-cancel-client-name"
            onClick={onCancel}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-black rounded-xl active:scale-95 transition-all uppercase tracking-wider"
          >
            Cancelar
          </button>
          <button
            id="btn-confirm-client-name"
            onClick={onConfirm}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-sm hover:shadow active:scale-95 transition-all uppercase tracking-wider"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
