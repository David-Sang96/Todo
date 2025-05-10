import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Todos"], // <- This defines what tags exist
  //  tagTypes: ["Todos", "Users", "Products"],  <- this part matters
});
