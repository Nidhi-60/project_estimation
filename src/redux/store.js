import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slice/counterSlice";
import globalConfigReducer from "./Slice/configSlice";
import authReducer from "./Slice/authSlice";
import { userApi } from "./services/users";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/auth";
import { projectApi } from "./services/projects";
import { estimationApi } from "./services/estimation";

const reducer = combineReducers({
  counter: counterReducer,
  globalConfig: globalConfigReducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [estimationApi.reducerPath]: estimationApi.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...new Set([
        userApi.middleware,
        authApi.middleware,
        projectApi.middleware,
        estimationApi.middleware,
      ])
    ),
});

setupListeners(store.dispatch);
