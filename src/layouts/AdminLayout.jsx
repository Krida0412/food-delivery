// src/layouts/AdminLayout.jsx
import React from 'react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2'; // ⚙️ modern admin icon

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFFCF9] px-4 md:px-8 py-8">
      {/* Header */}
      <header className="mb-8 flex items-center gap-3 justify-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FE724C]/10 text-[#FE724C] shadow-inner">
          <HiOutlineCog6Tooth className="text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-[#363636]">Admin Panel</h1>
      </header>

      {/* Garis dekoratif */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#FFD36E] via-[#FE724C]/60 to-transparent mb-8 rounded-full" />

      {/* Konten utama */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
