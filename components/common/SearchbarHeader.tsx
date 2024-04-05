import { FC, ChangeEvent, useState } from 'react';
import { Heading } from './Heading';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CiSearch } from 'react-icons/ci';
import { cn } from '@/lib/utils';
interface IProps {
  title: string;
  SubTitle: string;
  setSearchTerm?: (value: string) => void;
  href: string;
  linkTitle: string;
  inputClassName?: string;
  placeholder: string;
  className?: string;
  FilterForm?: React.ReactNode;
  isHide?: boolean;
}

const SearchbarHeader: FC<IProps> = ({
  title,
  SubTitle,
  setSearchTerm,
  href,
  placeholder,
  linkTitle,
  inputClassName,
  FilterForm,
  className,
  isHide,
}) => {
  const [inputDisplay, setInputDisplay] = useState(false);
  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(event.target.value);
    }
  };

  const handleToggleFun = () => {
    inputDisplay ? setInputDisplay(false) : setInputDisplay(true);
  };

  return (
    <div className={`md:flex items-center justify-between`}>
      <div className="pb-[21px] lg:w-6/12">
        <Heading
          className={`mb-3 text-[#0F172A] dark:text-white`}
          fontWeight="font-medium"
          fontSize="text-xl"
          text={title}
        />
        <p className={`text-sm font-normal text-[#2F3C59] dark:text-white`}>
          {SubTitle}
        </p>
      </div>
      {setSearchTerm && (
        <div
          className={`border flex items-center flex-grow transition delay-200 duration-700 ease-in-out mr-3 ${
            inputDisplay
              ? ' rounded-md pl-[12px] bg-muted'
              : 'rounded-full justify-start md:justify-end border-none'
          } ${inputClassName}`}
        >
          <CiSearch
            onClick={handleToggleFun}
            className={`text-[18px] text-right cursor-pointer transition delay-200 duration-700 ease-in-out ${
              inputDisplay
                ? ' bg-muted'
                : 'w-[42px] h-[42px] p-3 rounded-full bg-muted border'
            }`}
          />
          <Input
            type="text"
            onChange={handleSearchTermChange}
            placeholder={placeholder}
            className={`border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-muted transition delay-200 duration-700 ease-in-out ${
              inputDisplay ? 'block' : 'hidden'
            }`}
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        {FilterForm}
        {!isHide ? (
          ''
        ) : (
          <div className="lg:mt-0">
            <Button
              type="button"
              className={cn('whitespace-nowrap', className)}
            >
              <Link href={href}>{linkTitle}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchbarHeader;
