function FormMessage({ message, setMessage }) {
  return (
    message && (
      <div className="flex items-center justify-between gap-2 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-md ">
        <span className="w-full text-sm text-white  ">{message}</span>
        <span
          className="text-white leading-normal text-xl cursor-pointer"
          onClick={() => setMessage("")}
        >
          &times;
        </span>
      </div>
    )
  );
}

export default FormMessage;
