import React, { useEffect, useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import notFound from '../../img/NotFound.svg';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = (item) => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [...cartItems, item],
    });
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 mb-12 scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-[166px] h-[240px] rounded-xl bg-white shadow-md hover:shadow-lg transition-all p-2 flex flex-col"
          >
            {/* Gambar Makanan */}
            <div className="w-full h-[120px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item?.imageURL}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nama + Kalori */}
            <div className="flex-1 mt-2 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {item?.title}
                </h3>
                <p className="text-xs text-gray-500">{item?.calories} Kalori</p>
              </div>

              {/* Harga + Tombol */}
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-bold text-red-500">
                  Rp{item?.price}
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addtocart(item)}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition"
                >
                  <MdShoppingBasket className="text-[18px]" />
                </motion.button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center ">
          <img src={notFound} className="h-340" alt="" />
          <p className="text-xl text-headingColor font-semibold my-5">
            {' '}
            Tidak ada item yang dapat ditampilkan{' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
