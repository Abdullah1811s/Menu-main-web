import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  availableRoles: string[]; 
}

const UserPrivateRoute = () => {
  const token = localStorage.getItem("frontendToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded?.role === "user") {
      return <Outlet />;
    } else {

      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }
};

export default UserPrivateRoute;
