import { supabase } from "../config/supabaseClient.js";
export const createCommentService = async (postId, userId, content) => {
  if (!userId) throw new Error("User ID is missing (auth failure)");
  if (!postId) throw new Error("Post ID is required");
  if (!content) throw new Error("Content is required");

  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: userId, content }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};
export const getCommentsByPostService = async (postId) => {
  if (!postId) throw new Error("Post ID is required");

  const { data, error } = await supabase
    .from("comments")
    .select(`
      comment_id,
      content,
      user_id,
      created_at,
      users:users!inner(username)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
export const updateCommentService = async (commentId, userId, content) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(error.message);
  return data[0] || null;
};
export const deleteCommentService = async (commentId, userId) => {
  if (!commentId) throw new Error("Comment ID is required");
  if (!userId) throw new Error("User ID is required");

  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(error.message);
  return data[0] || null;
};