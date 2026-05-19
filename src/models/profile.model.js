const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bio: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date
    },
    avatar: {
        type: String
    },
    location: {
        type: String
    },

}, {
    timestamps: true
})

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;