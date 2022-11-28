import React from "react";
import { Outlet, Navigate, useLocation  } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const PrivateRoutes = ({ userId }) => {
  return userId ? <Outlet /> : <LoginPage />;
};

export default PrivateRoutes;
