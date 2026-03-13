export function updateStreak(progress) {
  const today = new Date().toDateString();

  if (!progress.lastSolvedDate) {
    progress.currentStreak = 1;
  } else {
    const lastDate = new Date(progress.lastSolvedDate);
    const diff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      progress.currentStreak += 1;
    } else if (diff > 1) {
      progress.currentStreak = 1;
    }
  }

  progress.lastSolvedDate = today;
  progress.puzzlesSolved += 1;

  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }

  return progress;
}