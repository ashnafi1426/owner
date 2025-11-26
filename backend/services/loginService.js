import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email, password) => {
  // Fetch user from Supabase table
  const { data: user, error } = await supabase
    .from('users')  // Make sure your table name is 'user' or adjust
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('User not found');
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET, // your env variable must be JWT_SECRET (case-sensitive)
    { expiresIn: "1h" }
  );

  return { user: { id: user.id, email: user.email }, token };
};
