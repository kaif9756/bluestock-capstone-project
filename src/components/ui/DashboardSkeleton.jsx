import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {

  return (

    <div className="space-y-6">

      {/* Hero */}
      <Skeleton className="h-32 w-full rounded-xl" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>

      {/* Heatmap */}
      <Skeleton className="h-48 w-full" />

    </div>

  );

}