/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Distributor, CompanyProfile } from '../types';
import { MOCK_DISTRIBUTORS } from '../mockData';
import { getActiveCompanyProfile } from './ActiveCompanyProfile';

export const DistributorRepository = {
  /**
   * Retrieves distributor details.
   */
  getDistributor(companyProfile: CompanyProfile = getActiveCompanyProfile()): Distributor {
    const profileName = companyProfile?.companyName;
    if (profileName && MOCK_DISTRIBUTORS[profileName]) {
      return MOCK_DISTRIBUTORS[profileName];
    }
    return MOCK_DISTRIBUTORS['Witman Group'];
  },
};
