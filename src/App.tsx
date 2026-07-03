/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SearchOverlay } from './components/SearchOverlay';
import { HomeScreen } from './screens/HomeScreen';
import { QuoteScreen } from './screens/QuoteScreen';
import { PrepareOrderScreen } from './screens/PrepareOrderScreen';
import { RecentQuotesScreen } from './screens/RecentQuotesScreen';
import { ConfigScreen } from './screens/ConfigScreen';
import { motion, AnimatePresence } from 'motion/react';

// Main App Inner Router to access context
const AppContent: React.FC = () => {
  const { currentScreen } = useCart();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'quote':
        return <QuoteScreen />;
      case 'prepare':
        return <PrepareOrderScreen />;
      case 'recent_quotes':
        return <RecentQuotesScreen />;
      case 'config':
        return <ConfigScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-800/10 selection:text-blue-950">
      {/* Premium Header */}
      <Header />

      {/* Main Container Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-2 sm:py-4 relative pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav />

      {/* Search Overlay */}
      <SearchOverlay />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
