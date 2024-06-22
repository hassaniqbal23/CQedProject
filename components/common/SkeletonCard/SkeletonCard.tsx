import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui';

const SkeletonCard = ({ noOfCards = 4, className = '' }) => {
  let array = Array.from({ length: noOfCards }, (_, i) => i + 1);
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6',
        className
      )}
    >
      {array.map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-3 rounded-lg shadow-sm min-h-96 max-h-96"
        >
          <div className="h-48 w-full">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-4">
            <h2 className="mb-2">
              <Skeleton className="h-6 w-3/4" />
            </h2>
            <div className="mb-4">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
