/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyProfile } from '../types';
import { MOCK_COMPANY_PROFILES } from '../mockData';

// Storage for active profile (in-memory, defaults to Witman Group)
let activeProfile: CompanyProfile = MOCK_COMPANY_PROFILES[0]; // Witman Group is first

/**
 * Retrieves the currently active company profile.
 */
export function getActiveCompanyProfile(): CompanyProfile {
  // Ensure we fall back or return the active state
  if (!activeProfile) {
    const defaultProfile = MOCK_COMPANY_PROFILES.find((p) => p.companyName === 'Witman Group');
    if (!defaultProfile) {
      throw new Error('Error: Empresa inexistente o configuración incompleta.');
    }
    return defaultProfile;
  }
  return activeProfile;
}

/**
 * Changes the active company profile.
 */
export function setActiveCompanyProfile(profile: CompanyProfile): void {
  if (!profile || !profile.companyName) {
    throw new Error('Error: Perfil de empresa inexistente o inválido.');
  }
  activeProfile = profile;
}
