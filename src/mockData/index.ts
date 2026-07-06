/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, RecentQuote, Distributor, Configuration, PaymentFactor, CompanyProfile, FinancialFactor, User } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  // Sistemas de Cocina
  {
    id: 'rp-sc-05',
    code: 'RP-SC05',
    name: 'Sistema de Cocina Esencial de 5 Piezas',
    category: 'Sistemas de Cocina',
    price: 1499000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sistemas de Cocina',
    codigo: 'RP-SC05',
    descripcion: 'Sistema de Cocina Esencial de 5 Piezas',
    precioSinIva: 1259664,
    iva: 239336,
    precioTotal: 1499000,
  },
  {
    id: 'rp-sc-07',
    code: 'RP-SC07',
    name: 'Sistema de Cocina Clásico de 7 Piezas',
    category: 'Sistemas de Cocina',
    price: 1999000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sistemas de Cocina',
    codigo: 'RP-SC07',
    descripcion: 'Sistema de Cocina Clásico de 7 Piezas',
    precioSinIva: 1679832,
    iva: 319168,
    precioTotal: 1999000,
  },
  {
    id: 'rp-sc-10',
    code: 'RP-SC10',
    name: 'Sistema de Cocina Familiar de 10 Piezas',
    category: 'Sistemas de Cocina',
    price: 2899000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sistemas de Cocina',
    codigo: 'RP-SC10',
    descripcion: 'Sistema de Cocina Familiar de 10 Piezas',
    precioSinIva: 2436134,
    iva: 462866,
    precioTotal: 2899000,
  },
  {
    id: 'rp-sc-15',
    code: 'RP-SC15',
    name: 'Sistema de Cocina Gourmet de 15 Piezas',
    category: 'Sistemas de Cocina',
    price: 4199000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sistemas de Cocina',
    codigo: 'RP-SC15',
    descripcion: 'Sistema de Cocina Gourmet de 15 Piezas',
    precioSinIva: 3528571,
    iva: 670429,
    precioTotal: 4199000,
  },

  // Sartenes y Ollas Especiales
  {
    id: 'rp-sa-08',
    code: 'RP-SA08',
    name: 'Sartén Novel de 8 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 450000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sartenes y Especialidades',
    codigo: 'RP-SA08',
    descripcion: 'Sartén Novel de 8 Pulgadas con Tapa',
    precioSinIva: 378151,
    iva: 71849,
    precioTotal: 450000,
  },
  {
    id: 'rp-sa-10',
    code: 'RP-SA10',
    name: 'Sartén Novel de 10 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 620000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sartenes y Especialidades',
    codigo: 'RP-SA10',
    descripcion: 'Sartén Novel de 10 Pulgadas con Tapa',
    precioSinIva: 521008,
    iva: 98992,
    precioTotal: 620000,
  },
  {
    id: 'rp-sa-12',
    code: 'RP-SA12',
    name: 'Sartén Novel de 12 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 750000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sartenes y Especialidades',
    codigo: 'RP-SA12',
    descripcion: 'Sartén Novel de 12 Pulgadas con Tapa',
    precioSinIva: 630252,
    iva: 119748,
    precioTotal: 750000,
  },
  {
    id: 'rp-pa-14',
    code: 'RP-PA14',
    name: 'Paellera Premium de 14 Pulgadas',
    category: 'Sartenes y Especialidades',
    price: 850000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sartenes y Especialidades',
    codigo: 'RP-PA14',
    descripcion: 'Paellera Premium de 14 Pulgadas',
    precioSinIva: 714286,
    iva: 135714,
    precioTotal: 850000,
  },
  {
    id: 'rp-wk-12',
    code: 'RP-WK12',
    name: 'Wok Novel de 12 Pulgadas con Tapa',
    category: 'Sartenes y Especialidades',
    price: 790000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Sartenes y Especialidades',
    codigo: 'RP-WK12',
    descripcion: 'Wok Novel de 12 Pulgadas con Tapa',
    precioSinIva: 663866,
    iva: 126134,
    precioTotal: 790000,
  },

  // Purificación de Agua
  {
    id: 'rp-fp-6000',
    code: 'RP-FP6000',
    name: 'Sistema de Filtración FrescaPure 6000',
    category: 'Purificación de Agua',
    price: 1250000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Purificación de Agua',
    codigo: 'RP-FP6000',
    descripcion: 'Sistema de Filtración FrescaPure 6000',
    precioSinIva: 1050420,
    iva: 199580,
    precioTotal: 1250000,
  },
  {
    id: 'rp-fp-show',
    code: 'RP-FPSHW',
    name: 'Filtro para Ducha FrescaPure Shower',
    category: 'Purificación de Agua',
    price: 350000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Purificación de Agua',
    codigo: 'RP-FPSHW',
    descripcion: 'Filtro para Ducha FrescaPure Shower',
    precioSinIva: 294118,
    iva: 55882,
    precioTotal: 350000,
  },

  // Electrodomésticos Premium
  {
    id: 'rp-el-pres',
    code: 'RP-EPRES',
    name: 'Olla de Presión Inteligente 6 Litros',
    category: 'Electrodomésticos Premium',
    price: 590000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Electrodomésticos Premium',
    codigo: 'RP-EPRES',
    descripcion: 'Olla de Presión Inteligente 6 Litros',
    precioSinIva: 495798,
    iva: 94202,
    precioTotal: 590000,
  },
  {
    id: 'rp-el-extr',
    code: 'RP-EEXTR',
    name: 'Extractor de Jugos Royal Juice Max',
    category: 'Electrodomésticos Premium',
    price: 890000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Electrodomésticos Premium',
    codigo: 'RP-EEXTR',
    descripcion: 'Extractor de Jugos Royal Juice Max',
    precioSinIva: 747899,
    iva: 142101,
    precioTotal: 890000,
  },
  {
    id: 'rp-el-lic',
    code: 'RP-ELIC',
    name: 'Licuadora de Alta Potencia Maxicooker',
    category: 'Electrodomésticos Premium',
    price: 950000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Electrodomésticos Premium',
    codigo: 'RP-ELIC',
    descripcion: 'Licuadora de Alta Potencia Maxicooker',
    precioSinIva: 798319,
    iva: 151681,
    precioTotal: 950000,
  },

  // Cuchillería y Accesorios
  {
    id: 'rp-cu-set',
    code: 'RP-CUSET',
    name: 'Juego de Cuchillos de Precisión (5 Piezas)',
    category: 'Cuchillos y Accesorios',
    price: 420000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Cuchillos y Accesorios',
    codigo: 'RP-CUSET',
    descripcion: 'Juego de Cuchillos de Precisión (5 Piezas)',
    precioSinIva: 352941,
    iva: 67059,
    precioTotal: 420000,
  },
  {
    id: 'rp-cu-hach',
    code: 'RP-CUHACH',
    name: 'Hachuela de Cocina Profesional',
    category: 'Cuchillos y Accesorios',
    price: 180000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Cuchillos y Accesorios',
    codigo: 'RP-CUHACH',
    descripcion: 'Hachuela de Cocina Profesional',
    precioSinIva: 151261,
    iva: 28739,
    precioTotal: 180000,
  },
  {
    id: 'rp-ac-tab',
    code: 'RP-ACTAB',
    name: 'Tabla para Cortar de Bambú Premium',
    category: 'Cuchillos y Accesorios',
    price: 120000,
    // Spanish Google Sheets Fields (Phase 3.6)
    linea: 'Cuchillos y Accesorios',
    codigo: 'RP-ACTAB',
    descripcion: 'Tabla para Cortar de Bambú Premium',
    precioSinIva: 100840,
    iva: 19160,
    precioTotal: 120000,
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
    id: 'witman-group',
    nombre: 'Witman Group S.A.S.',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_WitmanGroupSheet2026',
    name: 'Witman Group S.A.S.',
    code: 'DIST-2026-WM',
    address: 'Av. Las Palmas #45-12, Oficina 802',
    phone: '+57 312 456 7890',
    sellerCode: 'SEL-8821',
  },
  'Victory Corporation': {
    id: 'victory-corp',
    nombre: 'Victory Corporation S.A.',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_VictoryCorpSheet2026',
    name: 'Victory Corporation S.A.',
    code: 'DIST-2026-VC',
    address: 'Calle 100 #8A-37, Bogotá',
    phone: '+57 311 222 3344',
    sellerCode: 'SEL-9900',
  },
  'Equipo Norte': {
    id: 'equipo-norte',
    nombre: 'Equipo Norte Royal S.A.',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoNorteSheet2026',
    name: 'Equipo Norte Royal S.A.',
    code: 'DIST-2026-EN',
    address: 'Calle 72 #54-95, Barranquilla',
    phone: '+57 300 987 6543',
    sellerCode: 'SEL-1104',
  },
  'Equipo Medellín': {
    id: 'equipo-medellin',
    nombre: 'Medellín Prestige Group',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoMedellinSheet2026',
    name: 'Medellín Prestige Group',
    code: 'DIST-2026-EM',
    address: 'Carrera 43A #1-50, San Fernando Plaza',
    phone: '+57 310 112 2334',
    sellerCode: 'SEL-5509',
  },
  'Equipo Cali': {
    id: 'equipo-cali',
    nombre: 'Cali Elite Distributors',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_EquipoCaliSheet2026',
    name: 'Cali Elite Distributors',
    code: 'DIST-2026-EC',
    address: 'Avenida Sexta #22N-40, Cali',
    phone: '+57 315 555 6677',
    sellerCode: 'SEL-4481',
  }
};

export const MOCK_DISTRIBUTOR: Distributor = MOCK_DISTRIBUTORS['Witman Group'];

export const MOCK_CONFIGURATION: Configuration = {
  // Spanish Google Sheets Schema (Phase 3.6)
  nombreDistribuidor: 'Witman Group S.A.S.',
  direccion: 'Av. Las Palmas #45-12, Oficina 802',
  telefono: '+57 312 456 7890',
  codigoDistribuidor: 'DIST-2026-WM',
  inicialPorDefecto: 10,
  inicialMaxima: 100,
  cuotasDisponibles: [6, 12, 18, 24, 30, 36],
  version: 1,

  // Existing Compatibility Fields (Do not remove)
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

export const MOCK_FINANCIAL_FACTORS: FinancialFactor[] = [
  { numeroCuotas: 6, factorFinanciero: 0.1791, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
  { numeroCuotas: 12, factorFinanciero: 0.0931, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
  { numeroCuotas: 18, factorFinanciero: 0.0645, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
  { numeroCuotas: 24, factorFinanciero: 0.0501, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
  { numeroCuotas: 30, factorFinanciero: 0.0416, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
  { numeroCuotas: 36, factorFinanciero: 0.0359, tasaEfectivaAnual: 24.5, tasaMensual: 1.85 },
];

export const MOCK_USERS: User[] = [
  {
    codigoVendedor: 'SEL-8821',
    nombre: 'Witman Ramos',
    password: 'password123',
    distribuidorId: 'witman-group',
    activo: true
  },
  {
    codigoVendedor: 'SEL-9900',
    nombre: 'Victory Seller',
    password: 'password123',
    distribuidorId: 'victory-corp',
    activo: true
  },
  {
    codigoVendedor: 'SEL-1104',
    nombre: 'Norte Seller',
    password: 'password123',
    distribuidorId: 'equipo-norte',
    activo: true
  }
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
    companyId: 'victory-corp',
    companyName: 'Victory Corporation',
    googleSheetId: '1zH_Y9oK6O8Xp9jF_VictoryCorpSheet2026',
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
