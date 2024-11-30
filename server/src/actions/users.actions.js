const { User} = require('../models/user');
const crypto = require('crypto');
async function getUserByEmail (email) {
    return await User.findOne({ email }).lean().then((dbuser) => {
        if (!dbuser) {
            return null
        }
        return {name: dbuser.name, email: dbuser.email}
    });
}
async function comparePassword (email, password ) {
 
    const hashPassword = crypto.createHash('sha256').update(password).digest('hex'); 
    const user = await User.findOne({ email }).lean()
    return user.password ===  hashPassword
}


async function createUser ({name,email, password}) {
    const hashPassword = crypto.createHash('sha256').update(password).digest('hex'); 
    const newUser = new User({ name, email, password : hashPassword });
    await newUser.save();
    return await getUserByEmail(email);
}
module.exports = {getUserByEmail:getUserByEmail, comparePassword: comparePassword, createUser: createUser}