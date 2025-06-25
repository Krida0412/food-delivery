import React from 'react';
import Delivery from '../../img/delivery.png';

const HomeContainer = () => {
  return (
    <section
      id="home"
      className="w-full rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-100 px-6 py-10"
    >
      <div className="max-w-md w-full flex flex-col gap-6">
        {/* Info Delivery */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm w-fit">
          <p className="text-sm text-orange-500 font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden shadow-md flex items-center justify-center">
            <img
              src={Delivery}
              className="w-5 h-5 object-contain"
              alt="delivery"
            />
          </div>
        </div>

        {/* Judul */}
        <h1 className="text-3xl font-bold text-headingColor leading-tight">
          Lagi Laper?  
          <span className="block text-orange-600 text-4xl">Tenang Aja Bro!</span>
        </h1>

        {/* Deskripsi */}
        <p className="text-sm text-gray-600">
          Makan, minum, ngemil semua ada.  
        </p>

        {/* Search Bar */}
        <div className="w-full">
          <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 focus-within:ring-2 ring-orange-300 transition-all">
            <i className="fas fa-search text-gray-400 text-sm mr-2"></i>
            <input
              type="text"
              placeholder="Cari makanan atau minuman..."
              className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
