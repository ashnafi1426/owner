import React from "react";

const PostItem = ({ post, token, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post.post_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onDelete(post.post_id);
  };

  return (
    <div className="border p-4 rounded mb-2">
      <h3 className="font-bold">{post.title}</h3>
      <p>{post.content}</p>
      <p className="text-sm text-gray-500">By: {post.users?.username || "Unknown"}</p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onEdit(post)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
