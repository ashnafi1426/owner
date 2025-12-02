// backend/routes/commentRoutes.js
import { Router } from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/:post_id", authMiddleware, createComment);
router.get("/:post_id", authMiddleware, getComments);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
