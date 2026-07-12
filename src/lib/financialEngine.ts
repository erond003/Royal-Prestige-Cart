/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomInitial, CompanyProfile } from '../types';
import { FinancialRepository } from '../repositories/FinancialRepository';
import { ConfigurationRepository } from '../repositories/ConfigurationRepository';

/**
 * Redondea un valor hacia arriba al siguiente múltiplo de $1.000 COP, o según indique la configuración.
 * Regla obligatoria: Nunca redondear hacia abajo si está activo.
 */
export function roundToNextThousand(val: number, companyProfile?: CompanyProfile): number {
  if (isNaN(val) || val <= 0) return 0;
  const config = ConfigurationRepository.getConfiguration(companyProfile);
  if (config.roundToNextThousand) {
    return Math.ceil(val / 1000) * 1000;
  }
  return Math.round(val);
}

/**
 * Obtiene el factor financiero aplicable según el plazo seleccionado desde el repositorio.
 */
export function getFinancialFactor(plazo: number, companyProfile?: CompanyProfile): number {
  if (isNaN(plazo) || plazo <= 0) return 0;
  const factors = FinancialRepository.getPaymentFactors(companyProfile);
  const matched = factors.find((f) => f.term === plazo);
  if (matched !== undefined) {
    return matched.factor;
  }
  // Tasa de interés mensual de respaldo (1.5% mensual)
  const r = 0.015;
  return r / (1 - Math.pow(1 + r, -plazo));
}

/**
 * Calcula el precio total de un producto según su precio base y la cantidad.
 */
export function calculateTotalPrice(price: number, quantity: number): number {
  const p = isNaN(price) ? 0 : price;
  const q = isNaN(quantity) ? 0 : quantity;
  return p * q;
}

/**
 * Calcula la inicial para un precio total dado y un porcentaje de inicial global.
 */
export function calculateInitialAmount(total: number, initialPercentage: number): number {
  const t = isNaN(total) ? 0 : total;
  const pct = isNaN(initialPercentage) ? 0 : initialPercentage;
  return Math.round(t * (pct / 100));
}

/**
 * Calcula el saldo a financiar.
 */
export function calculateFinancedAmount(total: number, initial: number): number {
  const t = isNaN(total) ? 0 : total;
  const i = isNaN(initial) ? 0 : initial;
  const financed = t - i;
  return financed > 0 ? financed : 0;
}

/**
 * Base calculation and installment helper functions.
 */
export function calculateMonthlyPayment(financedAmount: number, plazo: number, companyProfile?: CompanyProfile): number {
  const fa = isNaN(financedAmount) ? 0 : financedAmount;
  const p = isNaN(plazo) ? 0 : plazo;
  if (fa <= 0 || p <= 0) return 0;
  const factor = getFinancialFactor(p, companyProfile);
  const rawCuota = fa * factor;
  return roundToNextThousand(rawCuota, companyProfile);
}

/**
 * Interfaz para los resultados de cálculo de un ítem individual.
 */
export interface ProductFinancials {
  totalPrice: number;
  initialAmount: number;
  financedAmount: number;
  monthlyPayment: number;
}

/**
 * Realiza todos los cálculos financieros para un solo producto.
 */
export function calculateProductFinancials(
  price: number,
  quantity: number,
  initialPercentage: number,
  plazo: number,
  customInitial?: CustomInitial,
  companyProfile?: CompanyProfile
): ProductFinancials {
  const total = calculateTotalPrice(price, quantity);
  let initial = 0;
  if (customInitial) {
    if (customInitial.type === 'percentage') {
      initial = Math.round(total * (customInitial.value / 100));
    } else {
      initial = customInitial.value;
    }
  } else {
    initial = calculateInitialAmount(total, initialPercentage);
  }
  const financed = calculateFinancedAmount(total, initial);
  const cuota = calculateMonthlyPayment(financed, plazo, companyProfile);

  return {
    totalPrice: total,
    initialAmount: initial,
    financedAmount: financed,
    monthlyPayment: cuota,
  };
}

/**
 * Interfaz para los totales globales del cotizador.
 */
export interface GlobalFinancials {
  rawPurchasePrice: number;
  shippingAmount: number;
  ivaAmount: number;
  totalPrice: number;
  initialAmount: number;
  financedAmount: number;
  cuotaMensual: number;
}

/**
 * Realiza los cálculos globales basados en los ítems seleccionados.
 */
export function calculateGlobalFinancials(
  selectedItems: Array<{ price: number; quantity: number; customInitial?: CustomInitial }>,
  initialPercentage: number,
  plazo: number,
  companyProfile?: CompanyProfile,
  taxRate: number = 0.19
): GlobalFinancials {
  // Total de la transacción es la suma base que ya incluye el IVA de los productos seleccionados
  const total = selectedItems.reduce(
    (sum, item) => sum + calculateTotalPrice(item.price, item.quantity),
    0
  );

  // Costo de envío premium simulado (desactivado para sincronización perfecta con filas de productos)
  const shippingAmount = 0;

  // Calcula el 'rawPurchasePrice' (Precio de Compra antes de IVA) dividiendo el totalPrice entre (1 + taxRate)
  const rawPurchasePrice = Math.round(total / (1 + taxRate));

  // Calcula el 'ivaAmount' (Monto del IVA) multiplicando ese precio base por el taxRate
  const ivaAmount = Math.round(rawPurchasePrice * taxRate);

  // Depósito inicial
  let initial = 0;
  if (selectedItems.length > 0) {
    const itemsInitialSum = selectedItems.reduce((sum, item) => {
      const itemTotal = calculateTotalPrice(item.price, item.quantity);
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
      return sum + itemInitial;
    }, 0);
    
    const shippingInitial = Math.round(shippingAmount * (initialPercentage / 100));
    initial = itemsInitialSum + shippingInitial;
  }

  // Saldo financiado
  const financed = calculateFinancedAmount(total, initial);

  // Cuota mensual (redondeada al múltiplo de $1.000 superior o según config)
  const cuota = calculateMonthlyPayment(financed, plazo, companyProfile);

  return {
    rawPurchasePrice,
    shippingAmount,
    ivaAmount,
    totalPrice: total,
    initialAmount: initial,
    financedAmount: financed,
    cuotaMensual: cuota,
  };
}
