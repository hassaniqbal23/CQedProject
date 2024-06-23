import React from 'react';

function FeedsSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-full">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 animate-pulse bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 animate-pulse bg-gray-200 rounded w-24"></div>
          <div className="h-4 animate-pulse bg-gray-200 rounded w-16 mt-1"></div>
        </div>
      </div>
      <div className="mt-4 h-4 animate-pulse bg-gray-200 rounded w-3/4"></div>
      <div className="flex justify-between mt-4">
        <div className="flex space-x-4">
          <div className="h-6 w-6 animate-pulse bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 animate-pulse bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 animate-pulse bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default FeedsSkeleton;
