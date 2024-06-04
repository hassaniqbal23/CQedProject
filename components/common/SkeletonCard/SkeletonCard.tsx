import { Skeleton } from '@/components/ui';
import React from 'react';

const SkeletonCard = ({ noOfCards = 4 }) => {
  let array = Array.from({ length: noOfCards }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {array.map(() => (
        <div className="flex flex-col p-3 rounded-lg shadow-sm min-h-96 max-h-96">
          <div className="h-48 w-full">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-4">
            <h2 className="mb-2">
              <Skeleton className="h-6 w-3/4" />
            </h2>
            <p className="mb-4">
              <Skeleton className="h-4 w-full" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
