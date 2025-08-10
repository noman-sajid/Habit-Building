const mongoose = require("mongoose");
const app = require("./app");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
