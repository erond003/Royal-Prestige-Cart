/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, RecentQuote, Distributor, Configuration, PaymentFactor, CompanyProfile } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  // Sistemas de Cocina
  {
    id: 'rp-sc-05',
    code: 'RP-SC05',
    name: 'Sistema de Cocina Esencial de 5 Piezas',
    category: 'Sistemas de Cocina',
    price: 1499000,
  },
  {
    id: 'rp-sc-07',
    code: 'RP-SC07',
    name: 'Sistema de Cocina Clásico de 7 Piezas',
    category: 'Sistemas de Cocina',
    price: 1999000,
  },
  {
    id: 'rp-sc-10',
    code: 'RP-SC10',
    name: 'Sistema de Cocina Familiar de 10 Piezas',
    category: 'Sistemas de Cocina',
    price: 2899000,
  },
  {
    id: 'rp-sc-15',
    code: 'RP-SC15',
    name: 'Sistema de Cocina Gourmet de 15 Piezas',
    category: 'Sistemas de Cocina',
    price: 4199000,
  },

  // Sartenes y Ollas Especiales
  {
    id: 'rp-sa-08',
    code: 'RP-SA08',
    name: 'Sartén Novel de 8 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 450000,
  },
  {
    id: 'rp-sa-10',
    code: 'RP-SA10',
    name: 'Sartén Novel de 10 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 620000,
  },
  {
    id: 'rp-sa-12',
    code: 'RP-SA12',
    name: 'Sartén Novel de 12 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 750000,
  },
  {
    id: 'rp-pa-14',
    code: 'RP-PA14',
    name: 'Paellera Premium de 14 Pulgadas',
    category: 'Sartenes y Especialidades',
    price: 850000,
  },
  {
    id: 'rp-wk-12',
    code: 'RP-WK12',
    name: 'Wok Novel de 12 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 790000,
  },

  // Purificación de Agua
  {
    id: 'rp-fp-6000',
    code: 'RP-FP6000',
    name: 'Sistema de Filtración FrescaPure 6000',
    category: 'Purificación de Agua',
    price: 1250000,
  },
  {
    id: 'rp-fp-show',
    code: 'RP-FPSHW',
    name: 'Filtro para Ducha FrescaPure Shower',
    category: 'Purificación de Agua',
    price: 350000,
  },

  // Electrodomésticos Premium
  {
    id: 'rp-el-pres',
    code: 'RP-EPRES',
    name: 'Olla de Presión Inteligente 6 Litros',
    category: 'Electrodomésticos Premium',
    price: 590000,
  },
  {
    id: 'rp-el-extr',
    code: 'RP-EEXTR',
    name: 'Extractor de Jugos Royal Juice Max',
    category: 'Electrodomésticos Premium',
    price: 890000,
  },
  {
    id: 'rp-el-lic',
    code: 'RP-ELIC',
    name: 'Licuadora de Alta Potencia Maxicooker',
    category: 'Electrodomésticos Premium',
    price: 950000,
  },

  // Cuchillería y Accesorios
  {
    id: 'rp-cu-set',
    code: 'RP-CUSET',
    name: 'Juego de Cuchillos de Precisión (5 Piezas)',
    category: 'Cuchillos y Accesorios',
    price: 420000,
  },
  {
    id: 'rp-cu-hach',
    code: 'RP-CUHACH',
    name: 'Hachuela de Cocina Profesional',
    category: 'Cuchillos y Accesorios',
    price: 180000,
  },
  {
    id: 'rp-ac-tab',
    code: 'RP-ACTAB',
    name: 'Tabla para Cortar de Bambú Premium',
    category: 'Cuchillos y Accesorios',
    price: 120000,
  }
];

export const MOCK_RECENT_QUOTES: RecentQuote[] = [
  {
    id: 'cot-1',
    clientName: 'Alejandro Martínez',
    date: 'Hace 2 horas',
    itemsCount: 2,
    total: 2249000,
    initial: 224900,
    cuota: 102000,
    months: 24,
  },
  {
    id: 'cot-2',
    clientName: 'María Camila Restrepo',
    date: 'Ayer',
    itemsCount: 1,
    total: 1250000,
    initial: 125000,
    cuota: 57000,
    months: 24,
  },
  {
    id: 'cot-3',
    clientName: 'Carlos Mario Giraldo',
    date: 'Hace 3 días',
    itemsCount: 3,
    total: 3469000,
    initial: 346900,
    cuota: 156000,
    months: 24,
  }
];

export const MOCK_DISTRIBUTORS: Record<string, Distributor> = {
  'Witman Group': {
    name: 'Witman Group S.A.S.',
    code: 'DIST-2026-WM',
    address: 'Av. Las Palmas #45-12, Oficina 802',
    phone: '+57 312 456 7890',
    sellerCode: 'SEL-8821',
  },
  'Equipo Norte': {
    name: 'Equipo Norte Royal S.A.',
    code: 'DIST-2026-EN',
    address: 'Calle 72 #54-95, Barranquilla',
    phone: '+57 300 987 6543',
    sellerCode: 'SEL-1104',
  },
  'Equipo Medellín': {
    name: 'Medellín Prestige Group',
    code: 'DIST-2026-EM',
    address: 'Carrera 43A #1-50, San Fernando Plaza',
    phone: '+57 310 112 2334',
    sellerCode: 'SEL-5509',
  },
  'Equipo Cali': {
    name: 'Cali Elite Distributors',
    code: 'DIST-2026-EC',
    address: 'Avenida Sexta #22N-40, Cali',
    phone: '+57 315 555 6677',
    sellerCode: 'SEL-4481',
  }
};

export const MOCK_DISTRIBUTOR: Distributor = MOCK_DISTRIBUTORS['Witman Group'];

export const MOCK_CONFIGURATION: Configuration = {
  defaultInitialPercentage: 10,
  minInitialPercentage: 5,
  maxInitialPercentage: 100,
  allowedIncrement: 5,
  currencyFormat: '$#,##0',
  currency: 'COP',
  roundToNextThousand: true,
};

export const MOCK_PAYMENT_FACTORS: PaymentFactor[] = [
  { term: 6, factor: 0.1791 },
  { term: 12, factor: 0.0931 },
  { term: 18, factor: 0.0645 },
  { term: 24, factor: 0.0501 },
  { term: 30, factor: 0.0416 },
  { term: 36, factor: 0.0359 },
];

export const MOCK_COMPANY_PROFILES: CompanyProfile[] = [
  {
    companyId: 'witman-group',
    companyName: 'Witman Group',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_WitmanGroupSheet2026',
    productsSheetName: 'Catalogo_Productos_Vigente',
    financialFactorsSheetName: 'Factores_Financieros',
    configurationSheetName: 'Configuracion_General',
    quotationsSheetName: 'Registro_Pedidos_2026',
    distributorSheetName: 'Datos_Distribuidor',
    active: true,
  },
  {
    companyId: 'equipo-norte',
    companyName: 'Equipo Norte',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoNorteSheet2026',
    productsSheetName: 'Catalogo_Productos_Vigente',
    financialFactorsSheetName: 'Factores_Financieros',
    configurationSheetName: 'Configuracion_General',
    quotationsSheetName: 'Registro_Pedidos_2026',
    distributorSheetName: 'Datos_Distribuidor',
    active: false,
  },
  {
    companyId: 'equipo-medellin',
    companyName: 'Equipo Medellín',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoMedellinSheet2026',
    productsSheetName: 'Catalogo_Productos_Vigente',
    financialFactorsSheetName: 'Factores_Financieros',
    configurationSheetName: 'Configuracion_General',
    quotationsSheetName: 'Registro_Pedidos_2026',
    distributorSheetName: 'Datos_Distribuidor',
    active: false,
  },
  {
    companyId: 'equipo-cali',
    companyName: 'Equipo Cali',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoCaliSheet2026',
    productsSheetName: 'Catalogo_Productos_Vigente',
    financialFactorsSheetName: 'Factores_Financieros',
    configurationSheetName: 'Configuracion_General',
    quotationsSheetName: 'Registro_Pedidos_2026',
    distributorSheetName: 'Datos_Distribuidor',
    active: false,
  }
];
