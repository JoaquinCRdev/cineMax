const createHttpError = require("http-errors");
const Room = require("../models/roomModel");

const createRoom = async (req, res, next) => {
  try {
    const { name, code, capacity } = req.body;

    if (!name || !code || !capacity) {
      return next(createHttpError(400, "All required fields are required!"));
    }

    const roomExists = await Room.findOne({ code });
    if (roomExists) {
      return next(createHttpError(400, "Room code already exists"));
    }

    const room = new Room({ name, code, capacity });
    await room.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully!",
      data: room,
    });
  } catch (e) {
    if (e.code === 11000) {
      return next(createHttpError(409, "Room already exists"));
    }
    next(e);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: rooms });
  } catch (e) {
    next(e);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id);
    if (!room) return next(createHttpError(404, "Room not found"));

    res.status(200).json({ success: true, data: room });
  } catch (e) {
    next(e);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) return next(createHttpError(404, "Room not found"));

    res.status(200).json({
      success: true,
      message: "Room updated successfully!",
      data: room,
    });
  } catch (e) {
    next(e);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await Room.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!room) return next(createHttpError(404, "Room not found"));

    res.status(200).json({
      success: true,
      message: "Room deleted successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};