const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createHttpError(400, "All fields are required!"));
    }

    const isUserPresent = await User.findOne({ email }) || await User.findOne({ name });
    if (isUserPresent) {
      return next(createHttpError(400, "User already exists!"));
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario correctamente
    const newUser = new User({ name, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({ success: true, message: "New user created!", data: newUser });
  } catch (e) {
    // Manejo de índice único (duplicado)
    if (e.code === 11000) {
      return next(createHttpError(409, "Email already registered"));
    }
    next(e);
  }
};

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body || {};
    if (!email || !password) return next(createHttpError(400, "Email and password required"));

    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(401, "Invalid credentials"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(createHttpError(401, "Invalid credentials"));

    const accessToken = jwt.sign({ _id: user._id}, config.accessTokenSecret, {
        expiresIn: "1d"
    });

    res.cookie("accessToken", accessToken, {
        maxAge : 1000 * 60 * 60 * 24 * 30, // 30 días
        httpOnly: true,
        sameSite: "none",
        secure: true
    });

    res.status(200).json({ success: true, message: "Login successful!", data: user });

    
  } catch (e) {
    next(e);
  }
};

const getUserData = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user });
        
    } catch (e) {
        next(e);
    }
};

module.exports = { register, login, getUserData };