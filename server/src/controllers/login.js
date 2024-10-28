const { Tweet } = require('../models/tweet');

module.exports = async (req, res) => {
  const { userName } = req.body;

  if (!userName) { 
    return res.status(400).json({ message: 'userName is required' });
  }
   const token = Math.floor(Math.random() * 1000)
   res.status(200).json({userName, token})
};
