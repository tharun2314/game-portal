// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired } from "./services/authservice";

const PrivateRoute = ({ path, element }) => {
  return (
    <Route
      path={path}
      element={isAuthenticated() && !isTokenExpired() ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
