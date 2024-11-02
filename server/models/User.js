const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  extraEmail: { type: String },
  github: { type: String },
  google: { type: String },
  puter: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;