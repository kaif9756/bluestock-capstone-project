import { motion, AnimatePresence } from "framer-motion";
import { generateDailyPuzzle, validateAnswer } from "../utils/puzzleGenerator";
import { useState, useEffect } from "react";
import { Trophy, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveActivity } from "../utils/db";

export default function Puzzle() {

  const [puzzle, setPuzzle] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [isSolved, setIsSolved] = useState(false);

  const navigate = useNavigate();

  // load puzzle once
  useEffect(() => {
    const loadPuzzle = async () => {
      const p = await generateDailyPuzzle();
      setPuzzle(p);
    };
    loadPuzzle();
  }, []);

  const handleCheck = async () => {

    if (!puzzle) return;

    const correct = validateAnswer(answerInput, puzzle);

    if (correct) {

      setStatus("correct");
      setIsSolved(true);

      await saveActivity({
        date: new Date().toISOString().split("T")[0],
        solved: true,
        score: 150,
        timeTaken: 45,
        difficulty: puzzle.difficulty
      });

    } else {

      setStatus("wrong");

      setTimeout(() => {
        setStatus("idle");
      }, 1000);

    }

  };

  if (!puzzle) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Puzzle...
      </div>
    );
  }

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
            Daily Puzzle
          </h1>

          <p className="text-slate-500 mt-2">
            Solve today's logic challenge.
          </p>

        </header>


        {/* Puzzle Question */}

        <div className="text-center text-xl font-bold mb-10">

          {Array.isArray(puzzle.question)
            ? JSON.stringify(puzzle.question)
            : puzzle.question}

        </div>


        {/* Answer Input */}

        <div className="flex justify-center gap-4 mb-8">

          <input
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            placeholder="Enter Answer"
            className="border p-3 rounded-lg w-48 text-center"
            disabled={isSolved}
          />

          <button
            onClick={handleCheck}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            disabled={isSolved}
          >
            Submit
          </button>

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
