import { Button } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface BottomNavbarProps {
  onClick?: () => void;
}

const BottomNavbar: React.FC<BottomNavbarProps> = (props) => {
  return (
    <div className="bg-[#4146B8] shadow-top md:shadow-none shadow-opacity-10 px-10 flex justify-between items-center h-20">
      <div className="flex justify-center items-center">
        <ChevronLeft
          className="w-6 h-9 text-white cursor-pointer"
            {...props}
        />
        <div
          className="text-white text-center font-montserrat font-medium text-lg cursor-pointer"
            {...props}
        >
          Back
        </div>
      </div>

      <Button
        className="rounded-2xl bg-yellow-300 shadow-inner border border-yellow-300 flex justify-center items-center py-3 px-7 gap-7 text-blue-600 font-montserrat font-bold text-lg uppercase hover:bg-slate-400 hover:text-black cursor-pointer mr-6 w-auto"
        {...props}
      >
        Continue
      </Button>
    </div>
  );
};

export default BottomNavbar;
