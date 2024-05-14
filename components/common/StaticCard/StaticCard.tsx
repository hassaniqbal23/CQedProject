import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Dropdown } from '../../ui';
import { TrendingUp } from 'lucide-react';
import { Typography } from '../Typography/Typography';

interface IStaticCardProps {
  title: string;
  number: string | number;
  percentage: string | number;
  dropdown?: boolean;
  dropdownOptions?: {
    label: string;
    options: any[];
  };
}
function StaticCard({
  title,
  number,
  percentage,
  dropdown,
  dropdownOptions,
}: IStaticCardProps) {
  return (
    <Card className="w-full h-[169px]">
      <CardHeader
        className={`px-4 flex justify-between flex-row items-center border-b ${dropdown ? 'py-1' : 'py-4'}`}
      >
        <CardTitle className="font-medium text-xl w-2/3">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center h-3/4">
        <div className="flex justify-between items-center w-full">
          <Typography variant="h2" weight="semibold">
            {number}
          </Typography>
          <div className="p-1 rounded-full flex items-center justify-center gap-2 border border-success bg-success-50 text-success text-sm">
            <TrendingUp className="w-1/3" />
            <p>{percentage}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { StaticCard };
