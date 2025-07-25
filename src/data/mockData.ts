import { RaffleItem, Transaction } from '../types';

export const mockRaffles: RaffleItem[] = [
  {
    id: '1',
    title: 'Villa Modern Minimalis Jakarta Selatan',
    description: 'Villa mewah 3 lantai dengan kolam renang pribadi, taman luas, dan pemandangan kota. Lokasi strategis di kawasan elite Jakarta Selatan.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    price: 50000,
    totalTickets: 10000,
    soldTickets: 7500,
    endDate: '2024-12-31',
    category: 'house',
    featured: true,
  },
  {
    id: '2',
    title: 'Rumah Klasik Bandung Heritage',
    description: 'Rumah bergaya kolonial dengan arsitektur klasik, taman yang asri, dan nuansa vintage yang memukau di pusat kota Bandung.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    price: 25000,
    totalTickets: 5000,
    soldTickets: 3200,
    endDate: '2024-11-30',
    category: 'house',
    featured: true,
  },
  {
    id: '3',
    title: 'Penthouse Surabaya City View',
    description: 'Penthouse eksklusif dengan pemandangan 360° kota Surabaya, fasilitas lengkap, dan akses mudah ke pusat bisnis.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    price: 75000,
    totalTickets: 15000,
    soldTickets: 8900,
    endDate: '2025-01-15',
    category: 'house',
    featured: false,
  },
  {
    id: '4',
    title: 'BMW X5 2024 Limited Edition',
    description: 'SUV premium dengan teknologi terdepan, interior mewah, dan performa tinggi. Kondisi baru dengan garansi resmi.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    price: 15000,
    totalTickets: 3000,
    soldTickets: 1800,
    endDate: '2024-12-15',
    category: 'car',
    featured: false,
  },
  {
    id: '5',
    title: 'MacBook Pro M3 Max Complete Set',
    description: 'Laptop premium untuk profesional dengan chip M3 Max, RAM 64GB, storage 2TB, plus aksesoris lengkap.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
    price: 5000,
    totalTickets: 1000,
    soldTickets: 650,
    endDate: '2024-11-20',
    category: 'electronics',
    featured: false,
  },
  {
    id: '6',
    title: 'Townhouse Bali Modern Tropical',
    description: 'Townhouse bergaya tropical modern dengan infinity pool, garden deck, dan akses langsung ke pantai Sanur.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    price: 35000,
    totalTickets: 7000,
    soldTickets: 4200,
    endDate: '2025-02-28',
    category: 'house',
    featured: true,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    raffleId: '1',
    ticketCount: 5,
    totalAmount: 250000,
    date: '2024-10-15',
    status: 'completed',
  },
  {
    id: 'tx2',
    raffleId: '2',
    ticketCount: 2,
    totalAmount: 50000,
    date: '2024-10-10',
    status: 'completed',
  },
  {
    id: 'tx3',
    raffleId: '4',
    ticketCount: 1,
    totalAmount: 15000,
    date: '2024-10-08',
    status: 'pending',
  },
];
