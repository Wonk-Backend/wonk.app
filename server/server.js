const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('[WonkMicroserver™] running on http://localhost:3000 with MongoDB');
});