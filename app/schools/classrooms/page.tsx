'use client';

import { Button, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import SubjectsTable from '@/components/common/SubjectsTable/SubjectsTable';
import GradesTable from '@/components/common/GradesTable/GradesTable';
import { useMutation, useQuery } from 'react-query';
import {
  createSubject as createSubjectAPI,
  getAllClass,
  getAllGrades,
  deleteSubject as deleteSubjectAPI,
} from '@/app/api/schools';
import { CreateSubjectModal } from '@/components/common/CreateSubjectModal/CreateSubjectModal';
import { Typography } from '@/components/common/Typography/Typography';
import { DeleteClassDialog } from '@/components/common/DeleteClassModal/DeleteClassModal';

export default function SchoolClassRooms() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const {
    data,
    isLoading,
    refetch: refetchClasses,
  } = useQuery(['getAllClass'], () => getAllClass());
  const [addSubjectModal, setAddSubjectModal] = useState(false);
  const {
    data: gradesData,
    isLoading: gradesLoading,
    refetch: getGrades,
  } = useQuery(['getAllGrades'], () => getAllGrades());

  const { mutate: createSubject, isLoading: isCreatingSubject } = useMutation(
    (studentData: { name: string }) => createSubjectAPI(studentData),
    {
      onSuccess: (res) => {
        setAddSubjectModal(false);
        refetchClasses();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: deleteSubject, isLoading: isDeleteing } = useMutation(
    (id: number) => deleteSubjectAPI(id),
    {
      onSuccess: (res) => {
        setDeleteId(0);
        setOpenDeleteModal(false);
        refetchClasses();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  return (
    <div>
      <div className={'flex mb-4 items-center'}>
        <div className="mb-2">
          <Typography variant={'h2'} weight={'semibold'}>
            Classrooms
          </Typography>
          <Typography variant="p" weight="regular">
            Subjects and Classes in your schools
          </Typography>
        </div>
        <div className={'ml-auto'}>
          <CreateSubjectModal
            Title="Add New Subject"
            trigger={
              <Button
                size={'md'}
                variant="default"
                className={'flex items-center'}
                icon={<Plus size={20} />}
                iconPosition={'left'}
              >
                Add Subject
              </Button>
            }
            ButtonAction="Submit"
            ButtonCancel="Cancel"
            loading={isCreatingSubject}
            onOpen={() => setAddSubjectModal(true)}
            onClose={() => setAddSubjectModal(false)}
            open={addSubjectModal}
            onSubmit={(values) => {
              createSubject(values);
            }}
          />
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
                  onDeleteSubject={(id: number) => {
                    setDeleteId(id);
                    setOpenDeleteModal(true);
                  }}
                />
                <DeleteClassDialog
                  title="Delete your class"
                  description="Are you sure want to delete your class"
                  ButtonAction="Delete this Class"
                  ButtonCancel="Cancel"
                  open={openDeleteModal}
                  onOpen={() => setOpenDeleteModal(true)}
                  onClose={() => setOpenDeleteModal(false)}
                  onClickOk={() => deleteSubject(deleteId)}
                  okLoading={isDeleteing}
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
