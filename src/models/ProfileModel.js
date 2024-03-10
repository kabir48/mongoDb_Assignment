const mongoose = require('mongoose');

let dataSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true, },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(password) {
                return password.length >= 6;
            },
            message: 'Password must be at least 6 characters',
        },
    },
}, { timestamp: true, versionKey: false });
let ProfileModel = mongoose.model('profiles', dataSchema);
module.exports = ProfileModel