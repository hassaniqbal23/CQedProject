import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import countriesJSON from 'public/countries/countries.json';

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
  const formattedDate = `${inputDate.getUTCDate()}-${
    monthNames[parseInt(month) - 1]
  }-${year}`;
  return formattedDate;
};

export function getBarOptions(data: any, labels: any, gradient?: any) {
  const isBar = data.find((item: any) => item.type == 'bar')?.type === 'bar';
  return {
    tooltip: {
      trigger: 'axis',
      show: true,
    },
    xAxis: {
      type: 'category',
      data: labels.xAxis,
      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      show: isBar ? false : true,
      data: labels.yAxis,
      boundaryGap: [0, '100%'],
      axisLine: {
        show: false,
      },

      axisTick: {
        show: false,
      },
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
          shadowOffsetY: 10,
        },
        areaStyle: {
          color: gradient,
        },
      };
    }),
    legend: {
      y: 'bottom',
      show: false,
    },
  };
}

export function getPieChartOptions(data: any) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Skill Proficiency',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
}

export const getSingleCountry = (name: string) => {
  const options = Object.keys(countriesJSON).map((c) => {
    return {
      value: c,
      label: countriesJSON[c as keyof typeof countriesJSON],
    };
  });
  let currentCountry = options?.filter((country) => country.value === name)[0];
  return currentCountry;
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
