require("dotenv").config();
const mysql = require("mysql");
const Contact = require("../model/contactModel");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.RDS_DBNAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    dialect: process.env.DIALECT,
    port: process.env.RDS_MYSQL_PORT,
  }
);

// Syncs model with database (create table if not exists)
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await Contact.sync({ alter: true }); // Sync Contact model with database
    console.log("Contact model synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = syncDatabase;

// const connectDb = async () => {
//   const connection = mysql.createConnection({
//     host: "database-1.cxw40ieoe5ws.ap-south-1.rds.amazonaws.com",
//     user: "admin",
//     password: "mysql123",
//     port: "3306",
//     database: "contactdb",
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the database:", err.stack);
//       return;
//     }
//     console.log("Connected to the database.");
//   });
// };

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
