import React, { useState, useEffect } from "react";
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


export interface DropdownMenuDemoPropsOptions {
  label: string;
  value: string | boolean | number | unknown;
}

export interface DropdownMenuDemoProps {
  options: DropdownMenuDemoPropsOptions[]
}

export function DropdownMenuDemo(props: DropdownMenuDemoProps) {
  const [selectedItems, setSelectedItems] = useState<DropdownMenuDemoPropsOptions[]>([]);

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

  const handleItemClick = (item: DropdownMenuDemoPropsOptions) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleChipRemove = (index: number) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
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
            {props.options.map(  option => {
              return <DropdownMenuRadioItem
                  value="urdu"
                  onClick={() => handleItemClick(option)}
              >
                {option.label}
              </DropdownMenuRadioItem>
            } )}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-wrap mt-2">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="rounded-full border border-gray-300 p-2 flex items-center mt-2 mr-1"
          >
            <span className="mr-1">{item.label}</span>
            <button
              className="ml-2 text-[#737373]"
                onClick={() => handleChipRemove(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
