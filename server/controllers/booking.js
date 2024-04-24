const Booking = require("../models/Booking.js")
const User = require("../models/User.js")

const createBooking = async(req,res) => {
    try{
        const { customerId, hostId, listingId, startDate, endDate, numOfNights, totalPrice } = req.body 

        const newBooking = new Booking({
            customerId, hostId, listingId, startDate, endDate, numOfNights, totalPrice
        })
        await newBooking.save()

        const user = await User.findById(customerId)
        user.tripList.push(newBooking)
        await user.save()
        
        res.status(200).json(newBooking)
    } catch(error){
        console.log(error)
        res.status(400).json({ message: "Failed to create booking!", error })
    }
}

module.exports = { createBooking }
