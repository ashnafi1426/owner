import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../services/userService";
import { createPostDB } from "../services/postService";
import PostForm from "./PostForm";
import PostList from "./PostList";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const user = await getUserProfile(userId);
        const userPosts = await getUserPosts(userId);
        setProfile(user);
        setPosts(userPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  const handlePostAdded = async (post) => {
    try {
      const newPost = await createPostDB(userId, post);
      setPosts([newPost, ...posts]);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {profile.fullname || profile.username}
      </h2>

      <PostForm onSuccess={handlePostAdded} />
      <PostList posts={posts} />
    </div>
  );
}

export default Dashboard;
