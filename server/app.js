const express = require('express');
const login = require('./src/controllers/login')
const getUsers = require('./src/controllers/get-users');
const { User } = require('./src/models/user');  // Модель пользователя
const cors = require('cors');
const tweetRouter = require('./src/controllers/tweets.router');


const app = express();
app.use(cors());
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
app.use('/tweets', tweetRouter);
app.post('/login', login);   // Получение всех твитов
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
