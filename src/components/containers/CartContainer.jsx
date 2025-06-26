import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import EmptyCart from "../../img/emptyCart.svg";
import CartItem from "../ui/CartItem";

/* ---------- Palet ---------- */
const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";
const BASE_BG   = "#FFFCF9";

function CartContainer() {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const navigate  = useNavigate();

  /* subtotal selalu dihitung setiap render */
  const subtotal   = cartItems.reduce((a, i) => a + i.qty * i.price, 0);
  const shipping   = 2500;
  const grandTotal = subtotal + shipping;

  /* toggle cart drawer */
  const showCart = () =>
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });

  /* kosongkan keranjang */
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
        fixed top-0 right-0 z-50
        h-screen w-full max-w-[375px] flex flex-col
        border-l border-white/40 backdrop-blur-lg
        shadow-[0_0_24px_rgba(0,0,0,0.08)]
      "
      style={{
        background: "rgba(255,252,249,0.95)",
        borderTopLeftRadius: "1.618rem",
      }}
    >
      {/* ---------- Header ---------- */}
      <header className="flex items-center justify-between px-5 py-4">
        <motion.button whileTap={{ scale: 0.85 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-[#363636]" />
        </motion.button>

        <h2 className="text-lg font-semibold text-[#363636]">Keranjang</h2>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={clearCart}
          className="flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full shadow-inner transition"
          style={{ backgroundColor: `${SECONDARY}44`, color: PRIMARY }}
        >
          Kosongkan <RiRefreshFill className="text-base" />
        </motion.button>
      </header>

      {/* ---------- Konten ---------- */}
      {cartItems.length ? (
        <div className="flex flex-col flex-1">
          {/* Daftar item */}
          <section className="flex-1 px-5 py-6 overflow-y-auto space-y-3 scrollbar-none">
            {cartItems.map((it) => (
              <CartItem key={it.id} item={it} />
            ))}
          </section>

          {/* ---------- Footer Total ---------- */}
          <footer
            className="
              mt-auto px-6 pt-8 pb-14 flex flex-col gap-4
              bg-white/90 backdrop-blur-md border-t border-white/50
              shadow-[0_-4px_16px_rgba(0,0,0,0.04)]
            "
            style={{ borderTopLeftRadius: "1.618rem" }}
          >
            <div className="flex justify-between text-sm text-[#8A8A8A]">
              <span>Sub Total</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between text-sm text-[#8A8A8A]">
              <span>Ongkir</span>
              <span>Rp {shipping.toLocaleString("id-ID")}</span>
            </div>

            <hr className="border-t border-[#EAEAEA]" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span style={{ color: PRIMARY }}>
                Rp {grandTotal.toLocaleString("id-ID")}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                user ? (showCart(), navigate("/checkout")) : showCart()
              }
              className="
                w-full py-[0.9rem] rounded-full text-white text-base font-medium
                shadow-[0_4px_12px_rgba(254,114,76,0.35)]
                transition disabled:opacity-50
              "
              style={{
                background: "linear-gradient(135deg,#FE724C,#FF9866)",
              }}
              disabled={!cartItems.length}
            >
              {user ? "Check Out" : "Masuk Terlebih Dahulu"}
            </motion.button>
          </footer>
        </div>
      ) : (
        /* ---------- Kosong ---------- */
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

export default CartContainer;
