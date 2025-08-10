// const express = require("express");
// const app = express();
// const connectDB = require("./config/database");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// // const blog = require("./routes/blogRoutes");
// const user = require("./routes/userRoute");
// const service = require("./routes/serviceRoute");
// const carBrand = require("./routes/carBrandRoutes");
// const motService = require("./routes/motServiceRoutes")




// const cloudinary = require("cloudinary");
// if (process.env.NODE_ENV !== "production") {
//   dotenv.config({
//     path: "./config/config.env",
//   });
// }

// const corsConfig = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
//   method: ["GET", "POST", "PUT", "DELETE"],
// };

// app.options("", cors(corsConfig));
// app.use(cors(corsConfig));
// app.use(cookieParser());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true}));
// app.use(bodyParser.urlencoded({ extended: true })); // Use true or false explicitly
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // routes defined


// app.use("/api/v1", user);

// app.use("/api/v1",service);
// app.use("/api/v1", carBrand);
// app.use("/api/v1", motService);


// connectDB();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.listen(process.env.PORT, () => {
//   try {
//     console.log(`Server is running on port ${process.env.PORT}`);
//   } catch (error) {
//     console.log(error);
//   }
// });



// const express = require("express");
// const app = express();
// const connectDB = require("./config/database");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const user = require("./routes/userRoute");
// const service = require("./routes/serviceRoute");
// const carBrand = require("./routes/carBrandRoutes");
// const motService = require("./routes/motServiceRoutes");


// const cloudinary = require("cloudinary");

// console.log("Starting server...");

// // Load environment variables
// if (process.env.NODE_ENV !== "production") {
//   console.log("Loading environment variables from config.env...");
//   dotenv.config({
//     path: "./config/config.env",
//   });
// }

// // CORS Configuration
// const corsConfig = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
//   method: ["GET", "POST", "PUT", "DELETE"],
// };

// console.log("Configuring CORS...");
// app.options("", cors(corsConfig));
// app.use(cors(corsConfig));

// // Middleware setup
// console.log("Setting up middlewares...");
// app.use(
//   fileUpload({
//     createParentPath: true,
//     limits: { fileSize: 5 * 1024 * 1024 }, 
//   })
// );
// app.use(cookieParser());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true })); // Use true or false explicitly
// app.use(bodyParser.json());

// // Test route
// app.get("/", (req, res) => {
//   console.log("Root endpoint accessed");
//   res.send("Hello World");
// });

// // Routes
// console.log("Registering routes...");
// app.use("/api/v1", user);
// app.use("/api/v1", service);
// app.use("/api/v1", carBrand);
// app.use("/api/v1", motService);

// // Database connection
// console.log("Connecting to the database...");
// console.log(process.env.DB_URI); 
// connectDB()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error);
//     process.exit(1); // Exit process with failure code
//   });

// // Cloudinary configuration
// console.log("Configuring Cloudinary...");
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// console.log("Cloudinary configuration completed.");

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   try {
//     console.log(`Server is running on port ${PORT}`);
//   } catch (error) {
//     console.error("Error starting the server:", error);
//   }
// });




const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");


const cloudinary = require("cloudinary");
const sendEmail = require("./utils/sendEmail"); // Required for sending emails

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
// Routes
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);


// Database connection
console.log("Connecting to the database...");
console.log(process.env.MONGO_URI); 
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process with failure code
  });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
