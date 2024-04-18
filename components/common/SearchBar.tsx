import { FC, ChangeEvent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { Input } from '../ui/';

interface IProps {
  setSearchTerm?: (value: string) => void;
  inputClassName?: string;
  placeholder: string;
  className?: string;
  inputValue?: string;
}

const SearchBar: FC<IProps> = ({
  setSearchTerm,
  className,
  placeholder,
  inputValue,
  inputClassName,
}) => {
  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(event.target.value);
    }
  };

  return (
    <div className={cn(className)}>
      {setSearchTerm && (
        <div
          className={`border flex items-center rounded-md w-[166px] ${inputClassName}`}
        >
          <IoSearchOutline
            className={`text-[18px] text-right ml-[15px]  w-[20px] h-[20px]`}
          />
          <Input
            type="text"
            value={inputValue}
            onChange={handleSearchTermChange}
            placeholder={placeholder}
            className={`border-none text-base focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-offset-0`}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
