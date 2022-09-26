const mongoose = require('mongoose');

const Profile = mongoose.model('Profile', {
  name: String,
  returns: Number,
  loves: Number,
  messages: Number,
  requests: Number,
});

module.exports = Profile;
