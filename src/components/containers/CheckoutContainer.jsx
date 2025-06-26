import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import CartItem from '../ui/CartItem';

import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../firebase.config';

const db = getFirestore(app);

const CheckoutContainer = () => {
  const navigate = useNavigate();
  const [{ cartItems, user }] = useStateValue();
  const [alamat, setAlamat] = useState('');

  const totalHarga = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const ongkir = 2500;
  const totalPembayaran = totalHarga + ongkir;

  const handleBayar = async () => {
    if (!user) return alert('Kamu harus login terlebih dahulu!');
    if (!alamat.trim()) return alert('Alamat pengiriman tidak boleh kosong!');

    try {
      await addDoc(collection(db, 'orders'), {
        uid: user.uid,
        alamat,
        items: cartItems,
        total: totalPembayaran,
        createdAt: serverTimestamp(),
      });

      alert('Pembayaran berhasil!');
      navigate('/thankyou');
    } catch (error) {
      console.error('Gagal menyimpan order:', error);
      alert('Terjadi kesalahan saat menyimpan pesanan.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 md:px-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Ringkasan Produk */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Produk dalam Keranjang</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Alamat Pengiriman */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Alamat Pengiriman</h3>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows="3"
            placeholder="Masukkan alamat lengkap pengiriman..."
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          ></textarea>
        </div>

        {/* Ringkasan Biaya */}
        <div className="border-t pt-4 space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {totalHarga.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Ongkir</span>
            <span>Rp {ongkir.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-gray-800 border-t pt-2">
            <span>Total</span>
            <span>Rp {totalPembayaran.toLocaleString()}</span>
          </div>
        </div>

        {/* Tombol Bayar */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBayar}
          disabled={cartItems.length === 0}
          className="w-full p-3 rounded-md bg-gradient-to-tr from-orange-400 to-orange-600 text-white text-lg font-medium shadow hover:shadow-lg disabled:opacity-50"
        >
          Bayar Sekarang
        </motion.button>
      </div>
    </div>
  );
};

export default CheckoutContainer;
