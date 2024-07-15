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
import HelpModule from "./Pages/HelpModule";
import GameResultChart from "./components/GameResultChart";
import AchievementPage from "./Pages/AchievementsPage";
import Feedback from "./Pages/Feedback";

const AppRoutes = () => {
  const isLoading = useSelector((state) => state?.engine?.loadingScreen==undefined? true:state?.engine?.loadingScreen);
  console.log(isLoading)
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected routes */}
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/custom-modal"
        element={
          isAuthenticated() ? (
            <QuestionModal />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/shooter-game"
        element={
          isAuthenticated() ? (
            <ShooterGameWrapper />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/snake-game"
        element={
          isAuthenticated() ? (
            <SnakeGamePage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/score-details/:id" element={<UserScoreDetails />} />
      <Route
        path="/scoreboard"
        element={
          isAuthenticated() ? <ScoreBoard /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <GameResultChart />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Example of a public route */}
      {/* <Route path="/public-route" element={<PublicComponent />} /> */}
       <Route
      path="/mario-jump"
      element={ isLoading?<LoadingScreen />:<MarioJump/>}/>
         <Route
      path="/car-game"
      element={<CarGame/>}/>
          <Route
      path="/help-module"
      element={<HelpModule/>}/>
            <Route
      path="/help-module"
      element={<HelpModule/>}/>

<Route
      path="/achievements"
      element={<AchievementPage/>}/>

      
<Route
      path="/feedback"
      element={<Feedback/>}/>
    </Routes>
  );
};

export default AppRoutes;
