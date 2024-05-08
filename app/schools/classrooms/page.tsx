'use client';

import { Button, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import SubjectsTable from '@/components/common/SubjectsTable/SubjectsTable';
import GradesTable from '@/components/common/GradesTable/GradesTable';
import { CreateSubjectDialog } from '@/components/common/CreateSubjectModal/CreateSubjectModal';

export default function SchoolClassRooms() {
  const [addSubjectModal, setAddSubjectModal] = useState(true);
  const [grades, setGrades] = useState([
    {
      name: 'Grade 1',
    },
    {
      name: 'Grade 2',
    },
    {
      name: 'Grade 3',
    },
    {
      name: 'Grade 4',
    },
    {
      name: 'Grade 5',
    },
    {
      name: 'Grade 6',
    },
    {
      name: 'Grade 7',
    },
    {
      name: 'Grade 8',
    },
    {
      name: 'Grade 9',
    },
    {
      name: 'Grade 10',
    },
  ]);

  return (
    <div>
      <div className={'flex mb-4'}>
        <div>
          <h1 className={'text-3xl font-bold'}>Classrooms</h1>
          <p>Subjects and Classes in your schools</p>
        </div>
        <div className={'ml-auto'} onClick={() => setAddSubjectModal(true)}>
          {addSubjectModal && (
            <CreateSubjectDialog
              Title="Add New Subject"
              ButtonTrigger="Add Subject" // Adjust these props as needed
              ButtonAction="Submit" // Adjust these props as needed
              ButtonCancel="Cancel" // Adjust these props as needed
            />
          )}
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
            content: (
              <div className={'pt-4 w-full'}>
                <SubjectsTable data={[]} />
              </div>
            ),
          },
          {
            value: 'grades',
            content: (
              <div className={'pt-4 w-full'}>
                <GradesTable data={grades} />
              </div>
            ),
          },
        ]}
        onValueChange={() => {}}
      ></Tabs>
    </div>
  );
}
