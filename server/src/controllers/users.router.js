const { Router } = require('express');
const { getUserByEmail, createUser, comparePassword, } = require('../actions/users.actions');
const router = Router();

router.post('/register',  async (req, res) => {
  const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'Этот email уже занят' });
    }
    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
});

router.post ('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await getUserByEmail(email);

  if (!user) {
  return res.status(404).json({message: 'Пользователь с таким Email не существует'})
  }
  if (!comparePassword(user, password) ) {
  return res.status(401).json({message: 'Пароль не верен'})
  }
  const token = Math.floor(Math.random() * 1000000);

  // Отправляем ответ с именем пользователя и токеном
  res.status(200).json({ userName: user.name, email, token });
});

module.exports = router;