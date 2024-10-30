const { Tweet } = require('../models/tweet');

module.exports = async (req, res) => {
  const token = req.headers['X-Token']
  const user = req.headers['X-User']
  if (!token) {
    return res.status(401).json({ message: "Unauthorised"})
  }
  if (!user) {
    return res.status(401).json({ message: "Unauthorised"})
  }
  const { body, userName } = req.body;

  if (!body) {
    return res.status(400).json({ message: 'Body is required' });
  }
 
  try {
    const tweet = new Tweet({ body, userName });
    await tweet.save();
    res.status(201).json({ message: 'Tweet created', tweet });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tweet', error });
  }
};
