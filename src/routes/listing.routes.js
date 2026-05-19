const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const { getListings, getListingById, createListing, updateListingById, getMyListing, deleteListingById } = require('../controllers/listing.controller');


router.get('/', getListings);
router.get('/my-listing',authMiddleware, getMyListing)
router.get('/:id', getListingById);
router.post('/', authMiddleware, createListing)
router.put('/:id', authMiddleware, updateListingById)
router.delete('/:id', authMiddleware, deleteListingById);

module.exports = router;
