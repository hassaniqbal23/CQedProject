import { Post } from '@/components/common/Post/Post';
import { Typography } from '@/components/common/Typography/Typography';
import { SelectInput } from '@/components/ui';
import React from 'react';

export const StudentFeeds = () => {
  return (
    <>
      <div className="grid grid-cols-9 px-8 py-3">
        <div className="col-span-8 ">
          <Typography variant="h3" weight="semibold">
            Moin’s Posting
          </Typography>
        </div>
        <div className="col-span-1">
          <SelectInput
            defaultValue="today"
            options={[{ label: 'Today', value: 'today' }]}
          />
        </div>
      </div>
      <div className="px-4 py-1">
        <Post
          attachment={['/assets/images/img.png']}
          comments={0}
          created_at="2021-10-10T00:00:00.000Z"
          description="You can’t buy happiness, but you can get happiness on the beach! This is labuan bajo, Indonesiaa"
          likes={0}
          handleComment={() => {}}
          userFullName="Alexander John"
          userImage="/assets/profile/profile.svg"
          username="alexander john"
        />
      </div>
    </>
  );
};
