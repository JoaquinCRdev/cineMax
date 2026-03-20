const express = require("express");
const { createOrder, getMyOrders, getOrderById, confirmOrderPayment, cancelOrder } = require("../controllers/orderController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

//Screening Routes
router.route("/").post(isVerifiedUser, createOrder).get(isVerifiedUser, getMyOrders);
router.route("/:id").get(isVerifiedUser, getOrderById);
router.route("/:id/pay").patch(isVerifiedUser, confirmOrderPayment);
router.route("/:id/cancel").patch(isVerifiedUser, cancelOrder);

module.exports = router