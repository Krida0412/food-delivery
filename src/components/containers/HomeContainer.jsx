import React from "react";
import Delivery from "../../img/delivery.png";
import { motion } from "framer-motion";

/* ---------- Palet ---------- */
const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";
const ACCENT_BG = "#F3F6FF";

const HomeContainer = () => {
  return (
    <section
      id="home"
      className="
        w-full flex items-center justify-center
        bg-gradient-to-br from-[#FFF4EE] via-[#FFE6EC] to-[#FDEBF1]
        px-6 py-12
      "
    >
      <div className="max-w-md w-full flex flex-col gap-6">
        {/* Badge delivery */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="
            flex items-center gap-2
            px-4 py-1
            rounded-full
            bg-white/80 backdrop-blur-md
            shadow-[0_2px_8px_rgba(0,0,0,0.06)]
            w-fit
          "
        >
          <p
            className="text-sm font-semibold"
            style={{ color: PRIMARY }}
          >
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow">
            <img
              src={Delivery}
              alt="delivery"
              className="w-5 h-5 object-contain"
            />
          </div>
        </motion.div>

        {/* Judul */}
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#363636]">
          Lagi Laper?
          <span
            className="block text-4xl md:text-5xl"
            style={{ color: PRIMARY }}
          >
            Tenang Aja Bro!
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="text-sm md:text-base text-[#555]">
          Makan, minum, ngemil—semua ada di satu aplikasi.
        </p>

        {/* Search bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="
            w-full flex items-center gap-2
            px-4 py-[10px]
            rounded-full
            bg-white/90 backdrop-blur-md
            shadow-[0_2px_12px_rgba(0,0,0,0.05)]
            focus-within:ring-2 focus-within:ring-[#FE724C]/40
          "
        >
          <i className="fas fa-search text-[#999]" />
          <input
            type="text"
            placeholder="Cari makanan atau minuman…"
            className="
              flex-1 bg-transparent outline-none
              text-sm text-[#363636] placeholder:text-[#999]
            "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeContainer;
