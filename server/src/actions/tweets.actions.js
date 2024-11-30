const { Tweet } = require('../models/tweet');
const path = require('path');

// Функция создания твита с учетом изображения
async function createTweet(text, userName, imageFile) {

  if (imageFile) {
    imagePath = imageFile; 
    console.log ("Сохраняется ли", imagePath);
  }

  const tweet = new Tweet({
    text,
    userName,
    image: imagePath, 
  });

  await tweet.save();
  return {
    text: tweet.text,
    userName: tweet.userName,
    createdAt: tweet.createdAt,
    image: tweet.image, 
  };
}

// Функция получения всех твитов
async function getAllTweets() {
  const tweets = await Tweet.find().lean();
  return tweets.map(tweet => ({
    text: tweet.text,
    userName: tweet.userName,
    createdAt: tweet.createdAt,
    image: tweet.image, // Включаем путь к изображению
  }));
}

module.exports = {
  createTweet,
  getAllTweets,
};
