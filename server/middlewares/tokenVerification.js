const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config");

const isVerifiedUser = async (req, res, next) => {
    try {

        const { accessToken } = req.cookies || {};
        if (!accessToken) {
            return next(createHttpError(401, "Please create a token and try again!"));
        }

        const decoded = jwt.verify(accessToken, config.accessTokenSecret);
        
        const user = await User.findById(decoded._id);
        if (!user) {
            return next(createHttpError(401, "User not found! Invalid token."));
        }

        req.user = user;
        next();

    }
    catch (e) {
        next(createHttpError(401, "Invalid or expired token! Please login again."));
    }
}

module.exports = { isVerifiedUser }