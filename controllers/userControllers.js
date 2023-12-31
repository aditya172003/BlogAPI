
const User = require('../models/userModels');
const expressAsyncHandler = require("express-async-handler");


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


//@desc User register
//@route GET /api/user/register
//@access public
exports.userResister = async (req, res) => {

    console.log('Called ');
    const { name, phone, email, password } = req.body;



    if (!name || !phone || !email || !password) {
        return res.status(400).send("Enter the data first");
    }

    const obj = await User.findOne({ email });

    if (obj) {

        return res.status(409).send("User has resgistrerd already ");

    }
    try {
        const newUser = await new User({ name, email, phone, password });





        await User.create(newUser);
        res.status(200).send("User rigistered successfully");

    }
    catch {
        console.log(err);
        res.status(500).send("internal server error");
    }


}




//@desc User Login
//@route GET /api/user/login
//@access public
exports.userLogin = async (req, res) => {

    const { email, password } = req.body;

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: "Enter the data first " });
    }
    const us = await User.findOne({ email })

    if (us) {


        const isMatch = await bcrypt.compare(password, us.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password")
        }



        const token = await us.generateAuthToken()



        res.cookie("jwtoken", token, {

            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });




        (token) ? res.status(200).send({
            message: "login success", jwtoken: token
        }).status(200) : res.status(500).json({ message: "Internal server error" });



    } else {
        res.status(404).send({ message: "User not found please register first" })

    }

}




//@desc User Logout
//@route GET /api/user/logout
//@access authorized
exports.userLogout = async (req, res) => {
    try {

        res.cookie('jwtoken', '', { maxAge: 1 });
        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}


//@desc User information
//@route GET /api/user/getuser
//@access private
exports.getUser = async (req, res) => {
    const user = await User.findOne({_id:req.rootuser._id})
    res.status(200).send(user);
}





//@desc User profile updation
//@route GET /api/user/updateprofile
//@access authorized
exports.userProfileUpdate = async (req, res) => {
    const userId = req.rootuser._id;

    const { name, email, phone } = req.body;
    await User.findOneAndUpdate({ _id: userId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((user) => {
            console.log(user);
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


exports.uploadProfilePicture = async (req,res)=>{
    const userId = req.rootuser._id;
     

    const profilepic =req.file.filename;


    User.findOneAndUpdate({_id:userId},{$set:{profilepic}})
    .then((resp)=>{
        res.status(200).send("profile picture uploaded successfully");

    })
    .catch((e)=>{ 
        res.status(500).send("internal server error");
    })


}
