require("dotenv").config();
const express = require("express");
const syncDatabase = require("./src/config/dbConfig");
const errorHandler = require("./src/middleware/errorHandler");

syncDatabase();

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to Contact Management API ");
});

app.use(express.json());
app.use("/contacts", require("./src/route/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
