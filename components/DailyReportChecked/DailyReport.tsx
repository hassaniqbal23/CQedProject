import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Typography } from '../common/Typography/Typography';
import { format } from 'date-fns';

interface CheckInProps {
  name: string;
}

export const DailyReportCheckIn: React.FC<CheckInProps> = ({ name }) => {
  const [time, setTime] = useState(format(new Date(), 'hh:mm a'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'hh:mm a'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-5">
      <div className="bg-primary-500 w-14 h-14 rounded-full flex justify-center items-center">
        <span>
          <Check className="text-white" width={32} height={32} />
        </span>
      </div>
      <div>
        <Typography variant="h5" weight="bold">
          Checked in {time}
        </Typography>
        <Typography variant="p" weight="regular">
          {name}
        </Typography>
      </div>
    </div>
  );
};
