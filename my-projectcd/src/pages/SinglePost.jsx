// src/pages/SinglePost.jsx
import React, { useEffect, useState } from "react";
import { getComments, addComment, updateComment, deleteComment } from "../services/commentService.js";
import CommentForm from "../components/comments/CommentForm.jsx";
import CommentList from "../components/comments/CommentList.jsx";

const SinglePost = ({ postId, token, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(postId, token);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async (content) => {
    try {
      const newComment = await addComment(postId, content, token);
      setComments((prev) => [...prev, newComment]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateComment = async (id, content) => {
    try {
      const updated = await updateComment(id, content, token);
      setComments((prev) => prev.map((c) => (c.comment_id === id ? updated : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id, token);
      setComments((prev) => prev.filter((c) => c.comment_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList
        comments={comments}
        currentUserId={currentUser.user_id}
        onUpdate={handleUpdateComment}
        onDelete={handleDeleteComment}
      />
    </div>
  );
};

export default SinglePost;
