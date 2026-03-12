import { generateDailyPuzzle, validateAnswer } from "./utils/puzzleGenerator.js"
import { startTimer, stopTimer } from "./utils/timer.js"
import { getHint, resetHints } from "./utils/hintSystem.js"
import { saveProgress, loadProgress } from "./utils/progressDB.js"

const puzzle = generateDailyPuzzle()

console.log("Today's Puzzle:", puzzle.question)
console.log("Correct Answer:", puzzle.answer)

// load saved progress
if (typeof indexedDB !== "undefined") {

    const progress = await loadProgress("todayPuzzle")

    if(progress){
        console.log("Restored Progress:", progress)
    }

}

// timer start
startTimer()

// random delay (2-7 seconds)
const delay = Math.floor(Math.random() * 5000) + 2000

setTimeout(async () => {

    const userAnswer = puzzle.answer

    const correct = validateAnswer(userAnswer, puzzle)

    if(correct){

        const timeTaken = stopTimer()

        console.log("Correct!")
        console.log("Solved in:", timeTaken,"seconds")

        if (typeof indexedDB !== "undefined") {

            await saveProgress("todayPuzzle", {
                answer: userAnswer,
                solved: true,
                timeTaken: timeTaken,
                hintsUsed: 0
            })

            console.log("Progress Saved ✔")
        }

    } else {

        console.log("Wrong answer")

    }

}, delay)