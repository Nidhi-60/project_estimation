import { createSlice } from "@reduxjs/toolkit";

let defaulLang = JSON.parse(localStorage.getItem("lang")) || "en";
let defaultTheme = JSON.parse(localStorage.getItem("theme")) || "light";

const initialState = {
  lang: defaulLang,
  theme: defaultTheme,
};

export const globalConfigSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", JSON.stringify(action.payload));
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { changeLanguage, changeTheme } = globalConfigSlice.actions;

export default globalConfigSlice.reducer;
