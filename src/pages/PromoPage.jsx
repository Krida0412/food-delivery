import React, { useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';

const promos = [
  {
    id: 1,
    title: 'Mie Iblis',
    desc: 'Hanya Rp.4.000',
    image: 'https://source.unsplash.com/600x400/?noodles', // ganti sesuai gambar kamu
    status: 'tersedia',
  },
  {
    id: 2,
    title: 'Mie Iblis',
    desc: 'Hanya Rp.4.000',
    image: 'https://source.unsplash.com/600x400/?indomie',
    status: 'terpakai',
  },
];

const PromoCard = ({ title, desc, image, status }) => {
  const isUsed = status === 'terpakai';
  const buttonColor = isUsed ? 'bg-gray-300 text-gray-600' : 'bg-cyan-500 text-white';

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="flex">
        {/* Image */}
        <div className="w-28 h-28 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-pink-500">{desc}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="flex items-center gap-1 text-gray-400 text-xs">
              <BsTicketPerforated /> Kupon
            </span>
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium ${buttonColor}`}
              disabled={isUsed}
            >
              {isUsed ? 'Terpakai' : 'Ambil'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromoPage = () => {
  const [filter, setFilter] = useState('semua');

  const filteredPromos =
    filter === 'semua' ? promos : promos.filter((p) => p.status === filter);

  return (
    <section className="w-full min-h-screen bg-[#fefefe] px-4 py-6">
      <h1 className="text-lg font-bold text-gray-800 mb-3">Promo</h1>
      <p className="text-sm text-gray-500 mb-4">Promo yang anda miliki</p>

      {/* Tabs */}
      <div className="flex gap-4 text-sm font-medium border-b border-gray-200 mb-5">
        {['semua', 'tersedia', 'terpakai'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              filter === tab
                ? 'text-cyan-500 border-b-2 border-cyan-500'
                : 'text-gray-400'
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Promo List */}
      <div className="flex flex-col gap-4">
        {filteredPromos.map((promo) => (
          <PromoCard key={promo.id} {...promo} />
        ))}
      </div>
    </section>
  );
};

export default PromoPage;
