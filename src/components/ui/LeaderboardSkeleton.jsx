import Skeleton from "./Skeleton";

export default function LeaderboardSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-4">

      <Skeleton className="h-20 sm:h-24 w-full rounded-xl" />

      {[1,2,3,4].map((i) => (
        <Skeleton key={i} className="h-14 sm:h-16 w-full rounded-xl" />
      ))}

    </div>
  );
}