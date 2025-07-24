export interface RaffleItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  totalTickets: number;
  soldTickets: number;
  endDate: string;
  category: 'house' | 'car' | 'electronics' | 'other';
  featured: boolean;
}

export interface CartItem {
  raffleId: string;
  ticketCount: number;
}

export interface Transaction {
  id: string;
  raffleId: string;
  ticketCount: number;
  totalAmount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
