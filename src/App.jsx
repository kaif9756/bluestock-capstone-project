import { useState, useEffect } from "react";

const MAX_STREAK = 365;

function App() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [lastSolvedDate, setLastSolvedDate] = useState(null);
  const [canSolveToday, setCanSolveToday] = useState(true);

  // Load saved data
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Logic Looper Dashboard</h1>

      <h2>🔥 Current Streak: {streak}</h2>
      <h3>🏆 Longest Streak: {longestStreak}</h3>
      <h3>🧩 Puzzles Solved: {puzzlesSolved}</h3>

      {canSolveToday ? (
        <button onClick={updateStreak}>Solve Today's Puzzle</button>
      ) : (
        <p>✅ You already solved today's puzzle</p>
      )}
    </div>
  );
}

export default App;