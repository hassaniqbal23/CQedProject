import React from 'react';
import Image from 'next/image';

interface IProgressbarprops {
  heading: string;
  percentage: number;
}

function Progressbar({ percentage, heading }: IProgressbarprops) {
  const memorizedPercentage = React.useMemo(() => {
    if (percentage > 100) {
      return 100;
    } else {
      if (percentage < 0) {
        return 0;
      }
      return percentage;
    }
  }, [percentage]);

  return (
    <div className="w-full rounded-full">
      <div className="w-full bg-primary-50 rounded-full">
        <div className="relative w-full rounded-full">
          <div
            className="absolute bg-secondary z-20 rounded-full transition-all duration-75 h-full"
            style={{
              width: `${memorizedPercentage}%`,
              transition: 'width 0.75s',
              padding: '0.5rem',
            }}
          >
            <span
              className="absolute -right-1 transition-all duration-75 transform -translate-x-1/2"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <Image
                src="/Cartoon.svg"
                width={40}
                height={40}
                alt="cartoon image"
              />
            </span>
          </div>
          <div
            className="absolute bg-primary-50 z-10 rounded-full transition-all duration-75 h-full"
            style={{
              width: `100%`,
              padding: '0.5rem',
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between pt-5 pl-2 ">
        <h2
          className={
            `font-semibold ` + (percentage === 100 ? 'text-success' : '')
          }
        >
          {heading}
        </h2>
        <h2>{memorizedPercentage}% Completed</h2>
      </div>
    </div>
  );
}

export default Progressbar;
