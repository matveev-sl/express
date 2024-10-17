const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb://root:example@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
});

module.exports = mongoose


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
