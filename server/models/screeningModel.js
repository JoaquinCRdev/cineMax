const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    startsAt: { type: Date, required: true },
    
    endsAt: { type: Date },

    prices: {
      normal: { type: Number, required: true, default: 180 },
      executive: { type: Number, required: true, default: 290 },
      premium: { type: Number, required: true, default: 510 },
    },

    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

screeningSchema.index({ room: 1, startsAt: 1 }, { unique: true });
screeningSchema.index({ movie: 1, startsAt: 1 });

module.exports = mongoose.model("Screening", screeningSchema);