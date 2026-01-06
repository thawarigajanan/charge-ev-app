import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BoltIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ev-green/10 rounded-lg">
              <BoltIcon className="h-8 w-8 text-ev-green" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ev-dark">ChargeEv</h1>
              <p className="text-gray-600 text-sm">
                {user?.fullName ? `Welcome, ${user.fullName}` : "EV Charging App"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user?.carType && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <UserCircleIcon className="h-5 w-5 text-gray-600" />
                <span className="font-medium">{user.carType}</span>
              </div>
            )}
            
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
