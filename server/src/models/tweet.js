const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: { 
    type: String,
    default: null, 
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = { Tweet };
