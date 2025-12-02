const express = require("express");
const postController = require("../controllers/post");
const postLikeController = require("../controllers/postLike");
const postCommentController = require("../controllers/postComment");
const router = express.Router();
const auth = require("../auth");
const { verify } = auth;

//Create post
router.post("/new", verify, postController.newPost);

//Update post
router.put("/:postId", postController.updatePost);

//Delete post
router.delete("/:postId", postController.deletePost);

//Like a post
router.put("/:postId/like", verify, postLikeController.userReaction);

//Comment to a post
router.post("/:postId/comment", verify, postCommentController.userComment);

//Delete a comment
router.delete(
  "/:postId/comment/:commentId",
  postCommentController.deleteComment
);

module.exports = router;
