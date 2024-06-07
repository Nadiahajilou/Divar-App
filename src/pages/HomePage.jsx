import React from "react";
import Sidebar from "../components/templates/Sidebar";
import Main from "../components/templates/Main";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/user/userProfile";
import Loader from "../components/modules/Loader";

//elat inke usequery ro dar homepage tafir kardim in bod ke loader ro mikhaim neshn bedim
function HomePage() {
  const { data, isLoading } = useQuery(["post-list"], getAllPosts);
  console.log({ data, isLoading });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Main  posts={data}/>
        </div>
      )}
    </>
  );
}

export default HomePage;
