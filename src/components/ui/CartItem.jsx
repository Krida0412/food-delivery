import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

/* ---------- Warna tema ---------- */
const PRIMARY    = "#FE724C";                 // oranye
const ACCENT_BG  = "rgba(255,211,110,0.15)";  // kuning lembut

function CartItem({ item }) {
  const [{ cartItems }, dispatch] = useStateValue();

  const updateQty = (type) => {
    let updated = [];

    if (type === "add") {
      updated = cartItems.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else if (type === "remove") {
      if (item.qty === 1) {
        updated = cartItems.filter((i) => i.id !== item.id);
      } else {
        updated = cartItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty - 1 } : i
        );
      }
    }

    dispatch({ type: actionType.SET_CARTITEMS, cartItems: updated });
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  /* ---------- UI ---------- */
  return (
    <div
      className="
        w-full px-3 py-2
        flex items-center gap-3
        rounded-[1.618rem]
        bg-white/80 backdrop-blur-md
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
      "
    >
      {/* Gambar */}  
      <div
        className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
        style={{ background: ACCENT_BG }}
      >
        <img
          src={item.imageURL}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nama & harga */}
      <div className="flex flex-col gap-[0.2rem]">
        <p className="text-sm font-medium text-[#363636]">{item.title}</p>
        <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
          Rp {(item.qty * item.price).toLocaleString("id-ID")}
        </p>
      </div>

      {/* Kontrol qty */}
      <div className="flex items-center gap-2 ml-auto">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => updateQty("remove")}
          className="
            w-6 h-6 flex items-center justify-center
            rounded-full text-white
            shadow-[0_1px_4px_rgba(254,114,76,0.35)]
          "
          style={{ backgroundColor: PRIMARY }}
        >
          <BiMinus className="text-xs" />
        </motion.button>

        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium"
          style={{ background: ACCENT_BG, color: PRIMARY }}
        >
          {item.qty}
        </span>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => updateQty("add")}
          className="
            w-6 h-6 flex items-center justify-center
            rounded-full text-white
            shadow-[0_1px_4px_rgba(254,114,76,0.35)]
          "
          style={{ backgroundColor: PRIMARY }}
        >
          <BiPlus className="text-xs" />
        </motion.button>
      </div>
    </div>
  );
}

export default CartItem;
