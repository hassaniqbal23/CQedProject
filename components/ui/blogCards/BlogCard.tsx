import React from 'react';
import Image from 'next/image';

interface blogCardProps {
  imageUrl: string;
  title: string;
  label: string;
  description: string;
}

const blogCard: React.FC<blogCardProps> = ({
  imageUrl,
  title,
  label,
  description,
}) => {
  return (
    <div className="max-w-sm  flex flex-col p-4  bg-[#F7F7F7] rounded-sm ">
      <div>
        <Image src={imageUrl} alt="" className="w-full" />
        <h2 className="text-black text-lg font-semibold mt-4">{title}</h2>
        <h3 className="text-[#08090A] text-[12px] font-semibold mt-1">
          {label}
        </h3>
        <p className="min-w-40 text-[#131517] text-sm font-[500] mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default blogCard;
