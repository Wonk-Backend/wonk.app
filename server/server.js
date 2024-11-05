const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const { authenticate, authorize } = require('./middleware/auth');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/myapp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/api/auth', authRoutes);

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Protect user folders
app.use('/user/:username', authenticate, authorize, express.static(path.join(__dirname, 'user')));

app.listen(3000, () => {
    console.log('[WonkMicroserver™] running on http://localhost:3000 with MongoDB');
});