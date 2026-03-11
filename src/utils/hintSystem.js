let hintsUsed = 0 
const MAX_HiNTS = 2
export function getHint(puzzle) {
    if(hintsUsed >= MAX_HiNTS){
        return "NO MORE HINTS AVAILABLE"
    }
    hintsUsed++
    const answer = String(puzzle.answer)
    if(hintsUsed === 1){
        return "Hint: Answer starts with " + answer[0]
    }
    if(hintsUsed === 2){
        return "Hint: Answer length is " + answer.length
    }
} 
export function resetHints(){
    hintsUsed = 0
}