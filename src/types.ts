/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
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

export interface DistributorInfo {
  name: string;
  code: string;
  address: string;
  phone: string;
  sellerCode: string;
}

// Phase 3.0 required models
export interface Distributor {
  name: string;
  code: string;
  address: string;
  phone: string;
  sellerCode: string;
}

export interface Configuration {
  defaultInitialPercentage: number;
  minInitialPercentage: number;
  maxInitialPercentage: number;
  allowedIncrement: number; // increment step, e.g. 5
  currencyFormat: string; // e.g. '$#,##0'
  currency: string; // e.g. 'COP'
  roundToNextThousand: boolean;
}

export interface PaymentFactor {
  term: number;
  factor: number;
}

export interface Quotation {
  id: string;
  clientName: string;
  date: string;
  items: QuotationItem[];
  totalPrice: number;
  initialAmount: number;
  financedAmount: number;
  plazo: number;
  cuotaMensual: number;
}

export type QuotationItem = QuoteItem;

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
