// backend/controllers/commentController.js
import {
  createCommentService,
  getCommentsByPostService,
  updateCommentService,
  deleteCommentService,
} from "../services/commentService.js";

export const createComment = async (req, res) => {
  try {
    const { post_id } = req.params;
    const userId = req.user.user_id;   // ✅ FIXED: correct property
    const { content } = req.body;

    const newComment = await createCommentService(post_id, userId, content);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await getCommentsByPostService(post_id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;  // ✅ FIXED
    const { content } = req.body;

    const updatedComment = await updateCommentService(id, userId, content);
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found or not yours" });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;  // ✅ FIXED

    const deletedComment = await deleteCommentService(id, userId);
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found or not yours" });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
