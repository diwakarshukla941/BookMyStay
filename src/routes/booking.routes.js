const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth.middleware');
const { createBooking, getBooking, getBookingById, updateBooking, deleteBooking } = require('../controllers/booking.controller');


router.post('/',authMiddleware, createBooking);
router.get('/my-bookings',authMiddleware, getBooking);
router.get('/:id', authMiddleware, getBookingById);
router.put('/:id', authMiddleware, updateBooking);
router.delete('/:id', authMiddleware, deleteBooking);


module.exports = router;
