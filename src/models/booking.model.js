const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    listingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    checkIn: Date,
    checkOut: Date
})


const bookingModel = mongoose.model('Booking', bookingSchema)

module.exports = bookingModel;
