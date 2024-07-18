import React, { Suspense } from 'react';
import PenpalshipPage from '@/components/Penpalship/PenpalShipPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Friends - Teachers - GCED',
  description: 'Global Friends - Teachers - GCED',
  icons: '/favi.png',
};

const Penpalship = () => {
  return (
    <Suspense>
      <PenpalshipPage />
    </Suspense>
  );
};

export default Penpalship;
