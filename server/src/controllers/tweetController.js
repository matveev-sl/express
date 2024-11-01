const { Tweet } = require('../models/tweet');

// Создание нового твита
const createTweet = async (req, res) => {
  const token = req.headers['x-token'];
  const user = req.headers['x-user'];
  console.log ("Данные с сервака", token, user)
  if (!token || !user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { text, userName } = req.body; // Используем "text" вместо "body"

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  try {
    const tweet = new Tweet({ text, userName });
    await tweet.save();
    res.status(201).json({ message: 'Tweet created', tweet });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tweet', error });
  }
};

// Получение всех твитов
const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tweets', error });
  }
};

// Экспортируем экшены
module.exports = {
  createTweet,
  getAllTweets,
};
