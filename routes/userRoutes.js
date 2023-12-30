const express = require("express");
const userRouter = express.Router();
const Authentication = require('../middlewares/authenticate')
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
    uploadProfilePicture
} = require('../controllers/userControllers');
const uploadMiddleware = require("../middlewares/uploadImageMiddleware");




userRouter.post('/register', userResister);


userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic',Authentication,uploadMiddleware.single("profilepic"),uploadProfilePicture);

module.exports = userRouter