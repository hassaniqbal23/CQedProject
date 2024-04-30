'use client';

import React from 'react';
import { StaticCard } from '../StaticCard/StaticCard';

interface DashboardStaticCardsProps {
  data: any[];
}

function DashboardStaticCards(props: DashboardStaticCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-3 mt-9">
      {props.data.map((_, i) => {
        return (
          <StaticCard
            title={_.title}
            link={_.link}
            number={_.number}
            key={i}
            percentage={_.percentage}
          />
        );
      })}
    </div>
  );
}

export default DashboardStaticCards;
