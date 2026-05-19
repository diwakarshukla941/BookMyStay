const profileModel = require('../models/profile.model');


async function getProfile(req, res) {
    try {
        const profile = await profileModel.findOne({ user: req.user.userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: profile });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function createProfile(req, res) {
    try {
        const profileData = { ...req.body, user: req.user.userId };
        const existingProfile = await profileModel.findOne({ user: req.user.userId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }
        const profile = await profileModel.create(profileData);
        res.status(201).json({ message: profile });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function updateProfile(req, res) {
    try {
        const profileData = { ...req.body };
        const profile = await profileModel.findOneAndUpdate({ user: req.user.userId }, profileData, { new: true });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: profile });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function deleteProfile(req, res) {
    try {
        const profile = await profileModel.findOneAndDelete({ user: req.user.userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
}