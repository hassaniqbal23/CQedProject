'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import countriesData from '@/public/countries/countries.json';

interface Countries {
  [key: string]: string;
}

interface CountriesListProps {
  countriesList?: Array<{ flag: string; countryCode: string }>;
  title: string;
  className?: string;
}

const countries: Countries = countriesData;

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
          {countriesList?.map((item, index) => (
            <div key={index} className="flex items-center">
              <Image
                src={item.flag}
                alt={`flag-${item.countryCode}`}
                width={25}
                height={30}
                className=""
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-sm">
                {countries[item.countryCode] || 'Unknown Country'}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
