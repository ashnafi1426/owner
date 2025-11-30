import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email, password) => {
  // 1️⃣ Fetch user by email
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("User not found");
  }

  // 2️⃣ Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // 3️⃣ Create JWT token (IMPORTANT: Your column is user_id)
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 4️⃣ Return user data without password
  return {
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      bio: user.bio
    },
    token
  };
};
