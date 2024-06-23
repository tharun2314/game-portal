import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import QuestionModal from "./components/QuestionModal";
import Shootergame from "./components/Shootergame";
import Snakegame from "./components/NotFound/Snakegame";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<HomePage />} />
      <Route path="/custom-modal" element={<QuestionModal />} />
      <Route path='/shooter-game' element={<Shootergame/>}/>
      <Route path='/snake-game' element={<Snakegame/>}/>
    </Routes>
  );
};

export default AppRoutes;
