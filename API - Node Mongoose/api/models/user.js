const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email: {
        type: String,
        index: { unique: true}
    },
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

/* use in postman to post object */
// {
//     "firstname": "Romario",
//     "lastname": "Soekhoe",
//     "email": "Romario@gmail.com",
//     "password": "secret"
// }