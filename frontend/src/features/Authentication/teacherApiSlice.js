import { apiSlice } from "../../apiSlice";

const TEACHER_URL = "/api/v1/teachers";

const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterTeacherMutation } = teacherApiSlice;
