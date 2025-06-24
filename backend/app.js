const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary");

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
const userRoutes = require('./routes/userRoutes');

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});



app.use('/api/users', userRoutes);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


mongoose.connect(process.env.MONGO_URI, )
.then(()=>{
    console.log("Database Is Connected")
})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('DB connection failed:', err));
