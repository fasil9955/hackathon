const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
