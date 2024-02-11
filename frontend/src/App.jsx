import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/Authentication/Login";
import Register from "./features/Authentication/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<h1>Hello world</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
