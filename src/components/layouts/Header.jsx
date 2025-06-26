import React, { useState } from 'react';
import Logo from '../../img/logo.png';
import Avatar from '../../img/avatar.png';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../firebase.config';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({ type: actionType.SET_USER, user: null });
    navigate('/signin');
  };

  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Logo}
            className="w-8 object-cover"
            alt="logo"
          />
          <motion.p
            whileTap={{ scale: 0.6 }}
            className="text-headingColor text-xl font-bold"
          >
            Chick
          </motion.p>
        </Link>

        <div className="flex items-center gap-6">
          {/* Cart */}
          <motion.div
            onClick={showCart}
            whileTap={{ scale: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems?.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>

          {/* Avatar */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 h-10 rounded-full cursor-pointer drop-shadow-xl"
              alt="user-avatar"
              onClick={() => setIsMenu((prev) => !prev)}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {(user?.email === 'kridamukti25@gmail.com' ||
                  user?.email === 'pinkybeear@gmail.com') && (
                  <Link to={'/createItem'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-red-300 rounded-md transition text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        {/* Cart */}
        <motion.div
          onClick={showCart}
          whileTap={{ scale: 0.6 }}
          className="relative flex items-center justify-center"
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems?.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>

        {/* Logo */}
        <Link to={'/'} className="flex items-center">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Logo}
            className="w-8 object-cover"
            alt="logo"
          />
          <motion.p
            whileTap={{ scale: 0.6 }}
            className="text-headingColor text-xl font-bold"
          >
            Chick
          </motion.p>
        </Link>

        {/* Avatar */}
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 h-10 rounded-full cursor-pointer drop-shadow-xl"
            alt="user-avatar"
            onClick={() => setIsMenu((prev) => !prev)}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user?.email === 'kridamukti25@gmail.com' && (
                <Link to={'/createItem'}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <p
                className="rounded-md hover:bg-red-300 px-4 py-2 flex items-center justify-center gap-3 cursor-pointer transition text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
