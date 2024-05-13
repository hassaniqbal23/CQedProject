import { Button } from '@/components/ui';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
// import Logo from "./public/logo.svg";

interface TopNavbarProps {
  onLogout?: () => void;
  className?: string;
  showLogout?: boolean;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  showLogout = true,
  onLogout,
  className,
}) => {
  return (
    <div
      className={`w-full h-20 md:h-20 bg-white shadow-line border-b border-gray-200 flex justify-between items-center px-6 ${className}`}
    >
      <div className="flex items-center">
        <Image
          src={'/assets/logos/topnavLogo.svg'}
          width={90}
          height={90}
          alt="logo"
        />
      </div>
      {showLogout ? (
        <div className="flex">
          <Button
            size={'sm'}
            icon={<LogOut />}
            iconPosition="left"
            onClick={onLogout}
            className=" font-montserrat font-semibold text-sm md:text-base ml-2 text-[#222] bg-[#ECEDF8] "
          >
            Logout
          </Button>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default TopNavbar;
