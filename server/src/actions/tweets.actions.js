const { Tweet } = require('../models/tweet');
const path = require('path');

// Функция создания твита с учетом изображения
async function createTweet(text, userName, imageFile) {
  let imagePath = null;
  
  // Если файл изображения был загружен, сохраняем его путь
  if (imageFile) {
    imagePath = imageFile.path;  // Путь к загруженному файлу
  }

  // Создание нового твита
  const tweet = new Tweet({
    text,
    userName,
    image: imagePath, // Сохраняем путь к изображению в базе данных
  });

  await tweet.save();
  return {
    text: tweet.text,
    userName: tweet.userName,
    createdAt: tweet.createdAt,
    image: tweet.image, // Возвращаем путь к изображению
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
