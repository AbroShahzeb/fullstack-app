import { useForm } from "react-hook-form";
import { useRegisterTeacherMutation } from "./teacherApiSlice";
import { useRegisterStudentMutation } from "./studentApiSlice";
import { useState } from "react";
import BlobAnimation from "../../ui/BlobAnimation";
import FormMessage from "../../ui/Form/FormMessage";
import InputField from "../../ui/Form/inputField";
import InputLabel from "../../ui/Form/InputLabel";
import InputError from "../../ui/Form/InputError";
import FormField from "../../ui/Form/FormField";

const fieldNames = ["name", "email", "password", "passwordConfirm"];

function Register({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(user);

  const [registerStudent, { isLoading: isLoadingStudent }] =
    useRegisterStudentMutation();
  const [registerTeacher, { isLoading: isLoadingTeacher }] =
    useRegisterTeacherMutation();
  const [message, setMessage] = useState("");

  async function onSubmit(data) {
    try {
      console.log(JSON.stringify(data));
      // setMessage("");
      // let res;
      // if (user === "Student") res = await registerStudent(data).unwrap();
      // else if (user === "Teacher") res = await registerTeacher(data).unwrap();
      // if (res.status === "success") setMessage("Account created successfully");
      // else setMessage("");
      const res = await fetch("http://localhost:8000/api/v1/students/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const Resdata = await res.json();
      console.log(Resdata);
      reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="w-full h-screen flex items-start justify-center px-4">
      <div className="w-96 flex flex-col gap-8 items-center  mt-8 sm:mt-16 font-primary relative ">
        <BlobAnimation />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  px-6 py-8 rounded-md shadow-md flex flex-col gap-3 relative z-100 bg-white"
        >
          <h2 className="text-xl font-light text-slate-500">
            Signup as{" "}
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
            {isLoadingTeacher || isLoadingStudent ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
