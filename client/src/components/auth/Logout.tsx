import { removeToken } from "@/features";
import { useAppDispatch } from "@/features/products/hooks/hooks";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  localStorage.removeItem("token");
  const dispatch = useAppDispatch();
  dispatch(removeToken());

  return <Navigate to="/signin" replace />;
};