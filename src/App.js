import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
