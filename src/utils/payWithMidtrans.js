// src/utils/payWithMidtrans.js
export const payWithMidtrans = (token) => {
  if (window.snap) {
    window.snap.pay(token, {
      onSuccess: function (result) {
        alert("Pembayaran sukses!");
        console.log(result);
      },
      onPending: function (result) {
        alert("Menunggu pembayaran...");
        console.log(result);
      },
      onError: function (result) {
        alert("Pembayaran gagal!");
        console.error(result);
      },
      onClose: function () {
        alert("Kamu menutup popup pembayaran.");
      },
    });
  } else {
    alert("Midtrans belum termuat!");
  }
};
