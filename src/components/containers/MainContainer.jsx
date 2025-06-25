import React, { useEffect, useState } from 'react';
import HomeContainer from './HomeContainer';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from '../../context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import UserMap from '../Maps/UserMap';

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

      {/* ✅ Bagian Buah Segar */}
      <section className="w-full my-6 px-4 md:px-8 lg:px-16">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-r from-orange-400 to-orange-600 transition-all ease-in-out">
            Buah Segar Pilihan Kami
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <div
              className="animate-bounce w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-2600)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </div>
            <div
              className="animate-bounce w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(+2600)}
            >
              <MdChevronRight className="text-lg text-white" />
            </div>
          </div>
        </div>

        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === 'fruits')}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
