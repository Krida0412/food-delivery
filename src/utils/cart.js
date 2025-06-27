// utils/cart.js
/**
 * Tambahkan item ke cart.
 * Jika sudah ada → qty bertambah 1.
 * @param {Array} items  cartItems sekarang
 * @param {Object} newIt item yang ditambah (harus punya id, price, title, imageURL)
 */
export const addItem = (items, newIt) => {
  const idx = items.findIndex((i) => i.id === newIt.id);
  if (idx === -1) return [...items, { ...newIt, qty: 1 }];

  return items.map((i, k) =>
    k === idx ? { ...i, qty: i.qty + 1 } : i
  );
};
