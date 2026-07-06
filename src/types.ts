/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 3.1 Product
export interface Product {
  // New Google Sheets Schema (Phase 3.6)
  linea: string;
  codigo: string;
  descripcion: string;
  precioSinIva: number;
  iva: number;
  precioTotal: number;

  // Existing Compatibility Fields (Do not remove to keep existing UI working perfectly)
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
}

export interface CustomInitial {
  type: 'percentage' | 'value';
  value: number; // If percentage, e.g., 17 for 17%; if value, the absolute COP value (e.g., 500000 for $500,000 COP)
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  isSelected: boolean;
  customInitial?: CustomInitial;
}

// 3.2 FinancialFactor
export interface FinancialFactor {
  numeroCuotas: number;
  factorFinanciero: number;
  tasaEfectivaAnual: number;
  tasaMensual: number;
}

// 3.3 User
export interface User {
  codigoVendedor: string;
  nombre: string;
  password: string;
  distribuidorId: string;
  activo: boolean;
}

// 3.4 Distributor
export interface Distributor {
  // New Google Sheets Schema (Phase 3.6)
  id: string;
  nombre: string;
  googleSheetId: string;

  // Existing Compatibility Fields (Do not remove)
  name: string;
  code: string;
  address: string;
  phone: string;
  sellerCode: string;
}

// For existing components
export type DistributorInfo = Distributor;

// 3.5 QuotationItem
export interface QuotationItem {
  // New Google Sheets Schema (Phase 3.6)
  codigo: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;

  // Existing Compatibility Fields (Do not remove)
  product?: Product;
  quantity?: number;
  isSelected?: boolean;
  customInitial?: CustomInitial;
}

// 3.6 Quotation
export interface Quotation {
  // New Google Sheets Schema (Phase 3.6)
  id: string;
  fecha: string;
  hora: string;
  cliente: string;
  distribuidorId: string;
  codigoVendedor: string;
  nombreVendedor: string;
  items: QuotationItem[];
  totalCompra: number;
  inicialAplicada: number;
  numeroCuotas: number;
  pagoMinimoMensual: number;

  // Existing Compatibility Fields (Do not remove)
  clientName?: string;
  date?: string;
  totalPrice?: number;
  initialAmount?: number;
  financedAmount?: number;
  plazo?: number;
  cuotaMensual?: number;
}

// 3.7 Configuration
export interface Configuration {
  // New Google Sheets Schema (Phase 3.6)
  nombreDistribuidor: string;
  direccion: string;
  telefono: string;
  codigoDistribuidor: string;
  inicialPorDefecto: number;
  inicialMaxima: number;
  cuotasDisponibles: number[];
  version: number;

  // Existing Compatibility Fields (Do not remove)
  defaultInitialPercentage: number;
  minInitialPercentage: number;
  maxInitialPercentage: number;
  allowedIncrement: number;
  currencyFormat: string;
  currency: string;
  roundToNextThousand: boolean;
}

// Existing Compatibility Type for payment factors
export interface PaymentFactor {
  term: number;
  factor: number;
}

export interface UserProfile {
  id: string;
  name: string;
  isActive: boolean;
  sheetsUrl?: string;
}

export type ScreenType = 'home' | 'quote' | 'prepare' | 'config' | 'recent_quotes';

export interface RecentQuote {
  id: string;
  clientName: string;
  date: string;
  itemsCount: number;
  total: number;
  initial: number;
  cuota: number;
  months: number;
}

export interface CompanyProfile {
  companyId: string;
  companyName: string;
  googleSheetId: string;
  productsSheetName: string;
  financialFactorsSheetName: string;
  configurationSheetName: string;
  quotationsSheetName: string;
  distributorSheetName: string;
  active: boolean;
}
