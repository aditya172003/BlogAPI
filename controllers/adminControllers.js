
const User = require('../models/userModels');
const expressAsyncHandler = require("express-async-handler");
const Admin = require('../models/adminModels');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const { userLogout } = require('./userControllers');


//@desc Admin register
//@route GET /api/admin/register
//@access public
exports.adminResister = async (req, res) => {


    const { name, phone, email, password } = req.body;



    if (!name || !phone || !email || !password) {
        return res.status(400).send("Enter the data first");
    }

    const obj = await Admin.findOne({ email });

    if (obj) {

        return res.status(409).send("Admin has resgistrerd already ");

    }
    try {
        const newAdmin = await new Admin({ name, email, phone, password });





        await Admin.create(newAdmin);
        res.status(200).send("Admin rigistered successfully");

    }
    catch {
        console.log(err);
        res.status(500).send("internal server error");
    }


}




//@desc Admin Login
//@route GET /api/admin/login
//@access public
exports.adminLogin = async (req, res) => {

    const { email, password } = req.body;



    if (!email || !password) {
        return res.status(400).json({ message: "Enter the data first " });
    }
    const as = await Admin.findOne({ email })

    if (as) {


        const isMatch = await bcrypt.compare(password, as.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password")
        }



        const token = await as.generateAuthToken()



        res.cookie("jwtoken", token, {

            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });




        (token) ? res.status(200).send({
            message: "login success", jwtoken: token
        }).status(200) : res.status(500).json({ message: "Internal server error" });



    } else {
        res.status(404).send({ message: "Admin not found please register first" })

    }

}




//@desc Admin Logout
//@route GET /api/admin/logout
//@access authorized
exports.adminLogout = async (req, res) => {
    try {

        res.cookie('jwtoken', '', { maxAge: 1 });
        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}


//@desc Admin information
//@route GET /api/admin/getuser
//@access private
exports.getAdmin = async (req, res) => {
    const admin = await Admin.findOne({_id:req.rootuser._id});
    res.status(200).send(admin);
}





//@desc User profile updation
//@route GET /api/admin/updateprofile
//@access authorized
exports.adminProfileUpdate =  (req, res) => {
    const adminId = req.rootuser._id;

    const { name, email, phone } = req.body;
    Admin.findOneAndUpdate({ _id: adminId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((admin) => {
            console.log(admin);
            res.status(200).send(admin);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


exports.updateUserInfo = async (req,res)=>{
    const userId = req.params.id;

    const { name, email, phone } = req.body;
      User.findOneAndUpdate({ _id: userId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((user) => {
          
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


exports.deleteUser = async (req,res)=>{
    const userId = req.params.id;

    try{
        await User.deleteOne({_id:userId});
      
        res.status(200).json({message:"User deleted"})
    }
    catch(e)
    {
        res.status(500).json({message:"Internal server error"})
    }


        
}

exports.userResister = async (req, res) => {

  
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

exports.getAllUsers = async (req,res)=>{

    try{
        const data =  await User.find();
        res.status(200).json(data);
    }
    catch(e)
    {
        res.status(500).json({message:"Internal server error"})
    }


}