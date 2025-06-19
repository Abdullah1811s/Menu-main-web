import React from "react";
import { Bell } from "lucide-react";

interface NotificationButtonProps {
  onClick?: () => void;
  className?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-full border border-white hover:border-[#c79b74] transition-colors duration-300 ${className}`}
    >
      <Bell className="text-white w-5 h-5" />
    </button>
  );
};

export default NotificationButton;
