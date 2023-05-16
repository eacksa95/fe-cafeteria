import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed = false,
  redirectTo = "/",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;

};
