import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./AuthSlice.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ErrorElement from "../../ui/ErrorElement.jsx";

const toastConfiguration = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

console.log(process.env.MONGO_URI);

function Register() {
  const { register, handleSubmit, reset, formState } = useForm();
  let temporaryImageURL;

  const { errors } = formState;

  const dispatch = useDispatch();
  const responseErrors = useSelector((state) => state.auth.errors);
  const message = useSelector((state) => state.auth.message);
  const status = useSelector((state) => state.auth.status);

  const [currentlySelectedImg, setCurrentlySelectedImg] = useState(
    "/profile_placeholder.jpg"
  );

  useEffect(() => {
    if (message) {
      toast.success(
        "Account created successfully, please check your email to verify it.",
        toastConfiguration
      );
    }
  }, [message]);

  useEffect(() => {
    if (status === "success") {
      reset();
      URL.revokeObjectURL(temporaryImageURL);
      setCurrentlySelectedImg("/profile_placeholder.jpg");
    }
  }, [status]);

  useEffect(() => {
    if (responseErrors) {
      if (responseErrors.email) {
        toast.error(responseErrors.email, toastConfiguration);
      }
      if (responseErrors.image) {
        toast.error(responseErrors.image, toastConfiguration);
      }
    }
  }, [responseErrors]);

  useEffect(() => {
    if (errors?.file?.message) {
      toast.error("Please select a profile picture", toastConfiguration);
    }
  }, [formState]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (errors?.file?.message) errors.file.message = "";
    temporaryImageURL = URL.createObjectURL(file);
    setCurrentlySelectedImg(temporaryImageURL);
  }

  function onSubmit(data) {
    const { file, name, email, password } = data;
    console.log("File", file);
    if (!file[0] || !name || !email || !password) return;

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    dispatch(registerUser(formData));
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
      <div className='flex items-center justify-center px-8 py-4 md:py-8 md:px-12 rounded-md shadow-sm bg-white w-sm h-sm'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 md:gap-3'
        >
          <div className='flex flex-col gap-4'>
            <div className='shrink-0'>
              <img
                className='h-24 w-24 object-cover rounded-full'
                src={currentlySelectedImg}
                alt='Current profile photo'
              />
            </div>
            <label htmlFor='file' className='block'>
              <span className='sr-only'>Choose profile photo</span>
              <input
                className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-emerald-50 file:text-emerald-700
          hover:file:bg-violet-100'
                type='file'
                placeholder='Select profile image'
                onChange={handleImageChange}
                {...register("file", {
                  onChange: (e) => {
                    handleImageChange(e);
                  },
                  required: "Image is required",
                })}
              />
            </label>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-sm font-thin text-gray-500'>
              Name
            </label>
            <input
              type='text'
              placeholder='Enter name'
              name='name'
              className='bg-emerald-50 p-2  py-1 text-sm md:text-md  rounded-sm focus:outline-none border-2 border-transparent text-emerald-900 font-bold placeholder:font-normal focus:border-2 focus:border-emerald-700'
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors?.name?.message ? (
              <ErrorElement>{errors.name.message}</ErrorElement>
            ) : (
              ""
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-sm font-thin text-gray-500'>
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type='email'
              placeholder='Enter email address'
              className='bg-emerald-50 p-2 text-sm md:text-md  rounded-sm focus:outline-none border-2 border-transparent text-emerald-900 font-bold placeholder:font-normal focus:border-2 focus:border-emerald-700'
            />
            {errors?.email?.message ? (
              <ErrorElement>{errors.email.message}</ErrorElement>
            ) : (
              ""
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='password'
              className='text-sm font-thin text-gray-500'
            >
              Password
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='bg-emerald-50 p-2 py-1 text-sm md:text-md  rounded-sm focus:outline-none border-2 border-transparent text-emerald-900 font-bold placeholder:font-normal focus:border-2 focus:border-emerald-700'
              {...register("password", {
                required: "Password is required",
              })}
              autoComplete='off'
            />

            {errors?.password?.message ? (
              <ErrorElement>{errors.password.message}</ErrorElement>
            ) : (
              ""
            )}
          </div>

          <button
            type='submit'
            className='self-stretch text-sm md:text-md font-semibold tracking-wider text-white p-1 md:p-2 bg-emerald-700 disabled:bg-gray-500 disabled:text-gray-200'
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
