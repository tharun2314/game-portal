import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import QuestionModal from "./components/QuestionModal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/home" element={<HomePage />} />
      <Route path="/custom-modal" element={<QuestionModal />} />
    </Routes>
  );
};

export default AppRoutes;
