import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Dropdown } from '@/components/ui';
import { Card } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { truncateText } from '@/app/utils/helpers';
import countriesData from '@/public/countries/countries.json';
import { MessageCircle } from 'lucide-react';
import { LucideUsers } from 'lucide-react';

interface Countries {
  [key: string]: string;
}

const countries: Countries = countriesData;

interface PenpalshipCardProps {
  title?: string;
  label?: string;
  imgPath: string;
  buttonText?: string;
  description?: string;
  buttonOnClick?: () => void;
  buttonLoading?: boolean;
  countryFlag: string;
  countryName: string;
  studentAge: string | number;
  mutualFriends?: string | number;
  onChatClick?: () => void;
  // onUserClick: () => void;
  showRemoveButton?: boolean; // Add this prop
  showIcons?: boolean;
}

const PenpalshipCard: React.FC<PenpalshipCardProps> = ({
  title,
  imgPath,
  buttonText,
  description,
  buttonOnClick,
  mutualFriends,
  countryFlag,
  countryName,
  studentAge,
  buttonLoading,
  onChatClick,
  // onUserClick,
  showRemoveButton = true,
  showIcons = false,
}) => {
  const truncatedDescription =
    (description && truncateText(description, 12)) || '';
  function setIsSelectTeacher(arg0: { isOpenModal: boolean }): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Card className="flex flex-col h-full">
      <div className="flex flex-col flex-grow p-2 rounded-sm">
        <div className="flex p-2 justify-between mt-2">
          <Image
            src={imgPath || '/assets/profile/profile.svg'}
            alt=""
            className="rounded-xl"
            width={70}
            height={70}
            unoptimized={true}
          />
          {showRemoveButton && (
            <Button
              onClick={buttonOnClick}
              className={`rounded-full ${
                buttonText?.toLocaleLowerCase() === 'remove'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-[#ECEDF8] text-primary-500'
              } w-32 h-10`}
              loading={buttonLoading}
            >
              {buttonText}
            </Button>
          )}
          {showIcons && (
            <div className="flex gap-2 text-primary-500">
              <button
                onClick={onChatClick}
                className=" bg-[#ECEDF8] w-12 h-12 rounded-full flex items-center  justify-center"
              >
                <MessageCircle />
              </button>

              <Dropdown
                trigger={
                  <div>
                    <button
                      // onClick={onUserClick}
                      className="bg-[#ECEDF8] w-12 h-12 rounded-full flex items-center justify-center"
                    >
                      <LucideUsers />
                    </button>
                  </div>
                }
                options={[
                  {
                    content: (
                      <div
                        onClick={() =>
                          setIsSelectTeacher({
                            isOpenModal: true,
                          })
                        }
                      >
                        disconnect
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
        <div className="ml-2">
          <Typography
            variant="body"
            weight="bold"
            className="text-black break-words break-all text-lg font-semibold mt-2"
          >
            {title}
          </Typography>
          <Typography variant="p" weight="semibold" className="mb-1 text-xs">
            <Link href="" className="text-primary-500">
              {mutualFriends}
            </Link>
          </Typography>
          <Typography
            variant="body"
            weight="medium"
            className="text-[#131517] mt-1 leading-relaxed"
          >
            {truncatedDescription}
          </Typography>
        </div>
        <div className="mt-auto">
          <div className="block sm:flex justify-between p-2 items-center">
            <div className="flex items-center">
              <Image
                src={countryFlag}
                alt="flag"
                className=""
                width={38}
                height={38}
                unoptimized={true}
              />
              <Typography variant="h6" weight="medium" className="ml-2 text-sm">
                {countries[countryName] || 'Unknown Country'}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                weight="medium"
                className="flex text-sm mt-2 sm:mt-0"
              >
                {studentAge} years old
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PenpalshipCard };
