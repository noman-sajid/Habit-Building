const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorMiddleware = require("./middleware/error");





require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// Routes
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});



app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);


app.use(errorMiddleware);

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
