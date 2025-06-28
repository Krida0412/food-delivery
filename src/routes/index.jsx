import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import CourierLayout from '../layouts/CourierLayout';
import ProtectedRoute from './ProtectedRoute';

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
import CourierPage from '../pages/CourierPage';

import MenuListPage from '../pages/MenuListPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔁 Default redirect ke /signin */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* 🔐 Halaman yang butuh login */}
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
            <AdminLayout>
              <CreateContainer />
            </AdminLayout>
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

      {/* 👮‍♂️ Admin Pages */}
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
        path="/admin/menu"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MenuListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CreateContainer />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/editItem/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CreateContainer editMode />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* 🚚 Courier Pages */}
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

      {/* 🔓 Auth Pages */}
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
