import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const RiwayatPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------------ */
  /*  Ambil riwayat order milik user (realtime listener)                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const auth = getAuth();
    const db   = getFirestore();

    // Tunggu user ready
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "orders"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsub = onSnapshot(q, (snap) => {
        const result = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(result);
        setLoading(false);
      });

      // bersih-bersih listener Firestore
      return () => unsub();
    });

    // bersih-bersih listener Auth
    return () => unsubAuth();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  UI                                                                */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p>Memuat riwayat…</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-4 pb-32">
      <h2 className="text-xl font-bold mb-4 text-center">Riwayat Pesanan</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-xl p-4 shadow border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-md font-semibold text-gray-800">
                    {o.itemName ?? "Pesanan"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(o.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    o.status === "Selesai"
                      ? "bg-green-100 text-green-600"
                      : o.status === "Dibatalkan"
                      ? "bg-red-100 text-red-500"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 mt-2">
                Total: Rp {Number(o.total).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatPage;
