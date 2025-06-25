import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const SignUp = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !name) {
      alert('Semua field wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password tidak cocok.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      dispatch({
        type: actionType.SET_USER,
        user: user,
      });

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      alert('Registrasi gagal: ' + err.message);
      console.error('Sign up error:', err);
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-5 justify-center">
            <svg
              fill="none"
              viewBox="0 0 397 94"
              width={85}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="black" d="M128.72 39.94..." />
              {/* Potong SVG untuk ringkas */}
            </svg>
          </div>

          {/* Form Input */}
          <div className="mt-5">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="name"
            >
              Nama Lengkap
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
            />

            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="confirmPassword"
            >
              Ulangi Kata Sandi
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password"
            />
          </div>

          {/* Tombol Daftar */}
          <div className="mt-5">
            <button
              onClick={handleSignup}
              type="button"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 font-semibold shadow-md rounded-lg"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Navigasi ke login */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <a
              href="/signin"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              sudah punya akun?
            </a>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
