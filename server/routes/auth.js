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
    const userPath = `/user/${username}`; // Define the user path
    const user = new User({ username, password: hashedPassword, path: userPath });
    await user.save();

    // Create user folder structure
    const userDir = path.join(__dirname, '..', userPath);
    const servicesDir = path.join(userDir, 'Services');
    const cloudDir = path.join(servicesDir, 'cloud');
    const panelDir = path.join(userDir, 'panel');
    const panelIndexPath = path.join(panelDir, 'index.html');

    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }
    if (!fs.existsSync(servicesDir)) {
        fs.mkdirSync(servicesDir, { recursive: true });
    }
    if (!fs.existsSync(cloudDir)) {
        fs.mkdirSync(cloudDir, { recursive: true });
    }
    if (!fs.existsSync(panelDir)) {
        fs.mkdirSync(panelDir, { recursive: true });
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

    // Create panel index.html
    const panelIndexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Panel</title>
</head>
<body>
    <h1>Welcome, ${username}</h1>
    <p>Manage your services and settings here.</p>
</body>
</html>
    `;
    fs.writeFileSync(panelIndexPath, panelIndexContent);

    res.status(201).send('[AUTH] [Process: Register] User registered with username: ' + username);
    console.warn('WARNING: All accounts, including developer and admin accounts will expire in 5 days until the update fully releases. This is to deter anyone from attempting to create an account.');
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