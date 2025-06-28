import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Simpan item baru
export const saveItem = async (data) => {
  const id = `${Date.now()}`;
  await setDoc(doc(firestore, "foodItems", id), {
    ...data,
    id,
    price: Number((data.price + "").replace(/\./g, "")),      // ✅ buang titik
    calories: Number((data.calories + "").replace(/\./g, "")) // ✅ buang titik
  }, { merge: true });
};

// Ambil semua item makanan
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Hapus item berdasarkan ID
export const deleteItem = async (id) => {
  if (!id) return;
  await deleteDoc(doc(firestore, "foodItems", id));
};
