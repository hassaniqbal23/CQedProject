import React, { Suspense } from 'react';
import PenpalshipPage from '@/components/Penpalship/PenpalShipPage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Friends - GCED',
  description: 'Global Friends - GCED',
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
