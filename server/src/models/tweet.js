const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: false,
  },
});
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = { Tweet };
