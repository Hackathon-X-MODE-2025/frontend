import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hack-2025.bigtows.org/',
  }),
  tagTypes: ['session'],
  endpoints: () => ({}),
});
