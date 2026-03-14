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
      <div className="p-8 space-y-8 max-w-6xl mx-auto animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 space-y-6">
            <div className="h-96 bg-slate-100 rounded-3xl"></div>
            <div className="h-48 bg-slate-100 rounded-3xl"></div>
          </div>
          <div className="lg:w-2/3 h-[500px] bg-slate-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-8 max-w-6xl mx-auto"
    >

      {/* Share Modal */}
      <ShareStreakModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        streak={13}
      />

      {/* Toast Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold"
          >
            <Check size={18} className="text-emerald-400" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Profile Card */}
        <div className="lg:w-1/3 space-y-6">

          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
              <button
                onClick={() => showFeedback("Cover photo upload coming soon!")}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white"
              >
                <Camera size={16} />
              </button>
            </div>

            <div className="px-6 pb-6">

              {/* Avatar */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Avatar"
                    className="w-full h-full"
                  />
                </div>

                <button
                  onClick={() => showFeedback("Avatar upload coming soon!")}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-xl border shadow-sm text-slate-600"
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* Editing Mode */}
              {isEditing ? (
                <div className="space-y-4">

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) =>
                        setTempProfile({ ...tempProfile, name: e.target.value })
                      }
                      className="w-full mt-1 bg-slate-50 border rounded-xl px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">
                      Location
                    </label>
                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) =>
                        setTempProfile({
                          ...tempProfile,
                          location: e.target.value
                        })
                      }
                      className="w-full mt-1 bg-slate-50 border rounded-xl px-4 py-2"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">

                    <button
                      onClick={handleSave}
                      className="flex-1 bg-primary text-white py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>

                  </div>

                </div>
              ) : (
                <div className="space-y-1">

                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>

                    <button
                      onClick={() => showFeedback("Profile link copied!")}
                      className="p-2 text-slate-400 hover:text-primary"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>

                  <p className="text-slate-500">{profile.username}</p>

                  <div className="mt-6 space-y-3 text-sm">

                    <div className="flex items-center gap-3">
                      <MapPin size={16} />
                      {profile.location}
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar size={16} />
                      Joined March 2024
                    </div>

                  </div>

                  <button
                    onClick={startEditing}
                    className="w-full mt-8 bg-slate-900 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm space-y-6">

            <div className="flex justify-between items-center">
              <h3 className="font-bold">Performance Stats</h3>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 text-slate-400 hover:text-primary"
              >
                <Share size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400">Rank</p>
                <p className="text-xl font-bold">#1242</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400">Points</p>
                <p className="text-xl font-bold">12,450</p>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="lg:w-2/3">

          <div className="bg-white rounded-3xl border p-8 shadow-sm">

            <h3 className="text-xl font-bold mb-8">Account Information</h3>

            <div className="space-y-6">

              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <Mail size={20} />
                  <div>
                    <p className="font-semibold">Email Address</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => showFeedback("Email change requested")}
                  className="text-primary text-sm font-semibold"
                >
                  Change
                </button>
              </div>

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">
                  <Shield size={20} />
                  <div>
                    <p className="font-semibold">Password</p>
                    <p className="text-sm text-gray-500">••••••••••</p>
                  </div>
                </div>

                <button
                  onClick={() => showFeedback("Password reset email sent")}
                  className="text-primary text-sm font-semibold"
                >
                  Update
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}