import { apiSlice } from "./apiSlice";

const STUDENT_URL = "/api/v1/students";

const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = studentApiSlice;
