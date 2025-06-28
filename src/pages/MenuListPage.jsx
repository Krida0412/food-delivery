// src/pages/MenuListPage.jsx
import React, { useEffect, useState } from "react";
import { getAllFoodItems, deleteItem } from "../utils/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { categories } from "../utils/data";

/* ---------- Palet & konstanta ---------- */
const PRIMARY   = "#FE724C";
const SECONDARY = "#FFD36E";
const BASE_BG   = "#FFFCF9";
const ACCENT_BG = "rgba(255,211,110,0.15)";

export default function MenuListPage() {
  const [items, setItems]   = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate            = useNavigate();

  /* Fetch sekali saat mount */
  useEffect(() => {
    getAllFoodItems().then(setItems);
  }, []);

  /* ---------- Handler ---------- */
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau hapus item ini?")) {
      await deleteItem(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  const filtered = filter === "all"
    ? items
    : items.filter((it) => it.category === filter);

  /* ---------- UI ---------- */
  return (
    <main
      className="min-h-screen px-4 md:px-8 py-10 space-y-8"
      style={{ background: BASE_BG }}
    >
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Daftar Menu</h1>
          <p className="text-[#8A8A8A] text-sm">
            Kelola item makanan &amp; minuman yang tersedia
          </p>
        </div>

        {/* Tombol tambah */}
        <button
          onClick={() => navigate("/admin/create")}
          className="
            flex items-center gap-2 rounded-full text-sm font-medium
            px-4 py-2 text-white shadow
            hover:brightness-110 transition
          "
          style={{ background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})` }}
        >
          <MdAdd size={18} /> Tambah Menu
        </button>
      </header>

      {/* Filter kategori */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
        {/* ‘Semua’ pill */}
        <CategoryPill
          active={filter === "all"}
          label="Semua"
          onClick={() => setFilter("all")}
        />

        {categories.map((cat) => (
          <CategoryPill
            key={cat.id}
            active={filter === cat.urlParamName}
            label={cat.name}
            onClick={() => setFilter(cat.urlParamName)}
          />
        ))}
      </div>

      {/* List menu */}
      {filtered.length === 0 ? (
        <p className="text-center text-[#8A8A8A]">Belum ada menu.</p>
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {filtered.map((it) => (
            <article
              key={it.id}
              className="
                group flex flex-col p-4 rounded-[1.618rem] bg-white/85 backdrop-blur
                border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                hover:shadow-[0_6px_20px_rgba(254,114,76,0.25)]
                transition
              "
            >
              {/* Gambar */}
              <div
                className="w-full h-40 rounded-xl overflow-hidden mb-3"
                style={{ background: ACCENT_BG }}
              >
                <img
                  src={it.imageURL}
                  alt={it.title}
                  className="w-full h-full object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-1">
                <h2 className="text-base font-semibold text-[#363636] line-clamp-1">
                  {it.title}
                </h2>
                <p className="text-xs text-[#777] capitalize">
                  {it.category.replace(/_/g, " ")}
                </p>
                <p className="text-xs text-[#777]">Kalori • {it.calories}</p>
                <p
                  className="text-sm font-bold"
                  style={{ color: PRIMARY }}
                >
                  Rp {Number(it.price).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Aksi */}
              <div className="flex justify-end gap-3 mt-4">
                <IconBtn
                  icon={<MdEdit size={18} />}
                  tooltip="Edit"
                  color="#2563eb"
                  onClick={() => navigate(`/admin/editItem/${it.id}`)}
                />
                <IconBtn
                  icon={<MdDelete size={18} />}
                  tooltip="Hapus"
                  color="#dc2626"
                  onClick={() => handleDelete(it.id)}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

/* ---------- Komponen kecil ---------- */
const CategoryPill = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
      border transition flex-shrink-0
      ${active
        ? "text-white border-transparent"
        : "text-[#555] border-[#E5E5E5] bg-white"}
    `}
    style={
      active
        ? { background: `linear-gradient(135deg,${PRIMARY},${SECONDARY})`, boxShadow: "0 3px 10px rgba(254,114,76,.35)" }
        : {}
    }
  >
    {label}
  </button>
);

const IconBtn = ({ icon, color, tooltip, onClick }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow hover:brightness-110 transition"
    style={{ color }}
  >
    {icon}
  </button>
);
