import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">

      <Skeleton className="h-72 sm:h-96 w-full lg:w-1/3 rounded-xl" />

      <Skeleton className="h-72 sm:h-96 w-full lg:w-2/3 rounded-xl" />

    </div>
  );
}