import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const Dashboard = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <PostForm onSuccess={() => window.location.reload()} />
      <PostList />
    </div>
  );
};

export default Dashboard;
