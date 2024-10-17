const express = require('express');
const mongoose = require('mongoose');

const app = express();
// Define User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
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
  const randomDelay = Math.floor(Math.random() * 100) + 50; 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate
        ? resolve(Math.random().toString(36).substring(2, 8))
        : reject('Ошибка');
    }, randomDelay);
  });
}

const getRandomStringInParallel = async (maxPromisesCount = 5, chance = 0.9) => {
  const promises = Array.from({ length: maxPromisesCount }, () => randomStringWithChance(chance));
  try {
    return await Promise.any(promises);
  } catch (error) {
    throw new Error('Не удалось получить строку');
  }
};

const getUser3 = async () => {
  try {
    const firstNamePromise = getRandomStringInParallel(); // Имя с вероятностью успеха 0.7
    const lastNamePromise = getRandomStringInParallel(); // Фамилия с вероятностью успеха 0.9
    const [firstName, lastName] = await Promise.all([firstNamePromise, lastNamePromise]);
    return `${lastName} ${firstName}`; 
  } catch (error) {
    console.error('Ошибка при получении имени пользователя:', error.message);
    throw error
  }
};

// Корневой маршрут для получения пользователей
app.get('/', async (req, res) => {
  console.log('Получен запрос на пользователей')
  try {
    const users = await User.find();
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
}
});
app.use(express.json());
app.post('/tweet',async (req, res) => {
  console.log('Received data:', req.body);
  const { name, lastName } = req.body;
  const user = new User({ name, lastName });

  try {
      await user.save();
      res.status(201).json({ message: 'User saved successfully', user });
  } catch (error) {
      res.status(400).json({ message: 'Error saving user', error });
  }
});
// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
