import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute'; // ✅ import proteksi

import MainContainer from '../components/containers/MainContainer';
import CreateContainer from '../components/containers/CreateContainer';
import CheckoutContainer from '../components/containers/CheckoutContainer';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PromoPage from '../pages/PromoPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import RiwayatPage from '../pages/RiwayatPage';
import ThankYouPage from '../pages/ThankYouPage';
import AdminPage from '../pages/AdminPage';
import AdminLayout from '../layouts/AdminLayout';
import CourierLayout from '../layouts/CourierLayout';
import CourierPage from '../pages/CourierPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Redirect root ke /signin */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* 🔐 Halaman dengan proteksi login */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MainContainer />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/createItem"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CreateContainer />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CheckoutContainer />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/promo"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PromoPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/riwayat"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RiwayatPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/thankyou"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ThankYouPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier"
        element={
          <ProtectedRoute>
            <CourierLayout>
              <CourierPage />
            </CourierLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔓 Auth Pages tanpa login */}
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
