import { checkAuth, useAuth } from "@/features";
import { useAppDispatch } from "@/features/products/hooks/hooks";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    dispatch(checkAuth());
  }, [location.pathname, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};