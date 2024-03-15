import { useForm } from "react-hook-form";
import "../../App.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <main className="w-full h-screen flex items-start justify-center px-4">
      <div className="w-96 flex flex-col gap-8 items-center  mt-8 sm:mt-16 font-primary relative">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply"></div>
        <div className="absolute left-20 top-8 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  px-6 py-8 rounded-md shadow-md flex flex-col gap-3 relative z-100 bg-white"
        >
          <h2 className="text-2xl font-light text-slate-500">
            Register as{" "}
            <span className=" text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Student
            </span>
          </h2>
          <div className="flex flex-col gap-1 items-start">
            <label
              htmlFor="name"
              className="text-sm text-slate-500 font-normal"
            >
              Name
            </label>
            <div className="relative w-full">
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter your name..."
                className="w-full p-2 bg-transparent border-[1px] text-sm relative sm:text-md bg-white focus:outline-none placeholder:text-slate-400 peer z-10 rounded-md"
              />
              <div className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden peer-focus:block "></div>
            </div>
            {errors.name && (
              <p className="text-sm text-red-500 font-normal">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <label
              htmlFor="name"
              className="text-sm text-slate-500 font-normal"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Enter your email..."
              className="w-full p-2 rounded-sm bg-transparent border-[1px] border-slate-300 text-sm sm:text-md  placeholder:text-slate-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-normal">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <label
              htmlFor="name"
              className="text-sm text-slate-500 font-normal"
            >
              Password
            </label>
            <input
              type="text"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters long",
                },
              })}
              placeholder="Enter your password..."
              className="w-full p-2 rounded-sm bg-transparent border-[1px] border-slate-300 text-sm sm:text-md  placeholder:text-slate-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-normal">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start">
            <label
              htmlFor="name"
              className="text-sm text-slate-500 font-normal"
            >
              Confirm Password
            </label>
            <input
              type="text"
              {...register("passwordConfirm", {
                required: "Password confirmation is required",
              })}
              placeholder="Enter your password again..."
              className="w-full p-2 rounded-sm bg-transparent border-[1px] border-slate-300 text-sm sm:text-md  placeholder:text-slate-400"
            />
            {errors.passwordConfirm && (
              <p className="text-sm text-red-500 font-normal">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="text-md font-medium self-start px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-sm shadow-sm"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
