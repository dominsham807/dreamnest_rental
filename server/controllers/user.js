const Booking = require("../models/Booking.js")
const User = require("../models/User.js")
const Listing = require("../models/Listing.js")

const getTripList = async(req, res) => {
    try{
        const { userId } = req.params
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
        trips.map((trip) => {
            trip.customerId.password = undefined
        })
        res.status(202).json(trips)
    } catch(error){
        console.log(error)
        res.status(404).json({ message: "Could not find trips!", error: error.message })
    }
}

const updateWishList = async(req, res) => {
    try{
        const { userId, listingId } = req.params
        const user = await User.findById(userId)
        const listing = await Listing.findById(listingId).populate("creator")

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        if(favoriteListing){
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()

            res.status(200).json({
                success: true,
                message: "Listing removed from your wishlist",
                wishlist: user.wishList
            })
        } else{
            user.wishList.push(listing)
            await user.save()

            res.status(200).json({
                success: true,
                message: "Listing added to your wishlist",
                wishlist: user.wishList
            })
        }
        // res.status(200).json(favoriteListing)
    } catch(error){
        console.log(error)
        res.status(404).json({ message: "Could not update wishlist!", error: error.message })
    }
}

module.exports = { getTripList, updateWishList }