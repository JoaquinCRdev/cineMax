const express = require("express");
const { getTicketsByOrder, getMyTickets} = require("../controllers/ticketController");

const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

router.route("/my-tickets").get(isVerifiedUser, getMyTickets);
router.route("/order/:orderId").get(isVerifiedUser, getTicketsByOrder);

module.exports = router;