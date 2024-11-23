const express = require('express');

const cors = require('cors');
const tweetRouter = require('./src/controllers/tweets.router');
const usersRouter = require ('./src/controllers/users.router')

const app = express();
app.use(cors());

app.use(express.json());
app.use('/users', usersRouter)

app.use('/uploads', express.static('uploads'));

app.use('/tweets', tweetRouter);

const PORT = 3000;
app.use( (err, req, res, next) => {
  console.log ("Вызвался мидлвейр")
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
