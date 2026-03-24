import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trophy, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveActivity } from "../utils/db";

const PUZZLE_SEQUENCE = [1, 3, 6, 10, 15];
const OPTIONS = [18, 20, 21, 24, 25];

export default function Puzzle() {

  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [isSolved, setIsSolved] = useState(false);

  const navigate = useNavigate();

  const handleCheck = async (val) => {

    setSelected(val);

    if (val === 21) {

      setStatus("correct");
      setIsSolved(true);

      await saveActivity({
        date: new Date().toISOString().split("T")[0],
        solved: true,
        score: 150,
        timeTaken: 45,
        difficulty: 2
      });

    } else {

      setStatus("wrong");

      setTimeout(() => {
        setStatus("idle");
        setSelected(null);
      }, 1000);

    }

  };

  return (

    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">

      <motion.div
        initial={{ opacity:0, scale:0.95 }}
        animate={{ opacity:1, scale:1 }}
        className="max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg border p-6 sm:p-10 relative"
      >

        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">

          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
            Logic Challenge
          </span>

          <h1 className="text-xl sm:text-3xl font-bold mt-3">
            Complete the Sequence
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Find the next number
          </p>

        </header>


        {/* Sequence */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-10 sm:mb-16">

          {PUZZLE_SEQUENCE.map((num, i) => (
            <div
              key={i}
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg bg-slate-50 border flex items-center justify-center text-sm sm:text-xl font-bold text-slate-400"
            >
              {num}
            </div>
          ))}

          <motion.div
            animate={status === "correct" ? { scale:[1,1.1,1] } : {}}
            className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center text-sm sm:text-xl font-bold text-indigo-600"
          >
            ?
          </motion.div>

        </div>


        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">

          {OPTIONS.map((opt) => (

            <motion.button
              key={opt}
              whileHover={{ y:-3 }}
              whileTap={{ scale:0.95 }}
              onClick={() => !isSolved && handleCheck(opt)}
              disabled={isSolved}
              className={`h-12 sm:h-16 rounded-lg font-semibold text-sm sm:text-lg border-2 transition
              
              ${
                selected === opt
                ? status === "correct"
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-rose-500 border-rose-500 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:bg-indigo-50"
              }
              `}
            >

              {opt}

            </motion.button>

          ))}

        </div>


        {/* Success Overlay */}
        <AnimatePresence>

          {isSolved && (

            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              className="absolute inset-0 bg-white/90 backdrop-blur flex flex-col items-center justify-center text-center p-6"
            >

              <motion.div
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                className="w-16 h-16 sm:w-24 sm:h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4"
              >
                <Trophy size={32}/>
              </motion.div>

              <h2 className="text-xl sm:text-3xl font-bold mb-2">
                Correct!
              </h2>

              <p className="text-sm text-slate-500 mb-6">
                You solved today's puzzle.
              </p>

              <button
                onClick={() => navigate("/")}
                className="bg-slate-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-sm"
              >
                Back
                <ArrowRight size={16}/>
              </button>

            </motion.div>

          )}

        </AnimatePresence>


        {/* Feedback Icons */}
        <div className="absolute top-4 right-4">

          <AnimatePresence mode="wait">

            {status === "correct" && (
              <motion.div
                key="correct"
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                exit={{ scale:0 }}
                className="text-emerald-500"
              >
                <CheckCircle2 size={24}/>
              </motion.div>
            )}

            {status === "wrong" && (
              <motion.div
                key="wrong"
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                exit={{ scale:0 }}
                className="text-rose-500"
              >
                <XCircle size={24}/>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>

  );

}