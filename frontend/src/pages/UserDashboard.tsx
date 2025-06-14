import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  availableRoles: string[];
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { userId } = useParams();
  const token = localStorage.getItem("frontendToken");

  let decoded: JwtPayload | null = null;

  if (token) {
    try {
      decoded = jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  }

  const handleSwitchRole = async (newRole: string): Promise<void> => {
    try {
      const res: AxiosResponse = await axios.post(
        `${API_URL}/auth/switch-roles`,
        { newRole },
        { withCredentials: true }
      );
      const {
        message,
        frontendToken,
        user
      } = res.data;
      console.log("Role switch successful:", res.data);
      localStorage.setItem("frontendToken" , frontendToken);
      toast.success(message);
      navigate(`/affiliate/${user?.id}/dashboard`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(`Failed to switch role: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong while switching roles.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600 mb-2">
          <strong>User ID from URL:</strong>{' '}
          <span className="text-blue-600">{userId}</span>
        </p>
        {decoded ? (
          <>
            <p className="text-gray-600 mb-2">
              <strong>Decoded ID:</strong>{' '}
              <span className="text-blue-600">{decoded.id}</span>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Role:</strong>{' '}
              <span className="text-blue-600">{decoded.role}</span>
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Available Roles:</strong>{' '}
              <span className="text-blue-600">
                {decoded.availableRoles.join(', ')}
              </span>
            </p>
          </>
        ) : (
          <p className="text-red-500 mb-6">Invalid or missing token.</p>
        )}
        <button
          onClick={() => handleSwitchRole("affiliate")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Switch Role
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;




