import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery:
    // fetchBaseQuery({ baseUrl: "http://192.168.1.4:7700/api" }),
    fetchBaseQuery({ baseUrl: "http://192.168.29.226:7700/api" }),
  endpoints: () => ({}),
});
