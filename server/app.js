require("dotenv").config();
const express = require("express");
const conn = require("./config/database")
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

// const createHttpError = require("http-errors")

const PORT = config.port
conn();

//Middleware
app.use(express.json()); //parse incoming requests with JSON payloads
app.use(cookieParser()); //parse cookies from incoming requests
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
})); //enable CORS for requests from the client URL

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