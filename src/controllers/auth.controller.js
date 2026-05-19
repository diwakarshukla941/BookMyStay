const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require('../models/user.model');
const profileModel = require('../models/profile.model');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser) {
        return res.status(403).json({
            message:"The User with this email, Already exist!!"
        })
    }

    try {
        const user = await userModel.create({
            name,
            email,
            password
        });
        const profile = await profileModel.create({
            user: user._id,
            bio: "",
            phone: "",
            gender: "",
            dob: null,
            avatar: "",
            location: ""
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(201).json({ message: token, user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}


async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const existingProfile = await profileModel.findOne({ user: user._id });
    if (!existingProfile) {
        const profile = await profileModel.create({
            user: user._id,
            bio: "",
            phone: "",
            gender: "",
            dob: null,
            avatar: "",
            location: ""
        });
    }

    const token = jwt.sign({ userId: user._id, isHost: user.isHost }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            isHost: user.isHost
        },
        token
    })
}


module.exports = {
    register,
    login
}