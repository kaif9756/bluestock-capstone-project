import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { syncActivities } from "./utils/sync";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Puzzle from "./pages/Puzzle";
import Heatmap from "./pages/Heatmap";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";


function App() {

  useEffect(() => {

    window.addEventListener("online", syncActivities);

    return () => {
      window.removeEventListener("online", syncActivities);
    };

  }, []);

  return (
    <Layout>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </Layout>
  );
}

export default App;