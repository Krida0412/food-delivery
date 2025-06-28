import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { app } from '../firebase.config';
import { categories } from '../utils/data';
import { MdArrowBack, MdFastfood, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { BsImage } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { TbCurrencyRupiah } from 'react-icons/tb';

const PRIMARY = '#FE724C';
const BASE_BG = '#FFFCF9';
const db = getFirestore(app);

export default function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    category: '',
    calories: '',
    price: '',
    imageURL: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'foodItems', id));
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            ...data,
            calories: Number((data.calories + '').replace(/\./g, '')),
            price: Number((data.price + '').replace(/\./g, '')),
          });
        } else {
          toast.error('Item tidak ditemukan!');
          navigate('/admin/menu');
        }
      } catch (err) {
        toast.error('Gagal mengambil data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'foodItems', id), {
        ...form,
        price: Number((form.price + '').replace(/\./g, '')),
        calories: Number((form.calories + '').replace(/\./g, '')),
      });
      toast.success('Item berhasil diperbarui!');
      navigate('/admin/menu');
    } catch (err) {
      toast.error('Gagal menyimpan perubahan');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BASE_BG }}>
        <p className="text-[#555]">Memuat data…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-10 space-y-6" style={{ background: BASE_BG }}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#363636] flex items-center gap-2">
          <MdFastfood size={24} style={{ color: PRIMARY }} />
          Edit Menu
        </h1>
        <button
          onClick={() => navigate('/admin/menu')}
          className="flex items-center gap-2 rounded-full text-sm px-4 py-2 text-[#363636] bg-white border border-[#E5E5E5] hover:bg-[#fef4f0]"
        >
          <MdArrowBack size={18} /> Kembali
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/80 backdrop-blur-md rounded-xl p-6 border border-white/60 shadow"
      >
        <div>
          <label className="text-sm text-[#555] flex items-center gap-1 font-medium">
            <MdFastfood /> Nama Makanan
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE724C]/30"
          />
        </div>

        <div>
          <label className="text-sm text-[#555] flex items-center gap-1 font-medium">
            <BiCategoryAlt /> Kategori
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full mt-2 p-3 border rounded-xl bg-white"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.urlParamName}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-[#555] flex items-center gap-1 font-medium">
            <BsImage /> Gambar
          </label>
          <div className="mt-2 flex flex-col gap-2">
            {form.imageURL && (
              <img
                src={form.imageURL}
                alt="Preview"
                className="w-full max-w-xs rounded-lg border border-dashed border-[#ccc] object-contain"
              />
            )}
            <input
              type="text"
              name="imageURL"
              value={form.imageURL}
              onChange={handleChange}
              placeholder="Link gambar"
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[#555] flex items-center gap-1 font-medium">
              <MdOutlineLocalFireDepartment /> Kalori
            </label>
            <input
              type="number"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm text-[#555] flex items-center gap-1 font-medium">
              <TbCurrencyRupiah /> Harga
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 text-white font-medium rounded-full"
          style={{
            background: 'linear-gradient(135deg,#FE724C,#FF9866)',
            boxShadow: '0 4px 12px rgba(254,114,76,0.3)',
          }}
        >
          Simpan Perubahan
        </button>
      </form>
    </main>
  );
}
