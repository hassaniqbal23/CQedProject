import React from 'react';
import Image from 'next/image';

interface CommunityHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  image1: string;
  image2: string;
}

const CummunityHeader: React.FC<CommunityHeaderProps> = ({
  title,
  subtitle,
  description,
  image1,
  image2,
}) => {
  return (
    <div className=" w-full bg-primary-500 p-4">
      <div className="flex justify-between gap-4">
        <div className="mt-8">
          <Image src={image2} alt="" width={152} height={162} />
        </div>
        <div className="flex flex-col items-center text-white">
          <h2 className="text-3xl font-bold">{title}</h2>
          <h3 className="text-lg font-medium">{subtitle}</h3>
          <input
            type="text"
            placeholder="search your location"
            className="px-2 py-2 w-96"
          />
          <p>
            Or <span>create your own.</span>
          </p>
        </div>
        <div>
          <Image src={image1} alt="" width={112} height={111} />
        </div>
      </div>
      <div>
        <p className="text-right">{description}</p>
      </div>
    </div>
  );
};

export default CummunityHeader;
