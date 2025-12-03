import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../services/userService";

function ProfilePage() {
  const { id } = useParams(); // use id from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile(id);
        const userPosts = await getUserPosts(id);
        setUser(profile);
        setPosts(userPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
      <p className="text-gray-600 mb-4">{user.bio || "No bio provided."}</p>

      <h2 className="text-xl font-semibold mb-2">Posts by {user.username}</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="p-4 mb-3 border rounded shadow-sm hover:shadow-md">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-700 mt-1">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePage;
