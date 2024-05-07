'use client';

import { Button, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';

export default function SchoolClassRooms() {
  return (
    <div>
      <div className={'flex mb-4'}>
        <div>
          <h1 className={'text-3xl font-bold'}>Classrooms</h1>
          <p>Subjects and Classes in your schools</p>
        </div>
        <div className={'ml-auto'}>
          <Button iconPosition={'left'} icon={<Plus></Plus>}>
            Add Class
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue={'subjects'}
        tabs={[
          {
            label: 'Subjects',
            value: 'subjects',
          },
          {
            label: 'Grades',
            value: 'grades',
          },
        ]}
        variant={'secondary'}
        tabContent={[
          {
            value: 'subjects',
            content: <div className={'pt-4'}>subjects</div>,
          },
          {
            value: 'grades',
            content: (
              <div className={'pt-4'}>
                asd
                <div className={'flex justify-end w-full mt-4'}></div>
              </div>
            ),
          },
        ]}
        onValueChange={() => {}}
      ></Tabs>
    </div>
  );
}
