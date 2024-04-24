const { createBooking } = require("../controllers/booking.js")

const router = require("express").Router()

router.post("/create", createBooking)

module.exports = router