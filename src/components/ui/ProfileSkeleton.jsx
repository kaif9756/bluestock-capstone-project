import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {

  return (

    <div className="flex flex-col lg:flex-row gap-8">

      <Skeleton className="h-96 w-full lg:w-1/3" />

      <Skeleton className="h-96 w-full lg:w-2/3" />

    </div>

  );

}