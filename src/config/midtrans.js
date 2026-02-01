// midtrans.js
const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false, // true kalau sudah live
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

module.exports = snap;
