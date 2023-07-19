const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB conected");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to initialize the database");
  }
};

module.exports = {
  dbConection,
};
