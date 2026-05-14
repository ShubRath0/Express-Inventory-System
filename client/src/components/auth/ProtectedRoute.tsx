import { useAuth } from "@/features";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};