import { Api } from "../slice/apiSlice";
export const communityApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: ({ id }) => `/v1/analyticsuser/${id}`,
      keepUnusedDataFor: 400,
    }),
    getCommunity: builder.query({
      query: ({ id }) => `/v1/allcoms/${id}`,
    }),
    getPost: builder.query({
      query: ({ id, comid }) => `/v1/getposts/${id}/${comid}`,
    }),
    createTopic: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/createtopic/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTopic: builder.mutation({
      query: ({ id, topicId, data }) => ({
        url: `/v1/deletetopic/${id}/${topicId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTopic: builder.mutation({
      query: ({ id, topicid, data }) => ({
        url: `/v1/edittopic/${id}/${topicid}`,
        method: "POST",
        body: data,
      }),
    }),
    fetchTopic: builder.query({
      query: ({ id, comid }) => `/v1/fetchtopic/${id}/${comid}`,
    }),
    createCom: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/createcom/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCom: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/v1/updatecommunity/${id}/${comid}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCommunity: builder.mutation({
      query: ({ comid }) => ({
        url: `/v1/delete/${comid}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetCommunityQuery,
  useGetPostQuery,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
  useFetchTopicQuery,
  useCreateComMutation,
  useUpdateComMutation,
  useDeleteCommunityMutation,
} = communityApi;
