const express = require("express");

const router = express.Router();

const Authentication = require('../middlewares/authenticate')


const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getUsersBlogs,
} = require("../controllers/blogControllers");


router.get("/users", Authentication, getUsersBlogs);

router.get("/", getBlogs);



router.get("/:id", Authentication, getBlog);


router.post("/", Authentication, createBlog);


router.put("/:id", Authentication, updateBlog);



router.delete("/:id", Authentication, deleteBlog);

module.exports = router;
