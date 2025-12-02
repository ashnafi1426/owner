import React, { useState } from "react";

const CommentForm = ({ postId, onSuccess }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      setContent("");
      onSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <textarea
        className="w-full p-2 border rounded mb-1"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
