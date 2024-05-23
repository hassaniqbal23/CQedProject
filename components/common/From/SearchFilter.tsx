import React from 'react';
import { Button, Input } from '@/components/ui';
import { SelectLanguage } from '@/components/ui/select-v2/select-v2-components';
import GroupHorizontal from '@/components/ui/GroupHorizontal/GroupHorizontal';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import { ArrowLeft } from 'lucide-react';
import { Typography } from '../Typography/Typography';

export interface SearchFilterProps {
  buttonText: string;
  title: string;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  buttonText,
  title,
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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center">
        <Input type="search" />
        <SelectLanguage countryCode="" className="p-2 text-base rounded" />
      </div>
      <div className="flex flex-wrap">
        <ChipSelector
          variant="link"
          defaultValue={['SearchFilter']}
          rounded={true}
          options={[
            { label: 'All (219)', value: 'All_(219)' },
            { label: 'Gaming (132)', value: 'Gaming_(132)' },
            { label: 'General Chatting (99)', value: 'General_Chatting_(99)' },
            { label: 'Entertainments (99)', value: 'Entertainments_(99)' },
          ]}
        />
      </div>
      <Typography variant="h6" weight="semibold" className="text-[#535353]">
        {title}
      </Typography>
      <div className="flex flex-col gap-8">
        <GroupHorizontal
          title="Games for kids"
          image="/avatar1.svg"
          label="11.5M Members"
          description="I'm Bon Bon! Welcome to Bon Bon's channel! Have a good time watching the video."
          buttonOnClick={() => {
            console.log('GroupHorizontal button clicked');
          }}
        />
        <GroupHorizontal
          title="Games for kids"
          image="/avatar1.svg"
          label="11.5M Members"
          description="I'm Bon Bon! Welcome to Bon Bon's channel! Have a good time watching the video."
          buttonOnClick={() => {
            console.log('GroupHorizontal button clicked');
          }}
        />
      </div>
    </div>
  );
};
