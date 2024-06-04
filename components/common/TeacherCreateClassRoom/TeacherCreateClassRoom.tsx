import React, { FC } from 'react';
import { Typography } from '../Typography/Typography';
import Image from 'next/image';
import { Button } from '@/components/ui/button/button';
import { CreateClassDialog } from '../CreateClassModal/CreateClassModal';

interface CreateClassRoomProps {
  title?: string;
  className?: string;
}

const CreateClassRoom: FC<CreateClassRoomProps> = ({ title }) => {
  return (
    <div className="p-20   bg-[#ECEDF8] rounded-lg flex justify-center items-center ">
      <div className="flex flex-col items-center gap-2">
        <div>
          <Image
            src={'/assets/images/videoconference.svg'}
            alt={'logo'}
            width={40}
            height={40}
            className="mb-3"
            unoptimized={true}
          />
        </div>
        <div className="mb-2">
          <Typography variant={'h4'} weight={'semibold'}>
            {title}
          </Typography>
        </div>
        <div>
          <CreateClassDialog
            ButtonTrigger={'Create your class'}
            ButtonAction="Create Class"
            ButtonCancel="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateClassRoom;
