const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Ej: Sala 1
    
    code: { type: String, required: true, trim: true, unique: true }, // Ej: R1
    
    capacity: { type: Number, required: true },
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);