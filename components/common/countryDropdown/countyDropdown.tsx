import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui";
import Image from "next/image";

export interface CountrySelectOption {
  name: string;
  countryCode: string;
  flagUrl: string;
}

export interface CountrySelectDropdownProps {
  options: CountrySelectOption[];
  label: string;
  onChange?: (country: CountrySelectOption) => void;
}

const CountrySelectDropdown: React.FC<CountrySelectDropdownProps> = ({
  options,
  label,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] =
    useState<CountrySelectOption | null>(null);

  const handleItemClick = (country: CountrySelectOption) => {
    setSelectedCountry(country);
    onChange && onChange(country);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex justify-between w-96  px-3 py-6 items-center rounded-md bg-gray-100 shadow-inner text-[#5D5E68] text-bold cursor-pointer">
            {selectedCountry ? (
              <div className=" flex items-center">
                <Image
                  height={30}
                  width={30}
                  src={selectedCountry.flagUrl}
                  alt="falg"
                />
                <span className="">{selectedCountry.name}</span>
              </div>
            ) : (
              <span>{label}</span>
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-4  items-center rounded-md bg-gray-100 shadow-inner text-[#5D5E68] mt-2 mx-auto  ">
          {options.map((country) => (
            <DropdownMenuItem
              key={country.countryCode}
              onClick={() => handleItemClick(country)}
              className=" text-[#5D5E68] text-bold border-b border-[#C8C8C8] items-center mt-2 hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex mr-4 mb-4 items-center">
                <Image
                  className="ml-2"
                  width={30}
                  height={30}
                  src={country.flagUrl}
                  alt={`flag ${country.flagUrl}`}
                />
                <span className="ml-2">{country.name}</span>
              </div>
              {/* <DropdownMenuSeparator className="border  border-[#C8C8C8]  mb-2" /> */}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelectDropdown;
