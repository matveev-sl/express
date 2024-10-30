const { Tweet } = require('../models/tweet');

module.exports = getTweets = async () => {
  const rawTweets = await Tweet.find().lean()
  return rawTweets.map(tweet => tweet.userName ? tweet : {...tweet, userName : 'unknownNew'})

}
