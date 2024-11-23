const { createTweet, getAllTweets } = require('../actions/tweets.actions');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

// Настроим хранение файлов с помощью multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для хранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Уникальное имя для файла
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers['x-token'];
    const userName = req.headers['x-user'];

    if (!token || !userName) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    let image = null;
    if (req.file) {
      image = req.file.path; // Сохраняем путь к изображению
    }

    const tweet = await createTweet(text, userName, image); // Передаем изображение
    res.status(201).json({ message: 'Tweet created', tweet });
  } catch (error) {
    console.error('Ошибка при создании твита:', error);
    res.status(500).json({ message: 'Ошибка при создании твита' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tweets = await getAllTweets();
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    res.status(500).json({ message: 'Ошибка при получении твитов' });
  }
});

module.exports = router;
