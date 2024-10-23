const getUsers = require('../actions/get-users');

module.exports =  async (req, res) => {
    const users = await getUsers()
    res.status(200).json(users)
}
