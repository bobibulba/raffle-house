import React, { useState } from 'react';
import { Home, ShoppingCart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-white border-b-4 border-black shadow-brutal sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-primary-500 p-2 border-2 border-black shadow-brutal-sm">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-dark">RaffleHouse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-4 py-2 border-2 border-black font-semibold transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-accent-400 text-white shadow-brutal-sm translate-x-1 translate-y-1'
                      : 'bg-white text-dark hover:bg-secondary-100 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.id === 'marketplace' && cartItemCount > 0 && (
                      <span className="bg-error text-white text-xs rounded-full px-2 py-1 ml-1">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-black bg-white shadow-brutal-sm"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-black">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 border-2 border-black font-semibold text-left transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-accent-400 text-white shadow-brutal-sm'
                        : 'bg-white text-dark hover:bg-secondary-100 shadow-brutal-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.id === 'marketplace' && cartItemCount > 0 && (
                        <span className="bg-error text-white text-xs rounded-full px-2 py-1 ml-auto">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
