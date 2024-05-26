import React from 'react';
import { Button, Dropdown, Input, SelectInput } from '@/components/ui';
import { SelectLanguage } from '@/components/ui/select-v2/select-v2-components';
import GroupHorizontal from '@/components/ui/GroupHorizontal/GroupHorizontal';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import { ArrowLeft } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import { CommunityCard } from '@/components/Communities/CommunityCard2/CommunityCard2';

export interface SearchFilterProps {
  buttonText: string;
  title: string;
  inputValue?: string;
  searchResults?: any[];
  categories?: any[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string) => void;
  onCategorySelect?: (value: string) => void;
  onSearchClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  buttonText,
  title,
  inputValue,
  categories,
  onCategorySelect,
  onInputChange,
  onSelect,
  searchResults,
  onSearchClick,
}) => {
  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <Button
        className="bg-transparent self-start text-black"
        onClick={handleButtonClick}
      >
        <ArrowLeft /> {buttonText}
      </Button>
      <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
        <div className="w-[90%]">
          <Input
            type="search"
            value={inputValue}
            onKeyDown={onSearchClick}
            onChange={onInputChange}
          />
        </div>
        <div className="w-[10%]">
          <SelectInput
            options={[
              { label: 'English', value: 'english' },
              { label: 'Urdu', value: 'Urdu' },
              { label: 'Portuges', value: 'portuges' },
              { label: 'Hindi', value: 'hindi' },
            ]}
            SelectTriggerClass={
              'bg-white border border-gray-400 rounded-full text-gray-500'
            }
            onSelect={(value) => {
              console.log(value, 'checking');
            }}
            placeholder="Language"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <ChipSelector
          variant="link"
          defaultValue={['all']}
          rounded={true}
          options={[
            { label: 'All (219)', value: 'all' },
            { label: 'Gaming (132)', value: 'gaming' },
            { label: 'General Chatting (99)', value: 'general' },
            { label: 'Entertainments (99)', value: 'entertainment' },
          ]}
        />
      </div>
      <Typography variant="h6" weight="semibold" className="text-[#535353]">
        {title}
      </Typography>
      <div className="flex flex-col">
        {[1, 2, 3, 4].map((_, index) => (
          <CommunityCard
            description="This is a community description"
            title="Community"
            id={_}
            members={1000}
            key={index}
            image="/avatar2.svg"
            onJoinClick={() => {
              console.log('Join Clicked');
            }}
          />
        ))}
      </div>
    </div>
  );
};
