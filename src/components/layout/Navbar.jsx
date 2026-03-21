import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NotificationPanel from "../NotificationPanel";

import { Bell } from "lucide-react";
import { FaUser } from "react-icons/fa";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <nav
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Bluestock Logo" className="h-8 w-auto" />
        </Link>


        {/* Navigation Menu */}

        <div className="flex items-center gap-8 text-gray-800 font-semibold text-[16px]">

          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-primary transition duration-200"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/puzzle"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-primary transition duration-200"
            }
          >
            Puzzle
          </NavLink>

          <NavLink
            to="/heatmap"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-primary transition duration-200"
            }
          >
            Heatmap
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "hover:text-primary transition duration-200"
            }
          >
            Leaderboard
          </NavLink>

        </div>


        {/* Right Icons */}

        <div className="flex items-center gap-5">

          {/* Notification Button */}

          <button
            onClick={() => setOpenNotifications(true)}
            className="relative p-2 hover:bg-gray-100 rounded-lg"
          >
            <Bell size={20} />
          </button>

          {/* Profile */}

          <Link to="/profile">
            <FaUser className="text-gray-600 cursor-pointer text-lg" />
          </Link>

        </div>

      </div>


      {/* Notification Panel */}

      <NotificationPanel
        isOpen={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />

    </nav>
  );
}