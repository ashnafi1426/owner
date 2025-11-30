const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/auth/signup`;

export const registerUser = async (userData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!res.ok) throw new Error(data.message || "Signup failed");

    return data;
  } catch (err) {
    throw new Error(err.message || "Signup request failed");
  }
};
