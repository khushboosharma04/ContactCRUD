// const mongoose = require("mongoose");

// const contactSchema = mongoose.Schema(
//   {
//     _id: {
//       type: Number,
//     },
//     name: {
//       type: String,
//       required: [true, "Please add your name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please add your email"],
//     },
//     phone: {
//       type: String,
//       required: [true, "Please add your phone number"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// module.exports = mongoose.model("Contact", contactSchema);
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("contactdb", "admin", "mysql123", {
  host: "database-1.cxw40ieoe5ws.ap-south-1.rds.amazonaws.com",
  dialect: "mysql",
});

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Please add your name" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Please add your email" },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Please add your phone number" },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Contact;
