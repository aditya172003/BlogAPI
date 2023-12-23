const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/blogModels");

//@desc Get all blog
//@route GET /api/blogs
//@access public
const getBlogs = expressAsyncHandler(async (req, res) => {
  console.log("Forwerded 3")
  const blog = await Blog.find();
  res.status(200).json(blog);
});






//@desc Get blog
//@route GET /api/blog/:id
//@access authorized
const getBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  res.status(200).json(blog);
});




//@desc Get logged in users all blogs
//@route GET /api/blog/users
//@access authorized
const getUsersBlogs = expressAsyncHandler(async (req, res) => {

  const blogs = await Blog.find({ userId: req.rootuserId })

  if (!blogs) {
    res.send(404);
    throw new Error("Blogs not found");
  }
  res.status(200).json(blogs);
})






//@desc Create New blog
//@route POST /api/blog:id
//@access authorized
const createBlog = expressAsyncHandler(async (req, res) => {
  console.log("The Request body is", req.body);
  const { title, description } = req.body;
  const userId = req.rootuser._id;
  if (!title || !description || !userId) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const blog = await Blog.create({
    userId,
    title,
    description
  });
  res.status(201).json(blog);
});





//@desc Update blog
//@route PUT /api/blog:id
//@access authorized
const updateBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedBlog);
});





//@desc Delete blog
//@route DELETE /api/blog:id
//@access autorized
const deleteBlog = expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  await Blog.findByIdAndRemove(req.params.id);
  res.status(200).json(blog);
});






module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getUsersBlogs,
};
