const express = require("express");
const { createSeat, createManySeats, getSeatsByRoom, deleteSeat} = require("../controllers/seatController");

const router = express.Router();

router.route("/").post(createSeat);
router.route("/bulk").post(createManySeats);
router.route("/room/:roomId").get(getSeatsByRoom);
router.route("/:id").delete(deleteSeat);

module.exports = router;