'use client';

import React, { Suspense } from 'react';
import PenpalshipPage from '@/components/Penpalship/PenpalShipPage';

const Penpalship = () => {
  return (
    <Suspense>
      <PenpalshipPage />
    </Suspense>
  );
};

export default Penpalship;
