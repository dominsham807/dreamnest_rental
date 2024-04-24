
const { createListing, getAllListings, searchListing, getSingleListing } = require("../controllers/listing.js")
const multer = require("multer") 

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

const router = require("express").Router()

router.post("/create", upload.array("listingPhotos"), createListing) 
router.get("/", getAllListings)
router.get("/search/:search", searchListing)
router.get("/:listingId", getSingleListing)

module.exports = router