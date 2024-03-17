import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "https://quizzy.cyclic.sh" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Teacher", "Student"],
  endpoints: (builder) => ({}),
});
