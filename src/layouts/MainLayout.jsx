import React from "react";
import Header from "../components/layouts/Header";
import BottomNavbar from "../components/ui/BottomNavbar";

/**
 * MainLayout – kerangka utama seluruh halaman
 * ✅ Fokus mobile-first PWA
 * ✅ Padding sesuai golden ratio
 * ✅ Shadow dan layering UI modern
 */
const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#FFFCF9] text-[#363636] overflow-x-hidden">
      {/* Header tetap di atas */}
      <div className="fixed top-0 left-0 right-0 z-40 shadow-sm bg-white">
        <Header />
      </div>

      {/* Isi halaman */}
      <main
        className=" px-4 md:px-16 w-full max-w-screen-md mx-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </main>

      {/* Navbar bawah tetap di bawah */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-inner">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default MainLayout;
