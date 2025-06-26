import React, { useEffect, useRef } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const FruitRow = ({ data, scrollValue }) => {
  const rowRef = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  useEffect(() => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);

  const addToCart = (item) => {
    const updated = [...cartItems, item];
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: updated });
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  return (
    <div
      ref={rowRef}
      className="w-full flex gap-4 overflow-x-scroll scrollbar-none scroll-smooth mb-12"
    >
      {data?.map((item) => (
        <div
          key={item.id}
          className="min-w-[200px] flex-shrink-0 h-[260px] bg-white rounded-xl shadow-md hover:shadow-lg p-2 flex flex-col"
        >
          <div className="w-full h-[120px] rounded-lg overflow-hidden bg-gray-100">
            <img
              src={item.imageURL}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 mt-2 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.calories} Kalori</p>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-bold text-red-500">Rp{item.price}</p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(item)}
                className="w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                <MdShoppingBasket className="text-[18px]" />
              </motion.button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruitRow;
