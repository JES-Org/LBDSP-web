import React from "react";
import { Navigate, useLocation } from "react-router-dom";
interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: "user" | "admin";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;

  const location = useLocation();

  // If no user is found, redirect to login
  if (user === null) {
   return <Navigate
      to={requiredRole === "admin" ? "/admin/login" : "/user/login"}
      state={{ from: location }}
      replace
    />;
  }
  else if (requiredRole === "admin" && user?.role === "user") {
    return <Navigate to="/Does-Not_exists" replace />;
    
  }
  return <>{children}</>;
};

export default PrivateRoute;
