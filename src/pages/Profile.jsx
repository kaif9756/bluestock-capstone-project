import { useState } from "react";
import {
  FaUser,
  FaFire,
  FaTrophy,
  FaPuzzlePiece,
  FaMoon,
  FaBell,
  FaRedo,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  const guest = localStorage.getItem("guest");

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    window.location.href = "/";
  };

  const continueGuest = () => {
    localStorage.setItem("guest", "true");
    window.location.reload();
  };

  return (

    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Profile
      </h1>

      {/* =========================
         GUEST MODE
      ========================= */}

      {!user && !guest && (

        <div className="bg-white p-10 rounded-xl shadow text-center">

          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl mb-4">
            <FaUser />
          </div>

          <h2 className="text-lg font-semibold mb-2">
            Continue Your Puzzle Journey
          </h2>

          <p className="text-gray-500 mb-6">
            Login or sign up to sync your puzzle progress across devices.
          </p>

          <div className="flex justify-center gap-4">

            <Link to="/login">
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <FaSignInAlt />
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
                <FaUserPlus />
                Sign Up
              </button>
            </Link>

            <button
              onClick={continueGuest}
              className="text-gray-600 hover:text-primary"
            >
              Continue as Guest
            </button>

          </div>

        </div>

      )}

      {/* =========================
         USER / GUEST PROFILE
      ========================= */}

      {(user || guest) && (

        <>

          {/* Profile Header */}

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4 mb-8">

            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-lg">
              <FaUser />
            </div>

            <div>

              <h2 className="font-semibold text-lg">
                {user?.name || "Guest Player"}
              </h2>

              <p className="text-sm text-gray-500">
                Logic Puzzle Player
              </p>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white p-6 rounded-xl shadow">

              <div className="flex items-center gap-2 text-accent text-sm">
                <FaFire />
                Current Streak
              </div>

              <p className="text-2xl font-bold mt-2 text-accent">
                12
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <div className="flex items-center gap-2 text-primary text-sm">
                <FaPuzzlePiece />
                Puzzles Solved
              </div>

              <p className="text-2xl font-bold mt-2 text-primary">
                58
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <div className="flex items-center gap-2 text-yellow-500 text-sm">
                <FaTrophy />
                Achievements
              </div>

              <p className="text-2xl font-bold mt-2 text-yellow-500">
                6
              </p>

            </div>

          </div>

          {/* Settings */}

          <div className="bg-white p-6 rounded-xl shadow space-y-4">

            <h3 className="font-semibold">
              Account Settings
            </h3>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2 text-gray-600">
                <FaMoon />
                Theme Mode
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-200 px-4 py-1 rounded-full text-sm"
              >
                {darkMode ? "Dark" : "Light"}
              </button>

            </div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2 text-gray-600">
                <FaBell />
                Notifications
              </div>

              <button
                onClick={() => setNotifications(!notifications)}
                className="bg-gray-200 px-4 py-1 rounded-full text-sm"
              >
                {notifications ? "On" : "Off"}
              </button>

            </div>

            <div className="flex justify-between items-center text-red-500">

              <div className="flex items-center gap-2">
                <FaRedo />
                Reset Progress
              </div>

              <button className="hover:underline">
                Reset
              </button>

            </div>

            <div className="flex justify-between items-center text-gray-600">

              <div className="flex items-center gap-2">
                <FaSignOutAlt />
                Logout
              </div>

              <button
                onClick={logout}
                className="hover:underline"
              >
                Logout
              </button>

            </div>

          </div>

        </>

      )}

    </div>

  );

}