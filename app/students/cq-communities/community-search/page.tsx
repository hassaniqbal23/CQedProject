'use client';

import React, { useState, useEffect } from 'react';
import { SearchFilter } from '@/components/common/From/SearchFilter';
import { useSearchParams } from 'next/navigation';

const CommunitySearch = () => {
  const params = useSearchParams();
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    if (params && params.get('q')) {
      setValue(params.get('q'));
    }
  }, []);

  return (
    <div>
      <SearchFilter
        title="search results for communities"
        buttonText="Back"
        inputValue={value as string}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue((e.target as HTMLInputElement).value);
        }}
        onSearchClick={(e: React.KeyboardEvent<HTMLInputElement>) =>
          console.log('searching', value)
        }
      />
    </div>
  );
};

export default CommunitySearch;
