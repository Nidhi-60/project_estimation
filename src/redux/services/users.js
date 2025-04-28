import { mainReduxBaseApi } from "./mainService";

export const userApi = mainReduxBaseApi.injectEndpoints({
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    addUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = userApi;
