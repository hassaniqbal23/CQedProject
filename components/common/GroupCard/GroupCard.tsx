import React from 'react';
import Image from 'next/image';

interface IGroupCardProps {
  imageUrl: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  label: string;
  description: string;
}

export const GroupCard: React.FC<IGroupCardProps> = ({
  imageUrl,
  title,
  label,
  description,
}) => {
  const shortenedDescription = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      let div = document.createElement('div');
      div.innerHTML = description;
      let text = div.textContent || '';
      return text.length > 100 ? text.slice(0, 100) + ' ...' : text;
    }
    return '';
  }, [description]);

  return (
    <div className="w-full flex flex-col p-4 h-full  bg-[#F7F7F7] rounded-sm ">
      <div>
        <Image
          src={imageUrl}
          alt={`community`}
          height={190}
          width={298}
          className="w-full h-56"
          unoptimized={true}
        />
        <h2 className="text-black text-lg font-semibold mt-4">{title}</h2>
        <h3 className="text-[#08090A] text-[12px] font-semibold mt-1">
          {label}
        </h3>
        <p className="min-w-40 text-[#131517] text-sm font-[500] mt-2">
          {shortenedDescription}
        </p>
      </div>
    </div>
  );
};
