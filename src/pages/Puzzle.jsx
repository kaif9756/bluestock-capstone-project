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

    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-slate-50">

      <motion.div
        initial={{ opacity:0, scale:0.9 }}
        animate={{ opacity:1, scale:1 }}
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-xl border p-12 relative overflow-hidden"
      >

        {/* Header */}

        <header className="text-center mb-12">

          <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
            Logic Challenge
          </span>

          <h1 className="text-3xl font-black text-slate-900 mt-4">
            Complete the Sequence
          </h1>

          <p className="text-slate-500 mt-2">
            Identify the pattern and find the next number.
          </p>

        </header>


        {/* Sequence */}

        <div className="flex justify-center items-center gap-4 mb-16">

          {PUZZLE_SEQUENCE.map((num, i) => (

            <div
              key={i}
              className="w-16 h-16 rounded-xl bg-slate-50 border flex items-center justify-center text-xl font-bold text-slate-400"
            >
              {num}
            </div>

          ))}

          <motion.div
            animate={status === "correct" ? { scale:[1,1.1,1] } : {}}
            className="w-16 h-16 rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center text-xl font-bold text-indigo-600"
          >
            ?
          </motion.div>

        </div>


        {/* Options */}

        <div className="grid grid-cols-5 gap-4">

          {OPTIONS.map((opt) => (

            <motion.button
              key={opt}
              whileHover={{ y:-4 }}
              whileTap={{ scale:0.95 }}
              onClick={() => !isSolved && handleCheck(opt)}
              disabled={isSolved}
              className={`h-16 rounded-xl font-bold text-lg transition border-2
              
              ${
                selected === opt
                ? status === "correct"
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-rose-500 border-rose-500 text-white"
                : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
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
              className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8"
            >

              <motion.div
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                transition={{ type:"spring", damping:12 }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg"
              >

                <Trophy size={48}/>

              </motion.div>

              <h2 className="text-4xl font-black text-slate-900 mb-2">
                Brilliant!
              </h2>

              <p className="text-slate-500 mb-8 max-w-xs">
                You solved today's puzzle.
              </p>

              <button
                onClick={() => navigate("/")}
                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800"
              >

                Back to Dashboard
                <ArrowRight size={20}/>

              </button>

            </motion.div>

          )}

        </AnimatePresence>


        {/* Feedback Icons */}

        <div className="absolute top-8 right-8">

          <AnimatePresence mode="wait">

            {status === "correct" && (

              <motion.div
                key="correct"
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                exit={{ scale:0 }}
                className="text-emerald-500"
              >
                <CheckCircle2 size={32}/>
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
                <XCircle size={32}/>
              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>

  );

}