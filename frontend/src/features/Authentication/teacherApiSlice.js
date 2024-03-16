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
    loginTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHER_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordTeacher: builder.mutation({
      query: (data) => {
        const { token, ...body } = data;
        console.log(token);
        console.log(data);
        return {
          url: `${TEACHER_URL}/reset-password/${token}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterTeacherMutation,
  useLoginTeacherMutation,
  useForgotPasswordTeacherMutation,
  useResetPasswordTeacherMutation,
} = teacherApiSlice;
