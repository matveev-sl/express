const { Router } = require('express');
const { getUserByEmail, createUser, comparePassword } = require('../actions/users.actions');
const router = Router();

router.post('/register', async (req, res) => {
//  return res.status(500 ).json({ message: '500' });
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Этот email уже занят' }); // Ожидаемая ошибка
    }

    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {

    console.error('Ошибка при регистрации:', error); // Логируем для команды поддержки
    res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже.' }); // Сообщение для пользователя
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' }); // Ожидаемая ошибка
    }


    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь с таким Email не существует' }); // Ожидаемая ошибка
    }


    if (!comparePassword(user, password)) {
      return res.status(401).json({ message: 'Пароль неверен' }); // Ожидаемая ошибка
    }


    const token = Math.floor(Math.random() * 1000000);
    res.status(200).json({ userName: user.name, email, token });
  } catch (error) {

    console.error('Ошибка при входе:', error); // Логируем для команды поддержки
    res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже.' }); // Сообщение для пользователя
  }
});

module.exports = router;
