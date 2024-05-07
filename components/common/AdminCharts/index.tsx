'use client';

import React, { useEffect, useRef, useState } from 'react';
//@ts-ignore
import * as echarts from 'echarts';
import { cn } from '@/lib/utils';
// import 'echarts/types/index';

const data = {
  xAxis: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  yAxis: [
    {
      data: [
        null,
        null,
        4500,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      name: 'This Year',
    },
  ],
};

interface AdminChartsProps {
  loading?: boolean;
  options: any;
  className?: string;
  style?: React.CSSProperties;
  message?: any;
  xLabel?: any;
}

function AdminCharts(props: AdminChartsProps) {
  const { options, style, className, loading, message } = props;
  const [chart, setChart] = useState<echarts.EChartsType | undefined>();
  const [resizeObserver, setResizeObserver] = useState<any>();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setResizeObserver(
        new window.ResizeObserver((entries) => {
          entries.map(({ target }: any) => {
            const instance = echarts.getInstanceByDom(target);
            if (instance) {
              instance.resize();
            }
          });
        })
      );
    }
  }, []);

  useEffect(() => {
    const chart = echarts.init(chartRef.current, 'westeros');
    chart.setOption({ ...options }, true);
    setChart(chart);
    if (resizeObserver) resizeObserver.observe(chartRef.current as any);
  }, [options]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (loading) {
      chart.showLoading();
      return;
    }

    chart.hideLoading();
  }, [chart, loading]);

  useEffect(() => {
    if (chart && options && message) {
      chart.clear();
    }
  }, [message]);

  const newStyle = {
    height: 350,
    ...style,
  };

  return (
    <div className="echarts-parent position-relative">
      <div
        ref={chartRef}
        style={newStyle}
        className={cn('echarts-react', className)}
      />
      {message ? <div className="no-data">{message}</div> : null}
    </div>
  );
}

export default AdminCharts;
