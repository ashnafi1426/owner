// src/components/likes/LikeButton.jsx
import React, { useState, useEffect } from "react";
import { likePost, unlikePost, getLikesCount, checkUserLiked } from "../../services/likeService";

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

  const fetchLikes = async () => {
    try {
      const countData = await getLikesCount(postId);
      setCount(countData.count);

      if (token) {
        const userLiked = await checkUserLiked(postId, token);
        setLiked(userLiked.liked);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLike = async () => {
    try {
      if (!token) return alert("Please login to like posts");
      if (liked) {
        await unlikePost(postId, token);
        setLiked(false);
        setCount(prev => prev - 1);
      } else {
        await likePost(postId, token);
        setLiked(true);
        setCount(prev => prev + 1);
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId, token]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleLike}
        className={`px-3 py-1 rounded-md font-medium transition-colors ${liked ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
      >
        {liked ? "Liked" : "Like"}
      </button>
      <span className="text-gray-600">{count} {count === 1 ? "Like" : "Likes"}</span>
    </div>
  );
};

export default LikeButton;
