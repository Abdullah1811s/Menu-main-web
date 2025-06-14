import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  availableRoles: string[];
}

const AffiliatePrivateRoute = () => {
  const token = localStorage.getItem("frontendToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded?.role === "affiliate") {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }
};

export default AffiliatePrivateRoute;
