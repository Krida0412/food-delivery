import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const PRIMARY    = "#FE724C";
const ACCENT_BG  = "rgba(255,211,110,0.15)";

function CartItem({ item }) {
  const [{ cartItems }, dispatch] = useStateValue();

  const setCart = (arr) => {
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: arr });
    localStorage.setItem("cartItems", JSON.stringify(arr));
  };

  const updateQty = (type) => {
    let updated = [];

    if (type === "add") {
      updated = cartItems.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      // remove
      if (item.qty === 1) {
        updated = cartItems.filter((i) => i.id !== item.id);
      } else {
        updated = cartItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty - 1 } : i
        );
      }
    }
    setCart(updated);
  };

  return (
    <div
      className="
        w-full px-3 py-2 flex items-center gap-3
        rounded-[1.618rem] bg-white/80 backdrop-blur-md
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
      "
    >
      <div
        className="w-16 h-16 rounded-full overflow-hidden shrink-0"
        style={{ background: ACCENT_BG }}
      >
        <img src={item.imageURL} alt={item.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-[#363636]">{item.title}</p>
        <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
          Rp {(item.qty * item.price).toLocaleString("id-ID")}
        </p>
      </div>

      {/* qty control */}
      <div className="flex items-center gap-2 ml-auto">
        <IconBtn icon={<BiMinus />} onClick={() => updateQty("remove")} />
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium"
          style={{ background: ACCENT_BG, color: PRIMARY }}
        >
          {item.qty}
        </span>
        <IconBtn icon={<BiPlus />} onClick={() => updateQty("add")} />
      </div>
    </div>
  );
}

const IconBtn = ({ icon, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
    className="w-6 h-6 flex items-center justify-center rounded-full text-white"
    style={{
      backgroundColor: PRIMARY,
      boxShadow: "0 1px 4px rgba(254,114,76,0.35)",
    }}
  >
    {icon}
  </motion.button>
);

export default CartItem;
