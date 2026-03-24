import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Zap, Trophy, MessageSquare, Star } from "lucide-react";

const notifications = [/* same data */];

export default function NotificationPanel({ isOpen, onClose }) {
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
            className="fixed inset-0 z-40 bg-black/20"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 sm:top-20 sm:right-6 
            w-full sm:max-w-sm bg-white rounded-t-2xl sm:rounded-2xl 
            shadow-xl z-50"
          >

            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h3 className="font-semibold">Notifications</h3>
              </div>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => {
                const Icon = notif.icon;

                return (
                  <div
                    key={notif.id}
                    className="p-3 flex gap-3 hover:bg-gray-50"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${notif.bg} ${notif.color}`}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notif.desc}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
}