const Post = require("../models/posts");
const fs = require("fs");
const path = require("path");

const getPosts = async (req, res) => {
  const { page } = req.query;
  const POST_PER_PAGE = 4;
  try {
    const numberOfPosts = await Post.find().countDocuments();
    const numberOfPages = Math.ceil(numberOfPosts / POST_PER_PAGE);
    if (page > numberOfPages || page <= 0) {
      return res.status(404).json({ posts: [] });
    }
    const skipPosts = (page - 1) * POST_PER_PAGE;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(POST_PER_PAGE)
      .skip(skipPosts);
    res.status(200).json({ posts, currentPage: page, numberOfPages });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const createPost = async (req, res) => {
  const postData = req.body;
  if (req.file) {
    const uploadedFileName = `http://localhost:4000/images/${req.file.filename}`;
    postData.selectedFile = uploadedFileName;
  }
  try {
    postData.tags = postData.tags.split(",");
    const newPost = new Post(postData);
    newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const updatePost = async (req, res) => {
  const postData = req.body;
  const { id } = req.params;
  try {
    postData.tags = postData.tags.split(",");
    let post = await Post.findById(id);
    if (post.creator !== req.userId) {
      return res.status(401).json({ error: "You can't update this Post" });
    }
    if (req.file) {
      if (post.selectedFile) {
        let fileName = post.selectedFile.split("/").pop();
        fs.unlinkSync(
          path.join(
            path.dirname(require.main.filename),
            "public",
            "images",
            fileName
          )
        );
      }
      const uploadedFileName = `http://localhost:4000/images/${req.file.filename}`;
      postData.selectedFile = uploadedFileName;
    }
    post = await Post.findByIdAndUpdate(id, postData, { new: true });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findById(id);
    if (post.creator !== req.userId) {
      return res.status(401).json({ error: "You can't Delete this Post" });
    }
    if (post.selectedFile) {
      let fileName = post.selectedFile.split("/").pop();
      fs.unlinkSync(
        path.join(
          path.dirname(require.main.filename),
          "public",
          "images",
          fileName
        )
      );
    }
    post = await Post.findByIdAndDelete(id);
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await Post.findById(id);
    const likes = post.likes;
    if (!likes.includes(req.userId)) {
      likes.push(req.userId);
    } else {
      likes.splice(likes.indexOf(req.userId), 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const searchPosts = async (req, res) => {
  const { search, tags } = req.query;
  try {
    if (!search && !tags) {
      throw new Error("You should specify searchterm or tag");
    }
    const searchQuery = new RegExp(search, "i");
    const posts = await Post.find({
      $or: [{ title: searchQuery }, { tags: { $in: tags?.split(",") } }],
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: "comment can't be empty" });
  }
  try {
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  searchPosts,
  getPost,
  addComment,
};
