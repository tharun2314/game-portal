import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './MarioJump.css'
import { useSelector } from "react-redux";
import QuestionModal from "../components/QuestionModal";
import { Birds, Bricks, Clouds, Mario, Obstacles, Sun, KeyMessage, LoadingScreen, Score, MobileControls, Footer } from "./components";

export default function MarioJump() {
    console.log("i am heree babhy")
    const isPlay = useSelector((state) => state.engine.play);
    return (
        <>
              <div class="game">
                {!isPlay && <KeyMessage />}
                <Bricks />
                <Mario />
                <Sun />
                <Clouds />
                <Birds />
                <Obstacles />
                <Score />
                </div>
            <MobileControls />
            <Footer />
        </>
    );
}

function AppRoutes() {
    const isLoading = useSelector((state) => state.engine.loadingScreen);
    return (
        <BrowserRouter>
            {isLoading && <LoadingScreen />}
            <Routes>
                <Route path="/" element={<MarioJump />} />
            </Routes>
        </BrowserRouter>
    );
}

// export default AppRoutes;
