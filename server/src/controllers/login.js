const { User } = require('../models/user'); // предполагаем, что модель пользователя называется User

async function checkUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    return null; // пользователь с таким email не найден
  }
  // Предполагаем, что пароли хранятся в зашифрованном виде
  const isPasswordValid = user.password === password; // Проверьте на хешированный пароль (например, bcrypt)
  return isPasswordValid ? user : null;
}

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await checkUser(email, password);

  if (!user) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: 'Invalid password' });
    } else {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }
  }

  // Генерация токена
  const token = Math.floor(Math.random() * 1000000);

  // Отправляем ответ с именем пользователя и токеном
  res.status(200).json({ userName: user.name, email, token });
};
