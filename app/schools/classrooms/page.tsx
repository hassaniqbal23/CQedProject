'use client';

import { Button, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import SubjectsTable from '@/components/common/SubjectsTable/SubjectsTable';
import GradesTable from '@/components/common/GradesTable/GradesTable';
import { useQuery } from 'react-query';
import { getAllClass, getAllGrades } from '@/app/api/schools';
import { CreateSubjectModal } from '@/components/common/CreateSubjectModal/CreateSubjectModal';

export default function SchoolClassRooms() {
  const { data, isLoading } = useQuery(['getAllClass'], () => getAllClass());

  const { data: gradesData, isLoading: gradesLoading } = useQuery(
    ['getAllGrades'],
    () => getAllGrades()
  );
  const [addSubjectModal, setAddSubjectModal] = useState(true);

  return (
    <div>
      <div className={'flex mb-4'}>
        <div>
          <h1 className={'text-3xl font-bold'}>Classrooms</h1>
          <p>Subjects and Classes in your schools</p>
        </div>
        <div className={'ml-auto'} onClick={() => setAddSubjectModal(true)}>
          {addSubjectModal && (
            <CreateSubjectModal
              Title="Add New Subject"
              trigger={
                <Button
                  variant="secondary"
                  className={'flex items-center'}
                  icon={<Plus size={20} />}
                >
                  Add New Subject
                </Button>
              }
              ButtonAction="Submit"
              ButtonCancel="Cancel"
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
                <SubjectsTable
                  data={data?.data.data || []}
                  loading={isLoading}
                />
              </div>
            ),
          },
          {
            value: 'grades',
            content: (
              <div className={'pt-4 w-full'}>
                <GradesTable
                  data={gradesData?.data.data || []}
                  loading={gradesLoading}
                />
              </div>
            ),
          },
        ]}
        onValueChange={() => {}}
      ></Tabs>
    </div>
  );
}
