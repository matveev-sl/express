const { createTweet, getPaginatedTweets } = require('../actions/tweets.actions');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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
    console.log('Req.file?', req.file)
    if (req.file) {
      image = req.file.path; // Сохраняем путь к изображению
    }
    console.log('Imagepath', image)
    const tweet = await createTweet(text, userName, image); // Передаем изображение
    res.status(201).json({ message: 'Tweet created', tweet });
  } catch (error) {
    console.error('Ошибка при создании твита:', error);
    res.status(500).json({ message: 'Ошибка при создании твита' });
  }
});

router.get('/', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const tweets = await getPaginatedTweets(Number(limit), Number(skip));
    // const searchQuery = req.query.searchQuery || '';
    // const query = searchQuery
    //   ? { text: { $regex: searchQuery, $options: 'i' } }  // Поиск по тексту, нечувствительный к регистру
    //   : {};
    //   const allTweets = await getPaginatedTweets(Number(limit), Number(skip), query);

    res.status(200).json(tweets);
  } catch (error) {
    console.error('Ошибка при получении твитов:', error);
    res.status(500).json({ message: 'Ошибка при получении твитов' });
  }
});

module.exports = router;
