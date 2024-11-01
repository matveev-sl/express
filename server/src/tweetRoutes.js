const { Router } = require('express');
const { create, view } = require('./controllers/tweetController');

const router = Router();

// Определяем маршруты
router.post('/', create);
router.get('/', view);

// Экспортируем маршруты
module.exports = router;
