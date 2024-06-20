import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

const Home = () => {
  return <div>Home</div>;
};

const Home1 = () => {
  return <div>Home1</div>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/home" element={<HomePage/>} />
      <Route path="/home1" element={<Home1 />} />
    </Routes>
  );
};

export default AppRoutes;
