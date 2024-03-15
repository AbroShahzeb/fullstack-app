import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterStart from "./features/Authentication/RegisterStart";
import Signup from "./features/Authentication/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterStart />} />
        <Route path="register/student" element={<Signup user="Student" />} />
        <Route path="register/teacher" element={<Signup user="Teacher" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
