// src/components/likes/LikesList.jsx
import React, { useEffect, useState } from "react";
import { getLikesList } from "../../services/likeService";

const LikesList = ({ postId }) => {
  const [likes, setLikes] = useState([]);

  const fetchLikes = async () => {
    try {
      const data = await getLikesList(postId);
      setLikes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  if (likes.length === 0) return <p className="text-gray-500 text-sm mt-1">No likes yet</p>;

  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {likes.map((user) => (
        <span
          key={user.user_id}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
        >
          {user.username}
        </span>
      ))}
    </div>
  );
};

export default LikesList;
