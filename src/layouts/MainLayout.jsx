import React from "react";
import Header from "../components/layouts/Header";
import BottomNavbar from "../components/ui/BottomNavbar"; // ✅ import navbar PWA

const MainLayout = ({ children }) => {
  return (
    <div className="w-screen h-auto flex flex-col bg-white">
      {/* Header atas */}
      <Header />

      {/* Konten utama */}
      <main className="mt-14 md:mt-20 px-4 md:px-16 pb-20 pt-4 w-full">
        {children}
      </main>

      {/* Navbar bawah */}
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
