import dayjs from "dayjs";

export function calculateStreak(activity) {

  let streak = 0;
  let current = dayjs();

  while (activity[current.format("YYYY-MM-DD")]?.solved) {

    streak++;
    current = current.subtract(1, "day");

  }

  return streak;
}