const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// User register service
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Create user folder
    const userDir = path.join(__dirname, '..', 'user', username);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }

    // Initialize WonkSubscriber.conf
    const subscriberConfPath = path.join(userDir, 'WonkSubscriber.conf');
    const initialConfig = {
        services: {
            cloud: 0,
            cloud_gb: 0,
        }
    };
    fs.writeFileSync(subscriberConfPath, JSON.stringify(initialConfig, null, 2));

    res.status(201).send('[AUTH] [Process: Register] User registered with username: ' + username);
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userID: user._id }, 'secretkey');
        res.json({ token });
    } else {
        res.status(401).send('[AUTH] [Process: Login] Invalid username or password. Did not login.');
    }
});

module.exports = router;