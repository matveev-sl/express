const express = require('express');
const getUsers = require('./src/controllers/get-users');
const postTweet = require('./src/controllers/post-tweet');
const getTweets = require('./src/controllers/get-tweets');
const { User } = require('./src/models/user');  // Модель пользователя

const app = express();
app.use(express.json());

// Эндпоинт для получения пользователей
app.get('/', getUsers);

// Эндпоинт для создания пользователя
app.post('/user', async (req, res) => {
  console.log('Received data:', req.body);
  const { name, lastName } = req.body;
  const user = new User({ name, lastName });

  try {
    await user.save();
    res.status(201).json({ message: 'User saved successfully', user });
  } catch (error) {
    console.log('Error: ', error);
    res.status(400).json({ message: 'Error saving user', error });
  }
});

// Эндпоинты для работы с твитами
app.post('/tweet', postTweet);   // Создание твита
app.get('/tweets', getTweets);   // Получение всех твитов

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
