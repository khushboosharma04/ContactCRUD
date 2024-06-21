require("dotenv").config();
// const mongoose = require("mongoose");
const mysql = require("mysql");

const connectDb = async () => {
  const connection = mysql.createConnection({
    host: "database-1.cxw40ieoe5ws.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "mysql123",
    port: "3306",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database.");
  });
};
module.exports = connectDb;

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URL);
//     console.log("Database connected successfully!!");
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };
// module.exports = connectDb;

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   }
//   console.log("Connected to the database.");
// });
