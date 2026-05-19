const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const profileController = require('../controllers/profiler.controller');

router.get('/', authMiddleware.authMiddleware,  profileController.getProfile);
router.post('/', authMiddleware.authMiddleware, profileController.createProfile);
router.put('/', authMiddleware.authMiddleware, profileController.updateProfile);
router.delete('/', authMiddleware.authMiddleware, profileController.deleteProfile);
module.exports = router;
