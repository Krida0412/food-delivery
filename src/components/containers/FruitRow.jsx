import React, { useEffect, useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { addItem } from '../../utils/cart';

/* ---------- Warna tema (match BottomNavbar) ---------- */
const PRIMARY = '#FE724C'; // orange
const ACCENT_BG = 'rgba(255,211,110,0.15)'; // soft yellow backdrop

function FruitRow({ data, scrollValue }) {
  const rowRef = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  /* auto-scroll */
  useEffect(() => {
    if (rowRef.current) rowRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  const addToCart = (item) => {
    const updated = addItem(cartItems, item);

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updated,
    });
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  return (
    <div
      ref={rowRef}
      className="
        w-full flex gap-4 mb-12 scroll-smooth
        overflow-x-scroll scrollbar-none
      "
    >
      {data?.map((item) => (
        <div
          key={item.id}
          className="
            min-w-[200px] flex-shrink-0 h-[260px] p-2 flex flex-col
            bg-white rounded-xl
            border border-[#EFEFEF]
            shadow-[0_4px_16px_rgba(0,0,0,0.04)]
            hover:shadow-[0_6px_20px_rgba(254,114,76,0.20)]
            hover:-translate-y-0.5 transition-all
          "
        >
          {/* Gambar buah */}
          <div
            className="w-full h-[120px] rounded-lg overflow-hidden"
            style={{ background: ACCENT_BG }}
          >
            <img
              src={item.imageURL}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info & aksi */}
          <div className="flex-1 mt-2 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#363636] line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#8A8A8A]">{item.calories} Kalori</p>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-bold" style={{ color: PRIMARY }}>
                Rp{item.price}
              </p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(item)}
                className="
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-white transition
                  shadow-[0_2px_6px_rgba(254,114,76,0.35)]
                "
                style={{ backgroundColor: PRIMARY }}
              >
                <MdShoppingBasket className="text-[18px]" />
              </motion.button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FruitRow;
