const PostLike = require("../models/PostLike");
const User = require("../models/User");
const Post = require("../models/Post");

//User liking a Post:

module.exports.userReaction = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const currentPost = await Post.findById(req.params.postId);

    if (!currentUser) {
      return res.json("Cannot find User");
    }

    if (!currentPost) {
      return res.json("Cannot find post");
    }

    let newReaction = new PostLike({
      user: currentUser._id,
      post: currentPost._id,
    });

    const result = await newReaction.save();

    if (result) {
      return res.json({
        message: `${currentUser.username} has liked the post`,
      });
    } else {
      return res.json({ message: "User reaction failed" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};
