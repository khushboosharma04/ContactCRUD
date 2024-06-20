require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully!!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
