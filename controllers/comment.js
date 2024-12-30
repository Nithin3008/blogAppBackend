import Comment from "../models/comment.js";
import User from "../models/user.js";

export const getPostComments = async (req, res) => {
  console.log(req.params.postId);
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "email img")
    .sort({ createdAt: -1 });
  console.log(comments);
  res.json(comments);
};

export const addComment = async (req, res) => {
  const userId = res.locals.userId;
  const postId = req.params.postId;

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ _id: userId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();

  res.status(201).json(savedComment);
};

export const deleteComment = async (req, res) => {
  const userId = res.locals.userId;
  const id = req.params.id;
  const comment = await Comment.findById(req.params.id);

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  if (userId === comment.user._id) {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json("Comment has been deleted");
  }

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }

  res.status(200).json("Comment deleted");
};
