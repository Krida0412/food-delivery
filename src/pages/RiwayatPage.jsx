import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

/* ---------- Palet ---------- */
const PRIMARY = '#FE724C';
const BASE_BG = '#FFFCF9';

/* ---------- Badge Status ---------- */
const StatusBadge = ({ status }) => {
  const CLASSES = {
    Selesai: 'bg-green-100 text-green-600',
    Dibatalkan: 'bg-red-100 text-red-500',
    Diproses: 'bg-yellow-100 text-yellow-600',
    Pending: 'bg-gray-200 text-gray-600',
  };
  return (
    <span
      className={`px-3 py-[2px] text-xs font-semibold rounded-full whitespace-nowrap ${
        CLASSES[status] || CLASSES.Pending
      }`}
    >
      {status}
    </span>
  );
};

/* ---------- Kartu Riwayat ---------- */
const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const created = order.createdAt?.toDate
    ? order.createdAt.toDate()
    : new Date(order.createdAt);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="
        rounded-[1.618rem]
        bg-white/80 backdrop-blur-md
        shadow-[0_4px_16px_rgba(0,0,0,0.06)]
        border border-white/60
        p-4
        overflow-hidden
      "
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between gap-3"
        onClick={() => setOpen((p) => !p)}
      >
        <div className="text-left">
          <p className="text-sm font-semibold text-[#363636]">
            {order.itemName || 'Pesanan'}
          </p>
          <p className="text-[11px] text-[#8A8A8A]">
            {created.toLocaleString('id-ID', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>

        {/* Total & status */}
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold" style={{ color: PRIMARY }}>
            Rp {Number(order.total).toLocaleString('id-ID')}
          </p>
          <StatusBadge status={order.status || 'Pending'} />
          <FiChevronDown
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Detail collapsible */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 border-t border-[#EAEAEA] pt-3 text-xs text-[#555] space-y-1"
          >
            {order.items?.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {it.title} × {it.qty}
                </span>
                <span>Rp {(it.qty * it.price).toLocaleString('id-ID')}</span>
              </div>
            ))}

            {order.alamat && (
              <p className="pt-2 italic text-[#888]">📍 {order.alamat}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------- Halaman Riwayat ---------- */
const RiwayatPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Realtime listener Firestore + Auth */
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubAuth = auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, 'orders'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc'),
      );

      const unsub = onSnapshot(q, (snap) => {
        const result = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(result);
        setLoading(false);
      });

      return () => unsub();
    });

    return () => unsubAuth();
  }, []);

  /* ---------- UI ---------- */
  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: BASE_BG }}
      >
        <p className="text-[#555]">Memuat riwayat…</p>
      </div>
    );
  }

  return (
    <main
      className="w-full min-h-screen px-4 md:px-8 py-20"
      style={{ background: BASE_BG }}
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-[#363636] text-center">
          Riwayat Pesanan
        </h2>
      </header>

      {orders.length === 0 ? (
        <p className="text-center text-[#8A8A8A]">Belum ada riwayat pesanan.</p>
      ) : (
        <motion.div layout className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
};

export default RiwayatPage;
