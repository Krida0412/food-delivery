import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MdHome, MdAccessTime, MdLocalOffer, MdPerson } from 'react-icons/md';
import { motion } from 'framer-motion';

// ---------- Konfigurasi ----------
const navItems = [
  { label: 'Home', icon: MdHome, path: '/main' },
  { label: 'Riwayat', icon: MdAccessTime, path: '/riwayat' },
  { label: 'Promo', icon: MdLocalOffer, path: '/promo' },
  { label: 'Profil', icon: MdPerson, path: '/profile' },
];

// ---------- Warna Tema ----------
const activePill = 'bg-[#F3F6FF] border border-[#FFD36E]';
const activeCircle = 'bg-[#FE724C]/90';
const idleCircle = 'bg-[#FE724C]/10';

function BottomNavbar() {
  const { pathname } = useLocation();

  return (
    <nav
      className="
    fixed bottom-0 left-0 w-full z-50
    bg-white/80 backdrop-blur-lg
    shadow-[0_-2px_20px_rgba(0,0,0,0.06)]
    border-t border-t-white/40
    rounded-t-[1.618rem]
    pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))]
    min-h-[4.5rem]
    "
    >
      <ul className="flex items-center justify-between px-6">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname === path;

          return (
            <li key={path} className="flex-1">
              <NavLink
                to={path}
                className="flex flex-col items-center justify-center relative"
              >
                {/* Floating pill */}
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={`absolute -top-8 w-14 h-14 rounded-full ${activePill}`}
                  />
                )}

                {/* Icon wrapper */}
                <motion.span
                  animate={{
                    y: isActive ? -26 : 0,
                    scale: isActive ? 1.12 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className={`relative z-10 flex items-center justify-center
                    w-11 h-11 rounded-full shadow-sm
                    ${isActive ? activeCircle : idleCircle}`}
                >
                  <Icon
                    className={`text-2xl transition-colors
                      ${isActive ? 'text-white' : 'text-[#FE724C]'}`}
                  />
                </motion.span>

                {/* Label */}
                <span
                  className={`mt-[0.618rem] text-[0.75rem] font-medium
                    transition-colors
                    ${isActive ? 'text-[#FE724C]' : 'text-[#363636]/70'}`}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNavbar;
