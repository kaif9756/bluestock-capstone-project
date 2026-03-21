import { generateDailyPuzzle, validanswer, validateAnswer } from "./puzzleGenerator.js"
import { startTimer, stopTimer } from "./timer.js"
import { updateStreak } from "./streakSystem.js";
 
const puzzle = generateDailyPuzzle();
startTimer();
const userAnswer = prompt(puzzle.question);
const correct = validateAnswer(userAnswer, puzzle);
if(correct) {
    const timeTaken = stopTimer()
    console.log("Correct!")
    console.log("Solved in", timeTaken, "seconds")
    let progress = JSON.parse(localStorage.getItem("progress")) || {
    currentStreak:0,
    longestStreak:0,
    puzzlesSolved:0,
    lastSolvedDate:null
    }

    // update streak
    progress = updateStreak(progress)

    // save updated progress
    localStorage.setItem("progress", JSON.stringify(progress))

    console.log("Current Streak:", progress.currentStreak)
    console.log("Longest Streak:", progress.longestStreak)
    console.log("Puzzles Solved:", progress.puzzlesSolved)

}else {
    console.log("wrong answer, try again tomorrow!")
}