import { ChevronLeft } from "lucide-react";
import React from "react";

function navbar() {
  return (
    <div>
      <div className=" bg-[#4146B8] shadow-top md:shadow-none shadow-opacity-10 px-10 flex justify-between items-center h-20">
        <div className="flex justify-center  items-center">
          <ChevronLeft className="w-6 h-9  text-white cursor-pointer " />
          <div className="text-white text-center font-montserrat font-medium text-lg cursor-pointer">
            Back
          </div>
        </div>

        <div className=" rounded-2xl bg-yellow-300 shadow-inner border border-yellow-300 flex w-[164px] py-3 px-7 md:p-23.881  gap-7.463 text-blue-600 text-center font-montserrat font-bold text-lg uppercase hover:bg-slate-400 hover:text-black cursor-pointer">
          Continue
        </div>
      </div>
    </div>
  );
}

export default navbar;
