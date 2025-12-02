import React, { useState } from "react";

const CommentItem = ({ comment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    if (!content.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${comment.comment_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to update comment");

      setIsEditing(false);
      onUpdate();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${comment.comment_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete comment");

      onDelete();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      {/* Header: Username and Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <p className="font-semibold text-gray-800">{comment.users?.username || "Unknown"}</p>

        {comment.user_id === JSON.parse(atob(token.split(".")[1])).user_id && !isEditing && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 font-medium text-sm sm:text-base"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <textarea
            className="w-full sm:flex-1 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-gray-700 break-words">{comment.content}</p>
      )}
    </div>
  );
};

export default CommentItem;
