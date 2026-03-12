import { useState, useEffect } from "react";

const MAX_STREAK = 365;

function App() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    const storedStreak = Number(localStorage.getItem("streak"));
    const storedLongest = Number(localStorage.getItem("longestStreak"));
    const storedSolved = Number(localStorage.getItem("puzzlesSolved"));

    const validStreak =
      isNaN(storedStreak) || storedStreak < 0
        ? 0
        : Math.min(storedStreak, MAX_STREAK);

    const validLongest =
      isNaN(storedLongest) || storedLongest < 0
        ? 0
        : Math.min(storedLongest, MAX_STREAK);

    const validSolved =
      isNaN(storedSolved) || storedSolved < 0
        ? 0
        : storedSolved;

    setStreak(validStreak);
    setLongestStreak(validLongest);
    setPuzzlesSolved(validSolved);
  }, []);

  // Function to update streak when puzzle is solved
  const updateStreak = () => {
    let newStreak = streak + 1;

    // Clamp streak to max value
    if (newStreak > MAX_STREAK) {
      newStreak = MAX_STREAK;
    }

    const newSolved = puzzlesSolved + 1;

    setStreak(newStreak);
    setPuzzlesSolved(newSolved);

    localStorage.setItem("streak", newStreak);
    localStorage.setItem("puzzlesSolved", newSolved);

    if (newStreak > longestStreak) {
      setLongestStreak(newStreak);
      localStorage.setItem("longestStreak", newStreak);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Logic Looper Dashboard</h1>

      <p>🔥 Current Streak: {streak}</p>
      <p>🏆 Longest Streak: {longestStreak}</p>
      <p>🧩 Puzzles Solved: {puzzlesSolved}</p>

      <button onClick={updateStreak}>Solve Puzzle</button>
    </div>
  );
}

export default App;