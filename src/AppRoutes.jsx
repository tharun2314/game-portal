// AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import QuestionModal from "./components/QuestionModal";
import Shootergame from "./components/Shootergame";
import ShooterGameWrapper from "./components/NotFound/ShooterGameWrapper";
import { isAuthenticated } from "./services/authservice";
import SnakeGamePage from "./Pages/SnakeGamePage";
import UserScoreDetails from "./Pages/ScoreDetails";
import ScoreBoard from "./Pages/ScoreBoard";
import MarioJump from "./Pages/MarioJump";
import { useSelector } from "react-redux";
import { LoadingScreen } from "./Pages/components";
import CarGame from "./Pages/CarGame";

const AppRoutes = () => {
  const isLoading = useSelector((state) => state?.engine?.loadingScreen==undefined? true:state?.engine?.loadingScreen);
  console.log(isLoading)
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={ <HomePage/>}
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
        element={isAuthenticated() ? <SnakeGamePage /> : <Navigate to="/login" replace />}
      />
      <Route
      path="/score-details"
      element={<UserScoreDetails/>}/>
         <Route
        path="/scoreboard"
        element={isAuthenticated() ? <ScoreBoard/> : <Navigate to="/login" replace />}
      />
       <Route
      path="/mario-jump"
      element={ isLoading?<LoadingScreen />:<MarioJump/>}/>
         <Route
      path="/car-game"
      element={<CarGame/>}/>
    </Routes>
  );
};

export default AppRoutes;
