import React from 'react';
import { Truck } from 'lucide-react';

/* palet mini */
const BASE_BG = '#FFFCF9';

export default function CourierLayout({ children }) {
  return (
    <div
      style={{ background: BASE_BG }}
      className="min-h-screen flex flex-col"
    >
      {/* header */}
      <header className="px-4 md:px-8 py-4 shadow flex items-center gap-2 bg-white/80 backdrop-blur-md">
        <Truck size={24} className="text-[#FE724C]" />
        <h1 className="font-bold text-lg text-[#363636]">Panel Kurir</h1>
      </header>

      {/* konten */}
      <main className="flex-1 px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
