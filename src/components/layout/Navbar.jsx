import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NotificationPanel from "../NotificationPanel";

import { Bell, Menu, X } from "lucide-react";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary transition";

  return (
    <nav
      className={`w-full bg-white fixed top-0 left-0 z-50 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-7 sm:h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-800 text-sm font-medium">
          <NavLink to="/Dashboard" className={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/puzzle" className={navLinkStyle}>Puzzle</NavLink>
          <NavLink to="/heatmap" className={navLinkStyle}>Heatmap</NavLink>
          <NavLink to="/leaderboard" className={navLinkStyle}>Leaderboard</NavLink>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          <button
            onClick={() => setOpenNotifications(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Bell size={18} />
          </button>

          <Link to="/profile">
            <FaUser className="text-gray-600 text-base" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium bg-white border-t">
          <NavLink to="/Dashboard" className={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/puzzle" className={navLinkStyle}>Puzzle</NavLink>
          <NavLink to="/heatmap" className={navLinkStyle}>Heatmap</NavLink>
          <NavLink to="/leaderboard" className={navLinkStyle}>Leaderboard</NavLink>
        </div>
      )}

      <NotificationPanel
        isOpen={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />
    </nav>
  );
}