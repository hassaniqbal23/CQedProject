import React, { FC, useState } from 'react';
import Image from 'next/image';
// import Bin from "../public/icons/Bin.png";
import { Button } from '@/components/ui';
import Modal from '../Modal/Modal';
import { Separator } from '@/components/ui/separator/separator';

interface IProps {
  onClose: () => void;
  onConfirm: () => void;
  isVisible: boolean;
}

const Delete: FC<IProps> = ({ onClose, onConfirm, isVisible }) => {
  //   const [isVisible, setIsVisible] = useState(false);

  //   const handleYesClick = () => {
  //     setIsVisible(false);
  //   };

  //   const handleNoClick = () => {
  //     setIsVisible(false);
  //   };

  return (
    <Modal
      isVisible={isVisible}
      // onClose={handleNoClick}
      header={false}
      footer={
        <div className="wrap-button flex flex-col md:flex-row justify-end md:items-center gap-4 mt-4 md:mt-6">
          <Button
            className="btn1 h-10 md:h-[42px] px-6 md:px-[40px] justify-center items-center flex-shrink-0 rounded-full shadow-btn font-bold font-montserrat text-base border border-primary-500 text-[#4146B8] bg-white"
            onClick={() => onClose()}
          >
            No
          </Button>

          <Button
            className="btn2 h-10 md:h-[42px] px-6 md:px-[40px] justify-center items-center flex-shrink-0 rounded-full shadow-btn font-bold font-montserrat text-base bg-primary-500 text-white  "
            onClick={() => onConfirm()}
          >
            Yes
          </Button>
        </div>
      }
    >
      <div className="w-full md:w-[458px] bg-white rounded-lg   border-gray-300">
        <div className="flex flex-col md:flex-row justify-start items-center gap-5 border-gray-300">
          <div className="md:max-w-[100px] mb-4">
            <Image src="/icons/Bin.svg" alt="Bin" width={55} height={60} />
          </div>
          <div className="heading">
            <h2 className="text-foreground font-montserrat text-3xl font-semibold pb-2 md:pb-0">
              Are you sure?
            </h2>
            <p className="text-gray-700 font-montserrat text-base font-medium mb-3">
              Are you sure you want to remove invite
            </p>
          </div>
        </div>
      </div>
      <Separator
        className=" w-full  space-x-10 text-sm bg-[#E6E6E6]
"
      />
    </Modal>
  );
};

export default Delete;
