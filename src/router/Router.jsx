import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import PageNotFound from "../pages/PageNotFound";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/user/userProfile";
import Loader from "../components/modules/Loader";

function Router() {
  const { data, isLoading, error } = useQuery(["profile"], getUserProfile);
  // console.log({ data, isLoading, error });
  if (isLoading) return <Loader />;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
