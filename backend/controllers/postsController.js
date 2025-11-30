import {
  createPostDB,
  getAllPostsDB,
  getPostByIdDB,
  updatePostDB,
  deletePostDB,
} from "../services/postService.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.user_id;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const post = await createPostDB({ userId, title, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (_req, res) => {
  try {
    const posts = await getAllPostsDB();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;
    const { title, content } = req.body;

    const post = await getPostByIdDB(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user_id !== userId) return res.status(403).json({ message: "Unauthorized" });

    const updated = await updatePostDB({ id, title, content });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const post = await getPostByIdDB(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user_id !== userId) return res.status(403).json({ message: "Unauthorized" });

    await deletePostDB(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
