const { User} = require('../models/user');

async function getUserByEmail (email) {
    return await User.findOne({ email }).lean();
}
function comparePassword (user,password ) {
 return user.password === password   
}

async function createUser ({name,email,password}) {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return await getUserByEmail(email);
}
module.exports = {getUserByEmail:getUserByEmail, comparePassword: comparePassword, createUser: createUser}