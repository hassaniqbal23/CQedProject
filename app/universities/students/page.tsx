'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Input } from '@/components/ui';
import Pagination from '@/components/common/pagination/pagination';
import { getAllStudents, getStudentBySearch } from '@/app/api/students';
import StudentsTable from '@/components/common/StudentsTable';
import { Typography } from '@/components/common/Typography/Typography';

function UniversityStudents() {
  const [totalCountStudent, setTotalCountStudent] = useState<number>(1);
  const [searchStudent, setSearchStudent] = useState('');
  const [paginationStudent, setPaginationStudent] = useState<{
    studentPage: number;
    studentLimit: number;
  }>({
    studentPage: 1,
    studentLimit: 10,
  });

  const { studentPage, studentLimit } = paginationStudent;

  const { data: allStudentsList, isLoading: isLoadingAllStudents } = useQuery(
    ['getAllStudents', studentPage, studentLimit],
    () => getAllStudents(studentPage, studentLimit),
    {
      onSuccess: (res) => {
        setTotalCountStudent(res.data.totalCount);
      },
      enabled: true,
      onError(err) {
        console.log(err);
      },
    }
  );

  const { data: searchUsers, isLoading: isLoadingAutoComplete } = useQuery(
    ['search-user-by-name', searchStudent, studentPage, studentLimit],
    () => getStudentBySearch(studentPage, studentLimit, searchStudent),
    {
      enabled: !!searchStudent.trim(),
      refetchOnWindowFocus: false,
    }
  );
  let timeout: NodeJS.Timeout;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Clear previous timeout (if any)
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setSearchStudent(inputValue);
      setPaginationStudent((prev) => ({ ...prev, page: 1 }));
    }, 2000);
  };

  const combinedData = searchStudent.trim()
    ? searchUsers?.data?.data || []
    : allStudentsList?.data?.data || [];

  return (
    <>
      <div>
        <div className={'flex mb-4 items-center'}>
          <div className="mb-2">
            <Typography variant={'h2'} weight={'semibold'}>
              Students
            </Typography>
            <Typography variant={'p'} weight={'regular'}>
              The total number of student
            </Typography>
          </div>
          <div className={'ml-auto'}>
            <Input
              iconColor="black"
              iconPosition="left"
              placeholder="Search student here..."
              type="search"
              className="max-w-sm text-black rounded-full text"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <StudentsTable
            data={combinedData}
            loading={isLoadingAllStudents || isLoadingAutoComplete}
          />
          <div className={'flex justify-end w-full mt-4'}>
            <Pagination
              currentPage={studentPage}
              totalPages={Math.ceil(totalCountStudent / studentLimit)}
              pageSize={studentLimit}
              onPageChange={(value: number) => {
                setPaginationStudent((prev) => ({
                  ...prev,
                  studentPage: value,
                }));
              }}
              totalCount={totalCountStudent}
              setPageSize={(pageSize) =>
                setPaginationStudent((prev) => ({
                  ...prev,
                  studentLimit: pageSize,
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UniversityStudents;
