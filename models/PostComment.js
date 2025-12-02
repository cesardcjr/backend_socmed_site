const mongoose = require("mongoose");

const postCommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const PostComment = mongoose.model("PostComment", postCommentSchema);
module.exports = PostComment;
