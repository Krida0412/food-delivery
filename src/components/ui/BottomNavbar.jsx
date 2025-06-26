import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdHome,
  MdAccessTime,
  MdLocalOffer,
  MdPerson,
} from "react-icons/md";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", icon: MdHome, path: "/main" },
  { label: "Riwayat", icon: MdAccessTime, path: "/riwayat" },
  { label: "Promo", icon: MdLocalOffer, path: "/promo" },
  { label: "Profile", icon: MdPerson, path: "/profile" },
];

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#00BCD4] z-50 shadow-md border-t border-[#00ACC1]">
      <div className="flex items-center justify-between px-4">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={i}
              className="flex-1 flex flex-col items-center justify-center relative"
            >
              <div className="relative flex flex-col items-center justify-center">
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -top-7 bg-white border border-yellow-100 rounded-full w-12 h-12"
                  />
                )}

                <motion.div
                  animate={{
                    y: isActive ? -25 : 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full ${
                    isActive ? "bg-[#00BCD4] shadow-sm" : "bg-[#00BCD4]"
                  }`}
                >
                  <Icon
                    className={`text-2xl ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  />
                </motion.div>

                <span
                  className={`text-xs mb-2 font-medium ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;
