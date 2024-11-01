const { Router } = require('express');
const { createTweet, getAllTweets } = require('./controllers/tweetController');

const router = Router();

// Определяем маршруты
router.post('/', create); // Создание нового твита
router.get('/', view); // Получение всех твитов

// Экспортируем маршруты
module.exports = router;
