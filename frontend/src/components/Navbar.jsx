import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full bg-black border-b border-gray-800">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-22 relative">
          {/* Logo */}
          <div className="flex items-center space-x-2 absolute left-15">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded" />
            <span
              className="text-3xl font-bold text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              RedProfile
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-xl">
            <div
              className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span>Home</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            <div
              className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span>Generate</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            <div
              className="flex items-center space-x-1 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/personas")}
            >
              <span>Personas</span>
            </div>

            <span className="text-gray-300 hover:text-white cursor-pointer">
              Docs
            </span>
            <span className="text-gray-300 hover:text-white cursor-pointer">
              About
            </span>
            <span className="text-gray-300 hover:text-white cursor-pointer">
              Try Now
            </span>
          </div>

          {/* Back Button */}
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-white text-gray-900 cursor-pointer1 transition-colors text-xl border border-gray-600 px-4 py-2 rounded-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
