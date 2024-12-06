const { Tweet } = require('../models/tweet');

// Функция создания твита с учетом изображения
async function createTweet(text, userName, imageFile) {

  let imagePath = null; // Объявляем переменную
  if (imageFile) {
    imagePath = imageFile;
    console.log("Сохраняется ли", imagePath);
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
async function getPaginatedTweets(limit = 5, skip = 0, searchQuery = '') {
  const countPromise = Tweet.countDocuments({
    text: { $regex: searchQuery, $options: 'i' } // Регулярное выражение для поиска
  });

  const tweetsPromise = Tweet.find({
    text: { $regex: searchQuery, $options: 'i' }
  })
    .sort({ createdAt: -1 }) // Сортировка от новых к старым
    .skip(skip)              // Пропускаем определенное количество твитов
    .limit(limit)            // Ограничиваем количество твитов
    .lean();

  const [count, tweets] = await Promise.all([countPromise, tweetsPromise]);
  return {
    tweets: tweets.map(tweet => ({
      text: tweet.text,
      userName: tweet.userName,
      createdAt: tweet.createdAt,
      id: tweet._id,
      image: tweet.image, // Включаем путь к изображению
    })),
    count
  };
}

module.exports = {
  createTweet,
  getPaginatedTweets, // Используем эту функцию вместо getAllTweets
};
