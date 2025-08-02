// ProtectedRoute.js
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}