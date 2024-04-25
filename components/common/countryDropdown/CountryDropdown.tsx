"use client"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
          <Button className="flex justify-between w-full px-3 py-3 items-center rounded-md bg-[#F8F9FB] shadow-inner text-[#5D5E68] font-semibold xt-bold cursor-pointer">
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
        <DropdownMenuContent className="w-96 p-3  items-center rounded-md bg-[#F8F9FB] shadow-inner  mt-3.5 mx-auto  ">
          {options.map((country, index) => (
            <DropdownMenuItem
              key={country.countryCode}
              onClick={() => handleItemClick(country)}
              className={`text-[#5D5E68] px-3 py-1.5 text-semibold items-center  bg-[#F8F9FB] hover:bg-gray-200 cursor-pointer ${
                index === options.length - 1 ? "" : "border-b  "
              }`}
            >
              <div className="flex  items-center">
                <Image
                  width={30}
                  height={30}
                  src={country.flagUrl}
                  alt={`flag ${country.flagUrl}`}
                />
                <span className="ml-2">{country.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelectDropdown;
