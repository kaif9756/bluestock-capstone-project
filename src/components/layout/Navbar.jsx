import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user");

  // style for active link
  const linkStyle = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  // navigation handler
  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
      
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <img
            src="https://bluestock.in/static/assets/logo/logo.webp"
            alt="Bluestock"
            className="h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <button
            onClick={() => handleNavigate("/dashboard")}
            className={linkStyle("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavigate("/puzzle")}
            className={linkStyle("/puzzle")}
          >
            Puzzle
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                handleNavigate("/");
              }}
              className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">

          <button
            onClick={() => handleNavigate("/dashboard")}
            className="block w-full text-left"
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavigate("/puzzle")}
            className="block w-full text-left"
          >
            Puzzle
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                handleNavigate("/");
              }}
              className="block w-full text-left text-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="block w-full text-left text-blue-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}