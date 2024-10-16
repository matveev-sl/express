const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Генерация случайной строки с задержкой
function randomStringWithChance(successRate = 0.7) {
  const randomDelay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500; 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate
        ? resolve(Math.random().toString(36).substring(2, 8))
        : reject('Ошибка');
    }, randomDelay);
  });
}

const getRandomStringWithRetries = async (maxPromisesCount = 5, chance = 0.5) => {
  const promises = Array.from({ length: maxPromisesCount }, () => randomStringWithChance(chance));
  try {
    return await Promise.any(promises);
  } catch (error) {
    throw new Error('Не удалось получить строку');
  }
};

const getUser3 = async () => {
  try {
    const firstNamePromise = getRandomStringWithRetries(5, 0.7); // Имя с вероятностью успеха 0.7
    const lastNamePromise = getRandomStringWithRetries(5, 0.9); // Фамилия с вероятностью успеха 0.9

    const [firstName, lastName] = await Promise.all([firstNamePromise, lastNamePromise]);
    return `${lastName} ${firstName}`; 
  } catch (error) {
    console.error('Ошибка при получении имени пользователя:', error.message);
    return 'Не удалось получить имя пользователя';
  }
};

// Корневой маршрут для получения пользователей
app.get('/', async (req, res) => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await getUser3();
    users.push(user);
  }
  res.json(users);
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
