const createHttpError = require("http-errors");
const Movie = require("../models/movieModel");

const createMovie = async (req, res, next) => {
  try {
    const { title, description, posterUrl, releaseDate, duration, genre } = req.body;

    if (!title || !description || !posterUrl || !releaseDate || !duration) {
      return next(createHttpError(400, "All required fields are required!"));
    }

    const movie = new Movie({
      title,
      description,
      posterUrl,
      releaseDate,
      duration,
      genre,
    });

    await movie.save();

    res.status(201).json({
      success: true,
      message: "Movie created successfully!",
      data: movie,
    });
  } catch (e) {
    next(e);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: movies });
  } catch (e) {
    next(e);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) return next(createHttpError(404, "Movie not found"));

    res.status(200).json({ success: true, data: movie });
  } catch (e) {
    next(e);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) return next(createHttpError(404, "Movie not found"));

    res.status(200).json({
      success: true,
      message: "Movie updated successfully!",
      data: movie,
    });
  } catch (e) {
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!movie) return next(createHttpError(404, "Movie not found"));

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully!",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};