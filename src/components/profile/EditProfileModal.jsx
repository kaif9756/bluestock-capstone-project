import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ open, onClose }) {

  const [name, setName] = useState("");

  const saveName = () => {
    localStorage.setItem("user", JSON.stringify({ name }));
    onClose();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 z-50 w-96"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Edit Profile</h3>
              <button onClick={onClose}>
                <X size={18}/>
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            />

            <button
              onClick={saveName}
              className="bg-primary text-white px-4 py-2 rounded-lg w-full"
            >
              Save
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}