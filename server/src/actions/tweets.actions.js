const {Tweet} = require("../models/tweet") 

async function createTweet(text, userName) { 
    const tweet = new Tweet({ text, userName });
    await tweet.save();
    return {text: tweet.text, userName: tweet.userName}
}

async function getAllTweets () {
const tweets = await Tweet.find().lean();
return tweets.map(tweet => ({text : tweet.text, userName: tweet.userName, createdAt : tweet.createdAt}))
}

module.exports = { 
    createTweet, 
    getAllTweets 
}

