const mongoose = require("mongoose");

const postLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const PostLike = mongoose.model("PostLike", postLikeSchema);
module.exports = PostLike;
