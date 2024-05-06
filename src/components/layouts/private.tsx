import { Outlet, Navigate } from "react-router-dom";

export function AuthenticateRoutes() {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export function UnAuthenticateRoutes() {
  const auth = localStorage.getItem("token");

  return !auth ? <Outlet /> : <Navigate to="/main" />;
}

export default { AuthenticateRoutes, UnAuthenticateRoutes };
