const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
app.use(express.json());

// Route definitions
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// Default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Book Library API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
