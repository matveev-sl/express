const { Tweet } = require('../models/tweet');
function checkUser(userName) {
  return true
}
module.exports = async (req, res) => {
  const { userName } = req.body;

  if (!userName) { 
    return res.status(400).json({ message: 'userName is required' });
  }
  if (!checkUser) {
    return res.status(401).json({message: 'password invalid'})
  }
   const token = Math.floor(Math.random() * 1000)
   res.status(200).json({userName, token})
};
