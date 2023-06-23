import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/home"  />;
};

const ProtectedRoutes2 = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/"  />;
};

export { ProtectedRoutes, ProtectedRoutes2 };
