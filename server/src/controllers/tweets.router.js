const {createTweet , getAllTweets} = require('../actions/tweets.actions');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
    const token = req.headers['x-token'];
    const userName = req.headers['x-user'];

    if (!token || !userName) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { text } = req.body; // Используем "text" вместо "body"
  
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
  
    
      const tweet = await createTweet( text,  userName );
      res.status(201).json({ message: 'Tweet created', tweet });
      // res.status(500).json({ message: 'Error creating tweet', error });
    
  });


router.get('/', async (req, res) => {
      
      const tweets = await getAllTweets();
      res.status(200).json(tweets);
    
      // console.error("ошибка фетч твитс" ,error)
      // res.status(500).json({ message: 'Error fetching tweets'});
      
  });

module.exports = router;

