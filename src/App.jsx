import { useState, useEffect } from "react";

const MAX_STREAK = 365;

function App() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [lastSolvedDate, setLastSolvedDate] = useState(null);
  const [canSolveToday, setCanSolveToday] = useState(true);

  const [answer, setAnswer] = useState("");
  const correctAnswer = "5";

  // Load data
  useEffect(() => {
    const storedStreak = Number(localStorage.getItem("streak"));
    const storedLongest = Number(localStorage.getItem("longestStreak"));
    const storedSolved = Number(localStorage.getItem("puzzlesSolved"));
    const storedLastDate = localStorage.getItem("lastSolvedDate");

    const validStreak =
      isNaN(storedStreak) || storedStreak < 0
        ? 0
        : Math.min(storedStreak, MAX_STREAK);

    const validLongest =
      isNaN(storedLongest) || storedLongest < 0
        ? 0
        : Math.min(storedLongest, MAX_STREAK);

    const validSolved =
      isNaN(storedSolved) || storedSolved < 0 ? 0 : storedSolved;

    setStreak(validStreak);
    setLongestStreak(validLongest);
    setPuzzlesSolved(validSolved);
    setLastSolvedDate(storedLastDate);

    const today = new Date().toDateString();

    if (storedLastDate === today) {
      setCanSolveToday(false);
    }
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = streak;

    if (lastSolvedDate === today) {
      alert("You already solved today's puzzle!");
      return;
    }

    if (lastSolvedDate === yesterdayStr) {
      newStreak = streak + 1;
    } else {
      newStreak = 1;
    }

    if (newStreak > MAX_STREAK) {
      newStreak = MAX_STREAK;
    }

    const newSolved = puzzlesSolved + 1;

    setStreak(newStreak);
    setPuzzlesSolved(newSolved);
    setLastSolvedDate(today);
    setCanSolveToday(false);

    localStorage.setItem("streak", newStreak);
    localStorage.setItem("puzzlesSolved", newSolved);
    localStorage.setItem("lastSolvedDate", today);

    if (newStreak > longestStreak) {
      setLongestStreak(newStreak);
      localStorage.setItem("longestStreak", newStreak);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>Logic Looper</h1>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>🔥 {streak}</h2>
        <p>Current Streak</p>

        <h3>🏆 {longestStreak}</h3>
        <p>Best</p>

        <h3>🧩 {puzzlesSolved}</h3>
        <p>Solved</p>
      </div>

      <br />

      {canSolveToday ? (
        <>
          <p>Solve this puzzle: What is 2 + 3?</p>

          <input
            type="text"
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ padding: "10px", marginTop: "10px" }}
          />

          <br />
          <br />

          <button
            onClick={() => {
              if (answer === correctAnswer) {
                updateStreak();
                alert("Correct Answer!");
                setAnswer("");
              } else {
                alert("Wrong Answer!");
              }
            }}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#4CAF50",
              color: "white",
              fontSize: "16px",
            }}
          >
            Submit Answer
          </button>
        </>
      ) : (
        <p>✅ Come back tomorrow!</p>
      )}
    </div>
  );
}

export default App;