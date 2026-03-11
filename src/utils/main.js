import { generateDailyPuzzle, validanswer, validateAnswer } from "./puzzleGenerator.js"
import { startTimer, stopTimer } from "./timer.js"
 
const puzzle = generateDailyPuzzle();
startTimer();
const userAnswer = prompt(puzzle.question);
const correct = validateAnswer(userAnswer, puzzle);
if(correct) {
    const timeTaken = stopTimer()
    console.log("Correct!")
    console.log("Solved in", timeTaken, "seconds")
}else {
    console.log("wrong answer, try again tomorrow!")
}