const express = require("express");
const { getAllRooms, createRoom, getRoomById, updateRoom, deleteRoom } = require("../controllers/roomController");
const router = express.Router();

//Room Routes
router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).put(updateRoom).delete(deleteRoom);

module.exports = router