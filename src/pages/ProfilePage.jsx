import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  FiUser,
  FiLogOut,
  FiClipboard,
  FiTag,
  FiSettings,
  FiEdit2,
} from "react-icons/fi";
import { motion } from "framer-motion";

/* ---------- Palet ---------- */
const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";
const BASE_BG   = "#FFFCF9";   // 🎯 base-background konsisten

/* -------------------------------------------------- */
/*  UTIL: Ambil / buat dok user di Firestore          */
/* -------------------------------------------------- */
const useUserProfile = () => {
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        setUser(usr);
        const db  = getFirestore();
        const ref = doc(db, "users", usr.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          /* buat dokumen default */
          const data = {
            name: usr.displayName || "Pengguna Baru",
            phone: "",
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
  const [editName, setEditName]   = useState(false);
  const [nameInput, setNameInput] = useState("");

  /* Simpan nama baru */
  const saveName = async () => {
    if (!nameInput.trim()) return;
    const auth = getAuth();
    const db   = getFirestore();
    await updateProfile(auth.currentUser, { displayName: nameInput });
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { name: nameInput },
      { merge: true }
    );
    setEditName(false);
  };

  /* Logout */
  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = "/signin";
  };

  /* ------ UI loading / not-logged-in ------ */
  if (loading) {
    return (
      <section
        className="w-full min-h-screen flex items-center justify-center"
        style={{ background: BASE_BG }}
      >
        <p className="text-[#555]">Memuat…</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section
        className="w-full min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: BASE_BG }}
      >
        <p className="text-[#8A8A8A]">Kamu belum login.</p>
        <a
          href="/signin"
          className="px-5 py-2 rounded-full text-white"
          style={{
            background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
          }}
        >
          Login Sekarang
        </a>
      </section>
    );
  }

  /* -------------------- UI utama -------------------- */
  return (
    <main
      className="w-full min-h-screen px-4 md:px-8 py-20"
      style={{ background: BASE_BG }}
    >
      {/* HEADER PROFILE */}
      <div
        className="
          flex items-center gap-4 mb-8
          rounded-[1.618rem]
          bg-white/80 backdrop-blur-md
          shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          border border-white/60
          p-4
        "
      >
        {/* Foto */}
        <img
          src={
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName || "U"
            )}`
          }
          alt={user.displayName}
          className="w-16 h-16 rounded-full border object-cover shrink-0"
        />

        {/* Nama + email */}
        <div className="flex-1">
          {editName ? (
            <div className="flex gap-2 items-center">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nama baru"
                className="
                  flex-1 text-sm px-3 py-[6px]
                  rounded-md border border-[#E5E5E5]
                  focus:outline-none focus:ring-2 focus:ring-[#FE724C]/60
                "
              />
              <button
                onClick={saveName}
                className="
                  px-3 py-1 text-xs font-medium text-white rounded-md
                "
                style={{
                  background:
                    "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
                }}
              >
                Simpan
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#363636]">
                {user.displayName || profile?.name}
              </h2>
              <button
                onClick={() => {
                  setEditName(true);
                  setNameInput(user.displayName || profile?.name || "");
                }}
                className="text-[#8A8A8A] hover:text-[#363636]"
              >
                <FiEdit2 />
              </button>
            </div>
          )}
          <p className="text-sm text-[#8A8A8A] truncate">{user.email}</p>
        </div>
      </div>

      {/* MENU LIST */}
      <section className="flex flex-col gap-4">
        <MenuItem icon={<FiClipboard />} title="Pesanan Saya" link="/orders" />
        <MenuItem icon={<FiTag />}       title="Kupon Saya"   link="/promo"  />
        <MenuItem icon={<FiSettings />}  title="Pengaturan"   link="/settings"/>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="
            flex items-center justify-between
            rounded-[1.618rem] p-4
            bg-red-50 hover:bg-red-100 border border-red-200
            text-red-600
          "
        >
          <div className="flex items-center gap-3">
            <FiLogOut />
            <span className="text-sm font-medium">Keluar</span>
          </div>
          <span className="text-xs">›</span>
        </motion.button>
      </section>
    </main>
  );
};

/* -------------------------------------------------- */
/*  Sub-komponen MenuItem                             */
/* -------------------------------------------------- */
const MenuItem = ({ icon, title, link }) => (
  <a
    href={link}
    className="
      flex items-center justify-between
      rounded-[1.618rem] p-4
      bg-white/80 backdrop-blur-md
      shadow-[0_2px_8px_rgba(0,0,0,0.04)]
      border border-white/60
      hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]
      transition
    "
  >
    <div className="flex items-center gap-3 text-[#555]">
      {icon}
      <span className="text-sm font-medium">{title}</span>
    </div>
    <span className="text-xs text-[#999]">›</span>
  </a>
);

export default ProfilePage;
