import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

/* ---------- Palet ---------- */
const PRIMARY = "#FE724C";
const BASE_BG = "#FFFCF9";

export default function SignUp() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !pass || !conf) {
      return alert("Semua field wajib diisi!");
    }
    if (pass !== conf) {
      return alert("Password tidak cocok.");
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });

      dispatch({ type: actionType.SET_USER, user: cred.user });
      localStorage.setItem("user", JSON.stringify(cred.user));
      navigate("/main");
    } catch (err) {
      console.error(err);
      alert("Registrasi gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-8 overflow-hidden"
      style={{ background: BASE_BG }}
    >
      {/* Logo / Branding */}
      <motion.img
        src="/logo-food.png"
        alt="Logo"
        className="w-24 h-24 mb-6 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Form Card */}
      <motion.section
        className="
          w-full max-w-[420px] bg-white/90 backdrop-blur-md
          rounded-2xl px-6 py-8 flex flex-col gap-6
          shadow-lg border border-white/60
        "
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-center text-2xl font-bold text-[#363636]">
          Buat Akun Baru
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            id="name"
            label="Nama Lengkap"
            value={name}
            onChange={setName}
            type="text"
            placeholder="Nama lengkap"
          />
          <Input
            id="email"
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="nama@email.com"
          />
          <Input
            id="password"
            label="Kata Sandi"
            value={pass}
            onChange={setPass}
            type="password"
            placeholder="Minimal 6 karakter"
          />
          <Input
            id="confirm"
            label="Ulangi Kata Sandi"
            value={conf}
            onChange={setConf}
            type="password"
            placeholder="Konfirmasi password"
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-full text-white font-medium
              disabled:opacity-60 shadow-lg transition
            "
            style={{
              background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
            }}
          >
            {loading ? "Memproses…" : "Daftar Sekarang"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-[#8A8A8A]">
          Sudah punya akun?{" "}
          <span
            role="button"
            className="font-semibold"
            style={{ color: PRIMARY }}
            onClick={() => navigate("/signin")}
          >
            Masuk
          </span>
        </p>
      </motion.section>
    </main>
  );
}

/* ---------- Input ---------- */
const Input = ({ id, label, value, onChange, type, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-[#555]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full px-4 py-3 rounded-xl text-sm
        bg-white border border-[#E5E5E5] shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#FE724C]/50
      "
    />
  </div>
);
