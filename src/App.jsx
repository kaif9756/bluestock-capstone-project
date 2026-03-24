import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { syncActivities } from "./utils/sync";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Puzzle from "./pages/Puzzle";
import Heatmap from "./pages/Heatmap";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Navbar from "./components/layout/Navbar";
import Layout from "./components/layout/Layout";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("online", syncActivities);
    return () => {
      window.removeEventListener("online", syncActivities);
    };
  }, []);
  if (location.pathname === "/" || location.pathname === "/landing") {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </main>

    </div>
  );
}

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Navbar" element={<Navbar />} />
      </Routes>
    </Layout>
  );
}

export default App;