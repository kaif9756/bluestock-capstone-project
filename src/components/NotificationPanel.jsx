import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Zap, Trophy, MessageSquare, Star } from "lucide-react";

const notifications = [
  {
    id: "1",
    title: "New Daily Puzzle!",
    desc: "The Quantum Paradox is now live. Solve it to keep your streak!",
    time: "2m ago",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    unread: true
  },
  {
    id: "2",
    title: "Leaderboard Update",
    desc: "You've moved up to #1,242 in the global rankings.",
    time: "1h ago",
    icon: Trophy,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    unread: true
  },
  {
    id: "3",
    title: "Achievement Unlocked",
    desc: "You earned the 'Streak Master' badge.",
    time: "5h ago",
    icon: Star,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    unread: false
  },
  {
    id: "4",
    title: "New Message",
    desc: "Sarah challenged you to a logic duel.",
    time: "Yesterday",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-50",
    unread: false
  }
];

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
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          />

          {/* Panel */}

          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 w-full max-w-sm bg-white rounded-2xl border shadow-xl overflow-hidden"
          >

            {/* Header */}

            <div className="p-5 border-b flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Bell size={18} />

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  2
                </span>

              </div>

              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={18} />
              </button>

            </div>


            {/* Notifications List */}

            <div className="max-h-[400px] overflow-y-auto">

              {notifications.map((notif) => {

                const Icon = notif.icon;

                return (

                  <div
                    key={notif.id}
                    className={`p-4 flex gap-4 hover:bg-gray-50 transition relative ${
                      notif.unread ? "bg-indigo-50/30" : ""
                    }`}
                  >

                    {notif.unread && (
                      <div className="absolute top-5 right-4 w-2 h-2 bg-primary rounded-full"></div>
                    )}

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notif.bg} ${notif.color}`}>
                      <Icon size={20} />
                    </div>

                    <div className="space-y-1">

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


            {/* Footer */}

            <div className="p-4 bg-gray-50 border-t">

              <button className="w-full text-sm font-semibold text-primary hover:opacity-80">
                Mark all as read
              </button>

            </div>

          </motion.div>
        </>
      )}

    </AnimatePresence>
  );
}