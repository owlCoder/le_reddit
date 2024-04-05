import React from "react";
import { useNavigate } from "react-router-dom";
import AccountInformation from "../AccountInformation";
import SearchBar from "../search/SearchBar";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth: boolean = false; // remove later

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <a href="/">
              <img
                className="block lg:hidden h-8 w-auto"
                src="/reddit.svg"
                alt="logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="/reddit.svg"
                alt="logo"
              />
            </a>
            <span className="ml-2 text-xl font-semibold">Le Reddit</span>
          </div>
          <div className="flex items-center gap-8">
            {/* Search Bar */}
            <SearchBar
              placeholder="Search Le Reddit..."
              onSearch={(query) => {
                // Handle search functionality
                console.log("Search query:", query);
              }}
            />
            <div className="flex items-center gap-x-1">
              {auth ? (
                <div>
                  <button
                    className="px-4 py-2 font-bold text-primary-600 uppercase transition-all rounded-lg select-none hover:bg-primary-900/10 active:bg-primary-600/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                  <button
                    className="px-4 py-2 text-white font-semibold uppercase transition-all bg-gradient-to-tr from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 active:from-primary-800 active:to-primary-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <AccountInformation />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
