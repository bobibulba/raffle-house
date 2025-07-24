import React, { useState } from 'react';
import { Search, Filter, Grid, List, SortAsc } from 'lucide-react';
import { mockRaffles } from '../data/mockData';
import RaffleCard from '../components/RaffleCard';
import { RaffleItem } from '../types';

interface MarketplacePageProps {
  onAddToCart: (raffleId: string) => void;
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'house', label: 'Rumah' },
    { id: 'car', label: 'Kendaraan' },
    { id: 'electronics', label: 'Elektronik' },
    { id: 'other', label: 'Lainnya' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Unggulan' },
    { id: 'price-low', label: 'Harga Terendah' },
    { id: 'price-high', label: 'Harga Tertinggi' },
    { id: 'ending-soon', label: 'Berakhir Segera' },
    { id: 'most-sold', label: 'Paling Laris' },
  ];

  const filteredAndSortedRaffles = React.useMemo(() => {
    let filtered = mockRaffles.filter((raffle) => {
      const matchesSearch = raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           raffle.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || raffle.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort raffles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'ending-soon':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case 'most-sold':
          return b.soldTickets - a.soldTickets;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-primary-500 text-white border-4 border-black shadow-brutal p-6 mb-6 transform -rotate-1">
            <h1 className="text-3xl md:text-4xl font-black text-center">🛍️ MARKETPLACE UNDIAN</h1>
            <p className="text-center text-lg font-semibold mt-2">Temukan undian terbaik untuk Anda!</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-4 border-black shadow-brutal p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari undian..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex border-2 border-black">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-dark hover:bg-gray-100'
                }`}
              >
                <Grid className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-3 px-4 font-semibold border-l-2 border-black transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-dark hover:bg-gray-100'
                }`}
              >
                <List className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-semibold">
              Menampilkan {filteredAndSortedRaffles.length} dari {mockRaffles.length} undian
            </p>
          </div>
        </div>

        {/* Results */}
        {filteredAndSortedRaffles.length === 0 ? (
          <div className="bg-white border-4 border-black shadow-brutal p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-dark mb-2">Tidak Ada Hasil</h3>
            <p className="text-gray-700 font-semibold">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedRaffles.map((raffle) => (
              <RaffleCard
                key={raffle.id}
                raffle={raffle}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
