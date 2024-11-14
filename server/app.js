const express = require('express');
const login = require('./src/controllers/login')
const getUsers = require('./src/controllers/get-users');
const { User } = require('./src/models/user');  // Модель пользователя
const cors = require('cors');
const tweetRouter = require('./src/controllers/tweets.router');
const registerUser = require('./src/controllers/register');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', getUsers);

app.post('/user', registerUser);

app.use('/tweets', tweetRouter);
app.post('/login', login); 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
