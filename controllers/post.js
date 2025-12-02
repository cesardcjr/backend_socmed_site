const Post = require("../models/Post");

//New Post:

module.exports.newPost = async (req, res) => {
  try {
    let post = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    const result = await post.save();

    if (result) {
      res.json({ message: "Posted successfully", post: result });
    } else {
      res.json({ message: "Post wasn't posted due to error" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const updatedPost = {
      title: req.body.title,
      content: req.body.content,
    };

    const findPost = await Post.findByIdAndUpdate(
      req.params.postId,
      updatedPost
    );
    if (findPost) {
      return res.json({ message: "Post is updated successfully" });
    } else {
      return res.json({ message: "Post update failed" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const findPost = await Post.findByIdAndDelete(req.params.postId);
    if (findPost) {
      return res.json({ message: "Post is deleted successfully" });
    } else {
      return res.json({ message: "Post deletion failed" });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};
