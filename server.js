const express = require('express');
const connectDB = require('./api/db');
const dotenv = require('dotenv');
const authRoutes = require('./api/auth');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Restricting to a specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
// Routes
app.get('/', (req, res) => {
  res.send(`Welcome to the Darshil's API!`);
});
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
