/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../firebase.config";

/* ---------- konstanta & util ---------- */
const db         = getFirestore(app);
const PRIMARY    = "#FE724C";
const BASE_BG    = "#FFFCF9";
const ACCENT_BG  = "rgba(255,211,110,0.15)";
const BACKEND    = (process.env.REACT_APP_BACKEND_URL || window.location.origin).replace(/\/$/, "");
const CLIENT_KEY = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

/* ---------- inject snap.js sekali saja ---------- */
function useMidtrans(clientKey) {
  useEffect(() => {
    if (!clientKey) return;
    const s = document.createElement("script");
    s.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    s.setAttribute("data-client-key", clientKey);
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, [clientKey]);
}

/* ---------- Item keranjang read-only ---------- */
const CheckoutItem = ({ item }) => (
  <div className="w-full px-3 py-2 flex items-center gap-3 rounded-[1.618rem] bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ background: ACCENT_BG }}>
      <img src={item.imageURL} alt={item.title} className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col gap-[0.2rem]">
      <p className="text-sm font-medium text-[#363636]">{item.title}</p>
      <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
        Rp {(item.qty * item.price).toLocaleString("id-ID")}
      </p>
    </div>
    <span className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium" style={{ background: ACCENT_BG, color: PRIMARY }}>
      {item.qty}
    </span>
  </div>
);

/* ---------- Halaman Checkout ---------- */
export default function CheckoutContainer() {
  useMidtrans(CLIENT_KEY);

  const navigate                     = useNavigate();
  const [{ cartItems, user }]        = useStateValue();
  const [alamat, setAlamat]          = useState("");
  const [coords, setCoords]          = useState(null);
  const [locLoading, setLocLoading]  = useState(true);
  const [paying, setPaying]          = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setCoords([latitude, longitude]);
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const json = await resp.json();
          if (json.display_name) setAlamat(json.display_name);
        } catch {
          setAlamat(`${latitude}, ${longitude}`);
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        toast.error("Izin lokasi ditolak. Alamat tidak bisa dideteksi otomatis.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const subtotal   = cartItems.reduce((s, it) => s + it.qty * it.price, 0);
  const shipping   = 2500;
  const grandTotal = subtotal + shipping;

  const handleBayar = async () => {
    if (!user) return toast.error("Kamu harus login terlebih dahulu!");
    if (!alamat.trim()) return toast.error("Alamat pengiriman belum diisi!");
    setPaying(true);

    try {
      const res = await fetch(`${BACKEND}/api/transaction`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({
          orderId     : `ORDER-${Date.now()}`,
          grossAmount : grandTotal,
          customerName: user.displayName || "Pelanggan",
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`(${res.status}) ${errText || "Gagal membuat transaksi"}`);
      }

      const raw  = await res.text();
      const json = raw ? JSON.parse(raw) : {};
      if (!json.token) throw new Error(json.message || "Token kosong dari backend");

      // eslint-disable-next-line no-undef
      window.snap.pay(json.token, {
        onSuccess: async (snapResult) => {
          await addDoc(collection(db, "orders"), {
            uid      : user.uid,
            alamat,
            items    : cartItems,
            total    : grandTotal,
            snapResult,
            status   : "Pending",
            createdAt: serverTimestamp(),
          });
          toast.success("Pembayaran berhasil!");
          navigate("/thankyou");
        },
        onPending: () => toast("Transaksi pending, selesaikan nanti 🙏"),
        onError  : () => toast.error("Pembayaran gagal!"),
        onClose  : () => toast("Kamu menutup popup pembayaran."),
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal membuat transaksi");
    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="w-full min-h-screen md:px-10 pt-10 pb-28 flex flex-col gap-6" style={{ background: BASE_BG }}>
      <Toaster />
      <h2 className="text-2xl font-bold text-[#363636]">Checkout</h2>

      <section className="w-full space-y-8 p-6 md:p-8 rounded-[1.618rem] bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-white/40">
        {/* daftar produk */}
        <div>
          <h3 className="text-lg font-semibold text-[#363636] mb-4">Produk dalam Keranjang</h3>
          {cartItems.length ? (
            <div className="space-y-4">
              {cartItems.map((it) => <CheckoutItem key={it.id} item={it} />)}
            </div>
          ) : (
            <p className="text-[#8A8A8A]">Keranjang kosong.</p>
          )}
        </div>

        {/* alamat */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#363636]">Alamat Pengiriman</h3>
          <textarea
            rows="3"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder={locLoading ? "Mengambil lokasi…" : "Tulis alamat lengkap"}
            className="w-full p-3 resize-none rounded-md bg-white/70 backdrop-blur border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FE724C]/60"
          />
          {coords && (
            <div className="h-44 w-full rounded-lg overflow-hidden border border-[#EAEAEA]">
              <MapContainer center={coords} zoom={16} scrollWheelZoom={false} className="h-full w-full z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={coords}>
                  <Popup>Lokasi kamu</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>

        {/* ringkasan */}
        <div className="space-y-3 text-[#555]">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Ongkir</span>
            <span>Rp {shipping.toLocaleString("id-ID")}</span>
          </div>
          <hr className="border-t border-[#EAEAEA]" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span style={{ color: PRIMARY }}>Rp {grandTotal.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* tombol bayar */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          disabled={!cartItems.length || paying}
          onClick={handleBayar}
          className="w-full py-[0.9rem] rounded-full text-white text-base font-medium shadow-[0_4px_12px_rgba(254,114,76,0.35)] transition disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#FE724C,#FF9866)" }}
        >
          {paying ? "Memproses…" : "Bayar Sekarang"}
        </motion.button>
      </section>
    </main>
  );
}
