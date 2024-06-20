'use client';
import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Image from 'next/image';

interface ImagesProps {
  images: Array<string>;
  title: string;
  className?: string;
}

export const Gallery: FC<ImagesProps> = ({ images, title, className }) => {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`image-${index}`}
              width={260}
              height={200}
              className="rounded"
              unoptimized={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
