import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ---------- Palet ---------- */
const PRIMARY  = "#FE724C";
const BASE_BG  = "#FFFCF9";
const GOOGLE_BG = "#FFFFFF";

function SignIn() {
  const auth          = getAuth(app);
  const provider      = new GoogleAuthProvider();
  const navigate      = useNavigate();
  const [, dispatch]  = useStateValue();

  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");

  /* ---------- Login ---------- */
  const loginGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      dispatch({ type: actionType.SET_USER, user });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/main");
    } catch (err) {
      console.error(err);
      alert("Login Google gagal.");
    }
  };

  const loginEmail = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: actionType.SET_USER, user });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/main");
    } catch {
      alert("Email atau password salah.");
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
        <h1 className="text-center text-2xl font-bold text-[#363636]">
          Masuk
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@email.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPass}
            placeholder="Kata sandi"
          />

          <div className="text-right">
            <a
              href="#"
              className="text-xs font-semibold text-[#8A8A8A] hover:text-[#555]"
            >
              Lupa password?
            </a>
          </div>

          {/* Login email */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={loginEmail}
            className="
              w-full py-3 rounded-full text-white font-medium
              shadow-[0_4px_12px_rgba(254,114,76,0.35)]
              transition
            "
            style={{
              background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
            }}
          >
            Masuk
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="flex-1 h-px bg-[#E0E0E0]" />
            <span className="text-xs text-[#8A8A8A]">atau</span>
            <span className="flex-1 h-px bg-[#E0E0E0]" />
          </div>

          {/* Google */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={loginGoogle}
            className="
              w-full py-3 rounded-full flex items-center justify-center gap-3
              font-medium text-[#555]
              shadow-[0_2px_8px_rgba(0,0,0,0.06)]
              border border-[#E5E5E5] bg-white/95
              backdrop-blur
              transition
              active:shadow-[0_1px_4px_rgba(0,0,0,0.12)]
            "
          >
            <svg
              viewBox="0 0 533.5 544.3"
              width="22"
              height="22"
              className="flex-shrink-0"
            >
              <path
                d="M533.5 278.4c0-17.8-1.6-35-4.6-51.7H272v97.9h146.9c-6.3 35.1-25.3 64.9-54 85l87.3 67.9c50.9-47 81.3-116.2 81.3-199.1z"
                fill="#4285f4"
              />
              <path
                d="M272 544.3c73.5 0 135.1-24.4 180.1-66.3l-87.3-67.9c-24.2 16.2-55.2 25.7-92.8 25.7-71.3 0-131.8-48-153.6-112.6l-90 69.9c43.5 86 133.5 151.2 243.6 151.2z"
                fill="#34a853"
              />
              <path
                d="M118.4 323.2c-10.4-30.8-10.4-63.9 0-94.7l-90-69.9c-39.2 77.9-39.2 167.5 0 245.4l90-69.9z"
                fill="#fbbc04"
              />
              <path
                d="M272 107.7c39.8-.6 78.2 14.1 107.1 40.7l80.1-80.1C397.2 25.5 335.5 0 272 0 161.9 0 71.9 65.1 28.4 151.1l90 69.9C140.2 156.5 200.7 108.5 272 107.7z"
                fill="#ea4335"
              />
            </svg>
            <span className="text-sm">Masuk dengan Google</span>
          </motion.button>
        </div>

        {/* Link sign-up */}
        <p className="text-center text-sm text-[#8A8A8A]">
          Belum punya akun?{" "}
          <a href="/signup" className="font-semibold" style={{ color: PRIMARY }}>
            Daftar
          </a>
        </p>
      </section>
    </main>
  );
}

/* ---------- Sub-komponen Input ---------- */
const Input = ({ id, label, type, value, onChange, placeholder }) => (
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

export default SignIn;
