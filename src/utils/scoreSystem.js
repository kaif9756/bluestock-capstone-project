export function calculateScore(timeTaken, hintsUsed){
    if(timeTaken < 0 || hintsUsed < 0){
    return 0
    }
    const baseScore = 100
    const timeMultiplier = Math.max(0,120-timeTaken)
    const hintPenalty = hintsUsed * 10
    return baseScore + timeMultiplier - hintPenalty
}