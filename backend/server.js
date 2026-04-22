const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config();

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas (Cloud)'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('--- RECAP: Ensure your IP is whitelisted and password is correct in the .env file ---');
  });

app.get('/', (req, res) => {
  res.json({ message: 'Citizen Portal API is Live' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
