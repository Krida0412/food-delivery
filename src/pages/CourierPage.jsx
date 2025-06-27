/* CourierPage v2 – kurir internal */
import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  ClipboardCheck,
  Clock4,
  MapPin,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { FiCopy } from 'react-icons/fi';

/* ---------- palet ---------- */
const PRIMARY = '#FE724C';
const BASE_BG = '#FFFCF9';

/* ---------- meta status ---------- */
const INFO = {
  SiapKirim: { text: 'Siap Kirim', cls: 'bg-sky-100 text-sky-600' },
  Diantar  : { text: 'Diantar',    cls: 'bg-yellow-100 text-yellow-700' },
  Selesai  : { text: 'Selesai',    cls: 'bg-green-100 text-green-600' },
  Gagal    : { text: 'Gagal',      cls: 'bg-red-100 text-red-500' },
};

const StatusBadge = ({ s }) => (
  <span className={`px-2 py-[2px] rounded-full text-[10px] font-semibold ${INFO[s]?.cls}`}>
    {INFO[s]?.text ?? s}
  </span>
);

/* ---------- kartu ---------- */
const Card = ({ o, take, finish, fail }) => {
  const [open, setOpen] = useState(false);

  const copyAddr = () => {
    navigator.clipboard.writeText(o.alamat || '');
  };
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    o.alamat || '',
  )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="
        rounded-[1.618rem] p-4 bg-white/80 backdrop-blur-md
        border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)]
        flex flex-col gap-2
      "
    >
      {/* head */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex justify-between text-left gap-3"
      >
        <div className="space-y-[2px]">
          <p className="text-sm font-semibold text-[#363636]">{o.itemName || 'Pesanan'}</p>
          <p className="text-[11px] text-[#888]">
            {o.createdAt?.toDate
              ? o.createdAt.toDate().toLocaleString('id-ID')
              : new Date(o.createdAt).toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-[#666] line-clamp-1 flex items-center gap-[2px]">
            <MapPin size={10} /> {o.alamat}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-bold" style={{ color: PRIMARY }}>
            Rp {o.total.toLocaleString('id-ID')}
          </p>
          <StatusBadge s={o.status} />
        </div>
      </button>

      {/* body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pt-3 border-t border-[#EAEAEA] text-xs text-[#555] space-y-2"
          >
            {o.items?.map((it, i) => (
              <div key={i} className="flex justify-between">
                <span>{it.title} × {it.qty}</span>
                <span>Rp {(it.qty * it.price).toLocaleString('id-ID')}</span>
              </div>
            ))}

            {/* aksi */}
            <div className="flex gap-2 flex-wrap pt-2">
              {o.status === 'SiapKirim' && (
                <button
                  onClick={() => take(o.id)}
                  className="text-[11px] px-3 py-[2px] rounded-full bg-sky-600/90 text-white flex items-center gap-1 shadow"
                >
                  <Truck size={12} /> Ambil
                </button>
              )}
              {o.status === 'Diantar' && (
                <>
                  <button
                    onClick={() => finish(o.id)}
                    className="text-[11px] px-3 py-[2px] rounded-full bg-green-600/90 text-white flex items-center gap-1 shadow"
                  >
                    <CheckCircle size={12} /> Selesai
                  </button>
                  <button
                    onClick={() => fail(o.id)}
                    className="text-[11px] px-3 py-[2px] rounded-full bg-red-600/90 text-white flex items-center gap-1 shadow"
                  >
                    <XCircle size={12} /> Gagal
                  </button>
                </>
              )}

              {/* util */}
              <button
                onClick={copyAddr}
                className="ml-auto text-[11px] px-2 py-[2px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
              >
                <FiCopy /> Salin
              </button>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] px-2 py-[2px] rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
              >
                🧭 Maps
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------- halaman ---------- */
export default function CourierPage() {
  const db   = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const [tasks, setTasks] = useState([]);

  /* realtime listener */
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'orders'),
      where('status', 'in', ['SiapKirim', 'Diantar', 'Selesai', 'Gagal']),
      orderBy('createdAt', 'desc'),
    );
    const unsub = onSnapshot(q, snap =>
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    );
    return unsub;
  }, [db, user]);

  /* mutate helpers */
  const take = (id) =>
    updateDoc(doc(db, 'orders', id), { status: 'Diantar', courierUid: user.uid });

  const finish = (id) =>
    updateDoc(doc(db, 'orders', id), { status: 'Selesai', deliveredAt: new Date() });

  const fail = (id) =>
    updateDoc(doc(db, 'orders', id), { status: 'Gagal', failedAt: new Date() });

  /* list derivations */
  const available = tasks.filter(t => t.status === 'SiapKirim');
  const mine      = tasks.filter(t => t.courierUid === user?.uid && t.status === 'Diantar');
  const history   = tasks.filter(t => t.courierUid === user?.uid && ['Selesai', 'Gagal'].includes(t.status));

  /* ringkasan */
  const summary = [
    { label: 'Tersedia', icon: <Clock4 size={14} />,  count: available.length },
    { label: 'Tugas Saya', icon: <Truck size={14} />, count: mine.length },
    { label: 'Selesai', icon: <ClipboardCheck size={14} />, count: history.length },
  ];

  /* ---------- render ---------- */
  return (
    <main
      className="min-h-screen flex flex-col gap-6"
      style={{ background: BASE_BG }}
    >
      {/* ringkasan */}
      <section className="grid grid-cols-3 gap-3">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white/70 backdrop-blur p-3 flex flex-col items-center gap-1 shadow border border-white/60"
          >
            {s.icon}
            <span className="text-[10px] text-[#666]">{s.label}</span>
            <span className="text-xl font-bold text-[#363636]">{s.count}</span>
          </div>
        ))}
      </section>

      {/* daftar */}
      <Section title="Siap Dikirim" icon={<Clock4 size={14} />} list={available}>
        {available.map(t => (
          <Card key={t.id} o={t} take={take} finish={finish} fail={fail} />
        ))}
      </Section>

      <Section title="Sedang Diantar" icon={<Truck size={14} />} list={mine}>
        {mine.map(t => (
          <Card key={t.id} o={t} take={take} finish={finish} fail={fail} />
        ))}
      </Section>

      <Section title="Riwayat Saya" icon={<ClipboardCheck size={14} />} list={history}>
        {history.map(t => (
          <Card key={t.id} o={t} take={take} finish={finish} fail={fail} />
        ))}
      </Section>
    </main>
  );
}

/* helper section */
const Section = ({ title, icon, list, children }) => (
  <section className="space-y-3">
    <h2 className="flex items-center gap-1 text-sm font-semibold text-[#555]">
      {icon} {title} ({list.length})
    </h2>
    {list.length === 0 ? (
      <p className="text-xs text-[#999]">Belum ada data.</p>
    ) : (
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    )}
  </section>
);
