const mongoose = require("mongoose");
const config = require("./config")

const conn = async () =>{
    try {
        const conn = await mongoose.connect(config.databaseURI)
        console.log(`mongoDB is connected: ${conn.connection.host}`)
    } catch (e) {
        console.log(`Error connecting mongoDB: ${e.message}`)
        process.exit();
    }
}

module.exports = conn;