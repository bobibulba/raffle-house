import React from 'react';
import { Zap, Shield, Trophy, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { mockRaffles } from '../data/mockData';
import RaffleCard from '../components/RaffleCard';

interface HomePageProps {
  onAddToCart: (raffleId: string) => void;
  onNavigateToMarketplace: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onNavigateToMarketplace }) => {
  const featuredRaffles = mockRaffles.filter(raffle => raffle.featured).slice(0, 3);
  const stats = {
    totalRaffles: mockRaffles.length,
    totalParticipants: mockRaffles.reduce((sum, raffle) => sum + raffle.soldTickets, 0),
    totalPrizes: mockRaffles.reduce((sum, raffle) => sum + (raffle.price * raffle.totalTickets), 0),
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 py-20 px-4 border-b-4 border-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white border-4 border-black shadow-brutal-lg p-8 mb-8 inline-block transform -rotate-2">
            <h1 className="text-4xl md:text-6xl font-black text-dark mb-4">
              RAFFLE<span className="text-primary-500">HOUSE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">
              Menangkan Rumah Impian & Aset Premium!
            </p>
          </div>
          
          <div className="bg-warning text-white border-4 border-black shadow-brutal p-6 mb-8 transform rotate-1">
            <p className="text-lg md:text-xl font-bold">
              🎯 Sistem Undian Transparan • 🏆 Hadiah Berkualitas • 🔒 Aman & Terpercaya
            </p>
          </div>

          <button
            onClick={onNavigateToMarketplace}
            className="bg-accent-500 text-white px-8 py-4 border-4 border-black shadow-brutal font-bold text-lg hover:shadow-brutal-lg hover:translate-x-2 hover:translate-y-2 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <span>MULAI BERMAIN SEKARANG</span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-100 border-4 border-black shadow-brutal p-6 text-center transform hover:-rotate-1 transition-transform duration-300">
              <div className="bg-primary-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-black text-dark mb-2">{stats.totalRaffles}+</h3>
              <p className="text-lg font-semibold text-gray-700">Undian Aktif</p>
            </div>

            <div className="bg-secondary-100 border-4 border-black shadow-brutal p-6 text-center transform hover:rotate-1 transition-transform duration-300">
              <div className="bg-secondary-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-black text-dark mb-2">{stats.totalParticipants.toLocaleString('id-ID')}+</h3>
              <p className="text-lg font-semibold text-gray-700">Peserta Aktif</p>
            </div>

            <div className="bg-accent-100 border-4 border-black shadow-brutal p-6 text-center transform hover:-rotate-1 transition-transform duration-300">
              <div className="bg-accent-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-black text-dark mb-2">Rp {(stats.totalPrizes / 1000000000).toFixed(1)}M+</h3>
              <p className="text-lg font-semibold text-gray-700">Total Hadiah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Raffles */}
      <section className="py-16 px-4 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-warning text-white border-4 border-black shadow-brutal p-4 inline-block transform -rotate-1 mb-6">
              <h2 className="text-3xl md:text-4xl font-black flex items-center space-x-2">
                <Star className="h-8 w-8 fill-current" />
                <span>UNDIAN UNGGULAN</span>
                <Star className="h-8 w-8 fill-current" />
              </h2>
            </div>
            <p className="text-xl text-gray-700 font-semibold">Hadiah terbaik dengan peluang menang terbesar!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRaffles.map((raffle) => (
              <RaffleCard
                key={raffle.id}
                raffle={raffle}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onNavigateToMarketplace}
              className="bg-primary-500 text-white px-8 py-4 border-4 border-black shadow-brutal font-bold text-lg hover:shadow-brutal-lg hover:translate-x-2 hover:translate-y-2 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <span>LIHAT SEMUA UNDIAN</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">MENGAPA PILIH RAFFLEHOUSE?</h2>
            <p className="text-xl text-gray-700 font-semibold">Platform undian terpercaya dengan sistem yang transparan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 border-4 border-black shadow-brutal p-8 text-center transform hover:rotate-1 transition-transform duration-300">
              <div className="bg-primary-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-6">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-dark mb-4">SISTEM CEPAT</h3>
              <p className="text-gray-700 font-semibold">Pembelian tiket instan dengan sistem pembayaran yang mudah dan cepat</p>
            </div>

            <div className="bg-secondary-50 border-4 border-black shadow-brutal p-8 text-center transform hover:-rotate-1 transition-transform duration-300">
              <div className="bg-secondary-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-6">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-dark mb-4">100% AMAN</h3>
              <p className="text-gray-700 font-semibold">Keamanan data dan transaksi terjamin dengan enkripsi tingkat tinggi</p>
            </div>

            <div className="bg-accent-50 border-4 border-black shadow-brutal p-8 text-center transform hover:rotate-1 transition-transform duration-300">
              <div className="bg-accent-500 text-white p-4 border-2 border-black shadow-brutal-sm inline-block mb-6">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-dark mb-4">HADIAH NYATA</h3>
              <p className="text-gray-700 font-semibold">Semua hadiah adalah aset nyata dengan sertifikat resmi dan legal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
