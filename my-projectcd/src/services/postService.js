const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getAllPostsDB = async () => {
  const res = await fetch(`${BASE_URL}/api/posts`);
  return res.json();
};

export const createPostDB = async (token, post) => {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updatePostDB = async (token, id, post) => {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePostDB = async (token, id) => {
  const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};
