const { User} = require('../models/user');

module.exports =  getUsers = async () => {
    return User.find();
}
