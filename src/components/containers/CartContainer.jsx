import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import EmptyCart from "../../img/emptyCart.svg";
import CartItem from "../ui/CartItem";

const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";

/* ---------- Helper Format Rupiah ---------- */
const formatRupiah = (angka) => {
  return "Rp " + parseInt(angka || 0, 10).toLocaleString("id-ID");
};

function CartContainer() {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0);
  const shipping = 2500;
  const grandTotal = subtotal + shipping;

  const toggleCart = () =>
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });

  const clearCart = () => {
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: [] });
    localStorage.setItem("cartItems", "[]");
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="
        fixed top-0 right-0 z-50 h-screen w-full max-w-[375px] flex flex-col
        border-l border-white/40 backdrop-blur-lg
        shadow-[0_0_24px_rgba(0,0,0,0.08)]
      "
      style={{
        background: "rgba(255,252,249,0.95)",
        borderTopLeftRadius: "1.618rem",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <motion.button whileTap={{ scale: 0.85 }} onClick={toggleCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-[#363636]" />
        </motion.button>
        <h2 className="text-lg font-semibold text-[#363636]">Keranjang</h2>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={clearCart}
          className="flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full shadow-inner"
          style={{ backgroundColor: `${SECONDARY}44`, color: PRIMARY }}
        >
          Kosongkan <RiRefreshFill className="text-base" />
        </motion.button>
      </header>

      {/* Content */}
      {cartItems.length ? (
        <>
          {/* List scrollable */}
          <section className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-3 scrollbar-none">
            {cartItems.map((it) => (
              <CartItem key={it.id} item={it} />
            ))}
          </section>

          {/* Sticky footer */}
          <footer
            className="
              sticky bottom-0 z-10 px-6 pt-6 pb-8 bg-white/90 backdrop-blur-md
              border-t border-white/50 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]
              flex flex-col gap-4
            "
            style={{ borderTopLeftRadius: "1.618rem" }}
          >
            <Row label="Sub Total" value={subtotal} />
            <Row label="Ongkir" value={shipping} />
            <hr className="border-t border-[#EAEAEA]" />
            <Row label="Total" value={grandTotal} bold />

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                user ? (toggleCart(), navigate("/checkout")) : toggleCart()
              }
              disabled={!cartItems.length}
              className="w-full py-[0.9rem] rounded-full text-white font-medium shadow-[0_4px_12px_rgba(254,114,76,0.35)] disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg,#FE724C 0%,#FF9866 100%)",
              }}
            >
              {user ? "Check Out" : "Masuk Terlebih Dahulu"}
            </motion.button>
          </footer>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <img src={EmptyCart} alt="Empty cart" className="w-60" />
          <p className="text-lg font-semibold text-[#8A8A8A]">
            Tambahkan beberapa item ke keranjangmu
          </p>
        </div>
      )}
    </motion.aside>
  );
}

const Row = ({ label, value, bold }) => (
  <div className="flex justify-between text-sm">
    <span className={bold ? "font-semibold text-lg" : "text-[#8A8A8A]"}>
      {label}
    </span>
    <span
      className={bold ? "font-semibold text-lg" : "text-[#8A8A8A]"}
      style={bold ? { color: PRIMARY } : {}}
    >
      {formatRupiah(value)}
    </span>
  </div>
);

export default CartContainer;
