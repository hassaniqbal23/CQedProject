import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import Logo from "./public/Logo.svg";

interface TopNavbarProps {
  onClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const buttonStyle =
    windowWidth <= 768 ? { width: "auto", height: "auto" } : {};

  return (
    <div className="w-full h-20 md:h-20 bg-white shadow-line border-b border-gray-200 flex justify-between items-center px-6">
      <div className="flex items-center gap-3">
        <div>
          {/* <Image src={Logo} alt="logo" /> */}
          logo
        </div>
        <div>ceqd</div>
      </div>
      <div className="flex  items-center  bg-[#ECEDF8] px-4 py-2 rounded-full">
        <div onClick={onClick}>
          <LogOut size={30} className="mr-[-1px]" />
        </div>
        <Button
          onClick={onClick}
          style={buttonStyle}
          className=" font-montserrat font-semibold text-sm md:text-base ml-2 text-[#222] px-1 py-1 bg-[#ECEDF8] "
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TopNavbar;
