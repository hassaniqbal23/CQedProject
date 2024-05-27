import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input/input';

interface CommunityHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  rightImage: string;
  leftImage: string;
  onInputChange(e: React.KeyboardEvent<HTMLInputElement>): void;
  createCommunityLink?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  title,
  subtitle,
  description,
  rightImage,
  leftImage,
  onInputChange,
  createCommunityLink = '/students/cq-communities/create',
}) => {
  return (
    <div className="bg-primary-500 px-5 py-7">
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-2 sm:w-full md:flex md:justify-between md:gap-4">
        <div className="mt-2 self-end hidden md:block  sm:hidden ">
          <Image src={leftImage} alt="" width={152} height={162} />
        </div>
        <div className="flex flex-col items-center  gap-2">
          <h2 className="sm:text-xl md:text-2xl font-bold lg:text-3xl  text-white">
            {title}
          </h2>
          <h3 className="sm:text-[10px] sm:font-semibold md:text-sm md:font-medium lg:text-lg lg:font-medium text-white">
            {subtitle}
          </h3>
          <div className="w-full">
            <Input
              className="text-black"
              placeholder="Explore Communities"
              type="search"
              onKeyDown={onInputChange}
            />
          </div>
          <Link
            href={createCommunityLink}
            className="text-lg font-normal text-white"
          >
            Or <span className="text-secondary-500">create your own.</span>{' '}
          </Link>
        </div>
        <div className="hidden md:block sm:hidden self-start">
          <Image src={rightImage} alt="" width={112} height={111} />
        </div>
      </div>
      <div className="lg:block hidden md:block relative">
        <a
          href="#"
          className="absolute right-0 bottom-[-20px] text-white text-lg font-medium mt-2"
        >
          {description}
        </a>
      </div>
    </div>
  );
};

export { CommunityHeader };
