import React, { useEffect, useState } from "react";
import { getAllPostsDB, deletePostDB } from "../services/postService";
import PostForm from "./PostForm";
import CommentList from "./comments/CommentList"; // ✅ import CommentList

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    const data = await getAllPostsDB();
    setPosts(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      const result = await deletePostDB(token, id);

      if (result.message === "Post deleted successfully") {
        fetchPosts();
      } else {
        alert("Failed to delete post: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Posts</h2>

      {/* Post editing form */}
      {editingPost && (
        <PostForm
          post={editingPost}
          onSuccess={() => {
            setEditingPost(null);
            fetchPosts();
          }}
        />
      )}

      {/* Posts list */}
      {posts.map((post) => (
        <div key={post.post_id} className="border p-3 mb-4 rounded">
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
          <small>By: {post.users.username}</small>

          {/* Post actions */}
          <div className="mt-2 mb-2">
            <button
              onClick={() => setEditingPost(post)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.post_id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>

          {/* ✅ Comments section */}
          <CommentList postId={post.post_id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
