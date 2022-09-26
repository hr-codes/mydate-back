const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  name: String,
  profile_id: String,
  status: Boolean,
});

module.exports = User;
