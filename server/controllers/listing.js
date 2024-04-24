const Listing = require("../models/Listing.js")

const createListing = async(req, res) => {
    try{
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body; 
        const listingPhotos = req.files
        if(!listingPhotos) {
            return res.status(400).send("No files uploaded")
        }
        
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        }) 
        await newListing.save()

        res.status(200).json(newListing)
    } catch(error){
        res.status(409).json({ message: "Failed to create new listing", error: error.message })
        console.log(error)
    }
}

const getAllListings = async(req, res) => {
    const qCategory = req.query.category 

    try{
        let listings 
        if(qCategory){
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else{
            listings = await Listing.find({})
        }

        res.status(200).json(listings)
    } catch(error){
        res.status(404).json({ message: "Failed to fetch listings", error: error.message })
        console.log(error)
    }
}

const searchListing = async(req, res) => {
    const { search } = req.params 

    try{
        let listings = []

        if(search === "all"){
            listings = await Listing.find({}).populate("creator")
        } else{
            listings = await Listing.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ]
            }).populate("creator")
        }

        res.status(200).json(listings)
    } catch(error){
        res.status(404).json({ message: "Failed to fetch listings", error: error.message })
        console.log(error)
    }
}

const getSingleListing = async(req, res) => { 
    try{
        const { listingId } = req.params 

        const listing = await Listing.findById(listingId).populate("creator")
      
        res.status(200).json(listing)
    } catch(error){
        res.status(404).json({ message: "Failed to fetch listing", error: error.message })
        console.log(error)
    }
}

module.exports = { createListing, getAllListings, searchListing, getSingleListing }