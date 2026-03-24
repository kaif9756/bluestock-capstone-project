import React from "react";
import { Link } from "react-router-dom";
import { Brain, Flame, Trophy, Calendar, ArrowRight, Timer, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen grid-bg">

      <main className="pt-32 pb-20">

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 text-center">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border text-blue-700 text-xs mb-6"
          >
            <Calendar className="w-3 h-3" />
            {today}
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6">
            Sharpen Your Thinking <br />
            <span className="text-blue-600">One Puzzle Every Day</span>
          </motion.h1>

          <motion.p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Solve a new logic puzzle daily. Build your streak and improve your thinking in just a few minutes.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">

            <Link
              to="/Puzzle"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2"
            >
              Start Today's Puzzle
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/dashboard"
              className="bg-white border px-8 py-4 rounded-2xl font-semibold"
            >
              View Progress
            </Link>

          </motion.div>

          {/* STATS */}
          <div className="flex justify-center gap-12 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" />
              <span>3 Day Streak</span>
            </div>

            <div className="flex items-center gap-2">
              <Timer className="text-blue-600" />
              <span>2 min avg</span>
            </div>

          </div>

        </section>

        {/* PUZZLE PREVIEW */}
        <section className="mt-32 max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-6">Today’s Puzzle</h2>

          <div className="bg-white p-8 rounded-3xl border max-w-md mx-auto">

            <p className="text-gray-500 mb-2">Sequence</p>
            <h3 className="text-xl font-bold mb-6">
              2, 4, 8, 16, ?
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {[24, 32, 30].map((v) => (
                <button
                  key={v}
                  className="border py-3 rounded-lg hover:border-blue-600"
                >
                  {v}
                </button>
              ))}
            </div>

            <Link to="/Puzzle" className="block mt-6 text-blue-600">
              Solve Full Puzzle →
            </Link>

          </div>

        </section>

        {/* FEATURES */}
        <section className="py-32 max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-12">Why Logic Looper?</h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-8 border rounded-2xl">
              <Brain className="mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold">Think Better</h3>
              <p className="text-gray-500 text-sm">
                Improve your logical thinking daily.
              </p>
            </div>

            <div className="p-8 border rounded-2xl">
              <Flame className="mx-auto mb-4 text-orange-500" />
              <h3 className="font-bold">Stay Consistent</h3>
              <p className="text-gray-500 text-sm">
                Build your daily streak habit.
              </p>
            </div>

            <div className="p-8 border rounded-2xl">
              <Trophy className="mx-auto mb-4 text-yellow-500" />
              <h3 className="font-bold">Track Progress</h3>
              <p className="text-gray-500 text-sm">
                See your improvement over time.
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="text-center py-20">

          <h2 className="text-4xl font-bold mb-6">
            Ready for Today’s Puzzle?
          </h2>

          <Link
            to="/Puzzle"
            className="bg-black text-white px-8 py-4 rounded-xl inline-flex items-center gap-2"
          >
            Start Now
            <ArrowRight />
          </Link>

        </section>

      </main>

      <footer className="py-4 sm:py-6 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-600">
          © Copyright & Trademark Registered in India{" "}
          <a
            href="https://bluestock.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Bluestock™
          </a>{" "}
          All Rights Reserved
        </div>
      </footer>

    </div>
  );
}