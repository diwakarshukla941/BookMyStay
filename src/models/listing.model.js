const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    location:String,
    images:[String],
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookingDates:[{start:Date,end:Date}],

})

const listingModel = mongoose.model('Listing', listingSchema);

module.exports = listingModel;
