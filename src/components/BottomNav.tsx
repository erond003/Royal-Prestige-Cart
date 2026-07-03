/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Calculator, History, Settings } from 'lucide-react';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setScreen, cartItems } = useCart();

  // Hide bottom navigation if we are in the Quote screen and have selected items (since the totals sticky bar will take over)
  const isQuoteScreen = currentScreen === 'quote';
  const hasSelectedItems = cartItems.some(item => item.isSelected);
  const shouldHide = isQuoteScreen && hasSelectedItems;

  if (shouldHide) return null;

  const navItems: { screen: ScreenType; label: string; icon: React.FC<any> }[] = [
    { screen: 'home', label: 'Inicio', icon: Home },
    { screen: 'quote', label: 'Cotizador', icon: Calculator },
    { screen: 'recent_quotes', label: 'Historial', icon: History },
    { screen: 'config', label: 'Perfil', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-slate-100/80 px-4 py-2 shadow-lg sm:py-3 transition-transform duration-300">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              id={`nav-tab-${item.screen}`}
              onClick={() => setScreen(item.screen)}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all active:scale-95 group relative"
            >
              <div
                className={`p-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 scale-110'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight transition-all duration-200 ${
                  isActive ? 'text-blue-950 font-bold' : 'text-slate-400 group-hover:text-slate-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-blue-800" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
