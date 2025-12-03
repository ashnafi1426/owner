const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Fetch user profile by ID
 * @param {string | number} userId
 * @returns {Promise<Object>} user profile
 */
export const getUserProfile = async (user_Id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${user_Id}`);

    // If server returned an error status
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch user profile");
    }

    // Parse JSON safely
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch user profile");
  }
};

/**
 * Fetch posts by user ID
 * @param {string | number} userId
 * @returns {Promise<Array>} user posts
 */
export const getUserPosts = async (user_Id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${user_Id}/posts`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch user posts");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch user posts");
  }
};
