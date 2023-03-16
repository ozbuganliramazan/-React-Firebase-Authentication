import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
