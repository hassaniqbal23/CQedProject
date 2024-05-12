'use client';

import React from 'react';
import { StaticCard } from '../StaticCard/StaticCard';

interface DashboardStaticCardsProps {
  data: any[];
}

function DashboardStaticCards(props: DashboardStaticCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {props.data.map((_, i) => {
        return (
          <StaticCard
            title={_.title}
            number={_.number}
            key={i}
            percentage={_.percentage}
            dropdown={false}
            dropdownOptions={{
              label: 'Today',
              options: [
                {
                  label: 'Weekly',
                  value: 'weekly',
                },
                {
                  label: 'Monthly',
                  value: 'monthly',
                },
                {
                  label: '3 Months',
                  value: 'threeMonths',
                },
              ],
            }}
          />
        );
      })}
    </div>
  );
}

export default DashboardStaticCards;
