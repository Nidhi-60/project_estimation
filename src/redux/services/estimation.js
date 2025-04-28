import { mainReduxBaseApi } from "./mainService";

export const estimationApi = mainReduxBaseApi.injectEndpoints({
  tagTypes: ["estimation"],
  endpoints: (builder) => ({
    estimation: builder.query({
      query: () => {
        return {
          url: "/estimations",
          method: "GET",
        };
      },
      providesTags: ["estimation"],
    }),
    addEstimation: builder.mutation({
      query: (data) => {
        return {
          url: "/estimations",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["estimation"],
    }),
    getEstimation: builder.query({
      query: (id) => {
        return {
          url: `/estimations/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["estimation"],
    }),
    updateEstimation: builder.mutation({
      query: (data) => {
        return {
          url: `/estimations/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["estimation"],
    }),
    deleteEstimation: builder.mutation({
      query: (data) => {
        return {
          url: `/estimations/${data.id}`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["estimation"],
    }),
  }),
});

export const {
  useEstimationQuery,
  useAddEstimationMutation,
  useUpdateEstimationMutation,
  useDeleteEstimationMutation,
  useGetEstimationQuery,
} = estimationApi;
