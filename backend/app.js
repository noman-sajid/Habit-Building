// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");

// const errorMiddleware = require("./middleware/error");

// // Routes
// const userRoutes = require("./routes/userRoutes");
// const habitRoutes = require("./routes/habitRoutes");

// console.log("Starting Habitium backend...");

// // ✅ Load environment variables
// if (process.env.NODE_ENV !== "production") {
//   console.log("Loading environment variables...");
//   dotenv.config();
// }

// // ✅ Initialize app
// const app = express();

// // ✅ CORS Configuration
// const corsConfig = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };

// console.log("Configuring CORS...");
// app.use(cors(corsConfig));

// // ✅ Middleware setup
// console.log("Setting up middlewares...");
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Test route
// app.get("/", (req, res) => {
//   console.log("Root endpoint accessed");
//   res.send("API is running...");
// });

// // ✅ Register routes
// console.log("Registering API routes...");
// app.use("/api/users", userRoutes);
// app.use("/api/habits", habitRoutes);

// // ✅ Error handler
// app.use(errorMiddleware);

// // ✅ Database Connection
// console.log("Connecting to the database...");
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     process.exit(1);
//   }
// }

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });



const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");


const cloudinary = require("cloudinary");

console.log("Starting server...");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  console.log("Loading environment variables from config.env...");
  dotenv.config({
    path: "./config/config.env",
  });
}

// CORS Configuration
const corsConfig = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

console.log("Configuring CORS...");
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// Middleware setup
console.log("Setting up middlewares...");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // Use true or false explicitly
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  console.log("Root endpoint accessed");
  res.send("Hello World");
});

// Routes
console.log("Registering routes...");
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

// Database connection
console.log("Connecting to the database...");
console.log("Connecting to the database...");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}




console.log("Cloudinary configuration completed.");

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});