const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User.js")

const registerUser = async(req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body 
        const profileImage = req.file 
        console.log(profileImage)
        if(!profileImage){
            return res.status(400).send("No file uploaded")
        }

        const profileImagePath = profileImage.path 

        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(409).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt) 

        const newUser = new User({
            firstName, lastName, email, 
            password: hashedPassword,
            profileImagePath 
        })

        await newUser.save() 

        res.status(200).json({ 
            success: true, 
            message: "User registered successfully", 
            user: newUser 
        })
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body 

        const user = await User.findOne({ email })
        if(!user){
            return res.status(409).json({ message: "User does not exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Incorrect username or password!"})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        user.password = undefined

        res.status(200).json({ 
            success: true, 
            token, 
            user 
        })
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {registerUser, loginUser}