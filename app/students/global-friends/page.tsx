import React, { Suspense } from 'react';
import PenpalshipPage from '@/components/Penpalship/PenpalShipPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Friends - Students - GCED',
  description: 'Global Friends - Students - GCED',
};

const Penpalship = () => {
  return (
    <Suspense>
      <div>
        <PenpalshipPage />
      </div>
    </Suspense>
  );
};

export default Penpalship;
