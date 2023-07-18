const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  searchPosts,
  getPost,
  addComment,
} = require("../controller/posts");
const { validateId } = require("../middleware/posts");
const { isAuth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const uploadFolder = path.join(
  path.dirname(require.main.filename),
  "public",
  "images"
);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]); //Appending .jpg
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", validateId, getPost);
router.post("/", isAuth, upload.single("selectedFile"), createPost);
router.patch(
  "/:id",
  isAuth,
  validateId,
  upload.single("selectedFile"),
  updatePost
);
router.post("/:id/comment", isAuth, validateId, addComment);
router.patch("/:id/like", isAuth, validateId, likePost);
router.delete("/:id", isAuth, validateId, deletePost);

module.exports = router;
