import { useState, useEffect } from "react";
import { MapPin, Calendar, Mail, Shield, Share2 } from "lucide-react";
import ShareStreakModal from "../components/ui/ShareStreakModal";

export default function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    username: "@alex_logic_master",
    location: "San Francisco, CA",
    email: "alex.rivera@example.com"
  });

  const [tempProfile, setTempProfile] = useState(profile);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Save profile
  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("profile", JSON.stringify(tempProfile));
    setIsEditing(false);
  };

  // Copy username
  const handleCopy = () => {
    navigator.clipboard.writeText(profile.username);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

      <ShareStreakModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        streak={13}
      />

      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="lg:w-1/3 space-y-6">

          {/* Profile Card */}
          <div className="bg-white border rounded-2xl shadow-sm p-5">

            <div className="flex items-center gap-4">

              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                className="w-16 h-16 rounded-xl bg-gray-100"
              />

              <div className="flex-1">

                {isEditing ? (
                  <input
                    value={tempProfile.name}
                    onChange={(e) =>
                      setTempProfile({ ...tempProfile, name: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                ) : (
                  <h2 className="font-semibold text-lg">{profile.name}</h2>
                )}

                <div className="flex items-center justify-between">

                  <p className="text-sm text-gray-500">
                    {profile.username}
                  </p>

                  <button onClick={handleCopy}>
                    <Share2 size={14} />
                  </button>

                </div>

              </div>

            </div>

            {/* Location */}
            <div className="mt-4 text-sm text-gray-600 space-y-2">

              {isEditing ? (
                <input
                  value={tempProfile.location}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, location: e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {profile.location}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar size={14} />
                Joined 2024
              </div>

            </div>

            {/* Buttons */}
            <div className="mt-5">

              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempProfile(profile);
                    setIsEditing(true);
                  }}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm"
                >
                  Edit Profile
                </button>
              )}

            </div>

          </div>

          {/* Stats */}
          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Stats</h3>
              <button onClick={() => setIsShareModalOpen(true)}>
                Share
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs">Rank</p>
                <p className="font-bold">#1242</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs">Points</p>
                <p className="font-bold">12,450</p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="lg:w-2/3">

          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <h3 className="font-semibold mb-4">Account Info</h3>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  {profile.email}
                </div>
                <button className="text-primary">Change</button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield size={14} />
                  ••••••••
                </div>
                <button className="text-primary">Update</button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}