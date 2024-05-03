import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: string | number | Date | undefined) => {
  if (!date) {
    return '-';
  }
  const inputDate = new Date(date);
  const year = inputDate.getUTCFullYear();

  const monthNames = [
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
  ];
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
  const formattedDate = `${inputDate.getUTCDate()}-${monthNames[parseInt(month) - 1]
    }-${year}`;
  return formattedDate;
};


export function getBarOptions(data: any, labels: any, gradient?: any) {
  const isBar = data.find((item: any) => item.type == 'bar')?.type === 'bar'
  return {
    tooltip: {
      trigger: 'axis',
      show: true
    },
    xAxis: {
      type: "category",
      data: labels.xAxis,
      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      show: isBar ? false : true,
      data: labels.yAxis,
      boundaryGap: [0, '100%'],
      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      }
    },
    height: isBar ? 170 : 200,
    series: data.map((dataset: any) => {
      return {
        ...dataset,
        symbol: 'none',
        coordinateSystem: 'cartesian2d',
        sampling: 'lttb',
        lineStyle: {
          color: {
            type: 'linear',
            colorStops: [
              { offset: 0, color: '#4FBF67' },
              { offset: 0.3, color: '#497352' },
            ],
            x: 0,
            y: 0,
            x2: 200,
            y2: 100,
          },
          width: 0.2,
          shadowColor: '#497352',
          shadowBlur: 20,
          shadowOffsetY: 10

        },
        areaStyle: {
          color: gradient
        },
      };
    }),
    legend: {
      y: "bottom",
      show: false
    }
  };
}

