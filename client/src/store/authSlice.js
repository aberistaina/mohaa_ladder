import { createSlice } from "@reduxjs/toolkit";

// Leer el estado inicial desde localStorage
const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
    player: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: storedAuth,
    reducers: {
        login: (state, action) => {
            state.player = action.payload.player;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("auth", JSON.stringify(state)); // Guardar en localStorage
        },
        logout: (state) => {
            state.player = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth"); // Eliminar de localStorage
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
