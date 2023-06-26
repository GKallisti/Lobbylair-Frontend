import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true" ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoutes2 = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if(!isAuthenticated)   localStorage.setItem("isAuthenticated", false)
  return isAuthenticated === "false" ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

const ProtectedAdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.isAdmin;
  return isAdmin === true ? <Outlet /> : <Navigate to="/home" />;
};

export { ProtectedRoutes, ProtectedRoutes2, ProtectedAdminRoute };
