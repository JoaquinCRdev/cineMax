const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    row: { type: String, required: true, trim: true },   // A, B, C...
    
    number: { type: Number, required: true },             // 1, 2, 3...
    
    category: {
      type: String,
      enum: ["normal", "executive", "premium"],
      required: true,
    },
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

seatSchema.index({ room: 1, row: 1, number: 1 }, { unique: true });

module.exports = mongoose.model("Seat", seatSchema);