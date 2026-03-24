import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Hero */}
      <Skeleton className="h-24 sm:h-32 w-full rounded-xl" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-20 sm:h-24 rounded-xl" />
        <Skeleton className="h-20 sm:h-24 rounded-xl" />
        <Skeleton className="h-20 sm:h-24 rounded-xl" />
      </div>

      {/* Heatmap */}
      <Skeleton className="h-40 sm:h-48 w-full rounded-xl" />

    </div>
  );
}