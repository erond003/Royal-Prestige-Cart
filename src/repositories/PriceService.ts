/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, FinancialFactor, Configuration, Quotation, User, CompanyProfile } from '../types';
import { MOCK_PRODUCTS, MOCK_FINANCIAL_FACTORS, MOCK_CONFIGURATION, MOCK_USERS } from '../mockData';
import { GoogleSheetsProvider } from '../providers/GoogleSheetsProvider';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

export const PriceService = {
  /**
   * Retrieves products for the active or given company profile.
   * Can use GoogleSheetsProvider in the future, falls back to MOCK_PRODUCTS.
   */
  async getProducts(companyProfile: CompanyProfile = getActiveCompanyProfile()): Promise<Product[]> {
    console.log(`[PriceService] Fetching products for company profile: ${companyProfile.companyName}`);
    
    // Structured error handling simulations
    if (!companyProfile || !companyProfile.companyName) {
      throw new Error('Error: empresa inexistente');
    }
    
    try {
      if (companyProfile.googleSheetId) {
        await GoogleSheetsProvider.connect(companyProfile);
        // Range read simulation
        const range = `${companyProfile.productsSheetName}!A2:F100`;
        await GoogleSheetsProvider.readRange(companyProfile.googleSheetId, range);
      }
    } catch (error) {
      console.warn('[PriceService] Error fetching products from Sheets, using mock data:', error);
      throw new Error('Error de conexión: No se pudo conectar a Google Sheets');
    }
    return MOCK_PRODUCTS;
  },

  /**
   * Retrieves financial factors for the active or given company profile.
   */
  async getFinancialFactors(companyProfile: CompanyProfile = getActiveCompanyProfile()): Promise<FinancialFactor[]> {
    console.log(`[PriceService] Fetching financial factors for company profile: ${companyProfile.companyName}`);
    
    if (!companyProfile || !companyProfile.companyName) {
      throw new Error('Error: empresa inexistente');
    }

    try {
      if (companyProfile.googleSheetId) {
        await GoogleSheetsProvider.connect(companyProfile);
        const range = `${companyProfile.financialFactorsSheetName}!A2:D50`;
        await GoogleSheetsProvider.readRange(companyProfile.googleSheetId, range);
      }
    } catch (error) {
      console.warn('[PriceService] Error fetching financial factors, using mock:', error);
      throw new Error('Error: hoja inexistente o sin permisos');
    }
    return MOCK_FINANCIAL_FACTORS;
  },

  /**
   * Retrieves active configuration for the company profile.
   */
  async getConfiguration(companyProfile: CompanyProfile = getActiveCompanyProfile()): Promise<Configuration> {
    console.log(`[PriceService] Fetching configuration for company profile: ${companyProfile.companyName}`);
    
    if (!companyProfile || !companyProfile.companyName) {
      throw new Error('Error: empresa inexistente');
    }

    try {
      if (companyProfile.googleSheetId) {
        await GoogleSheetsProvider.connect(companyProfile);
        const range = `${companyProfile.configurationSheetName}!A2:H2`;
        await GoogleSheetsProvider.readRange(companyProfile.googleSheetId, range);
      }
    } catch (error) {
      console.warn('[PriceService] Error fetching configuration, using mock:', error);
      throw new Error('Error: configuración incompleta en Google Sheets');
    }
    
    // Return MOCK_CONFIGURATION mapped with Spanish fields
    return {
      nombreDistribuidor: companyProfile.companyName + ' S.A.S.',
      direccion: 'Calle Ficticia #123',
      telefono: '+57 300 000 0000',
      codigoDistribuidor: 'DIST-' + companyProfile.companyId.toUpperCase(),
      inicialPorDefecto: MOCK_CONFIGURATION.defaultInitialPercentage,
      inicialMaxima: MOCK_CONFIGURATION.maxInitialPercentage,
      cuotasDisponibles: [6, 12, 18, 24, 30, 36],
      version: 1,
      // Keep compatibility fields
      defaultInitialPercentage: MOCK_CONFIGURATION.defaultInitialPercentage,
      minInitialPercentage: MOCK_CONFIGURATION.minInitialPercentage,
      maxInitialPercentage: MOCK_CONFIGURATION.maxInitialPercentage,
      allowedIncrement: MOCK_CONFIGURATION.allowedIncrement,
      currencyFormat: MOCK_CONFIGURATION.currencyFormat,
      currency: MOCK_CONFIGURATION.currency,
      roundToNextThousand: MOCK_CONFIGURATION.roundToNextThousand,
    };
  },

  /**
   * Saves a quotation to the active company sheet.
   */
  async saveQuotation(quotation: Quotation, companyProfile: CompanyProfile = getActiveCompanyProfile()): Promise<boolean> {
    console.log(`[PriceService] Saving quotation for client ${quotation.cliente} under distributor ${companyProfile.companyName}`);
    
    if (!companyProfile || !companyProfile.companyName) {
      throw new Error('Error: empresa inexistente');
    }
    if (!quotation.cliente) {
      throw new Error('Error: configuración incompleta (Falta nombre del cliente)');
    }
    if (!companyProfile.googleSheetId) {
      throw new Error('Error de conexión: Hoja de cálculo inexistente o ID inválido');
    }

    try {
      await GoogleSheetsProvider.connect(companyProfile);
      const row = [
        [
          quotation.id,
          quotation.fecha,
          quotation.hora,
          quotation.cliente,
          companyProfile.companyId,
          companyProfile.companyName,
          quotation.codigoVendedor,
          quotation.nombreVendedor,
          JSON.stringify(quotation.items),
          quotation.totalCompra,
          quotation.inicialAplicada,
          quotation.numeroCuotas,
          quotation.pagoMinimoMensual,
          JSON.stringify(quotation.items.map(item => ({
            codigo: item.codigo,
            descripcion: item.descripcion,
            precioTotal: item.precioTotal
          }))) // price snapshot JSON
        ]
      ];
      await GoogleSheetsProvider.writeRange(companyProfile.googleSheetId, `${companyProfile.quotationsSheetName}!A:N`, row);
      return true;
    } catch (error) {
      console.error('[PriceService] Failed to write quotation to Sheets:', error);
      throw new Error('Error de conexión: No se pudo escribir la cotización');
    }
  },

  /**
   * Retrieves authorized users for a distributor.
   */
  async getUsers(distributorId: string): Promise<User[]> {
    console.log(`[PriceService] Fetching users for distributor: ${distributorId}`);
    if (!distributorId) {
      throw new Error('Error: empresa inexistente o ID de distribuidor vacío');
    }
    return MOCK_USERS.filter(u => u.distribuidorId === distributorId);
  },

  /**
   * Logs in a user based on seller code and password.
   */
  async loginUser(code: string, password: string): Promise<User | null> {
    console.log(`[PriceService] Attempting login for seller code: ${code}`);
    if (!code || !password) {
      throw new Error('Error: configuración incompleta (Usuario y contraseña requeridos)');
    }
    const user = MOCK_USERS.find(u => u.codigoVendedor === code && u.password === password);
    if (!user) {
      throw new Error('Error: vendedor inexistente o contraseña incorrecta');
    }
    return user;
  }
};
