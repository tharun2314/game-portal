import React from "react";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return <div>Home</div>;
};

const Home1 = () => {
  return <div>Home1</div>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/home1" element={<Home1 />} />
    </Routes>
  );
};

export default AppRoutes;
