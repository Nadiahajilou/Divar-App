import React from "react";
import AddPosts from "../components/templates/AddPosts";
import PostList from "../components/templates/PostList";

function DashboardPage() {
  return (
    <div>
      <AddPosts />
      <PostList/>
    </div>
  );
}

export default DashboardPage;
