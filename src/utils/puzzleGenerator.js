import dayjs from "dayjs";

function getseedFromDate(){
    const today = dayjs().format("YYYY-MM-DD");
    const seed = today.split("-").reduce((acc, val) => acc + parseInt(val), 0);
    return seed;

}
function random(seed) {
    const X = Math.sin(seed) * 10000;
    return X - Math.floor(X);
}
// Sequence Puzzle
function generateSequencePuzzle(seed) {
    const start = Math.floor(random(seed) * 10) + 1;
    const step = Math.floor(random(seed + 1) * 5) + 1;
    const sequence = [
        start,
        start + step,
        start + step * 2,
        start + step * 3
    ];
    const answer = start + step * 4;
    return {
        type: "sequence",
        question: `${sequence.join(", ")}, ?`,
        answer
    };
}
// Pattern Puzzle
function generatePatternPuzzle(seed) {
    const pattern = [
        ["A","B","A","B","?"],
        ["X","Y","X","Y","?"],
        ["🔴","🔵","🔴","🔵","?"]
    ];
    const index = seed % pattern.length;
    return{
        type: "pattern",
        question: pattern[index].join(" "),
        answer: pattern[index][1]
    };
}
// Matrix Puzzle
function generateMatrixPuzzle(seed) {
    const a = Math.floor(random(seed)*5)+1;
    const matrix = [
        [a, a*2],
        [a*3,"?"]
    ];
    const answer = a*4;
    return{
        type: "matrix",
        question: matrix,
        answer
    };
}
// Binary logic Puzzle
function generateBinaryLogicPuzzle(seed) {
    const a = Math.floor(random(seed)*10);
    const b = Math.floor(random(seed+1)*10);
    const answer = a&b;
    return{
        type: "binary",
        question: `${a} AND ${b} = ?`,
        answer
    };
}
// det day of year puzzle
function getDayofYear() {
    const today = new Date();
    const start = new Date(today.getFullYear(),0,0);
    const diff = today - start;
    const oneDay = 1000*60*60*24;
    const day = Math.floor(diff/oneDay);
    return day;
}
// difficulty function
function getDifficulty(day) {
    if(day <= 120) return "easy";
    if(day <= 240) return "medium";
    return "hard";
}
// new daily puzzle generator
export function generateDailyPuzzle() {
    const seed = getseedFromDate();
    const day = getDayofYear();
    const difficulty = getDifficulty(day);
    const puzzleTypes =  seed % 4;
    let puzzle;

    if(puzzleTypes === 0) puzzle = generateSequencePuzzle(seed);
    if(puzzleTypes === 1) puzzle = generatePatternPuzzle(seed);
    if(puzzleTypes === 2) puzzle = generateMatrixPuzzle(seed);
    if(puzzleTypes === 3) puzzle = generateBinaryLogicPuzzle(seed);

    if(!puzzle) {
        throw new Error("Puzzle generation failed");
    }

    puzzle.difficulty = difficulty;
    return puzzle;
}
// puzzle validation engine
export function validateAnswer(userAnswer, puzzle) {
    return String(userAnswer) === String(puzzle.answer)
}
// generate puzzle by seed for testing
export function generatePuzzleBySeed(seed) {
    const diffculty = getDifficulty(seed);
    const puzzleTypes = seed % 4;
    let puzzle;
    if(puzzleTypes === 0) puzzle = generateSequencePuzzle(seed);
    if(puzzleTypes === 1) puzzle = generatePatternPuzzle(seed);
    if(puzzleTypes === 2) puzzle = generateMatrixPuzzle(seed);
    if(puzzleTypes === 3) puzzle = generateBinaryLogicPuzzle(seed);
    puzzle.difficulty = diffculty;
    return puzzle;
}
 