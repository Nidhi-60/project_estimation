import parseRequest from "../../utils/parseRequest";
import { mainReduxBaseApi } from "./mainService";

export const projectApi = mainReduxBaseApi.injectEndpoints({
  tagTypes: ["projects"],
  endpoints: (builder) => ({
    projects: builder.query({
      query: (data) => {
        let url = "/projects";

        let parsedURL = parseRequest(url, data);

        return {
          url: parsedURL,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),
    getProject: builder.query({
      query: (id) => {
        return {
          url: `/projects/${id}`,
          method: "GET",
        };
      },
    }),
    addProject: builder.mutation({
      query: (data) => {
        return {
          url: "/projects",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/projects/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (data) => {
        return {
          url: `/projects/${data.id}`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
} = projectApi;
