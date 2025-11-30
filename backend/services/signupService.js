import { supabase } from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs';

export const createUser = async ({ firstname, lastname, username, email, password, bio }) => {
  // 1️⃣ Check if email already exists
  const { data: existingEmail, error: emailError } = await supabase
    .from('users')
    .select('user_id')
    .eq('email', email)
    .single();

  if (emailError && emailError.code !== 'PGRST116') {
    // Ignore "no rows" error
    throw new Error(emailError.message);
  }

  if (existingEmail) {
    throw new Error('Email already exists');
  }

  // 2️⃣ Check if username already exists
  const { data: existingUsername, error: usernameError } = await supabase
    .from('users')
    .select('user_id')
    .eq('username', username)
    .single();

  if (usernameError && usernameError.code !== 'PGRST116') {
    throw new Error(usernameError.message);
  }

  if (existingUsername) {
    throw new Error('Username already exists');
  }

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️⃣ Insert new user
  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        bio: bio ?? null // if bio is undefined, store null
      }
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newUser;
};
