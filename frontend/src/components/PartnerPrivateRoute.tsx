import { Navigate, Outlet } from "react-router-dom";

const PartnerPrivateRoute = () => {
  const token = localStorage.getItem("PFToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PartnerPrivateRoute;
