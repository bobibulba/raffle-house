import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import { CartItem } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (raffleId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.raffleId === raffleId);
      if (existingItem) {
        return prevCart.map(item =>
          item.raffleId === raffleId
            ? { ...item, ticketCount: item.ticketCount + 1 }
            : item
        );
      } else {
        return [...prevCart, { raffleId, ticketCount: 1 }];
      }
    });
  };

  const handleNavigateToMarketplace = () => {
    setCurrentPage('marketplace');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onAddToCart={handleAddToCart}
            onNavigateToMarketplace={handleNavigateToMarketplace}
          />
        );
      case 'marketplace':
        return <MarketplacePage onAddToCart={handleAddToCart} />;
      case 'profile':
        return <ProfilePage cart={cart} onUpdateCart={setCart} />;
      default:
        return (
          <HomePage
            onAddToCart={handleAddToCart}
            onNavigateToMarketplace={handleNavigateToMarketplace}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartItemCount={cart.reduce((sum, item) => sum + item.ticketCount, 0)}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
