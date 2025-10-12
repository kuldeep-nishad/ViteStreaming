import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check session

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
