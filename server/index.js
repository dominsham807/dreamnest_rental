const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv") 
const cors = require("cors")

dotenv.config()

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

const PORT = 4000
// console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
    dbName: "dream_nest",
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
}).catch((err) => {
    console.log(err)
}) 