import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SingleChatSkeleton = () => {
    return (
        <div className="flex bg-white p-3 mr-3 mb-3 rounded-lg items-center shadow gap-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <div className="flex items-center w-full">
                <div className="flex flex-col w-[180px] leading-5">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <div className="flex gap-2 items-center">
                        <Skeleton className="h-3 w-1/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
                <div className="flex flex-col text-xs items-end leading-3">
                    <Skeleton className="h-3 w-10 mb-1" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default SingleChatSkeleton;