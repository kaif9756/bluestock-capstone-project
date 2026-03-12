import { useState, useEffect } from "react";

function App() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);

  // Load data from localStorage
  useEffect(() => {
  const storedStreak = Number(localStorage.getItem("streak"));
  const storedLongest = Number(localStorage.getItem("longestStreak"));
  const storedSolved = Number(localStorage.getItem("puzzlesSolved"));

  const validStreak = isNaN(storedStreak) || storedStreak < 0 ? 0 : storedStreak;
  const validLongest = isNaN(storedLongest) || storedLongest < 0 ? 0 : storedLongest;
  const validSolved = isNaN(storedSolved) || storedSolved < 0 ? 0 : storedSolved;

  setStreak(validStreak);
  setLongestStreak(validLongest);
  setPuzzlesSolved(validSolved);

}, []);


  // Example function to update streak
  const updateStreak = () => {
    const newStreak = streak + 1;

    setStreak(newStreak);
    localStorage.setItem("streak", newStreak);

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