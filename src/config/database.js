const mongoose = require("mongoose");
const { DB_NAME } = require("./constants");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );
        console.log(
            `MongoDB Connected | Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
