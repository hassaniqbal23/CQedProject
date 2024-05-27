import { Typography } from '@/components/common/Typography/Typography';
import React from 'react';

export const DailyReport = () => {
  return (
    <div>
      <div className="grid grid-cols-9  px-8 py-3">
        <div className="col-span-8 ">
          <Typography variant="h4" weight="semibold">
            February 20, 2024
          </Typography>
          <Typography
            variant="body"
            weight="regular"
            className="mt-4 text-[#13151799]"
          >
            Parent can opt into automatic daily report emails from their profile
          </Typography>
        </div>
      </div>
    </div>
  );
};
