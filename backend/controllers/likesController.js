import {
  likePostService,
  unlikePostService,
  getLikesCountService,
  checkUserLikedService
} from "../services/likesService.js";

// Like a post
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.user_id;

  try {
    const alreadyLiked = await checkUserLikedService(postId, userId);

    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked this post" });
    }

    const data = await likePostService(postId, userId);

    res.status(201).json({
      message: "Post liked successfully",
      like: data
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.user_id;

  try {
    const data = await unlikePostService(postId, userId);

    if (!data) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get number of likes
export const getLikesCount = async (req, res) => {
  const postId = req.params.id;

  try {
    const count = await getLikesCountService(postId);

    res.status(200).json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Check if current user liked
export const checkUserLiked = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.user_id;

  try {
    const liked = await checkUserLikedService(postId, userId);

    res.status(200).json({ liked });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
