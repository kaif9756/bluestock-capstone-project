import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

export default function AchievementPopup({ open, title }) {

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-white border rounded-xl shadow-lg p-4 flex gap-3 z-50"
        >
          <div className="p-2 bg-yellow-50 text-yellow-500 rounded-lg">
            <Award size={20}/>
          </div>

          <div>
            <p className="font-semibold">
              Achievement Unlocked
            </p>

            <p className="text-sm text-gray-500">
              {title}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}