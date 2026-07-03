/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Configuration, CompanyProfile } from '../types';
import { MOCK_CONFIGURATION } from '../mockData';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

export const ConfigurationRepository = {
  /**
   * Retrieves the application configuration.
   */
  getConfiguration(companyProfile: CompanyProfile = getActiveCompanyProfile()): Configuration {
    // In future phases, this can load dynamically based on the companyProfile using GoogleSheetsProvider
    return MOCK_CONFIGURATION;
  },
};
