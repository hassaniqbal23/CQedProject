'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import { getCountry } from '@/app/utils/helpers';
interface CountriesListProps {
  countriesList?: string[];
  title: string;
  className?: string;
}

export const WishCountries: FC<CountriesListProps> = ({
  countriesList,
  title,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-7">
          {countriesList?.map((item, index) => {
            const { flag = '', country } = getCountry(item);
            return (
              <div key={index} className="flex items-center">
                <Image
                  src={flag}
                  alt={`flag-${country}`}
                  width={25}
                  height={30}
                  className=""
                  unoptimized={true}
                />
                <Typography
                  variant="h6"
                  weight="medium"
                  className="ml-2 text-sm"
                >
                  {country}
                </Typography>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
