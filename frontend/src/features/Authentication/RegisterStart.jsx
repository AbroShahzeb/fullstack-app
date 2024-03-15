import { NavLink } from "react-router-dom";

function RegisterStart() {
  return (
    <main className="w-full h-screen flex items-center justify-center ">
      <div className="w-sm md:w-md flex flex-col gap-8 items-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-700">
          Do you want to register a student or teacher?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <NavLink
            to={"/register/student"}
            className="sm:w-36 h-36 flex items-center justify-center text-white bg-red-600 text-xl sm:text-2xl font-bold rounded-md shadow-sm w-full"
          >
            <div>Student</div>
          </NavLink>
          <NavLink to={"/register/teacher"}>
            <div className="sm:w-36 h-36 flex items-center justify-center text-white bg-blue-600 text-xl sm:text-2xl font-bold rounded-md shadow-sm w-full">
              Teacher
            </div>
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default RegisterStart;
