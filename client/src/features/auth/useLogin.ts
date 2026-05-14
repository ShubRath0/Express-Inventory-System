import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLogin as useLoginMutation } from "@/api/__generated__/auth-controller/auth-controller";
import type { LoginRequest } from "@/api/__generated__/types.schemas";
import { setCredentials } from "./authSlice";

import type { AppDispatch } from "@/app/Store";

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const mutation = useLoginMutation();

    const login = async (data: LoginRequest) => {
        const res = await mutation.mutateAsync({ data }); 

        const token = res.data?.token ?? "";

        if (!token) {
            throw new Error("Failed to sign in user");
        }
        dispatch(setCredentials(res.data?.token ?? "")); 
        navigate("/dashboard"); 
        
        return res;
    }; 
    return {
        login,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error
    }
};