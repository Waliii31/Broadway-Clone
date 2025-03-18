import { Navigate, Outlet } from "react-router-dom";

export const PrivateAdmin = () => {
  const token = localStorage.getItem("token"); // Retrieve JWT from localStorage

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PrivateUser = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("jwtToken");

  return token ? <Outlet /> : <Navigate to="/user" replace />;
};