import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authStorage } from "./authStorage";
import type { AuthState } from "./authTypes";

const token = authStorage.getToken();

const initialState: AuthState = {
    token,
    isAuthenticated: !!token
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            authStorage.setToken(action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            authStorage.removeToken();
        }
    }
});

export const { setCredentials, removeToken } = authSlice.actions;
export default authSlice.reducer;