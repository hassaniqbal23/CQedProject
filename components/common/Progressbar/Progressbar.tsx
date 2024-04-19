import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface IProgressbarprops {
    heading: string;
    percentage: number;
}

function Progressbar({ percentage, heading }: IProgressbarprops) {
    return (
        <div className='w-full rounded-full'>
            <div className='relative w-full bg-gray-200 rounded-full'>
                <div
                    className='absolute bg-secondary z-10 rounded-full transition-all duration-75 h-full'
                    style={{
                        width: `${percentage}%`,
                        padding: '0.5rem'
                    }}
                >
                    <span
                        className='absolute right-0 transition-all duration-75 transform -translate-x-1/2'
                        style={{
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <FaCheckCircle color='white' />
                    </span>
                </div>
            </div>
            <h2 className={`pt-3 pl-2 ${percentage == 100 ? 'text-succes' : ''}`} >{heading}</h2>
        </div>
    );
}

export default Progressbar;
