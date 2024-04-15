const mongoose = require("mongoose");
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("connection ssuccesful to DB");
    } catch (error) {
        console.log("database connection failed");
        console.log(error);
        process.exit(0);
    }
}
module.exports= connectDb;