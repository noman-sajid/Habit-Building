const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);


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
