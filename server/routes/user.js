const { getTripList, updateWishList } = require("../controllers/user.js")

const router = require("express").Router()

router.get("/:userId/trips", getTripList)
router.patch("/:userId/:listingId", updateWishList)

module.exports = router