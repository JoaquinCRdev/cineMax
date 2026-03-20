const express = require("express");
const { getAllScreenings, createScreening, getScreeningById, updateScreening, deleteScreening, getScreeningsByMovie, getSeatsByScreening ,getAvailableSeatsByScreening } = require("../controllers/screeningController");
const router = express.Router();

//Screening Routes
router.route("/").get(getAllScreenings).post(createScreening);
router.route("/:id").get(getScreeningById).put(updateScreening).delete(deleteScreening);
router.route("/movie/:movieId").get(getScreeningsByMovie);
router.route("/:screeningId/seats").get(getSeatsByScreening);
router.route("/:screeningId/available-seats").get(getAvailableSeatsByScreening);

module.exports = router