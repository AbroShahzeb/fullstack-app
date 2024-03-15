function InputField({ register, fieldName }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        {...register(fieldName, {
          required: `${
            fieldName === "passwordConfirm"
              ? "Password confirmation"
              : fieldName[0].toUpperCase() + fieldName.slice(1)
          } is required`,
        })}
        placeholder={`Enter your ${
          fieldName === "passwordConfirm" ? "password again" : fieldName
        }...`}
        className="w-full p-2 bg-transparent border-[1px] text-sm relative sm:text-md bg-white focus:outline-none placeholder:text-slate-400 peer z-10 rounded-md"
      />
      <div className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hidden peer-focus:block "></div>
    </div>
  );
}

export default InputField;
