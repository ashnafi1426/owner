import { supabase } from "../config/supabaseClient.js";
export const createPostDB = async ({ userId, title, content }) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ user_id: userId, title, content }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};
export const getAllPostsDB = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
export const getPostByIdDB = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("post_id", id)
    .maybeSingle(); // safer than .single()

  if (error) throw new Error(error.message);
  return data;
};
export const updatePostDB = async ({ id, title, content }) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, updated_at: new Date() })
    .eq("post_id", id)
    .select()
    .maybeSingle(); // allows 0 rows

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Post not found");

  return data;
};
export const deletePostDB = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("post_id", id)
    .select()
    .maybeSingle(); // allows 0 rows

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Post not found");

  return data;
};
