const { User } = require('../models/user');

const registerUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Этот email уже занят' });
    }

    const newUser = new User({ name, lastName, email, password });

    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error });
  }
};

module.exports = registerUser;