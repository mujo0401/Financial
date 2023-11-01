const express = require('express');
const connectDB = require('./db');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data
app.use(express.json());


// Use routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
