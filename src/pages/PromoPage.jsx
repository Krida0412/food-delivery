import React, { useState } from "react";
import { motion } from "framer-motion";
import PromoCard from "../components/ui/PromoCard";

// Import gambar lokal dari assets
import imgC1 from "../img/c1.png";
import imgC3 from "../img/c3.png";
import imgI7 from "../img/i7.png";

// Warna tema
const PRIMARY = "#FE724C";
const BASE_BG = "#FFFCF9";

// Dataset promo
const promos = [
  {
    id: 1,
    title: "Dada Ayam Panggang",
    desc: "Diskon 50% • s.d 30 Jun",
    image: imgC3,
    status: "tersedia",
    code: "IBLIS50",
    quota: 200,
    claimed: 75,
  },
  {
    id: 2,
    title: "Sayap Ayam",
    desc: "Beli 1 Gratis 1 • s.d 15 Jul",
    image: imgC1,
    status: "terpakai",
    code: "IBLISB1G1",
    quota: 300,
    claimed: 300,
  },
  {
    id: 3,
    title: "Es Krim",
    desc: "Gratis minuman untuk order ≥ Rp25K",
    image: imgI7,
    status: "tersedia",
    code: "ESTEHFREE",
    quota: 100,
    claimed: 15,
    expired: true,
  },
];

// Tab filter
const TABS = [
  { key: "semua", label: "Semua" },
  { key: "tersedia", label: "Tersedia" },
  { key: "terpakai", label: "Terpakai" },
];

function PromoPage() {
  const [filter, setFilter] = useState("semua");

  const filteredPromos =
    filter === "semua" ? promos : promos.filter((p) => p.status === filter);

  const handleUse = (id) => alert(`Gunakan kupon ID: ${id}`);

  return (
    <main
      className="w-full min-h-screen px-4 md:px-8 pt-20 pb-32"
      style={{ background: BASE_BG }}
    >
      {/* Heading */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#363636]">Promo</h1>
        <p className="text-sm text-[#8A8A8A]">Promo yang kamu miliki</p>
      </header>

      {/* Tabs */}
      <nav className="flex gap-3 mb-6 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const active = filter === tab.key;
          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition
                ${active ? "text-white" : "text-[#555] bg-white/60 backdrop-blur"}
              `}
              style={{
                background: active
                  ? "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)"
                  : "rgba(255,255,255,0.75)",
                boxShadow: active
                  ? "0 4px 16px rgba(254,114,76,0.35)"
                  : "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Daftar promo */}
      <section className="space-y-4">
        {filteredPromos.length ? (
          filteredPromos.map((p) => (
            <PromoCard key={p.id} promo={p} onUse={handleUse} />
          ))
        ) : (
          <p className="text-center text-[#8A8A8A]">Tidak ada promo.</p>
        )}
      </section>
    </main>
  );
}

export default PromoPage;
