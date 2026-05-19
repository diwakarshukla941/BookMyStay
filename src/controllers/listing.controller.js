const mongoose = require("mongoose");
const listingModel = require("../models/listing.model");


async function getListings(req, res) {
    try {
        const { location, minPrice, maxPrice } = req.query;
        const filter = {};

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (minPrice || maxPrice) {
            filter.price = {}
        }
        if (minPrice) {
            filter.price.$gte = + minPrice;

        }
        if (maxPrice) {
            filter.price.$lte = + maxPrice;

        }


        const listing = await listingModel.find(filter);
        res.json(listing)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!!!" });
    }
}

async function getListingById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing id"
            })
        }

        const listing = await listingModel.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                message: "Not Found!!"
            })
        }

        return res.status(200).json({
            message: "Listing Found!!",
            listing
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong!!"
        })
    }
}


async function createListing(req, res) {
    try {
        if (!req.user.isHost) {
            return res.status(403).json({
                message: "You are not authorized to create a list!"
            })
        }

        const { host, ...listingData } = req.body;

        const listing = await listingModel.create({
            ...listingData,
            host: req.user.userId
        })

        return res.status(201).json({
            message: "Listing created successfully",
            listing
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function updateListingById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing id"
            })
        }

        const listing = await listingModel.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                message: "Not Found!!"
            })
        }
        if (!listing.host) {
            return res.status(400).json({
                message: "Listing owner is missing on this record"
            })
        }

        if (listing.host.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not authorized to update a list!"
            })
        }

        const { host, ...updateData } = req.body;

        const updated = await listingModel.findByIdAndUpdate(req.params.id, updateData, { new: true })
        return res.status(200).json({
            message: "Updated Successfully!!",
            listing: updated
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something Went Wrong!!",
            error: error.message
        })
    }
}

async function deleteListingById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid listing id"
            })
        }
const listing = await listingModel.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: "Listing Not Found!" })
        }

        if (!listing.host) {
            return res.status(400).json({ message: "Listing owner is missing on this record" })
        }

        if (listing.host.toString() !== req.user.userId) {
            return res.status(403).json({ message: `Unauthorized!` })
        }

        await listing.deleteOne();
        return res.status(200).json({ message: `Deleted Successfully!` })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

async function getMyListing(req, res) {
    try {
        if (!req.user.isHost) {
            return res.status(403).json({
                message: "You are not authorized to see a list!"
            })
        }

        const listing = await listingModel.find({ host: req.user.userId });
        return res.json(listing);
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong!!"
        })
    }
}

module.exports = {
    getListings,
    getListingById,
    createListing,
    updateListingById,
    deleteListingById,
    getMyListing
}

module.exports = {
    getListings,
    getListingById,
    createListing,
    updateListingById,
    deleteListingById,
    getMyListing
}