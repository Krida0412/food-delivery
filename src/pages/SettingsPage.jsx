import React, { useState } from 'react';
import { FiChevronLeft, FiLogOut, FiMapPin, FiBell, FiCreditCard, FiClipboard } from 'react-icons/fi';
import { getAuth, signOut } from 'firebase/auth';

const SettingsPage = () => {
  const [notif, setNotif] = useState(true);

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = '/signin';
  };

  return (
    <section className="w-full min-h-screen px-4 py-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <a
          href="/profile"
          className="text-gray-600 text-xl p-1 rounded hover:bg-gray-100"
        >
          <FiChevronLeft />
        </a>
        <h1 className="text-lg font-bold text-gray-800">Pengaturan</h1>
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-4">

        {/* Alamat */}
        <a
          href="/address"
          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiMapPin />
            <span className="text-sm font-medium">Alamat Pengiriman</span>
          </div>
          <span className="text-xs text-gray-400">›</span>
        </a>

        {/* Metode Pembayaran */}
        <a
          href="/payment-method"
          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiCreditCard />
            <span className="text-sm font-medium">Metode Pembayaran</span>
          </div>
          <span className="text-xs text-gray-400">›</span>
        </a>

        {/* Riwayat Pesanan */}
        <a
          href="/orders"
          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200"
        >
          <div className="flex items-center gap-3 text-gray-700">
            <FiClipboard />
            <span className="text-sm font-medium">Riwayat Pesanan</span>
          </div>
          <span className="text-xs text-gray-400">›</span>
        </a>

        {/* Notifikasi */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-3 text-gray-700">
            <FiBell />
            <span className="text-sm font-medium">Notifikasi Promo</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={notif}
              onChange={() => setNotif(!notif)}
            />
            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
              <div
                className={`w-5 h-5 rounded-full bg-cyan-500 absolute top-0 left-0 transition-transform ${
                  notif ? 'translate-x-5' : ''
                }`}
              />
            </div>
          </label>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
        >
          <div className="flex items-center gap-3">
            <FiLogOut />
            <span className="text-sm font-medium">Keluar</span>
          </div>
          <span className="text-xs">›</span>
        </button>
      </div>
    </section>
  );
};

export default SettingsPage;
