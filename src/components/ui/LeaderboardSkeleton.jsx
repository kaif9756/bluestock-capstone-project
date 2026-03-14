import Skeleton from "./Skeleton";

export default function LeaderboardSkeleton(){

  return(

    <div className="space-y-4">

      <Skeleton className="h-24 w-full"/>

      <Skeleton className="h-16 w-full"/>
      <Skeleton className="h-16 w-full"/>
      <Skeleton className="h-16 w-full"/>
      <Skeleton className="h-16 w-full"/>

    </div>

  )

}