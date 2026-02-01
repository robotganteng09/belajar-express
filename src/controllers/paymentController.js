const snap = require("../config/midtrans");

const createTransaction = async (req, res) => {
  try {
    let { order_id, gross_amount, name, email } = req.body;


    if (!order_id) {
      order_id = "ORDER-" + Date.now();
    }

    if (!gross_amount || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap",
      });
    }

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: parseInt(gross_amount),
      },

      // 🔥 PAKSA QRIS SAJA
      enabled_payments: ["qris"],

      customer_details: {
        first_name: name,
        email,
      },

      item_details: [
        {
          id: "ITEM-1",
          price: parseInt(gross_amount),
          quantity: 1,
          name: "Produk Test",
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    res.status(200).json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("MIDTRANS ERROR:", error.ApiResponse || error);

    res.status(500).json({
      success: false,
      message: error.ApiResponse?.error_messages || "Gagal membuat transaksi",
    });
  }
};

module.exports = { createTransaction };
