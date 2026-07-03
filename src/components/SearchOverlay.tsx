/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ProductRepository } from '../repositories';
import { Search, X, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

export const SearchOverlay: React.FC = () => {
  const { searchOpen, setSearchOpen, addQuoteItem, cartItems, activeCompanyProfile } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  // Filter products based on search term using the repository
  const filteredProducts = ProductRepository.searchProducts(searchQuery, activeCompanyProfile);

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce<Record<string, Product[]>>((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = [];
    }
    groups[product.category].push(product);
    return groups;
  }, {});

  const handleSelectProduct = (product: Product) => {
    addQuoteItem(product);
    setSearchOpen(false);
  };

  const isAlreadyInCart = (productId: string) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const totalProductsCount = ProductRepository.getProducts(activeCompanyProfile).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 pt-[10vh] backdrop-blur-md">
        {/* Background Click to Close */}
        <div 
          className="absolute inset-0" 
          onClick={() => setSearchOpen(false)} 
        />

        {/* Modal Window */}
        <motion.div
          id="search-overlay-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[75vh]"
        >
          {/* Header & Search Input */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              id="search-input"
              ref={inputRef}
              type="text"
              placeholder="Buscar por nombre, código (RP-SC05) o piezas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none border-none py-1.5 font-sans"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              id="close-search-btn"
              onClick={() => setSearchOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors shrink-0"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Categories / Results */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {Object.keys(groupedProducts).length > 0 ? (
              Object.entries(groupedProducts).map(([category, products]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-1.5">
                    {products.map((product) => {
                      const inCart = isAlreadyInCart(product.id);
                      return (
                        <button
                          key={product.id}
                          id={`product-row-${product.id}`}
                          onClick={() => handleSelectProduct(product)}
                          className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all border border-transparent hover:border-slate-100 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-10 rounded-lg bg-slate-100/80 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-slate-200/50 transition-colors border border-slate-200/30">
                              <ShoppingBag className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-950 transition-colors leading-snug">
                                {product.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 ml-4">
                            <div className="text-right">
                              <div className="text-sm font-bold text-slate-900">
                                {Math.round(product.price / 1000)}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium">
                                Pago único
                              </div>
                            </div>

                            {inCart ? (
                              <div className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                <Check className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="p-1.5 rounded-full bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-800 border border-transparent transition-all">
                                <ShoppingBag className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-30 text-slate-500" />
                <p className="text-sm font-medium">No se encontraron productos</p>
                <p className="text-xs mt-1">Prueba con "sartén", "filtro", "SC" o un código.</p>
              </div>
            )}
          </div>

          {/* Footer badge */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono">
            Mostrando {filteredProducts.length} de {totalProductsCount} productos • Royal Prestige Cart v1.0
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
