  /**
   * @license
   * SPDX-License-Identifier: Apache-2.0
   */

  import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
  import { Product, QuoteItem, DistributorInfo, ScreenType, RecentQuote, CustomInitial, CompanyProfile } from '../types';
  import { MOCK_RECENT_QUOTES, MOCK_COMPANY_PROFILES } from '../mockData';
  import { calculateGlobalFinancials, roundToNextThousand } from '../lib/financialEngine';
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
    currentUser: any;
    setCurrentUser: (user: any) => void;
    logout: () => void;
    productsCatalog: Product[];
    loadingProducts: boolean;
    factors: any[];
    loadingFactors: boolean;
    annualRate: number;
    monthlyRate: string;
    taxRate: number;
    distributorConfig: any;
    
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

    const [currentUser, setCurrentUserState] = useState<any>(() => {
      try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    });

    const [activeProfile, setActiveProfile] = useState<string>(() => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          const distVal = parsed?.distributor?.code || parsed?.distributor?.id || parsed?.distributor || parsed?.codigoDistribuidor;
          if (distVal) {
            const matched = MOCK_COMPANY_PROFILES.find(p => 
              p.companyId.toLowerCase() === String(distVal).toLowerCase() ||
              p.companyName.toLowerCase().includes(String(distVal).toLowerCase()) ||
              String(distVal).toLowerCase().includes(p.companyName.toLowerCase())
            );
            if (matched) return matched.companyName;
          }
        }
      } catch {}
      return 'Witman Group';
    });

    const setCurrentUser = (user: any) => {
      setCurrentUserState(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        const distVal = user.distributor?.code || user.distributor?.id || user.distributor || user.codigoDistribuidor;
        if (distVal) {
          const matched = MOCK_COMPANY_PROFILES.find(p => 
            p.companyId.toLowerCase() === String(distVal).toLowerCase() ||
            p.companyName.toLowerCase().includes(String(distVal).toLowerCase()) ||
            String(distVal).toLowerCase().includes(p.companyName.toLowerCase())
          );
          if (matched) {
            setActiveProfile(matched.companyName);
          }
        }
      } else {
        localStorage.removeItem('user');
      }
    };

    const logout = () => {
      setCurrentUser(null);
      setCurrentScreen('home');
    };

    // Find current company profile object based on activeProfile string
    const companyProfileObj = useMemo(() => {
      const profile = MOCK_COMPANY_PROFILES.find((p) => p.companyName === activeProfile) || MOCK_COMPANY_PROFILES[0];
      setActiveCompanyProfile(profile);
      return profile;
    }, [activeProfile]);

    const [productsCatalog, setProductsCatalog] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

    const [factors, setFactors] = useState<any[]>([]);
    const [loadingFactors, setLoadingFactors] = useState<boolean>(false);
    const [annualRate, setAnnualRate] = useState<number>(0);
    const [monthlyRate, setMonthlyRate] = useState<string>("");
    const [taxRate, setTaxRate] = useState<number>(0.19);
    const [distributorConfig, setDistributorConfig] = useState<any>({
      minInitialPercentage: 0,
      maxInitialPercentage: 0.60
    });

    const [cartItems, setCartItems] = useState<QuoteItem[]>([]);

    const fetchDistributorInfo = async (distributorCode: string) => {
      if (!distributorCode) return;
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwOiqrkvaSyT7VYjzCTXXKPupq5s53ZvKT9vcbDt-GbVI443ryMZVokWtOdEYE1KfSe/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify({
              action: "getDistributorInfo",
              distributorCode: distributorCode
            }),
          }
        );

        const data = await response.json();
        console.log("Configuración del distribuidor recibida:", data);

        if (data.success) {
          setDistributorConfig({
            companyName: data.companyName,
            logoUrl: data.logoUrl,
            phone: data.phone,
            address: data.address,
            city: data.city,
            minInitialPercentage: data.minInitialPercentage !== undefined ? Number(data.minInitialPercentage) : 0,
            maxInitialPercentage: data.maxInitialPercentage !== undefined ? Number(data.maxInitialPercentage) : 0.60
          });
        }
      } catch (error) {
        console.error("Error cargando info del distribuidor:", error);
      }
    };

    useEffect(() => {

      const targetDistributor = currentUser?.distributor?.code || currentUser?.distributor || currentUser?.codigoDistribuidor;

      if (!currentUser || !targetDistributor) {
        setProductsCatalog([]);
        setFactors([]);
        return;
      }

      const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwOiqrkvaSyT7VYjzCTXXKPupq5s53ZvKT9vcbDt-GbVI443ryMZVokWtOdEYE1KfSe/exec",
            {
              method: "POST",
              headers: {
                "Content-Type": "text/plain",
              },
              body: JSON.stringify({
                action: "getProducts",
                distributorCode: targetDistributor
              }),
            }
          );

          const data = await response.json();
          console.log("Productos recibidos:", data);

          if (data.success && Array.isArray(data.products)) {
            const mapped: Product[] = data.products.map((item:any)=>({
              id: String(item.code),
              codigo: String(item.code),
              code: String(item.code),
              descripcion: String(item.description),
              name: String(item.description),
              linea: String(item.line || "General"),
              category: String(item.line || "General"),
              precioTotal: Number(item.totalPrice || 0),
              price: Number(item.totalPrice || 0),
              precioSinIva: Number(item.priceWithoutVat || 0),
              iva: Number(item.vat || 0)
            }));

            // Deduplicate to avoid React duplicate key warning
            const uniqueMap = new Map<string, Product>();
            mapped.forEach((p) => {
              if (p.id) {
                uniqueMap.set(p.id, p);
              }
            });
            const deduplicated = Array.from(uniqueMap.values());
            setProductsCatalog(deduplicated);
          } else {
            console.warn(
              "Respuesta productos inválida",
              data
            );
            setProductsCatalog([]);
          }
        } catch(error){
          console.error(
            "Error cargando productos:",
            error
          );
          setProductsCatalog([]);
        } finally {
          setLoadingProducts(false);
        }
      };

      const fetchFactors = async () => {
        setLoadingFactors(true);
        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwOiqrkvaSyT7VYjzCTXXKPupq5s53ZvKT9vcbDt-GbVI443ryMZVokWtOdEYE1KfSe/exec",
            {
              method: "POST",
              headers: {
                "Content-Type": "text/plain",
              },
              body: JSON.stringify({
                action: "getFactors",
                distributorCode: targetDistributor
              }),
            }
          );

          const data = await response.json();
          console.log("Factores recibidos:", data);

          if (data.success) {
            const rawFactors = data.factors || [];
            const mappedFactors = rawFactors.map((f: any) => ({
              term: Number(f.months || f.term || 0),
              factor: Number(f.factor || 0)
            })).filter((f: any) => f.term > 0 && f.factor > 0);

            setFactors(mappedFactors);
            FinancialRepository.setActiveFactors(mappedFactors);

            setAnnualRate(data.annualRate || 0);
            setMonthlyRate(data.monthlyRate || "");

            if (data.taxRate !== undefined) {
              let parsedTax = 0.19;
              if (typeof data.taxRate === 'string') {
                const cleanStr = data.taxRate.replace('%', '').replace(',', '.').trim();
                const num = parseFloat(cleanStr);
                if (!isNaN(num)) {
                  parsedTax = cleanStr.includes('%') || num > 0.99 ? num / 100 : num;
                }
              } else {
                const num = Number(data.taxRate);
                if (!isNaN(num)) {
                  parsedTax = num > 0.99 ? num / 100 : num;
                }
              }
              setTaxRate(parsedTax > 0 ? parsedTax : 0.19);
            }
          } else {
            console.warn("Respuesta de factores no exitosa:", data);
          }
        } catch (error) {
          console.error("Error cargando factores:", error);
        } finally {
          setLoadingFactors(false);
        }
      };

      fetchProducts();
      fetchFactors();
      fetchDistributorInfo(currentUser?.distributorCode || targetDistributor);

    }, [currentUser]);

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
      const minVal = distributorConfig?.minInitialPercentage !== undefined
        ? (distributorConfig.minInitialPercentage > 1 ? distributorConfig.minInitialPercentage : distributorConfig.minInitialPercentage * 100)
        : config.minInitialPercentage;
      const maxVal = distributorConfig?.maxInitialPercentage !== undefined
        ? (distributorConfig.maxInitialPercentage > 1 ? distributorConfig.maxInitialPercentage : distributorConfig.maxInitialPercentage * 100)
        : config.maxInitialPercentage;
      const clamped = Math.max(minVal, Math.min(maxVal, pct));
      setInitialPercentageState(clamped);
    };

    // Clamp initialPercentage whenever distributorConfig updates
    useEffect(() => {
      if (distributorConfig) {
        const config = ConfigurationRepository.getConfiguration(companyProfileObj);
        const minVal = distributorConfig.minInitialPercentage !== undefined 
          ? (distributorConfig.minInitialPercentage > 1 ? distributorConfig.minInitialPercentage : distributorConfig.minInitialPercentage * 100)
          : config.minInitialPercentage;
        const maxVal = distributorConfig.maxInitialPercentage !== undefined 
          ? (distributorConfig.maxInitialPercentage > 1 ? distributorConfig.maxInitialPercentage : distributorConfig.maxInitialPercentage * 100)
          : config.maxInitialPercentage;
        if (initialPercentage < minVal || initialPercentage > maxVal) {
          const clamped = Math.max(minVal, Math.min(maxVal, initialPercentage));
          setInitialPercentageState(clamped);
        }
      }
    }, [distributorConfig, companyProfileObj]);

    // Safe plazo setter (clamped between available terms)
    const setPlazo = (months: number) => {
      if (isNaN(months)) return;
      const availableTerms = factors.map(f => f.term);
      if (availableTerms.length > 0) {
        if (availableTerms.includes(months)) {
          setPlazoState(months);
        } else {
          const minTerm = Math.min(...availableTerms);
          const maxTerm = Math.max(...availableTerms);
          const clamped = Math.max(minTerm, Math.min(maxTerm, months));
          const closest = availableTerms.reduce((prev, curr) => 
            Math.abs(curr - clamped) < Math.abs(prev - clamped) ? curr : prev
          );
          setPlazoState(closest);
        }
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
      const baseCalculations = calculateGlobalFinancials(selectedItems, initialPercentage, plazo, companyProfileObj, taxRate);
      
      let realCuotaMensual = baseCalculations.cuotaMensual;
      if (factors && factors.length > 0) {
        const matched = factors.find((f) => f.term === plazo);
        if (matched) {
          const rawCuota = baseCalculations.financedAmount * matched.factor;
          realCuotaMensual = roundToNextThousand(rawCuota, companyProfileObj);
        }
      }
      
      return {
        ...baseCalculations,
        cuotaMensual: realCuotaMensual,
      };
    }, [cartItems, initialPercentage, plazo, companyProfileObj, factors, taxRate]);

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
    const monthlyInterestRate = useMemo(() => {
      if (!monthlyRate) return 0.015;
      const cleaned = String(monthlyRate).replace('%', '').replace(',', '.').trim();
      const num = parseFloat(cleaned);
      if (isNaN(num)) return 0.015;
      if (String(monthlyRate).includes('%') || num > 0.2) {
        return num / 100;
      }
      return num;
    }, [monthlyRate]);

    const annualInterestRate = useMemo(() => {
      if (!annualRate) return 0.1956;
      if (annualRate > 1) {
        return annualRate / 100;
      }
      return annualRate;
    }, [annualRate]);

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
          currentUser,
          setCurrentUser,
          logout,
          productsCatalog,
          loadingProducts,
          factors,
          loadingFactors,
          annualRate,
          monthlyRate,
          taxRate,
          distributorConfig,
          
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
