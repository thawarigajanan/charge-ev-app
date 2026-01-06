import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  HomeIcon, 
  MapPinIcon, 
  ClockIcon, 
  CreditCardIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BoltIcon,
  CurrencyRupeeIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { chargePoints } from "../../data/mockData";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"dashboard" | "cpo">("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard", color: "text-ev-blue", bgColor: "bg-blue-50" },
    { id: "cpo", icon: MapPinIcon, label: "Find CPO", color: "text-ev-green", bgColor: "bg-green-50" },
    { id: "sessions", icon: ClockIcon, label: "My Sessions", color: "text-purple-600", bgColor: "bg-purple-50" },
    { id: "payments", icon: CreditCardIcon, label: "Payments", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { id: "settings", icon: Cog6ToothIcon, label: "Settings", color: "text-gray-600", bgColor: "bg-gray-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                  Welcome, <span className="font-semibold">{user?.fullName}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <UserCircleIcon className="h-5 w-5 text-gray-600" />
                <span className="font-medium">{user?.carType}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id === "cpo" ? "cpo" : "dashboard")}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl ${item.bgColor} hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}
            >
              <item.icon className={`h-8 w-8 ${item.color} mb-3`} />
              <span className="font-medium text-gray-800">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeView === "dashboard" ? (
            <div>
              <h2 className="text-2xl font-bold text-ev-dark mb-6">Dashboard</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-ev-green to-green-400 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">Available Balance</h3>
                  <p className="text-3xl font-bold">?1,250</p>
                  <p className="mt-2 opacity-90">Add money for faster charging</p>
                  <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                    Add Money
                  </button>
                </div>
                <div className="bg-gradient-to-r from-ev-blue to-blue-400 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">Last Session</h3>
                  <p className="text-3xl font-bold">45 kWh</p>
                  <p className="mt-2 opacity-90">?382.50 | 2 hours ago</p>
                  <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-ev-dark mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Energy Used</p>
                    <p className="text-2xl font-bold">1.2 MWh</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">CO2 Saved</p>
                    <p className="text-2xl font-bold">980 kg</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Savings</p>
                    <p className="text-2xl font-bold">?8,450</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-ev-dark mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveView("cpo")}
                    className="px-6 py-3 bg-ev-green text-white rounded-lg font-medium hover:bg-green-600 transition"
                  >
                    Find Nearest Charging Point
                  </button>
                  <button className="px-6 py-3 bg-ev-blue text-white rounded-lg font-medium hover:bg-blue-600 transition">
                    Start New Session
                  </button>
                  <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition">
                    View History
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-ev-dark">Charging Points Nearby</h2>
                <div className="text-sm text-gray-600">
                  Showing {chargePoints.length} stations
                </div>
              </div>

              <div className="space-y-4">
                {chargePoints.map((point) => (
                  <div
                    key={point.id}
                    className="border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-ev-dark">{point.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            point.availablePorts > 2 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {point.availablePorts} available
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <span>{point.address}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center">
                            <BoltIcon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span className="font-medium">{point.availablePorts}/{point.totalPorts} ports</span>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <span className="font-medium">{point.distance} km away</span>
                          </div>
                          <div className="flex items-center">
                            <CurrencyRupeeIcon className="h-5 w-5 text-green-500 mr-2" />
                            <span className="font-medium">?{point.pricePerKwh}/kWh</span>
                          </div>
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-ev-green h-2 rounded-full"
                                style={{ width: `${(point.availablePorts / point.totalPorts) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {Math.round((point.availablePorts / point.totalPorts) * 100)}% available
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="ml-4 px-6 py-3 bg-ev-green text-white rounded-lg font-medium hover:bg-green-600 transition whitespace-nowrap">
                        Navigate
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map View */}
              <div className="mt-8 p-6 bg-gray-100 rounded-2xl">
                <h3 className="text-xl font-bold text-ev-dark mb-4">Map View</h3>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-ev-blue mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map would show here</p>
                    <p className="text-sm text-gray-500 mt-2">(Map integration is a bonus feature)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>© 2024 ChargeEv. All rights reserved.</p>
          <p className="mt-2">Making EV charging accessible and convenient for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
