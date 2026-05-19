const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller');

const UserModel = require('../models/user.model');
const profileModel = require('../models/profile.model');


router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;