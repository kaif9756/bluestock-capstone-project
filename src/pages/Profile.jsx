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
  Share2
} from "lucide-react";
import { useState } from "react";

export default function Profile() {

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: storedUser?.name || "Guest Player",
    username: storedUser?.username || "@logic_player",
    location: "India",
    email: storedUser?.email || "user@example.com"
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const [message, setMessage] = useState(null);

  const showFeedback = (msg) => {

    setMessage(msg);

    setTimeout(() => setMessage(null), 3000);

  };

  const handleSave = () => {

    setProfile({ ...tempProfile });

    setIsEditing(false);

    showFeedback("Profile updated successfully!");

  };

  const handleCancel = () => {

    setTempProfile({ ...profile });

    setIsEditing(false);

  };

  return (

    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      className="p-8 space-y-8 max-w-6xl mx-auto"
    >

      {/* Toast Message */}

      <AnimatePresence>

        {message && (

          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >

            <Check size={16} className="text-green-400" />

            {message}

          </motion.div>

        )}

      </AnimatePresence>


      <div className="flex flex-col lg:flex-row gap-8">


        {/* Profile Card */}

        <div className="lg:w-1/3 space-y-6">

          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

            <div className="h-32 bg-gradient-to-r from-primary to-indigo-500 relative">

              <button
                onClick={() => showFeedback("Cover upload coming soon")}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-lg text-white"
              >

                <Camera size={16} />

              </button>

            </div>


            <div className="px-6 pb-6">

              <div className="relative -mt-16 mb-4">

                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg">

                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />

                </div>

                <button
                  onClick={() => showFeedback("Avatar upload coming soon")}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-xl border shadow-sm text-gray-600"
                >

                  <Camera size={16} />

                </button>

              </div>


              {isEditing ? (

                <div className="space-y-4">

                  <div>

                    <label className="text-xs text-gray-400">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) =>
                        setTempProfile({ ...tempProfile, name:e.target.value })
                      }
                      className="w-full mt-1 bg-gray-50 border rounded-lg px-3 py-2 text-sm"
                    />

                  </div>


                  <div>

                    <label className="text-xs text-gray-400">
                      Location
                    </label>

                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) =>
                        setTempProfile({ ...tempProfile, location:e.target.value })
                      }
                      className="w-full mt-1 bg-gray-50 border rounded-lg px-3 py-2 text-sm"
                    />

                  </div>


                  <div className="flex gap-2 pt-2">

                    <button
                      onClick={handleSave}
                      className="flex-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-1"
                    >

                      <Check size={16} /> Save

                    </button>

                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 py-2 rounded-lg flex items-center justify-center gap-1"
                    >

                      <X size={16} /> Cancel

                    </button>

                  </div>

                </div>

              ) : (

                <div>

                  <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                      {profile.name}
                    </h2>

                    <button
                      onClick={() => showFeedback("Profile link copied")}
                      className="text-gray-400 hover:text-primary"
                    >

                      <Share2 size={18} />

                    </button>

                  </div>


                  <p className="text-gray-500">
                    {profile.username}
                  </p>


                  <div className="mt-6 space-y-3 text-sm text-gray-600">

                    <div className="flex items-center gap-2">

                      <MapPin size={16} />

                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Joined 2026
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}

          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <h3 className="font-bold mb-4">
              Performance Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-xs text-gray-400">
                  Rank
                </p>
                <p className="text-xl font-bold">
                  #1242
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <p className="text-xs text-gray-400">
                  Points
                </p>
                <p className="text-xl font-bold">
                  12450
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}

        <div className="lg:w-2/3">

          <div className="bg-white rounded-3xl border p-8 shadow-sm">

            <h3 className="text-xl font-bold mb-6">
              Account Information
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Mail size={20} />
                  <div>
                    <p className="font-semibold">
                      Email
                    </p>
                    <p className="text-sm text-gray-500">
                      {profile.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showFeedback("Email change requested")}
                  className="text-primary"
                >
                  Change
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Shield size={20} />
                  <div>
                    <p className="font-semibold">
                      Password
                    </p>
                    <p className="text-sm text-gray-500">
                      ••••••••
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showFeedback("Password reset email sent")}
                  className="text-primary"
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