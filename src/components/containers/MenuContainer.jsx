import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import { categories } from "../../utils/data";
import RowContainer from "./RowContainer";
import { useStateValue } from "../../context/StateProvider";

/* ---------- Palet ---------- */
const PRIMARY = "#FE724C";
const SECONDARY = "#FFD36E";
const ACCENT_BG = "#F3F6FF";

function MenuContainer() {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }] = useStateValue();

  return (
    <section id="menu" className="w-full py-6 px-4 md:px-10">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#363636] relative inline-block">
          Menu Spesial Kami
          <span
            className="absolute left-0 -bottom-1 w-20 h-1 rounded-full"
            style={{
              background: "linear-gradient(to right, #FE724C, #FFD36E)",
            }}
          />
        </h2>
      </div>

      {/* Category Selector */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-4">
        {categories.map((cat) => {
          const isActive = filter === cat.urlParamName;

          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={cat.id}
              onClick={() => setFilter(cat.urlParamName)}
              className={`
                flex-shrink-0
                px-4 py-3 min-w-[90px]
                rounded-full border
                flex flex-col items-center justify-center gap-2
                transition-all duration-300 ease-in-out
                shadow-sm
                ${
                  isActive
                    ? "bg-[#FE724C] border-transparent text-white"
                    : "bg-white border-[#E5E5E5] text-[#555]"
                }
              `}
              style={{
                boxShadow: isActive
                  ? "0 4px 16px rgba(254,114,76,0.25)"
                  : "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  isActive ? "bg-white text-[#FE724C]" : "bg-[#FE724C]/10 text-[#FE724C]"
                }`}
              >
                <IoFastFood className="text-lg" />
              </div>
              <span className="text-sm font-medium">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Produk Filtered */}
      <div className="mt-6">
        <RowContainer
          flag={false}
          data={foodItems?.filter((n) => n.category === filter)}
        />
      </div>
    </section>
  );
}

export default MenuContainer;
