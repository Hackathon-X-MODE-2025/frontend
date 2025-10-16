import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hack-2025.bigtows.org/",
    prepareHeaders: (headers) => {
      const userId = localStorage.getItem("user_id")

      if (userId) {
        headers.set("X-User-ID", userId);
      }

      return headers;
    },
  }),
  tagTypes: ["session", "chat"],
  endpoints: () => ({}),
});
