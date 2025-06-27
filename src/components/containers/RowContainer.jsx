import React, { useEffect, useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import notFound from '../../img/NotFound.svg';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { addItem } from "../../utils/cart";

/* ---------- Warna tema (match BottomNavbar) ---------- */
const PRIMARY = '#FE724C'; // orange
const SECONDARY = '#FFD36E'; // soft yellow
const ACCENT_BG = '#F3F6FF'; // pill-ish light

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = (item) => {
    const updated = addItem(cartItems, item);

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updated,
    });
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  /* scroll auto */
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 py-1 mb-12 scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {/* ----------- Card list ----------- */}
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="
              w-[144px] h-[250px] rounded-xl
              border border-[#EFEFEF]
              shadow-[0_4px_16px_rgba(0,0,0,0.04)]
              hover:shadow-[0_6px_20px_rgba(254,114,76,0.20)]
              hover:-translate-y-0.5 transition-all
              p-2 flex flex-col
            "
          >
            {/* Gambar */}
            <div className="w-full h-[120px] rounded-lg overflow-hidden bg-[rgba(255,211,110,0.15)]">
              <img
                src={item?.imageURL}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 mt-2 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#363636] line-clamp-2 leading-tight">
                  {item?.title}
                </h3>
                <p className="text-xs text-[#8A8A8A]">
                  {item?.calories} Kalori
                </p>
              </div>

              {/* Harga + Button */}
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold" style={{ color: PRIMARY }}>
                  Rp{item?.price}
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(item)}
                  className="
                    w-8 h-8 rounded-full flex items-center justify-center
                    text-white
                    shadow-[0_2px_6px_rgba(254,114,76,0.35)]
                    transition
                  "
                  style={{ backgroundColor: PRIMARY }}
                >
                  <MdShoppingBasket className="text-[18px]" />
                </motion.button>
              </div>
            </div>
          </div>
        ))
      ) : (
        /* ----------- Fallback ----------- */
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-40" alt="Not Found" />
          <p className="text-lg font-semibold text-[#8A8A8A] mt-4">
            Tidak ada item yang dapat ditampilkan
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
