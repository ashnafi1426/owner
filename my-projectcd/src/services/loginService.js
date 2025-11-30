const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/auth/login`;

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!res.ok) throw new Error(data.message || "Login failed");

    if (data.token) localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    throw new Error(err.message || "Login request failed");
  }
};
