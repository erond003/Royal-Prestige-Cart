/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentFactor, CompanyProfile } from '../types';
import { MOCK_PAYMENT_FACTORS } from '../mockData';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

let activeFactors: PaymentFactor[] | null = null;

export const FinancialRepository = {
  setActiveFactors(factors: PaymentFactor[]) {
    activeFactors = factors;
  },

  getActiveFactors(): PaymentFactor[] | null {
    return activeFactors;
  },

  /**
   * Retrieves all active payment factors (term & coefficient).
   */
  getPaymentFactors(companyProfile: CompanyProfile = getActiveCompanyProfile()): PaymentFactor[] {
    if (activeFactors && activeFactors.length > 0) {
      return activeFactors;
    }
    return MOCK_PAYMENT_FACTORS;
  },

  /**
   * Retrieves the list of available terms in months.
   */
  getAvailableTerms(companyProfile: CompanyProfile = getActiveCompanyProfile()): number[] {
    if (activeFactors && activeFactors.length > 0) {
      return activeFactors.map((pf) => pf.term);
    }
    return MOCK_PAYMENT_FACTORS.map((pf) => pf.term);
  },
};
