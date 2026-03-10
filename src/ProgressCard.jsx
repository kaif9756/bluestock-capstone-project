import React from "react";

function ProgressCard({ progress }) {
  return (
    <div>
      <h2>🔥 Current Streak: {progress.currentStreak}</h2>
      <h3>🏆 Longest Streak: {progress.longestStreak}</h3>
      <p>🧩 Puzzles Solved: {progress.puzzlesSolved}</p>
    </div>
  );
}

export default ProgressCard;