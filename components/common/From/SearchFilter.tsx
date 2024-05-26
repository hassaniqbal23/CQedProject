import React from 'react';
import { Button, Dropdown, Input, SelectInput } from '@/components/ui';
import { SelectLanguage } from '@/components/ui/select-v2/select-v2-components';
import GroupHorizontal from '@/components/ui/GroupHorizontal/GroupHorizontal';
import ChipSelector, {
  ChipItem,
} from '@/components/ui/ChipSelect/ChipSelector';
import { ArrowLeft } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import { CommunityCard } from '@/components/Communities/CommunityCard2/CommunityCard2';
import { Scrollbar } from 'react-scrollbars-custom';

export interface SearchFilterProps {
  buttonText: string;
  title: string;
  searchResults?: any[];
  categories?: any[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string) => void;
  onCategorySelect?: (value: string) => void;
  onSearchClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  results?: any[];
  resultTypes?: any[];
  totalCount?: number;
  onRequestBack?: () => void;
}

let inputChangeTimeout: any;

export const SearchFilter: React.FC<SearchFilterProps> = ({
  buttonText,
  title,
  categories,
  onCategorySelect,
  onInputChange,
  onSelect,
  searchResults,
  onSearchClick,
  results,
  resultTypes,
  totalCount,
  onRequestBack,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const handleButtonClick = () => {
    if (onRequestBack) {
      onRequestBack();
    }
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
            onChange={(e) => {
              setInputValue(e.target.value);
              if (onInputChange) {
                clearTimeout(inputChangeTimeout);
                inputChangeTimeout = setTimeout(() => {
                  onInputChange(e);
                }, 500);
              }
            }}
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
      <div className="overflow-auto NiceScrollBar">
        <Scrollbar marginHeight={120} style={{ width: '100%', height: '50px' }}>
          <ChipSelector
            variant="link"
            defaultValue={['all']}
            rounded={true}
            options={[
              {
                label: `All(${totalCount})`,
                value: 'all',
              },
              ...(resultTypes?.map((c) => {
                return {
                  label: `${c.name}(${c._count.Communities})`,
                  value: c.id,
                } as ChipItem;
              }) || []),
            ]}
          />
        </Scrollbar>
      </div>
      <Typography variant="h6" weight="semibold" className="text-[#535353]">
        {title}
      </Typography>
      <div className="flex flex-col">
        {results &&
          results.map((community, index) => (
            <CommunityCard
              description={community.description}
              title={community.name}
              id={community.id}
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
