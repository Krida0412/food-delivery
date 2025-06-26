// src/pages/ThankYouPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Success"
        className="w-28 h-28 mb-6"
      />
      <h1 className="text-2xl font-bold text-green-600 mb-2">Terima kasih!</h1>
      <p className="text-gray-600 text-center max-w-md">
        Pesanan kamu telah berhasil diproses. Silakan tunggu hingga pesanan
        dikirimkan ke alamatmu.
      </p>

      <button
        onClick={() => navigate("/main")}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default ThankYouPage;
