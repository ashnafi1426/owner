import React, { useState } from "react";
import { createPostDB, updatePostDB } from "../../../my-projectcd/src/services/postService.js";

const PostForm = ({ post, onSuccess }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content required");

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // ← IMPORTANT

      if (!token) {
        alert("You must be logged in.");
        return;
      }

      if (post) {
        // UPDATE
        await updatePostDB(token, post.post_id, { title, content });
      } else {
        // CREATE
        await createPostDB(token, { title, content });
      }

      setTitle("");
      setContent("");
      onSuccess(); // refresh post list
    } catch (err) {
      alert("Error: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
