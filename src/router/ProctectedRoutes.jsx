import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoutes2 = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/home" />;
};

export { ProtectedRoutes, ProtectedRoutes2 };
