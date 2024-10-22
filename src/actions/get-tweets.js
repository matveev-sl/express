const { Tweet } = require('../models/tweet');

module.exports = getTweets = async () => {
  return Tweet.find();
}
