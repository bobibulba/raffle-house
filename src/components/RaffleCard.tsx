import React from 'react';
import { Calendar, Users, Tag, Star } from 'lucide-react';
import { RaffleItem } from '../types';

interface RaffleCardProps {
  raffle: RaffleItem;
  onAddToCart?: (raffleId: string) => void;
  showAddToCart?: boolean;
}

const RaffleCard: React.FC<RaffleCardProps> = ({ raffle, onAddToCart, showAddToCart = true }) => {
  const progressPercentage = (raffle.soldTickets / raffle.totalTickets) * 100;
  const remainingDays = Math.ceil((new Date(raffle.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const categoryColors = {
    house: 'bg-primary-500',
    car: 'bg-secondary-500',
    electronics: 'bg-accent-500',
    other: 'bg-gray-500',
  };

  const categoryLabels = {
    house: 'Rumah',
    car: 'Kendaraan',
    electronics: 'Elektronik',
    other: 'Lainnya',
  };

  return (
    <div className="bg-white border-4 border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
      {/* Image */}
      <div className="relative">
        <img
          src={raffle.image}
          alt={raffle.title}
          className="w-full h-48 object-cover border-b-4 border-black"
        />
        {raffle.featured && (
          <div className="absolute top-3 left-3 bg-warning text-white px-2 py-1 border-2 border-black shadow-brutal-sm flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold">FEATURED</span>
          </div>
        )}
        <div className={`absolute top-3 right-3 ${categoryColors[raffle.category]} text-white px-3 py-1 border-2 border-black shadow-brutal-sm`}>
          <span className="text-sm font-bold">{categoryLabels[raffle.category]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark mb-2 line-clamp-2">{raffle.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{raffle.description}</p>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-primary-500" />
              <span className="font-semibold">Harga Tiket:</span>
            </div>
            <span className="font-bold text-primary-600">Rp {raffle.price.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-secondary-500" />
              <span className="font-semibold">Tiket Terjual:</span>
            </div>
            <span className="font-bold">{raffle.soldTickets.toLocaleString('id-ID')} / {raffle.totalTickets.toLocaleString('id-ID')}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-accent-500" />
              <span className="font-semibold">Berakhir:</span>
            </div>
            <span className={`font-bold ${remainingDays <= 7 ? 'text-error' : 'text-gray-700'}`}>
              {remainingDays > 0 ? `${remainingDays} hari lagi` : 'Berakhir'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 border-2 border-black h-3">
              <div
                className="bg-success h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {showAddToCart && onAddToCart && (
          <button
            onClick={() => onAddToCart(raffle.id)}
            disabled={remainingDays <= 0}
            className={`w-full py-3 px-4 border-2 border-black font-bold transition-all duration-200 ${
              remainingDays <= 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white shadow-brutal-sm hover:shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:bg-primary-600'
            }`}
          >
            {remainingDays <= 0 ? 'UNDIAN BERAKHIR' : 'BELI TIKET'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RaffleCard;
