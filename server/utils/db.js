const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://soumyamajumdersm90:q2e4t6u8i9@cluster0.fsfy3gc.mongodb.net/');
        console.log("connection ssuccesful to DB");
    } catch (error) {
        console.log("database connection failed");
        console.log(error);
        process.exit(0);
    }
}
module.exports= connectDb;