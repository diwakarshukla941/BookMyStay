const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isHost: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;
    }

    try{
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(this.password, salt);
        this.password = hash;
        return;
    }catch(err){
        return err;
    }
})

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;