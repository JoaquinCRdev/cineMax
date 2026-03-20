const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

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

    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },

    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["reserved", "paid", "cancelled"],
      default: "reserved",
    },

    active: { type: Boolean, default: true },
    
    holdExpiresAt: { type: Date }, // útil si dejas asientos en “reserva temporal”
  },
  { timestamps: true }
);

ticketSchema.index(
  { screening: 1, seat: 1 },
  {
    unique: true,
    partialFilterExpression: { active: true },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);