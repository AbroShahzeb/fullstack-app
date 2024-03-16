import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterStart from "./features/Authentication/RegisterStart";
import Signup from "./features/Authentication/Signup";
import Login from "./features/Authentication/Login";
import ForgotPassword from "./features/Authentication/ForgotPassword";
import ResetPassword from "./features/Authentication/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterStart />} />
        <Route path="register/student" element={<Signup user="Student" />} />
        <Route path="register/teacher" element={<Signup user="Teacher" />} />
        <Route path="login/teacher" element={<Login user="Teacher" />} />
        <Route path="login/student" element={<Login user="Student" />} />
        <Route
          path="forgot-password/teacher"
          element={<ForgotPassword user="Teacher" />}
        />
        <Route
          path="forgot-password/student"
          element={<ForgotPassword user="Student" />}
        />
        <Route
          path="reset-password/teacher/:token"
          element={<ResetPassword user="Teacher" />}
        />
        <Route
          path="reset-password/student/:token"
          element={<ResetPassword user="Student" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
