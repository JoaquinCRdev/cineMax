const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const Ticket = require("../models/ticketModel");
const Screening = require("../models/screeningModel");
const Seat = require("../models/seatModel");

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;
    const { screeningId, seatIds, paymentMethod } = req.body;

    if (!screeningId || !Array.isArray(seatIds) || seatIds.length === 0) {
      return next(createHttpError(400, "Screening and seats are required"));
    }

    const screening = await Screening.findById(screeningId)
      .populate("room")
      .session(session);

    if (!screening) return next(createHttpError(404, "Screening not found"));
    if (screening.status !== "scheduled") {
      return next(createHttpError(400, "Screening is not available"));
    }

    const seats = await Seat.find({
      _id: { $in: seatIds },
      room: screening.room._id,
      isActive: true,
    }).session(session);

    if (seats.length !== seatIds.length) {
      return next(createHttpError(400, "One or more seats are invalid for this room"));
    }

    const existingTickets = await Ticket.find({
      screening: screeningId,
      seat: { $in: seatIds },
      active: true,
    }).session(session);

    if (existingTickets.length > 0) {
      return next(createHttpError(400, "One or more seats are already booked"));
    }

    let subtotal = 0;

    const createdTickets = seats.map((seat) => {
      const price = screening.prices[seat.category];

      if (!price) {
        throw createHttpError(400, `Invalid price for seat category: ${seat.category}`);
      }

      subtotal += price;

      return {
        user: userId,
        screening: screeningId,
        seat: seat._id,
        price,
        status: "reserved",
        active: true,
      };
    });

    const order = await Order.create([{
      user: userId,
      screening: screeningId,
      subtotal,
      total: subtotal,
      status: "pending",
      paymentMethod: paymentMethod || null,
    }], { session });

    const [savedOrder] = order;

    const ticketsToCreate = createdTickets.map((ticket) => ({
      ...ticket,
      order: savedOrder._id,
    }));

    const tickets = await Ticket.insertMany(ticketsToCreate, { session });

    savedOrder.tickets = tickets.map((ticket) => ticket._id);
    await savedOrder.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: {
        order: savedOrder,
        tickets,
      },
    });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("screening")
      .populate("tickets")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    next(e);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user")
      .populate({
        path: "screening",
        populate: ["movie", "room"],
      })
      .populate({
        path: "tickets",
        populate: "seat",
      });

    if (!order) return next(createHttpError(404, "Order not found"));

    res.status(200).json({ success: true, data: order });
  } catch (e) {
    next(e);
  }
};

const confirmOrderPayment = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;

    const order = await Order.findById(id).session(session);
    if (!order) return next(createHttpError(404, "Order not found"));

    order.status = "paid";
    order.paidAt = new Date();
    await order.save({ session });

    await Ticket.updateMany(
      { order: order._id },
      { $set: { status: "paid" } },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Order paid successfully!",
      data: order,
    });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
};

const cancelOrder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;

    const order = await Order.findById(id).session(session);
    if (!order) return next(createHttpError(404, "Order not found"));

    order.status = "cancelled";
    await order.save({ session });

    await Ticket.updateMany(
      { order: order._id },
      { $set: { status: "cancelled", active: false } },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully!",
    });
  } catch (e) {
    await session.abortTransaction();
    next(e);
  } finally {
    session.endSession();
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  confirmOrderPayment,
  cancelOrder,
};