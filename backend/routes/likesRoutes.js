import { Router } from "express";
import {
  likePost,
  unlikePost,
  getLikesCount,
  checkUserLiked,
} from "../controllers/likesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/:id/like", authMiddleware, likePost);
router.delete("/:id/like", authMiddleware, unlikePost);
router.get("/:id/likes-count", authMiddleware, getLikesCount);
router.get("/:id/check-like", authMiddleware, checkUserLiked);

export default router;
