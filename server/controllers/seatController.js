const createHttpError = require("http-errors");
const Seat = require("../models/seatModel");
const Room = require("../models/roomModel");

const createSeat = async (req, res, next) => {
  try {
    const { room, row, number, category } = req.body;

    if (!room || !row || !number || !category) {
      return next(createHttpError(400, "All required fields are required!"));
    }

    const roomExists = await Room.findById(room);
    if (!roomExists) return next(createHttpError(404, "Room not found"));

    const seatExists = await Seat.findOne({ room, row, number });
    if (seatExists) {
      return next(createHttpError(400, "Seat already exists in this room"));
    }

    const seat = new Seat({ room, row, number, category });
    await seat.save();

    res.status(201).json({
      success: true,
      message: "Seat created successfully!",
      data: seat,
    });
  } catch (e) {
    if (e.code === 11000) {
      return next(createHttpError(409, "Seat already exists"));
    }
    next(e);
  }
};

const createManySeats = async (req, res, next) => {
  try {
    const { room, seats } = req.body;

    if (!room || !Array.isArray(seats) || seats.length === 0) {
      return next(createHttpError(400, "Room and seats array are required"));
    }

    const roomExists = await Room.findById(room);
    if (!roomExists) return next(createHttpError(404, "Room not found"));

    const seatsToInsert = seats.map((seat) => ({
      room,
      row: seat.row,
      number: seat.number,
      category: seat.category,
    }));

    const createdSeats = await Seat.insertMany(seatsToInsert);

    res.status(201).json({
      success: true,
      message: "Seats created successfully!",
      data: createdSeats,
    });
  } catch (e) {
    next(e);
  }
};

const getSeatsByRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const seats = await Seat.find({ room: roomId }).sort({ row: 1, number: 1 });

    res.status(200).json({ success: true, data: seats });
  } catch (e) {
    next(e);
  }
};

const deleteSeat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seat = await Seat.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!seat) return next(createHttpError(404, "Seat not found"));

    res.status(200).json({
      success: true,
      message: "Seat deleted successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createSeat,
  createManySeats,
  getSeatsByRoom,
  deleteSeat,
};