import { apiSlice } from "../../apiSlice";

const STUDENT_URL = "/api/v1/students";

const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    loginStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordStudent: builder.mutation({
      query: (data) => {
        const { token, ...body } = data;
        console.log(token);
        console.log(data);
        return {
          url: `${STUDENT_URL}/reset-password/${token}`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useLoginStudentMutation,
  useForgotPasswordStudentMutation,
  useResetPasswordStudentMutation,
} = studentApiSlice;
