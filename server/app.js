require("dotenv").config();
const express = require("express");
const conn = require("./config/database")
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();

// const createHttpError = require("http-errors")

const PORT = config.port
conn();

//Middleware
app.use(express.json()); //parse incoming requests with JSON payloads
app.use(cookieParser()); //parse cookies from incoming requests

//Root Endpoint
app.get("/", (req, res)=>{
    // const err = createHttpError(404, "something went wrong!")
    // throw err
    res.json({message : "Hi from server!"})
})

// Other Endpoints
app.use("/api/user", require("./routes/userRoute"));

//Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})