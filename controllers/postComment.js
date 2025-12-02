const PostComment = require("../models/PostComment");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports.userComment = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const currentPost = await Post.findById(req.params.postId);

    let newComment = new PostComment({
      comment: req.body.comment,
      user: currentUser._id,
      post: currentPost._id,
    });

    const postComment = await newComment.save();

    if (postComment) {
      return res.json({
        message: `${currentUser.username} has commented on you post`,
      });
    } else {
      return res.json({ message: "Comment failed to post" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const currentComment = await PostComment.findByIdAndDelete(
      req.params.commentId
    );

    if (currentComment) {
      return res.json({ message: "Comment deleted" });
    } else {
      return res.json({ message: "Delete comment failed" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};
