import React, { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {
  FiUser,
  FiLogOut,
  FiClipboard,
  FiTag,
  FiSettings,
  FiEdit2,
} from 'react-icons/fi';

/* -------------------------------------------------- */
/*  UTIL: Ambil / buat dok user di Firestore          */
/* -------------------------------------------------- */
const useUserProfile = () => {
  const [user, setUser] = useState(null);          // data Auth
  const [profile, setProfile] = useState(null);    // data Firestore
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setUser(usr);
        const db = getFirestore();
        const ref = doc(db, 'users', usr.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          // buat dokumen default
          const data = {
            name: usr.displayName || 'Pengguna Baru',
            phone: '',
            createdAt: Date.now(),
          };
          await setDoc(ref, data);
          setProfile(data);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, profile, loading };
};

/* -------------------------------------------------- */
/*  COMPONENT: ProfilePage                            */
/* -------------------------------------------------- */
const ProfilePage = () => {
  const { user, profile, loading } = useUserProfile();
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const saveName = async () => {
    if (!nameInput) return;
    const auth = getAuth();
    const db = getFirestore();
    await updateProfile(auth.currentUser, { displayName: nameInput });
    await setDoc(
      doc(db, 'users', auth.currentUser.uid),
      { name: nameInput },
      { merge: true }
    );
    setEditName(false);
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    // redirect bisa pakai react-router navigate
    window.location.href = '/signin';
  };

  if (loading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">Kamu belum login.</p>
        <a
          href="/signin"
          className="px-4 py-2 bg-cyan-500 text-white rounded-md"
        >
          Login Sekarang
        </a>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-4 py-6 bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            user.photoURL ||
            'https://ui-avatars.com/api/?name=' +
              encodeURIComponent(user.displayName || 'U')
          }
          alt={user.displayName}
          className="w-16 h-16 rounded-full border"
        />

        <div className="flex-1">
          {editName ? (
            <div className="flex gap-2 items-center">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nama baru"
                className="border px-2 py-1 rounded w-full text-sm"
              />
              <button
                onClick={saveName}
                className="px-3 py-1 bg-cyan-500 text-white text-xs rounded"
              >
                Simpan
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">
                {user.displayName || profile?.name}
              </h2>
              <button
                onClick={() => {
                  setEditName(true);
                  setNameInput(user.displayName || profile?.name || '');
                }}
                className="text-gray-500"
              >
                <FiEdit2 />
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      {/* MENU LIST */}
      <div className="flex flex-col gap-4">
        <MenuItem icon={<FiClipboard />} title="Pesanan Saya" link="/orders" />
        <MenuItem icon={<FiTag />} title="Kupon Saya" link="/promo" />
        <MenuItem icon={<FiSettings />} title="Pengaturan" link="/settings" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600"
        >
          <div className="flex items-center gap-3">
            <FiLogOut />
            <span className="text-sm font-medium">Keluar</span>
          </div>
          <span className="text-xs">›</span>
        </button>
      </div>
    </section>
  );
};

/* -------------------------------------------------- */
/*  Sub-komponen util menu                            */
/* -------------------------------------------------- */
const MenuItem = ({ icon, title, link }) => (
  <a
    href={link}
    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200"
  >
    <div className="flex items-center gap-3 text-gray-700">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
    <span className="text-xs text-gray-400">›</span>
  </a>
);

export default ProfilePage;
