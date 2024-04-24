const { registerUser, loginUser } = require("../controllers/auth.js") 
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

router.post("/register", upload.single("profileImage"), registerUser)
router.post("/login", loginUser)

module.exports = router