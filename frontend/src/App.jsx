import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterStart from "./features/Authentication/RegisterStart";
import Register from "./features/Authentication/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterStart />} />
        <Route path="register/student" element={<Register />} />
        <Route path="register/teacher" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
