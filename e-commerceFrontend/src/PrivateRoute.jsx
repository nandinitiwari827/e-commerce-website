import React from "react";
import { Navigate, Outlet } from "react-router-dom";

let PrivateRoute = () => {
  let isAuthenticated = localStorage.getItem("accessToken"); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/"/>;
}

export default PrivateRoute
