import { createSlice } from "@reduxjs/toolkit";

let auth = JSON.parse(localStorage.getItem("isAuth"));
let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuth: auth,
  user: user,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state, action) => {
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("isAuth", JSON.stringify(false));
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
