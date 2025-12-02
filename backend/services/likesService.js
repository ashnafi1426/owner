import { supabase } from "../config/supabaseClient.js";

// Check if user already liked the post
export const checkUserLikedService = async (postId, userId) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error && error.code !== "PGRST116") throw new Error(error.message);

  return !!data; // true if liked
};

// Like post
export const likePostService = async (postId, userId) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ post_id: postId, user_id: userId }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// Unlike post
export const unlikePostService = async (postId, userId) => {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// Get total likes count
export const getLikesCountService = async (postId) => {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw new Error(error.message);

  return count;
};
