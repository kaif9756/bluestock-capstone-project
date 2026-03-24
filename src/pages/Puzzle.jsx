import { useState } from "react";

export default function PuzzlePage() {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="puzzle-card">
        
        <p className="text-sm text-gray-500">Bluestock • Today</p>

        <h2 className="text-xl font-semibold mt-2">
          📊 Daily IPO Insight
        </h2>

        <p className="mt-3 text-gray-700">
          ABC Ltd IPO at ₹450–₹500. Growth: 18%. Market: Positive.
        </p>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => setAnswer("Invest")}
            className="w-full border p-2 rounded hover:bg-gray-100"
          >
            Invest
          </button>

          <button
            onClick={() => setAnswer("Skip")}
            className="w-full border p-2 rounded hover:bg-gray-100"
          >
            Skip
          </button>
        </div>

        {answer && (
          <div className="mt-4 p-3 bg-blue-50 rounded">
            Experts Suggest: Invest 🚀
          </div>
        )}
      </div>
    </div>
  );
}