import React, { useState } from "react";
import Image from "next/image";
import Bin from "./icons/Bin.png";

const Delete = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleYesClick = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="w-full md:w-[458px] bg-white rounded-lg shadow-md p-4 border border-gray-300">
        <div className="flex flex-col md:flex-row justify-start md:gap-12 border-b-2 border-gray-300">
          <div className="md:max-w-[100px]">
            <Image src={Bin} alt="Bin" width={60} height={60} />
          </div>
          <div className="heading flex-grow">
            <h2 className="text-foreground font-montserrat text-2xl font-semibold pb-2 md:mt-0">
              Are you sure?
            </h2>
            <p className="text-gray-700 font-montserrat text-base font-medium mb-4">
              Are you sure you want to remove invite
            </p>
          </div>
        </div>
        <div className="wrap-button flex flex-col md:flex-row justify-end md:items-center gap-4 md:gap-14 mt-4 md:mt-6">
          <button className="btn1 h-10 md:h-[42px] px-6 md:px-[40px] justify-center items-center flex-shrink-0 rounded-full shadow-btn font-bold font-montserrat text-base border border-primary-500 text-blueviolet">
            No
          </button>

          <button
            className="btn2 h-10 md:h-[42px] px-6 md:px-[40px] justify-center items-center flex-shrink-0 rounded-full shadow-btn font-bold font-montserrat text-base bg-primary-500 text-white"
            onClick={handleYesClick}
          >
            Yes
          </button>
        </div>
      </div>
    )
  );
};

export default Delete;
