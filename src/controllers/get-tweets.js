const getTweets = require('../actions/get-tweets');

module.exports = async (req, res) => {
  try {
    const tweets = await getTweets();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tweets', error });
  }
}
