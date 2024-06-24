// AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import QuestionModal from "./components/QuestionModal";
import Shootergame from "./components/Shootergame";
import Snakegame from "./components/NotFound/Snakegame";
import ShooterGameWrapper from "./components/NotFound/ShooterGameWrapper";
import { isAuthenticated } from "./services/authservice";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/custom-modal"
        element={isAuthenticated() ? <QuestionModal /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/shooter-game"
        element={isAuthenticated() ? <ShooterGameWrapper /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/snake-game"
        element={isAuthenticated() ? <Snakegame /> : <Navigate to="/login" replace />}
      />

      {/* Example of a public route */}
      {/* <Route path="/public-route" element={<PublicComponent />} /> */}
    </Routes>
  );
};

export default AppRoutes;
