import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";

/* ---------- Palet ---------- */
const PRIMARY  = "#FE724C";
const BASE_BG  = "#FFFCF9";

function SignUp() {
  const auth = getAuth(app);
  const navigate      = useNavigate();
  const [, dispatch]  = useStateValue();

  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [conf,  setConf]  = useState("");

  /* ---------- Handler daftar ---------- */
  const handleSignup = async () => {
    if (!name || !email || !pass || !conf) {
      return alert("Semua field wajib diisi!");
    }
    if (pass !== conf) {
      return alert("Password tidak cocok.");
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });

      dispatch({ type: actionType.SET_USER, user: cred.user });
      localStorage.setItem("user", JSON.stringify(cred.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registrasi gagal: " + err.message);
    }
  };

  /* ---------- UI ---------- */
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: BASE_BG }}
    >
      <section
        className="
          w-full max-w-md space-y-8
          bg-white/80 backdrop-blur-md
          rounded-[1.618rem] p-8 md:p-10
          shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-white/60
        "
      >
        {/* Logo / heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#363636]">Buat Akun</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="space-y-5"
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
            placeholder="name@email.com"
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

          {/* Tombol daftar */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="
              w-full py-3 rounded-full text-white font-medium
              shadow-[0_4px_12px_rgba(254,114,76,0.35)]
              transition
            "
            style={{
              background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
            }}
          >
            Daftar Sekarang
          </motion.button>
        </form>

        {/* Link ke login */}
        <p className="text-center text-sm text-[#8A8A8A]">
          Sudah punya akun?{" "}
          <a href="/signin" className="font-semibold" style={{ color: PRIMARY }}>
            Masuk
          </a>
        </p>
      </section>
    </main>
  );
}

/* ---------- Sub-komponen Input ---------- */
const Input = ({ id, label, value, onChange, type, placeholder }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-semibold text-[#555]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full px-4 py-2 rounded-md text-sm
        bg-white/70 backdrop-blur border border-[#E5E5E5]
        focus:outline-none focus:ring-2 focus:ring-[#FE724C]/60
      "
    />
  </div>
);

export default SignUp;
