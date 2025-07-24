import React, { useState } from 'react';
import { ShoppingCart, History, User, Settings, Ticket, Trophy, Calendar } from 'lucide-react';
import { mockRaffles, mockTransactions } from '../data/mockData';
import { CartItem } from '../types';

interface ProfilePageProps {
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ cart, onUpdateCart }) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'transactions' | 'profile'>('cart');

  const cartWithDetails = cart.map(cartItem => {
    const raffle = mockRaffles.find(r => r.id === cartItem.raffleId);
    return {
      ...cartItem,
      raffle,
      totalPrice: raffle ? raffle.price * cartItem.ticketCount : 0,
    };
  });

  const totalCartValue = cartWithDetails.reduce((sum, item) => sum + item.totalPrice, 0);

  const updateTicketCount = (raffleId: string, newCount: number) => {
    if (newCount <= 0) {
      onUpdateCart(cart.filter(item => item.raffleId !== raffleId));
    } else {
      onUpdateCart(cart.map(item => 
        item.raffleId === raffleId 
          ? { ...item, ticketCount: newCount }
          : item
      ));
    }
  };

  const tabs = [
    { id: 'cart', label: 'Keranjang', icon: ShoppingCart, count: cart.length },
    { id: 'transactions', label: 'Transaksi', icon: History, count: mockTransactions.length },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-accent-500 text-white border-4 border-black shadow-brutal p-6 transform rotate-1">
            <h1 className="text-3xl md:text-4xl font-black text-center">👤 PROFIL SAYA</h1>
            <p className="text-center text-lg font-semibold mt-2">Kelola akun dan aktivitas undian Anda</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-4 border-black shadow-brutal mb-8">
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 px-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent-500 text-white'
                      : 'bg-white text-dark hover:bg-gray-100'
                  } last:border-r-0`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="bg-error text-white text-xs rounded-full px-2 py-1">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white border-4 border-black shadow-brutal p-6">
          {activeTab === 'cart' && (
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Keranjang Belanja</span>
              </h2>

              {cartWithDetails.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-black text-dark mb-2">Keranjang Kosong</h3>
                  <p className="text-gray-700 font-semibold">Mulai berbelanja dan tambahkan tiket undian ke keranjang Anda</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartWithDetails.map((item) => (
                    <div key={item.raffleId} className="border-2 border-black p-4 bg-gray-50">
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <img
                          src={item.raffle?.image}
                          alt={item.raffle?.title}
                          className="w-full md:w-24 h-24 object-cover border-2 border-black"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-dark mb-2">{item.raffle?.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">Harga per tiket: Rp {item.raffle?.price.toLocaleString('id-ID')}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateTicketCount(item.raffleId, item.ticketCount - 1)}
                                className="bg-error text-white px-3 py-1 border-2 border-black font-bold hover:bg-red-600"
                              >
                                -
                              </button>
                              <span className="font-bold px-4">{item.ticketCount}</span>
                              <button
                                onClick={() => updateTicketCount(item.raffleId, item.ticketCount + 1)}
                                className="bg-success text-white px-3 py-1 border-2 border-black font-bold hover:bg-green-600"
                              >
                                +
                              </button>
                            </div>
                            <div className="font-bold text-primary-600">
                              Total: Rp {item.totalPrice.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => updateTicketCount(item.raffleId, 0)}
                          className="bg-error text-white px-4 py-2 border-2 border-black font-bold hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t-4 border-black pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-black text-dark">Total Keranjang:</span>
                      <span className="text-2xl font-black text-primary-600">
                        Rp {totalCartValue.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <button className="w-full bg-primary-500 text-white py-4 px-6 border-4 border-black shadow-brutal font-bold text-lg hover:shadow-brutal-lg hover:translate-x-2 hover:translate-y-2 transition-all duration-200">
                      CHECKOUT SEKARANG
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 flex items-center space-x-2">
                <History className="h-6 w-6" />
                <span>Riwayat Transaksi</span>
              </h2>

              {mockTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-black text-dark mb-2">Belum Ada Transaksi</h3>
                  <p className="text-gray-700 font-semibold">Transaksi Anda akan muncul di sini setelah melakukan pembelian</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => {
                    const raffle = mockRaffles.find(r => r.id === transaction.raffleId);
                    return (
                      <div key={transaction.id} className="border-2 border-black p-4 bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="flex-1">
                            <h3 className="font-bold text-dark mb-1">{raffle?.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Ticket className="h-4 w-4" />
                                <span>{transaction.ticketCount} tiket</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(transaction.date).toLocaleDateString('id-ID')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-bold text-primary-600">
                                Rp {transaction.totalAmount.toLocaleString('id-ID')}
                              </div>
                              <div className={`text-sm font-semibold ${
                                transaction.status === 'completed' ? 'text-success' :
                                transaction.status === 'pending' ? 'text-warning' : 'text-error'
                              }`}>
                                {transaction.status === 'completed' ? 'Selesai' :
                                 transaction.status === 'pending' ? 'Pending' : 'Gagal'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-black text-dark mb-6 flex items-center space-x-2">
                <User className="h-6 w-6" />
                <span>Informasi Profil</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      defaultValue="+62 812-3456-7890"
                      className="w-full px-4 py-3 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-primary-50 border-2 border-black p-6">
                    <h3 className="font-black text-dark mb-4 flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>Statistik Saya</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Tiket Dibeli:</span>
                        <span className="font-bold">8 tiket</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Pengeluaran:</span>
                        <span className="font-bold">Rp 315.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Undian Diikuti:</span>
                        <span className="font-bold">3 undian</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-accent-500 text-white py-3 px-4 border-2 border-black shadow-brutal font-bold hover:shadow-brutal-lg hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                    SIMPAN PERUBAHAN
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
