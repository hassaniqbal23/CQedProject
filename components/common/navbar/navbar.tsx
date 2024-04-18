import MainNavbar from "@/components/dashboardlayout/navbar";
import { ChevronLeft, Bell, LogOut } from "lucide-react";
import React from "react";

interface NavbarProps {
  variant?: "default" | "BOTTOM" | "TOP" | unknown;
  onClick: () => void;
}

function Navbar(props: NavbarProps) {
  return (
    <>
      {props.variant === "BOTTOM" ? (
        <div>
          <div className=" bg-[#4146B8] shadow-top md:shadow-none shadow-opacity-10 px-10 flex justify-between items-center h-20">
            <div className="flex justify-center  items-center">
              <ChevronLeft
                onClick={props.onClick}
                className="w-6 h-9  text-white cursor-pointer "
              />
              <div
                onClick={props.onClick}
                className="text-white text-center font-montserrat font-medium text-lg cursor-pointer"
              >
                Back
              </div>
            </div>

            <button
              onClick={props.onClick}
              className=" rounded-2xl bg-yellow-300 shadow-inner border border-yellow-300 flex w-[164px] py-3 px-7 md:p-23.881  gap-7.463 text-blue-600 text-center font-montserrat font-bold text-lg uppercase hover:bg-slate-400 hover:text-black cursor-pointer mr-6"
            >
              Continue
            </button>
          </div>
        </div>
      ) : props.variant === "TOP" ? (
        <div className="flex justify-between items-center w-full h-[78px] py-[14px] md:px-[60px] sm:px-[30px] px-[20px] bg-white shadow-line border-b border-gray-200">
          <div className="flex justify-center  items-center">
            USELOGOHERE
          </div>

          <div className="flex justify-end  h-[44px] px-[10px] py-[16px] border  items-center bg-[#ECEDF8] rounded-2xl mb-4">
            <div className="w-[22px] h-[22px] cursor-pointer">
              <LogOut size={20} />
            </div>
            <button
              onClick={props.onClick}
              className="text-[#1B1D4D] font-montserrat font-semibold text-base"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <MainNavbar />
      )}
    </>
  );
}

export default Navbar;
