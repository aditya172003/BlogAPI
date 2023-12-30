const express = require("express");
const adminRoutes = express.Router();
const adminAuthentication = require('../middlewares/adminAuthentication')
const {
    adminResister,
    adminLogin,
    adminLogout,
    getAdmin,
    adminProfileUpdate,
    updateUserInfo,
    deleteUser,
    userResister,
    getAllUsers
} = require('../controllers/adminControllers');

const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getUsersBlogs,
  } = require("../controllers/blogControllers");
  
  

adminRoutes.post('/register', adminResister);

adminRoutes.post('/login', adminLogin);

adminRoutes.put('/updateprofile', adminAuthentication, adminProfileUpdate);

adminRoutes.get('/logout', adminAuthentication, adminLogout);

adminRoutes.get('/getadmin', adminAuthentication, getAdmin);

adminRoutes.put('/updateuser/:id',adminAuthentication,updateUserInfo);

adminRoutes.delete('/deleteuser/:id',adminAuthentication,deleteUser);

adminRoutes.post('/registeruser/',adminAuthentication,userResister);

adminRoutes.get('/getallusers',adminAuthentication,getAllUsers);

adminRoutes.get("/users", adminAuthentication, getUsersBlogs);

adminRoutes.get("/:id", adminAuthentication, getBlog);

adminRoutes.post("/", adminAuthentication, createBlog);

adminRoutes.put("/:id", adminAuthentication, updateBlog);

adminRoutes.delete("/:id", adminAuthentication, deleteBlog);



module.exports = adminRoutes;

