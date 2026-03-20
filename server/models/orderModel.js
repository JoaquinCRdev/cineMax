const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    screening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },

    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    
    subtotal: { type: Number, required: true, default: 0 },
    
    total: { type: Number, required: true, default: 0 },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "expired"],
      default: "pending",
    },

    paymentMethod: { type: String, trim: true },
    
    paidAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);