import { generateDailyPuzzle, validateAnswer } from "./puzzleGenerator.js"
import { startTimer, stopTimer } from "./timer.js"
import { getHint, resetHints } from "./hintSystem.js"

const puzzle = generateDailyPuzzle()

console.log("Today's Puzzle:", puzzle.question)
console.log("Correct Answer:", puzzle.answer)


// timer start
startTimer()

// random delay (2-7 seconds)
const delay = Math.floor(Math.random() * 5000) + 2000

setTimeout(() => {

    const userAnswer = puzzle.answer
    // const userAnswer = 999 // wrong answer for testing

    const correct = validateAnswer(userAnswer, puzzle)

    if(correct){

        const timeTaken = stopTimer()

        console.log("Correct!")
        console.log("Solved in:", timeTaken,"seconds")

    } else {

        console.log("Wrong answer")

    }

}, delay)