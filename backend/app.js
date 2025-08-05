const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();
console.log("Starting Habitium backend...");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
dotenv.config();

}

// CORS Configuration
const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Favicon fix
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Test route
app.get("/", (req, res) => {
  res.send("Habitium API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

// Export app for Vercel
module.exports = app;

// ✅ Local server only
if (process.env.VERCEL !== "1") {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("MongoDB connected");
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
}
