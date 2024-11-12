const { User } = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Получаем всех пользователей
    res.status(200).json(users);      // Отправляем список пользователей
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ message: 'Ошибка при получении пользователей', error });
  }
};

module.exports = getUsers;
