const { createTweet, getAllTweets } = require('../actions/tweets.actions');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const token = req.headers['x-token'];
    const userName = req.headers['x-user'];

    if (!token || !userName) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text } = req.body; // Используем "text" вместо "body"

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const tweet = await createTweet(text, userName);
    res.status(201).json({ message: 'Tweet created', tweet });
  } catch (error) {
    console.error('Ошибка при создании твита:', error); // Логируем для команды поддержки
    res.status(500).json({ message: 'Ошибка при создании твита' }); // Сообщение для пользователя
  }
});

router.get('/', async (req, res) => {
  try {

    const tweets = await getAllTweets();
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Ошибка при получении твитов:', error); // Логируем для команды поддержки
    res.status(500).json({ message: 'Ошибка при получении твитов' }); // Сообщение для пользователя
  }
});

module.exports = router;
