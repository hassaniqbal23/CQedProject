import React from 'react';
import PenpalshipPage from '@/components/Penpalship/PenpalShipPage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Friends - GCED',
  description: 'Global Friends - GCED',
};

const Penpalship = () => {
  return (
    <div>
      <PenpalshipPage />
    </div>
  );
};

export default Penpalship;
