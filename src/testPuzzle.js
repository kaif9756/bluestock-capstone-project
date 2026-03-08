import { generatePuzzleBySeed } from "./utils/puzzleGenerator.js";

for (let day = 1; day <= 365; day++) {

  const puzzle = generatePuzzleBySeed(day);

  console.log("Day:", day);
  console.log("Type:", puzzle.type);
  console.log("Question:", puzzle.question);
  console.log("Answer:", puzzle.answer);

  console.log("-------------");

}