/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentFactor, CompanyProfile } from '../types';
import { MOCK_PAYMENT_FACTORS } from '../mockData';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

export const FinancialRepository = {
  /**
   * Retrieves all active payment factors (term & coefficient).
   */
  getPaymentFactors(companyProfile: CompanyProfile = getActiveCompanyProfile()): PaymentFactor[] {
    // Future integration can customize factors depending on companyProfile using GoogleSheetsProvider
    return MOCK_PAYMENT_FACTORS;
  },

  /**
   * Retrieves the list of available terms in months.
   */
  getAvailableTerms(companyProfile: CompanyProfile = getActiveCompanyProfile()): number[] {
    return MOCK_PAYMENT_FACTORS.map((pf) => pf.term);
  },
};
