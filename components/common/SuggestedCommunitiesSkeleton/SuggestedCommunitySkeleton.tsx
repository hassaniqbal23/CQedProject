import React from 'react';
import { Typography } from '../Typography/Typography';

function SuggestedCommunitySkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <Typography
        variant="h4"
        weight="semibold"
        className="flex whitespace-nowrap my-3"
      >
        Suggested Communities
      </Typography>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 animate-pulse bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 animate-pulse bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 animate-pulse bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="h-8 w-16 animate-pulse bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-blue-600 flex justify-center">
        <div className="h-4 animate-pulse bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}

export default SuggestedCommunitySkeleton;
