import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

/* ---------- Palet ---------- */
const PRIMARY = "#FE724C";
const BASE_BG = "#FFFCF9";

export default function SignIn() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (type) => {
    setLoading(true);
    try {
      const cred =
        type === "google"
          ? await signInWithPopup(auth, provider)
          : await signInWithEmailAndPassword(auth, email, password);

      const { user } = cred;
      dispatch({ type: actionType.SET_USER, user });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/main");
    } catch (err) {
      console.error(err);
      alert(
        type === "google" ? "Login Google gagal." : "Email atau password salah."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-8 overflow-hidden"
      style={{ background: BASE_BG }}
    >
      {/* Logo / Brand */}
      <motion.img
        src="/logo-food.png"
        alt="Logo"
        className="w-24 h-24 mb-6 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Form */}
      <motion.form
        className="
          w-full max-w-[420px] flex flex-col gap-6
          bg-white/90 backdrop-blur-md rounded-2xl
          px-6 py-8 shadow-lg border border-white/60
        "
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-center text-2xl font-bold text-[#363636]">
          Selamat Datang
        </h1>

        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="nama@email.com"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPass}
          placeholder="Kata sandi"
        />

        <button
          type="button"
          className="self-end text-xs font-semibold text-[#8A8A8A] hover:text-[#555]"
          onClick={() => alert("Fitur coming soon 😉")}
        >
          Lupa password?
        </button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={() => handleLogin("email")}
          className="
            w-full py-3 rounded-full text-white font-medium
            disabled:opacity-60 shadow-lg transition
          "
          style={{
            background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
          }}
        >
          {loading ? "Memproses…" : "Masuk"}
        </motion.button>

        <Divider />

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={() => handleLogin("google")}
          className="
            w-full py-3 rounded-full flex items-center justify-center gap-3
            font-medium text-[#555] bg-white shadow
            border border-[#E5E5E5] active:shadow-md transition
            disabled:opacity-60
          "
        >
          <GoogleLogo />
          <span className="text-sm">Masuk dengan Google</span>
        </motion.button>

        <p className="text-center text-sm text-[#8A8A8A]">
          Belum punya akun?{" "}
          <span
            role="button"
            className="font-semibold"
            style={{ color: PRIMARY }}
            onClick={() => navigate("/signup")}
          >
            Daftar
          </span>
        </p>
      </motion.form>
    </main>
  );
}

/* ---------- Input ---------- */
const Input = ({ id, label, type, value, onChange, placeholder }) => (
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

/* ---------- Divider ---------- */
const Divider = () => (
  <div className="flex items-center gap-3">
    <span className="flex-1 h-px bg-[#E0E0E0]" />
    <span className="text-xs text-[#8A8A8A]">atau</span>
    <span className="flex-1 h-px bg-[#E0E0E0]" />
  </div>
);

/* ---------- Google Logo ---------- */
const GoogleLogo = () => (
  <svg viewBox="0 0 533.5 544.3" width="20" height="20">
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
);
