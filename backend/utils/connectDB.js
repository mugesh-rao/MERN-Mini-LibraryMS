const mongoose = require("mongoose");
const config = require("config");

// mongodb+srv://<username>:<password>@cluster0.ssslp.mongodb.net/?retryWrites=true&w=majority

const dbUrl = `mongodb+srv://testapp:testapp@cluster0.a3qhggk.mongodb.net/growtoInsurance`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
