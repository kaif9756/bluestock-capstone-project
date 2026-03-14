import { motion, AnimatePresence } from "framer-motion";
import { X, Share2 } from "lucide-react";

export default function ShareStreakModal({ isOpen, onClose, streak }) {

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `🔥 I solved puzzles for ${streak} days in a row on Logic Looper!`
    );
    alert("Copied to clipboard!");
  };

  return (
    <AnimatePresence>

      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-2xl z-50 w-[350px]"
          >

            <div className="flex justify-between items-center mb-6">

              <h3 className="text-lg font-bold">
                Share Your Streak
              </h3>

              <button onClick={onClose}>
                <X size={18}/>
              </button>

            </div>

            <p className="text-gray-500 text-sm mb-6 text-center">
              🔥 You are on a <span className="font-bold">{streak} day streak!</span>
            </p>

            <button
              onClick={handleCopy}
              className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90"
            >
              <Share2 size={18}/>
              Copy Share Text
            </button>

          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
}