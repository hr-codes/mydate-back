const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  name: String,
  status: Boolean,
});

module.exports = User;