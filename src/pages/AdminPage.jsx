import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  collection, doc, getFirestore, onSnapshot, orderBy, query, updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiClipboard, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { Clock4, ArrowLeftRight, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

/* ---------- Konstanta Warna dan Akun ---------- */
const PRIMARY       = '#FE724C';
const BASE_BG       = '#FFFCF9';
const ADMIN_EMAILS  = ['kridamukti25@gmail.com', 'pinkybeear@gmail.com'];
const AUDIO_SRC     = '/public/sounds/notification.mp3';

const STATUS_META = {
  Pending   : { cls: 'bg-gray-100 text-gray-600',     icon: <Clock4 size={14}/>       },
  Diproses  : { cls: 'bg-yellow-100 text-yellow-700', icon: <ArrowLeftRight size={14}/> },
  Selesai   : { cls: 'bg-green-100 text-green-600',   icon: <CheckCircle size={14}/>  },
  Dibatalkan: { cls: 'bg-red-100 text-red-500',       icon: <XCircle size={14}/>      },
};

const Badge = ({ label, active, status }) => (
  <span
    className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-medium
      ${status ? STATUS_META[status].cls : 'bg-white/50 backdrop-blur text-[#555]'}
      ${active && '!text-white'}`}
    style={active ? {
      background: 'linear-gradient(135deg,#FE724C,#FF9866)',
      boxShadow : '0 4px 14px rgba(254,114,76,0.25)',
    } : undefined}
  >
    {status && STATUS_META[status].icon} {label}
  </span>
);

const ActBtn = ({ label, colorCls, onClick }) => (
  <button
    onClick={onClick}
    className={`text-[10px] px-2 py-[2px] rounded ${colorCls} hover:brightness-95`}
  >
    {label}
  </button>
);

const OrderCard = ({ data, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const created = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="rounded-[1.618rem] p-4 bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col gap-2"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="flex justify-between items-start text-left gap-3"
      >
        <div className="space-y-[2px] flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#363636] truncate">
            {data.itemName || 'Pesanan'}
          </p>
          <p className="text-[11px] text-[#888]">{created.toLocaleString('id-ID')}</p>
          <p className="text-[11px] text-[#666] line-clamp-1">📍 {data.alamat}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <p className="text-sm font-bold" style={{ color: PRIMARY }}>
            Rp {data.total.toLocaleString('id-ID')}
          </p>
          <Badge status={data.status} label={data.status} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pt-3 border-t border-[#EAEAEA] text-xs text-[#555] space-y-2"
          >
            {data.items?.map((it, i) => (
              <div key={i} className="flex justify-between">
                <span>{it.title} × {it.qty}</span>
                <span>Rp {(it.qty * it.price).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              {data.status === 'Pending' && (
                <ActBtn label="Proses" colorCls="bg-yellow-100 text-yellow-700" onClick={() => onUpdate(data.id, 'Diproses')} />
              )}
              {data.status === 'Diproses' && (
                <ActBtn label="Selesai" colorCls="bg-green-100 text-green-600" onClick={() => onUpdate(data.id, 'Selesai')} />
              )}
              {['Pending', 'Diproses'].includes(data.status) && (
                <ActBtn label="Batal" colorCls="bg-red-100 text-red-500" onClick={() => onUpdate(data.id, 'Dibatalkan')} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');
  const [asc, setAsc] = useState(false);

  const navigate = useNavigate();
  const user = getAuth().currentUser;
  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? '');

  const audioRef = useRef(null);
  const pendPrev = useRef(0);

  useEffect(() => {
    if (!isAdmin) return;
    const db = getFirestore();
    audioRef.current = new Audio(AUDIO_SRC);

    const unsub = onSnapshot(
      query(collection(db, 'orders'), orderBy('createdAt', asc ? 'asc' : 'desc')),
      snap => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const pendNow = arr.filter(o => o.status === 'Pending').length;

        if (pendNow > pendPrev.current) {
          audioRef.current.play().catch(() => {});
          toast.success('Pesanan baru masuk!');
        }
        pendPrev.current = pendNow;
        setOrders(arr);
      },
    );
    return unsub;
  }, [asc, isAdmin]);

  const updateStatus = (id, status) => {
    const db = getFirestore();
    toast.promise(
      updateDoc(doc(db, 'orders', id), { status }),
      {
        loading: 'Menyimpan…',
        success: 'Status diperbarui',
        error  : 'Gagal menyimpan',
      },
      { position: 'top-right' },
    );
  };

  const shown = useMemo(() => {
    const key = search.toLowerCase();
    return orders
      .filter(o => (filter === 'Semua' ? true : o.status === filter))
      .filter(o =>
        (o.itemName || '').toLowerCase().includes(key) ||
        (o.alamat   || '').toLowerCase().includes(key),
      );
  }, [orders, filter, search]);

  const exportCSV = () => {
    const csv = Papa.unparse(
      shown.map(o => ({
        Waktu : o.createdAt?.toDate ? o.createdAt.toDate().toISOString() : o.createdAt,
        Status: o.status,
        Total : o.total,
        Alamat: o.alamat,
        Items : o.items?.map(i => `${i.title}(${i.qty})`).join('; '),
      })),
    );
    saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `orders-${Date.now()}.csv`);
    toast.success('CSV diekspor');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BASE_BG }}>
        <p className="text-lg font-semibold text-red-500">Akses terbatas (Admin Only)</p>
      </div>
    );
  }

  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <main className="min-h-screen px-4 md:px-8 py-10 space-y-6" style={{ background: BASE_BG }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-xl font-bold text-[#363636]">
          <FiClipboard className="text-2xl" style={{ color: PRIMARY }} />
          Dashboard Pesanan
          {!!pendingCount && (
            <span className="ml-2 px-2 py-[2px] rounded-full text-[10px] font-semibold text-white"
              style={{ background: PRIMARY }}
            >
              {pendingCount} baru
            </span>
          )}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => navigate('/admin/menu')} className="text-sm px-3 py-1 rounded-full text-[#363636] bg-white border border-[#E5E5E5] hover:bg-[#fef4f0]">
            Menu List
          </button>
          <button onClick={() => navigate('/admin/create')} className="text-sm px-3 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#FE724C,#FF9866)' }}
          >
            + Tambah Menu
          </button>
          <button onClick={() => setAsc(p => !p)} className="flex items-center gap-1 text-sm text-[#555]">
            <FiFilter /> {asc ? 'Oldest' : 'Newest'}
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1 text-sm px-3 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#FE724C,#FF9866)' }}
          >
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama item atau alamat…"
          className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white/80 backdrop-blur border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FE724C]/40"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
        {['Semua', 'Pending', 'Diproses', 'Selesai', 'Dibatalkan'].map(s => (
          <button key={s} onClick={() => setFilter(s)}>
            <Badge label={s} active={filter === s} />
          </button>
        ))}
      </div>

      {/* Order List */}
      {shown.length === 0 ? (
        <p className="text-center text-[#8A8A8A]">Tidak ada pesanan.</p>
      ) : (
        <motion.div layout className="grid gap-4">
          <AnimatePresence initial={false}>
            {shown.map(o => (
              <OrderCard key={o.id} data={o} onUpdate={updateStatus} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}
