import React from "react";
import { BsTicketPerforated, BsClipboardCheck } from "react-icons/bs";
import { motion } from "framer-motion";

/* Palet */
const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";
const ACCENT_BG = "rgba(243,246,255,0.55)";

function PromoCard({ promo, onUse }) {
  const isUsed   = promo.status === "terpakai";
  const progress = promo.claimed / promo.quota; // 0 – 1

  /* Salin kode kupon */
  const copyCode = () => {
    navigator.clipboard.writeText(promo.code);
    alert("Kode disalin!");
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
        relative flex overflow-visible
        rounded-[1.618rem]
        bg-white/90 backdrop-blur-md
        shadow-[0_4px_16px_rgba(0,0,0,0.06)]
        border border-white/60
      "
    >
      {/* Dekorasi tepi perforasi */}
      <div
        className="
          absolute top-0 bottom-0 -left-3 w-6
          bg-[radial-gradient(circle,_transparent_60%,_white_60%)]
          bg-[length:12px_12px]
        "
      />

      {/* Gambar */}
      <div className="w-28 h-28 shrink-0">
        <img
          src={promo.image}
          alt={promo.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col justify-between p-4">
        {/* Judul + deskripsi + badge */}
        <div className="space-y-[0.18rem]">
          <h3 className="text-sm font-semibold text-[#363636]">
            {promo.title}
          </h3>
          <p className="text-xs font-medium" style={{ color: PRIMARY }}>
            {promo.desc}
          </p>

          {/* Badge KEDALUWARSA (inline, tidak absolute) */}
          {promo.expired && (
            <span
              className="
                inline-flex items-center uppercase font-semibold
                text-[10px] px-2 py-[2px] rounded-md
                text-white bg-[#C93636]
                mt-[0.18rem]  /* jarak mini dengan teks di atas */
                whitespace-nowrap
              "
            >
              Kedaluwarsa
            </span>
          )}
        </div>

        {/* Area aksi & info */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <span className="flex items-center gap-1 text-[#8A8A8A] text-xs">
            <BsTicketPerforated /> Kupon
          </span>

          <div className="flex items-center gap-2">
            {/* Tombol salin kode */}
            <button
              onClick={copyCode}
              className="
                p-1 rounded-full text-[#8A8A8A] hover:text-[#363636]
                transition
              "
            >
              <BsClipboardCheck />
            </button>

            {/* Tombol Gunakan / Terpakai */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              disabled={isUsed}
              onClick={() => onUse(promo.id)}
              className={`
                px-4 py-[0.35rem] text-xs font-medium rounded-full
                transition whitespace-nowrap
                ${
                  isUsed
                    ? "bg-[#E5E5E5] text-[#8A8A8A] cursor-default"
                    : "text-white"
                }
              `}
              style={{
                backgroundColor: isUsed ? "#E5E5E5" : PRIMARY,
                boxShadow: isUsed
                  ? "none"
                  : "0 2px 8px rgba(254,114,76,0.35)",
              }}
            >
              {isUsed ? "Terpakai" : "Gunakan"}
            </motion.button>
          </div>
        </div>

        {/* Progress bar kuota */}
        <div className="mt-2 w-full h-[6px] rounded-full bg-[#EAEAEA]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress * 100}%`,
              background:
                "linear-gradient(90deg,#FE724C 0%,#FF9866 100%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default PromoCard;
