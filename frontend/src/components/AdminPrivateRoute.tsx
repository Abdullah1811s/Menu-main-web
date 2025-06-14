import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("ADFToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
