import ProgressCard from "./components/ProgressCard";

function App() {
  const progress = {
    currentStreak: 3,
    longestStreak: 7,
    puzzlesSolved: 15
  };

  return (
    <div>
      <h1>Logic Looper Dashboard</h1>
      <ProgressCard progress={progress} />
    </div>
  );
}
export default App;
