import { mainReduxBaseApi } from "./mainService";

export const authApi = mainReduxBaseApi.injectEndpoints({
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    signin: builder.mutation({
      query: (data) => {
        return {
          url: `/users?email=${data.email}&password=${data.password}`,
          method: "GET",
        };
      },
      invalidatesTags: ["auth"],
    }),
    getUser: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/users/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useSigninMutation,
  useUpdateUserMutation,
} = authApi;
