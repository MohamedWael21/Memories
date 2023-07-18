const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    creatorName: String,
    tags: [String],
    selectedFile: String,
    comments: { type: [String], default: [] },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
