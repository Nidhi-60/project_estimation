import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosInterceptor";

export const mainBaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_LINK }),
  endpoints: () => ({}),
});

export const mainReduxBaseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_LINK }),
  endpoints: () => ({}),
});
