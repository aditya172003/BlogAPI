const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    userId:{
      type:String,
      required:[true,"User id is required"]
    },
    title: {
      type: String,
      required: [true, "Please add the blog title"],
    },
    description: {
      type: String,
      required: [true, "Please add the blog description"],
    },
  },
  {
    timestamps: true,
  }
);




module.exports = mongoose.model("blog", blogSchema);
