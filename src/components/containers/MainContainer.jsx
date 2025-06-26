import React, { useEffect, useState } from 'react';
import HomeContainer from './HomeContainer';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from '../../context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import UserMap from '../Maps/UserMap';
import FruitRow from './FruitRow';

// ✅ Import gambar dengan benar dari src
import promoBanner from '../../img/c3.png';

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <UserMap />

      {/* Buah Segar Section */}
      <section className="w-full py-5 md:px-8 lg:px-16">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold mb-3 capitalize text-headingColor relative before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-r from-orange-400 to-orange-600">
            Buah Segar Pilihan Kami
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <button
              onClick={() => setScrollValue(-200)}
              className="w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center hover:shadow-lg"
            >
              <MdChevronLeft className="text-lg text-white" />
            </button>
            <button
              onClick={() => setScrollValue(200)}
              className="w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center hover:shadow-lg"
            >
              <MdChevronRight className="text-lg text-white" />
            </button>
          </div>
        </div>

        <FruitRow
          scrollValue={scrollValue}
          data={foodItems?.filter((item) => item.category === 'fruits')}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
