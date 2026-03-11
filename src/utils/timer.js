let startTime = null;
export function startTimer() {
    startTime = Date.now(); 
}
export function stopTimer() {
    if(!startTime) return 0;
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    startTime = null;
    return timeTaken;
}