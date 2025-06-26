import React, { useState } from 'react';
import {
  FiChevronLeft,
  FiLogOut,
  FiMapPin,
  FiBell,
  FiCreditCard,
  FiClipboard,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getAuth, signOut } from 'firebase/auth';

/* ---------- Palet ---------- */
const PRIMARY = '#FE724C';
const BASE_BG = '#FFFCF9'; // <— latar dasar konsisten

const SettingsPage = () => {
  const [notif, setNotif] = useState(true);

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = '/signin';
  };

  return (
    <main
      className="w-full min-h-screen px-4 md:px-8 py-8"
      style={{ background: BASE_BG }}
    >
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <a
          href="/profile"
          className="
            p-[6px] rounded-full text-[#555] hover:bg-white/50 backdrop-blur
            shadow-[0_1px_4px_rgba(0,0,0,0.05)]
          "
        >
          <FiChevronLeft size={20} />
        </a>
        <h1 className="text-xl font-bold text-[#363636]">Pengaturan</h1>
      </header>

      {/* Menu List */}
      <section className="flex flex-col gap-4">
        <MenuItem
          icon={<FiMapPin />}
          title="Alamat Pengiriman"
          link="/address"
        />
        <MenuItem
          icon={<FiCreditCard />}
          title="Metode Pembayaran"
          link="/payment-method"
        />
        <MenuItem
          icon={<FiClipboard />}
          title="Riwayat Pesanan"
          link="/orders"
        />

        {/* Notifikasi */}
        <div
          className="
            flex items-center justify-between
            rounded-[1.618rem] p-4
            bg-white/80 backdrop-blur-md
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]
            border border-white/60
          "
        >
          <div className="flex items-center gap-3 text-[#555]">
            <FiBell />
            <span className="text-sm font-medium">Notifikasi Promo</span>
          </div>

          {/* Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notif}
              onChange={() => setNotif(!notif)}
              className="sr-only peer"
            />
            <span
              className="
                w-10 h-5 rounded-full bg-[#E5E5E5] peer-checked:bg-[#FE724C]/60
                transition-colors
              "
            />
            <span
              className="
                absolute left-0 top-0 w-5 h-5 rounded-full bg-white shadow
                transition-transform translate-x-0 peer-checked:translate-x-5
              "
            />
          </label>
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="
            flex items-center justify-between
            rounded-[1.618rem] p-4
            bg-red-50 hover:bg-red-100 border border-red-200
            text-red-600
          "
        >
          <div className="flex items-center gap-3">
            <FiLogOut />
            <span className="text-sm font-medium">Keluar</span>
          </div>
          <span className="text-xs">›</span>
        </motion.button>
      </section>
    </main>
  );
};

/* ---------- Sub-komponen MenuItem ---------- */
const MenuItem = ({ icon, title, link }) => (
  <a
    href={link}
    className="
      flex items-center justify-between
      rounded-[1.618rem] p-4
      bg-white/80 backdrop-blur-md
      shadow-[0_2px_8px_rgba(0,0,0,0.04)]
      border border-white/60
      hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]
      transition
    "
  >
    <div className="flex items-center gap-3 text-[#555]">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
    <span className="text-xs text-[#999]">›</span>
  </a>
);

export default SettingsPage;
