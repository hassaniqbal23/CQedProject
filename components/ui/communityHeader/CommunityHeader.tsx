import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input/input';
import { Typography } from '@/components/common/Typography/Typography';
import { DeleteClassDialog } from '@/components/common/DeleteClassModal/DeleteClassModal';

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
  const [openPopup, setOpenPopup] = React.useState(false);
  return (
    <div className="bg-primary-500 px-8 pt-7 pb-4 rounded-lg">
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-2 sm:w-full md:flex md:justify-between md:gap-4">
        <div className="mt-2 self-end hidden md:block  sm:hidden ">
          <Image src={leftImage} alt="" width={152} height={162} />
        </div>
        <div className="flex flex-col items-center  gap-2">
          <Typography weight="bold" variant="h2" className=" text-white">
            {title}
          </Typography>
          <Typography
            variant="h6"
            weight="medium"
            className="text-center text-white"
          >
            {subtitle}
          </Typography>
          <div className="w-11/12">
            <Input
              iconColor="#5D5E68"
              iconPosition="right"
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
      <div className="flex justify-end items-end pt-2">
        <div onClick={() => setOpenPopup(true)} className="cursor-pointer">
          <Typography variant="h6" weight="medium" className="text-white">
            {description}
          </Typography>
        </div>
      </div>
      <div>
        <DeleteClassDialog
          open={openPopup}
          description="Global Citizenship Communities are groups of individuals from diverse backgrounds who come together to foster a sense of shared responsibility and interconnectedness. These communities aim to promote understanding, collaboration, and action on global issues, such as sustainability, social justice, and human rights. By engaging in dialogue, educational activities, and collective initiatives, members of Global Citizenship Communities work towards creating a more inclusive, equitable, and sustainable world."
          title="What are GC Communities?"
          onClose={() => setOpenPopup(false)}
          ButtonCancel="Close"
        />
      </div>
    </div>
  );
};

export { CommunityHeader };
