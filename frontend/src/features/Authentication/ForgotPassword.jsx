import { useForm } from "react-hook-form";
import { useForgotPasswordTeacherMutation } from "../../app/teacherApiSlice";
import { useForgotPasswordStudentMutation } from "../../app/studentApiSlice";
import { useState } from "react";

import AppLayout from "../../ui/AppLayout";
import BlobAnimation from "../../ui/BlobAnimation";
import FormMessage from "../../ui/Form/FormMessage";
import InputField from "../../ui/Form/inputField";
import InputLabel from "../../ui/Form/InputLabel";
import InputError from "../../ui/Form/InputError";
import FormField from "../../ui/Form/FormField";

const fieldNames = ["email"];

function ForgotPassword({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [registerStudent, { isLoading: isLoadingStudent }] =
    useForgotPasswordStudentMutation();
  const [registerTeacher, { isLoading: isLoadingTeacher }] =
    useForgotPasswordTeacherMutation();
  const [message, setMessage] = useState("");

  async function onSubmit(data) {
    try {
      setMessage("");
      let res;
      if (user === "Student") res = await registerStudent(data).unwrap();
      else if (user === "Teacher") res = await registerTeacher(data).unwrap();

      console.log(res);

      if (res.status === "success")
        setMessage("Check your email for further instructions");
      else setMessage("");

      reset();
    } catch (err) {
      setMessage(err?.data?.message);
    }
  }

  return (
    <AppLayout>
      <div className="w-full xs:w-96 flex flex-col gap-8 items-center  mt-8 sm:mt-16 font-primary relative ">
        <BlobAnimation />
        <div className="relative xs:w-full">
          <div className="absolute -inset-[5px] blur-lg opacity-50 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  sm:hidden"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full  px-6 py-8 rounded-md shadow-md flex flex-col gap-3 relative z-100 bg-white"
          >
            <h2 className="text-xl font-light text-slate-500">
              Request Password Reset for{" "}
              <span className=" text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {user}
              </span>
            </h2>

            <FormMessage message={message} setMessage={setMessage} />

            {fieldNames.map((fieldName) => {
              return (
                <FormField key={fieldName}>
                  <InputLabel fieldName={fieldName} />
                  <InputField register={register} fieldName={fieldName} />
                  <InputError errors={errors} fieldName={fieldName} />
                </FormField>
              );
            })}

            <button
              type="submit"
              className={`text-md font-medium self-start px-4 py-1 bg-gradient-to-r ${
                isLoadingTeacher || isLoadingStudent
                  ? "from-gray-500 to-gray-700"
                  : "from-indigo-500 via-purple-500 to-pink-500"
              } text-white rounded-md  shadow-md`}
            >
              {isLoadingTeacher || isLoadingStudent
                ? "Requesting..."
                : "Request"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

export default ForgotPassword;
