import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Shield,
  MapPin,
  Calendar,
  Edit2,
  Camera,
  Check,
  X,
  Share2,
  Share
} from "lucide-react";
import { useState, useEffect } from "react";
import ShareStreakModal from "../components/ui/ShareStreakModal";

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    username: "@alex_logic_master",
    location: "San Francisco, CA",
    email: "alex.rivera@example.com"
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const startEditing = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    showFeedback("Profile updated successfully!");
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const showFeedback = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-8 space-y-6 max-w-6xl mx-auto animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 space-y-4">
            <div className="h-72 sm:h-96 bg-slate-100 rounded-2xl"></div>
            <div className="h-40 sm:h-48 bg-slate-100 rounded-2xl"></div>
          </div>
          <div className="lg:w-2/3 h-72 sm:h-[500px] bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-6xl mx-auto"
    >

      <ShareStreakModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        streak={13}
      />

      {/* Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl shadow text-xs sm:text-sm flex items-center gap-2"
          >
            <Check size={16} className="text-emerald-400" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

        {/* LEFT */}
        <div className="lg:w-1/3 space-y-6">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            <div className="h-28 sm:h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
              <button
                onClick={() => showFeedback("Cover upload coming soon")}
                className="absolute top-3 right-3 p-2 bg-white/20 rounded-lg text-white"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="px-4 sm:px-6 pb-6">

              {/* Avatar */}
              <div className="relative -mt-14 mb-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Avatar"
                    className="w-full h-full"
                  />
                </div>

                <button
                  onClick={() => showFeedback("Avatar upload coming soon")}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-lg border text-slate-600"
                >
                  <Camera size={14} />
                </button>
              </div>

              {/* EDIT MODE */}
              {isEditing ? (
                <div className="space-y-3">

                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) =>
                      setTempProfile({ ...tempProfile, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />

                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) =>
                      setTempProfile({ ...tempProfile, location: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-100 py-2 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              ) : (
                <div>

                  <div className="flex justify-between items-center">
                    <h2 className="text-lg sm:text-xl font-bold">
                      {profile.name}
                    </h2>

                    <button
                      onClick={() => showFeedback("Profile copied")}
                      className="text-gray-400"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {profile.username}
                  </p>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-2 items-center">
                      <MapPin size={14} /> {profile.location}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Calendar size={14} /> Joined 2024
                    </div>
                  </div>

                  <button
                    onClick={startEditing}
                    className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm"
                  >
                    Edit Profile
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border p-4 sm:p-6 shadow-sm">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-sm sm:text-base">
                Stats
              </h3>

              <button onClick={() => setIsShareModalOpen(true)}>
                <Share size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="text-gray-400 text-xs">Rank</p>
                <p className="font-bold">#1242</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="text-gray-400 text-xs">Points</p>
                <p className="font-bold">12,450</p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="lg:w-2/3">

          <div className="bg-white rounded-2xl border p-4 sm:p-6 shadow-sm">

            <h3 className="font-semibold mb-4">
              Account Info
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex gap-3 items-center">
                  <Mail size={16} />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <button className="text-primary text-sm">Change</button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Shield size={16} />
                  <span className="text-sm">••••••••</span>
                </div>
                <button className="text-primary text-sm">Update</button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}