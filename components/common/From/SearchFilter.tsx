import React, { useEffect, useState } from 'react';
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
import { useParams, useSearchParams } from 'next/navigation';
import { ICommunity } from '@/types/community';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

export interface SearchFilterProps {
  buttonText: string;
  title: string;
  searchResults?: any[];
  categories?: any[];
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (e: number) => void;
  onSelect?: (value: string) => void;
  onCategorySelect?: (value: string) => void;
  onSearchClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  results?: any[];
  resultTypes?: any[];
  totalCount?: number;
  onRequestBack?: () => void;
  onFiltersChange?: (filters: any) => void;
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
  onCategoryChange,
  onFiltersChange,
}) => {
  const router = useRouter();
  const { module } = useModule()
  const { userInformation } = useGlobalState();
  const params = useSearchParams();
  const [inputValue, setInputValue] = React.useState<null | string>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<
    number | null
  >();
  const [languageSelect, setLanguageSelect] = useState(0);
  const handleButtonClick = () => {
    if (onRequestBack) {
      onRequestBack();
    }
  };

  const categoriesOptions: ChipItem<number>[] = [
    {
      label: `All(${totalCount})`,
      value: -1,
    },
    ...(resultTypes?.map((c) => {
      return {
        label: `${c.name}(${c._count.Communities})`,
        value: c.id,
      } as ChipItem<number>;
    }) || []),
  ];

  useEffect(() => {
    if (params) {
      const filters: {
        q?: string | null;
        community_type?: string | null;
      } = {};
      if (params.get('q')) {
        filters['q'] = params.get('q') || '';
      }
      if (params.get('community_type')) {
        filters['community_type'] = params.get('community_type') || null;
      }
      setInputValue(filters.q || '');
      setSelectedCategory(
        filters.community_type ? parseInt(filters.community_type) : null
      );
      onFiltersChange && onFiltersChange(filters);
    }
  }, [params]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        className="bg-transparent self-start text-black ml-[-12px]"
        onClick={handleButtonClick}
      >
        <ArrowLeft /> {buttonText}
      </Button>
      <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
        <div className="w-full">
          <Input
            type="search"
            placeholder="Kids"
            iconPosition="right"
            iconColor="#535353"
            value={inputValue || ''}
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
        <div className="w-40">
          <SelectInput
            defaultValue={`${languageSelect}`}
            options={[
              { label: 'English', value: '1' },
              { label: 'Urdu', value: '2' },
              { label: 'Portuges', value: '3' },
              { label: 'Hindi', value: '4' },
            ]}
            SelectTriggerClass={'bg-white rounded-md text-gray-500'}
            onSelect={(value) => {
              setLanguageSelect(Number(value));
            }}
            placeholder="Language"
          />
        </div>
      </div>
      <div className="overflow-auto NiceScrollBar">
        <Scrollbar marginHeight={120} style={{ width: '100%', height: '50px' }}>
          <ChipSelector
            variant="link"
            defaultValue={[selectedCategory]}
            onChange={(e) => {
              if (!Array.isArray(e)) {
                onCategoryChange && onCategoryChange(e);
              }
            }}
            rounded={true}
            options={categoriesOptions}
          />
        </Scrollbar>
      </div>
      <Typography variant="h6" weight="semibold" className="text-[#535353]">
        {title}
      </Typography>
      <div className="flex flex-col">
        {results &&
          results.map((community: ICommunity, index: number) => {
            console.log(userInformation.id, community.created_by);
            return (
              <CommunityCard
                description={community.description}
                title={community.name}
                id={community.id}
                members={community?._count?.CommunityUsers}
                key={index}
                image={community?.profile_picture?.file_path || ''}
                button={
                  userInformation?.id === community?.created_by ? (
                    <Button
                      className="text-base bg-primary-50 text-primary-500 rounded-full py-2 px-8"
                      variant={'default'}
                      iconPosition="left"
                      onClick={() =>
                        router.push(`/${module}/cq-communities/${community.id}`)
                      }
                    >
                      View
                    </Button>
                  ) : null
                }
              />
            );
          })}
      </div>
    </div>
  );
};
