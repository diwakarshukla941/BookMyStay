const mongoose = require("mongoose");
const bookingModel = require("../models/booking.model");


async function createBooking(req, res) {
    try {
        const { listingId, checkIn, checkOut } = req.body;
        const booking = await bookingModel.create({
            listingId,
            userId: req.user.userId,
            checkIn,
            checkOut
        })
        return res.status(201).json({
            message: "Booking created successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function getBooking(req, res) {
    try {
        const booking = await bookingModel.find({userId:req.user.userId}).populate('listingId')
        return res.status(200).json({message:'your bookings:-',
            booking
         })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function getBookingById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid booking id"
            })
        }

        const booking = await bookingModel.findById(req.params.id).populate("listingId");
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        if (booking.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to view this booking"
            })
        }

        return res.status(200).json({
            message: "Booking found successfully!",
            booking
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function updateBooking(req,res) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid booking id"
            })
        }

        const booking = await bookingModel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        if (booking.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to update this booking"
            })
        }

        const { userId, ...updateData } = req.body;

        const updatedBooking = await bookingModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "Booking updated successfully!",
            booking: updatedBooking
        })
    }catch(error){
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function deleteBooking(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid booking id"
            })
        }

        const booking = await bookingModel.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        if (booking.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this booking"
            })
        }

        await booking.deleteOne();

        return res.status(200).json({
            message: "Booking deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

module.exports = {
    createBooking,
    getBooking,
    getBookingById,
    updateBooking,
    deleteBooking
}
