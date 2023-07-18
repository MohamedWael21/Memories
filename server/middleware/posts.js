const mongoose = require("mongoose");
const Post = require("../models/posts");
const validateId = async (req, res, next) => {
  const { id } = req.params;
  //   console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Post with this id" });
  }
  let post = await Post.find({ _id: id });
  if (post.length == 0) {
    return res.status(404).json({ error: "No Post with this id" });
  }
  next();
};

module.exports = { validateId };
