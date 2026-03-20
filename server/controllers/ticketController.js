// Sinceramente innecesario, pero lo dejo por si acaso
const createHttpError = require("http-errors");
const Ticket = require("../models/ticketModel");

const getTicketsByOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const tickets = await Ticket.find({ order: orderId })
      .populate("seat")
      .populate("screening");

    res.status(200).json({ success: true, data: tickets });
  } catch (e) {
    next(e);
  }
};

const getMyTickets = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tickets = await Ticket.find({ user: userId })
      .populate("seat")
      .populate("screening")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: tickets });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getTicketsByOrder,
  getMyTickets,
};