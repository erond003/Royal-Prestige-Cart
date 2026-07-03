/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Product, QuoteItem, DistributorInfo, ScreenType, RecentQuote, CustomInitial, CompanyProfile } from '../types';
import { MOCK_RECENT_QUOTES, MOCK_COMPANY_PROFILES } from '../mockData';
import { calculateGlobalFinancials } from '../lib/financialEngine';
import { ProductRepository, DistributorRepository, ConfigurationRepository, FinancialRepository, setActiveCompanyProfile } from '../repositories';

interface CartContextProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  goBack: () => void;
  cartItems: QuoteItem[];
  addQuoteItem: (product: Product) => void;
  removeQuoteItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  selectAll: (select: boolean) => void;
  initialPercentage: number;
  setInitialPercentage: (pct: number) => void;
  plazo: number;
  setPlazo: (months: number) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeProfile: string;
  setActiveProfile: (profile: string) => void;
  activeCompanyProfile: CompanyProfile;
  distributorInfo: DistributorInfo;
  setDistributorInfo: (info: DistributorInfo) => void;
  recentQuotes: RecentQuote[];
  addRecentQuote: (clientName: string) => void;
  updateProductInitial: (productId: string, customInitial?: CustomInitial) => void;
  clearAllCustomInitials: () => void;
  validationError: string | null;
  setValidationError: (error: string | null) => void;
  clientName: string;
  setClientName: (name: string) => void;
  
  // Computed values
  totalPrice: number;
  initialAmount: number;
  financedAmount: number;
  monthlyInterestRate: number;
  annualInterestRate: number;
  cuotaMensual: number;
  shippingAmount: number;
  ivaAmount: number;
  rawPurchasePrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);

  const setScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setScreenHistory((prev) => {
      if (screen === 'home') return ['home'];
      if (prev[prev.length - 1] === screen) return prev;
      return [...prev, screen];
    });
  };

  const goBack = () => {
    setScreenHistory((prev) => {
      if (prev.length <= 1) {
        setCurrentScreen('home');
        return ['home'];
      }
      const newHistory = [...prev];
      newHistory.pop(); // remove current screen
      const prevScreen = newHistory[newHistory.length - 1];
      setCurrentScreen(prevScreen);
      return newHistory;
    });
  };

  const [activeProfile, setActiveProfile] = useState<string>('Witman Group');

  const [cartItems, setCartItems] = useState<QuoteItem[]>(() => {
    // Start with 2 pre-selected products from ProductRepository so the app has content immediately, enhancing exploration
    const products = ProductRepository.getProducts(MOCK_COMPANY_PROFILES[0]);
    return [
      {
        product: products[0] || {
          id: 'rp-sc-05',
          code: 'RP-SC05',
          name: 'Sistema de Cocina Esencial de 5 Piezas',
          category: 'Sistemas de Cocina',
          price: 1499000,
        },
        quantity: 1,
        isSelected: true,
      },
      {
        product: products[5] || {
          id: 'rp-sa-10',
          code: 'RP-SA10',
          name: 'Sartén Novel de 10 Pulgadas con Tapa',
          category: 'Sartenes y Especialidades',
          price: 620000,
        },
        quantity: 1,
        isSelected: true,
      }
    ];
  });

  const [initialPercentage, setInitialPercentageState] = useState<number>(() => {
    const config = ConfigurationRepository.getConfiguration(MOCK_COMPANY_PROFILES[0]);
    return config.defaultInitialPercentage;
  });

  const [plazo, setPlazoState] = useState<number>(24);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>(MOCK_RECENT_QUOTES);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('');
  
  const [distributorInfo, setDistributorInfo] = useState<DistributorInfo>(() => 
    DistributorRepository.getDistributor(MOCK_COMPANY_PROFILES[0])
  );

  // Find current company profile object based on activeProfile string
  const companyProfileObj = useMemo(() => {
    const profile = MOCK_COMPANY_PROFILES.find((p) => p.companyName === activeProfile) || MOCK_COMPANY_PROFILES[0];
    setActiveCompanyProfile(profile);
    return profile;
  }, [activeProfile]);

  // Synchronize distributor configuration whenever activeProfile changes
  useEffect(() => {
    const dist = DistributorRepository.getDistributor(companyProfileObj);
    setDistributorInfo(dist);
    
    const config = ConfigurationRepository.getConfiguration(companyProfileObj);
    setInitialPercentageState(config.defaultInitialPercentage);
  }, [companyProfileObj]);

  // Safe percentage setter (clamped between configuration values)
  const setInitialPercentage = (pct: number) => {
    if (isNaN(pct)) return;
    const config = ConfigurationRepository.getConfiguration(companyProfileObj);
    const clamped = Math.max(config.minInitialPercentage, Math.min(config.maxInitialPercentage, pct));
    setInitialPercentageState(clamped);
  };

  // Safe plazo setter (clamped between available terms)
  const setPlazo = (months: number) => {
    if (isNaN(months)) return;
    const terms = FinancialRepository.getAvailableTerms(companyProfileObj);
    if (terms.length > 0) {
      const minTerm = Math.min(...terms);
      const maxTerm = Math.max(...terms);
      const clamped = Math.max(minTerm, Math.min(maxTerm, months));
      setPlazoState(clamped);
    } else {
      const clamped = Math.max(1, Math.min(36, months));
      setPlazoState(clamped);
    }
  };

  const addQuoteItem = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Increase quantity and auto-select
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, isSelected: true }
            : item
        );
      }
      return [...prev, { product, quantity: 1, isSelected: true }];
    });
  };

  const removeQuoteItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeQuoteItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleSelect = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const selectAll = (select: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: select }))
    );
  };

  // Financial simulations powered by the decoupled FinancialEngine:
  const financials = useMemo(() => {
    const selectedItems = cartItems
      .filter((item) => item.isSelected)
      .map((item) => ({
        price: item.product.price,
        quantity: item.quantity,
        customInitial: item.customInitial,
      }));
    return calculateGlobalFinancials(selectedItems, initialPercentage, plazo, companyProfileObj);
  }, [cartItems, initialPercentage, plazo, companyProfileObj]);

  const {
    rawPurchasePrice,
    ivaAmount,
    shippingAmount,
    totalPrice,
    initialAmount,
    financedAmount,
    cuotaMensual,
  } = financials;

  // Standard simulated interest rates for backward-compatibility display in view screens
  const monthlyInterestRate = 0.015; 
  const annualInterestRate = 0.1956; // 19.56% TEA

  const addRecentQuote = (clientName: string) => {
    if (totalPrice <= 0) return;
    const newQuote: RecentQuote = {
      id: `cot-${Date.now()}`,
      clientName: clientName || 'Cliente General',
      date: 'Ahora mismo',
      itemsCount: cartItems.filter(i => i.isSelected).length,
      total: totalPrice,
      initial: initialAmount,
      cuota: cuotaMensual,
      months: plazo
    };
    setRecentQuotes(prev => [newQuote, ...prev]);
  };

  const updateProductInitial = (productId: string, customInitial?: CustomInitial) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, customInitial } : item
      )
    );
  };

  const clearAllCustomInitials = () => {
    setCartItems((prev) =>
      prev.map((item) => {
        const { customInitial, ...rest } = item;
        return rest;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        currentScreen,
        setScreen,
        goBack,
        cartItems,
        addQuoteItem,
        removeQuoteItem,
        updateQuantity,
        toggleSelect,
        selectAll,
        initialPercentage,
        setInitialPercentage,
        plazo,
        setPlazo,
        searchOpen,
        setSearchOpen,
        activeProfile,
        setActiveProfile,
        activeCompanyProfile: companyProfileObj,
        distributorInfo,
        setDistributorInfo,
        recentQuotes,
        addRecentQuote,
        updateProductInitial,
        clearAllCustomInitials,
        validationError,
        setValidationError,
        clientName,
        setClientName,
        
        // Computed Values
        totalPrice,
        initialAmount,
        financedAmount,
        monthlyInterestRate,
        annualInterestRate,
        cuotaMensual,
        shippingAmount,
        ivaAmount,
        rawPurchasePrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
