// src/services/likesService.js
export const likePost = async (postId, token) => {
  const res = await fetch(`http://localhost:5000/api/likes/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to like post");
  }
  return res.json();
};

export const unlikePost = async (postId, token) => {
  const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to unlike post");
  }
  return res.json();
};

export const getLikesCount = async (postId) => {
  const res = await fetch(`http://localhost:5000/api/posts/${postId}/likes-count`);
  if (!res.ok) throw new Error("Failed to fetch likes count");
  return res.json();
};

export const checkUserLiked = async (postId, token) => {
  const res = await fetch(`http://localhost:5000/api/posts/${postId}/check-like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to check like status");
  return res.json(); // { liked: true/false }
};