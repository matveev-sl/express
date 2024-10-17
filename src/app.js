const getUsers = require('./controllers/get-users');
const {User} = require('./models/user');

const express = require('express');

const app = express();
app.use(express.json());
app.get('/', getUsers);

app.post('/tweet',async (req, res) => {
  console.log('Received data:', req.body);
  const { name, lastName } = req.body;
  const user = new User({ name, lastName });

  try {
      await user.save();
      res.status(201).json({ message: 'User saved successfully', user });
  } catch (error) {
      console.log('Error: ', error)
      res.status(400).json({ message: 'Error saving user', error });
  }
});
// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
