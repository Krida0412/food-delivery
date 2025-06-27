import React, { useEffect, useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { motion } from "framer-motion";

import HomeContainer from "./HomeContainer";
import UserMap from "../Maps/UserMap";
import FruitRow from "./FruitRow";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

import { useStateValue } from "../../context/StateProvider";

/* ---------- Palet ---------- */
const PRIMARY   = "#FE724C";   // orange
const ACCENT_BG = "#F3F6FF";   // soft backdrop

/* ---------- Komponen ---------- */
const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  /* trigger scroll di FruitRow */
  useEffect(() => {}, [scrollValue]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      {/* Hero */}
      <HomeContainer />

      {/* Peta Lokasi */}
      <UserMap />

      {/* ---------- Section Buah Segar ---------- */}
      <section className="w-full pt-8  md:px-8 lg:px-16">
        {/* Heading + tombol scroll */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="relative text-2xl md:text-3xl font-bold text-[#363636]">
            Buah Segar Pilihan Kami
            <span
              className="absolute -bottom-2 left-0 h-1 w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg,#FE724C 0%,#FFD36E 100%)",
              }}
            />
          </h2>

          {/* Tombol scroll (desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <ScrollBtn onClick={() => setScrollValue(-200)}>
              <MdChevronLeft size={22} />
            </ScrollBtn>
            <ScrollBtn onClick={() => setScrollValue(200)}>
              <MdChevronRight size={22} />
            </ScrollBtn>
          </div>
        </div>

        {/* Row buah */}
        <FruitRow
          scrollValue={scrollValue}
          data={foodItems?.filter((i) => i.category === "fruits")}
        />
      </section>

      {/* Menu kategori + produk */}
      <MenuContainer />

      {/* Cart overlay */}
      {cartShow && <CartContainer />}
    </div>
  );
};

/* ---------- Sub-komponen Tombol Scroll ---------- */
const ScrollBtn = ({ children, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="
      w-10 h-10 flex items-center justify-center
      rounded-full
      backdrop-blur-md bg-white/80
      border border-white/60
      shadow-[0_2px_6px_rgba(0,0,0,0.05)]
      hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
      transition
    "
  >
    <span className="text-[#{PRIMARY}] text-xl" style={{ color: PRIMARY }}>
      {children}
    </span>
  </motion.button>
);

export default MainContainer;
