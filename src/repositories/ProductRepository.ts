/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, CompanyProfile } from '../types';
import { MOCK_PRODUCTS } from '../mockData';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

export const ProductRepository = {
  /**
   * Retrieves all products. Optionally filters by company profile.
   */
  getProducts(companyProfile: CompanyProfile = getActiveCompanyProfile()): Product[] {
    // If companyProfile is specified but invalid, throw structured errors
    if (!companyProfile || (!companyProfile.active && companyProfile.companyName !== 'Witman Group')) {
      throw new Error('Error: Empresa inexistente o configuración incompleta.');
    }
    // Future phases will fetch these from a company-specific Google Sheets source using GoogleSheetsProvider
    return MOCK_PRODUCTS;
  },

  /**
   * Finds a product by its unique code.
   */
  getProductByCode(code: string, companyProfile: CompanyProfile = getActiveCompanyProfile()): Product | undefined {
    return MOCK_PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
  },

  /**
   * Searches products by name, code, category, or price.
   */
  searchProducts(query: string, companyProfile: CompanyProfile = getActiveCompanyProfile()): Product[] {
    const term = query.toLowerCase().trim();
    const products = this.getProducts(companyProfile);
    if (!term) return products;
    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(term);
      const matchesCode = product.code.toLowerCase().includes(term);
      const matchesCategory = product.category.toLowerCase().includes(term);
      const matchesPrice = product.price.toString().includes(term);
      
      const numbersInQuery = term.match(/\d+/g);
      const matchesNumbers = numbersInQuery
        ? numbersInQuery.every((num) => product.name.includes(num) || product.code.includes(num))
        : false;

      return matchesName || matchesCode || matchesCategory || matchesPrice || matchesNumbers;
    });
  },
};
