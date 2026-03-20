const createHttpError = require("http-errors");
const Screening = require("../models/screeningModel");
const Movie = require("../models/movieModel");
const Room = require("../models/roomModel");
const Seat = require("../models/seatModel");
const Ticket = require("../models/ticketModel");

const createScreening = async (req, res, next) => {
  try {
    const { movie, room, startsAt, endsAt, prices } = req.body;

    if (!movie || !room || !startsAt) {
      return next(
        createHttpError(400, "Movie, room and startsAt are required"),
      );
    }

    const movieExists = await Movie.findById(movie);
    if (!movieExists) return next(createHttpError(404, "Movie not found"));

    const roomExists = await Room.findById(room);
    if (!roomExists) return next(createHttpError(404, "Room not found"));

    const screeningExists = await Screening.findOne({ room, startsAt });
    if (screeningExists) {
      return next(
        createHttpError(400, "This room already has a screening at that time"),
      );
    }

    const screening = new Screening({
      movie,
      room,
      startsAt,
      endsAt,
      prices,
    });

    await screening.save();

    res.status(201).json({
      success: true,
      message: "Screening created successfully!",
      data: screening,
    });
  } catch (e) {
    next(e);
  }
};

const getAllScreenings = async (req, res, next) => {
  try {
    const screenings = await Screening.find({ status: "scheduled" })
      .populate("movie")
      .populate("room")
      .sort({ startsAt: 1 });

    res.status(200).json({ success: true, data: screenings });
  } catch (e) {
    next(e);
  }
};

const getScreeningById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const screening = await Screening.findById(id)
      .populate("movie")
      .populate("room");

    if (!screening) return next(createHttpError(404, "Screening not found"));

    res.status(200).json({ success: true, data: screening });
  } catch (e) {
    next(e);
  }
};

const getScreeningsByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const screenings = await Screening.find({
      movie: movieId,
      status: "scheduled",
    })
      .populate("room")
      .sort({ startsAt: 1 });

    res.status(200).json({ success: true, data: screenings });
  } catch (e) {
    next(e);
  }
};

const updateScreening = async (req, res, next) => {
  try {
    const { id } = req.params;

    const screening = await Screening.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!screening) return next(createHttpError(404, "Screening not found"));

    res.status(200).json({
      success: true,
      message: "Screening updated successfully!",
      data: screening,
    });
  } catch (e) {
    next(e);
  }
};

const deleteScreening = async (req, res, next) => {
  try {
    const { id } = req.params;

    const screening = await Screening.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true },
    );

    if (!screening) return next(createHttpError(404, "Screening not found"));

    res.status(200).json({
      success: true,
      message: "Screening cancelled successfully!",
    });
  } catch (e) {
    next(e);
  }
};

const getSeatsByScreening = async (req, res, next) => {
  try {
    const { screeningId } = req.params;

    const screening = await Screening.findById(screeningId).populate("room");
    if (!screening) return next(createHttpError(404, "Screening not found"));

    if (!screening.room) {
      return next(createHttpError(404, "Room not found for this screening"));
    }

    const seats = await Seat.find({
      room: screening.room._id,
      isActive: true,
    }).sort({ row: 1, number: 1 });

    const bookedTickets = await Ticket.find({
      screening: screeningId,
      active: true,
    }).select("seat");

    const bookedSeatIds = bookedTickets.map((ticket) => ticket.seat.toString());

    const seatsWithStatus = seats.map((seat) => ({
      ...seat.toObject(),
      isBooked: bookedSeatIds.includes(seat._id.toString()),
    }));

    res.status(200).json({
      success: true,
      data: seatsWithStatus,
    });
  } catch (e) {
    next(e);
  }
};

const getAvailableSeatsByScreening = async (req, res, next) => {
  try {
    const { screeningId } = req.params;

    const screening = await Screening.findById(screeningId).populate("room");
    if (!screening) return next(createHttpError(404, "Screening not found"));

    const bookedTickets = await Ticket.find({
      screening: screeningId,
      active: true,
    }).select("seat");

    const bookedSeatIds = bookedTickets.map((ticket) => ticket.seat);

    const availableSeats = await Seat.find({
      room: screening.room._id,
      isActive: true,
      _id: { $nin: bookedSeatIds },
    }).sort({ row: 1, number: 1 });

    res.status(200).json({
      success: true,
      data: availableSeats,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createScreening,
  getAllScreenings,
  getScreeningById,
  getScreeningsByMovie,
  updateScreening,
  deleteScreening,
  getSeatsByScreening,
  getAvailableSeatsByScreening,
};
