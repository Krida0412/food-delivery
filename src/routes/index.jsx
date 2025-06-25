import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import MainContainer from '../components/containers/MainContainer';
import CreateContainer from '../components/containers/CreateContainer';
import CheckoutContainer from '../components/containers/CheckoutContainer';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PromoPage from '../pages/PromoPage'; // ✅ Tambahkan ini
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import RiwayatPage from "../pages/RiwayatPage";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Beranda */}
      <Route
        path="/"
        element={
          <MainLayout>
            <MainContainer />
          </MainLayout>
        }
      />

      {/* Buat Item */}
      <Route
        path="/createItem"
        element={
          <MainLayout>
            <CreateContainer />
          </MainLayout>
        }
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          <MainLayout>
            <CheckoutContainer />
          </MainLayout>
        }
      />

      {/* Promo */}
      <Route
        path="/promo"
        element={
          <MainLayout>
            <PromoPage />
          </MainLayout>
        }
      />

      {/* Profil */}
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        }
      />

      {/* setting */}
      <Route
        path="/settings"
        element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        }
      />

      {/* setting */}
      <Route
        path="/riwayat"
        element={
          <MainLayout>
            <RiwayatPage />
          </MainLayout>
        }
      />

      {/* Auth Pages */}
      <Route
        path="/signin"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
