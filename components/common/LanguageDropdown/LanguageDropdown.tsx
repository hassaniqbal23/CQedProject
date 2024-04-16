import React, { useState, useEffect } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  username?: string;
  isIcon?: boolean;
}

import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function DropdownMenuDemo() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("selectedItems");
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  // Update local storage whenever selected items change
  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleItemClick = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleChipRemove = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex justify-between w-60">
            <h1>Add language</h1>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              value="urdu"
              onClick={() => handleItemClick("urdu")}
            >
              Urdu
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="english"
              onClick={() => handleItemClick("english")}
            >
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="farsi"
              onClick={() => handleItemClick("farsi")}
            >
              Farsi
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="shina"
              onClick={() => handleItemClick("shaina")}
            >
              Shaina
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="shina"
              onClick={() => handleItemClick("shaina")}
            >
              Shaina
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-wrap mt-2">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="rounded-full border border-gray-300 p-2 flex items-center mt-2 mr-1"
          >
            <span className="mr-1">{item}</span>
            <button
              className="ml-2 text-[#737373]"
              onClick={() => handleChipRemove(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
