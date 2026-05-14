import { useSelector } from "react-redux";
import type { RootState } from "@/app/Store";

export const useAuth= () => {
    return useSelector((state: RootState) => state.auth);
}