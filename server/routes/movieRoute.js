const express = require("express");
const { getAllMovies, createMovie, getMovieById, updateMovie, deleteMovie } = require("../controllers/movieController");
const router = express.Router();

//Movie Routes
router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovieById).put(updateMovie).delete(deleteMovie);

module.exports = router