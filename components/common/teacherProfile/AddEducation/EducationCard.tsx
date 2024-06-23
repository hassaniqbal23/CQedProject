import Image from 'next/image';
import React, { FC } from 'react';
import { format } from 'date-fns';
import { Typography } from '../../Typography/Typography';
import { Calendar, SquarePen, Trash } from 'lucide-react';

interface IProps {
  educationLevel?: string;
  fieldOfStudy?: string;
  country?: string;
  institution?: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  editButtonOnClick?: () => void;
  deleteButtonOnClick?: () => void;
}

const EducationCard: FC<IProps> = ({
  educationLevel,
  fieldOfStudy,
  country,
  institution,
  startDate,
  endDate,
  imageUrl,
  editButtonOnClick,
  deleteButtonOnClick,
}) => {
  return (
    <div className="flex justify-between bg-[#F8F9FB] items-center p-2 rounded-lg">
      <div className="p-2 flex items-center">
        <Image
          src={imageUrl || '/graduate.svg'}
          alt={'Graduate Icon '}
          className="  bg-[#ECEDF8] p-2 rounded-lg"
          width={55}
          height={55}
        />

        <div className="flex flex-col ml-2">
          <Typography
            variant={'h6'}
            weight={'semibold'}
            className="text-[#393939]"
          >
            {educationLevel} Degree in {fieldOfStudy}
          </Typography>
          <div className="flex items-center">
            <p className="text-sm  font-semibold mr-3 text-[#393939]">
              {institution}
            </p>
          </div>
          <div className="flex items-center">
            <div>
              <p className="text-sm mr-4   text-[#393939]">{country}</p>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-2" color="#393939" />
              <p className="text-[#393939] text-sm font-medium italic">
                {format(new Date(startDate), 'MMM yyyy')} -{' '}
                {format(new Date(endDate), 'MMM yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <Trash
          onClick={deleteButtonOnClick}
          className="cursor-pointer text-[#393939]"
        />
        <SquarePen
          onClick={editButtonOnClick}
          className="m-2 cursor-pointer text-[#393939]"
        />
      </div>
    </div>
  );
};

export default EducationCard;
